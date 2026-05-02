import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync, unlinkSync, copyFileSync, readdirSync, rmSync, statSync } from "fs";
import { hostname } from "os";
import { basename, join, dirname, relative, resolve } from "path";
import { 
  toSlug, toRepoRelativePath, toFileUri, inferRefTitleAndTopic, resolveReferencedTicketPath, toPosixPath, stringifyFrontMatter,
  selectLocalizedTemplatePath, resolveDocsLanguage, inferDocsLanguageFromText, normalizeDocsLanguage, isMcpActive, withReadline, parseFrontMatter,
  AGENT_ROOT_DIR, TICKET_SUBDIR, TEMPLATE_SUBDIR, TICKET_DIR_NAME, detectConsumerTicketDir, PLAN_LINKS_DIR, loadInitConfig
} from "./cli-utils.mjs";
import { readTicketIndexJson, writeTicketIndexJson, syncActiveTicketId, generateTicketId, syncToPipeline } from "./cli-ticket-index.mjs";
import { appendTicketEntry, rebuildTicketIndexFromTopicFilesIfNeeded, writeTicketListFile, updateTicketEntryStatus } from "./cli-ticket-parser.mjs";
import { parsePlan } from "./plan-parser.mjs";
import { lintMarkdownPaths } from "./lint-md.mjs";
import ejs from "ejs";
import YAML from "yaml";

import { createInterface } from "readline";
import { selectOne } from "./cli-prompts.mjs";

const MAX_OPEN_TICKETS = 20;
const OPEN_TICKET_STATUSES = new Set(["open", "active"]);
const AUTO_ARCHIVE_DONE_STATUSES = new Set(["closed", "cancelled", "wontfix"]);
const TELEMETRY_FILE = `${AGENT_ROOT_DIR}/telemetry.jsonl`;

async function ensurePhase0Validation(opts) {
  if (!opts.evidence && !opts.skipPhase0) {
    // No more interactive prompts. Default to skip if no evidence provided.
    opts.skipPhase0 = true;
  }

  if (opts.skipPhase0) {
    try {
      if (await isMcpActive(opts.cwd)) {
        console.warn("[WARNING] Phase 0 RAG evidence is recommended when the MCP server is active. Proceeding without evidence as requested.");
      }
    } catch (err) {
      // MCP detection failure should not block ticket creation
      if (process.env.DEBUG) console.warn("[DEBUG] MCP activation check failed:", err.message);
    }
  }
}

function resolveTicketTemplate(cwd, docsLanguageInput, promptText = "") {
  const config = loadInitConfig(cwd) || {};
  const explicitDocsLanguage = normalizeDocsLanguage(docsLanguageInput);
  const promptDocsLanguage = explicitDocsLanguage === "auto" ? inferDocsLanguageFromText(promptText) : null;
  const docsLanguage = resolveDocsLanguage(
    explicitDocsLanguage !== "auto" ? explicitDocsLanguage : promptDocsLanguage || config.docsLanguage || "auto"
  );

  const templateDir = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  const bundleTplDir = join(new URL(".", import.meta.url).pathname, "..", "templates");

  const ticketTemplateCandidates = [
    selectLocalizedTemplatePath(templateDir, "TICKET_TEMPLATE.md", docsLanguage),
    selectLocalizedTemplatePath(bundleTplDir, "TICKET_TEMPLATE.md", docsLanguage),
  ];
  const ticketTemplatePath = ticketTemplateCandidates.find(p => existsSync(p));
  if (!ticketTemplatePath) {
    throw new Error("ticket create: Template not found. Please run 'npx deuk-agent-rule init' to deploy templates.");
  }
  return { tplText: readFileSync(ticketTemplatePath, "utf8"), docsLanguage };
}

function hasPlaceholderTokens(text) {
  const src = String(text || "").toLowerCase();
  return src.includes("[add ") || src.includes("[fill") || src.includes("placeholder") || src.includes("todo") || src.includes("tbd");
}

function summarizeForSentence(summary) {
  const clean = String(summary || "").replace(/\s+/g, " ").trim();
  return clean.length > 180 ? `${clean.slice(0, 177)}...` : clean;
}

function buildApcDraft(summary) {
  const s = summarizeForSentence(summary);
  return {
    boundaryEditable: `- Editable modules: ticket target modules directly related to \"${s}\"`,
    boundaryForbidden: "- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots",
    boundaryRule: "- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md",
    contractInput: `- Input: existing code/context required to implement \"${s}\"`,
    contractOutput: `- Output: minimal implementation and tests that satisfy \"${s}\"`,
    contractSideEffects: "- Side effects: ticket + plan docs updates, scoped code changes only",
    patchPlan: [
      "- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.",
      "- Ticket records only the allowed patch boundary and contract.",
      "- Do not duplicate planLink content here; reference it when detail is needed."
    ].join("\n")
  };
}

