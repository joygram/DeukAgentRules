#!/usr/bin/env node
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "fs";
import { createInterface } from "readline";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import {
  applyAgents,
  applyRules,
  readBundleAgents,
  resolveMarkers,
} from "./merge-logic.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const bundleRoot = join(pkgRoot, "bundle");

/** Default directory for persisted tickets; `init` adds it to `.gitignore`. */
const TICKET_DIR_NAME = ".deuk-agent-ticket";
const GITIGNORE_TICKET_MARKER =
  "# deuk-agent-rule: ticket directory (local, not committed by default)";
const GITIGNORE_LOCAL_OVERRIDE_MARKER =
  "# deuk-agent-rule: local runtime artifacts (do not commit)";
const TICKET_LIST_FILENAME = "TICKET_LIST.md";
const TICKET_INDEX_FILENAME = "INDEX.json";
const PROJECT_OVERRIDE_DIR_NAME = ".project-overrides";
const PROJECT_OVERRIDE_AGENT_DIR_NAME = "agent";
const AGENT_TAG_GUIDE_FILENAME = "agent-rule-tags.md";

function printTicketTip() {
  console.log(
    "tip: Persist multi-session specs under " +
      TICKET_DIR_NAME +
      "/ (see README § Tickets). Keep your workflow strictly within the Ticket bounds."
  );
}

function cleanLegacyHandoffDirs(opts) {
  const legacyDir = join(opts.cwd, ".deuk-agent-handoff");
  if (existsSync(legacyDir)) {
    if (opts.dryRun) {
      console.log("cleanup: would delete legacy directory " + legacyDir);
      return;
    }
    try {
      rmSync(legacyDir, { recursive: true, force: true });
      console.log(
        "cleanup: removed legacy handoff directory (.deuk-agent-handoff)"
      );
    } catch (e) {
      console.log(
        "cleanup: failed to remove legacy handoff directory " +
          legacyDir +
          " -> " +
          e.message
      );
    }
  }
}

function ensureTicketDirAndGitignore(opts) {
  cleanLegacyHandoffDirs(opts);
  const ticketPath = join(opts.cwd, TICKET_DIR_NAME);
  const gitignorePath = join(opts.cwd, ".gitignore");
  const ignoreLine = TICKET_DIR_NAME + "/";

  if (opts.dryRun) {
    console.log(
      "ticket: would mkdir " +
        TICKET_DIR_NAME +
        "/ and ensure .gitignore ignores it"
    );
    printTicketTip();
    return;
  }

  mkdirSync(ticketPath, { recursive: true });
  console.log("ticket: " + TICKET_DIR_NAME + "/");

  let gi = "";
  if (existsSync(gitignorePath)) {
    gi = readFileSync(gitignorePath, "utf8");
    const lines = gi.split(/\r?\n/).map((l) => l.trim());
    const already =
      gi.includes(ignoreLine) ||
      lines.some(
        (t) => t === TICKET_DIR_NAME || t === ignoreLine.replace(/\/$/, "")
      );
    if (already) {
      console.log(".gitignore: already ignores " + TICKET_DIR_NAME);
      printTicketTip();
      return;
    }
    const block = "\n" + GITIGNORE_TICKET_MARKER + "\n" + ignoreLine + "\n";
    appendFileSync(gitignorePath, block, "utf8");
    console.log(".gitignore: appended " + ignoreLine.trim());
    printTicketTip();
  } else {
    writeFileSync(
      gitignorePath,
      GITIGNORE_TICKET_MARKER + "\n" + ignoreLine + "\n",
      "utf8"
    );
    console.log(".gitignore: created with " + ignoreLine.trim());
    printTicketTip();
  }
}

function ensureIgnoreLines(opts, marker, linesToIgnore) {
  const gitignorePath = join(opts.cwd, ".gitignore");
  const normalized = linesToIgnore.map((l) => String(l).trim()).filter(Boolean);

  let existing = "";
  if (existsSync(gitignorePath)) {
    existing = readFileSync(gitignorePath, "utf8");
  }
  const trimmedLines = existing.split(/\r?\n/).map((l) => l.trim());
  const missing = normalized.filter(
    (line) =>
      !existing.includes(line) &&
      !trimmedLines.some(
        (t) => t === line || t === line.replace(/\/$/, "") || t === line + "/"
      )
  );

  if (missing.length === 0) {
    console.log(".gitignore: local runtime ignore lines already present");
    return;
  }

  if (opts.dryRun) {
    console.log(
      ".gitignore: would append local runtime ignore lines: " +
        missing.join(", ")
    );
    return;
  }

  const block = "\n" + marker + "\n" + missing.join("\n") + "\n";
  if (existsSync(gitignorePath)) {
    appendFileSync(gitignorePath, block, "utf8");
  } else {
    writeFileSync(
      gitignorePath,
      marker + "\n" + missing.join("\n") + "\n",
      "utf8"
    );
  }
  console.log(".gitignore: appended local runtime ignore lines");
}

function ensureProjectOverrideLayout(opts) {
  const rootDir = join(opts.cwd, PROJECT_OVERRIDE_DIR_NAME);
  const agentDir = join(rootDir, PROJECT_OVERRIDE_AGENT_DIR_NAME);
  const rootReadme = join(rootDir, "README.md");
  const agentReadme = join(agentDir, "README.md");

  if (opts.dryRun) {
    console.log(
      "override: would ensure " +
        PROJECT_OVERRIDE_DIR_NAME +
        "/" +
        PROJECT_OVERRIDE_AGENT_DIR_NAME +
        "/"
    );
    return;
  }

  mkdirSync(agentDir, { recursive: true });

  if (!existsSync(rootReadme)) {
    writeFileSync(
      rootReadme,
      "# Project Overrides\n\n" +
        "This directory contains team-shared project override settings for AI workflows.\n\n" +
        "- Use project-level guidance only.\n" +
        "- Keep runtime artifacts and personal cache data out of git.\n" +
        "- Template source-of-truth remains in DeukAgentRules.\n",
      "utf8"
    );
    console.log(
      "override: created " + toRepoRelativePath(opts.cwd, rootReadme)
    );
  }

  if (!existsSync(agentReadme)) {
    writeFileSync(
      agentReadme,
      "# Agent Override Settings\n\n" +
        "Place repository-shared override policies here.\n\n" +
        "Do not store runtime ticket data, personal IDE cache, or generated outputs here.\n" +
        "Template semantics must be updated in DeukAgentRules first.\n",
      "utf8"
    );
    console.log(
      "override: created " + toRepoRelativePath(opts.cwd, agentReadme)
    );
  }
}

