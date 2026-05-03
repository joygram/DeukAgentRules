---
summary: "ticket next가 레거시 루트 티켓 경로를 .deuk-agent/tickets/tickets/...로 잘못 계산하는 문제를 수정한다."
status: active
priority: P2
tags:
  - plan
  - tickets
  - cli
  - hardening
---

# ticket next 경로 재계산 하드닝 계획

## 목표

`npx deuk-agent-rule ticket next --path-only`가 항상 실제 존재하는 티켓 파일 경로를 출력하도록, 루트 레거시 티켓과 그룹 티켓의 경로 재계산 로직을 정리한다.

## 실행 단계

- [x] 현재 티켓이 placeholder 상태인지 확인하고 작업 범위를 실제 재현 이슈로 축소한다.
- [x] `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-index.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/cli-utils.mjs`의 경로 흐름을 확인한다.
- [x] `processTicketFile()`이 파일명을 보존하도록 수정한다.
- [x] `computeTicketPath()`에 루트 티켓과 파일명 보존 케이스를 반영한다.
- [x] 회귀 테스트를 추가해 `sub/`, `archive/`, 루트 레거시 티켓 경로를 검증한다.
- [x] 전체 테스트와 markdown lint를 실행하고 결과를 티켓에 반영한다.

## 검증

- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md`
- [x] `npx deuk-agent-rule ticket next --path-only`

## Rollback

- CLI 로직 변경은 `scripts/cli-utils.mjs`, `scripts/cli-ticket-parser.mjs`, 테스트 추가분을 되돌리면 된다.
- `INDEX.json`은 수동 편집하지 않으며, 필요 시 CLI rebuild 명령으로만 재생성한다.
