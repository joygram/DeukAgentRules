---
summary: 206-remove-legacy split reference-from-tickets-joy-nucb
status: closed
priority: P3
tags: migrated
id: 206-remove-legacy split reference-from-tickets-joy-nucb
title: 206-remove-legacy split reference-from-tickets-joy-nucb
createdAt: 2026-05-03 07:16:33
phase: 4
---


# 206-remove-legacy split reference-from-tickets-joy-nucb

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** ticket normalization, init migration, and final single-ticket cleanup for all legacy split artifacts.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-init-commands.mjs`, `scripts/cli-ticket-commands.mjs`, and relevant ticket templates.
- **Constraints:** no unrelated refactors, no generated output edits, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket parsing, init migration, ticket markdown normalization, and cleanup paths.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots.
- Rule citation: `PROJECT_RULE.md` + `core-rules/AGENTS.md`

### [CONTRACT]
- Input: existing ticket/plan layout, `legacy split reference` migration behavior, and duplicate ticket records.
- Output: a single canonical ticket per issue with no surviving split artifacts.
- Side effects: scoped ticket updates, archive cleanup, and removal of redundant ticket/docs records.

### [PATCH PLAN]
- Consolidate ticket content into the main ticket body.
- Remove legacy split reference-based split records, legacy references, and duplicate ticket records.
- Keep only compact planning and lifecycle evidence in the canonical ticket.

## Compact Plan

- **Problem:** the same issue is still represented by split ticket/plan artifacts and duplicate ticket bodies, which violates the single-canonical-ticket rule.
- **Approach:** merge plan content into the canonical ticket body, delete archived plan leftovers after merge, and remove redundant ticket records so only one final ticket artifact remains per issue.
- **Verification:** inspect ticket markdown for template shape, confirm no `legacy split reference:` remains, confirm merged plan files are removed, and confirm only one canonical ticket exists per issue.
- **Linked Issues:** use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.
- [x] Enforce single-ticket-per-issue policy.
- [x] Consolidate legacy ticket records into one canonical ticket.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