function maybeMigrateOverridesOnInit(opts) {
  ensureProjectOverrideLayout(opts);
  ensureIgnoreLines(opts, GITIGNORE_LOCAL_OVERRIDE_MARKER, [
    ".cursor/",
    ".cursorignore",
    ".cursorrules",
    ".codebuddy/",
    ".github/prompts/",
    "tmp/",
  ]);
}

function ensureTemplatesDirAndCopyBundle(opts) {
  const sourceTemplatesDir = join(bundleRoot, "templates");
  const targetTemplatesDir = join(opts.cwd, ".deuk-agent-templates");
  if (!existsSync(sourceTemplatesDir)) return;
  if (opts.dryRun) {
    console.log(
      "templates: would copy bundle/templates to .deuk-agent-templates/"
    );
    return;
  }
  if (!existsSync(targetTemplatesDir)) {
    mkdirSync(targetTemplatesDir, { recursive: true });
    console.log("templates: created " + targetTemplatesDir + "/");
  }
  const files = readdirSync(sourceTemplatesDir);
  for (const file of files) {
    const srcFile = join(sourceTemplatesDir, file);
    const destFile = join(targetTemplatesDir, file);
    if (!existsSync(destFile)) {
      copyFileSync(srcFile, destFile);
      console.log("templates: copied " + file + " to .deuk-agent-templates/");
    }
  }
}

function toPosixPath(p) {
  return p.replace(/\\/g, "/");
}

function toRepoRelativePath(cwd, absPath) {
  return toPosixPath(relative(cwd, absPath));
}

function toSlug(input) {
  return (
    String(input || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "ticket"
  );
}

function formatTimestampForFile(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${y}${m}${day}-${hh}${mm}${ss}`;
}

function detectConsumerTicketDir(cwd) {
  const consumerPath = join(cwd, "DeukAgentRules", "ticket");
  const localPath = join(cwd, "ticket");
  if (existsSync(consumerPath)) return consumerPath;
  if (existsSync(localPath)) return localPath;
  return consumerPath;
}

function readLegacyLatestPath(cwd) {
  const candidateDirs = [
    join(cwd, "DeukAgentRules", "ticket"),
    join(cwd, "ticket"),
  ];
  for (const dir of candidateDirs) {
    const p = join(dir, "LATEST.md");
    if (existsSync(p)) return p;
  }
  return null;
}

function readTicketIndexJson(cwd) {
  const p = join(cwd, TICKET_DIR_NAME, TICKET_INDEX_FILENAME);
  if (!existsSync(p)) {
    return { version: 1, updatedAt: null, entries: [] };
  }
  try {
    const j = JSON.parse(readFileSync(p, "utf8"));
    if (!Array.isArray(j.entries))
      throw new Error("Invalid INDEX.json: entries must be an array");
    return { version: 1, updatedAt: j.updatedAt ?? null, entries: j.entries };
  } catch {
    return { version: 1, updatedAt: null, entries: [] };
  }
}

function writeTicketIndexJson(cwd, indexJson, opts) {
  const dir = join(cwd, TICKET_DIR_NAME);
  const p = join(dir, TICKET_INDEX_FILENAME);
  if (opts.dryRun) {
    console.log("ticket: would write " + toRepoRelativePath(cwd, p));
    return;
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(p, JSON.stringify(indexJson, null, 2) + "\n", "utf8");
  console.log("ticket: wrote " + toRepoRelativePath(cwd, p));
}

function renderTicketListMarkdown(cwd, entries) {
  const sorted = [...entries].sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );
  const active = sorted.filter(e => e.status !== "archived");
  const archived = sorted.filter(e => e.status === "archived");
  const latest = active[0] || null;

  const lines = [];
  lines.push("# Ticket List");
  lines.push("");
  lines.push(`> Source index: \`${TICKET_DIR_NAME}/${TICKET_INDEX_FILENAME}\``);
  lines.push("");
  lines.push("## Latest");
  lines.push("");
  if (latest) {
    const relPath = latest.path;
    const group = latest.group || "sub";
    const project = latest.project || "global";
    const createdAt = latest.createdAt || "-";
    lines.push(`- [${latest.title}](${relPath})`);
    lines.push(
      `- group: \`${group}\` / project: \`${project}\` / created: \`${createdAt}\``
    );
  } else {
    lines.push("- No active ticket entries yet.");
  }
  lines.push("");
  lines.push("## Active Entries");
  lines.push("");
  lines.push("| # | Title | Group | Project | Created | Path |");
  lines.push("|---|---|---|---|---|---|");
  active.slice(0, 30).forEach((e, i) => {
    const title = String(e.title || "(untitled)").replace(/\|/g, "\\|");
    const group = String(e.group || "sub").replace(/\|/g, "\\|");
    const project = String(e.project || "global").replace(/\|/g, "\\|");
    const createdAt = String(e.createdAt || "-").replace(/\|/g, "\\|");
    lines.push(
      `| ${i + 1} | ${title} | ${group} | ${project} | ${createdAt} | [open](${
        e.path
      }) |`
    );
  });
  lines.push("");
  
  if (archived.length > 0) {
    lines.push("## Archived Entries");
    lines.push("");
    lines.push("| # | Title | Group | Project | Created | Path |");
    lines.push("|---|---|---|---|---|---|");
    archived.slice(0, 30).forEach((e, i) => {
      const title = String(e.title || "(untitled)").replace(/\|/g, "\\|");
      const group = String(e.group || "sub").replace(/\|/g, "\\|");
      const project = String(e.project || "global").replace(/\|/g, "\\|");
      const createdAt = String(e.createdAt || "-").replace(/\|/g, "\\|");
      lines.push(
        `| ${i + 1} | ${title} | ${group} | ${project} | ${createdAt} | [view](${
          e.path
        }) |`
      );
    });
    lines.push("");
  }
  
  lines.push("## Commands");
  lines.push("");
  lines.push("```bash");
  lines.push("npx deuk-agent-rule ticket list");
  lines.push("npx deuk-agent-rule ticket use --latest");
  lines.push("npx deuk-agent-rule ticket archive --latest");
  lines.push("```\n");

  return lines.join("\n");
}

