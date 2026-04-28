# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.
- **[MANDATORY]** All artifacts (Plans, Reports, Tickets, Walkthroughs) MUST be written in the same language as the user's current prompt.

## Project-Specific Rules
- Locate and read **`PROJECT_RULE.md`** in the root of the project workspace.
- `PROJECT_RULE.md` contains either the project-specific architecture boundaries or a link to the relevant documentation (e.g., `docs/ARCHITECTURE.md`).
- Agents MUST consult these rules. Do NOT rely on general assumptions if a project rule exists.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral, auto-cleaned)
- Knowledge Capture: Core design/security decisions from tickets must be formalized in `docs/internal/`.
- Agents producing artifacts outside `.deuk-agent/docs/` must copy them there for RAG indexing.
- Run `npx deuk-agent-rule lint:md` after editing markdown.

## Agent Platform Co-existence Protocol

Agent platforms have their own planning, artifact, and knowledge systems. These systems MUST **co-exist** with the Ticket-Driven Workflow. Neither system should override the other.

### Co-existence Rules
1. **Planning**: Use the platform's native planning features normally. Once a plan is approved, also save it to `.deuk-agent/docs/plans/<ticket-id>-plan.md`.
2. **Artifacts**: Platform-specific artifact paths are NOT indexed by RAG. Always create a copy under `.deuk-agent/docs/`.
3. **Workflow State**: Regardless of the platform's own state management, always call `set_workflow_context` to synchronize DeukAgent's state.
4. **Conversations**: Platform conversation references (@mention, etc.) and ticket chaining (`prevTicket`/`nextTicket`) are complementary. Use both.

### Plan Mode → TDW Phase Mapping

Each platform's native Plan Mode maps to the Ticket-Driven Workflow as follows. Use the platform's planning feature for TDW Phase 1, then transition to execution for Phase 2.

| Platform | Plan Mode Activation | Phase 1 (Plan) | Phase 2 (Execute) | Artifact Sync Path |
|----------|---------------------|----------------|--------------------|--------------------|
| Antigravity | Planning Mode | Plan artifact → copy to `.deuk-agent/docs/plans/` | Normal execution | `brain/` → `.deuk-agent/docs/` |
| Claude Code | `--permission-mode plan` or `Shift+Tab` | Read-only analysis → save to `.deuk-agent/docs/plans/` | Switch to Normal Mode | Direct file creation |
| Copilot | Agent Mode (auto-plan) | Plan output → save to `.deuk-agent/docs/plans/` | Agent continues execution | Direct file creation |
| Codex | N/A (no native plan mode) | `ticket create` enforces Phase 1 manually | `workspace-write` sandbox | Direct file creation |
| Cursor | Plan Mode (`Shift+Tab`) | `.cursor/plans/` → copy to `.deuk-agent/docs/plans/` | "Build" execution | `.cursor/plans/` → `.deuk-agent/docs/` |

### Platform-Specific Notes

- **Antigravity**: KI (Knowledge Items) and `@conversation` mentions co-exist with ticket chaining. Artifacts in `brain/` are NOT RAG-indexed; always copy to `.deuk-agent/docs/`.
- **Claude Code**: Sessions do not retain memory. `CLAUDE.md` / `.claude/rules/` serve as persistent context; the Spoke pointer there directs to this file. Ensure `.mcp.json` uses `sonnet`+ model with `high` effortLevel for MCP tool availability.
- **Copilot**: Agent Mode auto-generates plans internally but does not persist them as files. Explicitly save the plan to `.deuk-agent/docs/plans/` before proceeding. Use `#file` references to `PROJECT_RULE.md` for architecture context.
- **Codex**: Has no native Plan Mode. The TDW `ticket create` command serves as the mandatory planning gate. Codex merges `AGENTS.md` files from `~/.codex/` → project root → CWD; this naturally aligns with Hub-Spoke. Use `workspace-write` sandbox level for standard operations.
- **Cursor**: Plan Mode saves to `.cursor/plans/` which is source-controllable but NOT RAG-indexed. Always copy to `.deuk-agent/docs/plans/`. MDC rules in `.cursor/rules/` are auto-loaded; the Spoke pointer there directs to this file.

### Prohibited
- Disabling or bypassing platform-native features to "comply" with DeukAgent rules.
- Skipping platform's Planning/Artifact features by citing DeukAgent rules.
- Saving artifacts ONLY to the platform path without copying to `.deuk-agent/docs/`.

## Mode-Aware Workflow Adaptation

Agents must adapt their behavior to the **current execution mode** of the platform. Do NOT attempt CLI commands or file mutations if the platform is in read-only/plan mode.

### Detecting Your Mode

Determine your current mode by capability, not by label:
- **Can I run shell commands?** → You have Execute capability.
- **Can I create/edit files?** → You have Write capability.
- **Can I only read files and respond with text?** → You are in Plan Mode.

### Plan Mode Behavior (Read-Only)

If you lack Execute or Write capabilities, you are effectively in **TDW Phase 0–1**. This is correct — lean into it:

1. **DO**: Read `PROJECT_RULE.md`, `AGENTS.md`, and architecture docs. Analyze the codebase via file reads and search.
2. **DO**: Produce the implementation plan as structured text output (the platform's native plan format).
3. **DO**: Call MCP read tools (`search_rules`, `search_code`, `search_tickets`) if available.
4. **DEFER**: CLI commands (`ticket create`, `telemetry log`). Instead, include them as "Commands to run after approval" in your plan output.
5. **DEFER**: File writes. Instead, specify exact file paths and content in your plan.
6. **DO NOT**: Attempt to run commands you cannot execute — this wastes tokens and context.

**Plan Mode output template:**
```
## Plan Summary
[analysis and proposed changes]

## Deferred Commands (run after switching to Execute mode)
1. `npx deuk-agent-rule ticket create --topic <topic> --non-interactive`
2. `set_workflow_context(project, ticket_id, "Execute")`
3. [file mutations]
```

### Execute Mode Behavior (Full Access)

When you have Execute and Write capabilities, follow the full TDW lifecycle:
1. Run deferred commands from the approved plan (if transitioning from Plan Mode).
2. Create ticket, fill APC, proceed through phases normally.
3. All standard Workflow Gate checks apply.

### Seamless Transition

When the user switches from Plan Mode to Execute Mode (or approves a plan):
1. If a plan was produced in Plan Mode, treat it as pre-approved Phase 1 output.
2. Run the deferred commands listed in the plan.
3. Enter Phase 2 (Execute) directly — do not re-analyze or re-plan.

## Workflow Gate Protocol (HARD RULE)

### Self-Check (before calling any code-modification tool)
- "What is my active ticket number?" — If you cannot answer AND you have Execute capability, **stop and create a ticket.** If you are in Plan Mode, note this in your plan output.
- "Did I call `set_workflow_context`?" — If not and MCP is available, call it now. If MCP is unavailable, proceed without it.
- "Is this artifact being saved to `.deuk-agent/docs/`?" — If not, fix the path.

