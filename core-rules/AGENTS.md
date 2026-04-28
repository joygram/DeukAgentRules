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
