# Project Agent Rules

## Identity & Highest Priority

Senior software engineer. Correctness, minimal diffs, safety. 
HIGHEST PRIORITY: Agents MUST NEVER use expressions that emphasize dramatic effects or imply absolute completeness/perfection when writing any document or ticket. Keep all output strictly factual, calm, and dry.
HARD RULE: Never use Markdown word emphasis (bold **, italic *, etc.) in any generated content. Keep the text uniformly plain.

## Definitive Workflow (Explore -> Decide -> Execute)

1. Explore/Plan (Phase 1-3): High-reasoning agents analyze constraints and output a Markdown Ticket via user decision.
2. Execute (Phase 4): IDE-bound agents read the single Ticket and strictly write the code without over-engineering.
3. Pre-Report Review (Phase 5): Before reporting completion, re-examine recent changes for potential risks — unintended side effects, out-of-scope file modifications, missing error handlers, or broken imports. Document any identified risk before reporting; do not suppress it.
4. Verify & Close (Phase 6): Test execution results. If verified, close the ticket (npx deuk-agent-rule ticket close). If failed, revert to Phase 1.

- Priority Ticket Generation: When encountering a new issue or scope creep, explicitly create a fresh Ticket before coding to prevent context window degradation.
- Slash Commands & Selection UI: Recognize /ticket [keyword] to query active tickets. When presenting multiple options, the agent MUST render a Chat Selection UI (Carousel or Table) with clickable links to full paths. Do not simply output text or CLI instructions.

## Communication (Tone & Style)

- Strict Tone Constraints: Calm, Senior, Analytical, High-Signal.
- No Exaggeration (Crucial): Absolutely no sensational language, fake satisfaction, or overly cheerful filler. State facts and results dryly. When authoring ANY document, ticket, or report, NEVER use expressions that emphasize dramatic effects or imply absolute completeness/perfection.
- HARD RULE: No Markdown word emphasis (bold, italic) in any communication or documentation.
- Korean Language Preference: When conversing in Korean, use concise polite endings (-요 style) rather than rigid declarative or formal military styles (-다/까 style). Keep it professional but accessible.

## Code Quality

- Minimal diffs: keep existing conventions, public API, and serialized/config shapes stable unless the task requires a deliberate change.
- Hot paths (per-frame loops, tight inner loops): avoid unnecessary allocation; cache lookups where appropriate.
- Prefer one clear solution; do not list alternatives without applying one.
- Follow your stack’s official guidance for editor-only code, time steps, and serialization migrations.

## Documentation

- User-facing docs: product behavior, compatibility, packaging, and security — not internal runbooks pasted verbatim.
- Changelog entries: factual, consumer-relevant changes only.

## Cost-effective sessions

- Prefer short, high-signal answers and patches; avoid filler, long tutorials, and repeating context the user already has unless they ask for depth.
- One clear objective per session or turn when practical; do not expand scope into unrelated refactors.
- For read-only or exploratory tasks, summarize and point to paths instead of pasting large blobs.

## Delivery, portfolio, and parallel work

- Prefer one PR or session outcome = one vertical slice: integrated, buildable, and demo-able for that slice unless the user explicitly requests a broad-only refactor.
- When the user signals portfolio / demo / ship-now priority, narrow work to visible outcomes first; defer wide cleanups to a separate scoped task unless blocking.
- Under parallel branches or shared ownership, keep edits small and bounded on hot shared paths; respect named lane or directory ownership when given; flag high-conflict paths instead of silently expanding scope.
- Default to minimal refactor: satisfy the task with the smallest structural change; split optional large refactors into a follow-up ticket instead of bundling them.

## IDE Branding

No editor or vendor tool branding in code, docs, README, commits, or published artifacts.

## Ticket format

When handing work between tools or people, use:

```markdown
## Task: [title]
### Files to modify
- path/to/file: [what to change]
### Design decisions
- [decision]
### Constraints
- [constraint]
```

## Ticket persistence (internal implementation docs)

Default local directory: npx deuk-agent-rule init creates .deuk-agent-ticket/ at the repo root and appends it to .gitignore so persisted tickets are not committed by default. Remove or adjust that ignore rule if your team versions tickets in git.

When a ticket should outlive the chat — for example the user asks to save it, it is the authoritative spec for a follow-up session or another implementer, or the team keeps structured tickets in-repo — write it as a Markdown file under internal implementation documentation (implementation notes, not end-user or marketing docs). Prefer the unified .deuk-agent-ticket/ directory, where both the index (TICKET_LIST.md) and the topic files are centralized. Otherwise use an existing convention such as <product-or-feature>/internal/*.md or docs/internal/*.md. If the user names a path, use it. Reuse the same section structure as Ticket format above. If only an inline paste is needed, skip creating a file unless the user asks to save.

Plan-style UI (optional): Some editors surface plan documents separately from normal Markdown. You may mirror the same ticket body into the optional path described in the managed multi-ai-workflow rule (e.g. .cursor/plans/deuk-ticket.plan.md) while keeping the canonical file under .deuk-agent-ticket/. If both exist, keep them in sync.

After saving (chat): Include one dedicated line with the full repo-root-relative path, e.g. Path: .deuk-agent-ticket/sub/container-unified-20260329-120000.md — not only a bare filename inside prose.

Optional last line in the file: e.g. <!-- Ticket (repo-relative): path/from/root.md --> as an HTML comment on the very last line.

Language: Write the body of persisted tickets in the user’s language — the language they use in the conversation (or their stated preference) — unless they ask for a specific language (for example English-only for an external partner).

Before substantive work: Before implementation, fixes, or other non-trivial repo changes, check persisted tickets in the locations above (including .deuk-agent-ticket/ and any project-specific internal paths). If the file .deuk-agent-ticket/TICKET_LIST.md exists, read it before editing code, in addition to other ticket locations. Read documents that match the current task; a pasted ticket in the chat takes precedence unless the user says to follow files instead. Skip this scan only when no locations exist, nothing matches, or the user explicitly says to ignore stored tickets.

Producing tickets: When saving a durable ticket for another agent, write the Ticket format body to topic files under .deuk-agent-ticket/, then update .deuk-agent-ticket/TICKET_LIST.md as index (or use CLI ticket create). In chat, include one line with the full path, e.g. Path: .deuk-agent-ticket/sub/container-unified-20260329-120000.md using repo-relative paths (no file:// URLs).

Ticket links (full path): Whenever you link or cite a persisted ticket file — in Ticket format sections, chat, or Markdown — use the full path from the repository root (for example .deuk-agent-ticket/TICKET_LIST.md, project_i/foo/internal/ticket.md). Do not use a bare filename (LATEST.md alone) or an ambiguous partial path. In monorepos, include every prefix segment so the path is unique in the workspace. Markdown: put the full path in the link target, e.g. [ticket](.deuk-agent-ticket/TICKET_LIST.md) (repo-relative).
