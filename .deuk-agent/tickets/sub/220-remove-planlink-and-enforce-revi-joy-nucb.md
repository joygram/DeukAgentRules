---
id: 220-remove-planlink-and-enforce-revi-joy-nucb
title: remove-planlink-and-enforce-review-gate
phase: 1
status: open
docsLanguage: ko
summary: 이슈/회귀 보고는 티켓 생성 후 승인 전에는 시작하지 않도록 규칙/문서/테스트를 정리합니다.
priority: P2
tags: []
createdAt: 2026-05-03 09:06:04
---
# remove-planlink-and-enforce-review-gate

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `remove-planlink-and-enforce-review-gate`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "이슈/회귀 보고는 티켓 생성 후 승인 전에는 시작하지 않도록 규칙/문서/테스트를 정리합니다."
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "이슈/회귀 보고는 티켓 생성 후 승인 전에는 시작하지 않도록 규칙/문서/테스트를 정리합니다."
- Output: minimal implementation and tests that satisfy "이슈/회귀 보고는 티켓 생성 후 승인 전에는 시작하지 않도록 규칙/문서/테스트를 정리합니다."
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

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Root Cause

- The previous rules and docs still used an optional planning-record concept, which created room for extra planning layers.
- Issue/regression guidance existed, but it was not yet uniformly phrased as a hard stop after Phase 1 for user review.
- The implementation needed to collapse planning into the main ticket and make the review gate the only route to Phase 2.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
