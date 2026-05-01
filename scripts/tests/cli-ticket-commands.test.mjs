import test from "node:test";
import assert from "node:assert";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pickTicketEntry, runTicketCreate, runTicketNext } from "../cli-ticket-commands.mjs";
import { TICKET_INDEX_FILENAME } from "../cli-utils.mjs";

function makeIndex(entries) {
  return { version: 1, updatedAt: "2026-05-01T00:00:00.000Z", entries };
}

function makeEntry(overrides) {
  return {
    id: "001-default-host",
    title: "default",
    topic: "001-default-host",
    group: "sub",
    fileName: "001-default-host.md",
    project: "global",
    submodule: "",
    createdAt: "2026-05-01 00:00:00",
    status: "open",
    ...overrides
  };
}

function makeTicketWorkspace(entries) {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-ticket-next-"));
  const ticketDir = join(cwd, ".deuk-agent", "tickets");
  mkdirSync(ticketDir, { recursive: true });
  writeFileSync(join(ticketDir, TICKET_INDEX_FILENAME), JSON.stringify(makeIndex(entries), null, 2) + "\n", "utf8");
  return { cwd, ticketDir };
}

test("pickTicketEntry applies submodule and project filters before selecting latest", () => {
  const index = makeIndex([
    makeEntry({
      id: "001-global-host",
      title: "newer global",
      topic: "001-global-host",
      createdAt: "2026-05-01 10:00:00"
    }),
    makeEntry({
      id: "002-deukpack-host",
      title: "older DeukPack",
      topic: "002-deukpack-host",
      project: "DeukAgentRules",
      submodule: "DeukPack",
      createdAt: "2026-05-01 09:00:00"
    })
  ]);

  assert.strictEqual(pickTicketEntry({}, index).id, "001-global-host");
  assert.strictEqual(pickTicketEntry({ submodule: "DeukPack" }, index).id, "002-deukpack-host");
  assert.strictEqual(pickTicketEntry({ project: "DeukAgentRules", submodule: "DeukPack" }, index).id, "002-deukpack-host");
  assert.strictEqual(pickTicketEntry({ project: "Other", submodule: "DeukPack" }, index), null);
});

test("pickTicketEntry applies filters before topic matching", () => {
  const index = makeIndex([
    makeEntry({
      id: "001-deukpack-global-host",
      topic: "001-deukpack-global-host",
      title: "matching topic outside submodule",
      createdAt: "2026-05-01 10:00:00"
    }),
    makeEntry({
      id: "002-deukpack-scoped-host",
      topic: "002-deukpack-scoped-host",
      title: "matching topic inside submodule",
      submodule: "DeukPack",
      createdAt: "2026-05-01 09:00:00"
    })
  ]);

  assert.strictEqual(
    pickTicketEntry({ topic: "deukpack", submodule: "DeukPack" }, index).id,
    "002-deukpack-scoped-host"
  );
});

test("runTicketNext selects first active/open ticket within submodule filter", async () => {
  const { cwd, ticketDir } = makeTicketWorkspace([
    makeEntry({
      id: "001-global-active-host",
      topic: "001-global-active-host",
      fileName: "001-global-active-host.md",
      status: "active",
      createdAt: "2026-05-01 08:00:00"
    }),
    makeEntry({
      id: "002-deukpack-open-host",
      topic: "002-deukpack-open-host",
      fileName: "002-deukpack-open-host.md",
      submodule: "DeukPack",
      status: "open",
      createdAt: "2026-05-01 07:00:00"
    })
  ]);

  const originalLog = console.log;
  const lines = [];
  console.log = value => lines.push(String(value));
  try {
    await runTicketNext({ cwd, submodule: "DeukPack", pathOnly: true });
  } finally {
    console.log = originalLog;
    rmSync(cwd, { recursive: true, force: true });
  }

  assert.deepStrictEqual(lines, [join(ticketDir, "sub", "002-deukpack-open-host.md")]);
});

test("runTicketNext preserves unfiltered active-first behavior", async () => {
  const { cwd, ticketDir } = makeTicketWorkspace([
    makeEntry({
      id: "001-global-active-host",
      topic: "001-global-active-host",
      fileName: "001-global-active-host.md",
      status: "active",
      createdAt: "2026-05-01 08:00:00"
    }),
    makeEntry({
      id: "002-deukpack-open-host",
      topic: "002-deukpack-open-host",
      fileName: "002-deukpack-open-host.md",
      submodule: "DeukPack",
      status: "open",
      createdAt: "2026-05-01 07:00:00"
    })
  ]);

  const originalLog = console.log;
  const lines = [];
  console.log = value => lines.push(String(value));
  try {
    await runTicketNext({ cwd, pathOnly: true });
  } finally {
    console.log = originalLog;
    rmSync(cwd, { recursive: true, force: true });
  }

  assert.deepStrictEqual(lines, [join(ticketDir, "sub", "001-global-active-host.md")]);
});

test("runTicketCreate generates non-duplicative ticket and planLink drafts", async () => {
  const cwd = mkdtempSync(join(tmpdir(), "deuk-ticket-plan-draft-"));
  const summary = "unique duplicated summary phrase must stay ticket-owned";
  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "non-duplicate-draft",
      summary,
      nonInteractive: true,
      docsLanguage: "en",
      skipPhase0: true
    });

    const ticketDir = join(cwd, ".deuk-agent", "tickets", "sub");
    const ticketFile = readdirSync(ticketDir).find(name => name.endsWith(".md"));
    assert.ok(ticketFile, "ticket markdown should be created");

    const ticketText = readFileSync(join(ticketDir, ticketFile), "utf8");
    const planLink = ticketText.match(/planLink:\s*(.+)/)?.[1]?.trim();
    assert.ok(planLink, "ticket should record planLink");
    assert.match(ticketText, /PlanLink:/);
    assert.doesNotMatch(ticketText, /Read relevant architecture and target module files/);

    const planText = readFileSync(join(cwd, planLink), "utf8");
    assert.doesNotMatch(planText, new RegExp(summary));
    assert.doesNotMatch(planText, /## Goal/);
    assert.match(planText, /## Ticket Contract Pointer/);
    assert.match(planText, /## Problem Analysis/);
    assert.match(planText, /## Source Observations/);
    assert.match(planText, /## Cause Hypotheses/);
    assert.match(planText, /## Decision Rationale/);
    assert.match(planText, /## Execution Strategy/);
    assert.match(planText, /## Verification Design/);
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});
