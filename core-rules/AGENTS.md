---
version: 17
changelog: "v17: Add scope-expansion guards for exploration/candidate requests, generated report regeneration, and official baseline expansion."
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
| Resuming previous work | Ticket ID already known. No search. |
| New work | Create ticket immediately. No search. |
| Truly unknown | `npx deuk-agent-rule ticket next --path-only` → `view_file`. Done. |

**FORBIDDEN**: Multiple CLI calls to discover a ticket. `ticket list` during boot. `find`/`ls`/`grep` for ticket files.

## 2. Pre-Action Guards (before EVERY tool call)

| # | Check | IF YES → Action |
|---|-------|-----------------|
| G1 | No active ticket + about to WRITE? | **HARD BLOCK.** Create ticket first. Read-only tools (view_file, grep, list_dir, search_*) are allowed. |
| G1.1 | Active ticket exists, but phase is < 2 (Plan)? | **HARD BLOCK.** File modification is strictly FORBIDDEN in Phase 1. You MUST call `ticket move --next` and get user approval before writing code. |
| G1.2 | Ticket has `planLink`, but plan file missing OR still placeholder-only? | **HARD BLOCK.** Create/fill plan file first, then run `lint:md` for both ticket and plan before execute-phase writes. |
| G2 | `set_workflow_context` not called? | Call now. |
| G3 | Target file has `@generated` / `DO NOT EDIT` / is in `dist/ Generated/ gen/ deukpack_out/`? | **DO NOT EDIT.** Modify the source (template/IDL/generator). If unsure → check PROJECT_RULE.md mapping. 3 failed lookups → HALT. This applies equally to `sed`/`awk`/`patch` via `run_command`. |
| G4 | 3+ external files modified outside ticket's Target Module? | **STOP.** Create new ticket. |
| G5 | `ImportError` / `ModuleNotFoundError` on generated or dependency code? | **DO NOT immediately fix.** First inspect package manager configs (`pyproject.toml`, `package.json`, `Cargo.toml`) and codegen pipeline (`deukpack.pipeline.json`, templates). Only after understanding the dependency architecture may you propose a fix. `cp`/`sed` path hacks are a **major violation**. |
| G6 | User asks to "look into", "list", "map", "compare candidates", "review options", "뽑아보자", "매칭해보자", "검토", or "후보"? | Treat as **exploration-only**. Do not edit product code, official data models, benchmark matrices, generated reports, templates, or config unless the user explicitly asks to apply/implement after seeing the candidate result. Output findings in chat or scratch docs only. |
| G7 | About to run a command that regenerates broad outputs (`bench`, `reporter`, `build`, `codegen`, `sync`, `init`, docs generator) or changes timestamps/snapshots? | **HARD BLOCK unless explicitly in ticket scope and user-approved.** Prefer dry-run/read-only inspection. If needed for verification, write to `/tmp/` and do not touch tracked generated outputs. |
| G8 | About to expand an official baseline/catalog/expected list (competitors, protocols, support matrix, compatibility table, release contract, public API, test matrix)? | **HARD BLOCK.** First present the proposed list as a draft and get explicit approval for promotion from candidate/draft to official source. |

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command`.

> **`run_command` File-Mutation Clause**: Shell commands that modify files (`sed`, `awk`, `cp`, `mv`, `rm`, `echo >>`, `patch`, `tee`, `install`) are subject to ALL Pre-Action Guards (G1–G5) and File Guards (F1–F6). The fact that they run via terminal does NOT exempt them from guard checks. Read-only commands (`cat`, `ls`, `grep`, `find`, `head`, `diff`) are exempt.

## 3. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Skip if context sufficient. IF search needed: MAX 2 MCP calls, prefer local reads, specific terms only. | 2 searches → no result → stop searching. |
| 1: Plan | Read arch rules → fill APC in the user's prompt language → `ticket create --summary "..."` (summary MUST be non-empty and in the prompt language) → create `planLink` file with executable steps (not placeholders) and frontmatter, also in the prompt language. | **STOP. Wait for user approval.** |
| 2: Execute | Implement per approved plan. Update checkboxes `[x]`. | — |
| 3: Verify | Run build/tests. Record issues. | — |
| 4: Close | Close + archive ticket. File follow-ups if needed. | **NEVER skip.** |

Plan-only mode: Do Phases 0–1 only. Defer writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

### Exploration-Only Mode

If G6 matches, default to **Exploration-Only Mode**:
- Allowed: read files, inspect history, search docs, summarize options, create `.deuk-agent/docs/scratch/` notes if a file is needed.
- Forbidden without explicit follow-up approval: modifying source code, templates, generated outputs, benchmark/report artifacts, package metadata, CI, official catalogs, expected matrices, or compatibility contracts.
- The final answer must clearly label results as `draft`, `candidate`, or `not yet official`.
- Do not convert candidate findings into executable implementation tasks in the same turn unless the user explicitly says to apply them.

## 4. HALT Conditions + File Guards

| # | Condition | Action |
|---|-----------|--------|
| H1 | 2+ repeated errors on same task | Stop → rollback → file analysis ticket. |
| H2 | Scope exceeds ticket boundary | Stop → new ticket → context switch. |
| H3 | Infrastructure error | No bypass. Halt → root cause → report to user → re-plan. |
| H4 | 50%+ tasks unregistered in ticket | Stop → update ticket or create new one. |
| H5 | 2+ different modules modified | Stop → split into separate tickets. |
| F1 | Generated file edited directly (DC-CODEGEN) | **Major violation.** Edit source → run build to propagate. Never edit both. (Emergency: use `ticket hotfix`). |
| F1.1 | Generated/report artifacts (`benchmarks/reports/`, `coverage/`, snapshots, generated docs, changelogs, timestamped outputs) would change only because a generator was run | **Do not commit or leave these changes** unless the user explicitly requested artifact regeneration. Use `/tmp/` output for verification. |
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
- Ticket in Phase 1 is **not complete** unless its `planLink` file exists and contains executable, non-placeholder sections.
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
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` | 1 |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` | **0 during boot** |
| Telemetry | `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>` | 1 per phase |
| Tele sync | `npx deuk-agent-rule telemetry sync` | periodic |

NEVER manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
`ticket list` is for user-requested audits only, NOT for agent boot/discovery.
