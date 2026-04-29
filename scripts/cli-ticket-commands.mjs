import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, copyFileSync, readdirSync, rmSync, statSync } from "fs";
import { hostname } from "os";
import { basename, join, dirname, relative, resolve } from "path";
import { 
  toSlug, toRepoRelativePath, toFileUri, inferRefTitleAndTopic, resolveReferencedTicketPath, toPosixPath, stringifyFrontMatter,
  selectLocalizedTemplatePath, resolveDocsLanguage, isMcpActive, withReadline, parseFrontMatter,
  AGENT_ROOT_DIR, TICKET_SUBDIR, TEMPLATE_SUBDIR, TICKET_DIR_NAME, detectConsumerTicketDir
} from "./cli-utils.mjs";
import { readTicketIndexJson, writeTicketIndexJson, syncActiveTicketId, generateTicketId, syncToPipeline } from "./cli-ticket-index.mjs";
import { appendTicketEntry, rebuildTicketIndexFromTopicFilesIfNeeded, writeTicketListFile, updateTicketEntryStatus } from "./cli-ticket-parser.mjs";
import { loadInitConfig } from "./cli-utils.mjs";
import { parsePlan } from "./plan-parser.mjs";
import ejs from "ejs";
import YAML from "yaml";

import { createInterface } from "readline";
import { selectOne } from "./cli-prompts.mjs";

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

