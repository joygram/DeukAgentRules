---
version: 29
changelog: "v29: Require a one-line ticket-start announcement after ticket selection or creation."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 0. Low-Token Operating Mode

- Silent-by-default is mandatory. Do not print progress while reading, searching, patching, moving phases, or verifying.
- Silent-by-default overrides habitual status narration. Do not emit commentary progress updates unless the user explicitly asked for live narration or a blocker/user decision must be surfaced.
- Screen output is allowed only for final answers, user decisions, blockers, destructive-risk confirmation, or command results the user explicitly asked to see.
- Exception: after selecting, resuming, or creating the active ticket, print exactly one concise ticket-start line before further work: `Ticket: <id> — <title or summary>`. This identifies the work item; it is not a progress log.
- Do not print status beacons such as `phase=<n> action=<verb> reason=<short>` during normal work.
- If a rule requires a lifecycle record, write the minimum durable record to the ticket/CLI state; do not also narrate it on screen.
- If higher-level collaboration guidance requests frequent updates, treat it as subordinate to this silent-by-default rule unless the user explicitly requests progress commentary.
- Do not restate already-read files, ticket bodies, or plan prose unless a factual correction is needed.
- Do not duplicate plan/ticket content in commentary. Say the artifact path only if the user needs to open it.
- Update ticket and plan prose only at phase transitions, verification outcomes, or scope corrections; do not mirror those updates in screen output.
- Prefer targeted reads: use `rg` to locate symbols first, then read the smallest function or section needed. Avoid broad file reads unless file structure is unknown.
- Treat tool output as input-token cost. Large command output is not free just because the assistant did not write it.
- GPT-5.5 cost heuristic: output tokens are about 6x standard input token cost. Avoid any non-essential assistant output, because it also becomes future input context.
- Prefer a single-ticket fast path when the ticket boundary is one module, ticket planning evidence and APC are complete, and the user explicitly asked to proceed.
- If the work would touch multiple modules or tickets, split early instead of narrating a combined flow.
- When a shorter path is safe, choose the shortest valid path that still preserves boot, phase, lint, verify, and close requirements.

## 1. Boot Sequence (run once)

1. Read this file (AGENTS.md) → internally note the version number and exact file path read. Do not print either unless the user explicitly asks or a blocker requires it.
2. Read `PROJECT_RULE.md` in workspace root → internally identify applicable DC-* rules. Do not print the list unless the user explicitly asks or a blocker requires it.
3. Find or create active ticket (1-CALL RULE below) → call `set_workflow_context(project, ticket_id, phase)` → print the mandatory one-line ticket-start announcement.

### Ticket Discovery (1-CALL RULE)

| Situation | Action |
|-----------|--------|
| User mentions ticket ID/topic | Use directly. No search. |
| Mentioned ticket ID/topic does not match | Show the latest closed ticket plus current open/active tickets and ask the user to choose. In non-interactive mode, print those candidates and stop. |
| Resuming previous work | Ticket ID already known. No search. |
| New work | Create ticket immediately. No search. |
| Truly unknown | `npx deuk-agent-rule ticket next --path-only` → `view_file`. Done. |
| `ticket next` finds no active/open ticket | Read-only fallback: inspect recent git history (`git log --oneline -n 20`, then targeted `git show --stat`/docs as needed) and identify likely follow-up work. Create a new ticket only after that analysis, using the git-history evidence in the ticket plan section. |

**FORBIDDEN**: Multiple CLI calls to discover a ticket. `ticket list` during boot. `find`/`ls`/`grep` for ticket files.

## 2. Pre-Action Guards (before EVERY tool call)

