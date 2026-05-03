---
summary: "Telemetry record integrity analysis and fix trace for 191-agent-telemetry-recording-gap-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 21:51:01"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The telemetry CLI already writes workflow and work logs, but the normalization path is not fully non-destructive.

The main issue found so far is `migrateAction()` in `scripts/cli-telemetry-commands.mjs`: it rewrites every record and forces `synced: false` on all rows, even when the file already contains synced records. That means a normalization pass can erase the persistence state of telemetry entries and make the file look less trustworthy as a record of what has already been transmitted.

This is a record-integrity bug, not a missing-write bug. The append path is present; the migrate path is the part that can weaken retention semantics.

## Source Observations
- `scripts/cli-telemetry-commands.mjs` appends telemetry entries through `appendTelemetryRecord()` and normalizes records through `migrateAction()`.
- `normalizeTelemetryRecord()` currently reassigns `synced = false` instead of preserving an existing truthy synced state.
- `syncAction()` writes the file back with `synced: true`, so migrate should not undo that state unless the record is malformed.
- Existing telemetry tests cover event coverage and missing-event normalization, but they do not cover `synced` preservation across migration.

## Cause Hypotheses
- The append path is fine, but the normalization path is overly aggressive.
- Migration was written to make old records readable, but it also resets record state that should remain stable.
- Lack of a regression test allowed this state loss to go unnoticed.

## Decision Rationale
- Preserve `synced` if it is already present and truthy.
- Default `synced` to `false` only when the record does not have a valid boolean state.
- Keep the fix in the telemetry module rather than adding a separate repair script, because the behavior belongs to the existing normalization flow.

## Execution Strategy
- Update telemetry normalization so it preserves existing sync state.
- Add a regression test that verifies migrated rows keep `synced: true` when they already were synced.
- Re-run the telemetry test file and ensure the summary/migrate behaviors still pass.

## Verification Design
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/191-agent-telemetry-recording-gap-joy-nucb.md .deuk-agent/docs/plans/191-agent-telemetry-recording-gap-joy-nucb-plan.md`

Expected outcome:
- Telemetry migrate keeps existing synced records intact.
- Event coverage tests remain green.
- Markdown lint passes for the ticket and plan.

Residual risk:
- If future telemetry schema adds more stateful fields, migrate may need to preserve them too instead of recomputing them unconditionally.

## Verification Outcome
- `node --test scripts/tests/cli-telemetry-commands.test.mjs` passed.
- `node --test scripts/tests/*.test.mjs` passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/191-agent-telemetry-recording-gap-joy-nucb.md .deuk-agent/docs/plans/191-agent-telemetry-recording-gap-joy-nucb-plan.md` passed.
- `normalizeTelemetryRecord()` now preserves existing `synced: true` records during migration instead of resetting them to `false`.