function evaluateApcCompleteness(content) {
  const reasons = [];
  const apcMatch = String(content || "").match(/## Agent Permission Contract[\s\S]*?(?=\n## |$)/i);
  if (!apcMatch) {
    reasons.push("missing_apc_block");
    return reasons;
  }
  const apcText = apcMatch[0];
  const boundaryMatch = apcText.match(/### \[BOUNDARY\]([\s\S]*?)(?=\n### |$)/i);
  const contractMatch = apcText.match(/### \[CONTRACT\]([\s\S]*?)(?=\n### |$)/i);
  const planMatch = apcText.match(/### \[PATCH PLAN\]([\s\S]*?)(?=\n### |$)/i);

  if (!boundaryMatch?.[1] || hasPlaceholderTokens(boundaryMatch[1])) reasons.push("apc_boundary_incomplete");
  if (!contractMatch?.[1] || hasPlaceholderTokens(contractMatch[1])) reasons.push("apc_contract_incomplete");
  if (!planMatch?.[1] || hasPlaceholderTokens(planMatch[1])) reasons.push("apc_patch_plan_incomplete");
  return reasons;
}

function ensurePlanDraftFile(cwd, planLink, summary, opts = {}) {
  const planAbs = resolve(cwd, planLink);
  if (existsSync(planAbs)) return planAbs;
  if (opts.dryRun) return planAbs;

  const now = new Date().toISOString().replace("T", " ").split(".")[0];
  const planSummary = `Agent problem analysis and decision trace for ${basename(planLink, ".md")}`;
  const planBody = [
    "---",
    `summary: \"${planSummary.replace(/\"/g, "'")}\"`,
    "status: draft",
    "priority: P2",
    "tags:",
    "  - plan",
    "  - phase1",
    `createdAt: \"${now}\"`,
    "---",
    "",
    "# Agent Analysis Plan",
    "",
    "## Ticket Contract Pointer",
    "- Linked ticket owns summary, scope, constraints, and APC.",
    "- This planLink owns the agent's problem analysis and decision trail.",
    "- Do not copy ticket APC or summary text into this document.",
    "",
    "## Problem Analysis",
    "Describe what is actually broken, missing, ambiguous, or risky.",
    "",
    "## Source Observations",
    "Record concrete code/docs observations with file references.",
    "",
    "## Cause Hypotheses",
    "List plausible causes or design gaps before choosing an approach.",
    "",
    "## Decision Rationale",
    "Explain the selected approach and why alternatives were not chosen.",
    "",
    "## Execution Strategy",
    "Describe the implementation strategy without using progress checkboxes.",
    "",
    "## Verification Design",
    "List commands to run, expected outcomes, and residual risks."
  ].join("\n");

  mkdirSync(dirname(planAbs), { recursive: true });
  writeFileSync(planAbs, planBody + "\n", "utf8");
  return planAbs;
}

function lintTicketLifecycleMarkdown(cwd, targets, context) {
  const uniqueTargets = Array.from(new Set((targets || []).filter(Boolean)));
  if (uniqueTargets.length === 0) return { errors: [], targets: [] };

  const result = lintMarkdownPaths(uniqueTargets, cwd);
  if (result.errors.length > 0) {
    const details = result.errors.map(err => `- ${err}`).join("\n");
    throw new Error(`[VALIDATION FAILED] ${context}: markdown lint failed\n${details}`);
  }
  return result;
}

function collectTicketLifecycleMarkdownTargets(cwd, ticketAbsPath, planLink, extraTargets = []) {
  const targets = [];
  if (ticketAbsPath) targets.push(ticketAbsPath);

  if (planLink) {
    const planAbsPath = resolve(cwd, planLink);
    if (!existsSync(planAbsPath)) {
      throw new Error(`[VALIDATION FAILED] linked plan file not found: ${planLink}`);
    }
    targets.push(planAbsPath);
  }

  for (const target of extraTargets || []) {
    if (!target) continue;
    targets.push(target);
  }

  return Array.from(new Set(targets));
}

function restoreTicketIndexSnapshot(cwd, snapshot, opts = {}) {
  if (opts.dryRun) return;
  writeTicketIndexJson(cwd, snapshot, opts);
  writeTicketListFile(cwd, snapshot.entries || [], { ...opts, render: true });
}

function rollbackTicketLifecycleArtifacts(cwd, previousIndex, previousBody, absPath, opts = {}) {
  if (opts.dryRun) return;
  if (previousBody !== undefined && absPath) {
    writeFileSync(absPath, previousBody, "utf8");
  }
  if (previousIndex) {
    restoreTicketIndexSnapshot(cwd, previousIndex, opts);
  }
}

function getPhase1IncompleteReasons(cwd, absPath) {
  if (!existsSync(absPath)) return ["ticket_file_missing"];
  const body = readFileSync(absPath, "utf8");
  const { meta, content } = parseFrontMatter(body);
  const phase = Number(meta.phase || 1);
  if (phase !== 1) return [];

  const reasons = [];
  if (!meta.summary || hasPlaceholderTokens(meta.summary)) reasons.push("summary_missing_or_placeholder");
  if (!meta.planLink) reasons.push("planLink_missing");
  else {
    const planAbs = resolve(cwd, meta.planLink);
    if (!existsSync(planAbs)) reasons.push("planLink_file_missing");
  }

  reasons.push(...evaluateApcCompleteness(content));
  return [...new Set(reasons)];
}

function updatePreviousTicketRef(cwd, prevTicketEntry, ticketId) {
  if (!prevTicketEntry) return;
  const prevAbsPath = join(cwd, prevTicketEntry.path);
  if (!existsSync(prevAbsPath)) return;
  
  let prevContent = readFileSync(prevAbsPath, "utf8");
  prevContent = prevContent.replace(/^---\n([\s\S]*?)\n---/, (match, fm) => {
    if (!fm.includes('nextTicket:')) {
      return `---\n${fm.trim()}\nnextTicket: ${ticketId}\n---`;
    }
    return match;
  });
  writeFileSync(prevAbsPath, prevContent, "utf8");
  console.log(`Linked to previous ticket: ${prevTicketEntry.id}`);
}

function archivePartitionForEntry(entry, now = new Date()) {
  const source = String(entry?.createdAt || "");
  const match = source.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return { yearMonth: `${match[1]}-${match[2]}`, day: match[3] };

  const iso = now.toISOString();
  return { yearMonth: iso.slice(0, 7), day: iso.slice(8, 10) };
}

function getArchiveDestination(ticketDir, entry, fileName) {
  const partition = archivePartitionForEntry(entry);
  const archiveDir = join(ticketDir, "archive", entry.group || "sub", partition.yearMonth, partition.day);
  return {
    archiveDir,
    archiveYearMonth: partition.yearMonth,
    archiveDay: partition.day,
    newAbsPath: join(archiveDir, fileName)
  };
}

function archiveStorageFromPath(ticketDir, absPath, entry) {
  const parts = toPosixPath(relative(ticketDir, absPath)).split("/");
  const archiveIdx = parts.indexOf("archive");
  if (archiveIdx < 0) return archivePartitionForEntry(entry);
  return {
    archiveYearMonth: parts[archiveIdx + 2] || archivePartitionForEntry(entry).yearMonth,
    archiveDay: parts[archiveIdx + 3] || archivePartitionForEntry(entry).day
  };
}

function findExistingArchivedTicketPath(ticketDir, entry, fileName) {
  const expected = getArchiveDestination(ticketDir, entry, fileName).newAbsPath;
  if (existsSync(expected)) return expected;

  const archiveRoot = join(ticketDir, "archive", entry.group || "sub");
  if (!existsSync(archiveRoot)) return null;

  const stack = [archiveRoot];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, item.name);
      if (item.isDirectory()) {
        stack.push(abs);
      } else if (item.isFile() && item.name === fileName) {
        return abs;
      }
    }
  }
  return null;
}

function isOpenTicketEntry(entry) {
  return OPEN_TICKET_STATUSES.has(String(entry?.status || "open"));
}

function isAutoArchivableDoneEntry(entry) {
  return AUTO_ARCHIVE_DONE_STATUSES.has(String(entry?.status || "").toLowerCase());
}

function latestTicketByStatus(entries, statuses) {
  const statusSet = new Set(statuses);
  return [...(entries || [])]
    .filter(e => statusSet.has(String(e.status || "").toLowerCase()))
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")))[0] || null;
}

function formatTicketChoice(entry) {
  const status = String(entry.status || "open");
  const createdAt = String(entry.createdAt || "-");
  const title = String(entry.title || entry.topic || entry.id || "").replace(/(\n|\\n)+/g, " ").slice(0, 80);
  return `${entry.id} | ${status} | ${createdAt} | ${title}`;
}

function buildUseFallbackCandidates(indexJson) {
  const entries = indexJson.entries || [];
  const lastClosed = latestTicketByStatus(entries, ["closed"]);
  const openRows = entries
    .filter(e => OPEN_TICKET_STATUSES.has(String(e.status || "open")))
    .sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));

  const seen = new Set();
  return [lastClosed, ...openRows]
    .filter(Boolean)
    .filter(entry => {
      if (seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    });
}

