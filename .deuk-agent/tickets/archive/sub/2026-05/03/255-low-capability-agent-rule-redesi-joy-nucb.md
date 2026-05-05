---
id: 255-low-capability-agent-rule-redesi-joy-nucb
title: 255-low-capability-agent-rule-redesi-joy-nucb
phase: 4
status: closed
docsLanguage: en
summary: DeukPack guardrail analysis review and improvement preparation
priority: P2
tags:
  - rules
  - guardrails
  - deukpack
  - planning
createdAt: 2026-05-03 22:25:47
---


# 255-low-capability-agent-rule-redesi-joy-nucb

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** DeukAgentRules core rule hub/rule-audit tests plus project-level guardrail rollout design for DeukPack, including anti-bypass controls, low-capability-agent scope containment, and defenses for DeukPack's current unstable BMT/protocol state.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/lint-rules.mjs`, `scripts/tests/ArchitectureGuard.test.mjs`, the supplied DeukPack guardrail analysis note, DeukPack `PROJECT_RULE.md`, DeukPack current worktree status, and active Java BMT tickets 405/406.
- **Constraints:** No DeukPack source/config/report edits from this ticket unless a DeukPack-local ticket is opened and approved. Do not hardcode DeukPack-specific protocol matrices into the generic DeukAgentRules hub. Preserve the hub-spoke SSoT: domain-specific DeukPack rules should live in the DeukPack project rule surface, with DeukAgentRules carrying only reusable process guards. Any local workaround that bypasses project-wide rules must be treated as a suspected violation and requires root-cause review before execution. Low-capability agents must be prevented from accepting broad ownership they cannot verify end-to-end. Current DeukPack dirty worktree state must be treated as in-flight user/project work; do not normalize, revert, regenerate, or overwrite it as part of this ticket.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules after approval in this repo: `core-rules/AGENTS.md`, `scripts/lint-rules.mjs`, focused tests under `scripts/tests/`, docs/plan artifacts if needed, and this ticket.
- Editable modules after separate DeukPack approval: DeukPack project rule surface, architecture guard tests, metadata/static validation scripts, and compact domain rule docs.
- Forbidden modules in this ticket: DeukPack source/config/report edits without a DeukPack-local ticket, generated artifacts, distributed spokes except through the normal `init` source path, unrelated CLI behavior, package metadata.
- Rule citation: `PROJECT_RULE.md` Hub-Spoke SSoT, DC-CODEGEN, DC-LEGACY, DC-OSS; `core-rules/AGENTS.md` Phase 1 review gate and machine-returnable audit requirement.

### [CONTRACT]
- Input: supplied `/home/joy/.gemini/antigravity/brain/20527f57-ac13-42ce-9b84-85482e13ec54/deukpack_guardrail_analysis.md`, current core rules, current audit tests, and local rule history.
- Output for this Phase 1: reviewable improvement plan that separates DeukPack-owned build-time/project-level gates from DeukAgentRules-owned generic agent guards.
- Output after approval: minimal generic rule hardening plus machine-returnable audit checks in DeukAgentRules, and a DeukPack project-level implementation ticket/plan if selected.
- Side effects: ticket updates and scoped rule/test changes only.

### [PATCH PLAN]
- DeukAgentRules layer: add a generic "Domain Complexity / Ticket Velocity Guard" to `core-rules/AGENTS.md`, not a DeukPack-specific protocol matrix.
- DeukAgentRules layer: add rules-audit checks in `scripts/lint-rules.mjs` so the new guard remains machine-returnable.
- DeukAgentRules layer: add/adjust focused tests only if needed to cover the audit behavior.
- DeukAgentRules layer: add an "Anti-Bypass Guard" requiring agents to prove that a proposed local fix does not skip broader project rules, shared interfaces, generated-source boundaries, or parity obligations.
- DeukAgentRules layer: add "Scope Containment / Escalation Guard" language for agents that are treating symptoms, expanding beyond local evidence, or attempting to own cross-module/cross-language work without full verification capability.
- DeukPack project layer: prepare a separate local rollout covering architecture tests, static template/metadata validation, lint gates, compact project rules, ticket velocity policy, local-workaround detection, low-capability-agent task slicing, and current BMT/protocol stabilization.

## Compact Plan