function writeTicketListFile(cwd, entries, opts) {
  const ticketDir = detectConsumerTicketDir(cwd);
  const p = join(ticketDir, TICKET_LIST_FILENAME);
  const body = renderTicketListMarkdown(cwd, entries);
  if (opts.dryRun) {
    console.log("ticket: would write " + toRepoRelativePath(cwd, p));
    return;
  }
  mkdirSync(ticketDir, { recursive: true });
  writeFileSync(p, body, "utf8");
  console.log("ticket: wrote " + toRepoRelativePath(cwd, p));
}

function writeLatestStub(cwd, opts) {
  const ticketDir = detectConsumerTicketDir(cwd);
  const latestPath = join(ticketDir, "LATEST.md");
  const listRel = toRepoRelativePath(
    cwd,
    join(ticketDir, TICKET_LIST_FILENAME)
  );
  const body =
    "# Legacy pointer\n\n" +
    "This file no longer stores full ticket bodies.\n\n" +
    `See \`${listRel}\` for indexed tickets.\n`;
  if (opts.dryRun) {
    console.log(
      "ticket: would replace " +
        toRepoRelativePath(cwd, latestPath) +
        " with a pointer stub"
    );
    return;
  }
  mkdirSync(ticketDir, { recursive: true });
  writeFileSync(latestPath, body, "utf8");
  console.log("ticket: updated " + toRepoRelativePath(cwd, latestPath));
}

function parseLegacyTicketMeta(legacyBody) {
  const titleMatch = legacyBody.match(/^##\s+Task:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : "Migrated legacy ticket";

  let group = "sub";
  const lower = legacyBody.toLowerCase();
  if (lower.includes("discussion")) group = "discussion";
  else if (lower.includes("main")) group = "main";

  let project = "global";
  const projectMatch = legacyBody.match(/\b(DeukUI|DeukAgentRules)\b/i);
  if (projectMatch) project = projectMatch[1];

  return { title, group, project };
}

function makeEntryId() {
  return `ticket_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function appendTicketEntry(cwd, entry, opts) {
  const indexJson = readTicketIndexJson(cwd);
  const next = {
    version: 1,
    updatedAt: new Date().toISOString(),
    entries: [entry, ...indexJson.entries],
  };
  writeTicketIndexJson(cwd, next, opts);
  writeTicketListFile(cwd, next.entries, opts);
}

function getLegacyMigrationCandidate(cwd) {
  const latestPath = readLegacyLatestPath(cwd);
  if (!latestPath) return null;

  const ticketDir = dirname(latestPath);
  const listPath = join(ticketDir, TICKET_LIST_FILENAME);
  if (existsSync(listPath)) return null;

  const body = readFileSync(latestPath, "utf8");
  const lineCount = body
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0).length;
  const hasTaskHeader = /^##\s+Task:/m.test(body);
  if (!hasTaskHeader || lineCount <= 5) return null;

  return { latestPath, body };
}

// ---------------------------------------------------------------------------
// Interactive prompt helpers (no external deps)
// ---------------------------------------------------------------------------

function isNonInteractive(opts) {
  return opts.nonInteractive || process.env.CI || !process.stdin.isTTY;
}

async function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function askYesNo(question, defaultYes = true) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const suffix = defaultYes ? " [Y/n]: " : " [y/N]: ";
    const ans = (await ask(rl, question + suffix)).trim().toLowerCase();
    if (!ans) return defaultYes;
    return ans === "y" || ans === "yes";
  } finally {
    rl.close();
  }
}

async function selectOne(rl, prompt, choices) {
  console.log("\n" + prompt);
  choices.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`));
  while (true) {
    const ans = (await ask(rl, `  Choice [1-${choices.length}]: `)).trim();
    const idx = parseInt(ans, 10) - 1;
    if (idx >= 0 && idx < choices.length) return choices[idx].value;
    console.log("  Please enter a number between 1 and " + choices.length);
  }
}

