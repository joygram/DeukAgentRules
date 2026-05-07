import test from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { auditRules } from "../lint-rules.mjs";

test("rules audit passes current low-token and ticket SSoT rules", () => {
  const result = auditRules(process.cwd());
  assert.strictEqual(result.ok, true, result.violations.map((v) => v.code).join(", "));
});

test("rules audit includes explicit short-answer override for direct user requests", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /짧게|매우 짧게|한 줄로|간단히/i);
  assert.match(rulesText, /one-sentence or bullet-only/i);
});

test("rules audit keeps ticket creation ahead of repo inspection for bug and regression work", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /do not run repo inspection commands/i);
  assert.match(rulesText, /deuk-agent-flow ticket create` or `deuk-agent-flow ticket use/i);
  assert.match(rulesText, /Do not start with `git status`, `rg`, `find`, diffs, or broad help output/i);
});

test("rules audit requires explicit approval before ticket guard context preflight", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /wait for explicit user approval/i);
  assert.match(rulesText, /deuk-agent-flow ticket guard --topic <id> --ticket-started --ticket-reviewed --approval approved/i);
  assert.match(rulesText, /explicit approval validated by `deuk-agent-flow ticket guard`/i);
  assert.match(rulesText, /reopen and review the durable ticket body/i);
});

test("rules audit requires stabilization ticket after repeated TDW failures", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /same TDW failure family appears twice/i);
  assert.match(rulesText, /stabilization\/root-cause ticket/i);
});

test("rules audit requires user requirements to be recorded and re-approved through the ticket", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /User requirements are ticket-first/i);
  assert.match(rulesText, /cause, analysis, and design\/approach/i);
  assert.match(rulesText, /approval or correction creates another ticket update loop/i);
  assert.match(rulesText, /update the ticket with that new input/i);
  assert.match(rulesText, /Completion reports go in the ticket first/i);
  assert.match(rulesText, /terse TDW feedback only/i);
});

test("rules audit maps AgentFlow skill status to DeukAgentFlow skill commands", () => {
  const result = auditRules(process.cwd());
  assert.ok(result.ok, result.violations.map((v) => `${v.code}:${v.message}`).join(", "));
  const rulesText = result.path ? String(readFileSync(result.path, "utf8")) : "";
  assert.match(rulesText, /AgentFlow Skill Status/i);
  assert.match(rulesText, /deuk-agent-flow skill list/i);
  assert.match(rulesText, /Do not answer from the host Codex skill list alone/i);
});
