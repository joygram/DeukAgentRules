---
summary: "Ticket folder canonicalization analysis and legacy report migration trace for 193-ticket-folder-canonicalization-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 21:57:58"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The ticket tree is still carrying multiple legacy shapes at once.

- Active tickets live under `.deuk-agent/tickets/sub/`.
- Historical archive shards live under `.deuk-agent/tickets/archive/`.
- Old root/group folders such as `core/`, `global/`, `main/`, and `tickets/` still exist as empty or semi-empty remnants.
- A legacy report file still lives under `.deuk-agent/tickets/reports/`, even though current report flow writes to `.deuk-agent/docs/walkthroughs/`.

The workspace is not wrong because of one broken path. It is noisy because canonical and legacy storage locations co-exist, which makes navigation and cleanup harder than necessary.

## Source Observations
- `scripts/cli-init-commands.mjs` already runs legacy structure migration, path normalization, frontmatter migration, and spoke/template sync in `init`.
- `scripts/cli-ticket-migration.mjs` contains `performUpgradeMigration()`, `performDefragmentation()`, and `normalizeTicketPaths()`, so the cleanup hook already exists.
- `scripts/cli-ticket-commands.mjs` writes reports to `.deuk-agent/docs/walkthroughs/` when attaching or auto-detecting reports.
- `scripts/tests/cli-ticket-commands.test.mjs` already expects `docs/walkthroughs` as the canonical report location.
- Legacy archived ticket `archive/sub/051-agent-fast-track-hardening-joy-nucb.md` still links to `../../reports/REPORT-051-agent-fast-track-hardening-joy-nucb.md`.

## Cause Hypotheses
- The migration path handled active tickets and archive shards, but not legacy report placement.
- Empty legacy ticket root folders were left behind after earlier directory reshaping.
- Old reports survived because archived ticket links still pointed at the legacy `tickets/reports/` location.

## Decision Rationale
- Extend the existing migration path instead of adding a separate cleanup command.
- Canonicalize report storage into `.deuk-agent/docs/walkthroughs/` so current behavior and historical artifacts use one report location.
- Remove or empty legacy folder shells only after their contents are moved or re-linked.
- Keep archive history intact while reducing the number of active storage roots.

## Execution Strategy
- Add migration steps for legacy ticket/report folder cleanup.
- Move or normalize legacy report artifacts into the canonical walkthrough/report area.
- Rebuild index state after file moves so active/archive paths stay consistent.
- Add regression coverage for the legacy report migration and cleanup behavior.

## Verification Design
- `npx deuk-agent-rule init --dry-run --workflow execute --non-interactive`
- `npx deuk-agent-rule init --workflow execute --non-interactive`
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/193-ticket-folder-canonicalization-joy-nucb.md .deuk-agent/docs/plans/193-ticket-folder-canonicalization-joy-nucb-plan.md`

Expected outcome:
- Legacy ticket/report folder noise is reduced without breaking archived ticket links.
- Canonical report storage remains under `.deuk-agent/docs/walkthroughs/`.
- Index and archive paths remain consistent after migration.

Residual risk:
- If any legacy ticket report is referenced outside the archive ticket tree, the migration may need a follow-up link repair ticket rather than a blind move.

## Execution Notes

- Extended the init migration path so it now handles legacy report files under `.deuk-agent/tickets/reports/`.
- Canonical report storage is now `.deuk-agent/docs/walkthroughs/`, and archived ticket links are rewritten to match their per-file relative path.
- Empty legacy ticket root folders `.deuk-agent/tickets/core/`, `.deuk-agent/tickets/global/`, `.deuk-agent/tickets/main/`, and `.deuk-agent/tickets/reports/` are pruned after migration.

## Verification Notes

- `node --test scripts/tests/cli-init-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/193-ticket-folder-canonicalization-joy-nucb.md .deuk-agent/docs/plans/193-ticket-folder-canonicalization-joy-nucb-plan.md`

Observed outcome:
- Legacy report `REPORT-051-agent-fast-track-hardening-joy-nucb.md` was moved into `.deuk-agent/docs/walkthroughs/`.
- Archived ticket `051-agent-fast-track-hardening-joy-nucb.md` now links to the canonical walkthrough path.
- Empty legacy ticket directories were removed during migration.
