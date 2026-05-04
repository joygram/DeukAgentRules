---
version: 39
changelog: "v39: Add instruction precedence and collapse duplicate pointer-message handling."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 0. Instruction Priority

| Layer | Role | Handling |
|-------|------|----------|
| Runtime system/developer/user instructions | Highest platform authority | Follow when directly conflicting. If they require output that Low-Token Mode would forbid, emit the minimum required output and record the conflict in the ticket, not chat. |
| Global DeukAgentRules pointer | Locator only | Use only to find local `AGENTS.md` or `.deuk-agent/`. It must not restate TDW, RAG, or silence policy. |
| Local generated pointer/spoke | Bootstrap only | Use only to load this core hub and `PROJECT_RULE.md`. It must not duplicate this rule body. |
| `core-rules/AGENTS.md` | DeukAgentRules SSoT | After loaded, this file owns workflow, output, ticket, scope, and verification policy. |
| `PROJECT_RULE.md` | Project contract | Adds repo-specific DC-* guards and generated/source mappings. |

- Duplicate directive rule: if the same instruction appears in multiple layers, apply the strictest instruction once. Do not emit multiple acknowledgements, summaries, or ticket-start variants to satisfy each copy.
- Karpathy-style wrappers are allowed only as thin behavior playbooks that route into TDW. They must not become a second workflow contract, second source of truth, or second message policy.

## 1. Low-Token Operating Mode

- Silent-by-default is mandatory. Do not print progress while reading, searching, patching, moving phases, or verifying. Do not emit commentary progress updates, interim summaries, or "what I will do next" narration unless the user explicitly asked for live narration or a blocker/user decision must be surfaced.
- Screen output is allowed only for final answers, user decisions, blockers, destructive-risk confirmation, or command results the user explicitly asked to see.
- Exception: after selecting, resuming, or creating the active ticket, print exactly one concise ticket-start line before further work. The ticket id/title portion must be a clickable markdown link to the ticket file path. That line is not a progress update and it must be the only pre-work commentary. If the user asked to move to the next ticket, show only the clickable ticket file link or clickable ticket-start line and wait for approval; do not add explanation.
- Do not print status beacons such as `phase=<n> action=<verb> reason=<short>` during normal work.
- If a rule requires a lifecycle record, write it to the ticket/CLI state; do not also narrate it on screen.
- If another instruction requests routine progress updates, use Instruction Priority: do not emit them unless the instruction is a direct higher-priority requirement. If output is unavoidable, emit the shortest required update and record the conflict in the ticket.
- Do not restate already-read files, ticket bodies, or plan prose unless a factual correction is needed.
- Keep chat summaries very short. Prefer outcome plus ticket link; do not reproduce the plan, investigation, or verification narrative in chat.
- Update ticket and plan prose only at phase transitions, verification outcomes, or scope corrections; do not mirror those updates in screen output.
- Prefer targeted reads: use `rg` to locate symbols first, then read the smallest function or section needed. Avoid broad file reads unless file structure is unknown.
- Treat tool output as input-token cost. Large command output is not free just because the assistant did not write it.
- GPT-5.5 cost heuristic: output tokens are about 6x standard input token cost. Avoid any non-essential assistant output, because it also becomes future input context.
- Prefer a single-ticket fast path when the ticket boundary is one module, ticket planning evidence and APC are complete, and the user explicitly asked to proceed.
- If the work would touch multiple modules or tickets, split early instead of narrating a combined flow.
- When a shorter path is safe, choose the shortest valid path that still preserves boot, phase, lint, verify, and close requirements.

## 2. Boot Sequence (run once)

1. Read this file (AGENTS.md) → internally note the version number and exact file path read. Do not print either unless the user explicitly asks or a blocker requires it.
2. Read `PROJECT_RULE.md` in workspace root → internally identify applicable DC-* rules. Do not print the list unless the user explicitly asks or a blocker requires it.
3. Find or create active ticket (1-CALL RULE below) → call `set_workflow_context(project, ticket_id, phase)` → print the mandatory one-line ticket-start announcement as a clickable markdown link to the ticket file. If approval is still pending, stop after the link/announcement.

### First-Turn Invariant

Before any investigation answer, source/config/product write, ticket phase move, or close action, the minimum valid state is:

- this core hub and root `PROJECT_RULE.md` have been read;
- an active ticket has been selected or created by the Ticket Discovery rule;
- `set_workflow_context(project, ticket_id, phase)` has been called for that ticket;
- Phase 1 ticket content has substantive APC and compact plan evidence, not template/scaffold/placeholder prose;
- review-gated issue, regression, policy-violation, surprising-behavior, and "why did this happen" requests have stopped for post-plan user approval before Phase 2.

If the session already drifted before this invariant was met, use recovery mode: stop execution, create or select the investigation ticket, record confirmed facts/hypotheses/improvement direction/open questions in that ticket, call `set_workflow_context`, answer compactly with the ticket pointer, and wait for approval before writes, phase moves, or close.

### Ticket Discovery (1-CALL RULE)

| Situation | Action |
|-----------|--------|
| User mentions ticket ID/topic | Use directly. No search. |
| Mentioned ticket ID/topic does not match | Show the latest closed ticket plus current open/active tickets and ask the user to choose. In non-interactive mode, print those candidates and stop. |
| Resuming previous work | Ticket ID already known. No search. |
| User reports an issue/regression or asks to investigate why something happened | Create ticket immediately, fill Phase 1 review evidence, print the ticket-start line, then stop for review approval before Phase 2. |
| New execution work with explicit post-review approval | Create ticket immediately. No search. |
| Truly unknown | `npx deuk-agent-rule ticket next --path-only` → `view_file`. Done. |
| `ticket next` finds no active/open ticket | Read-only fallback: inspect recent git history (`git log --oneline -n 20`, then targeted `git show --stat`/docs as needed) and identify likely follow-up work. Create a new ticket only after that analysis, using the git-history evidence in the ticket plan section. |

**FORBIDDEN**: Multiple CLI calls to discover a ticket. `ticket list` during boot. `find`/`ls`/`grep` for ticket files.

## 3. Pre-Action Guards (before EVERY tool call)

