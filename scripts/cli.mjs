#!/usr/bin/env node
import { existsSync, rmSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { parseArgs, parseTicketArgs, parseTelemetryArgs } from "./cli-args.mjs";
import { runInit, runMerge } from "./cli-init-commands.mjs";
import { runTicketCreate, runTicketList, runTicketUse, runTicketClose, runTicketArchive, runTicketReports, runTicketMeta, runTicketConnect, runTicketRebuild, runTicketReportAttach, runTicketMove } from "./cli-ticket-commands.mjs";
import { runTelemetry } from "./cli-telemetry-commands.mjs";
import { performUpgradeMigration } from "./cli-ticket-migration.mjs";
import { loadInitConfig, writeInitConfig, checkUpdateNotifier, normalizeWorkflowMode, WORKFLOW_MODE_EXECUTE, AGENT_ROOT_DIR, resolveWorkflowMode } from "./cli-utils.mjs";
import { runInteractive } from "./cli-prompts.mjs";

const updatePromise = checkUpdateNotifier();

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
async function main() {
  const argv = process.argv.slice(2);
  const sub = argv[0];
  if (!sub || sub === "-h" || sub === "--help" || sub === "help") {
    printHelp();
    return;
  }

  const rest = argv.slice(1);

  if (sub === "ticket") {
    const action = rest[0];
    const opts = parseTicketArgs(rest.slice(1));
    if (action === "create") await runTicketCreate(opts);
    else if (action === "list") await runTicketList(opts);
    else if (action === "use") await runTicketUse(opts);
    else if (action === "close") await runTicketClose(opts);
    else if (action === "archive") await runTicketArchive(opts);
    else if (action === "reports") await runTicketReports(opts);
    else if (action === "meta") await runTicketMeta(opts);
    else if (action === "connect") await runTicketConnect(opts);
    else if (action === "rebuild") await runTicketRebuild(opts);
    else if (action === "move" || action === "step") await runTicketMove(opts);
    else if (action === "report") {
      const subAction = rest[1];
      if (subAction === "attach") {
        const attachOpts = parseTicketArgs(rest.slice(2));
        await runTicketReportAttach(attachOpts);
      } else {
        await runTicketReports(opts);
      }
    }
    else if (action === "upgrade" || action === "migrate") {
      const count = performUpgradeMigration(opts.cwd, opts);
      console.log(`Migration complete: ${count} tickets upgraded.`);
    }
    else {
      console.error("Unknown ticket action: " + action);
      printHelp();
    }
    return;
  }

  if (sub === "telemetry") {
    const opts = parseTelemetryArgs(rest);
    await runTelemetry(opts);
    return;
  }

  if (sub === "lint:md" || sub === "lint-md") {
    const { runMarkdownLint } = await import("./lint-md.mjs");
    runMarkdownLint(rest);
    return;
  }

  if (sub === "init" || sub === "merge") {
    const opts = parseArgs(rest);
    if (opts.help) {
      printHelp();
      return;
    }

    const saved = loadInitConfig(opts.cwd);
    if (saved && !opts.interactive) {
      // CLI flags (opts) take precedence over saved config
      for (const key in saved) {
        if (opts[key] === undefined) opts[key] = saved[key];
      }
      console.log(`Using saved config from ${AGENT_ROOT_DIR}/config.json (CLI overrides applied)`);
    }

    if (sub === "init") {
      await handleInit(opts, saved);
    } else {
      runMerge(opts, pkgRoot);
    }
    return;
  }

  console.error("Unknown command: " + sub);
  printHelp();
}

// Removed legacy migration runTicketMigrate

async function handleInit(opts, saved) {
  if (opts.clean && !opts.dryRun) {
    console.log(`[CLEAN] Removing legacy templates and config...`);
    const templatesDir = join(opts.cwd, ".deuk-agent-templates");
    const configFile = join(opts.cwd, ".deuk-agent-rule.config.json");
    if (existsSync(templatesDir)) rmSync(templatesDir, { recursive: true, force: true });
    if (existsSync(configFile)) rmSync(configFile, { force: true });
  }

  if (!opts.interactive && !opts.nonInteractive && !saved) {
    // If no config and not interactive, prompt unless non-interactive
    await runInteractive(opts);
  } else if (opts.interactive) {
    await runInteractive(opts);
  }

  if (!opts.dryRun) writeInitConfig(opts.cwd, opts);

  const workflowMode = resolveWorkflowMode(opts, saved);
  if (!opts.dryRun && workflowMode !== WORKFLOW_MODE_EXECUTE) {
    console.log(`[WORKFLOW] Plan mode active. Re-run with --workflow execute or --approval approved to apply file mutations.`);
    return;
  }

  await runInit(opts, pkgRoot);
}

function printHelp() {
  console.log(`DeukAgentRules CLI - Generalization Rules & Ticket Management

Usage:
  npx deuk-agent-rule init   [options]
  npx deuk-agent-rule merge  [options]
  npx deuk-agent-rule lint:md [--cwd <path>] [files...]
  npx deuk-agent-rule ticket <create|list|use|close|archive|reports|migrate|upgrade|meta|connect|move> [options]

Options:
  --cwd <path>          Target repo root
  --dry-run             Print actions without writing
  --non-interactive     CI/scripts mode: no prompts
  --tag <id>            Custom marker ID (default: deuk-agent-rule)
  --agents <mode>       inject | skip | overwrite
  --cursorrules <mode>  inject | skip | overwrite
  --workflow <mode>     plan | execute
  --approval <state>    pending | approved (alias for workflow)
  --docs-language <lang> auto | ko | en
  --json                Output result in JSON format
  --remote <url>        Temporary pipeline URL
  --sync                Force enable remote sync
  --no-sync             Force disable remote sync

Ticket Options:
  --topic, --id <name>  Ticket topic slug or ID
  --group <name>        Ticket group (sub|main|discussion)
  --project <name>      Project filter (DeukUI|DeukAgentRules)
  --submodule <name>    Submodule filter (DeukPack|DeukUI)
  --docs-language <lang> auto | ko | en
  --evidence <text>     Provide Phase 0 RAG evidence summary
  --skip-phase0         Bypass Phase 0 RAG validation
  --from-plan <path>    Create ticket from an existing plan markdown file
  --phase <number>      Explicitly set the phase number (e.g., --phase 2)
  --next                Move to the next phase
  --latest, -l          Use most recent ticket (default if no topic)
  --path-only           Print only the file path
  --render              Generate markdown list (TICKET_LIST.md)
  --json                Output result in JSON format
`);
}

main().then(async () => {
  await updatePromise;
}).catch(async err => {
  await updatePromise;
  console.error(err.message || err);
  process.exit(1);
});