- **Problem:** The supplied analysis identifies repeated low-capability-agent failure loops in DeukPack: protocol/language parity is documented but not build-time enforced, protocol method spelling is distributed, rule compliance is manual, high ticket velocity creates symptom tickets instead of forcing root-cause consolidation, agents repeatedly ignore global/project rules by applying narrow local workarounds, and low-capability agents focus on symptom defense while taking responsibility for scopes they cannot fully understand or verify.
- **Source Observations:** Local DeukAgentRules already enforces silent workflow, Phase 1 review gates, post-execute verification, and `rules audit`. Prior archived work moved DeukPack domain rules out of the generic hub, so hardcoding `G-DP*` into `core-rules/AGENTS.md` would conflict with the hub-spoke boundary. DeukPack `PROJECT_RULE.md` already states Dumb View EJS, `SerializationOrchestrator`, `CODEGEN_CONSTANTS`, provider parity, generated/source mappings, and `npm run build` plus `npx deukpack build` sync after runtime changes.
- **Current DeukPack Special Situation:** The DeukPack worktree is dirty in project/rule/ticket state plus `scripts/bmt/java-codegen-evidence-adapter.js` and `scripts/bmt/language-manifest.js`. Active tickets 405/406 show Java BMT is being split from generic preflight failure into supported-family `verify_failed` (`DpPack`, `DpJson`) and unsupported-family `unimplemented` (`XTBinary`, `XTCompact`, `XTJson`, `XPb`, `DpYaml`, `DpZero`). This is a transition state, not a stable green baseline.
- **RAG Evidence:** `search_rules("DeukAgentRules low capability agent guardrails ticket velocity rule audit machine-returnable rules audit")` returned weak generic hits; `search_tickets("low capability agent rule redesign ticket velocity DeukPack guardrail analysis")` returned zero results. Local source and the supplied analysis are the planning source of truth.
- **Cause Hypotheses:** The durable fix is split-layer. DeukPack needs build-time architecture tests that fail before generated/provider drift lands. DeukAgentRules needs generic escalation rules for high ticket velocity, repeated same-module failures, domain-complexity edits without project-owned static gates, local patches that appear to solve one symptom while bypassing the broader contract, and agent self-scope limits when evidence/verification capacity is insufficient.
- **Improvement Direction:** Prepare six connected workstreams. Workstream 1 in DeukAgentRules: generic rule language plus audit checks for ticket velocity/root-cause consolidation/escalation. Workstream 2 in DeukPack: parity/metadata/template/ESLint build gates and compact domain rules. Workstream 3 at project-operation level: define when DeukPack work must escalate from symptom tickets to a project-level stabilization ticket, how cross-language ownership is declared, and which CI gates must pass before ticket close. Workstream 4: anti-bypass enforcement that blocks narrow patches unless the ticket records affected global/project rules, parity impact, and why the change is not a shortcut around the intended architecture. Workstream 5: low-capability-agent containment that forces stop/split/escalate when the agent is only defending a visible symptom, cannot load the relevant rule set, cannot enumerate affected modules, or cannot run the required verification matrix. Workstream 6: current-state quarantine for DeukPack Java/BMT/protocol changes so new agents do not treat transition artifacts as a stable baseline or erase in-flight work.
- **Project-Level Improvement Draft:** DeukPack should get a project-owned `PROJECT_RULE.md` or `.deuk-agent/domain-rules/` section for protocol parity, generated/source boundaries, static gate commands, ticket velocity limits, low-capability-agent escalation, local-workaround prohibition, scope containment, and current-state quarantine. The project should also add build/CI checks for protocol provider parity, language metadata completeness, EJS branching bans, `as any` bans in codegen plugins, cross-language roundtrip coverage, and suspicious bypass patterns such as hardcoded protocol spelling, language-only exceptions, generated-file patches, skipped shared registry updates, or test narrowing that hides unsupported combinations. Ticket close should require the project-level guard command bundle, not only per-file tests.
- **Low-Capability Containment Draft:** If an agent cannot state the source-of-truth rule, affected module set, parity surface, and verification command bundle, it must not implement. It should write the confirmed symptom/evidence into the ticket, reduce the task to a bounded diagnostic or single-module patch, or escalate to a higher-capability review. Repeated symptom-only fixes in the same area should automatically convert the work into a stabilization ticket with no further local patches until root cause and guard coverage are approved.
- **DeukPack Current-State Defense Draft:** Before any DeukPack code change, require a worktree hygiene snapshot, active ticket read, and classification of current BMT rows as `passed`, `verify_failed`, `unimplemented`, or `blocked` without collapsing them. Agents must not "fix" Java by marking unsupported protocols as pass, hiding unsupported rows, editing generated outputs, deleting dirty ticket/rule changes, or broad-regenerating BMT reports unless the active DeukPack stabilization ticket explicitly authorizes it. Java `DpPack`/`DpJson` verify failures and unsupported-family splits should remain separate work lanes.
- **Implementation Decision Needed:** Approve whether this ticket should proceed with Workstream 1 in DeukAgentRules and create/prepare Workstream 2-3 as a DeukPack-local project improvement ticket.
- **Verification:** For Workstream 1, run `node --test scripts/tests/lint-rules.test.mjs`, `npx deuk-agent-rule rules audit --compact`, and focused markdown lint on `core-rules/AGENTS.md` plus this ticket. For Workstream 2-3, DeukPack should define and run its own guard bundle, expected to include architecture tests, lint/static checks, and cross-language roundtrip or parity checks.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute approved DeukAgentRules generic guard changes inside APC boundary.
- [x] Prepare approved DeukPack project-level improvement ticket/plan.
- [x] Record verification outcome.

