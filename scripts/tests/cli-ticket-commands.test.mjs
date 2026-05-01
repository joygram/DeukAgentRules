import test from "node:test";
import assert from "node:assert";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pickTicketEntry, runTicketArchive, runTicketCreate, runTicketNext, runTicketUse } from "../cli-ticket-commands.mjs";
import { readTicketIndexJson } from "../cli-ticket-index.mjs";
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

function makeTemplateWorkspace(options = {}) {
  const { withKoTemplate = false, baseMarker = "locale: base" } = options;
  const { cwd, ticketDir } = makeTicketWorkspace([]);
  const templateDir = join(cwd, ".deuk-agent", "templates");
  mkdirSync(templateDir, { recursive: true });

  const baseTemplate = [
    "---",
    "<%- frontmatter %>",
    "---",
    "# <%= meta.title %>",
    `TemplateLocale: ${baseMarker}`,
    ""
  ].join("\n");

  writeFileSync(join(templateDir, "TICKET_TEMPLATE.md"), baseTemplate, "utf8");

  if (withKoTemplate) {
    const koTemplate = [
      "---",
      "<%- frontmatter %>",
      "---",
      "# <%= meta.title %>",
      "TemplateLocale: ko",
      ""
    ].join("\n");
    writeFileSync(join(templateDir, "TICKET_TEMPLATE.ko.md"), koTemplate, "utf8");
  }

  return { cwd, ticketDir };
}

