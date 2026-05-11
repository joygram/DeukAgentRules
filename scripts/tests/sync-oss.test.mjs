import test from "node:test";
import assert from "node:assert";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { buildPublicPackageJson, syncPublicTree } from "../sync-oss.mjs";

test("public tree package payload stays public-only and excludes telemetry internals", () => {
  const srcPkg = {
    name: "deuk-agent-rule",
    version: "3.3.0",
    private: true,
    license: "",
    scripts: {
      test: "node --test scripts/tests/*.test.mjs",
      "sync:oss": "node scripts/sync-oss.mjs",
      "merge:dry": "node scripts/cli.mjs merge --dry-run",
      bump: "commit-and-tag-version"
    },
    devDependencies: {
      foo: "1.0.0"
    }
  };

  const outPkg = buildPublicPackageJson(srcPkg, "https://github.com/joygram/DeukAgentFlow", "git+https://github.com/joygram/DeukAgentFlow.git");

  assert.strictEqual(outPkg.license, "Apache-2.0");
  assert.strictEqual(outPkg.repository.url, "git+https://github.com/joygram/DeukAgentFlow.git");
  assert.strictEqual(outPkg.bugs.url, "https://github.com/joygram/DeukAgentFlow/issues");
  assert.strictEqual(outPkg.homepage, "https://github.com/joygram/DeukAgentFlow#readme");
  assert.ok(!Object.prototype.hasOwnProperty.call(outPkg, "private"));
  assert.ok(!Object.prototype.hasOwnProperty.call(outPkg, "devDependencies"));
  assert.deepStrictEqual(outPkg.scripts, {});
  assert.deepStrictEqual(outPkg.files, [
    "LICENSE",
    "bin/**/*",
    "core-rules/**/*",
    "docs/architecture.md",
    "docs/architecture.ko.md",
    "docs/badges/**/*",
    "docs/how-it-works.md",
    "docs/how-it-works.ko.md",
    "docs/principles.md",
    "docs/principles.ko.md",
    "docs/npm-publish-guide.ko.md",
    "docs/usage-guide.ko.md",
    "docs/assets/**/*",
    "templates/**/*",
    "scripts/cli.mjs",
    "scripts/cli-args.mjs",
    "scripts/cli-usage-commands.mjs",
    "scripts/cli-init-commands.mjs",
    "scripts/cli-init-logic.mjs",
    "scripts/cli-prompts.mjs",
    "scripts/cli-rule-compiler.mjs",
    "scripts/cli-skill-commands.mjs",
    "scripts/cli-telemetry-commands.mjs",
    "scripts/cli-ticket-command-shared.mjs",
    "scripts/cli-ticket-commands.mjs",
    "scripts/cli-ticket-index.mjs",
    "scripts/cli-ticket-migration.mjs",
    "scripts/cli-ticket-parser.mjs",
    "scripts/cli-utils.mjs",
    "scripts/lint-md.mjs",
    "scripts/lint-rules.mjs",
    "scripts/merge-logic.mjs",
    "scripts/plan-parser.mjs",
    "scripts/publish-dual-npm.mjs",
    "scripts/smoke-npm-local.mjs",
    "scripts/smoke-npm-docker.mjs",
    "scripts/update-download-badge.mjs",
    "README.md",
    "README.ko.md",
    "CHANGELOG.md",
    "CHANGELOG.ko.md"
  ]);
  assert.ok(!JSON.stringify(outPkg).includes(".deuk-agent"));
  assert.ok(!JSON.stringify(outPkg).includes("telemetry.jsonl"));
});

