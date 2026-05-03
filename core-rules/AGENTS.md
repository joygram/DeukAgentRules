---
version: 36
changelog: "v36: Refactor rule flow, ticket record boundaries, and MCP RAG decision order."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 0. Low-Token Operating Mode

- Silent-by-default is mandatory. Do not print progress while reading, searching, patching, moving phases, or verifying. Do not emit commentary progress updates, interim summaries, or "what I will do next" narration unless the user explicitly asked for live narration or a blocker/user decision must be surfaced.
- Screen output is allowed only for final answers, user decisions, blockers, destructive-risk confirmation, or command results the user explicitly asked to see.
- Exception: after selecting, resuming, or creating the active ticket, print exactly one concise ticket-start line before further work. The ticket id/title portion must be a clickable markdown link to the ticket file path. That line is not a progress update and it must be the only pre-work commentary. If the user asked to move to the next ticket, show only the clickable ticket file link or clickable ticket-start line and wait for approval; do not add explanation.
- Do not print status beacons such as `phase=<n> action=<verb> reason=<short>` during normal work.
- If a rule requires a lifecycle record, write it to the ticket/CLI state; do not also narrate it on screen.
- If higher-level collaboration guidance requests frequent updates, treat it as subordinate to this silent-by-default rule unless the user explicitly requests progress commentary.
- Do not restate already-read files, ticket bodies, or plan prose unless a factual correction is needed.
- Keep chat summaries very short. Prefer outcome plus ticket link; do not reproduce the plan, investigation, or verification narrative in chat.
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
3. Find or create active ticket (1-CALL RULE below) → call `set_workflow_context(project, ticket_id, phase)` → print the mandatory one-line ticket-start announcement as a clickable markdown link to the ticket file. If approval is still pending, stop after the link/announcement.

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

## 2. Pre-Action Guards (before EVERY tool call)

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

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command`.

> **`run_command` File-Mutation Clause**: shell mutations (`sed`, `awk`, `cp`, `mv`, `rm`, `echo >>`, `patch`, `tee`, `install`) obey all guards. Do not use shell text mutation when `apply_patch` is available.
> **Search Clause**: use `rg`/`rg --files` first for repository search. Do not use `grep`/`find` unless `rg` is unavailable; if unavailable and installation is possible, ask the user to install `ripgrep` or install it through the approved package path.

## 3. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Inspect local source-of-truth files first. Use MCP RAG only when history, prior decisions, or unfamiliar cross-module context would change the plan. Record weak/miss results in the ticket when they affect confidence. | 2 MCP calls for the same question or low-quality hits → stop searching and use local files as truth. |
| 1: Ticket + Plan | Create or select the ticket → read arch rules → fill ticket-owned scope/APC, investigation evidence, and compact plan in the user's prompt language. Keep the main ticket as the only Phase 1 planning record. | For issue/regression reports, stop after Phase 1 and wait for user review approval. For direct execution requests, move to Phase 2 only after the Phase 1 plan is complete/linted and the approval is post-plan or unambiguous. |
| 2: Execute | Implement per approved post-review plan. Update checkboxes `[x]`. | Do not stop after writes; continue to Phase 3 unless verification is explicitly deferred or blocked. |
| 3: Verify | Run the smallest relevant build/tests/lint gate for the changed surface. Record the durable verification entry in the ticket; chat gets only a short outcome and ticket pointer. User did not explicitly ask for tests is **not** a valid skip reason after execute writes. | Verification may stop only on pass, recorded failure, explicit user deferral, or recorded environment blocker. |
| 4: Close | Close ticket and file follow-ups if needed. Do not immediately archive a just-closed ticket; leave archiving to lazy cleanup or explicit archive work. | **NEVER skip close.** |

Phase 1 document boundary rule:
- The main ticket is the default SSoT for scope, APC, investigation evidence, compact planning, linked issues, and verification outcomes.
- Sub tickets infer their relationship to the main ticket from the numbered ticket ID. Do not add inline master links just to identify the parent; keep the main ticket as the planning SSoT.
- Once a ticket's compact plan and APC are complete and linted, do not keep rewriting ticket prose to mirror phase progress or lifecycle state.
- Phase transitions, archive, and close actions are lifecycle events, not permission to reopen document boundaries.
- If the work scope changes materially after Phase 1, create/link a child ticket instead of mutating the old ticket into a new contract.
- Corrections to factual mistakes in the ticket plan are allowed only when they preserve the original scope; new requirements belong in a linked ticket.

Durable ticket record rule:
- Investigation records must include the finding, root cause or hypothesis, affected files/symbols, and planned fix direction when the work produces reusable knowledge.
- Verification records must include the command/check, observed result, key pass/fail signal, and follow-up direction when the result implies more work.
- RAG records must state which MCP query/tool was used, whether it was hit/weak-hit/miss/stale, and how it changed or did not change the plan.
- Chat must stay compact after the ticket has the durable record: summarize the outcome and point to the ticket instead of duplicating details.

Plan-only mode: Do Phases 0–1 only. Defer code/config writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

### Issue-Review Gate

If the user reports a bug, regression, policy violation, surprising behavior, or asks "why did this happen?", treat it as review-gated even when the prompt includes words like "fix", "resolve", or "해결".
- Create or select the ticket and complete Phase 1 with root-cause hypotheses, scope, APC, and the proposed patch plan.
- Stop after the ticket-start line or a concise review-request final answer. Do not move to Phase 2, edit product/source/config files, or close the ticket until the user approves the Phase 1 plan.
- Approval must be after the ticket exists and the Phase 1 plan is reviewable. Pre-ticket issue wording is not enough to bypass review.

### Exploration-Only Mode

If G6 matches:
- Allowed: read, inspect history, search docs, summarize, or write temporary notes under `.deuk-agent/docs/plan/` (for draft or report docs; archive when lifecycle ends).
- Forbidden without follow-up approval: source/templates/generated outputs, benchmark/report artifacts, package metadata, CI, official catalogs, expected matrices, compatibility contracts.
- Label results as `draft`, `candidate`, or `not yet official`.
- Do not convert findings into implementation in the same turn unless the user says to apply them.

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
- Main ticket MUST NOT duplicate screen progress. It owns identity, scope, constraints, APC, investigation evidence, compact plan, linked issues, lifecycle checklist, and verification outcome.
- Ticket in Phase 1 is **not complete** unless its APC and compact plan sections contain substantive, non-placeholder content.
- `ticket create` seeds a compact draft plan, but draft scaffolds are not complete. Use `npx deuk-agent-rule ticket create --require-filled` when you need creation to fail unless ticket APC and compact plan content are already substantive.
- Investigation, issue, regression, root-cause, and bug tickets should be created in strict Phase 1 mode by default; if the command path does not infer that automatically, pass `--require-filled` explicitly.
- Ticket document edits after Phase 1 should be limited to factual corrections, linked issue records, verification outcomes, or lifecycle-finalization notes; they must not be used as a running worklog.
- Investigation, RAG, and verification records follow the Durable ticket record rule above; do not leave those details in chat-only output.
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
- `rules audit` MUST fail if core rules reintroduce progress beacons, non-`rg` search defaults, post-execute verification optionality, or verbose duplicate-output policies.
- In compact mode, rule audits print only `rules:audit ok` or `rules:audit failed <count>`.
