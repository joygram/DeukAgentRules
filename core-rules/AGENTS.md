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

Agent platforms (Antigravity, Cursor, Copilot, etc.) have their own planning, artifact, and knowledge systems. These systems MUST **co-exist** with the Ticket-Driven Workflow. Neither system should override the other.

### Co-existence Rules
1. **Planning**: Use the platform's native planning features (Plan artifacts, etc.) normally. Once a plan is approved, also save it to `.deuk-agent/docs/plans/<ticket-id>-plan.md`.
2. **Artifacts**: Platform-specific artifact paths are NOT indexed by RAG. Always create a copy under `.deuk-agent/docs/`.
3. **Workflow State**: Regardless of the platform's own state management, always call `set_workflow_context` to synchronize DeukAgent's state.
4. **Conversations**: Platform conversation references (@mention, etc.) and ticket chaining (`prevTicket`/`nextTicket`) are complementary. Use both.

### Prohibited
- Disabling or bypassing platform-native features to "comply" with DeukAgent rules.
- Skipping platform's Planning/Artifact features by citing DeukAgent rules.
- Saving artifacts ONLY to the platform path without copying to `.deuk-agent/docs/`.

## Workflow Gate Protocol (HARD RULE)

### Self-Check (before calling any code-modification tool)
- "What is my active ticket number?" — If you cannot answer, **stop immediately and create a ticket.**
- "Did I call `set_workflow_context`?" — If not, call it now.
- "Is this artifact being saved to `.deuk-agent/docs/`?" — If not, fix the path.
