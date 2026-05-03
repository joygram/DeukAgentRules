---
id: 180-index-json-분리-및-경량화-joy-nucb
title: INDEX.json 분리 및 경량화
phase: 4
status: closed
docsLanguage: ko
summary: INDEX.json을 active/archive 중심으로 분리하고 경량화해 파일시스템 DB 안정성을 높인다
priority: P2
tags:
  - index
  - storage
  - partition
createdAt: 2026-05-02 10:21:19
planLink: .deuk-agent/docs/plans/180-index-json-분리-및-경량화-joy-nucb-plan.md
---


# INDEX.json 분리 및 경량화

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `INDEX.json 분리 및 경량화`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/180-index-json-분리-및-경량화-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "INDEX.json을 active/archive 중심으로 분리하고 경량화해 파일시스템 DB 안정성을 높인다"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "INDEX.json을 active/archive 중심으로 분리하고 경량화해 파일시스템 DB 안정성을 높인다"
- Output: minimal implementation and tests that satisfy "INDEX.json을 active/archive 중심으로 분리하고 경량화해 파일시스템 DB 안정성을 높인다"
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
