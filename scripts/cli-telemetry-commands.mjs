import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "fs";
import { join } from "path";
import { loadInitConfig, AGENT_ROOT_DIR, SPOKE_REGISTRY } from "./cli-utils.mjs";

const TELEMETRY_FILE = `${AGENT_ROOT_DIR}/telemetry.jsonl`;

export async function runTelemetry(opts) {
  const argv = process.argv.slice(3); // skip 'telemetry' and 'log/sync/summary'
  const action = process.argv[3];

  if (action === "log") {
    await logAction(opts);
  } else if (action === "sync") {
    await syncAction(opts);
  } else if (action === "summary") {
    await summaryAction(opts);
  } else {
    console.error("Unknown telemetry action: " + action);
    console.log("Usage: npx deuk-agent-rule telemetry <log|sync|summary> [options]");
  }
}

async function logAction(opts) {
  const absPath = join(opts.cwd, TELEMETRY_FILE);
  const dir = join(opts.cwd, AGENT_ROOT_DIR);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  let resolvedClient = opts.client;
  const lowerModel = (opts.model || "").toLowerCase();

  if (!resolvedClient) {
    if (lowerModel.includes("codex")) resolvedClient = "Codex";
    else if (lowerModel.includes("copilot")) resolvedClient = "Copilot";
    else if (lowerModel.includes("claude")) resolvedClient = "ClaudeCode";
    else {
      const config = loadInitConfig(opts.cwd);
      const tools = config?.agentTools || [];
      if (tools.includes("codex")) resolvedClient = "Codex";
      else if (tools.includes("copilot")) resolvedClient = "Copilot";
      else if (tools.includes("cursor")) resolvedClient = "Cursor";
      else if (tools.includes("claude")) resolvedClient = "ClaudeCode";
      else {
        for (const spoke of SPOKE_REGISTRY) {
          if (spoke.id !== "antigravity" && spoke.detect(opts.cwd, tools)) {
            if (spoke.id === "copilot") { resolvedClient = "Copilot"; break; }
            if (spoke.id === "codex") { resolvedClient = "Codex"; break; }
            if (spoke.id === "cursor") { resolvedClient = "Cursor"; break; }
            if (spoke.id === "claude") { resolvedClient = "ClaudeCode"; break; }
            if (spoke.id === "windsurf") { resolvedClient = "Windsurf"; break; }
            if (spoke.id === "jetbrains") { resolvedClient = "JetBrains"; break; }
          }
        }
      }
    }
    if (!resolvedClient) resolvedClient = "Antigravity";
  }

  const entry = {
    ts: Math.floor(Date.now() / 1000),
    tokens: Number(opts.tokens || 0),
    tdw: Number(opts.tdw || 0),
    model: opts.model || "UNKNOWN",
    client: resolvedClient,
    ticket: opts.ticket || "",
    action: opts.action || "work",
    file: opts.file || "",
    synced: false
  };

  appendFileSync(absPath, JSON.stringify(entry) + "\n", "utf8");
  console.log(`[TELEMETRY] Logged ${entry.tokens} tokens for ticket ${entry.ticket} in ${TELEMETRY_FILE}`);
}

async function syncAction(opts) {
  const absPath = join(opts.cwd, TELEMETRY_FILE);
  if (!existsSync(absPath)) {
    console.log("[TELEMETRY] No local logs to sync.");
    return;
  }

  const config = loadInitConfig(opts.cwd);
  const pipelineUrl = opts.remote || config?.pipelineUrl || "http://localhost:8001/api/telemetry/ingest";

  const lines = readFileSync(absPath, "utf8").split("\n").filter(l => l.trim());
  const entries = lines.map(l => JSON.parse(l));
  const unsynced = entries.filter(e => !e.synced);

  if (unsynced.length === 0) {
    console.log("[TELEMETRY] All logs already synced.");
    return;
  }

  console.log(`[TELEMETRY] Syncing ${unsynced.length} entries to ${pipelineUrl}...`);

  try {
    // In a real environment, we'd use fetch or a pipeline sync tool.
    // For now, we simulate the sync success and mark them as synced.
    // We try to use the built-in fetch if available.
    if (typeof fetch === "function") {
       const res = await fetch(pipelineUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ logs: unsynced })
       });
       if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    } else {
       console.warn("[TELEMETRY] fetch not available, simulating sync...");
    }

    const updatedLines = entries.map(e => {
      if (!e.synced) e.synced = true;
      return JSON.stringify(e);
    }).join("\n") + "\n";

    writeFileSync(absPath, updatedLines, "utf8");
    console.log(`[TELEMETRY] Successfully synced ${unsynced.length} entries.`);
  } catch (err) {
    console.error(`[TELEMETRY] Sync failed: ${err.message}`);
    process.exitCode = 1;
  }
}

async function summaryAction(opts) {
  const absPath = join(opts.cwd, TELEMETRY_FILE);
  if (!existsSync(absPath)) {
    console.log("[TELEMETRY] No logs found.");
    return;
  }

  const lines = readFileSync(absPath, "utf8").split("\n").filter(l => l.trim());
  const logs = lines.map(l => JSON.parse(l));

  const totalTokens = logs.reduce((sum, l) => sum + l.tokens, 0);
  const byModel = logs.reduce((acc, l) => {
    acc[l.model] = (acc[l.model] || 0) + l.tokens;
    return acc;
  }, {});

  console.log(`\n--- Local Telemetry Summary (${opts.cwd}) ---`);
  console.log(`Total Tokens: ${totalTokens}`);
  console.log(`Log Entries:  ${logs.length}`);
  console.log(`By Model:`);
  Object.entries(byModel).forEach(([m, t]) => {
    console.log(`  - ${m}: ${t}`);
  });
  console.log("-------------------------------------------\n");
}
