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
STEP 3 → Find or create active ticket (1-CALL RULE below)
STEP 4 → IF MCP available → call set_workflow_context(project, ticket_id, phase)
STEP 5 → Begin work
```

### Ticket Discovery (1-CALL RULE)
```
IF user mentions a ticket ID or topic → use it directly. No search needed.
IF resuming previous work → ticket ID is already known. No search needed.
IF new work → create ticket immediately. No search needed.
IF truly unknown → run EXACTLY ONE command:
  npx deuk-agent-rule ticket use --latest --path-only
  → IF returns a path → view_file that path. Done.
  → IF fails → create a new ticket. Done.

FORBIDDEN:
  - Running ticket list then ticket use then find (loop pattern)
  - More than 1 CLI call to discover a ticket
  - Using find/ls/grep to locate ticket files
  - Calling ticket list "just to see what's there"
```

## 2. Pre-Action Checks (before EVERY tool call)

```
CHECK 1: Do I have an active ticket?
  → IF NO → am I about to call a WRITE tool? (see list below)
    → IF YES → HARD BLOCK. Do NOT proceed. Create ticket FIRST.
    → Read-only tools (view_file, grep_search, list_dir, search_*) are allowed without ticket.
  → WRITE tools that REQUIRE an active ticket:
    - write_to_file / replace_file_content / multi_replace_file_content
    - run_command (if command modifies files: git commit, sed, mv, rm, npm run build, etc.)
    - Any tool that creates, modifies, or deletes files

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

> **WHY THIS EXISTS**: Agents frequently skip ticket creation "to save time" and proceed
> directly to code edits. This makes work untrackable and violates the Ticket-Driven Workflow.
> There are ZERO exceptions to CHECK 1 for write operations.


## 3. Ticket Lifecycle (MANDATORY — never skip phases)

**Required fields for creation**: `summary` MUST be non-empty. CLI blocks if missing.

| Phase | What to do | STOP condition |
|-------|-----------|----------------|
| 0: Research | Check if context is already sufficient. Search only if NOT. | Skip rules below. |
| 1: Plan | Read arch rules → fill APC → `ticket create --summary "..."`. | **STOP. Wait for user approval.** |
| 2: Execute | Implement per approved plan. Update checkboxes. | — |
| 3: Verify | Run build/tests. Record issues. | — |
| 4: Close | Close + archive ticket. File follow-ups if needed. | **NEVER skip.** |

### Ticket Cleanup (HARD RULE)
```
BEFORE creating a new ticket, CLI inspects the previous active ticket:
  → IF all checklist items [x] AND phase >= 3 → auto-close (work is done).
  → IF unchecked items remain OR phase < 3 → keep open + print [NOTICE].
  → activeTicketId switches to the new ticket regardless.

Agent responsibility:
  → Update checklist items [x] as you complete tasks (Phase 2).
  → Advance phase via ticket move when transitioning stages.
  → This ensures the CLI can accurately judge completion on next ticket create.
```

### Phase 0 Search Rules (HARD RULE)
```
SKIP Phase 0 entirely IF:
  - User gave explicit instructions (file path, error message, or specific task)
  - Conversation already contains sufficient context from prior turns
  - Task is a continuation of previous work in the same session

IF search IS needed:
  - MAX 2 MCP search calls total (across all search_* tools)
  - Prefer local file reads (view_file, grep_search) over MCP search
  - NEVER do exploratory broad searches ("find all files", "list everything")
  - Search for SPECIFIC terms only (ticket ID, function name, error code)
  - IF 2 searches yield no useful result → STOP searching, proceed with what you have
```

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
- **Frontmatter Requirement (HARD RULE)**: ALL plan and report markdown files MUST contain valid DeukAgent frontmatter (`summary`, `status`, `priority`, `tags`) for RAG metadata indexing.
- Immediately after creating or updating any file in `.deuk-agent/docs/`, you MUST execute the `enrich_frontmatter` MCP tool on the file path to automatically generate/supplement the frontmatter. Do not attempt to manually write these specific frontmatter tags unless necessary.
- Run `npx deuk-agent-rule lint:md` after markdown edits.

## 7. Platform Co-existence

Platform features (planning, artifacts, KI) co-exist with ticket workflow. Neither overrides.

- Planning → use platform native + copy to `.deuk-agent/docs/plans/`.
- Artifacts → copy to `.deuk-agent/docs/` (platform paths not RAG-indexed).
- Always call `set_workflow_context` regardless of platform state.
- Use both @mention and ticket chaining (`prevTicket`/`nextTicket`).
- NEVER disable platform features to "comply" with these rules.

## 8. CLI Reference

| Action | Command | Max calls |
|--------|---------|----------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --summary "<text>" --non-interactive` | 1 per task |
| Fast nav | `npx deuk-agent-rule ticket use --latest --path-only` → `view_file` | 1 per boot |
| Activate | `npx deuk-agent-rule ticket use --topic <id> --non-interactive` | 1 |
| Advance | `npx deuk-agent-rule ticket move --topic <id> --next --non-interactive` | 1 per phase |
| Close | `npx deuk-agent-rule ticket close --topic <id> --non-interactive` | 1 |
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` | 1 |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` | **0 during boot** |

NEVER manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
`ticket list` is for user-requested audits only, NOT for agent boot/discovery.

### Telemetry
- Per phase: `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic: `npx deuk-agent-rule telemetry sync`
- Skip if no Execute capability.