| # | Check | IF YES → Action |
|---|-------|-----------------|
| G1 | No active ticket + about to WRITE? | **HARD BLOCK.** Create ticket first. Read-only tools are allowed. |
| G1.1 | About to edit product/source/config files while active ticket phase is < 2? | **HARD BLOCK.** Complete Phase 1, then move to Phase 2 only after review approval. Explicit execution intent counts as approval only when it is given after the Phase 1 ticket plan has been created or reviewed, unless G6-G8/F3/F5 applies. |
| G1.2 | About to execute code writes but ticket planning evidence or APC is missing/placeholder-only? | **HARD BLOCK.** Fill the main ticket plan/APC, then lint before execute writes. |
| G1.3 | About to finish after Phase 2 code/config/product writes without Phase 3 verification recorded? | **HARD BLOCK.** Run the smallest relevant build/test/lint gate and record the result. Only skip if the user explicitly deferred verification, the task was plan/exploration-only, or an environment blocker is recorded. |
| G2 | `set_workflow_context` not called? | Call now. |
| G3 | Target file has `@generated` / `DO NOT EDIT` / is in `dist/ Generated/ gen/ deukpack_out/`? | **DO NOT EDIT.** Modify the source. If unsure, check PROJECT_RULE.md mapping. 3 failed lookups → HALT. Applies to shell mutation too. |
| G4 | 3+ external files modified outside ticket's Target Module? | **STOP.** Create new ticket. |
| G5 | `ImportError` / `ModuleNotFoundError` on generated or dependency code? | Inspect package manager configs and codegen pipeline before fixing. No `cp`/`sed` path hacks. |
| G6 | User asks to inspect/list/map/compare/review candidates? | Exploration-only. Do not edit product code, official data, reports, templates, or config until user approves applying findings. |
| G7 | About to regenerate broad outputs or timestamps (`bench`, `reporter`, `build`, `codegen`, `sync`, `init`, docs generator)? | **HARD BLOCK unless in ticket scope and user-approved.** Prefer dry-run or `/tmp/` output. |
| G8 | About to expand an official baseline/catalog/expected list? | **HARD BLOCK.** Present draft first; require explicit approval before promotion. |
| G9 | Proposed patch is a local workaround that skips a project rule, generated/source boundary, shared registry, parity surface, or required verification matrix? | **HARD BLOCK.** Record the suspected bypass, root cause hypothesis, affected contract, and non-bypass fix path in the ticket before execution. |
| G10 | Agent cannot state the source-of-truth rule, affected module set, parity/interface surface, and verification command bundle for the intended scope? | **Scope Containment Guard.** Stop implementation; reduce to bounded diagnostics/single-module work or escalate to a stabilization ticket. |

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command`.

> **`run_command` File-Mutation Clause**: shell mutations (`sed`, `awk`, `cp`, `mv`, `rm`, `echo >>`, `patch`, `tee`, `install`) obey all guards. Do not use shell text mutation when `apply_patch` is available.
> **Search Clause**: use `rg`/`rg --files` first for repository search. Do not use `grep`/`find` unless `rg` is unavailable; if unavailable and installation is possible, ask the user to install `ripgrep` or install it through the approved package path.

## 4. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Inspect local source-of-truth files first. Use MCP RAG only when history, prior decisions, or unfamiliar cross-module context would change the plan. Record weak/miss results in the ticket when they affect confidence. | 2 MCP calls for the same question or low-quality hits → stop searching and use local files as truth. |
| 1: Ticket + Plan | Create or select the ticket → read arch rules → fill the main ticket with scope/APC, investigation evidence, and compact plan in the user's prompt language. | For issue/regression reports, stop after Phase 1 and wait for user review approval. For direct execution requests, move to Phase 2 only after the Phase 1 record is complete/linted and the approval is post-plan or unambiguous. |
| 2: Execute | Implement per approved post-review plan. Update checkboxes `[x]`. | Do not stop after writes; continue to Phase 3 unless verification is explicitly deferred or blocked. |
| 3: Verify | Run the smallest relevant build/tests/lint gate for the changed surface. Record the durable verification entry in the ticket; chat gets only a short outcome and ticket pointer. User did not explicitly ask for tests is **not** a valid skip reason after execute writes. | Verification may stop only on pass, recorded failure, explicit user deferral, or recorded environment blocker. |
| 4: Close | Close ticket and file follow-ups if needed. Do not immediately archive a just-closed ticket; leave archiving to lazy cleanup or explicit archive work. | **NEVER skip close.** |

Phase 1 document boundary rule:
- The main ticket is the default SSoT for scope, APC, investigation evidence, compact planning, linked issues, and verification outcomes.
- Keep the main ticket as the only Phase 1 planning record; sub tickets infer their relationship from the numbered ticket ID.
- Once the Phase 1 record is complete, do not use ticket prose as a running worklog.
- If scope changes materially after Phase 1, create/link a child ticket instead of mutating the old contract.

Durable ticket record rule:
- Investigation records must include the finding, root cause or hypothesis, affected files/symbols, and planned fix direction when the work produces reusable knowledge.
- Recorded-Claim Integrity: do not say "recorded in the ticket" unless the same ticket contains same-topic investigation evidence for that claim. Prefer CLI claim checks/reports over manual chat claims.
- Before asking a clarification during an investigation, regression, quality issue, or root-cause task, first write the current confirmed facts, hypotheses, improvement direction, and unresolved question into the active ticket. Then point the user to that ticket and ask only the unresolved question.
- Verification records must include the command/check, observed result, key pass/fail signal, and follow-up direction when the result implies more work.
- RAG records must state query quality and whether they changed the plan. Chat should stay compact after the durable record exists.

Plan-only mode: Do Phases 0–1 only. Defer code/config writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

### Issue-Review Gate

If the user reports a bug, regression, policy violation, surprising behavior, or asks "why did this happen?", treat it as review-gated even when the prompt includes words like "fix", "resolve", or "해결".
- Complete the main-ticket Phase 1 record, including `Problem Analysis`, `Source Observations`, `Cause Hypotheses`, `Improvement Direction`, and `Open Questions` when uncertainty remains.
- Stop after the ticket-start line or a concise review-request final answer. Do not move to Phase 2 or close the ticket until the user approves the Phase 1 plan.
- Approval must be post-ticket and post-plan.

### Exploration-Only Mode

If G6 matches:
- Allowed: read, inspect history, search docs, summarize, or write temporary notes under `.deuk-agent/docs/plan/` (for draft or report docs; archive when lifecycle ends).
- Forbidden without follow-up approval: source/templates/generated outputs, benchmark/report artifacts, package metadata, CI, official catalogs, expected matrices, compatibility contracts.
- Label results as `draft`, `candidate`, or `not yet official`.
- Do not convert findings into implementation in the same turn unless the user says to apply them.

### Anti-Bypass Guard

Local symptom fixes are suspect when they make one failing slice pass while ignoring the broader project contract. Before implementing a local workaround, the ticket must prove that the change does not bypass:

- the active project rules and architecture source of truth;
- generated/source ownership boundaries;
- shared interfaces, registries, metadata, catalogs, or provider matrices;
- cross-language/cross-runtime parity obligations;
- required verification matrices or CI gates;
- unsupported cases by relabeling, hiding rows, narrowing tests, or converting failures into passes/blocked states.

If that proof is missing, do not patch. Convert the work to root-cause review or stabilization scope.

### Scope Containment Guard

Low-capability agents must not accept broad ownership they cannot verify end-to-end. If the agent is defending a visible symptom, cannot load the relevant rule set, cannot enumerate affected modules, or cannot run the required verification matrix, it must stop/split/escalate instead of continuing. The allowed next step is one of:

- record confirmed facts and hypotheses in the active ticket;
- reduce scope to a bounded diagnostic or single-module patch with explicit non-bypass proof;
- create or switch to a project-level stabilization ticket;
- ask for higher-capability review when parity, architecture, or current-state ownership is unclear.

### MCP RAG Decision Ladder

Use DeukAgentContext as advisory memory for prior decisions and cross-session context. Current source code, local docs, tests, and CLI ticket state remain the source of truth.
- Start local: read the current file, project rules, active ticket, and targeted git history before asking RAG to decide the plan.
- Use MCP RAG when local evidence is insufficient, the task crosses old decisions, the user asks for deep historical analysis, or prior tickets/rules may contain reusable context.
- Pick the narrowest tool: `search_code` for implementation symbols, `search_rules` for rule/policy context, `search_tickets` for prior ticket outcomes, and `synthesize_knowledge` only when the question spans multiple collections.
- Search narrowly. One query should name the project plus a concrete symbol, file, command, rule id, or failure mode.
- Stop after 2 MCP calls for the same question. Do not broaden repeatedly.
- Treat these as `[RAG-MISS]`: placeholder summaries, duplicated ticket/report chunks, stale archive-only hits, unrelated projects, or results that only say to `view_file` without a useful summary.
- After a miss or weak hit, switch back to local reads and record the miss only if it changed confidence or the plan.
- If local analysis produces reusable knowledge after a miss, call `add_knowledge` once with project, source path, current status, and applicability.
- If an indexed document is wrong or stale, call `refresh_document` instead of adding a competing fragment.
- Do not use MCP for ticket navigation. Ticket lookup is a direct CLI operation, not semantic search.

## 5. HALT Conditions + File Guards

| # | Condition | Action |
|---|-----------|--------|
| H1 | 2+ repeated errors on same task | Stop → rollback → file analysis ticket. |
| H2 | Scope exceeds ticket boundary | Stop → new ticket → context switch. |
| H3 | Infrastructure error | No bypass. Halt → root cause → report to user → re-plan. |
| H4 | 50%+ tasks unregistered in ticket | Stop → update ticket or create new one. |
| H5 | 2+ different modules modified | Stop → split into separate tickets. |
| H6 | 3+ tickets created in one session or same area without closing the root cause | Stop → Ticket Velocity Guard. Create/continue one stabilization ticket; no more symptom tickets. |
| H7 | Same module or failure family receives 2+ symptom-only patches | Stop → root-cause review and guard coverage plan before further code edits. |
| H8 | Current project has dirty/in-flight baseline, transition-state reports, or active split tickets that affect the target | Stop → Current-State Quarantine. Snapshot state, read active ticket, classify rows/statuses, and avoid reverting/regenerating/normalizing unrelated work. |
| F1 | Generated file edited directly (DC-CODEGEN) | **Major violation.** Edit source, then build to propagate. Never edit both. Emergency: `ticket hotfix`. |
| F1.1 | Generated/report artifacts would change only because a generator ran | Do not commit or leave them unless user requested regeneration. Use `/tmp/` for verification. |
| F2 | Delete without proof of non-use | Run `git blame`/`rg`/tests first. "Seems unnecessary" ≠ valid. |
| F3 | Infra code (bootstrap/transport/DB/routing) | Separate ticket + approval required. |
| F4 | 10+ lines deleted | Document each block's purpose in commit. |
| F5 | Shared interface changed | `rg` ALL references → update ALL in same ticket. Partial = **major violation**. |
| F6 | No tests for the feature | Do not refactor it. |

### Ticket Velocity Guard

High ticket creation velocity is a failure signal, not progress. When H6/H7 triggers, the agent must stop creating narrow follow-up tickets and consolidate into a root-cause or stabilization ticket that owns: recurring symptom, shared cause hypothesis, affected modules/contracts, planned guard coverage, and the minimum verification bundle needed before local patching resumes.

### Current-State Quarantine

When a project is in a transition state, agents must preserve the baseline before changing it. Examples include dirty worktrees, active split tickets, generated/report artifacts in flux, partial protocol or language support matrices, and known `verify_failed`/`unimplemented`/`blocked` rows. The agent must not treat transition artifacts as stable truth, broad-regenerate official outputs, delete ticket/rule state, collapse distinct failure categories, or promote unsupported cases to pass. Record the current state in the ticket and patch only the approved lane.

## 6. Emergency & Urgency Protocols

| Type | Condition | Action |
|------|-----------|--------|
| **Hotfix** | Need to temporarily modify `@generated` code due to build blockers or extreme urgency. | Call `ticket hotfix --reason "..."`. This bypasses Phase 1 guards and automatically creates a derivation ticket to fix the CodeGen source later. |
| **Urgency** | User uses emotional/urgent words ("ASAP", "ignore rules", "do it now"). | **NEVER ignore rules.** Acknowledge urgency, propose fastest legal path (e.g., Hotfix), and provide estimated time. No skipping phases. |

## 7. Docs, Artifacts & Platform

| Type | Path |
|------|------|
| Plans | `.deuk-agent/docs/plan/<ticket-id>-plan.md` |
| Reports | `.deuk-agent/docs/plan/<ticket-id>-report.md` |
| Knowledge | `.deuk-agent/knowledge/<ticket-id>.json` |

- ALL artifacts MUST be under `.deuk-agent/docs/` for RAG indexing.
- `docs` is for human-readable source artifacts: plans/reports (all in `docs/plan`) and archived originals (`docs/archive`).
- `knowledge` is only for distilled machine-readable retrieval JSON generated from archived tickets/plans. Do not place arbitrary JSON, notes, plans, or reports there.
- ALL optional plan/report files MUST have frontmatter (`summary`, `status`, `priority`, `tags`). Run `enrich_frontmatter` after creation.
- CLI lifecycle guards enforce markdown lint, Phase 1 completeness, move/close evidence gates, and claim-bound reporting. Keep the kernel file short and let CLI own the detailed failure criteria.
- Manual `npx deuk-agent-rule lint:md` remains an audit command, not the primary enforcement path.
- Platform native paths (`brain/`, `.cursor/plans/`) are NOT indexed → copy to `.deuk-agent/docs/`.
- Platform features (planning, artifacts, KI) co-exist. NEVER disable them. Always call `set_workflow_context`.
- Run `npx deuk-agent-rule lint:md` after markdown edits. For Phase 1 completion, lint the ticket and any optional linked plan/report in one run.

## 8. CLI Reference

| Action | Command | Max calls |
|--------|---------|----------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --summary "<text>" --non-interactive` | 1 per task |
| Claim evidence | `npx deuk-agent-rule ticket evidence --topic <id> --claim "<claim>" --non-interactive` | before saying "recorded in ticket" |
| Claim report | `npx deuk-agent-rule ticket report --topic <id> --claim "<claim>" --non-interactive` | when final report must be derived from ticket content |
| Fast nav | `npx deuk-agent-rule ticket next --path-only` → `view_file` | 1 per boot |
| Activate | `npx deuk-agent-rule ticket use --topic <id> --non-interactive` | 1 |
| Advance | `npx deuk-agent-rule ticket move --topic <id> --next --non-interactive` | 1 per phase |
| Close | `npx deuk-agent-rule ticket close --topic <id> --non-interactive` | 1 |
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` | Lazy cleanup or explicit archive work only |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` | **0 during boot** |
| Telemetry | `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>` | 1 per phase |
| Tele sync | `npx deuk-agent-rule telemetry sync` | periodic |
| Rule audit | `npx deuk-agent-rule rules audit --compact` | before release / init sync |

NEVER manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
`ticket list` is for user-requested audits only, NOT for agent boot/discovery.

## 9. Auditable Rule Returns

- Rule violations must be machine-returnable. Prefer CLI guards that exit non-zero with stable codes over prose-only reminders.
- `rules audit` MUST fail if core rules reintroduce progress beacons, non-`rg` search defaults, post-execute verification optionality, verbose duplicate-output policies, or removes anti-bypass/scope-containment/ticket-velocity/current-state quarantine guards.
- `rules audit` MUST fail if the First-Turn Invariant, drift recovery path, issue-review post-plan approval requirement, or Phase 1→2 compact-plan enforcement is removed.
- In compact mode, rule audits print only `rules:audit ok` or `rules:audit failed <count>`.
