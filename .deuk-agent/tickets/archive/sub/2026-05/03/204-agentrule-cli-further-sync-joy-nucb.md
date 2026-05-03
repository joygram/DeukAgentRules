---
id: 204-agentrule-cli-further-sync-joy-nucb
title: agentrule-cli-further-sync
phase: 3
status: closed
docsLanguage: en
summary: Further reduce repetitive ticket/plan CLI flow and improve phase/status
  surfacing
priority: P2
tags: []
createdAt: 2026-05-03 03:56:57
---


# agentrule-cli-further-sync

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `agentrule-cli-further-sync`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/archive/2026-05/204-agentrule-cli-further-sync-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "Further reduce repetitive ticket/plan CLI flow and improve phase/status surfacing"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "Further reduce repetitive ticket/plan CLI flow and improve phase/status surfacing"
- Output: minimal implementation and tests that satisfy "Further reduce repetitive ticket/plan CLI flow and improve phase/status surfacing"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Compact Plan

- **Problem:** The ticket flow now works, but the default CLI output still produces too many repeated lines for agent-driven use. The main friction points are:
- **Approach:** Add a `--compact` flag to ticket argument parsing and document it in the CLI help.
- **Verification:** `node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` should pass.
- **Linked Issues:** none

## Tasks
- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
