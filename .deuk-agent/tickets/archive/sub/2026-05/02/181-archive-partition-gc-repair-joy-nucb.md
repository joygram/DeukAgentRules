---
id: 181-archive-partition-gc-repair-joy-nucb
title: archive-partition-gc-repair
phase: 4
status: closed
docsLanguage: ko
summary: 월별 INDEX.archive.json 파티셔닝, 오래된 archive GC, rebuild/repair 경로의
  partition-aware 정비
priority: P2
tags: []
createdAt: 2026-05-02 10:26:29
planLink: .deuk-agent/docs/plans/181-archive-partition-gc-repair-joy-nucb-plan.md
---


# archive-partition-gc-repair

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `archive-partition-gc-repair`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/181-archive-partition-gc-repair-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "월별 INDEX.archive.json 파티셔닝, 오래된 archive GC, rebuild/repair 경로의 partition-aware 정비"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "월별 INDEX.archive.json 파티셔닝, 오래된 archive GC, rebuild/repair 경로의 partition-aware 정비"
- Output: minimal implementation and tests that satisfy "월별 INDEX.archive.json 파티셔닝, 오래된 archive GC, rebuild/repair 경로의 partition-aware 정비"
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