## Verification Outcome

- **Check:** `node --test scripts/tests/lint-rules.test.mjs`
- **Result:** pass. The rules audit test covers the new machine-returnable checks for anti-bypass, scope containment, ticket velocity, and current-state quarantine.
- **Check:** `npx deuk-agent-rule rules audit --compact`
- **Result:** pass, `rules:audit ok`.
- **Check:** `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/255-low-capability-agent-rule-redesi-joy-nucb.md .deuk-agent/docs/archive/2026-05/255-deukpack-project-guardrail-rollout.md`
- **Result:** pass for all 3 markdown files.
- **Check:** `git diff --check`
- **Result:** pass.
- **Additional Check:** `node --test scripts/tests/*.test.mjs`
- **Result:** fail due pre-existing `DR-03` architecture guard findings in `scripts/sync-oss.mjs` hardcoded `.deuk-agent` paths. This ticket did not modify `scripts/sync-oss.mjs`; focused gates for the changed rule/audit surface passed.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
## Merged Legacy Document

### 255 deukpack project guardrail rollout

# DeukPack Project Guardrail Rollout

## Current Special Situation

DeukPack is not in a stable baseline state. The worktree currently has in-flight project rule, ticket/index, and Java BMT adapter changes. Active Java tickets separate supported-family `verify_failed` rows from unsupported-family `unimplemented` rows:

- Supported-family lane: `DpPack`, `DpJson` remain Java `verify_failed`.
- Unsupported-family lane: `XTBinary`, `XTCompact`, `XTJson`, `XPb`, `DpYaml`, `DpZero` remain `unimplemented`.
- These categories must not be collapsed, hidden, or promoted to pass by local workaround.

## Project-Level Defense

Add a DeukPack-local rule section under `PROJECT_RULE.md` or `.deuk-agent/domain-rules/` with these guards:

- Current-State Quarantine: snapshot dirty worktree and active ticket before code changes.
- BMT Status Discipline: preserve `passed`, `verify_failed`, `unimplemented`, and `blocked` as distinct states.
- Low-Capability Containment: stop/split/escalate if the agent cannot state rule source, affected module set, parity surface, and verification bundle.
- Anti-Bypass: forbid local patches that skip metadata/registry/provider parity, generated/source boundaries, or required matrix checks.
- Ticket Velocity: repeated symptom tickets in one failure family convert to a stabilization ticket.

## Static Gates To Add In DeukPack

- Protocol provider parity test across codegen-time languages.
- Language metadata completeness check for protocol method spellings.
- EJS Dumb View static check that rejects protocol/type branching in templates.
- Codegen plugin lint gate for `as any` and unsafe protocol shortcuts.
- BMT guard that fails if unsupported rows are hidden, relabeled as pass, or merged into generic failure.
- Cross-language generated roundtrip or compile/roundtrip capability gate, with unsupported lanes explicit.

## Java BMT Stabilization Lane

- Keep Java `DpPack`/`DpJson` verification separate from unsupported protocol-family work.
- Do not broaden Java unsupported protocols into this lane until a provider/runtime implementation ticket exists.
- Do not broad-regenerate official BMT reports unless the active stabilization ticket authorizes it.
- Close only when the Java lane records the exact harness failure, the fix path, and the smallest verification command bundle.

## Completion Criteria

- DeukPack has a local project rule update for current-state quarantine, anti-bypass, low-capability containment, and BMT status discipline.
- DeukPack has machine-returnable static/CI checks for the highest-risk bypass patterns.
- Future low-capability-agent work on BMT/protocol surfaces stops at diagnostics unless it can prove parity impact and run the required guard bundle.
