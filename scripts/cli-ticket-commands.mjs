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
import ejs from "ejs";

import { createInterface } from "readline";
import { selectOne } from "./cli-prompts.mjs";

async function ensurePhase0Validation(opts) {
  if (!opts.evidence && !opts.skipPhase0) {
    await withReadline(async (rl) => {
      try {
        const response = await selectOne(rl, "Did you perform Phase 0 RAG search? Please provide a brief summary of the evidence found (or press Enter to skip):", []);
        if (response) {
          opts.evidence = response;
        } else {
          opts.skipPhase0 = true;
        }
      } catch (e) {
        opts.skipPhase0 = true;
      }
    });
  }

  if (opts.skipPhase0) {
    if (await isMcpActive(opts.cwd)) {
      throw new Error("ticket create: --skip-phase0 is restricted and ONLY allowed when the MCP server is disconnected. The MCP server is currently detected as active. Please perform Phase 0 RAG search and provide --evidence.");
    }
  }
}

function resolveTicketTemplate(cwd, docsLanguageInput) {
  const config = loadInitConfig(cwd) || {};
  const docsLanguage = resolveDocsLanguage(docsLanguageInput || config.docsLanguage || "auto");

  const templateDir = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  const bundleTplDir = join(new URL(".", import.meta.url).pathname, "..", "bundle", "templates");

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

    const indexJson = readTicketIndexJson(opts.cwd);
    const ticketId = generateTicketId(topic, indexJson.entries);
    const finalFileName = `${ticketId}.md`;

    const abs = join(ticketDir, group, finalFileName);
    mkdirSync(join(ticketDir, group), { recursive: true });
    path = toRepoRelativePath(opts.cwd, abs);

    let prevTicketEntry = null;
    if (opts.chain) {
      prevTicketEntry = pickTicketEntry({ latest: true }, indexJson);
    }

    const meta = {
      id: ticketId,
      title,
      status: "open",
      submodule: opts.submodule || "",
      project: opts.project || "global",
      docsLanguage,
      evidence: opts.evidence || "",
      createdAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      prevTicket: prevTicketEntry ? prevTicketEntry.id : "",
    };

    const finalContent = ejs.render(tplText, { meta });
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
    await withReadline(async (rl) => {
      const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
      const choices = index.entries
        .filter(e => e.status !== "closed")
        .map(e => ({ label: `[${e.group}] ${e.title}`, value: e.topic }));
      if (choices.length > 0) {
        opts.topic = await selectOne(rl, "Choose a ticket to close:", choices);
      } else {
        throw new Error("No open tickets found to close.");
      }
    });
  }
  opts.status = "closed";
  const entry = updateTicketEntryStatus(opts.cwd, opts);
  syncActiveTicketId(opts.cwd);
  console.log(`ticket: closed -> ${entry.topic} (${entry.path})`);
}

export async function runTicketUse(opts) {
  const index = rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: false });
  syncActiveTicketId(opts.cwd);
  
  let targetTopic = opts.topic;
  if (!targetTopic && !opts.latest) {
    await withReadline(async (rl) => {
      const choices = index.entries
        .map(e => ({ label: `${e.status === 'closed' ? '✓ ' : ''}[${e.group}] ${e.title}`, value: e.topic }));
      if (choices.length > 0) {
        targetTopic = await selectOne(rl, "Choose a ticket to use:", choices);
      }
    });
  }

  const found = opts.latest ? index.entries[0] : index.entries.find(e => e.topic.includes(targetTopic));
  if (!found) throw new Error("No matching ticket found");
  
  const posixPath = toPosixPath(found.path);
  const absPath = toPosixPath(join(opts.cwd, found.path));
  if (opts.pathOnly) console.log(absPath);
  else {
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
  
  const sorted = files.sort((a, b) => {
    return statSync(join(reportDir, b)).mtime.getTime() - statSync(join(reportDir, a)).mtime.getTime();
  });
  
  sorted.slice(0, opts.limit || 30).forEach(f => {
    console.log(`  - [${f}](${toFileUri(join(reportDir, f))})`);
  });
  console.log("");
}

export async function runTicketRebuild(opts) {
  console.log("Rebuilding INDEX.json from markdown files...");
  rebuildTicketIndexFromTopicFilesIfNeeded(opts.cwd, { ...opts, force: true, rebuild: true });
}
