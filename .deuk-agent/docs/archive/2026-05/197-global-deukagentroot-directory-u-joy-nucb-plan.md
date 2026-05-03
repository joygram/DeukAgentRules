---
summary: "DeukPack/DeukAgentRules/DeukAgentContext .deuk-agent 디렉터리 정리 실행 분석"
status: done
priority: P2
tags:
  - directory-hygiene
  - tickets
  - docs
  - migration
createdAt: "2026-05-02 22:27:28"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Ticket `197-global-deukagentroot-directory-u-joy-nucb` owns the scoped contract, phase gates, and lifecycle checklist.
- This plan contains only the analysis and execution trace requested for Phase 1 and verification planning.

## Problem Analysis
- Three worktrees (`DeukPack`, `DeukAgentRules`, `DeukAgentContext`) no longer have consistent `.deuk-agent` layout in `docs` and `tickets`.
- `DeukPack` and `DeukAgentContext` have large active `docs/plans`/`docs/walkthroughs` trees at root without archive partitioning.
- `DeukAgentRules` has a partially normalized doc archive plus active root docs; not obviously wrong, but mixed legacy/open artifact placement persists across all 3 repos.
- Ticket trees include multiple legacy/uneven archive groupings (`archive/main`, `archive/core`, `archive/global`, `archive/tickets` nesting), and `archive/tickets` still exists in `DeukAgentContext`.
- `archive/sub` is used but at different depths: `DeukPack` and some items in `DeukAgentRules` are depth-3 (`archive/sub/<file>.md`) while `DeukRules/Context` contain depth-4+ (`archive/sub/YYYY-MM/DD/<file>.md`) patterns.

## Source Observations
- `DeukAgentRules/core-rules/AGENTS.md` version is `25`; this task already has open ticket `197` in progress and currently has no `ACTIVE_TICKET` lock.
- Relevant CLI migration helpers exist in `DeukAgentRules/scripts/cli-ticket-migration.mjs` and `cli-init-commands.mjs`.
  - `migrateLegacyArchiveTickets()` handles legacy `archive/tickets/*` → `archive/sub/*`.
  - `normalizeTicketPaths()` repairs index/path drifts after moves.
- `DeukAgentRules/scripts/cli-utils.mjs` defines canonical ticket folder roots and archive path policy as `AGENT_ROOT_DIR/tickets/archive/<group>/<...>`.
- `DeukPack` currently has no `.deuk-agent/docs/archive` and all archive ticket markdown files are flat under `tickets/archive/sub`.
- `DeukAgentContext` currently has both `tickets/archive/sub` and legacy `tickets/archive/tickets` with month/day nesting.
- `DeukAgentRules` already has `.deuk-agent/docs/archive/{plans,walkthroughs}` but most historical docs in this repo are mixed with active root docs and are not consistently archived by status.

## Cause Hypotheses
- Migration and archival tools were applied per repository at different times and with different target options, producing mixed layouts.
- One-off cleanup focused on specific subtrees (e.g., only plan docs in one repo) without synchronized execution across sibling repos.
- Legacy archive folders (`archive/tickets`, `archive/core`, `archive/global`, `archive/main`) were retained as historical residue instead of being normalized to a unified active layout.
- Active-vs-closed doc split was not consistently enforced in bulk cleanup runs, so non-active docs remained at root.

## Decision Rationale
- Keep open tickets/docs available in the canonical active positions (`tickets/sub/*.md`, active docs under `docs/plans`/`walkthroughs`).
- Move non-open documentation under monthly archive partitions per repo to improve discoverability and parity with earlier cleanup decisions (`.deuk-agent/docs/archive/<type>/<YYYY-MM>`).
- Normalize legacy ticket archive locations by moving `tickets/archive/tickets` into `tickets/archive/sub` and pruning now-empty legacy archive containers.
- Avoid aggressive reclassification of ticket `status` itself; only file-path migration and consistency cleanup are performed, with index reconciliation afterward.
- Do not rename or edit ticket content unless required by existing tooling (`summary`/`planLink` migration is out of scope for this ticket).

