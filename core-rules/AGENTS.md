---
version: 14
changelog: "v14: Added Hotfix protocol, Urgency response protocol, and strengthened Phase Write Guards."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 1. Boot Sequence (run once)

1. Read this file (AGENTS.md) → state version number.
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
| G2 | `set_workflow_context` not called? | Call now. |
| G3 | Target file has `@generated` / `DO NOT EDIT` / is in `dist/ Generated/ gen/ deukpack_out/`? | **DO NOT EDIT.** Modify the source. If unsure → check PROJECT_RULE.md mapping. 3 failed lookups → HALT. |
| G4 | 3+ external files modified outside ticket's Target Module? | **STOP.** Create new ticket. |

WRITE tools requiring active ticket: `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `run_command` (if modifying files).

## 3. Ticket Lifecycle (never skip phases)

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Skip if context sufficient. IF search needed: MAX 2 MCP calls, prefer local reads, specific terms only. | 2 searches → no result → stop searching. |
| 1: Plan | Read arch rules → fill APC → `ticket create --summary "..."` (summary MUST be non-empty). | **STOP. Wait for user approval.** |
| 2: Execute | Implement per approved plan. Update checkboxes `[x]`. | — |
| 3: Verify | Run build/tests. Record issues. | — |
| 4: Close | Close + archive ticket. File follow-ups if needed. | **NEVER skip.** |

Plan-only mode: Do Phases 0–1 only. Defer writes as text in plan. On transition to Execute → run deferred commands → Phase 2.

## 4. HALT Conditions + File Guards

| # | Condition | Action |
|---|-----------|--------|
| H1 | 2+ repeated errors on same task | Stop → rollback → file analysis ticket. |
| H2 | Scope exceeds ticket boundary | Stop → new ticket → context switch. |
| H3 | Infrastructure error | No bypass. Halt → root cause → report to user → re-plan. |
| H4 | 50%+ tasks unregistered in ticket | Stop → update ticket or create new one. |
| H5 | 2+ different modules modified | Stop → split into separate tickets. |
| F1 | Generated file edited directly (DC-CODEGEN) | **Major violation.** Edit source → run build to propagate. Never edit both. (Emergency: use `ticket hotfix`). |
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
- Platform native paths (`brain/`, `.cursor/plans/`) are NOT indexed → copy to `.deuk-agent/docs/`.
- Platform features (planning, artifacts, KI) co-exist. NEVER disable them. Always call `set_workflow_context`.
- Run `npx deuk-agent-rule lint:md` after markdown edits.

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
