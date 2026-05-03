---
summary: "Init migration analysis and ticket directory normalization trace for 192-ticket-directory-init-migration-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 21:54:48"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The ticket directory is no longer in a clean canonical shape. Recent lifecycle work and legacy migration paths have left the workspace with stale archive pointers, mixed index state, and a need to re-run the init migration path so the on-disk ticket tree matches current rules.

The `init` flow is the intended repair path because it already handles legacy structure migration, index path normalization, frontmatter supplementation, and duplicate pointer cleanup.

## Source Observations
- `scripts/cli-init-commands.mjs` runs `migrateLegacyStructure()`, `normalizeTicketPaths()`, `migrateMissingFrontmatter()`, and spoke/template sync in a fixed order.
- `scripts/cli-ticket-migration.mjs` already contains `performUpgradeMigration()`, `performDefragmentation()`, and `normalizeTicketPaths()` for ticket tree repair.
- `scripts/cli-init-logic.mjs` ensures `.deuk-agent/tickets/` and `.gitignore` are in the expected layout.
- `scripts/cli-ticket-index.mjs` rebuilds ticket index state from ticket and archive shards, so the migration must leave the index consistent with physical paths.

## Cause Hypotheses
- The workspace has accumulated legacy and current ticket states in the same tree over several lifecycle operations.
- Index entries may point at stale paths or rely on storage conventions that need a fresh normalization pass.
- Some ticket markdown artifacts may still carry old pointer/legacy structure that `init` can clean up.

## Decision Rationale
- Use the existing `init` migration path instead of inventing a one-off repair script.
- Keep the repair idempotent so the workspace can be normalized repeatedly without introducing new drift.
- Preserve archived history while restoring the active ticket tree and index consistency.

## Execution Strategy
- Capture the current ticket tree state and normalization rules in the plan.
- Run the init migration path against the workspace so legacy structure, stale paths, and duplicate pointers are repaired.
- Validate that the ticket directory, index, and archive split reflect the current canonical layout after migration.

## Verification Design
- `npx deuk-agent-rule init --dry-run --workflow execute --non-interactive`
- `npx deuk-agent-rule init --workflow execute --non-interactive`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/192-ticket-directory-init-migration-joy-nucb.md .deuk-agent/docs/plans/192-ticket-directory-init-migration-joy-nucb-plan.md`
- `npx deuk-agent-rule ticket list --json`

Expected outcome:
- The migration reports the intended ticket directory normalization steps.
- The active ticket tree and index align with current on-disk locations.
- Markdown lint still passes for ticket and plan.

Residual risk:
- If the migration encounters unrelated workspace churn, it may leave those files untouched by design, so we may need a follow-up ticket for any residual cleanup outside the ticket tree boundary.

## Verification Outcome
- `npx deuk-agent-rule init --dry-run --workflow execute --non-interactive` reported stale path normalization and spoke sync steps.
- `npx deuk-agent-rule init --workflow execute --non-interactive` applied the same normalization and synced the current pointer files.
- `npx deuk-agent-rule ticket list --json` now shows the new ticket as the active ticket and the open set is reduced to the canonical live tickets.
- `normalizeTicketPaths()` updated `.deuk-agent/tickets/INDEX.json`, which is the expected ticket directory repair step for this migration.
