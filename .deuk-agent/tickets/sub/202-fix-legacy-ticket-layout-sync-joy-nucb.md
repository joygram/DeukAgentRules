---
id: 202-fix-legacy-ticket-layout-sync-joy-nucb
title: fix-legacy-ticket-layout-sync
phase: 2
status: active
docsLanguage: ko
summary: init 스크립트 경로 정규화 + 레거시 티켓 레이아웃 동기화 수정
priority: P2
tags: []
createdAt: 2026-05-02 23:31:29
---


# fix-legacy-ticket-layout-sync

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `fix-legacy-ticket-layout-sync`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/202-fix-legacy-ticket-layout-sync-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "init 스크립트 경로 정규화 + 레거시 티켓 레이아웃 동기화 수정"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "init 스크립트 경로 정규화 + 레거시 티켓 레이아웃 동기화 수정"
- Output: minimal implementation and tests that satisfy "init 스크립트 경로 정규화 + 레거시 티켓 레이아웃 동기화 수정"
- Side effects: ticket + plan docs updates, scoped code changes only

## Compact Plan
- **Problem**: `computeTicketPath` 및 인덱스/파서가 legacy group(`tickets`, `ticket` 등)을 정규화 없이 사용하여 archive 경로 churn가 반복됨.
- **Approach**: `scripts/cli-utils.mjs`에 `normalizeTicketGroup`을 도입하여 모든 티켓 경로 계산/파싱 진입점에서 legacy alias를 `sub`로 통합.
- **Verification**: `cli-utils.test.mjs` 및 `cli-init-commands.test.mjs` 단위 테스트 실행 및 `init --dry-run`으로 churn 제거 확인.
- **Linked Issues**: none

## Tasks

- [x] Plan 통합 및 legacy group 정규화 설계
- [ ] `scripts/cli-utils.mjs`에 `normalizeTicketGroup` 추가 및 적용
- [ ] `cli-ticket-parser.mjs`, `cli-ticket-index.mjs`, `cli-init-commands.mjs` 정규화 적용
- [ ] 단위 테스트 및 회귀 테스트 검증

- [ ] Execute changes inside APC boundary.
- [ ] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
