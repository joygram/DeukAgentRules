# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.
- **[MANDATORY]** All artifacts MUST be written in the same language as the user's current prompt.

## Boot Sequence (HARD RULE)

Execute sequentially — each step must complete before the next. Do NOT batch steps in parallel.

1. Read this file (`AGENTS.md`).
2. Read `PROJECT_RULE.md` in the workspace root. It contains project-specific architecture boundaries. Do NOT rely on general assumptions if it exists.
3. Identify active ticket from user's request. If none and the request requires code changes, create one.
4. Call `set_workflow_context(project, ticket_id, phase)` via MCP. If MCP unavailable, proceed.
5. Begin research.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral)
- All artifacts MUST exist under `.deuk-agent/docs/` for RAG indexing. Platform-native paths (`brain/`, `.cursor/plans/`) are NOT indexed — always copy.
- Run `npx deuk-agent-rule lint:md` after editing markdown.

## Ticket-Driven Workflow (MANDATORY)

All work follows this lifecycle. Skipping any phase is a rule violation.

**Mode adaptation:** If you lack Execute/Write capability, you are in **Plan Mode** (Phases 0–1 only). Defer CLI commands and file writes as text in your plan output. When transitioning to Execute Mode, run deferred commands first and enter Phase 2 directly — do not re-plan.

| Phase | Action |
|-------|--------|
| 0: Research | Search rules/past tickets via `mcp_deukcontext_search_*` or local search. Skip if context sufficient. |
| 1: Plan | Read architecture rules. Fill APC. Run `ticket create` (or defer if Plan Mode). **STOP — wait for user approval.** |
| 2: Execute | Implement per approved plan. Update ticket checkboxes in real-time. |
| 3: Verify | Run build/tests. Record issues in Potential Issue Table. |
| 4: Close | File follow-up tickets for unresolved issues. Archive ticket. |

**Error Handling**: On 2+ repeated errors, stop, rollback, file an analysis ticket.

### Ticket Navigation (fast path)
1. `npx deuk-agent-rule ticket use --latest --path-only`
2. `view_file` the returned path. **Done.** No MCP search, no `ls`/`grep`.

### Telemetry
- After each phase: `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic: `npx deuk-agent-rule telemetry sync`
- Skip if Execute capability unavailable.

## Workflow Gate (HARD RULE)

Before calling ANY tool, self-check:
1. "What is my active ticket?" → If unknown and code changes needed: **stop, create ticket.**
2. "Did I call `set_workflow_context`?" → If not and MCP available: call now.
3. "Is this artifact under `.deuk-agent/docs/`?" → If not: fix path.

## Platform Co-existence

Platform-native features (planning, artifacts, KI) co-exist with TDW. Neither overrides the other.

| Rule | Action |
|------|--------|
| Planning | Use platform's native plan features. Also save to `.deuk-agent/docs/plans/`. |
| Artifacts | Platform paths are NOT RAG-indexed. Copy to `.deuk-agent/docs/`. |
| Workflow State | Always call `set_workflow_context` regardless of platform state management. |
| Conversations | Use both platform references (@mention) and ticket chaining (`prevTicket`/`nextTicket`). |

**Prohibited:** Disabling platform features to "comply" with DeukAgent rules. Skipping platform features by citing DeukAgent rules. Saving artifacts ONLY to platform paths.

## CLI Reference

| Action | Command |
|--------|---------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --non-interactive` |
| Activate | `npx deuk-agent-rule ticket use --topic <id> --non-interactive` |
| Close | `npx deuk-agent-rule ticket close --topic <id> --non-interactive` |
| Cancel | `npx deuk-agent-rule ticket close --topic <id> --status cancelled --non-interactive` |
| Phase advance | `npx deuk-agent-rule ticket move --topic <id> --next --non-interactive` |
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` |

**[HARD RULE]** Never manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
