---
summary: "Agent problem analysis and decision trace for 204-agentrule-cli-further-sync-joy-nucb-plan"
status: completed
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-03 03:56:57"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The ticket flow now works, but the default CLI output still produces too many repeated lines for agent-driven use. The main friction points are:

- `ticket create` can emit several status-adjacent notices during auto-close, auto-archive, and previous-ticket linking.
- `ticket status` always prints a multi-line block even when the caller only needs a phase/state summary.
- The current contract already has a "filled vs scaffold" distinction, but there is no compact output path for automation.

That makes the tool itself part of the token-cost problem the user reported. The fix is not another policy layer; it is a smaller output surface with the same validation semantics.

## Source Observations
- `scripts/cli-ticket-commands.mjs` currently mixes state changes with verbose narration (`AUTO-CLOSE`, `AUTO-ARCHIVE`, `NOTICE`, linked-ticket logging).
- `scripts/cli-ticket-commands.mjs` already derives phase/status/reason data in `runTicketStatus()`, so a compact formatter can reuse the same data instead of re-parsing it.
- `scripts/cli.mjs` help text does not expose a compact output option yet.
- The existing tests already cover ticket lifecycle rollback and strict create behavior, so this ticket can add focused output-shape tests without broad refactoring.

## Cause Hypotheses
- The CLI grew by adding guard rails and lifecycle messages, but no dedicated low-noise mode for agent automation was added.
- The status command is optimized for human readability, not for repeated machine consumption.
- Non-interactive flows are the ones most likely to be repeated by agents, so they should default to less chatter.

## Decision Rationale
- Add a compact ticket output mode and apply it to non-interactive flows.
- Keep the existing detailed/human-readable output as the default for interactive use so we do not lose context for manual debugging.
- Avoid introducing a brand-new reporting subsystem; the current commands already compute the needed state.

## Execution Strategy
- Add a `--compact` flag to ticket argument parsing and document it in the CLI help.
- Make `ticket status --compact` print a single summary line with phase, status, and reasons.
- Suppress repetitive lifecycle narration when commands run in compact/non-interactive mode.
- Add regression tests for parse args and compact status output.

## Verification Design
- `node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` should pass.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/docs/plan/204-agentrule-cli-further-sync-joy-nucb-plan.md .deuk-agent/tickets/sub/204-agentrule-cli-further-sync-joy-nucb.md docs/ticket-create-improvements.md` should pass.
- `node scripts/cli.mjs ticket status --topic <id> --compact` should emit a one-line summary.
- `node scripts/cli.mjs ticket create --non-interactive ...` should stay much quieter than the interactive path.

## Verification Outcome
- `node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` passed.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/docs/plan/204-agentrule-cli-further-sync-joy-nucb-plan.md .deuk-agent/tickets/sub/204-agentrule-cli-further-sync-joy-nucb.md docs/ticket-create-improvements.md scripts/cli.mjs` passed.
- `ticket status --compact` now emits a single summary line, and non-interactive lifecycle flows suppress repetitive narration.