function buildUseNoMatchError(topic, candidates) {
  const lines = [
    `No matching ticket found for "${topic || ""}".`,
    "Last closed ticket and open tickets:"
  ];

  if (candidates.length === 0) {
    lines.push("  - none");
  } else {
    for (const entry of candidates.slice(0, 20)) {
      lines.push(`  - ${formatTicketChoice(entry)}`);
    }
  }

  lines.push("");
  lines.push("Choose one explicitly:");
  lines.push("  npx deuk-agent-rule ticket use --topic <ticket-id> --non-interactive");
  return lines.join("\n");
}

function oldestFirst(a, b) {
  return String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
}

function selectOpenLimitCandidates(indexJson) {
  const openRows = (indexJson.entries || []).filter(isOpenTicketEntry);
  const overflow = openRows.length - MAX_OPEN_TICKETS;
  if (overflow <= 0) return [];

  const currentActiveId = indexJson.activeTicketId;
  const openCandidates = openRows
    .filter(e => e.status === "open" && e.id !== currentActiveId)
    .sort(oldestFirst);
  const activeCandidates = openRows
    .filter(e => e.status === "active" && e.id !== currentActiveId)
    .sort(oldestFirst);
  const lastResort = openRows
    .filter(e => e.id === currentActiveId)
    .sort(oldestFirst);

  return [...openCandidates, ...activeCandidates, ...lastResort].slice(0, overflow);
}

function buildOpenTicketLimitError(indexJson) {
  const openRows = (indexJson.entries || []).filter(isOpenTicketEntry);
  if (openRows.length <= MAX_OPEN_TICKETS) return null;

  const candidates = selectOpenLimitCandidates(indexJson);
  const lines = [
    `[OPEN TICKET LIMIT] Open tickets: ${openRows.length}/${MAX_OPEN_TICKETS}.`,
    "Ticket creation was cancelled so open tickets do not exceed the limit.",
    "Review the active ticket list, decide what can be archived, then create the ticket again.",
    "",
    "Commands:",
    "  npx deuk-agent-rule ticket list --active --non-interactive",
    "  npx deuk-agent-rule ticket archive --topic <ticket-id> --non-interactive",
    "",
    "Oldest archive candidates:"
  ];

  for (const entry of candidates.slice(0, 10)) {
    const title = String(entry.title || entry.topic || "").replace(/(\n|\\n)+/g, " ").slice(0, 80);
    lines.push(`  - ${entry.id} | ${entry.status || "open"} | ${entry.createdAt || "-"} | ${title}`);
  }

  return lines.join("\n");
}