async function selectMany(rl, prompt, choices) {
  console.log("\n" + prompt + " (comma-separated numbers, or 'all')");
  choices.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`));
  while (true) {
    const ans = (await ask(rl, `  Choices: `)).trim().toLowerCase();
    if (ans === "all" || ans === "") return choices.map((c) => c.value);
    const parts = ans.split(/[,\s]+/).map((s) => parseInt(s, 10) - 1);
    if (parts.every((i) => i >= 0 && i < choices.length)) {
      return parts.map((i) => choices[i].value);
    }
    console.log("  Invalid selection, try again.");
  }
}

const STACKS = [
  { label: "Unity / C#", value: "unity" },
  { label: "Next.js + C#", value: "nextjs-dotnet" },
  { label: "Web (React / Vue / general)", value: "web" },
  { label: "Java / Spring Boot", value: "java" },
  { label: "Other / skip", value: "other" },
];

/** Survey is persisted and used to generate per-agent tagging/reference guidance on init. */
const AGENT_TOOLS = [
  { label: "Cursor", value: "cursor" },
  { label: "GitHub Copilot", value: "copilot" },
  { label: "Gemini / Antigravity", value: "gemini" },
  { label: "Claude Sonnet/Opus (Cursor / Claude Code)", value: "claude" },
  { label: "Windsurf", value: "windsurf" },
  { label: "JetBrains AI Assistant", value: "jetbrains" },
  { label: "All of the above", value: "all" },
  { label: "Other / skip", value: "other" },
];

/** Written after first interactive init; reused on later inits unless --interactive or schema mismatch. */
const INIT_CONFIG_VERSION = 1;
const INIT_CONFIG_FILENAME = ".deuk-agent-rule.config.json";

const AGENT_TAG_META = {
  cursor: {
    name: "Cursor",
    rulePath: ".cursorrules, .cursor/rules/*.mdc",
    tag: "agent:cursor",
    sharedRef: "AGENTS.md",
  },
  copilot: {
    name: "GitHub Copilot",
    rulePath: ".github/copilot-instructions.md",
    tag: "agent:copilot",
    sharedRef: "AGENTS.md",
  },
  gemini: {
    name: "Gemini / Antigravity",
    rulePath: "GEMINI.md",
    tag: "agent:gemini",
    sharedRef: "AGENTS.md",
  },
  claude: {
    name: "Claude Sonnet/Opus",
    rulePath: "CLAUDE.md (or tool-specific Claude rules)",
    tag: "agent:claude-sonnet",
    sharedRef: "AGENTS.md",
  },
  windsurf: {
    name: "Windsurf",
    rulePath: "Windsurf workspace rules",
    tag: "agent:windsurf",
    sharedRef: "AGENTS.md",
  },
  jetbrains: {
    name: "JetBrains AI Assistant",
    rulePath: "JetBrains AI instructions",
    tag: "agent:jetbrains",
    sharedRef: "AGENTS.md",
  },
};

function normalizeSelectedAgentTools(tools) {
  if (!Array.isArray(tools) || tools.length === 0 || tools.includes("all")) {
    return ["cursor", "copilot", "gemini", "claude"];
  }
  const known = new Set(Object.keys(AGENT_TAG_META));
  const selected = [];
  for (const t of tools) {
    if (known.has(t) && !selected.includes(t)) selected.push(t);
  }
  if (selected.length === 0) {
    return ["cursor", "copilot", "gemini", "claude"];
  }
  return selected;
}

function buildAgentTagGuideContent(selectedTools) {
  const lines = [
    "# Agent Rule Tags",
    "",
    "Purpose:",
    "- Tag each agent rule set and force a shared baseline reference.",
    "- Keep behavior aligned across tools while minimizing token waste.",
    "",
    "Mandatory shared reference:",
    "- Every agent-specific rule file should include this line near the top:",
    "  `Read and follow root AGENTS.md for project-wide rules.`",
    "",
    "## Selected Agent Tags",
    "",
    "| Agent | Rule location | Required tag | Shared rule reference |",
    "|---|---|---|---|",
  ];

  for (const key of selectedTools) {
    const meta = AGENT_TAG_META[key];
    if (!meta) continue;
    lines.push(
      `| ${meta.name} | ${meta.rulePath} | ${meta.tag} | ${meta.sharedRef} |`
    );
  }

  lines.push(
    "",
    "## Claude Sonnet Free-Cycle Guardrail",
    "",
    "When running Claude Sonnet on a free tier, enforce one-cycle mode by default:",
    "- Output target: keep default answer within 5-10 lines unless user asks `EXPLAIN`.",
    "- Read limit: up to 3 files per cycle, then stop and summarize.",
    "- Execution limit: perform one concrete patch cycle, then wait for user confirmation.",
    "- Option policy: provide one best fix only; avoid multiple alternatives.",
    "",
    "Suggested runtime profile mapping:",
    "- Claude Sonnet free tier: `claude-sonnet` (high-cost mode)",
    "- Claude Opus: `claude-opus` (high-cost mode)",
    "- Gemini / Antigravity: `gemini-fast`",
    "- Unknown model: `unknown` (treat as high-cost mode)",
    ""
  );

  return lines.join("\n");
}

function ensureAgentTagGuide(opts) {
  const selectedTools = normalizeSelectedAgentTools(opts.agentTools);
  const agentDir = join(
    opts.cwd,
    PROJECT_OVERRIDE_DIR_NAME,
    PROJECT_OVERRIDE_AGENT_DIR_NAME
  );
  const guidePath = join(agentDir, AGENT_TAG_GUIDE_FILENAME);
  const content = buildAgentTagGuideContent(selectedTools);

  if (opts.dryRun) {
    console.log(
      "override: would write " +
        toRepoRelativePath(opts.cwd, guidePath) +
        " (selected agents: " +
        selectedTools.join(", ") +
        ")"
    );
    return;
  }

  mkdirSync(agentDir, { recursive: true });
  writeFileSync(guidePath, content, "utf8");
  console.log("override: wrote " + toRepoRelativePath(opts.cwd, guidePath));
}

function loadInitConfig(cwd) {
  const p = join(cwd, INIT_CONFIG_FILENAME);
  if (!existsSync(p)) return null;
  try {
    const j = JSON.parse(readFileSync(p, "utf8"));
    if (j.version !== INIT_CONFIG_VERSION) return null;
    const allowedStack = new Set(STACKS.map((s) => s.value));
    if (!allowedStack.has(j.stack)) return null;
    const allowedTools = new Set(AGENT_TOOLS.map((t) => t.value));
    if (
      !Array.isArray(j.agentTools) ||
      !j.agentTools.every((t) => allowedTools.has(t))
    )
      return null;
    if (!["inject", "skip", "overwrite"].includes(j.agentsMode)) return null;
    return {
      stack: j.stack,
      agentTools: j.agentTools,
      agentsMode: j.agentsMode,
    };
  } catch {
    return null;
  }
}

function writeInitConfig(cwd, opts) {
  const p = join(cwd, INIT_CONFIG_FILENAME);
  const body = {
    version: INIT_CONFIG_VERSION,
    stack: opts.stack,
    agentTools: opts.agentTools,
    agentsMode: opts.agents ?? "inject",
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(p, JSON.stringify(body, null, 2) + "\n", "utf8");
  console.log("saved: " + INIT_CONFIG_FILENAME);
}

async function runInteractive(opts) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log("\nDeukAgentRules init — let's configure your workspace.\n");

    const stack = await selectOne(
      rl,
      "What is your primary tech stack?",
      STACKS
    );
    const tools = await selectMany(
      rl,
      "Which agent tools do you use?",
      AGENT_TOOLS
    );

    const targetAgents = join(opts.cwd, "AGENTS.md");
    let agentsDefault = "inject";
    if (!existsSync(targetAgents)) {
      agentsDefault = "inject"; // will append markers
      console.log("\n  No AGENTS.md found — will create with markers.");
    } else {
      const content = readFileSync(targetAgents, "utf8");
      const hasMarkers = content.includes("deuk-agent-rule:begin");
      if (!hasMarkers) {
        const choice = await selectOne(
          rl,
          "AGENTS.md exists but has no markers. How to apply?",
          [
            {
              label: "Append managed block at the end (safe)",
              value: "inject",
            },
            { label: "Overwrite entire AGENTS.md", value: "overwrite" },
            { label: "Skip AGENTS.md", value: "skip" },
          ]
        );
        agentsDefault = choice;
      }
    }

    opts.agents = opts.agents ?? agentsDefault;
    opts.stack = stack;
    opts.agentTools = tools;

    console.log("\n  Stack : " + stack);
    console.log("  Tools : " + (tools.join(", ") || "none"));
    console.log("  AGENTS: " + opts.agents + "\n");
  } finally {
    rl.close();
  }
}

// ---------------------------------------------------------------------------
// Help / arg parsing
// ---------------------------------------------------------------------------

function printHelp() {
  console.log(
    `DeukAgentRules (npm: deuk-agent-rule) — AGENTS.md + .cursor/rules templates

Usage:
  npx deuk-agent-rule init   [options]   # interactive by default
  npx deuk-agent-rule merge  [options]
  npx deuk-agent-rule ticket <create|list|use|migrate|archive> [options]

Options:
  --cwd <path>          Target repo root (default: current directory)
  --dry-run             Print actions; do not write files
  --non-interactive     CI/scripts: no prompts; use --agents/--rules (no saved config read)
  --interactive         Ask questions even if .deuk-agent-rule.config.json exists
  --tag <id>            Marker id (default: deuk-agent-rule)
  --agents <mode>       inject | skip | overwrite
  --rules <mode>        prefix | skip | overwrite
  --backup              Write *.bak before overwrite
  --append-if-no-markers
  --marker-begin / --marker-end  Custom marker strings (both required)

Ticket options:
  ticket create --topic <name> [--group <name>] [--project <name>] [--content <text>] [--from <path>]
  ticket list [--group <name>] [--project <name>] [--topic <prefix>] [--limit <n>] [--all] [--archived]
  ticket use [--latest] [--topic <prefix>] [--path-only] [--print-content]
  ticket archive [--latest | --topic <prefix>] [--report <path>]
  ticket reports [--limit <n>]
  ticket migrate

init also creates .deuk-agent-ticket/ and appends it to .gitignore (local tickets).
init also prepares .project-overrides/agent/ and migrates local runtime ignore rules.
After npm update, run init again: deuk-agent-rule-*.mdc rules refresh from the bundle (no separate merge needed).

Korean: package README.ko.md
`
  );
}

function parseTicketArgs(argv) {
  const out = {
    cwd: process.cwd(),
    dryRun: false,
    nonInteractive: false,
    topic: undefined,
    group: "sub",
    project: "global",
    content: undefined,
    from: undefined,
    limit: 20,
    latest: false,
    pathOnly: false,
    printContent: false,
    title: undefined,
    report: undefined,
    all: false,
    archived: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--cwd") {
      out.cwd = argv[++i];
      if (!out.cwd) throw new Error("--cwd requires a path");
    } else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--non-interactive") out.nonInteractive = true;
    else if (a === "--topic") {
      out.topic = argv[++i];
      if (!out.topic) throw new Error("--topic requires a value");
    } else if (a === "--group") {
      out.group = argv[++i];
      if (!out.group) throw new Error("--group requires a value");
    } else if (a === "--project") {
      out.project = argv[++i];
      if (!out.project) throw new Error("--project requires a value");
    } else if (a === "--content") {
      out.content = argv[++i];
      if (out.content == null) throw new Error("--content requires a value");
    } else if (a === "--from") {
      out.from = argv[++i];
      if (!out.from) throw new Error("--from requires a file path");
    } else if (a === "--limit") {
      out.limit = parseInt(argv[++i], 10);
    } else if (a === "--latest") out.latest = true;
    else if (a === "--path-only") out.pathOnly = true;
    else if (a === "--print-content") out.printContent = true;
    else if (a === "--all") out.all = true;
    else if (a === "--archived") out.archived = true;
    else if (a === "--title") {
      out.title = argv[++i];
      if (out.title == null) throw new Error("--title requires a value");
    } else if (a === "--report") {
      out.report = argv[++i];
      if (!out.report) throw new Error("--report requires a path");
    } else if (a === "-h" || a === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error("Unknown ticket argument: " + a);
    }
  }

  return out;
}

function parseArgs(argv) {
  const out = {
    cwd: process.cwd(),
    dryRun: false,
    backup: false,
    tag: undefined,
    markerBegin: undefined,
    markerEnd: undefined,
    agents: undefined,
    rules: undefined,
    appendIfNoMarkers: false,
    nonInteractive: false,
    interactive: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--cwd") {
      out.cwd = argv[++i];
      if (!out.cwd) throw new Error("--cwd requires a path");
    } else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--backup") out.backup = true;
    else if (a === "--non-interactive") out.nonInteractive = true;
    else if (a === "--interactive") out.interactive = true;
    else if (a === "--tag") {
      out.tag = argv[++i];
      if (out.tag == null) throw new Error("--tag requires a value");
    } else if (a === "--marker-begin") {
      out.markerBegin = argv[++i];
      if (out.markerBegin == null)
        throw new Error("--marker-begin requires a value");
    } else if (a === "--marker-end") {
      out.markerEnd = argv[++i];
      if (out.markerEnd == null)
        throw new Error("--marker-end requires a value");
    } else if (a === "--agents") {
      out.agents = argv[++i];
      if (!out.agents)
        throw new Error("--agents requires skip|overwrite|inject");
    } else if (a === "--rules") {
      out.rules = argv[++i];
      if (!out.rules) throw new Error("--rules requires skip|overwrite|prefix");
    } else if (a === "--append-if-no-markers") out.appendIfNoMarkers = true;
    else if (a === "-h" || a === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error("Unknown argument: " + a);
    }
  }
  return out;
}

function validateMode(name, v, allowed) {
  if (!allowed.includes(v)) {
    throw new Error(
      "Invalid " + name + ": " + v + " (allowed: " + allowed.join(", ") + ")"
    );
  }
}

// ---------------------------------------------------------------------------
// init / merge runners
// ---------------------------------------------------------------------------

async function maybeMigrateLegacyOnInit(opts) {
  const candidate = getLegacyMigrationCandidate(opts.cwd);
  if (!candidate) return;

  if (opts.dryRun) {
    console.log(
      "ticket: would migrate legacy LATEST.md into indexed topic files"
    );
    migrateLegacyCandidateToIndexedTicket(opts, candidate, "legacy-latest");
    return;
  }

  let shouldMigrate = !!opts.nonInteractive;
  if (!opts.nonInteractive && process.stdin.isTTY) {
    shouldMigrate = await askYesNo(
      "Legacy ticket detected in LATEST.md. Migrate to TICKET_LIST.md now?",
      true
    );
  }
  if (!shouldMigrate) {
    console.log("ticket: skipped legacy migration");
    return;
  }

  migrateLegacyCandidateToIndexedTicket(opts, candidate, "legacy-latest");
}

function migrateLegacyCandidateToIndexedTicket(opts, candidate, sourceTag) {
  const { title, group, project } = parseLegacyTicketMeta(candidate.body);
  const topic = toSlug(title);
  const stamp = formatTimestampForFile(new Date());
  const targetDir = join(opts.cwd, TICKET_DIR_NAME, group);
  const targetPath = join(targetDir, `${topic}-${stamp}.md`);
  if (opts.dryRun) {
    console.log(
      "ticket: would migrate -> " + toRepoRelativePath(opts.cwd, targetPath)
    );
  } else {
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(targetPath, candidate.body.trimEnd() + "\n", "utf8");
    console.log(
      "ticket: migrated body -> " + toRepoRelativePath(opts.cwd, targetPath)
    );
  }

  const entry = {
    id: makeEntryId(),
    title,
    topic,
    group,
    project,
    createdAt: new Date().toISOString(),
    path: toRepoRelativePath(opts.cwd, targetPath),
    source: sourceTag,
  };
  appendTicketEntry(opts.cwd, entry, opts);
  writeLatestStub(opts.cwd, opts);
}

function readTicketBodyFromOpts(opts) {
  if (opts.content != null) return opts.content;
  if (opts.from) {
    const fromAbs = join(opts.cwd, opts.from);
    if (!existsSync(fromAbs)) {
      throw new Error("--from file not found: " + opts.from);
    }
    return readFileSync(fromAbs, "utf8");
  }
  throw new Error("ticket create requires --content or --from <file>");
}

function createTopicTicketFile(opts, body) {
  const topic = toSlug(opts.topic || "ticket");
  const group = toSlug(opts.group || "sub");
  const stamp = formatTimestampForFile(new Date());
  const dir = join(opts.cwd, TICKET_DIR_NAME, group);
  const abs = join(dir, `${topic}-${stamp}.md`);
  if (opts.dryRun) {
    console.log("ticket: would write " + toRepoRelativePath(opts.cwd, abs));
  } else {
    mkdirSync(dir, { recursive: true });
    writeFileSync(abs, body.trimEnd() + "\n", "utf8");
    console.log("ticket: wrote " + toRepoRelativePath(opts.cwd, abs));
  }
  return { abs, topic, group };
}

function runTicketCreate(opts) {
  if (!opts.topic) {
    throw new Error("ticket create requires --topic <name>");
  }
  const body = readTicketBodyFromOpts(opts);
  const { abs, topic, group } = createTopicTicketFile(opts, body);

  const entry = {
    id: makeEntryId(),
    title: opts.topic,
    topic,
    group,
    project: opts.project || "global",
    createdAt: new Date().toISOString(),
    path: toRepoRelativePath(opts.cwd, abs),
    source: "ticket-create",
  };
  appendTicketEntry(opts.cwd, entry, opts);
  if (opts.dryRun) {
    console.log("Path: `" + entry.path + "`");
  }
}

function getTicketScanDirs(cwd) {
  return [
    join(cwd, TICKET_DIR_NAME),
    join(cwd, "DeukAgentRules", "ticket"),
    join(cwd, "ticket"),
  ];
}

function readTicketSnapshot(absPath) {
  const body = readFileSync(absPath, "utf8");
  const titleMatch = body.match(/##\\s*Task:\\s*(.+)/);
  const submoduleMatch = body.match(/Target Submodule:\\s*([^\\n]+)/);
  const phaseMatches = body.match(/\\[Phase[^\\]]+(완료|진행 중|대기)\\]/g);

  const title = titleMatch ? titleMatch[1].split("|")[0].trim() : "Untitled";
  const targetSubmodule = submoduleMatch
    ? submoduleMatch[1].replace(/\\`/g, "").trim()
    : "-";
  const phase = phaseMatches
    ? phaseMatches[phaseMatches.length - 1]
    : "[상태 불명]";
  const done = phase.includes("완료");

  return { title, targetSubmodule, phase, done };
}

