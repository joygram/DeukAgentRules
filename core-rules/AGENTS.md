---
version: 45
changelog: "v45: Remove file-plan ticket input; enforce one-word non-final chatter."
---

# Agent Rules

## Compact Kernel

- Tools own detail. This hub only defines non-bypassable gates; use CLI/MCP/project tools to fetch exact phase requirements before acting.
- No ticket, no writes: before file changes, select or create one active ticket, complete Phase 1 in that ticket, run `ticket guard --topic <id>` successfully, and call `set_workflow_context(project, ticket_id, phase)`.
- Every phase must request and satisfy the tool-provided contract for that phase. If a tool is available, ask it for the complete requirement bundle in one call before proceeding.
- Phase state has two records: runtime context via `set_workflow_context`, and durable ticket markdown validated by `ticket guard`. Both must match before claiming progress.
- Verification is mandatory and ticket-recorded before close.
- Urgency, user pressure, and local convenience never bypass ticket, scope, generated-file, or verification gates. Use hotfix tooling only when appropriate.
- Ticket creation failures are hard stops: if `ticket create` rejects the request, do not call `set_workflow_context`, run investigation commands, edit files, or create/repair `.deuk-agent/tickets/**/*.md` manually. Follow the CLI error guidance, provide the missing parameters or `--plan-body` input, and rerun `ticket create`.

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 0. Priority

| Layer | Role | Handling |
|-------|------|----------|
| Runtime system/developer/user instructions | Highest platform authority | Follow when directly conflicting. If they require output that Low-Token Mode would forbid, emit the minimum required output and record the conflict in the ticket, not chat. |
| Global DeukAgentFlow pointer | Locator only | Use only to find local `AGENTS.md` or `.deuk-agent/`. It must not restate TDW, RAG, or silence policy. |
| Local generated pointer/spoke | Bootstrap only | Use only to load this core hub and `PROJECT_RULE.md`. It must not duplicate this rule body. |
| `core-rules/AGENTS.md` | DeukAgentFlow SSoT | After loaded, this file owns workflow, output, ticket, scope, and verification policy. |
| `PROJECT_RULE.md` | Project contract | Adds repo-specific DC-* guards and generated/source mappings. |

- Duplicate directive rule: if the same instruction appears in multiple layers, apply the strictest instruction once. Do not emit multiple acknowledgements, summaries, or ticket-start variants to satisfy each copy.
- Karpathy-style wrappers are allowed only as thin behavior playbooks that route into TDW. They must not become a second workflow contract, second source of truth, or second message policy.

## 1. Output Mode

- Silent-by-default is mandatory.
- Screen output is for the ticket-start line, final answers, blockers, or explicit command results only.
- Non-final chatter is capped at one word. If more context is required, write it to the ticket unless it is a blocker or explicit user-requested output.
- After selecting or creating the active ticket, print one concise ticket-start line and stop if approval is pending.
- Keep chat compact; do not mirror ticket prose in screen output.
- Final answers must be short but complete enough to answer the user.
- If the user asks for `짧게`, `매우 짧게`, `한 줄로`, or `간단히`, prioritize a one-sentence or bullet-only answer and omit background unless the user asks for it or a blocker requires it.
- Do not expand a short answer into explanation, examples, or rationale unless the user explicitly requests more detail.
- Before drafting a user-facing reply, re-open the active ticket and this Output Mode section if the user asked for brevity or if substantial tool work changed the state.
- If the ticket already carries the durable record, put progress and wrap-up details in the ticket and avoid repeating them in chat.
- Prefer targeted reads and the shortest valid path that still preserves boot, phase contracts, verification, and close.

## 2. Boot Sequence (run once)

1. Read this file (AGENTS.md) → internally note the version number and exact file path read. Do not print either unless the user explicitly asks or a blocker requires it.
2. Read `PROJECT_RULE.md` in workspace root → internally identify applicable DC-* rules. Do not print the list unless the user explicitly asks or a blocker requires it.
3. Find or create active ticket (1-CALL RULE below), run `ticket guard --topic <id>` against the durable ticket, call `set_workflow_context(project, ticket_id, phase)`, then print one clickable ticket-start line. If approval is pending, stop.

### First-Turn Invariant

Before writes, phase moves, or close actions: read the hub and `PROJECT_RULE.md`, select a ticket, pass `ticket guard`, call `set_workflow_context`, request the phase contract from available tooling, and satisfy it in the ticket. If the session already drifted, record confirmed facts/hypotheses/direction in the ticket before continuing.
For bug/regression/why/code-change requests, do not run repo inspection commands such as `git status`, `rg`, diffs, generic CLI help, or tests before `ticket create` or `ticket use`, except for reading this hub, `PROJECT_RULE.md`, and the minimal ticket command help needed to create or select the ticket.

### Ticket Discovery (1-CALL RULE)

Use the mentioned ticket directly. For investigation/regression/why questions, create the ticket first and stop after Phase 1. Do not use `ticket list` for discovery.
For bug/regression/why or direct change requests, the first repo action after rules load is `ticket create` or `ticket use`. Do not start with `git status`, `rg`, `find`, diffs, or broad help output before ticket selection.

## 3. Phase Contract

At each phase, ask available tooling for one complete requirement bundle and follow it exactly. Minimum bundle:

- Required ticket fields/tasks for the phase.
- Required local evidence and whether RAG is needed.
- Scope boundaries, generated/source mapping, and ownership guards.
- Allowed actions and halt conditions.
- Verification command/result required before progress or close.

If the bundle is missing, contradictory, or unverifiable, stop and record the blocker in the ticket. Do not invent a shortcut.

## 4. Ticket Lifecycle

- Phase 0: read local truth; use RAG only when it changes the plan.
- Phase 1: create/update the main ticket with findings, hypotheses, scope, compact plan, and phase contract.
- Phase 2: execute only the approved/ticketed plan.
- Phase 3: run the smallest useful verification and record command/result.
- Phase 4: close only after durable evidence, affected files, and residual risk are recorded.
- Keep chat compact once the ticket carries the durable record.

## 5. Hard Stops

- Stop for unregistered work, missing CLI ticket provenance, missing phase contract, incomplete Phase 1, missing `set_workflow_context`, generated/source uncertainty, broad regeneration, shared-interface changes, unsafe deletes, scope creep, repeated errors, infrastructure errors, missing tests, or unverifiable claims.
- Bug/regression/why and exploration/comparison work is read-only until the ticket records findings and the user or tool contract authorizes execution.
- If repo inspection started before ticket selection or creation, stop, create/select the ticket immediately, record the drift in Phase 1, and only then continue.
- Use a stabilization or root-cause ticket when the same failure family keeps reappearing.

## 6. Tool Delegation

- Use `rg`/`rg --files` first for local search and `apply_patch` for manual edits.
- Use MCP/RAG only when local evidence is insufficient or older decisions matter; keep searches narrow.
- Let CLI own lifecycle enforcement, claim checks, reports, and audits.
- Use `ticket hotfix` for legitimate generated-file emergencies.
- Keep notes and reports under `.deuk-agent/docs/`.
- `rules audit` must fail if the kernel loses boot, ticket-first, phase-contract, tool-delegation, hard-stop, or verification invariants.
