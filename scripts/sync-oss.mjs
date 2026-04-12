/**
 * Populates ../DeukAgentRulesOSS for the public GitHub repo.
 * Run: cd deuk-agent-rule && npm run sync:oss
 */
import { cpSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");
const repoRoot = join(pkgRoot, "..");
const ossRoot = join(repoRoot, "DeukAgentRulesOSS");
const ossPublic = join(pkgRoot, "oss-public");

/** Set DEUK_AGENT_RULES_OSS_REPO to override, e.g. https://github.com/you/DeukAgentRulesOSS */
const OSS_REPO =
  process.env.DEUK_AGENT_RULES_OSS_REPO || "https://github.com/joygram/DeukAgentRules";

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

mkdirSync(join(ossRoot, "scripts"), { recursive: true });
mkdirSync(join(ossRoot, "publish"), { recursive: true });

cpSync(join(pkgRoot, "publish"), join(ossRoot, "publish"), { recursive: true, force: true });
if (existsSync(join(pkgRoot, ".github"))) {
  cpSync(join(pkgRoot, ".github"), join(ossRoot, ".github"), { recursive: true, force: true });
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
if (existsSync(join(pkgRoot, "package-lock.json"))) {
  cpSync(join(pkgRoot, "package-lock.json"), join(ossRoot, "package-lock.json"), { force: true });
}
if (existsSync(join(pkgRoot, "LICENSE"))) {
  cpSync(join(pkgRoot, "LICENSE"), join(ossRoot, "LICENSE"), { force: true });
}
if (existsSync(join(pkgRoot, ".npmrc"))) {
  cpSync(join(pkgRoot, ".npmrc"), join(ossRoot, ".npmrc"), { force: true });
}
if (existsSync(join(pkgRoot, ".versionrc.cjs"))) {
  cpSync(join(pkgRoot, ".versionrc.cjs"), join(ossRoot, ".versionrc.cjs"), { force: true });
  stripOssVersionrcScripts(join(ossRoot, ".versionrc.cjs"));
}
const changelogTemplates = join(pkgRoot, "changelog-templates");
if (existsSync(changelogTemplates)) {
  cpSync(changelogTemplates, join(ossRoot, "changelog-templates"), { recursive: true, force: true });
}
cpSync(join(ossPublic, "RELEASING.md"), join(ossRoot, "RELEASING.md"), { force: true });
cpSync(join(ossPublic, "RELEASING.ko.md"), join(ossRoot, "RELEASING.ko.md"), { force: true });
cpSync(join(ossPublic, "GITHUB_DESCRIPTION.md"), join(ossRoot, "GITHUB_DESCRIPTION.md"), {
  force: true,
});

const srcPkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
const outPkg = {
  ...srcPkg,
  license: srcPkg.license || "Apache-2.0",
  repository: {
    type: "git",
    url: gitUrl,
  },
  bugs: {
    url: base.startsWith("http") ? base + "/issues" : base,
  },
  homepage: base.startsWith("http") ? base + "#readme" : base,
  files: [
    "LICENSE",
    "bundle/**/*",
    "scripts/**/*.mjs",
    "README.md",
    "README.ko.md",
    "CHANGELOG.md",
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
/** Mirror is not a publish/version source: no bump scripts or release devDependencies. */
for (const k of ["bump", "bump:patch", "bump:minor", "bump:major"]) {
  if (outPkg.scripts && outPkg.scripts[k]) {
    const { [k]: _drop, ...rest } = outPkg.scripts;
    outPkg.scripts = rest;
  }
}
delete outPkg.devDependencies;

writeFileSync(join(ossRoot, "package.json"), JSON.stringify(outPkg, null, 2) + "\n", "utf8");

const ossPolish = join(ossRoot, "scripts", "changelog-polish.mjs");
if (existsSync(ossPolish)) {
  unlinkSync(ossPolish);
}

console.log("deuk-agent-rule: synced OSS tree at " + ossRoot);
console.log("  Override repo URL: DEUK_AGENT_RULES_OSS_REPO=https://github.com/org/DeukAgentRulesOSS");