function runTicketList(opts) {
  const indexJson = readTicketIndexJson(opts.cwd);
  const sorted = [...indexJson.entries].sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );
  
  const active = sorted.filter(e => e.status !== "archived");
  const archived = sorted.filter(e => e.status === "archived");

  const showActive = opts.all || !opts.archived;
  const showArchived = opts.all || opts.archived;

  if (showActive) {
    console.log("\n📦 Agent Tickets (Active):");
    if (active.length === 0) {
      console.log("  No active tickets found.");
    } else {
      active.slice(0, opts.limit || 30).forEach(e => {
        const fileName = e.path.split(/[/\\]/).pop();
        console.log(`  🔨 [${fileName}]`);
        console.log(`     Title:  ${e.title}`);
        console.log(`     Group:  ${e.group} | Proj: ${e.project}`);
        console.log(`     Topic:  ${e.topic}\n`);
      });
    }
  }

  if (showArchived && archived.length > 0) {
    console.log("\n📦 Agent Tickets (Archived):");
    archived.slice(0, opts.limit || 30).forEach(e => {
      const fileName = e.path.split(/[/\\]/).pop();
      console.log(`  ✅ [${fileName}]`);
      console.log(`     Title:  ${e.title}`);
      console.log(`     Group:  ${e.group} | Proj: ${e.project}\n`);
    });
  }
}

