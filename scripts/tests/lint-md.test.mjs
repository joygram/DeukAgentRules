import test from "node:test";
import assert from "node:assert";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { lintMarkdownPaths } from "../lint-md.mjs";

function makeReportFile(root, fileName, body) {
  const reportDir = join(root, ".deuk-agent", "docs", "plan");
  mkdirSync(reportDir, { recursive: true });
  const abs = join(reportDir, fileName);
  writeFileSync(abs, body, "utf8");
  return abs;
}

test("lintMarkdownPaths rejects walkthrough reports missing verification outcome", () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-lint-report-"));
  try {
    const rel = ".deuk-agent/docs/plan/001-sample-report.md";
    makeReportFile(cwd, "001-sample-report.md", [
      "---",
      "summary: sample report",
      "status: draft",
      "priority: P2",
      "tags: [report]",
      "---",
      "# Sample Report",
      "## Summary",
      "- summary line",
      "## Verification",
      "- command output",
      ""
    ].join("\n"));

    const result = lintMarkdownPaths([rel], cwd);
    assert.ok(result.errors.some(err => err.includes("missing Verification Outcome/Verification Results/검증 결과 section")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("lintMarkdownPaths accepts walkthrough reports with explicit outcome section", () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-lint-report-ok-"));
  try {
    const rel = ".deuk-agent/docs/plan/002-sample-report.md";
    makeReportFile(cwd, "002-sample-report.md", [
      "---",
      "summary: sample report",
      "status: draft",
      "priority: P2",
      "tags: [report]",
      "---",
      "# Sample Report",
      "## Summary",
      "- summary line",
      "## Verification",
      "- command output",
      "## Verification Outcome",
      "- passed",
      ""
    ].join("\n"));

    const result = lintMarkdownPaths([rel], cwd);
    assert.deepStrictEqual(result.errors, []);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("lintMarkdownPaths treats generated pointer docs as markdown, not YAML frontmatter", () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-lint-pointer-"));
  try {
    const rel = ".codex/AGENTS.md";
    mkdirSync(join(cwd, ".codex"), { recursive: true });
    writeFileSync(join(cwd, rel), [
      "---",
      "",
      "## DeukAgentRules",
      "",
      "> Managed by DeukAgentRules. Remove this section if not installed.",
      "",
      "# Deuk Agent Rules",
      ""
    ].join("\n"), "utf8");

    const result = lintMarkdownPaths([rel], cwd);
    assert.deepStrictEqual(result.errors, []);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("lintMarkdownPaths ignores broken non-ticket relative links", () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-lint-nonticket-link-"));
  try {
    const rel = ".deuk-agent/docs/notes.md";
    mkdirSync(join(cwd, ".deuk-agent", "docs"), { recursive: true });
    writeFileSync(join(cwd, ".deuk-agent", "docs", "notes.md"), [
      "---",
      "summary: Non-ticket link fixture",
      "status: active",
      "priority: P2",
      "tags: []",
      "---",
      "# Notes",
      "",
      "[missing source](./deleted-file.ts)",
      ""
    ].join("\n"), "utf8");

    const result = lintMarkdownPaths([rel], cwd);
    assert.deepStrictEqual(result.errors, []);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("lintMarkdownPaths still validates broken ticket-relative links", () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-lint-ticket-link-"));
  try {
    const rel = ".deuk-agent/tickets/sub/001-broken-ticket-link.md";
    mkdirSync(join(cwd, ".deuk-agent", "tickets", "sub"), { recursive: true });
    writeFileSync(join(cwd, rel), [
      "# Ticket note",
      "",
      "[missing ticket](./missing-ticket.md)",
      ""
    ].join("\n"), "utf8");

    const result = lintMarkdownPaths([rel], cwd);
    assert.ok(result.errors.some(err => err.includes("broken relative link -> ./missing-ticket.md")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
