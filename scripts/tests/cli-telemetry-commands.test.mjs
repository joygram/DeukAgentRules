import test from "node:test";
import assert from "node:assert";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runTelemetry } from "../cli-telemetry-commands.mjs";

test("telemetry summary surfaces TDW totals and ratios", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-telemetry-tdw-"));
  try {
    const telemetryDir = join(cwd, ".deuk-agent");
    mkdirSync(telemetryDir, { recursive: true });
    writeFileSync(join(telemetryDir, "telemetry.jsonl"), [
      JSON.stringify({ ts: 1, tokens: 100, tdw: 80, model: "m1", client: "Codex", ticket: "a", action: "work", file: "", synced: false }),
      JSON.stringify({ ts: 2, tokens: 40, tdw: 0, model: "m2", client: "Codex", ticket: "b", action: "work", file: "", synced: false })
    ].join("\n") + "\n", "utf8");

    const originalArgv = process.argv;
    const originalLog = console.log;
    const lines = [];
    process.argv = ["node", "test", "telemetry", "summary"];
    console.log = (value) => lines.push(String(value));

    try {
      await runTelemetry({ cwd, json: false });
    } finally {
      process.argv = originalArgv;
      console.log = originalLog;
    }

    const output = lines.join("\n");
    assert.match(output, /TDW:/);
    assert.match(output, /TDW Tokens: 80/);
    assert.match(output, /Coverage Rate: 50\.0%/);
    assert.match(output, /Token Share: 57\.1%/);
    assert.match(output, /Average Tokens\/Entry: 80\.0/);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("telemetry summary json exposes TDW metrics", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-telemetry-tdw-json-"));
  try {
    const telemetryDir = join(cwd, ".deuk-agent");
    mkdirSync(telemetryDir, { recursive: true });
    writeFileSync(join(telemetryDir, "telemetry.jsonl"), [
      JSON.stringify({ ts: 1, tokens: 100, tdw: 80, model: "m1", client: "Codex", ticket: "a", action: "work", file: "", synced: false }),
      JSON.stringify({ ts: 2, tokens: 40, tdw: 0, model: "m2", client: "Codex", ticket: "b", action: "work", file: "", synced: false })
    ].join("\n") + "\n", "utf8");

    const originalArgv = process.argv;
    const originalLog = console.log;
    const lines = [];
    process.argv = ["node", "test", "telemetry", "summary"];
    console.log = (value) => lines.push(String(value));

    try {
      await runTelemetry({ cwd, json: true });
    } finally {
      process.argv = originalArgv;
      console.log = originalLog;
    }

    const payload = JSON.parse(lines.at(-1));
    assert.strictEqual(payload.totalTdwTokens, 80);
    assert.strictEqual(payload.tdwEntryCount, 1);
    assert.strictEqual(payload.tdwCoverageRate, 0.5);
    assert.strictEqual(payload.tdwTokenShare, 80 / 140);
    assert.strictEqual(payload.tdwAverageTokensPerEntry, 80);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("telemetry summary separates internal workflow events from work logs", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-telemetry-workflow-"));
  try {
    const telemetryDir = join(cwd, ".deuk-agent");
    mkdirSync(telemetryDir, { recursive: true });
    writeFileSync(join(telemetryDir, "telemetry.jsonl"), [
      JSON.stringify({ ts: 1, occurredAt: "2026-05-02T00:00:00.000Z", source: "manual", kind: "work", tokens: 100, tdw: 50, model: "m1", client: "Codex", ticket: "a", action: "work", file: "", synced: false }),
      JSON.stringify({ ts: 2, occurredAt: "2026-05-02T00:00:00.000Z", source: "internal", kind: "workflow_event", event: "ticket_created", tokens: 0, tdw: 0, model: "workflow", client: "DeukAgentRules", ticket: "a", action: "ticket-create", file: "", synced: false }),
      JSON.stringify({ ts: 3, occurredAt: "2026-05-02T00:01:00.000Z", source: "internal", kind: "workflow_event", event: "ticket_closed", tokens: 0, tdw: 0, model: "workflow", client: "DeukAgentRules", ticket: "a", action: "ticket-close", file: "", synced: false })
    ].join("\n") + "\n", "utf8");

    const originalArgv = process.argv;
    const originalLog = console.log;
    const lines = [];
    process.argv = ["node", "test", "telemetry", "summary"];
    console.log = (value) => lines.push(String(value));

    try {
      await runTelemetry({ cwd, json: true });
    } finally {
      process.argv = originalArgv;
      console.log = originalLog;
    }

    const payload = JSON.parse(lines.at(-1));
    assert.strictEqual(payload.totalTokens, 100);
    assert.strictEqual(payload.logEntries, 1);
    assert.strictEqual(payload.totalLogEntries, 3);
    assert.strictEqual(payload.workflowEvents.eventCount, 2);
    assert.strictEqual(payload.workflowEvents.ticketCount, 1);
    assert.strictEqual(payload.workflowEvents.byEvent.ticket_created, 1);
    assert.strictEqual(payload.workflowEvents.byEvent.ticket_closed, 1);
    assert.strictEqual(payload.workflowEvents.averageTimeToCloseMs, 60000);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("telemetry log writes manual source and optional workflow fields", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-telemetry-log-fields-"));
  try {
    const originalArgv = process.argv;
    const originalLog = console.log;
    process.argv = ["node", "test", "telemetry", "log"];
    console.log = () => {};

    try {
      await runTelemetry({
        cwd,
        tokens: 3,
        model: "m1",
        ticket: "a",
        source: "manual",
        kind: "work",
        event: "note",
        occurredAt: "2026-05-02T00:00:00.000Z"
      });
    } finally {
      process.argv = originalArgv;
      console.log = originalLog;
    }

    const rows = readFileSync(join(cwd, ".deuk-agent", "telemetry.jsonl"), "utf8").trim().split("\n").map(JSON.parse);
    assert.strictEqual(rows[0].source, "manual");
    assert.strictEqual(rows[0].kind, "work");
    assert.strictEqual(rows[0].event, "note");
    assert.strictEqual(rows[0].occurredAt, "2026-05-02T00:00:00.000Z");
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
