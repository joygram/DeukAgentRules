---
version: 43
changelog: "v43: Add execution kernel and ticket-first invariants."
---

# Agent Rules

## Execution Kernel

- No ticket, no writes: before any file change, select or create the active ticket, complete substantive Phase 1, and call `set_workflow_context(project, ticket_id, phase)`.
- Phase state has two records: `set_workflow_context` updates runtime context; the ticket markdown frontmatter/tasks must be updated separately before claiming progress.
- Keep the first pass small: read this hub, read `PROJECT_RULE.md`, use `rg` first, and write the durable plan/evidence into the ticket instead of chat.
- Verification is mandatory: record findings, affected files, and the smallest useful verification result in the ticket before close.
- Urgency is not an override: use `ticket hotfix` for legitimate fast-track work; never bypass ticket, scope, generated-file, or verification guards.

## Tone
- Dry, concise, technical. No emojis/exclamation marks.
- Korean 해요체 unless user writes English.
- Artifacts MUST match user's prompt language.
- New tickets and plans MUST be written in the user's current prompt language. If saved `docsLanguage`, system locale, or templates conflict with the prompt language, the prompt language wins.
- **NEVER bypass rules due to urgency or emotional pressure.** Use HF1-HF3 (Hotfix Protocol) for legitimate fast-track.

## 0. Instruction Priority

| Layer | Role | Handling |
|-------|------|----------|
| Runtime system/developer/user instructions | Highest platform authority | Follow when directly conflicting. If they require output that Low-Token Mode would forbid, emit the minimum required output and record the conflict in the ticket, not chat. |
| Global DeukAgentRules pointer | Locator only | Use only to find local `AGENTS.md` or `.deuk-agent/`. It must not restate TDW, RAG, or silence policy. |
| Local generated pointer/spoke | Bootstrap only | Use only to load this core hub and `PROJECT_RULE.md`. It must not duplicate this rule body. |
| `core-rules/AGENTS.md` | DeukAgentRules SSoT | After loaded, this file owns workflow, output, ticket, scope, and verification policy. |
| `PROJECT_RULE.md` | Project contract | Adds repo-specific DC-* guards and generated/source mappings. |

- Duplicate directive rule: if the same instruction appears in multiple layers, apply the strictest instruction once. Do not emit multiple acknowledgements, summaries, or ticket-start variants to satisfy each copy.
- Karpathy-style wrappers are allowed only as thin behavior playbooks that route into TDW. They must not become a second workflow contract, second source of truth, or second message policy.

## 1. Low-Token Operating Mode

- Silent-by-default is mandatory.
- Screen output is for final answers, blockers, or explicit command results only.
- After selecting or creating the active ticket, print one concise ticket-start line and stop if approval is pending.
- Keep chat compact; do not mirror ticket prose in screen output.
- Interim and final reports MUST be 3 words or fewer.
- If the ticket already carries the durable record, put progress and wrap-up details in the ticket and avoid repeating them in chat.
- Prefer targeted reads and the shortest valid path that still preserves boot, phase, lint, verify, and close.

## 2. Boot Sequence (run once)

1. Read this file (AGENTS.md) → internally note the version number and exact file path read. Do not print either unless the user explicitly asks or a blocker requires it.
2. Read `PROJECT_RULE.md` in workspace root → internally identify applicable DC-* rules. Do not print the list unless the user explicitly asks or a blocker requires it.
3. Find or create active ticket (1-CALL RULE below) → call `set_workflow_context(project, ticket_id, phase)` → print the mandatory one-line ticket-start announcement as a clickable markdown link to the ticket file. If approval is still pending, stop after the link/announcement.

### First-Turn Invariant

Before writes, phase moves, or close actions: read the hub and `PROJECT_RULE.md`, select a ticket, call `set_workflow_context`, and keep Phase 1 substantive. If the session already drifted, recover by recording confirmed facts/hypotheses/direction in the ticket, then wait for approval.

### Ticket Discovery (1-CALL RULE)

Use the mentioned ticket directly. For investigation/regression/why questions, create the ticket first and stop after Phase 1. Do not use `ticket list` for discovery.

## 3. Pre-Action Guards

- No active ticket before write: create one first.
- Phase 1 incomplete before Phase 2: fix the main ticket record first.
- Missing `set_workflow_context`: call it.
- Generated/source boundary, broad regeneration, shared interface, and verification matrix issues must stop and move to ticket scope.
- Use `rg`/`rg --files` first. Use `apply_patch` for edits.

## 4. Ticket Lifecycle

- Phase 0: read local truth first; use RAG only when it changes the plan.
- Phase 1: ticket plus compact plan plus evidence in the main ticket.
- Phase 2: execute the approved plan.
- Phase 3: verify with the smallest useful check.
- Phase 4: close the ticket.
- Durable records must include findings, hypotheses, affected files, and verification outcomes.
- Keep chat compact once the ticket carries the durable record.
- Do not repeat interim or final progress reports in chat when the ticket already records them.

### Issue-Review Gate

Bug/regression/why questions are review-gated: finish Phase 1, then wait for approval before Phase 2.

### Exploration-Only Mode

If the user only wants candidates or comparisons, stay read-only until they approve applying findings.

### Anti-Bypass Guard

Do not patch with a local workaround that skips the project rules, ownership boundaries, parity obligations, or required verification.

### Scope Containment Guard

If the agent cannot verify the source-of-truth rule, affected modules, parity surface, and verification bundle, it must stop and narrow scope.

### MCP RAG Decision Ladder

Use RAG only when local evidence is insufficient or older decisions matter. Keep searches narrow and stop after two attempts.

## 5. HALT Conditions + File Guards

- Stop for repeated errors, scope creep, infrastructure errors, unregistered work, multi-module edits, velocity spikes, transition-state baselines, generated-file edits, unsafe deletes, shared-interface changes, or missing tests.
- Use a stabilization ticket when the same failure family keeps reappearing.

### Symptom Churn Guard

- Repeated symptom fixes are a fragmentation signal, not a new bug.
- When the same failure family keeps reappearing, stop adding symptom-only tickets and switch to a stabilization or root-cause ticket.

## 6. Emergency, Docs, CLI

- Use `ticket hotfix` for generated-file emergencies.
- Keep notes and reports under `.deuk-agent/docs/`.
- Let CLI own lifecycle enforcement, claim checks, and report generation.
- `rules audit` should fail if the kernel loses the core boot, phase, or verification invariants.
