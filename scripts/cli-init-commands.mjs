import { join, dirname, basename } from "path";
import { homedir } from "os";
import { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, unlinkSync, rmSync, renameSync } from "fs";

import { ensureTicketDirAndGitignore } from "./cli-init-logic.mjs";
import { normalizeTicketPaths } from "./cli-ticket-migration.mjs";

import { loadInitConfig, writeInitConfig, isWorkflowExecute, normalizeWorkflowMode, SPOKE_REGISTRY } from "./cli-utils.mjs";
import { runInteractive } from "./cli-prompts.mjs";

import { AGENT_ROOT_DIR, TICKET_SUBDIR, TEMPLATE_SUBDIR, discoverAllWorkspaces, isMcpActive, toRepoRelativePath, resolveWorkflowMode, pruneRuleModules } from "./cli-utils.mjs";

function recursiveMerge(src, dest, cwd, dryRun) {
  if (!existsSync(src)) return;
  if (!existsSync(dest)) {
    if (!dryRun) {
      mkdirSync(dirname(dest), { recursive: true });
      renameSync(src, dest);
    }
    return;
  }
  // Both exist, merge contents
  const entries = readdirSync(src, { withFileTypes: true });
  for (const ent of entries) {
    const sPath = join(src, ent.name);
    const dPath = join(dest, ent.name);
    if (ent.isDirectory()) {
      recursiveMerge(sPath, dPath, cwd, dryRun);
    } else {
      if (!existsSync(dPath)) {
        if (!dryRun) {
          renameSync(sPath, dPath);
          console.log(`[MIGRATE] Moved: ${toRepoRelativePath(cwd, sPath)} -> ${toRepoRelativePath(cwd, dPath)}`);
        } else {
          console.log(`[DRY-RUN] Would move: ${toRepoRelativePath(cwd, sPath)} -> ${toRepoRelativePath(cwd, dPath)}`);
        }
      } else {
        // If destination exists, check if content is identical
        const sContent = readFileSync(sPath, "utf8");
        const dContent = readFileSync(dPath, "utf8");
        if (sContent === dContent) {
          if (!dryRun) {
            unlinkSync(sPath);
            console.log(`[MIGRATE] Removed identical file: ${toRepoRelativePath(cwd, sPath)}`);
          }
        } else {
          console.warn(`[WARNING] Migration conflict: ${toRepoRelativePath(cwd, dPath)} already exists with different content. Skipping.`);
        }
      }
    }
  }
  // Clean up src if empty
  try {
    if (!dryRun && readdirSync(src).length === 0) {
      rmSync(src, { recursive: true });
      console.log(`[MIGRATE] Removed empty directory: ${toRepoRelativePath(cwd, src)}`);
    }
  } catch (err) {
    if (process.env.DEBUG) console.warn(`[DEBUG] Failed to clean up ${src}:`, err);
  }
}