| # | Check | IF YES → Action |
|---|-------|-----------------|
| G1 | No active ticket + about to WRITE? | **HARD BLOCK.** Create ticket first. Read-only tools are allowed. |
| G1.1 | About to edit product/source/config files while active ticket phase is < 2? | **HARD BLOCK.** Complete Phase 1, then move to Phase 2. Explicit user execution intent counts as approval unless G6-G8/F3/F5 applies. |
| G1.2 | About to execute code writes but ticket planning evidence or APC is missing/placeholder-only? | **HARD BLOCK.** Fill the main ticket plan/APC, then lint before execute writes. |
| G1.3 | About to finish after Phase 2 code/config/product writes without Phase 3 verification recorded? | **HARD BLOCK.** Run the smallest relevant build/test/lint gate and record the result. Only skip if the user explicitly deferred verification, the task was plan/exploration-only, or an environment blocker is recorded. |
| G2 | `set_workflow_context` not called? | Call now. |
| G3 | Target file has `@generated` / `DO NOT EDIT` / is in `dist/ Generated/ gen/ deukpack_out/`? | **DO NOT EDIT.** Modify the source. If unsure, check PROJECT_RULE.md mapping. 3 failed lookups → HALT. Applies to shell mutation too. |
| G4 | 3+ external files modified outside ticket's Target Module? | **STOP.** Create new ticket. |
| G5 | `ImportError` / `ModuleNotFoundError` on generated or dependency code? | Inspect package manager configs and codegen pipeline before fixing. No `cp`/`sed` path hacks. |
| G6 | User asks to inspect/list/map/compare/review candidates? | Exploration-only. Do not edit product code, official data, reports, templates, or config until user approves applying findings. |
| G7 | About to regenerate broad outputs or timestamps (`bench`, `reporter`, `build`, `codegen`, `sync`, `init`, docs generator)? | **HARD BLOCK unless in ticket scope and user-approved.** Prefer dry-run or `/tmp/` output. |
| G8 | About to expand an official baseline/catalog/expected list? | **HARD BLOCK.** Present draft first; require explicit approval before promotion. |

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command`.

> **`run_command` File-Mutation Clause**: shell mutations (`sed`, `awk`, `cp`, `mv`, `rm`, `echo >>`, `patch`, `tee`, `install`) obey all guards. Do not use shell text mutation when `apply_patch` is available.
> **Search Clause**: use `rg`/`rg --files` first for repository search. Do not use `grep`/`find` unless `rg` is unavailable; if unavailable and installation is possible, ask the user to install `ripgrep` or install it through the approved package path.

## 3. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Skip if context sufficient. IF search needed: MAX 2 MCP calls, prefer local reads, specific terms only. Treat placeholder/duplicate/stale-low-signal MCP results as a miss. | 2 searches or low-quality hits → stop searching and inspect local files. |
| 1: Ticket + Plan | Create or select the ticket → read arch rules → fill ticket-owned scope/APC and compact plan sections in the user's prompt language. Use an external `planLink` only for large/multi-module design that cannot fit compactly in the main ticket. | If the user asked only to plan, stop. If execution intent is explicit and Phase 1 is complete/linted, move to Phase 2. |
| 2: Execute | Implement per approved or explicit user-requested plan. Update checkboxes `[x]`. | Do not stop after writes; continue to Phase 3 unless verification is explicitly deferred or blocked. |
| 3: Verify | Run the smallest relevant build/tests/lint gate for the changed surface. Record pass/fail/blocker evidence in the ticket. User did not explicitly ask for tests is **not** a valid skip reason after execute writes. | Verification may stop only on pass, recorded failure, explicit user deferral, or recorded environment blocker. |
| 4: Close | Close ticket and file follow-ups if needed. Do not immediately archive a just-closed ticket; leave archiving to lazy cleanup or explicit archive work. | **NEVER skip close.** |

Phase 1 document boundary rule:
- The main ticket is the default SSoT for scope, APC, compact planning, linked issues, and verification outcomes.
- Once a ticket's compact plan and APC are complete and linted, do not keep rewriting ticket prose to mirror phase progress or lifecycle state.
- Phase transitions, archive, and close actions are lifecycle events, not permission to reopen document boundaries.
- If the work scope changes materially after Phase 1, create/link a child ticket instead of mutating the old ticket into a new contract.
- Corrections to factual mistakes in the ticket plan are allowed only when they preserve the original scope; new requirements belong in a linked ticket.

Plan-only mode: Do Phases 0–1 only. Defer code/config writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

### Exploration-Only Mode

If G6 matches:
- Allowed: read, inspect history, search docs, summarize, or write temporary notes under `.deuk-agent/docs/plan/` (for draft or report docs; archive when lifecycle ends).
- Forbidden without follow-up approval: source/templates/generated outputs, benchmark/report artifacts, package metadata, CI, official catalogs, expected matrices, compatibility contracts.
- Label results as `draft`, `candidate`, or `not yet official`.
- Do not convert findings into implementation in the same turn unless the user says to apply them.

### MCP Knowledge Quality Gate

Use DeukAgentContext as an advisory memory layer, not as a substitute for reading current code.
Treat it as online-only advisory memory; do not rely on offline mirrors or cached snapshots as the source of truth.

- Search narrowly. One query should name the project plus the concrete symbol, file, command, or failure mode.
- Stop after 2 MCP calls for the same question. Do not broaden repeatedly.
- Treat these as `[RAG-MISS]`: placeholder summaries, duplicated ticket/report chunks, stale archive-only hits, unrelated projects, or results that only say to `view_file` without a useful summary.
- After a miss or weak hit, switch to local code reads (`rg`, focused file views, tests, git history) and use the code as the source of truth.
- If local analysis produces reusable knowledge, call `add_knowledge` once with a concise fact that includes project, source path, current code status, and the condition under which it applies.
- If an existing indexed doc is wrong or stale, call `refresh_document` instead of adding a competing fragment.
- Do not use MCP for ticket navigation. Ticket lookup is CLI state, not semantic search.

## 4. HALT Conditions + File Guards

| # | Condition | Action |
|---|-----------|--------|
| H1 | 2+ repeated errors on same task | Stop → rollback → file analysis ticket. |
| H2 | Scope exceeds ticket boundary | Stop → new ticket → context switch. |
| H3 | Infrastructure error | No bypass. Halt → root cause → report to user → re-plan. |
| H4 | 50%+ tasks unregistered in ticket | Stop → update ticket or create new one. |
| H5 | 2+ different modules modified | Stop → split into separate tickets. |
| F1 | Generated file edited directly (DC-CODEGEN) | **Major violation.** Edit source, then build to propagate. Never edit both. Emergency: `ticket hotfix`. |
| F1.1 | Generated/report artifacts would change only because a generator ran | Do not commit or leave them unless user requested regeneration. Use `/tmp/` for verification. |
| F2 | Delete without proof of non-use | Run `git blame`/`rg`/tests first. "Seems unnecessary" ≠ valid. |
| F3 | Infra code (bootstrap/transport/DB/routing) | Separate ticket + approval required. |
| F4 | 10+ lines deleted | Document each block's purpose in commit. |
| F5 | Shared interface changed | `rg` ALL references → update ALL in same ticket. Partial = **major violation**. |
| F6 | No tests for the feature | Do not refactor it. |

## 5. Emergency & Urgency Protocols

| Type | Condition | Action |
|------|-----------|--------|
| **Hotfix** | Need to temporarily modify `@generated` code due to build blockers or extreme urgency. | Call `ticket hotfix --reason "..."`. This bypasses Phase 1 guards and automatically creates a derivation ticket to fix the CodeGen source later. |
| **Urgency** | User uses emotional/urgent words ("ASAP", "ignore rules", "do it now"). | **NEVER ignore rules.** Acknowledge urgency, propose fastest legal path (e.g., Hotfix), and provide estimated time. No skipping phases. |

## 6. Docs, Artifacts & Platform

| Type | Path |
|------|------|
| Plans | `.deuk-agent/docs/plan/<ticket-id>-plan.md` |
| Reports | `.deuk-agent/docs/plan/<ticket-id>-report.md` |
| Scratch | (deprecated; use docs/plan for temporary docs and archive for lifecycle end) |
| Knowledge | `.deuk-agent/knowledge/<ticket-id>.json` |

- ALL artifacts MUST be under `.deuk-agent/docs/` for RAG indexing.
- `docs` is for human-readable source artifacts: plans/reports (all in `docs/plan`) and archived originals (`docs/archive`).
- `knowledge` is only for distilled machine-readable retrieval JSON generated from archived tickets/plans. Do not place arbitrary JSON, notes, plans, or reports there.
- ALL optional plan/report files MUST have frontmatter (`summary`, `status`, `priority`, `tags`). Run `enrich_frontmatter` after creation.
- Ticket lifecycle commands (`ticket create`, `move`, `close`, `archive`) must auto-run `lint:md` against touched markdown artifacts before they exit successfully. If lint fails, roll back the lifecycle mutation and keep ticket/index state consistent.
- Manual `npx deuk-agent-rule lint:md` remains an audit command, not the primary enforcement path.
- Phase 1 is **ticket creation plus indexed planning evidence in the main ticket**. Do not create duplicate tickets just to restate the same plan; update the existing ticket's compact plan.
- Optional `planLink` is opt-in only. Use it for large design records, not routine work.
- Main ticket MUST NOT duplicate screen progress. It owns identity, scope, constraints, APC, compact plan, linked issues, lifecycle checklist, and verification outcome.
- Ticket in Phase 1 is **not complete** unless its APC and compact plan sections contain substantive, non-placeholder content.
- `ticket create` seeds a compact draft plan, but draft scaffolds are not complete. Use `npx deuk-agent-rule ticket create --require-filled` when you need creation to fail unless ticket APC and compact plan content are already substantive.
- Ticket document edits after Phase 1 should be limited to factual corrections, linked issue records, verification outcomes, or lifecycle-finalization notes; they must not be used as a running worklog.
- Platform native paths (`brain/`, `.cursor/plans/`) are NOT indexed → copy to `.deuk-agent/docs/`.
- Platform features (planning, artifacts, KI) co-exist. NEVER disable them. Always call `set_workflow_context`.
- Run `npx deuk-agent-rule lint:md` after markdown edits. For Phase 1 completion, lint the ticket and any optional linked plan/report in one run.

## 7. CLI Reference

| Action | Command | Max calls |
|--------|---------|----------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --summary "<text>" --non-interactive` | 1 per task |
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

## 8. Auditable Rule Returns

- Rule violations must be machine-returnable. Prefer CLI guards that exit non-zero with stable codes over prose-only reminders.
- `rules audit` MUST fail if core rules reintroduce progress beacons, default `planLink` requirements, non-`rg` search defaults, post-execute verification optionality, or verbose duplicate-output policies.
- In compact mode, rule audits print only `rules:audit ok` or `rules:audit failed <count>`.