function pickTicketEntry(opts) {
  const indexJson = readTicketIndexJson(opts.cwd);
  const rows = [...indexJson.entries].sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );
  if (rows.length === 0) return null;
  if (opts.topic) {
    const key = String(opts.topic).toLowerCase();
    return (
      rows.find((e) =>
        String(e.topic || "")
          .toLowerCase()
          .includes(key)
      ) || null
    );
  }
  return rows[0];
}

function runTicketUse(opts) {
  if (!opts.latest && !opts.topic) {
    throw new Error("ticket use requires --latest or --topic <prefix>");
  }
  const found = pickTicketEntry(opts);
  if (!found) {
    throw new Error("ticket use: no matching entry");
  }
  const abs = join(opts.cwd, found.path);
  if (!existsSync(abs)) {
    throw new Error("ticket use: file not found " + found.path);
  }

  if (opts.pathOnly) {
    console.log(found.path);
    return;
  }

  console.log("Path: `" + found.path + "`");
  if (opts.printContent) {
    console.log("\n" + readFileSync(abs, "utf8"));
  }
}

function runTicketMigrate(opts) {
  const candidate = getLegacyMigrationCandidate(opts.cwd);
  if (!candidate) {
    console.log("ticket: no legacy LATEST.md migration candidate found");
    return;
  }
  migrateLegacyCandidateToIndexedTicket(opts, candidate, "ticket-migrate");
}