function resolveTicketTemplate(cwd, docsLanguageInput) {
  const config = loadInitConfig(cwd) || {};
  const docsLanguage = resolveDocsLanguage(docsLanguageInput || config.docsLanguage || "auto");

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

export async function runTicketCreate(opts) {
  if (!opts.topic && !opts.ref) throw new Error("ticket create requires --topic or --ref");
  
  const inferred = opts.ref ? inferRefTitleAndTopic(opts) : null;
  const topic = toSlug(opts.topic || inferred?.topic || "ticket");
  const title = opts.topic || inferred?.title || "ticket";
  const group = toSlug(opts.group || "sub");

  await ensurePhase0Validation(opts);

  let path, source;
  if (opts.ref) {
    path = resolveReferencedTicketPath(opts);
    source = "ticket-reference";
  } else {
    const { tplText, docsLanguage } = resolveTicketTemplate(opts.cwd, opts.docsLanguage);

    // Find nearest or create in CWD if missing
    const ticketDir = detectConsumerTicketDir(opts.cwd, { createIfMissing: true });

    let parsedPlan = null;
    let finalTitle = title;
    let finalTopic = topic;
    
    if (opts.fromPlan) {
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

    // Auto-close only the current active ticket (not all open tickets — parallel work safety)
    const activeId = indexJson.activeTicketId;
    if (activeId) {
      const activeEntry = indexJson.entries.find(e => e.id === activeId && (e.status === "open" || e.status === "active"));
      if (activeEntry) {
        activeEntry.status = "closed";
        activeEntry.updatedAt = new Date().toISOString();
        const staleAbsPath = join(opts.cwd, activeEntry.path);
        if (existsSync(staleAbsPath)) {
          try {
            const body = readFileSync(staleAbsPath, "utf8");
            const parsed = parseFrontMatter(body);
            if (parsed.meta.status !== "closed") {
              parsed.meta.status = "closed";
              const newBody = stringifyFrontMatter(parsed.meta, parsed.content);
              writeFileSync(staleAbsPath, newBody, "utf8");
            }
          } catch (err) { /* skip sync errors */ }
        }
        writeTicketIndexJson(opts.cwd, indexJson);
        console.log(`[AUTO-CLOSE] Previous active ticket closed: ${activeId}`);
      }
    }

    // Warn about other open tickets (may be parallel work — do NOT close them)
    const otherOpen = indexJson.entries.filter(e => (e.status === "open" || e.status === "active") && e.id !== activeId);
    if (otherOpen.length > 0) {
      console.warn(`[WARNING] ${otherOpen.length} other open ticket(s) found: ${otherOpen.map(t => t.id).join(", ")}. Not closing — may be parallel work.`);
    }


    const ticketId = generateTicketId(finalTopic, indexJson.entries);
    const finalFileName = `${ticketId}.md`;

    const abs = join(ticketDir, group, finalFileName);
    mkdirSync(join(ticketDir, group), { recursive: true });
    path = toRepoRelativePath(opts.cwd, abs);

    let prevTicketEntry = null;
    if (opts.chain) {
      prevTicketEntry = pickTicketEntry({ latest: true }, indexJson);
    }

    const summary = (opts.summary || parsedPlan?.summary || "").trim();
    if (!summary) {
      throw new Error("[VALIDATION FAILED] 'summary' is mandatory and cannot be empty. Please provide a meaningful summary via --summary or within your plan.");
    }

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
      planLink: `.deuk-agent/docs/plans/${ticketId}-plan.md`,
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
      finalContent = ejs.render(tplText, { meta, frontmatter });
    }
    
    writeFileSync(abs, finalContent, "utf8");
    source = "ticket-create";

    updatePreviousTicketRef(opts.cwd, prevTicketEntry, ticketId);

    console.log(`Ticket created: ${toFileUri(abs)}`);
    
    // Remote Sync Hook
    const configSync = loadInitConfig(opts.cwd);
    if (configSync && configSync.remoteSync && configSync.pipelineUrl) {
      syncToPipeline(configSync.pipelineUrl, { action: "create", ticket: meta });
    }

    appendTicketEntry(opts.cwd, {
      id: ticketId,
      title, topic, group, project: opts.project || "global",
      createdAt: new Date().toISOString(), path, source
    }, opts);
  }

  syncActiveTicketId(opts.cwd);
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
  const entry = updateTicketEntryStatus(opts.cwd, opts);
  syncActiveTicketId(opts.cwd);
  console.log(`ticket: ${opts.status} -> ${entry.topic} (${entry.path})`);
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
  if (!found) throw new Error("No matching ticket found");
  
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



function distillKnowledge(absPath, ticketId, cwd) {
  try {
    const body = readFileSync(absPath, "utf8");
    const { meta, content } = parseFrontMatter(body);
    
    const sections = {};
    const sectionNames = ["Design Decisions", "Analysis & Constraints", "Tasks", "Done When"];
    
    for (const name of sectionNames) {
      const regex = new RegExp(`## ${name}[\\s\\S]*?(?=## |$)`, "i");
      const match = content.match(regex);
      if (match) {
        sections[name] = match[0].replace(new RegExp(`## ${name}`, "i"), "").trim();
      }
    }

    const knowledgeDir = join(cwd, AGENT_ROOT_DIR, "knowledge");
    if (!existsSync(knowledgeDir)) mkdirSync(knowledgeDir, { recursive: true });

    const dest = join(knowledgeDir, `${ticketId}.json`);
    const data = {
      id: ticketId,
      title: meta.title || ticketId,
      project: meta.project || "global",
      createdAt: meta.createdAt,
      archivedAt: new Date().toISOString(),
      sections
    };

    writeFileSync(dest, JSON.stringify(data, null, 2), "utf8");
    console.log(`Knowledge distilled to ${toFileUri(dest)}`);
  } catch (err) {
    console.warn(`[WARNING] Knowledge distillation failed for ${ticketId}: ${err.message}`);
  }
}

export function pickTicketEntry(opts, indexJson) {
  const rows = [...indexJson.entries].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
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

  const absPath = join(opts.cwd, found.path);
  if (!existsSync(absPath)) {
    throw new Error("ticket archive: file not found " + found.path);
  }

  const archiveDir = join(ticketDir, "archive", found.group || "sub");
  if (!opts.dryRun) mkdirSync(archiveDir, { recursive: true });
  
  const fileName = found.path.split(/[/\\]/).pop();
  const newAbsPath = join(archiveDir, fileName);
  const bodyLines = readFileSync(absPath, "utf8").trimEnd().split(/\r?\n/);
  
  // Auto-search for report if not provided
  if (!opts.report) {
    const reportDir = join(opts.cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
    const potentialReport = fileName.replace(/\.md$/i, "-report.md");
    const potentialPath = join(reportDir, potentialReport);
    if (existsSync(potentialPath)) {
      opts.report = toRepoRelativePath(opts.cwd, potentialPath);
      console.log(`ticket archive: auto-detected report at ${opts.report}`);
    }
  }

  if (opts.report) {
    const reportSrc = resolve(opts.cwd, opts.report);
    if (!existsSync(reportSrc)) {
      throw new Error("ticket archive: report file not found " + opts.report);
    }
    const reportDir = join(opts.cwd, AGENT_ROOT_DIR, "docs", "walkthroughs");
    if (!opts.dryRun) mkdirSync(reportDir, { recursive: true });
    
    const reportBaseName = fileName.replace(/\.md$/i, "-report.md");
    const reportDest = join(reportDir, reportBaseName);
    if (!opts.dryRun) copyFileSync(reportSrc, reportDest);
    console.log("ticket archive: copied report to " + toFileUri(reportDest));
    
    bodyLines.push("");
    bodyLines.push("## 📄 Attached Report");
    const relativeLink = toPosixPath(relative(dirname(newAbsPath), reportDest));
    bodyLines.push(`- [View Report](${relativeLink})`);
  }

  if (opts.dryRun) {
    console.log("ticket archive: would move " + toRepoRelativePath(opts.cwd, absPath) + " to " + toRepoRelativePath(opts.cwd, newAbsPath));
    return;
  }

  // Knowledge Distillation before moving/deleting
  distillKnowledge(absPath, found.id, opts.cwd);

  writeFileSync(newAbsPath, bodyLines.join("\n") + "\n", "utf8");
  rmSync(absPath);
  console.log("ticket archive: moved ticket to " + toFileUri(newAbsPath));

  const entryIdx = indexJson.entries.findIndex(e => e.id === found.id);
  if (entryIdx >= 0) {
    indexJson.entries[entryIdx].status = "archived";
    indexJson.entries[entryIdx].updatedAt = new Date().toISOString();
  }

  writeTicketIndexJson(opts.cwd, indexJson, opts);
  if (opts.render) writeTicketListFile(opts.cwd, indexJson.entries, opts);
  syncActiveTicketId(opts.cwd);
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
  writeFileSync(abs, newBody, "utf8");

  // Re-sync index to reflect the status change if any
  opts.topic = entry.topic;
  if (meta.status !== entry.status) {
    opts.status = meta.status;
    updateTicketEntryStatus(opts.cwd, opts);
  } else {
    rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: true });
  }
  
  syncActiveTicketId(opts.cwd);
  console.log(`ticket: moved -> ${entry.topic} is now in Phase ${nextPhase} (${meta.status})`);
}
