---
id: 193-ticket-folder-canonicalization-joy-nucb
title: ticket-folder-canonicalization
phase: 3
status: closed
docsLanguage: ko
summary: 티켓 폴더와 레거시 티켓/보고서 흔적을 init 마이그레이션으로 정본 구조로 정리
priority: P2
tags:
  - tickets
  - migration
  - reports
  - archive
  - phase1
createdAt: 2026-05-02 21:57:58
---


# ticket-folder-canonicalization

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `ticket-folder-canonicalization`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/193-ticket-folder-canonicalization-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "티켓 폴더와 레거시 흔적을 init 마이그레이션으로 정본 구조로 정리"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "티켓 폴더와 레거시 흔적을 init 마이그레이션으로 정본 구조로 정리"
- Output: minimal implementation and tests that satisfy "티켓 폴더와 레거시 흔적을 init 마이그레이션으로 정본 구조로 정리"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
- Legacy report artifacts now live under `.deuk-agent/docs/walkthroughs/`, and empty legacy ticket folders are removed by init migration.