function runTicketArchive(opts) {
  if (!opts.latest && !opts.topic) {
    throw new Error("ticket archive requires --latest or --topic <prefix>");
  }
  const indexJson = readTicketIndexJson(opts.cwd);
  const found = pickTicketEntry(opts);
  if (!found) throw new Error("ticket archive: no matching entry");

  const absPath = join(opts.cwd, found.path);
  if (!existsSync(absPath)) {
    throw new Error("ticket archive: file not found " + found.path);
  }

  const archiveDir = join(opts.cwd, TICKET_DIR_NAME, "archive", found.group || "sub");
  if (!opts.dryRun) mkdirSync(archiveDir, { recursive: true });
  
  const fileName = found.path.split(/[/\\]/).pop();
  const newAbsPath = join(archiveDir, fileName);
  const bodyLines = readFileSync(absPath, "utf8").trimEnd().split(/\r?\n/);
  
  if (opts.report) {
    const reportSrc = resolve(opts.cwd, opts.report);
    if (!existsSync(reportSrc)) {
      throw new Error("ticket archive: report file not found " + opts.report);
    }
    const reportDir = join(opts.cwd, TICKET_DIR_NAME, "reports");
    if (!opts.dryRun) mkdirSync(reportDir, { recursive: true });
    
    // We prefix the report filename to avoid collisions if multiple tickets have same name
    const reportDest = join(reportDir, `REPORT-${fileName}`);
    if (!opts.dryRun) copyFileSync(reportSrc, reportDest);
    console.log("ticket archive: copied report to " + toRepoRelativePath(opts.cwd, reportDest));
    
    bodyLines.push("");
    bodyLines.push("## 📄 Attached Report");
    // Link format in markdown must be posix paths 
    const relativeLink = toPosixPath(relative(dirname(newAbsPath), reportDest));
    bodyLines.push(`- [View Report](${relativeLink})`);
  }

  if (opts.dryRun) {
    console.log("ticket archive: would move " + toRepoRelativePath(opts.cwd, absPath) + " to " + toRepoRelativePath(opts.cwd, newAbsPath));
    return;
  }

  // Move the file
  writeFileSync(newAbsPath, bodyLines.join("\n") + "\n", "utf8");
  rmSync(absPath);
  console.log("ticket archive: moved ticket to " + toRepoRelativePath(opts.cwd, newAbsPath));

  // Update INDEX
  const entryIdx = indexJson.entries.findIndex(e => e.id === found.id);
  if (entryIdx >= 0) {
    indexJson.entries[entryIdx].status = "archived";
    indexJson.entries[entryIdx].path = toRepoRelativePath(opts.cwd, newAbsPath);
    indexJson.updatedAt = new Date().toISOString();
  }

  writeTicketIndexJson(opts.cwd, indexJson, opts);
  writeTicketListFile(opts.cwd, indexJson.entries, opts);
}

function runTicketReports(opts) {
  const reportDir = join(opts.cwd, TICKET_DIR_NAME, "reports");
  console.log("\n📄 Agent Reports:");
  if (!existsSync(reportDir)) {
    console.log("  No reports found.");
    return;
  }
  const files = readdirSync(reportDir).filter(f => f.startsWith("REPORT-") && f.endsWith(".md"));
  if (files.length === 0) {
    console.log("  No reports found.");
    return;
  }
  
  const sorted = files.sort((a, b) => {
    return statSync(join(reportDir, b)).mtime.getTime() - statSync(join(reportDir, a)).mtime.getTime();
  });
  
  sorted.slice(0, opts.limit || 30).forEach(f => {
    console.log(`  - [${f}]`);
  });
  console.log("");
}