function migrateLegacyStructure(cwd, dryRun) {

  const legacyTemplates = join(cwd, ".deuk-agent-templates");
  const newTemplates = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  if (existsSync(legacyTemplates)) {
    console.log(`[MIGRATE] Merging legacy templates into ${AGENT_ROOT_DIR}/${TEMPLATE_SUBDIR}`);
    recursiveMerge(legacyTemplates, newTemplates, cwd, dryRun);
    if (!dryRun && existsSync(legacyTemplates)) rmSync(legacyTemplates, { recursive: true, force: true });
  }

  const legacyTickets = join(cwd, ".deuk-agent-ticket");
  const legacyTicketsPlural = join(cwd, ".deuk-agent-tickets");
  const newTickets = join(cwd, AGENT_ROOT_DIR, TICKET_SUBDIR);

  if (existsSync(legacyTickets)) {
    console.log(`[MIGRATE] Merging legacy singular ticket directory into ${AGENT_ROOT_DIR}/${TICKET_SUBDIR}`);
    recursiveMerge(legacyTickets, newTickets, cwd, dryRun);
    if (!dryRun && existsSync(legacyTickets)) rmSync(legacyTickets, { recursive: true, force: true });
  }
  if (existsSync(legacyTicketsPlural)) {
    console.log(`[MIGRATE] Merging legacy plural tickets directory into ${AGENT_ROOT_DIR}/${TICKET_SUBDIR}`);
    recursiveMerge(legacyTicketsPlural, newTickets, cwd, dryRun);
    if (!dryRun && existsSync(legacyTicketsPlural)) rmSync(legacyTicketsPlural, { recursive: true, force: true });
  }

  const legacyConfig = join(cwd, ".deuk-agent-rule.config.json");
  const newConfig = join(cwd, AGENT_ROOT_DIR, "config.json");
  if (existsSync(legacyConfig)) {
    if (!existsSync(newConfig)) {
      console.log(`[MIGRATE] Moving legacy config to ${AGENT_ROOT_DIR}/config.json`);
      if (!dryRun) {
        mkdirSync(join(cwd, AGENT_ROOT_DIR), { recursive: true });
        renameSync(legacyConfig, newConfig);
      }
    } else {
      console.log(`[MIGRATE] Removing redundant legacy config`);
      if (!dryRun) unlinkSync(legacyConfig);
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

function migrateHtmlMarkersToHeadings(cwd, dryRun) {
  const agentsPath = join(cwd, "AGENTS.md");
  if (!existsSync(agentsPath)) return;
  
  const content = readFileSync(agentsPath, "utf8");
  const oldBegin = "<!-- deuk-agent-rule:begin -->";
  const oldEnd = "<!-- deuk-agent-rule:end -->";
  
  if (!content.includes(oldBegin)) return;
  
  const beginIdx = content.indexOf(oldBegin);
  const endIdx = content.lastIndexOf(oldEnd);
  if (endIdx <= beginIdx) return;
  
  const managedContent = content.slice(beginIdx + oldBegin.length, endIdx).trim();
  const userContent = content.slice(0, beginIdx).trim();
  const afterContent = content.slice(endIdx + oldEnd.length).trim();
  
  let newContent = "";
  if (userContent) newContent += userContent + "\n\n";
  if (afterContent) newContent += afterContent + "\n\n";
  newContent += "---\n\n";
  newContent += "## DeukAgentRules\n\n";
  newContent += "> Managed by DeukAgentRules. Remove this section if not installed.\n\n";
  newContent += managedContent + "\n";
  
  if (!dryRun) {
    copyFileSync(agentsPath, agentsPath + ".pre-v2.bak");
    writeFileSync(agentsPath, newContent, "utf8");
    console.log("[MIGRATE] Converted HTML markers to heading-based format in AGENTS.md");
    console.log("[MIGRATE] Backup saved as AGENTS.md.pre-v2.bak");
  } else {
    console.log("[DRY-RUN] Would convert HTML markers to heading-based format in AGENTS.md");
  }
}

function syncTemplates(cwd, bundleRoot, dryRun) {
  const tplDestDir = join(cwd, AGENT_ROOT_DIR, TEMPLATE_SUBDIR);
  if (!existsSync(tplDestDir)) return;

  // SSOT: the bundle's templates/ is the single source of truth.
  // Local .deuk-agent/templates/ copies are always redundant.
  if (!dryRun) {
    rmSync(tplDestDir, { recursive: true, force: true });
  }
  console.log(`[CLEANUP] removed redundant templates directory: ${toRepoRelativePath(cwd, tplDestDir)}`);
}

function syncGlobalCodexInstructions(dryRun) {
  const codexDir = join(homedir(), ".codex");
  if (!existsSync(codexDir)) return;

  const target = join(codexDir, "AGENTS.md");
  const content = `---

## DeukAgentRules

> Managed by DeukAgentRules. Remove this section if not installed.

# Global DeukAgentRules Pointer

This environment is configured to use DeukAgentRules.
When working in a repository, always look for a local \`AGENTS.md\` or \`.deuk-agent/\` directory for project-specific rules.

## Core Directives
- Follow TDW (Ticket-Driven Workflow).
- Use \`npx deuk-agent-rule ticket create\` for new tasks.
- Prioritize RAG search via \`mcp_deukcontext_search_*\` tools.
- Never refactor without a ticket or explicit instruction.
`;

  if (!dryRun) {
    writeFileSync(target, content, "utf8");
    console.log(`global codex instructions synced: ${target}`);
  }
}



function generateSpokeContent(spoke, bundleRoot) {
  const globalRulesPath = join(bundleRoot, "core-rules", "AGENTS.md");
  
  const content = `# Deuk Agent Rules

**[MANDATORY]** Read and follow all rules from: [AGENTS.md](file://${globalRulesPath})

Before your first response, you MUST read the linked AGENTS.md file and fill in these rules:
- Tone: ___
- Language: ___
- Docs plan path: ___
- Docs report path: ___
- Workflow gate: ___
`;

  if (spoke.format === "mdc") {
    return `---
description: "Deuk Agent Rules - Project conventions and ticket workflow"
globs: ["**/*"]
alwaysApply: true
---
${content}`;
  }
  return `---\n\n## DeukAgentRules\n\n> Managed by DeukAgentRules. Remove this section if not installed.\n\n${content}\n`;
}

function hasCustomUserRules(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const withoutLegacyHtmlMarkers = content
      .replace(/<!-- deuk-agent-rule-cursorrules:begin -->[\s\S]*?<!-- deuk-agent-rule-cursorrules:end -->/g, "")
      .replace(/<!-- deuk-agent-rule:begin -->[\s\S]*?<!-- deuk-agent-rule:end -->/g, "");
    if (!withoutLegacyHtmlMarkers.trim()) return false;

    const idx = content.indexOf("## DeukAgentRules");
    let stripped = content;
    if (idx !== -1) {
      // Find the preceding horizontal rule
      let blockStart = idx;
      const prevText = content.slice(0, idx);
      const hrIndex = prevText.lastIndexOf("---");
      if (hrIndex !== -1 && prevText.slice(hrIndex).trim() === "") {
        blockStart = hrIndex;
      }
      stripped = content.slice(0, blockStart);
    }
    const isPointer = content.includes("This project follows the Deuk Agent Rules framework") || 
                      content.includes("centralized in:") ||
                      content.includes("[AGENTS.md]");
    if (isPointer) return false;

    return stripped.trim().length > 0;
  } catch (err) {
    if (process.env.DEBUG) console.warn(`[DEBUG] Failed to read ${filePath}:`, err);
    return false;
  }
}

function deploySpokePointers(cwd, bundleRoot, dryRun, selectedTools = []) {
  for (const spoke of SPOKE_REGISTRY) {
    // Always clean legacy files, but backup if they contain custom user rules
    if (spoke.legacy) {
      const legacyPath = join(cwd, spoke.legacy);
      if (existsSync(legacyPath)) {
        if (hasCustomUserRules(legacyPath)) {
          const bakPath = legacyPath + ".bak";
          if (!dryRun) renameSync(legacyPath, bakPath);
          console.log(`[MIGRATE] Backed up user rules to ${spoke.legacy}.bak`);
        } else {
          if (!dryRun) unlinkSync(legacyPath);
          console.log(`[CLEANUP] removed legacy: ${spoke.legacy}`);
        }
      }
    }

    if (!spoke.detect(cwd, selectedTools)) continue;
    
    const targetPath = join(cwd, spoke.target);
    const targetDir = dirname(targetPath);
    
    if (!dryRun) {
      mkdirSync(targetDir, { recursive: true });
      writeFileSync(targetPath, generateSpokeContent(spoke, bundleRoot), "utf8");
    }
    console.log(`spoke synced: ${spoke.target} (${spoke.id})`);
  }
}

function removeDuplicateRuleCopies(cwd, dryRun) {
  // Note: AGENTS.md is now the Antigravity spoke target — do NOT delete it here.
  // GEMINI.md legacy cleanup is handled by deploySpokePointers (spoke.legacy field).
  // .gemini is the Antigravity platform directory — preserve it.
  const duplicatePaths = [
    join(cwd, AGENT_ROOT_DIR, "rules"),
    join(cwd, ".cursor", "rules", "deuk-agent-rule-multi-ai-workflow.mdc"),
    join(cwd, ".claude"),
    join(cwd, "CLAUDE.md"),
  ];

  for (const p of duplicatePaths) {
    if (!existsSync(p)) continue;
    if (!dryRun) rmSync(p, { recursive: true, force: true });
    console.log(`[CLEANUP] removed legacy/duplicate: ${toRepoRelativePath(cwd, p)}`);
  }
}

export async function runInit(opts, bundleRoot) {
  const savedConfig = loadInitConfig(opts.cwd) || {};
  const workflowMode = resolveWorkflowMode(opts, savedConfig);
  const executionEnabled = isWorkflowExecute({ ...opts, workflowMode }, savedConfig);
  const ignoreDirs = savedConfig.ignoreDirs;
  const selectedTools = opts.agentTools || savedConfig.agentTools || [];

  if (!opts.dryRun && !executionEnabled) {
    throw new Error(
      `[WORKFLOW BLOCKED] plan mode is active for ${opts.cwd}. Re-run with --workflow execute or --approval approved to apply file mutations. Use --dry-run for preparation only.`
    );
  }

  // 0. Sync Global Codex Instructions
  syncGlobalCodexInstructions(opts.dryRun);

  // 0.1 MCP / Phase 0 Status Check
  const mcpActive = await isMcpActive(opts.cwd);
  console.log(`\n[POLICY] MCP Status: ${mcpActive ? "\x1b[32mACTIVE\x1b[0m" : "\x1b[33mINACTIVE\x1b[0m"}`);
  if (mcpActive) {
    console.log(`[POLICY] Phase 0 RAG validation is \x1b[32mENFORCED\x1b[0m for ticket creation.\n`);
  } else {
    console.log(`[POLICY] Running in offline/disconnected mode.\n`);
  }

  const submodules = discoverAllWorkspaces(opts.cwd, ignoreDirs);
  if (!submodules.includes(opts.cwd)) submodules.push(opts.cwd);

  for (const subCwd of submodules) {
    try {
      await initSingleWorkspace(subCwd, opts, bundleRoot, selectedTools);
    } catch (err) {
      console.error(`[ERROR] Failed to initialize workspace ${basename(subCwd)}: ${err.message}`);
    }
  }

  if (!loadInitConfig(opts.cwd)) {
    writeInitConfig(opts.cwd, opts);
  }
}

async function initSingleWorkspace(subCwd, opts, bundleRoot, selectedTools) {
  console.log(`\nInitializing ${basename(subCwd)}...`);
  
  // 1. Migration & Directory Setup
  migrateLegacyStructure(subCwd, opts.dryRun);
  migrateHtmlMarkersToHeadings(subCwd, opts.dryRun);
  ensureTicketDirAndGitignore({ ...opts, cwd: subCwd });
  
  // 2. Normalize INDEX.json paths (fix stale paths)
  normalizeTicketPaths(subCwd, { silent: false });

  // 3. Spoke Pointers (e.g. .cursor/rules/deuk-agent.mdc)
  removeDuplicateRuleCopies(subCwd, opts.dryRun);
  deploySpokePointers(subCwd, bundleRoot, opts.dryRun, selectedTools);

  // 4. Project Rule Setup (PROJECT_RULE.md)
  const projectRulePath = join(subCwd, "PROJECT_RULE.md");
  if (!existsSync(projectRulePath)) {
    const templatePath = join(bundleRoot, "templates", "PROJECT_RULE.md");
    if (existsSync(templatePath)) {
      if (!opts.dryRun) copyFileSync(templatePath, projectRulePath);
      console.log(`PROJECT_RULE.md: created from template`);
    }
  }

  // 5. Templates Sync (.deuk-agent/templates/)
  syncTemplates(subCwd, bundleRoot, opts.dryRun);
}

export function runMerge(opts, bundleRoot) {
  const savedConfig = loadInitConfig(opts.cwd) || {};
  const workflowMode = resolveWorkflowMode(opts, savedConfig);
  const executionEnabled = isWorkflowExecute({ ...opts, workflowMode }, savedConfig);
  if (!opts.dryRun && !executionEnabled) {
    throw new Error(
      `[WORKFLOW BLOCKED] plan mode is active for ${opts.cwd}. Re-run with --workflow execute or --approval approved to apply file mutations. Use --dry-run for preparation only.`
    );
  }
  
  syncTemplates(opts.cwd, bundleRoot, opts.dryRun);
}