test("public package publish scripts skip source-only tests", () => {
  const srcPkg = {
    name: "deuk-agent-flow",
    version: "4.0.35",
    scripts: {
      publish: "node scripts/publish-dual-npm.mjs",
      "publish:dry": "node scripts/publish-dual-npm.mjs --dry-run",
      "publish:bootstrap": "node scripts/publish-dual-npm.mjs --alias-only",
      "publish:bootstrap:dry": "node scripts/publish-dual-npm.mjs --alias-only --dry-run",
      test: "node --test scripts/tests/*.test.mjs"
    }
  };

  const outPkg = buildPublicPackageJson(srcPkg);

  assert.strictEqual(outPkg.scripts.publish, "node scripts/publish-dual-npm.mjs --skip-tests");
  assert.strictEqual(outPkg.scripts["publish:dry"], "node scripts/publish-dual-npm.mjs --dry-run --skip-tests");
  assert.strictEqual(outPkg.scripts["publish:bootstrap"], "node scripts/publish-dual-npm.mjs --alias-only --skip-tests");
  assert.strictEqual(outPkg.scripts["publish:bootstrap:dry"], "node scripts/publish-dual-npm.mjs --alias-only --dry-run --skip-tests");
  assert.ok(!Object.prototype.hasOwnProperty.call(outPkg.scripts, "test"));
});

