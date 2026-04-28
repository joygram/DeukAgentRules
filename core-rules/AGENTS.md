# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.
- **[MANDATORY]** All artifacts (Plans, Reports, Tickets, Walkthroughs) MUST be written in the same language as the user's current prompt.

## Project-Specific Rules
- Locate and read the project-specific architecture boundaries, domain logic, and anti-patterns before planning.
- The path to these project rules is typically documented by the user at the top of this `AGENTS.md` file (e.g., `DOMAIN_RULES.md` or `docs/architecture/*_ARCHITECTURE.md`).
- If the **Project Rules Path** is missing or contains a placeholder like `<Enter the path...>`, the Agent MUST ask the user to provide the correct path and update the header.
- Agents MUST consult these rules. Do NOT rely on general assumptions if a project rule exists.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral, auto-cleaned)
- Knowledge Capture: Core design/security decisions from tickets must be formalized in `docs/internal/`.
- Agents producing artifacts outside `.deuk-agent/docs/` must copy them there for RAG indexing.
- Run `npx deuk-agent-rule lint:md` after editing markdown.
