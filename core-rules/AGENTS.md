---
version: 12
changelog: "v12: Restructured for LLM comprehension. IF-THEN patterns. Decision-point grouping."
---

# Agent Rules

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.

## 1. Boot Sequence (run once, sequential)

```
STEP 1 → Read this file (AGENTS.md)
STEP 2 → Read PROJECT_RULE.md in workspace root
STEP 3 → IF code changes needed AND no active ticket → create ticket
STEP 4 → IF MCP available → call set_workflow_context(project, ticket_id, phase)
STEP 5 → Begin work
```

## 2. Pre-Action Checks (before EVERY tool call)

```
CHECK 1: Do I have an active ticket?
  → IF NO + code changes needed → STOP. Create ticket first.
CHECK 2: Did I call set_workflow_context?
  → IF NO + MCP available → call now.
CHECK 3: Is the target file generated?
  → IF file has @generated / DO NOT EDIT marker → DO NOT EDIT. Modify the source instead.
  → IF file is in dist/ Generated/ gen/ deukpack_out/ → DO NOT EDIT.
  → IF unsure → check PROJECT_RULE.md mapping table → IF not listed → ASK USER.
  → NEVER explore repo with find/grep/ls to guess. 3 failed lookups → HALT.
CHECK 4: Is this file outside my ticket's Target Module?
  → IF 3+ external files already modified → STOP. Create new ticket.
```

## 3. Ticket Lifecycle (MANDATORY — never skip phases)

**Required fields for creation**: `summary` MUST be non-empty. CLI blocks if missing.

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Search via MCP `search_*` or local search. | Skip if context sufficient. |
| 1: Plan | Read arch rules → fill APC → `ticket create --summary "..."`. | **STOP. Wait for user approval.** |
| 2: Execute | Implement per approved plan. Update ticket checkboxes. | — |
| 3: Verify | Run build/tests. Record issues. | — |
| 4: Close | File follow-up tickets for unresolved issues. Archive. | — |

**Plan Mode** (no Execute/Write capability): Do Phases 0–1 only. Defer CLI/file writes as text in plan. On transition to Execute → run deferred commands → enter Phase 2 directly.

## 4. HALT Conditions (stop immediately if ANY is true)

| # | Condition | Action |
|---|-----------|--------|
| H1 | 2+ repeated errors on same task | Stop → rollback → file analysis ticket. |
| H2 | Scope exceeds ticket boundary | Stop → new ticket → context switch. |
| H3 | Infrastructure error encountered | No bypass (no config swap, no feature disable). Halt → root cause → report options to user → re-plan after approval. |
| H4 | 50%+ tasks are unregistered in ticket | Stop → update ticket or create new one. |
| H5 | Modifications span 2+ different modules | Stop → split into separate tickets. |

## 5. File Modification Guards

### 5a. Generated File Protection (DC-CODEGEN)
- Source files = only those marked "manually editable" in `PROJECT_RULE.md`.
- After editing source → ALWAYS run build (`npm run build` etc.) to propagate.
- NEVER edit source AND generated product in same change.
- Violation = silent regression on next build = **major protocol violation**.

### 5b. Refactor Safety
- **Delete?** → Prove unused first via `git blame`/`grep`/tests. "Seems unnecessary" = not valid.
- **Infra code?** (bootstrap, transport, DB, routing) → Excluded from refactor. Needs separate ticket + approval.
- **10+ lines deleted?** → Document each block's purpose in commit.
- **Shared state / interface changed?** → `grep` ALL references → update ALL in same ticket. Partial = **major violation**.
- **No tests for the feature?** → Do not refactor it.

## 6. Docs & Artifacts

| Type | Path |
|------|------|
| Plans | `.deuk-agent/docs/plans/<ticket-id>-plan.md` |
| Reports | `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md` |
| Scratch | `.deuk-agent/docs/scratch/` (ephemeral) |

- ALL artifacts MUST be under `.deuk-agent/docs/` for RAG indexing.
- Platform paths (`brain/`, `.cursor/plans/`) are NOT indexed → always copy to `.deuk-agent/docs/`.
- Run `npx deuk-agent-rule lint:md` after markdown edits.

## 7. Platform Co-existence

Platform features (planning, artifacts, KI) co-exist with ticket workflow. Neither overrides.

- Planning → use platform native + copy to `.deuk-agent/docs/plans/`.
- Artifacts → copy to `.deuk-agent/docs/` (platform paths not RAG-indexed).
- Always call `set_workflow_context` regardless of platform state.
- Use both @mention and ticket chaining (`prevTicket`/`nextTicket`).
- NEVER disable platform features to "comply" with these rules.

## 8. CLI Reference

| Action | Command |
|--------|---------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --summary "<text>" --non-interactive` |
| Activate | `npx deuk-agent-rule ticket use --topic <id> --non-interactive` |
| Close | `npx deuk-agent-rule ticket close --topic <id> --non-interactive` |
| Cancel | `npx deuk-agent-rule ticket close --topic <id> --status cancelled --non-interactive` |
| Advance | `npx deuk-agent-rule ticket move --topic <id> --next --non-interactive` |
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` |
| Fast nav | `npx deuk-agent-rule ticket use --latest --path-only` → `view_file` |

NEVER manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.

### Telemetry
- Per phase: `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic: `npx deuk-agent-rule telemetry sync`
- Skip if no Execute capability.
