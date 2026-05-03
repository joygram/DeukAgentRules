import { existsSync, readFileSync } from "fs";
import { join } from "path";

const RULE_CHECKS = [
  {
    code: "DR-TOKEN-01",
    message: "Low-Token mode must be silent-by-default.",
    test: (rules) => /Silent-by-default is mandatory/i.test(rules)
  },
  {
    code: "DR-TOKEN-02",
    message: "Progress status beacons must be forbidden.",
    test: (rules) => /Do not print status beacons/i.test(rules) && /phase=<n> action=<verb> reason=<short>/i.test(rules)
  },
  {
    code: "DR-TOKEN-03",
    message: "Screen output must be limited to final/decision/blocker/explicit command-result cases.",
    test: (rules) => /Screen output is allowed only for final answers, user decisions, blockers, destructive-risk confirmation, or command results/i.test(rules)
  },
  {
    code: "DR-TOKEN-04",
    message: "Rules must state that tool output has input-token cost.",
    test: (rules) => /Treat tool output as input-token cost/i.test(rules)
  },
  {
    code: "DR-TOKEN-05",
    message: "Boot sequence must not require routine version/DC rule screen output.",
    test: (rules) => /internally note the version number/i.test(rules)
      && /internally identify applicable DC-\* rules/i.test(rules)
      && !/state version number/i.test(rules)
      && !/list applicable DC-\* rules/i.test(rules)
  },
  {
    code: "DR-TICKET-01",
    message: "Main ticket must be the default planning SSoT.",
    test: (rules) => /main ticket is the default SSoT/i.test(rules)
  },
  {
    code: "DR-TICKET-02",
    message: "planLink must be opt-in only, not a default requirement.",
    test: (rules) => /Optional `planLink` is opt-in only/i.test(rules) && !/planLink` file exists and contains substantive/i.test(rules)
  },
  {
    code: "DR-SEARCH-01",
    message: "Repository search must be rg-first.",
    test: (rules) => /use `rg`\/`rg --files` first/i.test(rules)
  },
  {
    code: "DR-VERIFY-01",
    message: "Post-execute verification must be mandatory unless explicitly deferred or blocked.",
    test: (rules) => /without Phase 3 verification recorded/i.test(rules) && /User did not explicitly ask for tests is \*\*not\*\* a valid skip reason/i.test(rules)
  },
  {
    code: "DR-RETURN-01",
    message: "Rule violations must be machine-returnable through CLI audits.",
    test: (rules) => /Rule violations must be machine-returnable/i.test(rules) && /rules audit/i.test(rules)
  }
];

export function auditRules(cwd = process.cwd()) {
  const rulesPath = join(cwd, "core-rules", "AGENTS.md");
  if (!existsSync(rulesPath)) {
    return {
      ok: false,
      path: rulesPath,
      violations: [{ code: "DR-RULES-00", message: "core-rules/AGENTS.md not found" }]
    };
  }

  const rules = readFileSync(rulesPath, "utf8");
  const violations = RULE_CHECKS
    .filter((check) => !check.test(rules))
    .map(({ code, message }) => ({ code, message }));

  return { ok: violations.length === 0, path: rulesPath, violations };
}

export function runRulesAudit(opts = {}) {
  const result = auditRules(opts.cwd || process.cwd());
  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (opts.compact) {
    console.log(result.ok ? "rules:audit ok" : `rules:audit failed ${result.violations.length}`);
  } else if (result.ok) {
    console.log("rules:audit ok");
  } else {
    console.error("rules:audit failed");
    for (const violation of result.violations) {
      console.error(`${violation.code}: ${violation.message}`);
    }
  }

  if (!result.ok) {
    throw new Error(`rules audit failed: ${result.violations.map((v) => v.code).join(", ")}`);
  }

  return result;
}
