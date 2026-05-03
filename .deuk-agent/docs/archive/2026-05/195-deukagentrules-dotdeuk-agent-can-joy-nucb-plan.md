---
summary: "Agent problem analysis and decision trace for 195-deukagentrules-dotdeuk-agent-can-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 22:11:32"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`.deuk-agent` still contains a mix of canonical and legacy document storage patterns.

- `docs/walkthroughs/` is the canonical home for report-style artifacts.
- `docs/scratch/` is intended to be ephemeral, but it currently contains at least one report-style markdown file that is duplicated elsewhere.
- `tickets/archive/tickets/` is a legacy archive shard that still holds the old root-ticket shape.

The result is a confusing directory tree where a reader can encounter both current and historical artifacts in the same location, even when the canonical target already exists.

## Source Observations
- `core-rules/AGENTS.md` treats `docs/scratch/` as ephemeral scratch space.
- `scripts/cli-init-commands.mjs` already performs legacy structure migration and report migration during `init`.
- `.deuk-agent/docs/scratch/065-doc-lint-after-document-write-ru-joy-nucb-report.md` duplicates the canonical report in `.deuk-agent/docs/walkthroughs/`.
- `.deuk-agent/tickets/archive/tickets/044-deukagentrules-hardening-joy-nucb.md` is the only file left under the legacy `archive/tickets/` shard.

## Cause Hypotheses
- Earlier migrations normalized active tickets and walkthrough reports, but they did not fully prune every legacy residual path.
- Scratch space accumulated a report artifact that should have been kept only in walkthroughs.
- The old root-ticket archive shard remained after the ticket path recalculation fix, because the cleanup code only targeted the more common archive directories.

## Decision Rationale
- Extend the existing init migration rather than adding a separate one-off cleanup command.
- Remove duplicate scratch reports when a canonical walkthrough copy already exists.
- Migrate the legacy `archive/tickets/` shard into the canonical archive layout so the directory tree stops advertising an obsolete storage shape.

## Execution Strategy
- Add migration logic for scratch report cleanup and legacy archive shard relocation.
- Keep moves safe by deleting duplicate content only when the canonical destination already exists with identical content.
- Add regression tests for both the scratch report case and the archive shard case.

## Verification Design
- Run the focused init migration test file.
- Run markdown lint on the touched ticket and plan.
- Confirm the legacy scratch report disappears from `docs/scratch/` and the legacy archive shard no longer remains under `tickets/archive/tickets/`.

Residual risk:
- If `docs/scratch/` later accumulates a new report-like file with a different basename, the cleanup rule may need to be widened or paired with a stricter file-naming policy.

## Execution Notes

- Extended the init migration path to clean duplicate scratch reports and relocate the legacy `archive/tickets/` shard.
- Kept the migration conservative: duplicate content is removed only when the canonical target already exists with identical content.

## Verification Notes

- `node --test scripts/tests/cli-init-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/195-deukagentrules-dotdeuk-agent-can-joy-nucb.md .deuk-agent/docs/plans/195-deukagentrules-dotdeuk-agent-can-joy-nucb-plan.md`
- `npx deuk-agent-rule init --workflow execute --non-interactive`

Observed outcome:
- Duplicate scratch report `docs/scratch/065-doc-lint-after-document-write-ru-joy-nucb-report.md` was removed.
- Legacy archive shard `tickets/archive/tickets/044-deukagentrules-hardening-joy-nucb.md` was moved into `tickets/archive/sub/044-deukagentrules-hardening-joy-nucb.md`.
- `init` normalized the ticket index and synced the usual spoke files without reintroducing the legacy shard.
