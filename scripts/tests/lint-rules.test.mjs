import test from "node:test";
import assert from "node:assert";
import { auditRules } from "../lint-rules.mjs";

test("rules audit passes current low-token and ticket SSoT rules", () => {
  const result = auditRules(process.cwd());
  assert.strictEqual(result.ok, true, result.violations.map((v) => v.code).join(", "));
});

