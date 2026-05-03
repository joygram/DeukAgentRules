---
summary: "Agent problem analysis and decision trace for 189-telemetry-log-migration-summary--joy-nucb-plan"
status: completed
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 11:53:18"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
Legacy telemetry rows were carrying missing or weak `event` values, while newer writes still allowed `event` to drift toward `action` for work logs. That made the telemetry stream harder to analyze and left the summary view unable to quantify event coverage gaps.

## Source Observations
- `scripts/cli-telemetry-commands.mjs` now writes `event` from a stricter resolver, reports `missingEventCount`, and supports `telemetry migrate`.
- `scripts/tests/cli-telemetry-commands.test.mjs` now covers event coverage, migration, and the stricter default event behavior.
- `scripts/cli.mjs` help text advertises the new telemetry subcommand.

## Cause Hypotheses
- Existing logs predate the stricter telemetry event shape.
- Summary logic only reported TDW and RAG quality, so event coverage gaps were invisible.
- The write path conflated `event` with `action` for some work logs.

## Decision Rationale
We normalized the write path, added a one-shot migration for historical rows, and surfaced coverage metrics in summary output. That preserves backward compatibility for old data without keeping the old ambiguity in new writes.

## Execution Strategy
1. Add a telemetry event resolver that prefers explicit `event`, then uses workflow action names for internal workflow rows, then falls back to `kind` or `work`.
2. Add `telemetry migrate` to rewrite legacy rows in place and clear stale sync state.
3. Extend summary output with `missingEventCount` and `eventCoverageRate`.
4. Add regression coverage for the strict write path, migration, and summary metrics.

## Verification Design
Run `node --test scripts/tests/cli-telemetry-commands.test.mjs`, `node --test scripts/tests/*.test.mjs`, and `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/189-telemetry-log-migration-summary--joy-nucb.md .deuk-agent/docs/plans/189-telemetry-log-migration-summary--joy-nucb-plan.md`.

Expected outcome:
- Telemetry tests pass with the new strict `event` semantics.
- Markdown lint passes for the ticket and plan.
- Historical telemetry rows are normalized in place.

Verification Outcome:
- Implemented and verified. The telemetry command suite and full test suite pass, markdown lint passes, and the repo telemetry file was migrated in place.
