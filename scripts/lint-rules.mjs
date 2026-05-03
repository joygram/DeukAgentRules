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
    code: "DR-TOKEN-06",
    message: "Silent-by-default must route routine progress conflicts through Instruction Priority.",
    test: (rules) => /another instruction requests routine progress updates/i.test(rules)
      && /use Instruction Priority/i.test(rules)
      && /shortest required update/i.test(rules)
      && /record the conflict in the ticket/i.test(rules)
  },
  {
    code: "DR-TOKEN-07",
    message: "Duplicate output directives must be applied once, not echoed per layer.",
    test: (rules) => /Duplicate directive rule/i.test(rules)
      && /apply the strictest instruction once/i.test(rules)
      && /Do not emit multiple acknowledgements, summaries, or ticket-start variants/i.test(rules)
  },
  {
    code: "DR-PRIORITY-01",
    message: "Rules must define pointer/core/project instruction precedence.",
    test: (rules) => /Instruction Priority/i.test(rules)
      && /Global DeukAgentRules pointer/i.test(rules)
      && /Locator only/i.test(rules)
      && /Local generated pointer\/spoke/i.test(rules)
      && /core-rules\/AGENTS\.md/i.test(rules)
  },
  {
    code: "DR-TICKET-01",
    message: "Main ticket must be the default planning SSoT.",
    test: (rules) => /main ticket is the default SSoT/i.test(rules)
  },
  {
    code: "DR-TICKET-02",
    message: "Issue and regression reports must stop for review before Phase 2 execution.",
    test: (rules) => /Issue-Review Gate/i.test(rules)
      && /reports a bug, regression, policy violation, surprising behavior/i.test(rules)
      && /Stop after the ticket-start line or a concise review-request final answer/i.test(rules)
      && /Approval must be after the ticket exists and the Phase 1 plan is reviewable/i.test(rules)
  },
  {
    code: "DR-TICKET-03",
    message: "Investigation clarifications must be ticket-first.",
    test: (rules) => /Before asking a clarification during an investigation/i.test(rules)
      && /confirmed facts, hypotheses, improvement direction, and unresolved question/i.test(rules)
      && /point the user to that ticket/i.test(rules)
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
  },
  {
    code: "DR-BYPASS-01",
    message: "Rules must block local workaround bypasses of project contracts.",
    test: (rules) => /Anti-Bypass Guard/i.test(rules)
      && /local workaround/i.test(rules)
      && /generated\/source ownership boundaries/i.test(rules)
      && /cross-language\/cross-runtime parity obligations/i.test(rules)
  },
  {
    code: "DR-SCOPE-01",
    message: "Rules must contain low-capability agents that cannot verify broad scope.",
    test: (rules) => /Scope Containment Guard/i.test(rules)
      && /Low-capability agents must not accept broad ownership/i.test(rules)
      && /stop\/split\/escalate/i.test(rules)
  },
  {
    code: "DR-VELOCITY-01",
    message: "Rules must treat high ticket velocity as a stabilization trigger.",
    test: (rules) => /Ticket Velocity Guard/i.test(rules)
      && /High ticket creation velocity is a failure signal/i.test(rules)
      && /no more symptom tickets/i.test(rules)
  },
  {
    code: "DR-STATE-01",
    message: "Rules must quarantine dirty or transition-state project baselines.",
    test: (rules) => /Current-State Quarantine/i.test(rules)
      && /dirty worktrees/i.test(rules)
      && /verify_failed/i.test(rules)
      && /unimplemented/i.test(rules)
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