test("syncPublicTree removes stale public scripts before copying current sources", () => {
  const tempRoot = mkdtempSync(join(tmpdir(), "deuk-public-export-"));
  const srcRoot = join(tempRoot, "src");
  const publicTreeRoot = join(tempRoot, "public");
  const publicOverlayRoot = join(srcRoot, "public-export");

  try {
    mkdirSync(join(srcRoot, "templates"), { recursive: true });
    mkdirSync(join(srcRoot, "bin"), { recursive: true });
    mkdirSync(join(srcRoot, "core-rules"), { recursive: true });
    mkdirSync(join(srcRoot, "packages", "deuk-agent-rule"), { recursive: true });
    mkdirSync(join(srcRoot, "docs", "badges"), { recursive: true });
    mkdirSync(join(srcRoot, "docs", "assets"), { recursive: true });
    mkdirSync(join(srcRoot, ".github"), { recursive: true });
    mkdirSync(join(srcRoot, "scripts"), { recursive: true });
    mkdirSync(publicOverlayRoot, { recursive: true });
    mkdirSync(join(publicTreeRoot, "scripts"), { recursive: true });
    mkdirSync(join(publicTreeRoot, "node_modules"), { recursive: true });
    mkdirSync(join(publicTreeRoot, "bundle"), { recursive: true });

    writeFileSync(join(srcRoot, "README.md"), "src readme\n");
    writeFileSync(join(srcRoot, "README.ko.md"), "src ko readme\n");
    writeFileSync(join(srcRoot, "CHANGELOG.md"), "src changelog\n");
    writeFileSync(join(srcRoot, "CHANGELOG.ko.md"), "src ko changelog\n");
    writeFileSync(join(srcRoot, "LICENSE"), "license\n");
    writeFileSync(join(srcRoot, "package.json"), JSON.stringify({
      name: "deuk-agent-flow",
      version: "1.2.3",
      scripts: { test: "node --test scripts/tests/*.test.mjs" }
    }, null, 2));
    writeFileSync(join(srcRoot, "scripts", "cli.mjs"), "export const cli = true;\n");
    writeFileSync(join(srcRoot, "scripts", "cli-utils.mjs"), "export const AGENT_ROOT_DIR = '.deuk-agent';\n");
    writeFileSync(join(srcRoot, "scripts", "sync-oss.mjs"), "internal sync\n");
    writeFileSync(join(srcRoot, "bin", "deuk-agent-flow.js"), "#!/usr/bin/env node\n");
    writeFileSync(join(srcRoot, "core-rules", "AGENTS.md"), "core rules\n");
    writeFileSync(join(srcRoot, ".github", "copilot-instructions.md"), "copilot\n");
    writeFileSync(join(srcRoot, "docs", "architecture.md"), "arch\n");
    writeFileSync(join(srcRoot, "docs", "architecture.ko.md"), "arch ko\n");
    writeFileSync(join(srcRoot, "docs", "badges", "npm-downloads.json"), "{\"label\":\"deuk-flow downloads\"}\n");
    writeFileSync(join(srcRoot, "docs", "how-it-works.md"), "how\n");
    writeFileSync(join(srcRoot, "docs", "how-it-works.ko.md"), "how ko\n");
    writeFileSync(join(srcRoot, "docs", "principles.md"), "principles\n");
    writeFileSync(join(srcRoot, "docs", "principles.ko.md"), "principles ko\n");
    writeFileSync(join(srcRoot, "docs", "usage-guide.ko.md"), "usage ko\n");

    writeFileSync(join(publicTreeRoot, "scripts", "cli-ticket-logic.mjs"), "stale\n");
    writeFileSync(join(publicTreeRoot, "deuk-agent-flow-1.2.2.tgz"), "stale package\n");
    writeFileSync(join(publicTreeRoot, "node_modules", "stale.txt"), "stale deps\n");
    writeFileSync(join(publicTreeRoot, "bundle", "stale.txt"), "stale bundle\n");

    syncPublicTree({ pkgRoot: srcRoot, publicTreeRoot, publicOverlayRoot });

    assert.strictEqual(readFileSync(join(publicTreeRoot, "scripts", "cli.mjs"), "utf8"), "export const cli = true;\n");
    assert.throws(() => readFileSync(join(publicTreeRoot, "scripts", "cli-ticket-logic.mjs"), "utf8"));
    assert.throws(() => readFileSync(join(publicTreeRoot, "scripts", "sync-oss.mjs"), "utf8"));
    assert.throws(() => readFileSync(join(publicTreeRoot, "deuk-agent-flow-1.2.2.tgz"), "utf8"));
    assert.throws(() => readFileSync(join(publicTreeRoot, "node_modules", "stale.txt"), "utf8"));
    assert.throws(() => readFileSync(join(publicTreeRoot, "bundle", "stale.txt"), "utf8"));
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("syncPublicTree reminds maintainers to use semantic public commit messages", () => {
  const tempRoot = mkdtempSync(join(tmpdir(), "deuk-public-message-"));
  const srcRoot = join(tempRoot, "src");
  const publicTreeRoot = join(tempRoot, "public");
  const publicOverlayRoot = join(srcRoot, "public-export");
  const originalLog = console.log;
  const logs = [];

  try {
    console.log = (msg = "") => logs.push(String(msg));
    mkdirSync(join(srcRoot, "templates"), { recursive: true });
    mkdirSync(join(srcRoot, "bin"), { recursive: true });
    mkdirSync(join(srcRoot, "core-rules"), { recursive: true });
    mkdirSync(join(srcRoot, "packages", "deuk-agent-rule"), { recursive: true });
    mkdirSync(join(srcRoot, "docs", "assets"), { recursive: true });
    mkdirSync(join(srcRoot, ".github"), { recursive: true });
    mkdirSync(join(srcRoot, "scripts"), { recursive: true });
    mkdirSync(publicOverlayRoot, { recursive: true });

    writeFileSync(join(srcRoot, "README.md"), "src readme\n");
    writeFileSync(join(srcRoot, "README.ko.md"), "src ko readme\n");
    writeFileSync(join(srcRoot, "LICENSE"), "license\n");
    writeFileSync(join(srcRoot, "package.json"), JSON.stringify({ name: "deuk-agent-flow", version: "1.2.3" }, null, 2));
    writeFileSync(join(srcRoot, "scripts", "cli.mjs"), "export const cli = true;\n");
    writeFileSync(join(srcRoot, "scripts", "cli-utils.mjs"), "export const AGENT_ROOT_DIR = '.deuk-agent';\n");
    writeFileSync(join(srcRoot, "bin", "deuk-agent-flow.js"), "#!/usr/bin/env node\n");
    writeFileSync(join(srcRoot, "core-rules", "AGENTS.md"), "core rules\n");
    writeFileSync(join(srcRoot, ".github", "copilot-instructions.md"), "copilot\n");
    for (const doc of ["architecture.md", "architecture.ko.md", "how-it-works.md", "how-it-works.ko.md", "principles.md", "principles.ko.md", "usage-guide.ko.md"]) {
      writeFileSync(join(srcRoot, "docs", doc), doc + "\n");
    }

    syncPublicTree({ pkgRoot: srcRoot, publicTreeRoot, publicOverlayRoot });

    assert.ok(logs.some(line => /Public commit message: describe the released feature\/fix\/docs\/release change/i.test(line)));
    assert.ok(logs.some(line => /do not use 'sync' as the subject/i.test(line)));
  } finally {
    console.log = originalLog;
    rmSync(tempRoot, { recursive: true, force: true });
  }
});