## Execution Strategy
- Fill ticket 197 with a concrete contract and keep `planLink` as the detailed reasoning artifact.
- For each workspace in scope (`DeukPack`, `DeukAgentRules`, `DeukAgentContext`):
  1. Snapshot current ticket and doc counts (docs: plans/walkthroughs, tickets: sub/archive).
  2. Back up candidate move sets by dry-run style inspection: identify docs tied to currently open tickets and leave them in active locations; move the rest to archive.
  3. Build doc destination as `.deuk-agent/docs/archive/{plans|walkthroughs}/<YYYY-MM>/`.
     - `YYYY-MM` source fallback: ticket frontmatter `createdAt` month where ticket is found; if missing, use file mtime month.
  4. Normalize ticket archive trees:
     - `tickets/archive/tickets/*` → `tickets/archive/sub/*` (when duplicates/content identical, keep canonical destination).
     - Remove now-empty legacy archive dirs (`archive/main`, `archive/core`, `archive/global`, legacy `archive/tickets`) to reduce drift.
  5. Run rebuild/validation paths for ticket index consistency after moves.
- Track migration evidence and deltas in the existing walkthrough/report output and final ticket comments.

## Verification Design
- Structural checks per workspace after each phase:
  - `find .deuk-agent/docs -maxdepth 3 -type d` and `find .deuk-agent/docs/archive -maxdepth 4 -type f -name '*.md'` confirm archive partition presence.
  - `find .deuk-agent/tickets -maxdepth 4 -type d | sort` confirms no legacy archive groups remain.
  - Ticket and doc counts before/after by type (`plans`, `walkthroughs`, `tickets/sub`, `tickets/archive`).
- Tooling checks:
  - `npx deuk-agent-rule lint:md` on the 197 ticket+plan and touched artifacts before lifecycle transition.
  - `npx deuk-agent-rule ticket list --non-interactive --json` in each repo if available to confirm open/archived visibility.
  - Rebuild ticket index where needed to synchronize moved paths.
- Residual risk log:
  - Missing/duplicate ticket IDs in docs may force fallback archive month by mtime; those cases should be recorded in migration log.
  - Duplicate destination filenames require skip/overwrite policy verification before execution.

## Execution Log
- Applied one-pass cleanup on:
  - `/home/joy/workspace/DeukPack`
  - `/home/joy/workspace/DeukAgentRules`
  - `/home/joy/workspace/DeukAgentContext`
- Executed as a structural migration using:
  - ticket status map from `.deuk-agent/tickets/**/*.md` frontmatter.
  - active docs kept when status is `open`.
  - non-active docs moved to `.deuk-agent/docs/archive/{plans|walkthroughs}/YYYY-MM/`.
  - legacy ticket archive groups moved into canonical `.deuk-agent/tickets/archive/sub/...`.
- Result summary:
  - `DeukPack`: plans moved 83 / kept 45, walkthroughs moved 29 / kept 25, ticket legacy groups unchanged (none matched our legacy-group target set).
  - `DeukAgentRules`: plans moved 89 / kept 15, walkthroughs moved 49 / kept 3, ticket legacy groups moved 4.
  - `DeukAgentContext`: plans moved 24 / kept 32, walkthroughs moved 8 / kept 25, ticket legacy groups moved 2.
- Structural verification:
  - Archive docs now exist under monthly partitions in all repos.
  - Legacy ticket archive roots (`main`, `core`, `global`, `tickets`) no longer remain under each repository's `.deuk-agent/tickets/archive`.
- Tooling verification:
  - `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/197-global-deukagentroot-directory-u-joy-nucb.md .deuk-agent/docs/archive/plans/2026-05/197-global-deukagentroot-directory-u-joy-nucb-plan.md` passed.
  - `npx deuk-agent-rule ticket list --non-interactive --json` executed for each scope repo and returned valid JSON with expected open/archived distributions.
- Residual risks and open items:
  - Some repositories had existing historical `.deuk-agent` structural drift beyond this ticket scope; only requested directories were normalized.
  - Additional pass could normalize every pre-existing legacy `tickets/archive/*` branch depth pattern if strict canonical-depth policy changes.
