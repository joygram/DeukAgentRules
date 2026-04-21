import { join, dirname } from "path";
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import { resolveMarkers, resolveCursorrulesMarkers, applyAgents, applyRules, applyCursorrules, readBundleAgents } from "./merge-logic.mjs";
import { ensureTicketDirAndGitignore } from "./cli-init-logic.mjs";
import { loadInitConfig, writeInitConfig } from "./cli-utils.mjs";
import { runInteractive } from "./cli-prompts.mjs";

import { AGENT_ROOT_DIR, TICKET_SUBDIR, TEMPLATE_SUBDIR, RULES_SUBDIR } from "./cli-utils.mjs";
import { unlinkSync, rmSync, renameSync } from "fs";

function migrateLegacyStructure(cwd, dryRun) {
  const legacyTemplates = join(cwd, ".deuk-agent-templates");
  const newTemplates = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  
  if (existsSync(legacyTemplates) && !existsSync(newTemplates)) {
    console.log(`[MIGRATE] Moving legacy templates to ${AGENT_ROOT_DIR}/${TEMPLATE_SUBDIR}`);
    if (!dryRun) {
      mkdirSync(join(cwd, AGENT_ROOT_DIR), { recursive: true });
      renameSync(legacyTemplates, newTemplates);
    }
  }

  const legacyTickets = join(cwd, ".deuk-agent-ticket");
  const legacyTicketsPlural = join(cwd, ".deuk-agent-tickets");
  const newTickets = join(cwd, AGENT_ROOT_DIR, TICKET_SUBDIR);

  // 1. Move singular legacy
  if (existsSync(legacyTickets) && !existsSync(newTickets)) {
    console.log(`[MIGRATE] Moving legacy ticket directory to ${AGENT_ROOT_DIR}/${TICKET_SUBDIR}`);
    if (!dryRun) {
      mkdirSync(join(cwd, AGENT_ROOT_DIR), { recursive: true });
      renameSync(legacyTickets, newTickets);
    }
  }

  // 2. Move plural legacy (may coexist or be the only one)
  if (existsSync(legacyTicketsPlural)) {
    console.log(`[MIGRATE] Found plural legacy tickets directory. Merging contents to ${AGENT_ROOT_DIR}/${TICKET_SUBDIR}`);
    if (!dryRun) {
      mkdirSync(newTickets, { recursive: true });
      const files = readdirSync(legacyTicketsPlural);
      for (const f of files) {
        const src = join(legacyTicketsPlural, f);
        const dest = join(newTickets, f);
        if (!existsSync(dest)) {
          renameSync(src, dest);
        } else {
          console.warn(`[MIGRATE] Skipping duplicate: ${f}`);
        }
      }
      // Clean up plural dir if empty
      if (readdirSync(legacyTicketsPlural).length === 0) {
        rmSync(legacyTicketsPlural, { recursive: true });
      }
    }
  }

  const legacyConfig = join(cwd, ".deuk-agent-rule.config.json");
  const newConfig = join(cwd, AGENT_ROOT_DIR, "config.json");
  if (existsSync(legacyConfig) && !existsSync(newConfig)) {
    console.log(`[MIGRATE] Moving legacy config to ${AGENT_ROOT_DIR}/config.json`);
    if (!dryRun) {
      mkdirSync(join(cwd, AGENT_ROOT_DIR), { recursive: true });
      renameSync(legacyConfig, newConfig);
    }
  }

  // 3. Clean up redundant legacy pointer files from the target directory
  if (existsSync(newTickets)) {
    for (const file of ["ACTIVE_TICKET.md", "ACTIVE_TICKET.json", "LATEST.md"]) {
      const p = join(newTickets, file);
      if (existsSync(p)) {
        console.log(`[MIGRATE] Removing redundant pointer file: ${file}`);
        if (!dryRun) unlinkSync(p);
      }
    }
  }
}

function syncTemplates(cwd, bundleRoot, dryRun) {
  const tplSrcDir = join(bundleRoot, "templates");
  const tplDestDir = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  if (!existsSync(tplSrcDir)) return;
  if (!dryRun) mkdirSync(tplDestDir, { recursive: true });

  const srcFiles = readdirSync(tplSrcDir).filter(n => n.endsWith(".md"));
  const destFiles = existsSync(tplDestDir) ? readdirSync(tplDestDir).filter(n => n.endsWith(".md")) : [];

  for (const name of srcFiles) {
    const src = join(tplSrcDir, name);
    const dest = join(tplDestDir, name);
    if (!dryRun) copyFileSync(src, dest);
    console.log(`template synced: ${dest}`);
  }

  for (const name of destFiles) {
    if (!srcFiles.includes(name)) {
      const obsolete = join(tplDestDir, name);
      if (!dryRun) unlinkSync(obsolete);
      console.log(`template removed (obsolete): ${obsolete}`);
    }
  }
}

const SPOKE_REGISTRY = [
  {
    id: "cursor",
    detect: (cwd) => existsSync(join(cwd, ".cursor")),
    legacy: ".cursorrules",
    target: ".cursor/rules/deuk-agent.mdc",
    format: "mdc",
  },
  {
    id: "claude",
    detect: (cwd) => existsSync(join(cwd, "CLAUDE.md")) || existsSync(join(cwd, ".claude")),
    legacy: null,
    target: "CLAUDE.md",
    format: "markdown",
  },
  {
    id: "copilot",
    detect: (cwd) => existsSync(join(cwd, ".github")),
    legacy: null,
    target: ".github/copilot-instructions.md",
    format: "markdown",
  },
  {
    id: "windsurf",
    detect: (cwd) => existsSync(join(cwd, ".windsurf")),
    legacy: ".windsurfrules",
    target: ".windsurf/rules/deuk-agent.md",
    format: "markdown",
  },
  {
    id: "jetbrains",
    detect: (cwd) => existsSync(join(cwd, ".aiassistant")) || existsSync(join(cwd, ".idea")),
    legacy: null,
    target: ".aiassistant/rules/deuk-agent.md",
    format: "markdown",
  },
  {
    id: "antigravity",
    detect: (cwd) => existsSync(join(cwd, "gemini.md")) || existsSync(join(cwd, ".gemini")),
    legacy: null,
    target: "gemini.md",
    format: "markdown",
  },
];