async function runInit(opts) {
  const markers = resolveMarkers({
    tag: opts.tag,
    markerBegin: opts.markerBegin,
    markerEnd: opts.markerEnd,
  });
  const agentsMode = opts.agents ?? "inject";
  validateMode("agents", agentsMode, ["skip", "overwrite", "inject"]);

  const rulesMode = opts.rules ?? "prefix";
  validateMode("rules", rulesMode, ["skip", "overwrite", "prefix"]);

  const bundleContent = readBundleAgents(bundleRoot);
  const targetAgents = join(opts.cwd, "AGENTS.md");
  const targetRules = join(opts.cwd, ".cursor", "rules");

  const agentsResult = applyAgents({
    targetPath: targetAgents,
    bundleContent,
    markers,
    flavor: "init",
    appendIfNoMarkers: opts.appendIfNoMarkers,
    dryRun: opts.dryRun,
    backup: opts.backup,
    agentsMode,
  });
  console.log(
    "AGENTS.md: " +
      agentsResult.action +
      (agentsResult.mode ? " (" + agentsResult.mode + ")" : "")
  );

  const ruleActions = applyRules({
    bundleRulesDir: join(bundleRoot, "rules"),
    targetRulesDir: targetRules,
    rulesMode,
    dryRun: opts.dryRun,
    backup: opts.backup,
  });
  for (const r of ruleActions) {
    console.log(
      "rule " +
        r.action +
        ": " +
        (r.dest || r.src) +
        (r.reason ? " (" + r.reason + ")" : "")
    );
  }

  ensureTicketDirAndGitignore(opts);
  ensureTemplatesDirAndCopyBundle(opts);
  maybeMigrateOverridesOnInit(opts);
  ensureAgentTagGuide(opts);
  await maybeMigrateLegacyOnInit(opts);
}

function runMerge(opts) {
  const markers = resolveMarkers({
    tag: opts.tag,
    markerBegin: opts.markerBegin,
    markerEnd: opts.markerEnd,
  });
  const agentsMode = opts.agents ?? "inject";
  validateMode("agents", agentsMode, ["skip", "overwrite", "inject"]);

  const rulesMode = opts.rules ?? "skip";
  validateMode("rules", rulesMode, ["skip", "overwrite", "prefix"]);

  const bundleContent = readBundleAgents(bundleRoot);
  const targetAgents = join(opts.cwd, "AGENTS.md");
  const targetRules = join(opts.cwd, ".cursor", "rules");

  const agentsResult = applyAgents({
    targetPath: targetAgents,
    bundleContent,
    markers,
    flavor: "merge",
    appendIfNoMarkers: opts.appendIfNoMarkers,
    dryRun: opts.dryRun,
    backup: opts.backup,
    agentsMode,
  });
  console.log(
    "AGENTS.md: " +
      agentsResult.action +
      (agentsResult.mode ? " (" + agentsResult.mode + ")" : "")
  );

  const ruleActions = applyRules({
    bundleRulesDir: join(bundleRoot, "rules"),
    targetRulesDir: targetRules,
    rulesMode,
    dryRun: opts.dryRun,
    backup: opts.backup,
  });
  for (const r of ruleActions) {
    console.log(
      "rule " +
        r.action +
        ": " +
        (r.dest || r.src) +
        (r.reason ? " (" + r.reason + ")" : "")
    );
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const argv = process.argv.slice(2);
  const sub = argv[0];
  if (!sub || sub === "-h" || sub === "--help") {
    printHelp();
    process.exit(0);
  }

  const rest = argv.slice(1);
  if (sub === "help") {
    printHelp();
    process.exit(0);
  }

  if (sub === "ticket") {
    const action = rest[0];
    const ticketRest = rest.slice(1);
    if (!action || action === "-h" || action === "--help") {
      printHelp();
      process.exit(0);
    }

    let opts;
    try {
      opts = parseTicketArgs(ticketRest);
    } catch (e) {
      console.error(e.message || e);
      printHelp();
      process.exit(1);
    }

    try {
      if (action === "create") runTicketCreate(opts);
      else if (action === "list") runTicketList(opts);
      else if (action === "use") runTicketUse(opts);
      else if (action === "migrate") runTicketMigrate(opts);
      else if (action === "archive") runTicketArchive(opts);
      else if (action === "reports") runTicketReports(opts);
      else {
        console.error("Unknown ticket action: " + action);
        printHelp();
        process.exit(1);
      }
      process.exit(0);
    } catch (e) {
      console.error(e.message || e);
      process.exit(1);
    }
  }

  let opts;
  try {
    opts = parseArgs(rest);
  } catch (e) {
    console.error(e.message || e);
    printHelp();
    process.exit(1);
  }

  if (!existsSync(bundleRoot)) {
    console.error(
      "Missing bundle/ (run from published package or run npm run sync in DeukAgentRules when developing)."
    );
    process.exit(1);
  }

  try {
    if (sub === "init") {
      if (!isNonInteractive(opts)) {
        const saved = loadInitConfig(opts.cwd);
        if (saved && !opts.interactive) {
          opts.agents =
            opts.agents !== undefined ? opts.agents : saved.agentsMode;
          opts.stack = saved.stack;
          opts.agentTools = saved.agentTools;
          const stackL =
            STACKS.find((s) => s.value === saved.stack)?.label || saved.stack;
          console.log(
            "\nDeukAgentRules init — using saved choices from " +
              INIT_CONFIG_FILENAME
          );
          console.log("  Stack : " + saved.stack + " (" + stackL + ")");
          console.log("  Tools : " + (saved.agentTools.join(", ") || "none"));
          console.log("  AGENTS: " + opts.agents);
          console.log(
            "  (`--interactive` to change, or edit/delete " +
              INIT_CONFIG_FILENAME +
              ")\n"
          );
        } else {
          await runInteractive(opts);
          if (!opts.dryRun) {
            writeInitConfig(opts.cwd, opts);
          }
        }
      }
      await runInit(opts);
    } else if (sub === "merge") {
      runMerge(opts);
    } else {
      console.error("Unknown command: " + sub);
      printHelp();
      process.exit(1);
    }
  } catch (e) {
    console.error(e.message || e);
    process.exit(1);
  }
}

main();
