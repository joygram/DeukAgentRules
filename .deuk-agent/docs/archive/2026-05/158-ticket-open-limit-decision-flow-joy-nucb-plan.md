---
summary: "오픈 티켓 상한 초과 시 사용자 결정 흐름으로 전환하는 설계 기록"
status: ready
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 21:36:19"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
직전 구현은 20개 초과 시 가장 오래된 오픈 티켓을 자동 아카이브한다. 사용자는 자동 정리가 아니라 티켓 목록을 보고 정리 대상을 직접 판단하기를 원한다. 티켓은 작업 맥락과 의사결정 기록이므로, CLI가 임의로 보관 상태를 바꾸면 사용자의 우선순위 판단을 건너뛸 위험이 있다.

## Source Observations
직전 구현의 `scripts/cli-ticket-commands.mjs`는 티켓 생성 후 자동 정리 함수를 호출해 대상 파일을 이동하고 인덱스를 변경했다. `runTicketArchive`의 날짜 그룹 아카이브 경로는 수동 보관 흐름에 필요하므로 유지해야 한다. 테스트에는 자동 아카이브 동작을 기대하는 케이스가 추가되어 있었다.

## Cause Hypotheses
오픈 티켓 수 제한과 문서 정리를 같은 자동 동작으로 묶어버린 것이 문제다. 제한 정책은 필요하지만, 정리 대상 선택은 사용자의 업무 판단이 들어가야 한다.

## Decision Rationale
`ticket create`는 새 티켓 파일을 만든 뒤 오픈/액티브 수를 검사한다. 20개를 초과하면 생성된 새 티켓을 롤백하고, 오래된 후보 목록과 `ticket list`/`ticket archive` 명령을 안내하며 실패한다. 이렇게 하면 오픈 티켓은 20개를 넘지 않고, 정리 대상 선택은 사용자가 목록을 확인한 뒤 결정한다. 수동 `ticket archive`의 년월/일 그룹 보관 기능은 유지한다.

## Execution Strategy
자동 아카이브 헬퍼를 초과 검사/메시지 생성 헬퍼로 바꾼다. 생성 흐름에서는 인덱스 추가 후 초과 여부를 검사하고, 초과면 방금 만든 티켓 파일과 planLink를 제거한 뒤 인덱스를 이전 상태로 되돌리고 오류를 던진다. 테스트는 자동 이동 기대를 제거하고, 21번째 생성이 실패하며 후보 목록과 정리 명령을 안내하는지 검증한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs`로 집중 검증하고, 이후 `node --test scripts/tests/*.test.mjs`와 `npx deuk-agent-rule lint:md`를 실행한다.

## Verification Outcome
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` 통과. `node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과.
