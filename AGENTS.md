<!-- deuk-agent-rule:begin -->
# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.

## Coding
- C#: No LINQ/boxing in update loops.
- C++: No raw pointers. Forward-declare in headers. Mutex all shared resources.
- WebApp: No hardcoded JSON. Use DeukPack generated codecs.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral, auto-cleaned)
- Knowledge Capture: Core design/security decisions from tickets must be formalized in `docs/internal/`.
- Agents producing artifacts outside `.deuk-agent/docs/` must copy them there for RAG indexing.
- Run `npm run lint:md` after editing markdown.

<!-- RULE MODULE: core-workflow -->
## Ticket-Driven Workflow (MANDATORY)

All work follows this lifecycle. Skipping any phase is a rule violation.

1. **Phase 0: Research** — Search related rules, past tickets, and similar implementations via `mcp_deukcontext_search_*` (or local search if unavailable). Results serve as evidence for ticket design.
2. **Phase 1: Plan** — Run `npx deuk-agent-rule ticket create`. Review `DOMAIN_RULES.md` and copy applicable rules into the Strict Rules Check. Write the implementation plan in the ticket body. **STOP AND WAIT for explicit user approval before writing any code.**
3. **Phase 2: Execute** — Implement per the approved plan. Verify each change against RAG. Update ticket checkboxes in real-time.
4. **Phase 3: Verify** — Run build/tests. Record all discovered constraints, side-effects, and tech debt in a Potential Issue Table.
5. **Phase 4: Close** — File follow-up tickets for unresolved issues from the Potential Issue Table. Archive the ticket (`ticket archive`) to preserve knowledge for RAG.

**Error Handling**: On 2+ repeated errors, stop, rollback, and file an analysis ticket.

## Ticket Navigation

- **[HARD RULE]** Run `npx deuk-agent-rule ticket use --latest --path-only`, then `view_file` the result immediately. No `ls`, `grep`, `ticket list`, or other exploration.
- **[HARD RULE]** Never manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`. Create tickets only through `npx deuk-agent-rule ticket create`.

## Telemetry (MANDATORY)
- After each ticket phase: `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic sync: `npx deuk-agent-rule telemetry sync`
<!-- deuk-agent-rule:end -->