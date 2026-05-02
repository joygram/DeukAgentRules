---
version: 25
changelog: "v25: Add MCP knowledge quality gate and require reusable local findings to be promoted into DeukAgentContext."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 1. Boot Sequence (run once)

1. Read this file (AGENTS.md) → state version number **and confirm the file path you called `read_file` on this session**. If you cannot confirm you called `read_file` on this exact path, call it now and halt all other actions until done.
2. Read `PROJECT_RULE.md` in workspace root → list applicable DC-* rules.
3. Find or create active ticket (1-CALL RULE below) → call `set_workflow_context(project, ticket_id, phase)`.

### Ticket Discovery (1-CALL RULE)

| Situation | Action |
|-----------|--------|
| User mentions ticket ID/topic | Use directly. No search. |
| Mentioned ticket ID/topic does not match | Show the latest closed ticket plus current open/active tickets and ask the user to choose. In non-interactive mode, print those candidates and stop. |
| Resuming previous work | Ticket ID already known. No search. |
| New work | Create ticket immediately. No search. |
| Truly unknown | `npx deuk-agent-rule ticket next --path-only` → `view_file`. Done. |
| `ticket next` finds no active/open ticket | Read-only fallback: inspect recent git history (`git log --oneline -n 20`, then targeted `git show --stat`/docs as needed) and identify likely follow-up work. Create a new ticket only after that analysis, using the git-history evidence in `planLink`. |

**FORBIDDEN**: Multiple CLI calls to discover a ticket. `ticket list` during boot. `find`/`ls`/`grep` for ticket files.

## 2. Pre-Action Guards (before EVERY tool call)