function resolveArchiveReport(cwd, fileName, report) {
  if (report) return resolve(cwd, report);

  const reportDir = join(cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
  const potentialReport = fileName.replace(/\.md$/i, "-report.md");
  const potentialPath = join(reportDir, potentialReport);
  return existsSync(potentialPath) ? potentialPath : null;
}

function archiveTicketEntry({ cwd, ticketDir, indexJson, found, opts = {}, report }) {
  const absPath = join(cwd, found.path);
  const fileName = found.path.split(/[/\\]/).pop();
  if (!existsSync(absPath)) {
    const archivedAbsPath = findExistingArchivedTicketPath(ticketDir, found, fileName);
    if (archivedAbsPath) {
      const storage = archiveStorageFromPath(ticketDir, archivedAbsPath, found);
      const entryIdx = indexJson.entries.findIndex(e => e.id === found.id);
      if (entryIdx >= 0) {
        indexJson.entries[entryIdx].fileName = fileName;
        indexJson.entries[entryIdx].status = "archived";
        indexJson.entries[entryIdx].archiveYearMonth = storage.archiveYearMonth;
        indexJson.entries[entryIdx].archiveDay = storage.archiveDay;
        indexJson.entries[entryIdx].updatedAt = new Date().toISOString();
      }
      const archivedRelativePath = toRepoRelativePath(cwd, archivedAbsPath);
      console.warn("ticket archive: repaired already archived ticket " + archivedRelativePath);
      return { id: found.id, path: archivedRelativePath, repaired: true };
    }
    throw new Error("ticket archive: file not found " + found.path);
  }

  const originalBody = readFileSync(absPath, "utf8");
  const { meta: archiveMeta } = parseFrontMatter(originalBody);
  const { archiveDir, archiveYearMonth, archiveDay, newAbsPath } = getArchiveDestination(ticketDir, found, fileName);
  if (!opts.dryRun) mkdirSync(archiveDir, { recursive: true });

  const bodyLines = originalBody.trimEnd().split(/\r?\n/);
  const reportSrc = resolveArchiveReport(cwd, fileName, report);
  let reportDest = null;

  if (reportSrc) {
    if (!existsSync(reportSrc)) {
      throw new Error("ticket archive: report file not found " + report);
    }
    const reportDir = join(cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
    if (!opts.dryRun) mkdirSync(reportDir, { recursive: true });

    const reportBaseName = fileName.replace(/\.md$/i, "-report.md");
    reportDest = join(reportDir, reportBaseName);
    if (!opts.dryRun) copyFileSync(reportSrc, reportDest);
    console.log("ticket archive: copied report to " + toFileUri(reportDest));

    bodyLines.push("");
    bodyLines.push("## 📄 Attached Report");
    const relativeLink = toPosixPath(relative(dirname(newAbsPath), reportDest));
    bodyLines.push(`- [View Report](${relativeLink})`);
  }

  const lintTargets = collectTicketLifecycleMarkdownTargets(cwd, newAbsPath, archiveMeta.planLink, reportDest ? [reportDest] : []);
  if (opts.dryRun) {
    console.log("ticket archive: would move " + toRepoRelativePath(cwd, absPath) + " to " + toRepoRelativePath(cwd, newAbsPath));
    return { dryRun: true };
  }

  writeFileSync(newAbsPath, bodyLines.join("\n") + "\n", "utf8");
  rmSync(absPath);
  try {
    lintTicketLifecycleMarkdown(cwd, lintTargets, `ticket archive ${found.id}`);
  } catch (err) {
    rmSync(newAbsPath, { force: true });
    writeFileSync(absPath, originalBody, "utf8");
    if (reportDest) rmSync(reportDest, { force: true });
    throw err;
  }

  distillKnowledge(absPath, found.id, cwd, originalBody);
  console.log("ticket archive: moved ticket to " + toFileUri(newAbsPath));

  const entryIdx = indexJson.entries.findIndex(e => e.id === found.id);
  if (entryIdx >= 0) {
    indexJson.entries[entryIdx].fileName = fileName;
    indexJson.entries[entryIdx].status = "archived";
    indexJson.entries[entryIdx].archiveYearMonth = archiveYearMonth;
    indexJson.entries[entryIdx].archiveDay = archiveDay;
    indexJson.entries[entryIdx].updatedAt = new Date().toISOString();
  }

  const archivedRelativePath = toRepoRelativePath(cwd, newAbsPath);
  console.log("ticket archive: final ticket path " + archivedRelativePath);
  return { id: found.id, path: archivedRelativePath };
}

function autoArchiveDoneTickets(cwd, indexJson, opts = {}) {
  const ticketDir = detectConsumerTicketDir(cwd);
  if (!ticketDir) return [];

  const candidates = (indexJson.entries || [])
    .filter(isAutoArchivableDoneEntry)
    .sort(oldestFirst);
  const archived = [];

  for (const candidate of candidates) {
    const result = archiveTicketEntry({ cwd, ticketDir, indexJson, found: candidate, opts, report: null });
    if (result?.id) {
      archived.push(result);
      console.warn(`[AUTO-ARCHIVE] ${candidate.id} (${candidate.status}) archived before open-ticket limit check.`);
    }
  }

  if (archived.length > 0) {
    writeTicketIndexJson(cwd, indexJson, opts);
    if (opts.render) writeTicketListFile(cwd, indexJson.entries, opts);
  }

  return archived;
}

function rollbackCreatedTicket(cwd, abs, planLink, rollbackIndexJson, opts = {}) {
  if (opts.dryRun) return;
  rmSync(abs, { force: true });
  if (planLink) rmSync(resolve(cwd, planLink), { force: true });
  writeTicketIndexJson(cwd, rollbackIndexJson, opts);
  writeTicketListFile(cwd, rollbackIndexJson.entries || [], { ...opts, render: true });
}

export async function runTicketCreate(opts) {
  if (!opts.topic && !opts.ref) throw new Error("ticket create requires --topic or --ref");
  
  const inferred = opts.ref ? inferRefTitleAndTopic(opts) : null;
  const topic = toSlug(opts.topic || inferred?.topic || "ticket");
  const title = opts.topic || inferred?.title || "ticket";
  const group = toSlug(opts.group || "sub");

  await ensurePhase0Validation(opts);

  const strictCreate = !opts.allowPlaceholder && (opts.requireFilled || opts.fromPlan === true);

  let path, source;
  if (opts.ref) {
    path = resolveReferencedTicketPath(opts);
    source = "ticket-reference";
  } else {
    // Find nearest or create in CWD if missing
    const ticketDir = detectConsumerTicketDir(opts.cwd, { createIfMissing: true });

    let parsedPlan = null;
    let finalTitle = title;
    let finalTopic = topic;
    
    if (typeof opts.fromPlan === "string" && opts.fromPlan.trim()) {
      const planAbsPath = resolve(opts.cwd, opts.fromPlan);
      if (!existsSync(planAbsPath)) {
        throw new Error(`ticket create: Plan file not found at ${planAbsPath}`);
      }
      const planContent = readFileSync(planAbsPath, "utf8");
      parsedPlan = parsePlan(planAbsPath, planContent);
      
      finalTitle = opts.topic || parsedPlan.title || title;
      finalTopic = toSlug(finalTitle);
    }

    const indexJson = readTicketIndexJson(opts.cwd);

    // Smart close: check previous active ticket's completion state before deciding
    const activeId = indexJson.activeTicketId;
    if (activeId) {
      const activeEntry = indexJson.entries.find(e => e.id === activeId && (e.status === "open" || e.status === "active"));
      if (activeEntry) {
        const absPath = join(opts.cwd, activeEntry.path);
        let shouldClose = false;
        let reason = "";

        if (existsSync(absPath)) {
          try {
            const body = readFileSync(absPath, "utf8");
            const { meta, content } = parseFrontMatter(body);

            // Count checklist items
            const checked = (content.match(/- \[x\]/gi) || []).length;
            const unchecked = (content.match(/- \[ \]/g) || []).length;
            const total = checked + unchecked;
            const allDone = total > 0 && unchecked === 0;
            const phase = meta.phase || 1;

            if (phase >= 3 && allDone) {
              shouldClose = true;
              reason = `phase=${phase}, tasks=${checked}/${total} done`;
            } else if (allDone && total > 0) {
              shouldClose = true;
              reason = `all tasks done (${checked}/${total}), phase=${phase}`;
            } else {
              reason = `phase=${phase}, tasks=${checked}/${total} done`;
            }
          } catch (err) {
            reason = "could not read ticket file";
          }
        }

        if (shouldClose) {
          if (opts.dryRun) {
            console.log(`[DRY-RUN] Would auto-close ${activeId} (${reason}).`);
          } else {
            activeEntry.status = "closed";
            activeEntry.updatedAt = new Date().toISOString();
            // Sync to frontmatter
            if (existsSync(absPath)) {
              try {
                const body = readFileSync(absPath, "utf8");
                const parsed = parseFrontMatter(body);
                parsed.meta.status = "closed";
                parsed.meta.phase = 4;
                writeFileSync(absPath, stringifyFrontMatter(parsed.meta, parsed.content), "utf8");
              } catch (err) { /* skip */ }
            }
            writeTicketIndexJson(opts.cwd, indexJson, opts);
            console.log(`[AUTO-CLOSE] ${activeId} completed (${reason}).`);
          }
        } else {
          console.warn(`[NOTICE] Switching from ${activeId} (${reason}). Ticket stays open.`);
        }
      }
    }




    const ticketId = generateTicketId(finalTopic, indexJson.entries);
    const finalFileName = `${ticketId}.md`;

    const abs = join(ticketDir, group, finalFileName);
    if (!opts.dryRun) mkdirSync(join(ticketDir, group), { recursive: true });
    path = toRepoRelativePath(opts.cwd, abs);

    let prevTicketEntry = null;
    if (opts.chain) {
      prevTicketEntry = pickTicketEntry({ latest: true }, indexJson);
    }

    const summary = (opts.summary || parsedPlan?.summary || "").trim();
    if (!summary) {
      throw new Error("[VALIDATION FAILED] 'summary' is mandatory and cannot be empty. Please provide a meaningful summary via --summary or within your plan.");
    }

    const promptText = [summary, finalTitle, parsedPlan?.body].filter(Boolean).join("\n");
    const { tplText, docsLanguage } = resolveTicketTemplate(opts.cwd, opts.docsLanguage, promptText);

    const apcDraft = buildApcDraft(summary);

    const rawMeta = {
      id: ticketId,
      title: finalTitle,
      phase: 1,
      status: "open",
      submodule: opts.submodule,
      project: opts.project === "global" ? undefined : opts.project,
      docsLanguage,
      evidence: opts.evidence,
      summary,
      priority: opts.priority,
      tags: opts.tags ? opts.tags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean) : undefined,
      createdAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      prevTicket: prevTicketEntry ? prevTicketEntry.id : undefined,
      planLink: `${PLAN_LINKS_DIR}/${ticketId}-plan.md`,
    };

    const meta = Object.fromEntries(Object.entries(rawMeta).filter(([k, v]) => {
      if (k === 'summary') return v !== undefined; // summary는 필수이므로 undefined만 아니면 유지
      return v !== undefined && v !== "";
    }));
    const frontmatter = YAML.stringify(meta).trim();

    let finalContent = "";
    if (parsedPlan) {
      finalContent = `---\n${frontmatter}\n---\n${parsedPlan.body}`;
    } else {
      finalContent = ejs.render(tplText, { meta, frontmatter, apcDraft });
    }

    const planAbs = ensurePlanDraftFile(opts.cwd, meta.planLink, summary, opts);
    const lifecycleTargets = [abs, planAbs];

    if (!opts.dryRun) writeFileSync(abs, finalContent, "utf8");
    source = "ticket-create";

    try {
      if (strictCreate && !opts.dryRun) {
        const reasons = getPhase1IncompleteReasons(opts.cwd, abs);
        if (reasons.length > 0) {
          throw new Error(`[VALIDATION FAILED] ticket create strict mode rejected placeholder/incomplete phase1 state: ${reasons.join(", ")}`);
        }
      }

      if (!opts.dryRun) {
        lintTicketLifecycleMarkdown(opts.cwd, lifecycleTargets, `ticket create ${ticketId}`);
      }

      appendTicketEntry(opts.cwd, {
        id: ticketId,
        title, topic, group, project: opts.project || "global",
        createdAt: new Date().toISOString(), path, source
      }, opts);

      const limitIndexJson = readTicketIndexJson(opts.cwd);
      autoArchiveDoneTickets(opts.cwd, limitIndexJson, opts);

      const limitError = buildOpenTicketLimitError(readTicketIndexJson(opts.cwd));
      if (limitError) {
        throw new Error(limitError);
      }
    } catch (err) {
      if (!opts.dryRun) {
        rollbackCreatedTicket(opts.cwd, abs, meta.planLink, indexJson, opts);
      }
      throw err;
    }

    if (!opts.dryRun) updatePreviousTicketRef(opts.cwd, prevTicketEntry, ticketId);

    console.log(`${opts.dryRun ? "Ticket would be created" : "Ticket created"}: ${toFileUri(abs)}`);
    
    // Remote Sync Hook
    const configSync = loadInitConfig(opts.cwd);
    if (!opts.dryRun && configSync && configSync.remoteSync && configSync.pipelineUrl) {
      syncToPipeline(configSync.pipelineUrl, { action: "create", ticket: meta });
    }
  }

  syncActiveTicketId(opts.cwd, opts);
}

export async function runTicketList(opts) {
  const ticketDir = detectConsumerTicketDir(opts.cwd);
  if (!ticketDir) {
    throw new Error("No ticket system found. Please run 'npx deuk-agent-rule init' first.");
  }
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  syncActiveTicketId(opts.cwd);
  let rows = index.entries;

  
  if (opts.active) {
    rows = rows.filter(e => e.status === "active" || e.status === "open");
  } else if (opts.archived) {
    rows = rows.filter(e => e.status === "archived");
  } else if (!opts.all) {
    // Default: major/active list (open or active)
    rows = rows.filter(e => e.status === "open" || e.status === "active");
  }
  
  if (opts.group) rows = rows.filter(e => e.group === opts.group);
  if (opts.project) rows = rows.filter(e => e.project === opts.project);
  if (opts.submodule) rows = rows.filter(e => e.submodule === opts.submodule);
  
  if (opts.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log("#  STATUS   SUBMODULE   GROUP       PROJECT     CREATED                  TITLE");
  rows.slice(0, opts.limit).forEach((e, idx) => {
    const stat = (e.status === "closed" ? "[x]" : "[ ]").padEnd(7);
    const sub = (e.submodule || "-").padEnd(11);
    const safeTitle = String(e.title || e.topic || "").replace(/(\n|\\n)+/g, " ").slice(0, 50);
    console.log(`${String(idx+1).padEnd(2)} ${stat} ${sub} ${String(e.group||"").padEnd(10)} ${String(e.project||"").padEnd(11)} ${String(e.createdAt||"").padEnd(24)} ${safeTitle}`);
  });
  
  if (opts.render) {
    writeTicketListFile(opts.cwd, index.entries, { render: true });
    console.log(`\nRendered markdown list to ${detectConsumerTicketDir(opts.cwd)}/TICKET_LIST.md`);
  }
}

export async function runTicketStatus(opts) {
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const found = pickTicketEntry(opts, index);
  if (!found) throw new Error("ticket status: no matching ticket found");

  const absPath = join(opts.cwd, found.path);
  const fileMissing = !existsSync(absPath);
  const body = fileMissing ? "" : readFileSync(absPath, "utf8");
  const parsed = fileMissing ? { meta: {}, content: "" } : parseFrontMatter(body);
  const phase = Number(parsed.meta.phase || 1);
  const incompleteReasons = getPhase1IncompleteReasons(opts.cwd, absPath);
  const derivedStatus = incompleteReasons.length > 0 && phase === 1
    ? "phase1_incomplete"
    : (parsed.meta.status || found.status || "open");

  const out = {
    id: found.id,
    title: found.title,
    path: found.path,
    phase,
    status: derivedStatus,
    summary: parsed.meta.summary || null,
    planLink: parsed.meta.planLink || null,
    reasons: incompleteReasons,
  };

  if (opts.json) {
    console.log(JSON.stringify(out, null, 2));
    return;
  }

  console.log(`Ticket: ${out.id}`);
  console.log(`Status: ${out.status}`);
  console.log(`Phase: ${out.phase}`);
  console.log(`Path: ${out.path}`);
  if (opts.statusDetail || out.reasons.length > 0) {
    if (out.reasons.length === 0) console.log("Reasons: none");
    else console.log(`Reasons: ${out.reasons.join(", ")}`);
  }
}

export async function runTicketMeta(opts) {
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const found = pickTicketEntry(opts, index);
  if (!found) throw new Error("ticket meta: no matching ticket found");

  if (opts.json) {
    console.log(JSON.stringify(found, null, 2));
  } else {
    console.log(`Ticket Meta [${found.topic}]`);
    Object.entries(found).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
  }
}

export async function runTicketConnect(opts) {
  const config = loadInitConfig(opts.cwd);
  const url = opts.remote || config?.pipelineUrl;
  if (!url) throw new Error("ticket connect: no pipeline URL configured or provided via --remote");

  console.log(`Connecting to AI Pipeline at ${url} ...`);
  const success = await syncToPipeline(url, { action: "ping", timestamp: new Date().toISOString() });
  if (success) {
    console.log("SUCCESS: Pipeline is reachable.");
  } else {
    console.error("FAILED: Could not connect to pipeline or returned non-OK status.");
  }
}


export async function runTicketClose(opts) {
  if (!opts.topic && !opts.latest) {
    if (opts.nonInteractive) {
      throw new Error("ticket close: --topic or --latest is required in non-interactive mode.");
    }
    await withReadline(async (rl) => {
      const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
      const choices = index.entries
        .filter(e => e.status !== "closed" && e.status !== "cancelled")
        .map(e => ({ label: `[${e.group}] ${e.title}`, value: e.topic }));
      if (choices.length > 0) {
        opts.topic = await selectOne(rl, "Choose a ticket to close:", choices);
      } else {
        throw new Error("No open tickets found to close.");
      }
    });
  }
  // Respect --status flag (e.g. 'cancelled', 'wontfix'); default to 'closed'
  if (!opts.status) opts.status = "closed";
  const previousIndex = readTicketIndexJson(opts.cwd);
  const targetEntry = pickTicketEntry(opts, previousIndex);
  if (!targetEntry) {
    throw new Error("No matching ticket found to update status");
  }

  const abs = join(opts.cwd, targetEntry.path);
  if (!existsSync(abs)) throw new Error("Ticket file not found: " + targetEntry.path);
  const previousBody = readFileSync(abs, "utf8");

  try {
    const entry = updateTicketEntryStatus(opts.cwd, opts);
    const { meta } = parseFrontMatter(previousBody);
    const lintTargets = collectTicketLifecycleMarkdownTargets(opts.cwd, abs, meta.planLink);
    lintTicketLifecycleMarkdown(opts.cwd, lintTargets, `ticket close ${entry.topic}`);
    syncActiveTicketId(opts.cwd);
    console.log(`ticket: ${opts.status} -> ${entry.topic} (${entry.path})`);
  } catch (err) {
    rollbackTicketLifecycleArtifacts(opts.cwd, previousIndex, previousBody, abs, opts);
    throw err;
  }
}

export async function runTicketUse(opts) {
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  
  let targetTopic = opts.topic;
  if (!targetTopic && !opts.latest) {
    if (opts.nonInteractive) {
      throw new Error("ticket use: --topic or --latest is required in non-interactive mode.");
    }
    await withReadline(async (rl) => {
      const choices = index.entries
        .map(e => ({ label: `${e.status === 'closed' ? '✓ ' : ''}[${e.group}] ${e.title}`, value: e.topic }));
      if (choices.length > 0) {
        targetTopic = await selectOne(rl, "Choose a ticket to use:", choices);
      }
    });
  }

  const found = opts.latest ? index.entries[0] : index.entries.find(e =>
    String(e.topic || "").includes(targetTopic) ||
    String(e.id || "").includes(targetTopic)
  );
  if (!found) {
    const candidates = buildUseFallbackCandidates(index);
    if (!opts.nonInteractive && candidates.length > 0) {
      await withReadline(async (rl) => {
        targetTopic = await selectOne(
          rl,
          `No matching ticket found for "${targetTopic}". Choose a ticket to use:`,
          candidates.map(e => ({ label: formatTicketChoice(e), value: e.topic || e.id }))
        );
      });
      const selected = index.entries.find(e => e.topic === targetTopic || e.id === targetTopic);
      if (selected) {
        opts.topic = targetTopic;
        return runTicketUse({ ...opts, latest: false });
      }
    }
    throw new Error(buildUseNoMatchError(targetTopic, candidates));
  }
  
  // Explicitly set activeTicketId to the selected ticket
  if (index.activeTicketId !== found.id) {
    writeTicketIndexJson(opts.cwd, { ...index, activeTicketId: found.id });
  }

  const posixPath = toPosixPath(found.path);
  const absPath = toPosixPath(join(opts.cwd, found.path));
  if (opts.pathOnly) console.log(absPath);
  else {
    console.log(`Active ticket: ${found.id}`);
    console.log(`Path: [${posixPath}](file://${absPath})`);
    if (opts.printContent) console.log("\n" + readFileSync(join(opts.cwd, found.path), "utf8"));
  }
}



function extractMarkdownSections(content, sectionNames) {
  const sections = {};
  for (const name of sectionNames) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^##\\s+${escapedName}\\s*\\n([\\s\\S]*?)(?=^##\\s+|(?![\\s\\S]))`, "im");
    const match = content.match(regex);
    if (match) {
      const value = match[1].trim();
      if (value) sections[name] = value;
    }
  }
  return sections;
}

function readPlanLinkSections(cwd, planLink) {
  if (!planLink) return {};
  const absPlanPath = resolve(cwd, planLink);
  if (!existsSync(absPlanPath)) return {};
  const planBody = readFileSync(absPlanPath, "utf8");
  const { content } = parseFrontMatter(planBody);
  return extractMarkdownSections(content, [
    "Problem Analysis",
    "Source Observations",
    "Cause Hypotheses",
    "Decision Rationale",
    "Execution Strategy",
    "Execution Notes",
    "Verification Design",
    "Verification Outcome"
  ]);
}

function distillKnowledge(absPath, ticketId, cwd, sourceBody = null) {
  try {
    const body = sourceBody !== null ? sourceBody : readFileSync(absPath, "utf8");
    const { meta, content } = parseFrontMatter(body);
    const ticketSections = extractMarkdownSections(content, [
      "Scope & Constraints",
      "Agent Permission Contract (APC)",
      "Tasks",
      "Done When",
      "Design Decisions",
      "Analysis & Constraints"
    ]);
    const planSections = readPlanLinkSections(cwd, meta.planLink);

    const knowledgeDir = join(cwd, AGENT_ROOT_DIR, "knowledge");
    if (!existsSync(knowledgeDir)) mkdirSync(knowledgeDir, { recursive: true });

    const dest = join(knowledgeDir, `${ticketId}.json`);
    const data = {
      id: ticketId,
      title: meta.title || ticketId,
      project: meta.project || "global",
      createdAt: meta.createdAt,
      archivedAt: new Date().toISOString(),
      summary: meta.summary || "",
      sourceTicketPath: toRepoRelativePath(cwd, absPath),
      planLink: meta.planLink || "",
      sections: ticketSections,
      analysis: planSections
    };

    writeFileSync(dest, JSON.stringify(data, null, 2), "utf8");
    console.log(`Knowledge distilled to ${toFileUri(dest)}`);
    appendTelemetryEvent(cwd, {
      action: "knowledge-distill",
      ticket: ticketId,
      file: toRepoRelativePath(cwd, absPath),
      knowledgeAction: "add_knowledge",
      tokenQuality: "saved"
    });
  } catch (err) {
    console.warn(`[WARNING] Knowledge distillation failed for ${ticketId}: ${err.message}`);
  }
}

function appendTelemetryEvent(cwd, entry) {
  try {
    const telemetryDir = join(cwd, AGENT_ROOT_DIR);
    if (!existsSync(telemetryDir)) mkdirSync(telemetryDir, { recursive: true });
    const telemetryPath = join(cwd, TELEMETRY_FILE);
    const payload = {
      ts: Math.floor(Date.now() / 1000),
      tokens: 0,
      tdw: 0,
      model: "archive",
      client: "DeukAgentRules",
      ticket: entry.ticket || "",
      action: entry.action || "knowledge-distill",
      file: entry.file || "",
      ragResult: entry.ragResult || "",
      localFallback: Boolean(entry.localFallback),
      knowledgeAction: entry.knowledgeAction || "",
      tokenQuality: entry.tokenQuality || "",
      savedTokens: Number(entry.savedTokens || 0),
      synced: false
    };
    appendFileSync(telemetryPath, JSON.stringify(payload) + "\n", "utf8");
  } catch (err) {
    console.warn(`[WARNING] Telemetry append failed for ${entry.ticket || "unknown"}: ${err.message}`);
  }
}

export function pickTicketEntry(opts, indexJson) {
  const rows = filterTicketEntries(indexJson.entries, opts)
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  if (rows.length === 0) return null;
  if (opts.topic) {
    const key = String(opts.topic).toLowerCase();
    return rows.find(e => 
      String(e.topic || "").toLowerCase().includes(key) || 
      String(e.id || "").toLowerCase().includes(key)
    ) || null;
  }
  return rows[0];
}

function filterTicketEntries(entries, opts = {}) {
  return [...(entries || [])].filter(entry => {
    if (opts.project && entry.project !== opts.project) return false;
    if (opts.submodule && entry.submodule !== opts.submodule) return false;
    return true;
  });
}

export async function runTicketArchive(opts) {
  const indexJson = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const ticketDir = detectConsumerTicketDir(opts.cwd);

  if (!opts.latest && !opts.topic) {
    if (opts.nonInteractive) {
      throw new Error("ticket archive: --topic or --latest is required in non-interactive mode.");
    }
    await withReadline(async (rl) => {
      const choices = indexJson.entries
        .filter(e => e.status !== "archived")
        .map(e => ({ label: `[${e.group}] ${e.title}`, value: e.topic }));
      if (choices.length > 0) {
        opts.topic = await selectOne(rl, "Choose a ticket to archive (this will move the file to archive/):", choices);
      } else {
        throw new Error("No active tickets found to archive.");
      }
    });
  }
  
  const found = pickTicketEntry(opts, indexJson);
  if (!found) throw new Error("ticket archive: no matching entry");

  const fileName = found.path.split(/[/\\]/).pop();
  
  // Auto-search for report if not provided
  let report = opts.report;
  if (!opts.report) {
    const reportDir = join(opts.cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
    const potentialReport = fileName.replace(/\.md$/i, "-report.md");
    const potentialPath = join(reportDir, potentialReport);
    if (existsSync(potentialPath)) {
      report = toRepoRelativePath(opts.cwd, potentialPath);
      console.log(`ticket archive: auto-detected report at ${report}`);
    }
  }

  const result = archiveTicketEntry({ cwd: opts.cwd, ticketDir, indexJson, found, opts, report });
  if (opts.dryRun) return;

  writeTicketIndexJson(opts.cwd, indexJson, opts);
  if (opts.render) writeTicketListFile(opts.cwd, indexJson.entries, opts);
  syncActiveTicketId(opts.cwd);
  return result;
}

export async function runTicketReports(opts) {
  const ticketDir = detectConsumerTicketDir(opts.cwd);
  if (!ticketDir) throw new Error("No ticket system found.");
  const reportDir = join(opts.cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
  console.log("\n📄 Agent Reports:");
  if (!existsSync(reportDir)) {
    console.log("  No reports found.");
    return;
  }
  const files = readdirSync(reportDir).filter(f => f.endsWith("-report.md"));
  if (files.length === 0) {
    console.log("  No reports found.");
    return;
  }
  
  const index = readTicketIndexJson(opts.cwd);
  const sorted = files.sort((a, b) => {
    return statSync(join(reportDir, b)).mtime.getTime() - statSync(join(reportDir, a)).mtime.getTime();
  });
  
  sorted.slice(0, opts.limit || 30).forEach(f => {
    const ticketId = f.replace(/-report\.md$/i, "");
    const entry = index.entries.find(e => e.id === ticketId || e.topic === ticketId);
    const status = entry ? ` [${entry.status}]` : "";
    console.log(`  - [${f}](${toFileUri(join(reportDir, f))})${status}`);
  });
  console.log("");
}

export async function runTicketReportAttach(opts) {
  if (!opts.report) throw new Error("ticket report attach requires --report <file_path>");
  
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const found = pickTicketEntry(opts, index);
  if (!found) throw new Error("ticket report attach: no matching ticket found");

  const absTicketPath = join(opts.cwd, found.path);
  if (!existsSync(absTicketPath)) throw new Error("Ticket file not found: " + found.path);

  const reportSrc = resolve(opts.cwd, opts.report);
  if (!existsSync(reportSrc)) throw new Error("Report file not found: " + opts.report);

  const reportDir = join(opts.cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
  if (!opts.dryRun) mkdirSync(reportDir, { recursive: true });

  const ticketFileName = found.path.split(/[/\\]/).pop();
  const reportBaseName = ticketFileName.replace(/\.md$/i, "-report.md");
  const reportDest = join(reportDir, reportBaseName);

  if (!opts.dryRun) {
    copyFileSync(reportSrc, reportDest);
    
    // Update ticket content to link the report
    let body = readFileSync(absTicketPath, "utf8").trimEnd();
    if (!body.includes("## 📄 Attached Report")) {
      const relativeLink = toPosixPath(relative(dirname(absTicketPath), reportDest));
      body += `\n\n## 📄 Attached Report\n- [View Report](${relativeLink})\n`;
      writeFileSync(absTicketPath, body, "utf8");
    }
    console.log(`ticket report: attached ${toRepoRelativePath(opts.cwd, reportSrc)} to ${found.id}`);
  } else {
    console.log(`ticket report: would attach ${toRepoRelativePath(opts.cwd, reportSrc)} to ${found.id}`);
  }
}

export async function runTicketRebuild(opts) {
  console.log("Rebuilding INDEX.json from markdown files...");
  rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: true, rebuild: true });
}

export async function runTicketMove(opts) {
  if (!opts.topic && !opts.latest) {
    if (opts.nonInteractive) {
      throw new Error("ticket move: --topic or --latest is required in non-interactive mode.");
    }
    opts.latest = true; // Default to latest
  }
  
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const entry = pickTicketEntry(opts, index);
  
  if (!entry) throw new Error("No matching ticket found to move.");

  const abs = join(opts.cwd, entry.path);
  if (!existsSync(abs)) throw new Error("Ticket file not found: " + entry.path);

  const previousIndex = readTicketIndexJson(opts.cwd);
  const body = readFileSync(abs, "utf8");
  const { meta, content } = parseFrontMatter(body);

  const currentPhase = meta.phase || 1;
  let nextPhase = opts.next ? currentPhase + 1 : (opts.phase || currentPhase + 1);

  if (currentPhase === 1 && nextPhase >= 2) {
    // Validate APC
    const apcMatch = content.match(/## Agent Permission Contract[\s\S]*?(?=\n## |$)/i);
    if (!apcMatch) {
      throw new Error(`[VALIDATION FAILED] Ticket ${entry.topic} is missing the Agent Permission Contract (APC) block. You must fill it out before moving to Phase 2.`);
    }
    const apcText = apcMatch[0];
    
    // Check for placeholders or empty values
    const boundaryMatch = apcText.match(/### \[BOUNDARY\]([\s\S]*?)(?=\n### |$)/i);
    const contractMatch = apcText.match(/### \[CONTRACT\]([\s\S]*?)(?=\n### |$)/i);
    const planMatch = apcText.match(/### \[PATCH PLAN\]([\s\S]*?)(?=\n### |$)/i);
    
    const isEmptyOrPlaceholder = (text) => {
      if (!text) return true;
      const clean = text.replace(/-\s*\*\*[^*:]+:?\*\*\s*/g, "").trim();
      return clean === "" || clean.includes("[Add ") || clean.includes("프로젝트 룰 문서");
    };

    if (isEmptyOrPlaceholder(boundaryMatch?.[1]) || isEmptyOrPlaceholder(contractMatch?.[1]) || isEmptyOrPlaceholder(planMatch?.[1])) {
      throw new Error(`[VALIDATION FAILED] The Agent Permission Contract (APC) in ${entry.topic} is incomplete or contains placeholders. Please fill out the [BOUNDARY], [CONTRACT], and [PATCH PLAN] sections before moving to Phase 2.`);
    }
  }

  meta.phase = nextPhase;
  if (nextPhase >= 4) {
    meta.status = "closed";
  } else if (nextPhase >= 2 && (!meta.status || meta.status === "open")) {
    meta.status = "active";
  }

  const newBody = stringifyFrontMatter(meta, content);

  try {
    writeFileSync(abs, newBody, "utf8");

    // Re-sync index to reflect the status change if any
    opts.topic = entry.topic;
    if (meta.status !== entry.status) {
      opts.status = meta.status;
      updateTicketEntryStatus(opts.cwd, opts);
    } else {
      rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: true });
    }

    const lintTargets = collectTicketLifecycleMarkdownTargets(opts.cwd, abs, meta.planLink);
    lintTicketLifecycleMarkdown(opts.cwd, lintTargets, `ticket move ${entry.topic}`);

    syncActiveTicketId(opts.cwd);
    console.log(`ticket: moved -> ${entry.topic} is now in Phase ${nextPhase} (${meta.status})`);
  } catch (err) {
    rollbackTicketLifecycleArtifacts(opts.cwd, previousIndex, body, abs, opts);
    throw err;
  }
}

export async function runTicketNext(opts) {
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  // Find the first active ticket, or if none, the first open ticket (earliest created)
  const rows = filterTicketEntries(index.entries, opts)
    .sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
  let found = rows.find(e => e.status === "active");
  if (!found) {
    found = rows.find(e => e.status === "open");
  }
  
  if (!found) {
    throw new Error("No active or open tickets found to proceed with. Inspect recent git history before creating a follow-up ticket.");
  }
  
  if (index.activeTicketId !== found.id) {
    writeTicketIndexJson(opts.cwd, { ...index, activeTicketId: found.id });
  }

  const posixPath = toPosixPath(found.path);
  const absPath = toPosixPath(join(opts.cwd, found.path));
  if (opts.pathOnly) {
    console.log(absPath);
  } else {
    console.log(`Next ticket: ${found.id}`);
    console.log(`Path: [${posixPath}](file://${absPath})`);
    if (opts.printContent) console.log("\n" + readFileSync(join(opts.cwd, found.path), "utf8"));
  }
}

export async function runTicketHotfix(opts) {
  if (!opts.topic && !opts.latest) {
    if (opts.nonInteractive) {
      throw new Error("ticket hotfix: --topic or --latest is required in non-interactive mode.");
    }
    opts.latest = true;
  }
  
  if (!opts.reason) {
    throw new Error("[HOTFIX DENIED] A mandatory --reason must be provided to justify bypassing standard rules (e.g., 'codegen is broken').");
  }

  // User explicit approval
  if (!opts.nonInteractive) {
    let proceed = false;
    await withReadline(async (rl) => {
      proceed = await new Promise(resolve => {
        rl.question(`\n⚠️  [EMERGENCY HOTFIX] This will bypass standard APC rules.\nReason: ${opts.reason}\nProceed? (y/N): `, a => {
          resolve(a.trim().toLowerCase() === 'y');
        });
      });
    });
    if (!proceed) {
      console.log('Hotfix cancelled by user.');
      return;
    }
  }

  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  const entry = pickTicketEntry(opts, index);
  
  if (!entry) throw new Error("No matching ticket found for hotfix.");

  const abs = join(opts.cwd, entry.path);
  if (!existsSync(abs)) throw new Error("Ticket file not found: " + entry.path);

  const body = readFileSync(abs, "utf8");
  const { meta, content } = parseFrontMatter(body);

  // Force phase 2 and active status, bypassing APC checks
  meta.phase = 2;
  meta.status = "active";
  meta.hotfix = true;
  meta.hotfixReason = opts.reason;
  
  // Append hotfix record to content
  const timestamp = new Date().toISOString();
  const hotfixRecord = `\n\n> [!WARNING]\n> **EMERGENCY HOTFIX ACTIVATED** (${timestamp})\n> **Reason:** ${opts.reason}\n> Standard APC and Phase 1 guards were bypassed.\n`;
  
  const newBody = stringifyFrontMatter(meta, content + hotfixRecord);
  writeFileSync(abs, newBody, "utf8");

  // Re-sync index
  opts.topic = entry.topic;
  opts.status = "active";
  updateTicketEntryStatus(opts.cwd, opts);
  
  syncActiveTicketId(opts.cwd);
  console.log(`[EMERGENCY HOTFIX] Ticket ${entry.topic} is now ACTIVE. Rule guardrails bypassed for this session.`);

  // Auto-create derivation ticket
  const deriveTopic = `codegen-fix-${entry.topic}`;
  const deriveSummary = `[DERIVED] Fix CodeGen source for hotfix: ${opts.reason}`;
  console.log(`[HOTFIX] Auto-creating derivation ticket: ${deriveTopic}`);
  
  try {
    await runTicketCreate({
      cwd: opts.cwd,
      topic: deriveTopic,
      summary: deriveSummary,
      chain: true,
      tags: 'hotfix-derived,codegen',
      priority: 'P1',
      skipPhase0: true,
      nonInteractive: true
    });
  } catch (err) {
    console.warn(`[WARNING] Failed to auto-create derivation ticket: ${err.message}`);
  }
}