function readNewestTicketMarkdown(ticketDir) {
  const subDir = join(ticketDir, "sub");
  if (!existsSync(subDir)) return null;

  const candidates = readdirSync(subDir).filter(name => name.endsWith(".md"));
  if (candidates.length === 0) return null;
  return join(subDir, candidates.at(-1));
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

test("runTicketNext tells agents to inspect git history when no ticket exists", async () => {
  const { cwd } = makeTicketWorkspace([]);

  await assert.rejects(
    () => runTicketNext({ cwd, pathOnly: true }),
    /Inspect recent git history before creating a follow-up ticket/
  );

  rmSync(cwd, { recursive: true, force: true });
});

test("runTicketUse no-match error shows latest closed ticket and open tickets", async () => {
  const { cwd } = makeTicketWorkspace([
    makeEntry({
      id: "001-old-closed-host",
      title: "old closed ticket",
      topic: "001-old-closed-host",
      createdAt: "2026-04-01 00:00:00",
      updatedAt: "2026-04-01T00:00:00.000Z",
      status: "closed"
    }),
    makeEntry({
      id: "002-latest-closed-host",
      title: "latest closed ticket",
      topic: "002-latest-closed-host",
      createdAt: "2026-04-02 00:00:00",
      updatedAt: "2026-04-03T00:00:00.000Z",
      status: "closed"
    }),
    makeEntry({
      id: "003-open-host",
      title: "open ticket",
      topic: "003-open-host",
      createdAt: "2026-04-04 00:00:00",
      status: "open"
    }),
    makeEntry({
      id: "004-active-host",
      title: "active ticket",
      topic: "004-active-host",
      createdAt: "2026-04-05 00:00:00",
      status: "active"
    }),
    makeEntry({
      id: "005-archived-host",
      title: "archived ticket",
      topic: "005-archived-host",
      createdAt: "2026-04-06 00:00:00",
      status: "archived"
    })
  ]);

  try {
    await assert.rejects(
      () => runTicketUse({ cwd, topic: "missing-alias", nonInteractive: true }),
      err => {
        assert.match(err.message, /No matching ticket found for "missing-alias"/);
        assert.match(err.message, /Last closed ticket and open tickets/);
        assert.match(err.message, /002-latest-closed-host/);
        assert.doesNotMatch(err.message, /001-old-closed-host/);
        assert.match(err.message, /003-open-host/);
        assert.match(err.message, /004-active-host/);
        assert.doesNotMatch(err.message, /005-archived-host/);
        assert.match(err.message, /ticket use --topic <ticket-id> --non-interactive/);
        return true;
      }
    );
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketArchive updates index path to archived ticket location", async () => {
  const ticketPath = ".deuk-agent/tickets/sub/001-default-host.md";
  const { cwd, ticketDir } = makeTicketWorkspace([
    makeEntry({
      path: ticketPath,
      status: "closed"
    })
  ]);
  const srcDir = join(ticketDir, "sub");
  mkdirSync(srcDir, { recursive: true });
  writeFileSync(join(cwd, ticketPath), [
    "---",
    "id: 001-default-host",
    "title: default",
    "phase: 4",
    "status: closed",
    "summary: default",
    "priority: P2",
    "tags: [test]",
    "---",
    "# default",
    ""
  ].join("\n"), "utf8");

  const originalLog = console.log;
  const lines = [];
  let result;
  console.log = value => lines.push(String(value));
  try {
    result = await runTicketArchive({ cwd, topic: "001", nonInteractive: true });
  } finally {
    console.log = originalLog;
  }

  const archivedPath = ".deuk-agent/tickets/archive/sub/2026-05/01/001-default-host.md";
  const index = JSON.parse(readFileSync(join(ticketDir, TICKET_INDEX_FILENAME), "utf8"));
  assert.ok(existsSync(join(cwd, archivedPath)), "archived ticket file should exist");
  assert.strictEqual(index.entries[0].status, "archived");
  assert.strictEqual(index.entries[0].archiveYearMonth, "2026-05");
  assert.strictEqual(index.entries[0].archiveDay, "01");
  assert.strictEqual(result.path, archivedPath);
  assert.ok(lines.includes("ticket archive: final ticket path " + archivedPath));

  rmSync(cwd, { recursive: true, force: true });
});

test("runTicketArchive updates activeTicketId when archiving active ticket", async () => {
  const activePath = ".deuk-agent/tickets/sub/001-default-host.md";
  const openPath = ".deuk-agent/tickets/sub/002-waiting-host.md";
  const { cwd, ticketDir } = makeTicketWorkspace([
    makeEntry({
      id: "001-default-host",
      title: "active-ticket",
      topic: "001-default-host",
      fileName: "001-default-host.md",
      path: activePath,
      status: "active",
      phase: 4
    }),
    makeEntry({
      id: "002-waiting-host",
      title: "next-ticket",
      topic: "002-waiting-host",
      fileName: "002-waiting-host.md",
      path: openPath,
      status: "open"
    })
  ]);

  const srcDir = join(ticketDir, "sub");
  mkdirSync(srcDir, { recursive: true });
  [activePath, openPath].forEach(ticketPath => {
    writeFileSync(join(cwd, ticketPath), [
      "---",
      `id: ${ticketPath === activePath ? "001-default-host" : "002-waiting-host"}`,
      `title: ${ticketPath === activePath ? "active-ticket" : "next-ticket"}`,
      "phase: 4",
      "status: open",
      "summary: status transition test",
      "priority: P2",
      "tags: [test]",
      "---",
      "# default",
      ""
    ].join("\n"), "utf8");
  });

  await runTicketArchive({ cwd, topic: "001", nonInteractive: true });

  const index = JSON.parse(readFileSync(join(ticketDir, TICKET_INDEX_FILENAME), "utf8"));
  assert.strictEqual(index.activeTicketId, "002-waiting-host");
  const archivedEntry = index.entries.find(e => e.id === "001-default-host");
  const openEntry = index.entries.find(e => e.id === "002-waiting-host");
  assert.strictEqual(archivedEntry.status, "archived");
  assert.strictEqual(openEntry.status, "open");

  rmSync(cwd, { recursive: true, force: true });
});

test("runTicketArchive auto-detects existing walkthrough report and attaches link", async () => {
  const ticketPath = ".deuk-agent/tickets/sub/003-default-host.md";
  const reportPath = ".deuk-agent/docs/walkthroughs/003-default-host-report.md";
  const { cwd } = makeTicketWorkspace([
    makeEntry({
      id: "003-default-host",
      title: "with-report",
      topic: "003-default-host",
      fileName: "003-default-host.md",
      path: ticketPath,
      status: "open"
    })
  ]);

  const srcDir = join(cwd, ".deuk-agent", "tickets", "sub");
  const reportDir = join(cwd, ".deuk-agent", "docs", "walkthroughs");
  mkdirSync(srcDir, { recursive: true });
  mkdirSync(reportDir, { recursive: true });

  writeFileSync(join(cwd, ticketPath), [
    "---",
    "id: 003-default-host",
    "title: with-report",
    "phase: 4",
    "status: open",
    "summary: report attach test",
    "priority: P2",
    "tags: [test]",
    "---",
    "# default",
    ""
  ].join("\n"), "utf8");

  writeFileSync(join(cwd, reportPath), [
    "# walkthrough",
    ""
  ].join("\n"), "utf8");

  const originalLog = console.log;
  const lines = [];
  console.log = value => lines.push(String(value));

  let archived;
  try {
    archived = await runTicketArchive({ cwd, topic: "003", nonInteractive: true });
  } finally {
    console.log = originalLog;
  }

  const archivedContent = readFileSync(join(cwd, archived.path), "utf8");
  assert.ok(lines.includes("ticket archive: auto-detected report at .deuk-agent/docs/walkthroughs/003-default-host-report.md"));
  assert.ok(archivedContent.includes("## 📄 Attached Report"));
  assert.ok(archivedContent.includes("View Report"));

  rmSync(cwd, { recursive: true, force: true });
});

test("runTicketCreate/next/archive roundtrip preserves language template output", async () => {
  const cases = [
    { label: "en", docsLanguage: "en", expectedTemplate: "TemplateLocale: locale: base", withKoTemplate: false },
    { label: "ko", docsLanguage: "ko", expectedTemplate: "TemplateLocale: ko", withKoTemplate: true },
    { label: "fr-fallback", docsLanguage: "fr", expectedTemplate: "TemplateLocale: locale: base", withKoTemplate: false }
  ];

  for (const tc of cases) {
    const { cwd, ticketDir } = makeTemplateWorkspace({ withKoTemplate: tc.withKoTemplate, baseMarker: "locale: base" });
    const originalLog = console.log;
    const originalWarn = console.warn;
    const output = [];
    const topic = `roundtrip-${tc.label}-ticket`;
    console.log = value => output.push(String(value));
    console.warn = value => output.push(`WARN:${String(value)}`);

    try {
      await runTicketCreate({
        cwd,
        topic,
        summary: `roundtrip verify for ${tc.label}`,
        nonInteractive: true,
        docsLanguage: tc.docsLanguage,
        skipPhase0: true
      });

      const createdFile = readNewestTicketMarkdown(ticketDir);
      assert.ok(createdFile, "ticket markdown should be created");
      const createdFileName = createdFile.split("/").pop();
      const createdText = readFileSync(createdFile, "utf8");
      assert.match(createdText, new RegExp(tc.expectedTemplate));

      const index = readTicketIndexJson(cwd);
      const entry = index.entries.find(item => item.path && item.path.endsWith(`sub/${createdFileName}`));
      assert.ok(entry, `index should contain created entry with path, entries=${JSON.stringify(index.entries)}`);
      assert.strictEqual(entry.path, `.deuk-agent/tickets/sub/${createdFileName}`);

      output.length = 0;
      await runTicketNext({ cwd, pathOnly: true });
      assert.ok(output.some(line => line.endsWith(createdFileName)), "runTicketNext should resolve and print created ticket path");

      const archived = await runTicketArchive({ cwd, topic, nonInteractive: true });
      assert.match(archived?.path || "", /^\.deuk-agent\/tickets\/archive\/sub\/\d{4}-\d{2}\/\d{2}\//);
      assert.ok(archived.path.endsWith(`/${createdFileName}`));

      const archivedText = readFileSync(join(cwd, archived.path), "utf8");
      assert.ok(archivedText.includes(`# ${topic}`));
      assert.match(archivedText, new RegExp(tc.expectedTemplate));

      const updatedIndex = readTicketIndexJson(cwd);
      const archivedEntry = updatedIndex.entries.find(item => item.id === entry.id);
      assert.ok(archivedEntry, "archived entry should remain in index");
      assert.strictEqual(archivedEntry.status, "archived");
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      rmSync(cwd, { recursive: true, force: true });
    }
  }
});

test("runTicketCreate blocks excess open tickets and asks user to choose archive target", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace();
  const srcDir = join(ticketDir, "sub");
  mkdirSync(srcDir, { recursive: true });

  const entries = [];
  for (let i = 1; i <= 20; i++) {
    const id = `${String(i).padStart(3, "0")}-old-open-host`;
    const fileName = `${id}.md`;
    const createdAt = `2026-04-${String(i).padStart(2, "0")} 00:00:00`;
    entries.push(makeEntry({
      id,
      title: `old open ${i}`,
      topic: id,
      fileName,
      createdAt,
      status: "open"
    }));
    writeFileSync(join(srcDir, fileName), [
      "---",
      `id: ${id}`,
      `title: old open ${i}`,
      "phase: 1",
      "status: open",
      `createdAt: ${createdAt}`,
      "summary: old open ticket",
      "priority: P2",
      "tags: [test]",
      "---",
      `# old open ${i}`,
      ""
    ].join("\n"), "utf8");
  }
  writeFileSync(join(ticketDir, TICKET_INDEX_FILENAME), JSON.stringify(makeIndex(entries), null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await assert.rejects(
      () => runTicketCreate({
        cwd,
        topic: "new-overflow-ticket",
        summary: "create one more ticket after twenty open entries",
        nonInteractive: true,
        docsLanguage: "en",
        skipPhase0: true
      }),
      err => {
        assert.match(err.message, /Open tickets: 21\/20/);
        assert.match(err.message, /ticket list --active --non-interactive/);
        assert.match(err.message, /ticket archive --topic <ticket-id> --non-interactive/);
        assert.match(err.message, /001-old-open-host/);
        return true;
      }
    );

    const index = readTicketIndexJson(cwd);
    const openCount = index.entries.filter(e => e.status === "open" || e.status === "active").length;
    assert.strictEqual(openCount, 20);

    const oldest = index.entries.find(e => e.id === "001-old-open-host");
    assert.strictEqual(oldest.status, "open");
    assert.ok(existsSync(join(cwd, ".deuk-agent/tickets/sub/001-old-open-host.md")));
    assert.ok(!existsSync(join(cwd, ".deuk-agent/tickets/archive/sub/2026-04/01/001-old-open-host.md")));
    const subFiles = readdirSync(srcDir);
    assert.ok(!subFiles.some(name => name.includes("new-overflow-ticket")));
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketCreate auto-archives closed tickets before enforcing open ticket limit", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace();
  const srcDir = join(ticketDir, "sub");
  mkdirSync(srcDir, { recursive: true });

  const entries = [];
  for (let i = 1; i <= 19; i++) {
    const id = `${String(i).padStart(3, "0")}-old-open-host`;
    const fileName = `${id}.md`;
    const createdAt = `2026-04-${String(i).padStart(2, "0")} 00:00:00`;
    entries.push(makeEntry({
      id,
      title: `old open ${i}`,
      topic: id,
      fileName,
      createdAt,
      status: "open"
    }));
    writeFileSync(join(srcDir, fileName), [
      "---",
      `id: ${id}`,
      `title: old open ${i}`,
      "phase: 1",
      "status: open",
      `createdAt: ${createdAt}`,
      "summary: old open ticket",
      "priority: P2",
      "tags: [test]",
      "---",
      `# old open ${i}`,
      ""
    ].join("\n"), "utf8");
  }

  const closedId = "020-closed-host";
  entries.push(makeEntry({
    id: closedId,
    title: "closed ticket",
    topic: closedId,
    fileName: `${closedId}.md`,
    createdAt: "2026-04-20 00:00:00",
    status: "closed"
  }));
  writeFileSync(join(srcDir, `${closedId}.md`), [
    "---",
    `id: ${closedId}`,
    "title: closed ticket",
    "phase: 4",
    "status: closed",
    "createdAt: 2026-04-20 00:00:00",
    "summary: closed ticket",
    "priority: P2",
    "tags: [test]",
    "---",
    "# closed ticket",
    ""
  ].join("\n"), "utf8");
  writeFileSync(join(ticketDir, TICKET_INDEX_FILENAME), JSON.stringify(makeIndex(entries), null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "new-after-closed-cleanup",
      summary: "create after archiving closed ticket",
      nonInteractive: true,
      docsLanguage: "en",
      skipPhase0: true
    });

    const index = readTicketIndexJson(cwd);
    const openCount = index.entries.filter(e => e.status === "open" || e.status === "active").length;
    assert.strictEqual(openCount, 20);

    const closed = index.entries.find(e => e.id === closedId);
    assert.strictEqual(closed.status, "archived");
    assert.strictEqual(closed.archiveYearMonth, "2026-04");
    assert.strictEqual(closed.archiveDay, "20");
    assert.ok(existsSync(join(cwd, ".deuk-agent/tickets/archive/sub/2026-04/20/020-closed-host.md")));
    assert.ok(!existsSync(join(cwd, ".deuk-agent/tickets/sub/020-closed-host.md")));

    const subFiles = readdirSync(srcDir);
    assert.ok(subFiles.some(name => name.includes("new-after-closed-cleanup")));
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketCreate preserves closed auto-archive when new ticket exceeds open limit", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace();
  const srcDir = join(ticketDir, "sub");
  mkdirSync(srcDir, { recursive: true });

  const entries = [];
  for (let i = 1; i <= 20; i++) {
    const id = `${String(i).padStart(3, "0")}-old-open-host`;
    const fileName = `${id}.md`;
    const createdAt = `2026-04-${String(i).padStart(2, "0")} 00:00:00`;
    entries.push(makeEntry({
      id,
      title: `old open ${i}`,
      topic: id,
      fileName,
      createdAt,
      status: "open"
    }));
    writeFileSync(join(srcDir, fileName), [
      "---",
      `id: ${id}`,
      `title: old open ${i}`,
      "phase: 1",
      "status: open",
      `createdAt: ${createdAt}`,
      "summary: old open ticket",
      "priority: P2",
      "tags: [test]",
      "---",
      `# old open ${i}`,
      ""
    ].join("\n"), "utf8");
  }

  const closedId = "021-closed-host";
  entries.push(makeEntry({
    id: closedId,
    title: "closed ticket",
    topic: closedId,
    fileName: `${closedId}.md`,
    createdAt: "2026-04-21 00:00:00",
    status: "closed"
  }));
  writeFileSync(join(srcDir, `${closedId}.md`), [
    "---",
    `id: ${closedId}`,
    "title: closed ticket",
    "phase: 4",
    "status: closed",
    "createdAt: 2026-04-21 00:00:00",
    "summary: closed ticket",
    "priority: P2",
    "tags: [test]",
    "---",
    "# closed ticket",
    ""
  ].join("\n"), "utf8");
  writeFileSync(join(ticketDir, TICKET_INDEX_FILENAME), JSON.stringify(makeIndex(entries), null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await assert.rejects(
      () => runTicketCreate({
        cwd,
        topic: "new-overflow-after-closed-cleanup",
        summary: "create should fail but keep closed archive consistent",
        nonInteractive: true,
        docsLanguage: "en",
        skipPhase0: true
      }),
      err => {
        assert.match(err.message, /Open tickets: 21\/20/);
        return true;
      }
    );

    const index = readTicketIndexJson(cwd);
    const openCount = index.entries.filter(e => e.status === "open" || e.status === "active").length;
    assert.strictEqual(openCount, 20);
    assert.ok(!index.entries.some(e => e.topic === "new-overflow-after-closed-cleanup"));

    const closed = index.entries.find(e => e.id === closedId);
    assert.strictEqual(closed.status, "archived");
    assert.strictEqual(closed.archiveYearMonth, "2026-04");
    assert.strictEqual(closed.archiveDay, "21");
    assert.ok(existsSync(join(cwd, ".deuk-agent/tickets/archive/sub/2026-04/21/021-closed-host.md")));
    assert.ok(!existsSync(join(cwd, ".deuk-agent/tickets/sub/021-closed-host.md")));

    const subFiles = readdirSync(srcDir);
    assert.ok(!subFiles.some(name => name.includes("new-overflow-after-closed-cleanup")));
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketCreate repairs closed index entry when ticket file is already archived", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace();
  const srcDir = join(ticketDir, "sub");
  const archiveDir = join(ticketDir, "archive", "sub", "2026-04", "19");
  mkdirSync(srcDir, { recursive: true });
  mkdirSync(archiveDir, { recursive: true });

  const closedId = "001-already-archived-host";
  const entries = [
    makeEntry({
      id: closedId,
      title: "already archived",
      topic: closedId,
      fileName: `${closedId}.md`,
      createdAt: "2026-04-19 00:00:00",
      status: "closed"
    })
  ];
  writeFileSync(join(archiveDir, `${closedId}.md`), [
    "---",
    `id: ${closedId}`,
    "title: already archived",
    "phase: 4",
    "status: closed",
    "createdAt: 2026-04-19 00:00:00",
    "summary: already archived ticket",
    "priority: P2",
    "tags: [test]",
    "---",
    "# already archived",
    ""
  ].join("\n"), "utf8");
  writeFileSync(join(ticketDir, TICKET_INDEX_FILENAME), JSON.stringify(makeIndex(entries), null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "new-after-repair",
      summary: "create after repairing archived ticket index",
      nonInteractive: true,
      docsLanguage: "en",
      skipPhase0: true
    });

    const index = readTicketIndexJson(cwd);
    const closed = index.entries.find(e => e.id === closedId);
    assert.strictEqual(closed.status, "archived");
    assert.strictEqual(closed.archiveYearMonth, "2026-04");
    assert.strictEqual(closed.archiveDay, "19");
    assert.ok(existsSync(join(cwd, ".deuk-agent/tickets/archive/sub/2026-04/19/001-already-archived-host.md")));
    assert.ok(index.entries.some(e => e.id.includes("new-after-repair")));
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
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

    const ticketDir = join(cwd, ".deuk-agent", "tickets");
    const ticketFile = readNewestTicketMarkdown(ticketDir);
    assert.ok(ticketFile, "ticket markdown should be created");

    const ticketText = readFileSync(ticketFile, "utf8");
    const planLink = ticketText.match(/planLink:\s*(.+)/)?.[1]?.trim();
    assert.ok(planLink, "ticket should record planLink");
    assert.match(ticketText, /PlanLink:/);
    assert.doesNotMatch(ticketText, /Read relevant architecture and target module files/);

    const planText = readFileSync(join(cwd, planLink), "utf8");
    assert.doesNotMatch(planText, new RegExp(summary));
    assert.doesNotMatch(planText, /## Goal/);
    assert.doesNotMatch(planText, /\[[ xX]\]/);
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

test("runTicketCreate works per docsLanguage and uses localized template when present", async () => {
  const cases = [
    { docsLanguage: "en", expectedTemplate: "TemplateLocale: locale: base", withKoTemplate: false },
    { docsLanguage: "ko", expectedTemplate: "TemplateLocale: ko", withKoTemplate: true }
  ];

  for (const tc of cases) {
    const { cwd, ticketDir } = makeTemplateWorkspace({ withKoTemplate: tc.withKoTemplate });
    const originalLog = console.log;
    const originalWarn = console.warn;
    console.log = () => {};
    console.warn = () => {};

    try {
      await runTicketCreate({
        cwd,
        topic: `language-${tc.docsLanguage}-ticket`,
        summary: `validate template rendering for ${tc.docsLanguage}`,
        nonInteractive: true,
        docsLanguage: tc.docsLanguage,
        skipPhase0: true
      });

      const ticketFile = readNewestTicketMarkdown(ticketDir);
      assert.ok(ticketFile, "ticket markdown should be created");
      const ticketText = readFileSync(ticketFile, "utf8");
      assert.match(ticketText, new RegExp(tc.expectedTemplate));
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      rmSync(cwd, { recursive: true, force: true });
    }
  }
});

test("runTicketCreate infers Korean prompt language before saved English config", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace({ withKoTemplate: true });
  writeFileSync(join(cwd, ".deuk-agent", "config.json"), JSON.stringify({
    version: 1,
    docsLanguage: "en"
  }, null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "prompt-language-korean",
      summary: "티켓과 계획 문서를 사용자 프롬프트 언어로 생성한다",
      nonInteractive: true,
      skipPhase0: true
    });

    const ticketFile = readNewestTicketMarkdown(ticketDir);
    assert.ok(ticketFile, "ticket markdown should be created");
    const ticketText = readFileSync(ticketFile, "utf8");
    assert.match(ticketText, /docsLanguage: ko/);
    assert.match(ticketText, /TemplateLocale: ko/);
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketCreate infers English prompt language before saved Korean config", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace({ withKoTemplate: true });
  writeFileSync(join(cwd, ".deuk-agent", "config.json"), JSON.stringify({
    version: 1,
    docsLanguage: "ko"
  }, null, 2) + "\n", "utf8");

  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "prompt-language-english",
      summary: "create ticket and plan documents in the user prompt language",
      nonInteractive: true,
      skipPhase0: true
    });

    const ticketFile = readNewestTicketMarkdown(ticketDir);
    assert.ok(ticketFile, "ticket markdown should be created");
    const ticketText = readFileSync(ticketFile, "utf8");
    assert.match(ticketText, /docsLanguage: en/);
    assert.match(ticketText, /TemplateLocale: locale: base/);
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("runTicketCreate falls back to base template when localized template is missing", async () => {
  const { cwd, ticketDir } = makeTemplateWorkspace({ withKoTemplate: false });
  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = () => {};
  console.warn = () => {};

  try {
    await runTicketCreate({
      cwd,
      topic: "fallback-ticket-template",
      summary: "validate ko language fallback in template lookup",
      nonInteractive: true,
      docsLanguage: "ko",
      skipPhase0: true
    });

    const ticketFile = readNewestTicketMarkdown(ticketDir);
    assert.ok(ticketFile, "ticket markdown should be created");
    const ticketText = readFileSync(ticketFile, "utf8");
    assert.match(ticketText, /TemplateLocale: locale: base/);
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    rmSync(cwd, { recursive: true, force: true });
  }
});
