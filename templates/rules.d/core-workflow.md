---
id: core-workflow
inject_target: ["AGENTS.md"]
---
## Ticket-Driven Workflow (MANDATORY)

All work follows this lifecycle. Skipping any phase is a rule violation. Phases adapt to the agent's current execution mode.

1. **Phase 0: Research** *(Plan Mode compatible)* — If the task requires unfamiliar context, search related rules and past tickets via `mcp_deukcontext_search_*` (or local search if unavailable). Skip if context is already sufficient from the user request.
2. **Phase 1: Plan** *(Plan Mode compatible)* — Search and read the project architecture rules (e.g., DOMAIN_RULES.md or *_ARCHITECTURE.md). Produce an implementation plan with the APC (Agent Permission Contract) blocks filled. If Execute capability is available, run `npx deuk-agent-rule ticket create` to formalize it. If in Plan Mode, output the plan as text and list `ticket create` as a deferred command. **STOP AND WAIT for explicit user approval before writing any code.**
3. **Phase 2: Execute** *(requires Execute capability)* — Implement per the approved plan. If transitioning from Plan Mode, run deferred commands first. Update ticket checkboxes in real-time.
4. **Phase 3: Verify** *(requires Execute capability)* — Run build/tests. Record all discovered constraints, side-effects, and tech debt in a Potential Issue Table.
5. **Phase 4: Close** *(requires Execute capability)* — File follow-up tickets for unresolved issues from the Potential Issue Table. Archive the ticket (`ticket archive`) to preserve knowledge for RAG.

**Error Handling**: On 2+ repeated errors, stop, rollback, and file an analysis ticket.

## Ticket Navigation

When asked to proceed to the next ticket, execute this fast path with zero detours:

1. Run `npx deuk-agent-rule ticket use --latest --path-only`
2. `view_file` the returned path immediately.
3. **Done.** Do not search MCP, do not run `ls`/`grep`/`ticket list`. This is a direct lookup, not a research task.

**[HARD RULE]** Never manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`. Create tickets only through `npx deuk-agent-rule ticket create`.

## Telemetry (MANDATORY)
- After each ticket phase (when Execute capability is available): `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic sync: `npx deuk-agent-rule telemetry sync`
- If Execute capability is unavailable, skip telemetry — it will be captured when the plan is executed.

