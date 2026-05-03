---
createdAt: 2026-04-21 23:55:21
id: 001-044-deukagentrules-hardening-joy-nucb
phase: 4
planLink: .deuk-agent/docs/plans/001-044-deukagentrules-hardening-joy-nucb-plan.md
priority: P2
status: closed
summary: ticket next가 레거시 루트 티켓 경로를 .deuk-agent/tickets/tickets/...로 잘못 계산하는 문제를 수정한다.
tags:
  - tickets
  - cli
  - hardening
  - regression
title: 044-deukagentrules-hardening
---


# Task: ticket next 경로 재계산 하드닝 | ID: 001-044-deukagentrules-hardening-joy-nucb

## Scope Bounds

- **Target Submodule:** `scripts/cli-utils.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/tests/cli-utils.test.mjs`
- **Context Files:**
  - `core-rules/AGENTS.md`
  - `PROJECT_RULE.md`
  - `scripts/cli-ticket-commands.mjs`
  - `scripts/cli-ticket-index.mjs`
  - `.deuk-agent/tickets/INDEX.json`

## Files to Modify

- `scripts/cli-utils.mjs`: `computeTicketPath()`가 루트 레거시 티켓을 하위 `tickets/` 그룹으로 오인하지 않도록 경로 계산을 보강한다.
- `scripts/cli-ticket-parser.mjs`: 루트 티켓 파일을 인덱싱할 때 `group`과 파일명 정보를 안정적으로 보존한다.
- `scripts/tests/cli-utils.test.mjs`: 루트 티켓과 파일명 기반 경로 보존 회귀 테스트를 추가한다.

## Design Decisions

- 기존 인덱스는 path 스냅샷을 저장하지 않고 상태에서 동적으로 경로를 재계산한다.
- 루트 티켓(`.deuk-agent/tickets/*.md`)은 과거 데이터로 존재하므로, 신규 `sub/` 그룹 티켓과 함께 계속 읽을 수 있어야 한다.
- `ticket next --path-only`는 존재하는 티켓 파일 경로를 출력해야 하며, `.deuk-agent/tickets/tickets/...` 형태를 만들면 안 된다.

## Strict Constraints

- `INDEX.json`은 수동 편집하지 않는다.
- 생성/배포 산출물은 직접 수정하지 않는다.
- `bin/deuk-agent-rule.js`에는 비즈니스 로직을 추가하지 않는다.

## Agent Permission Contract

### [BOUNDARY]

- Editable modules: `scripts/cli-utils.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/tests/cli-utils.test.mjs`, 이 티켓 문서와 연결 plan 문서.
- Forbidden modules: `bin/deuk-agent-rule.js`, 생성된 consumer spokes, unrelated DeukPack/benchmark/report 산출물.
- Rule citation: `PROJECT_RULE.md`의 CLI Proxy 경계와 `DC-CODEGEN`; 실제 CLI 로직은 `scripts/`에서 수정한다.

### [CONTRACT]

- Input: `ticket next --path-only`가 존재하지 않는 `.deuk-agent/tickets/tickets/001-044-...md`를 출력한 재현 사례와 현재 티켓 인덱스/레거시 루트 티켓 구조.
- Output: 루트 레거시 티켓과 그룹 티켓 모두 존재 경로로 재계산되는 CLI 경로 로직 및 회귀 테스트.
- Side effects: 테스트 실행, 티켓/계획 문서 갱신, 필요 시 phase/status 갱신.

### [PATCH PLAN]

1. `processTicketFile()`에서 루트 티켓 파일을 별도 group 값으로 표현하고 파일명 기반 경로 복원에 필요한 정보를 보존한다.
2. `computeTicketPath()`가 루트 티켓과 일반 그룹 티켓을 모두 올바르게 계산하도록 수정한다.
3. 회귀 테스트로 루트 티켓 경로와 기존 `sub/`, `archive/` 경로를 검증한다.
4. `node --test scripts/tests/*.test.mjs` 및 `npx deuk-agent-rule lint:md`로 검증한다.

## Phased Execution Steps

0. [x] Phase 0: RAG/로컬 컨텍스트 확인
   - RAG ticket 검색으로 관련 planLink/티켓 탐색 안정화 이력을 확인했다.
   - rules 검색은 miss였고, 로컬 재현 사실을 RAG knowledge에 보강했다.
1. [x] Phase 1: 티켓/APC/planLink 정상화
2. [x] Phase 2: 경로 계산 및 인덱싱 로직 수정
   - `computeTicketPath()`가 `group: "tickets"` 레거시 루트 티켓을 루트 파일로 계산하도록 수정했다.
   - `processTicketFile()`이 실제 파일명을 `fileName`으로 보존하도록 수정했다.
3. [x] Phase 3: 회귀 테스트 및 lint 실행
   - `node --test scripts/tests/cli-utils.test.mjs`: 16개 테스트 통과.
   - `node --test scripts/tests/*.test.mjs`: 22개 테스트 통과.
   - `npx deuk-agent-rule ticket next --path-only`: 실제 파일 `.deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md` 출력 확인.
4. [x] Phase 4: 결과 기록 및 티켓 종료/아카이브
   - walkthrough report를 `.deuk-agent/docs/walkthroughs/001-044-deukagentrules-hardening-joy-nucb-report.md`에 기록한다.

## Verification / QA

- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md`
- [x] `npx deuk-agent-rule ticket next --path-only`가 존재하는 파일을 출력하는지 확인

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/044-deukagentrules-hardening-joy-nucb-report.md)
