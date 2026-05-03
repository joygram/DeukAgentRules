---
summary: "Agent problem analysis and decision trace for 184-telemetry-internal-collection-mi-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 11:13:33"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The telemetry implementation now writes both manual work logs and internal workflow events into `.deuk-agent/telemetry.jsonl`. The remaining risk is not the telemetry data itself, but whether the public mirror sync path accidentally treats that internal collection as part of the mirror contract.

`scripts/sync-oss.mjs` currently mirrors package/source artifacts into the OSS tree. We need a focused test that proves the mirror payload is still limited to public distributable files and does not grow internal telemetry-specific paths or collections.

## Source Observations
- `scripts/cli-telemetry-commands.mjs` now separates `source: "internal"` / `kind: "workflow_event"` entries from work logs during telemetry summary.
- `scripts/cli-ticket-commands.mjs` appends internal workflow events for ticket lifecycle actions and knowledge distillation.
- `scripts/sync-oss.mjs` builds the OSS mirror from public files only and never references `.deuk-agent` paths.
- There is currently no direct test that locks the mirror payload against telemetry-specific leakage.

## Cause Hypotheses
- The OSS sync script is written as a top-level side-effect module, which makes it easy to test by behavior but harder to isolate without a small exported helper.
- The current coverage exercises telemetry summary behavior, but not the boundary between internal telemetry storage and public mirror packaging.
- Without an explicit test, future edits to the sync script could accidentally widen the mirrored file set.

## Decision Rationale
Add a small pure helper in `scripts/sync-oss.mjs` that constructs the mirrored package payload, then test that helper. This keeps the behavior stable without introducing a broad refactor or a fragile integration harness.

Alternative approaches were not chosen:
- Running the full sync script in a temp OSS workspace is heavier and depends on repository layout assumptions.
- Static string assertions on the source file would miss real contract drift in the mirrored package payload.

## Execution Strategy
1. Extract the OSS package payload construction into a named export.
2. Add a unit test that feeds a representative source package into that helper and asserts the mirrored `files` contract stays public-only.
3. Include an assertion that the payload does not introduce `.deuk-agent` or telemetry-specific paths.
4. Run the focused test plus the broader `node --test scripts/tests/*.test.mjs` suite.

## Verification Design
Commands:
- `node --test scripts/tests/sync-oss.test.mjs`
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/184-telemetry-internal-collection-mi-joy-nucb.md .deuk-agent/docs/plans/184-telemetry-internal-collection-mi-joy-nucb-plan.md`

Expected outcomes:
- The mirror helper keeps only public distributable paths in the OSS payload.
- Telemetry-specific internal paths are absent from the mirror contract.
- Markdown lint passes for the ticket and plan.

Residual risks:
- The test will verify the contract at the package-payload level, not by actually publishing to a remote OSS repository.

## Verification Outcome
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/184-telemetry-internal-collection-mi-joy-nucb.md .deuk-agent/docs/plans/184-telemetry-internal-collection-mi-joy-nucb-plan.md` passed.
- `node --test scripts/tests/sync-oss.test.mjs scripts/tests/cli-telemetry-commands.test.mjs scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs` passed.
- The OSS mirror helper now has a direct contract test that rejects `.deuk-agent` and `telemetry.jsonl` from the mirrored package payload.
