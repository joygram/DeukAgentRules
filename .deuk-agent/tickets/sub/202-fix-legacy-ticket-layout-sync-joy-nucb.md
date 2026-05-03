---
summary: 202-fix-legacy-ticket-layout-sync-joy-nucb
status: active
priority: P3
tags: migrated
id: 202-fix-legacy-ticket-layout-sync-joy-nucb
title: 202-fix-legacy-ticket-layout-sync-joy-nucb
createdAt: 2026-05-02 23:31:29
---

# 202-fix-legacy-ticket-layout-sync-joy-nucb

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in the ticket body only when they are stable.

## Scope & Constraints

- **Target:** ticket layout normalization and init sync paths.
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files.
- **Constraints:** no generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to init script path normalization and legacy ticket layout sync.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots.
- Rule citation: `PROJECT_RULE.md` + `core-rules/AGENTS.md`

### [CONTRACT]
- Input: existing code/context required to implement the legacy ticket layout sync.
- Output: normalized ticket/group handling and stable ticket/plan layout behavior.
- Side effects: ticket + plan docs updates, scoped code changes only.

### [PATCH PLAN]
- Add and apply normalized ticket-group handling at all entry points.
- Keep ticket body compact and aligned to the current template.
- Avoid duplicate plan/ticket separation in persisted artifacts.

## Compact Plan

- **Problem:** legacy ticket-group aliases and malformed merged ticket bodies cause repeated archive churn and unclear final form.
- **Approach:** keep ticket-group normalization in the CLI entry paths, and store only the compact ticket plan in the ticket body.
- **Verification:** run the relevant CLI unit tests and a dry-run init to confirm no duplicate legacy churn and no split ticket/plan artifacts.
- **Linked Issues:** none.

## Tasks

- [x] Plan consolidation and legacy group normalization design.
- [x] `scripts/cli-utils.mjs` normalization update.
- [x] `cli-ticket-parser.mjs`, `cli-ticket-index.mjs`, `cli-init-commands.mjs` normalization application.
- [x] Unit/regression test verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
