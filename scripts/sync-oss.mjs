/**
 * Populates ../DeukAgentFlow for the public GitHub repo.
 * Run: cd deuk-agent-flow && npm run sync:oss
 */
import { cpSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync, rmSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { AGENT_ROOT_DIR } from "./cli-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const repoRoot = join(pkgRoot, "..");
// OSS release workspace lives under workspace/OSS/DeukAgentFlow.
const ossRoot = join(repoRoot, "OSS", "DeukAgentFlow");
const ossPublic = join(pkgRoot, "oss-public");
const PUBLIC_DOCS = [
  "architecture.md",
  "architecture.ko.md",
  "how-it-works.md",
  "how-it-works.ko.md",
  "principles.md",
  "principles.ko.md",
  "usage-guide.ko.md",
];

/** Set DEUK_AGENT_FLOW_OSS_REPO to override, e.g. https://github.com/you/DeukAgentFlow */
const OSS_REPO =
  process.env.DEUK_AGENT_FLOW_OSS_REPO
  || process.env.DEUK_AGENT_RULES_OSS_REPO
  || "https://github.com/joygram/DeukAgentFlow";

function gitBase() {
  let u = OSS_REPO.trim().replace(/\.git$/i, "").replace(/\/$/, "");
  if (!u.startsWith("http")) return u;
  return u;
}

const base = gitBase();
const gitUrl = base.startsWith("http") ? "git+" + base + ".git" : base;

/** Strip OSS package.json hooks not used in the public mirror. */
function stripOssVersionrcScripts(ossVersionrcPath) {
  let t = readFileSync(ossVersionrcPath, "utf8").replace(/\r\n/g, "\n");
  t = t.replace(/\n  scripts:\s*\{\n[\s\S]*?\n  \},\s*\n/, "\n");
  writeFileSync(ossVersionrcPath, t, "utf8");
}

export function buildOssPackageJson(srcPkg, baseUrl = base, gitRemoteUrl = gitUrl) {
  const outPkg = {
    ...srcPkg,
    license: srcPkg.license || "Apache-2.0",
    repository: {
      type: "git",
      url: gitRemoteUrl,
    },
    bugs: {
      url: baseUrl.startsWith("http") ? baseUrl + "/issues" : baseUrl,
    },
    homepage: baseUrl.startsWith("http") ? baseUrl + "#readme" : baseUrl,
    files: [
      "LICENSE",
      "bin/**/*",
      "docs/architecture.md",
      "docs/architecture.ko.md",
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
      "CHANGELOG.ko.md",
    ],
  };

  delete outPkg.private;
  if (outPkg.scripts && outPkg.scripts["merge:dry"]) {
    const { "merge:dry": _md, ...r2 } = outPkg.scripts;
    outPkg.scripts = r2;
  }
  if (outPkg.scripts && outPkg.scripts["sync:oss"]) {
    const { "sync:oss": _drop, ...rest } = outPkg.scripts;
    outPkg.scripts = rest;
  }
  /** Mirror is not a template/version source: no bump scripts or release devDependencies. */
  for (const k of ["bump", "bump:patch", "bump:minor", "bump:major"]) {
    if (outPkg.scripts && outPkg.scripts[k]) {
      const { [k]: _drop, ...rest } = outPkg.scripts;
      outPkg.scripts = rest;
    }
  }
  delete outPkg.devDependencies;
  return outPkg;
}

mkdirSync(join(ossRoot, "scripts"), { recursive: true });
mkdirSync(join(ossRoot, "templates"), { recursive: true });

export function syncOssTree() {
  const agentRoot = join(ossRoot, AGENT_ROOT_DIR);
  if (existsSync(agentRoot)) {
    rmSync(agentRoot, { recursive: true, force: true });
  }
  if (existsSync(join(ossRoot, "TICKET_LIST.md"))) {
    unlinkSync(join(ossRoot, "TICKET_LIST.md"));
  }
  for (const rel of [
    ".aiassistant",
    ".claude",
    ".codex",
    ".cursor",
    ".github/workflows",
    ".windsurf",
    "AGENTS.md",
    ".npmrc",
    ".versionrc.cjs",
    "changelog-templates",
    "docs",
    "packages",
    "PROJECT_RULE.md",
    "RELEASING.md",
    "RELEASING.ko.md",
    "GITHUB_DESCRIPTION.md",
    "publish",
    "scripts/sync-oss.mjs"
  ]) {
    const abs = join(ossRoot, rel);
    if (existsSync(abs)) {
      rmSync(abs, { recursive: true, force: true });
    }
  }
  cpSync(join(pkgRoot, "templates"), join(ossRoot, "templates"), { recursive: true, force: true });
  cpSync(join(pkgRoot, "packages"), join(ossRoot, "packages"), { recursive: true, force: true });
  mkdirSync(join(ossRoot, "docs"), { recursive: true });
  for (const doc of PUBLIC_DOCS) {
    cpSync(join(pkgRoot, "docs", doc), join(ossRoot, "docs", doc), { force: true });
  }
  cpSync(join(pkgRoot, "docs", "assets"), join(ossRoot, "docs", "assets"), { recursive: true, force: true });
  const copilotInstructions = join(pkgRoot, ".github", "copilot-instructions.md");
  if (existsSync(copilotInstructions)) {
    mkdirSync(join(ossRoot, ".github"), { recursive: true });
    cpSync(copilotInstructions, join(ossRoot, ".github", "copilot-instructions.md"), { force: true });
  }
  cpSync(join(pkgRoot, "scripts"), join(ossRoot, "scripts"), { recursive: true, force: true });

  if (!existsSync(ossPublic)) {
    throw new Error("Missing oss-public/: " + ossPublic);
  }
  cpSync(join(pkgRoot, "README.md"), join(ossRoot, "README.md"), { force: true });
  cpSync(join(pkgRoot, "README.ko.md"), join(ossRoot, "README.ko.md"), { force: true });
  if (existsSync(join(pkgRoot, "CHANGELOG.md"))) {
    cpSync(join(pkgRoot, "CHANGELOG.md"), join(ossRoot, "CHANGELOG.md"), { force: true });
  }
  if (existsSync(join(pkgRoot, "CHANGELOG.ko.md"))) {
    cpSync(join(pkgRoot, "CHANGELOG.ko.md"), join(ossRoot, "CHANGELOG.ko.md"), { force: true });
  }
  if (existsSync(join(pkgRoot, "package-lock.json"))) {
    cpSync(join(pkgRoot, "package-lock.json"), join(ossRoot, "package-lock.json"), { force: true });
  }
  if (existsSync(join(pkgRoot, "LICENSE"))) {
    cpSync(join(pkgRoot, "LICENSE"), join(ossRoot, "LICENSE"), { force: true });
  }
  const srcPkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
  const outPkg = buildOssPackageJson(srcPkg);

  writeFileSync(join(ossRoot, "package.json"), JSON.stringify(outPkg, null, 2) + "\n", "utf8");

  const ossPolish = join(ossRoot, "scripts", "changelog-polish.mjs");
  if (existsSync(ossPolish)) {
    unlinkSync(ossPolish);
  }
  const ossSyncScript = join(ossRoot, "scripts", "sync-oss.mjs");
  if (existsSync(ossSyncScript)) {
    unlinkSync(ossSyncScript);
  }

  console.log("deuk-agent-flow: synced OSS tree at " + ossRoot);
  console.log("  Override repo URL: DEUK_AGENT_FLOW_OSS_REPO=https://github.com/joygram/DeukAgentFlow");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncOssTree();
}
