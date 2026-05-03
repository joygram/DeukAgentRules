---
id: 221-remove-planlink-residual-fixture-joy-nucb
title: remove-planlink-residual-fixtures
phase: 1
status: open
docsLanguage: ko
summary: 규칙 표면에서 를 제거한 뒤에도 테스트 fixture와 동기화 파일에 남은 잔재를 정리하고, 검색 결과에서 더 이상 계획 링크가
  반복적으로 노출되지 않도록 합니다.
priority: P2
tags: []
createdAt: 2026-05-03 09:11:22
---
# remove-planlink-residual-fixtures

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `remove-planlink-residual-fixtures`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "규칙 표면에서 를 제거한 뒤에도 테스트 fixture와 동기화 파일에 남은 잔재를 정리하고, 검색 결과에서 더 이상 계획 링크가 반복적으로 노출되지 않도록 합니다."
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "규칙 표면에서 를 제거한 뒤에도 테스트 fixture와 동기화 파일에 남은 잔재를 정리하고, 검색 결과에서 더 이상 계획 링크가 반복적으로 노출되지 않도록 합니다."
- Output: minimal implementation and tests that satisfy "규칙 표면에서 를 제거한 뒤에도 테스트 fixture와 동기화 파일에 남은 잔재를 정리하고, 검색 결과에서 더 이상 계획 링크가 반복적으로 노출되지 않도록 합니다."
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** Record the stable issue once in this main ticket. Do not duplicate design or analysis in follow-up tickets.
- **Approach:** Capture the selected design and analysis path here, including root cause, constraints, and the implementation direction. Split related follow-up work into sub tickets instead of expanding this record.
- **Verification:** List the smallest relevant commands or checks and the expected result.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [ ] Complete compact plan and APC.
- [ ] Execute changes inside APC boundary.
- [ ] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