| # | Check | IF YES → Action |
|---|-------|-----------------|
| G1 | No active ticket + about to WRITE? | **HARD BLOCK.** Create ticket first. Read-only tools are allowed. |
| G1.1 | About to edit product/source/config files while active ticket phase is < 2? | **HARD BLOCK.** Complete Phase 1, then move to Phase 2. Explicit user execution intent counts as approval unless G6-G8/F3/F5 applies. |
| G1.2 | About to execute code writes but `planLink` is missing, absent, or placeholder-only? | **HARD BLOCK.** Fill ticket + plan, then lint both before execute writes. |
| G2 | `set_workflow_context` not called? | Call now. |
| G3 | Target file has `@generated` / `DO NOT EDIT` / is in `dist/ Generated/ gen/ deukpack_out/`? | **DO NOT EDIT.** Modify the source. If unsure, check PROJECT_RULE.md mapping. 3 failed lookups → HALT. Applies to shell mutation too. |
| G4 | 3+ external files modified outside ticket's Target Module? | **STOP.** Create new ticket. |
| G5 | `ImportError` / `ModuleNotFoundError` on generated or dependency code? | Inspect package manager configs and codegen pipeline before fixing. No `cp`/`sed` path hacks. |
| G6 | User asks to inspect/list/map/compare/review candidates? | Exploration-only. Do not edit product code, official data, reports, templates, or config until user approves applying findings. |
| G7 | About to regenerate broad outputs or timestamps (`bench`, `reporter`, `build`, `codegen`, `sync`, `init`, docs generator)? | **HARD BLOCK unless in ticket scope and user-approved.** Prefer dry-run or `/tmp/` output. |
| G8 | About to expand an official baseline/catalog/expected list? | **HARD BLOCK.** Present draft first; require explicit approval before promotion. |

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command`.

> **`run_command` File-Mutation Clause**: shell mutations (`sed`, `awk`, `cp`, `mv`, `rm`, `echo >>`, `patch`, `tee`, `install`) obey all guards. Read-only commands (`cat`, `ls`, `grep`, `find`, `head`, `diff`) are exempt.

## 3. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Skip if context sufficient. IF search needed: MAX 2 MCP calls, prefer local reads, specific terms only. Treat placeholder/duplicate/stale-low-signal MCP results as a miss. | 2 searches or low-quality hits → stop searching and inspect local files. |
| 1: Ticket + Plan | Create or select the ticket → read arch rules → fill ticket-owned scope/APC in the user's prompt language → create/update distinct prose `planLink` problem analysis, hypotheses, rationale, strategy, and verification design with frontmatter, also in the prompt language. Ticket/plan docs are planning records, not code writes. | If the user asked only to plan, stop. If execution intent is explicit and Phase 1 is complete/linted, move to Phase 2. |
| 2: Execute | Implement per approved or explicit user-requested plan. Update checkboxes `[x]`. | — |
| 3: Verify | Run build/tests. Record issues. | — |
| 4: Close | Close ticket and file follow-ups if needed. Do not immediately archive a just-closed ticket; leave archiving to lazy cleanup or explicit archive work. | **NEVER skip close.** |

Phase 1 document boundary rule:
- Once a ticket's `planLink` and APC are complete and linted, do not keep rewriting ticket/plan prose to mirror phase progress or lifecycle state.
- Phase transitions, archive, and close actions are lifecycle events, not permission to reopen document boundaries.
- If the work scope changes materially after Phase 1, create a new ticket instead of mutating the old ticket/plan into a new contract.
- Corrections to factual mistakes in `planLink` are allowed only when they preserve the original scope; new requirements belong in a new ticket.

Plan-only mode: Do Phases 0–1 only. Defer code/config writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

### Exploration-Only Mode

If G6 matches:
- Allowed: read, inspect history, search docs, summarize, or write scratch notes under `.deuk-agent/docs/scratch/`.
- Forbidden without follow-up approval: source/templates/generated outputs, benchmark/report artifacts, package metadata, CI, official catalogs, expected matrices, compatibility contracts.
- Label results as `draft`, `candidate`, or `not yet official`.
- Do not convert findings into implementation in the same turn unless the user says to apply them.

### MCP Knowledge Quality Gate

Use DeukAgentContext as an advisory memory layer, not as a substitute for reading current code.

- Search narrowly. One query should name the project plus the concrete symbol, file, command, or failure mode.
- Stop after 2 MCP calls for the same question. Do not broaden repeatedly.
- Treat these as `[RAG-MISS]`: placeholder summaries, duplicated ticket/report chunks, stale archive-only hits, unrelated projects, or results that only say to `view_file` without a useful summary.
- After a miss or weak hit, switch to local code reads (`rg`, `sed`, tests, git history) and use the code as the source of truth.
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
| F2 | Delete without proof of non-use | Run `git blame`/`grep`/tests first. "Seems unnecessary" ≠ valid. |
| F3 | Infra code (bootstrap/transport/DB/routing) | Separate ticket + approval required. |
| F4 | 10+ lines deleted | Document each block's purpose in commit. |
| F5 | Shared interface changed | `grep` ALL references → update ALL in same ticket. Partial = **major violation**. |
| F6 | No tests for the feature | Do not refactor it. |

## 5. Emergency & Urgency Protocols

| Type | Condition | Action |
|------|-----------|--------|
| **Hotfix** | Need to temporarily modify `@generated` code due to build blockers or extreme urgency. | Call `ticket hotfix --reason "..."`. This bypasses Phase 1 guards and automatically creates a derivation ticket to fix the CodeGen source later. |
| **Urgency** | User uses emotional/urgent words ("ASAP", "ignore rules", "do it now"). | **NEVER ignore rules.** Acknowledge urgency, propose fastest legal path (e.g., Hotfix), and provide estimated time. No skipping phases. |

## 6. Docs, Artifacts & Platform

| Type | Path |
|------|------|
| Plans | `.deuk-agent/docs/plans/<ticket-id>-plan.md` |
| Reports | `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md` |
| Scratch | `.deuk-agent/docs/scratch/` (ephemeral) |

- ALL artifacts MUST be under `.deuk-agent/docs/` for RAG indexing.
- ALL plan/report files MUST have frontmatter (`summary`, `status`, `priority`, `tags`). Run `enrich_frontmatter` after creation.
- Ticket lifecycle commands (`ticket create`, `move`, `close`, `archive`) must auto-run `lint:md` against touched markdown artifacts before they exit successfully. If lint fails, roll back the lifecycle mutation and keep ticket/index state consistent.
- Manual `npx deuk-agent-rule lint:md` remains an audit command, not the primary enforcement path.
- Phase 1 is **ticket creation plus indexed planning evidence**. Do not create duplicate tickets just to restate the same plan; update the existing ticket/`planLink`.
- Ticket and `planLink` MUST NOT duplicate content:
  - Ticket owns identity, scope, constraints, APC boundary/contract, and lifecycle checklist.
  - `planLink` owns the agent's prose problem analysis, source observations, cause hypotheses, decision rationale, execution strategy, and verification design.
  - `planLink` MUST NOT contain progress checkboxes (`[ ]` or `[x]`). Progress checkboxes belong only in the ticket.
  - If a section would repeat the other artifact, replace it with a pointer instead of copying text.
- Ticket in Phase 1 is **not complete** unless its `planLink` file exists and contains substantive, non-placeholder analysis sections.
- Ticket/plan document edits after Phase 1 should be limited to factual corrections, verification outcomes, or lifecycle-finalization notes; they must not be used as a running worklog.
- Platform native paths (`brain/`, `.cursor/plans/`) are NOT indexed → copy to `.deuk-agent/docs/`.
- Platform features (planning, artifacts, KI) co-exist. NEVER disable them. Always call `set_workflow_context`.
- Run `npx deuk-agent-rule lint:md` after markdown edits. For Phase 1 completion, lint **both** ticket and `planLink` in one run.

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

NEVER manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
`ticket list` is for user-requested audits only, NOT for agent boot/discovery.
