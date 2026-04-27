import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");

/** Copy templates/ into bundle/ for npm packaging. */
const templateRoot = join(pkgRoot, "templates");
const agentsSrc = join(templateRoot, "AGENTS.md");
const agentsDest = join(pkgRoot, "bundle", "AGENTS.md");
const geminiSrc = join(templateRoot, "GEMINI.md");
const geminiDest = join(pkgRoot, "bundle", "GEMINI.md");

if (!existsSync(templateRoot)) {
  throw new Error("Missing template dir: " + templateRoot);
}
if (!existsSync(agentsSrc)) {
  throw new Error("Missing templates/AGENTS.md: " + agentsSrc);
}

const templatesSrc = join(templateRoot, "blueprints");
const templatesDest = join(pkgRoot, "bundle", "templates");
if (existsSync(templatesSrc)) {
  if (existsSync(templatesDest)) {
    rmSync(templatesDest, { recursive: true });
  }
  mkdirSync(templatesDest, { recursive: true });
  for (const name of readdirSync(templatesSrc)) {
    copyFileSync(join(templatesSrc, name), join(templatesDest, name));
  }
}

const dynamicRulesSrc = join(templateRoot, "rules.d");
const dynamicRulesDest = join(pkgRoot, "bundle", "rules.d");
if (existsSync(dynamicRulesSrc)) {
  if (existsSync(dynamicRulesDest)) {
    rmSync(dynamicRulesDest, { recursive: true });
  }
  mkdirSync(dynamicRulesDest, { recursive: true });
  for (const name of readdirSync(dynamicRulesSrc)) {
    copyFileSync(join(dynamicRulesSrc, name), join(dynamicRulesDest, name));
  }
}

const agentsBody = readFileSync(agentsSrc, "utf8");
writeFileSync(agentsDest, agentsBody, "utf8");
if (existsSync(geminiSrc)) copyFileSync(geminiSrc, geminiDest);
console.log("deuk-agent-rule: synced bundle from templates/.");