function generateSpokeContent(spoke) {
  const commonContent = `# Deuk Agent Rules

This project follows the Deuk Agent Rules framework.
- Read the full rules: [AGENTS.md](../../AGENTS.md)
- Module-specific rules: [.deuk-agent/rules/](../../.deuk-agent/rules/)

## Critical Rules
- Use \`.deuk-agent/templates/TICKET_TEMPLATE.md\` for multi-step tasks.
- RAG-First: Use MCP tools before local file search when available.
- Error Loop Prevention: Stop after 2 repeated errors, create a ticket.
`;

  if (spoke.format === "mdc") {
    return `---
description: "Deuk Agent Rules - Project conventions and ticket workflow"
globs: ["**/*"]
alwaysApply: true
---
${commonContent}`;
  }
  return `<!-- deuk-agent-rule:begin -->\n${commonContent}\n<!-- deuk-agent-rule:end -->\n`;
}

function generateLegacyDeprecationNotice(spoke) {
  return `<!-- deuk-agent-rule:deprecated -->
This file is deprecated. Rules have moved to:
- Target: ${spoke.target}
- All agents: AGENTS.md
<!-- deuk-agent-rule:deprecated:end -->
`;
}

function deploySpokePointers(cwd, dryRun) {
  for (const spoke of SPOKE_REGISTRY) {
    if (!spoke.detect(cwd)) continue;
    
    const targetPath = join(cwd, spoke.target);
    const targetDir = dirname(targetPath);
    
    if (!dryRun) {
      mkdirSync(targetDir, { recursive: true });
      writeFileSync(targetPath, generateSpokeContent(spoke), "utf8");
    }
    console.log(`spoke synced: ${spoke.target} (${spoke.id})`);
    
    // Deprecate legacy file if it exists
    if (spoke.legacy) {
      const legacyPath = join(cwd, spoke.legacy);
      if (existsSync(legacyPath)) {
        if (!dryRun) writeFileSync(legacyPath, generateLegacyDeprecationNotice(spoke), "utf8");
        console.log(`spoke deprecated: ${spoke.legacy} -> ${spoke.target}`);
      }
    }
  }
}

export async function runInit(opts, bundleRoot) {
  migrateLegacyStructure(opts.cwd, opts.dryRun);

  const markers = resolveMarkers(opts);
  const agentsResult = applyAgents({
    targetPath: join(opts.cwd, "AGENTS.md"),
    bundleContent: readBundleAgents(bundleRoot),
    markers, flavor: "init",
    appendIfNoMarkers: opts.appendIfNoMarkers,
    dryRun: opts.dryRun, backup: opts.backup,
    agentsMode: opts.agents || "inject"
  });
  console.log(`AGENTS.md: ${agentsResult.action} (${agentsResult.mode || ""})`);

  // Hub Rules Sync
  const hubRulesDir = join(opts.cwd, AGENT_ROOT_DIR, RULES_SUBDIR);
  if (!opts.dryRun) mkdirSync(hubRulesDir, { recursive: true });
  
  const ruleActions = applyRules({
    bundleRulesDir: join(bundleRoot, "rules"),
    targetRulesDir: hubRulesDir,
    rulesMode: opts.rules || "overwrite", // Hub always gets fresh bundle rules
    dryRun: opts.dryRun, backup: opts.backup
  });
  ruleActions.forEach(r => console.log(`hub rule ${r.action}: ${r.dest || r.src}`));

  // Deploy Spokes
  deploySpokePointers(opts.cwd, opts.dryRun);
  
  const geminiBundle = join(bundleRoot, "gemini.md");
  const geminiDest = join(opts.cwd, "gemini.md");
  if (existsSync(geminiBundle)) {
    if (!opts.dryRun) copyFileSync(geminiBundle, geminiDest);
    console.log(`gemini.md: synced to root`);
  }

  ensureTicketDirAndGitignore(opts);
  syncTemplates(opts.cwd, bundleRoot, opts.dryRun);

  if (!loadInitConfig(opts.cwd)) {
    writeInitConfig(opts.cwd, opts);
  }
}

export function runMerge(opts, bundleRoot) {
  const markers = resolveMarkers(opts);
  const agentsResult = applyAgents({
    targetPath: join(opts.cwd, "AGENTS.md"),
    bundleContent: readBundleAgents(bundleRoot),
    markers, flavor: "merge",
    appendIfNoMarkers: opts.appendIfNoMarkers,
    dryRun: opts.dryRun, backup: opts.backup,
    agentsMode: opts.agents || "inject"
  });
  console.log(`AGENTS.md: ${agentsResult.action} (${agentsResult.mode || ""})`);

  const hubRulesDir = join(opts.cwd, AGENT_ROOT_DIR, RULES_SUBDIR);
  const ruleActions = applyRules({
    bundleRulesDir: join(bundleRoot, "rules"),
    targetRulesDir: hubRulesDir,
    rulesMode: opts.rules || "skip",
    dryRun: opts.dryRun, backup: opts.backup
  });
  ruleActions.forEach(r => console.log(`hub rule ${r.action}: ${r.dest || r.src}`));

  syncTemplates(opts.cwd, bundleRoot, opts.dryRun);
}
