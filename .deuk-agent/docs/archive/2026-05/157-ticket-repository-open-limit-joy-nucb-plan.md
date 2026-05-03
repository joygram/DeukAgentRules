---
summary: "오픈 티켓 상한과 날짜 그룹형 아카이브 설계 기록"
status: ready
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 21:30:46"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 티켓 저장소는 완료 티켓을 `archive/<group>/` 아래에 평평하게 쌓는다. 장기간 사용 시 아카이브 디렉터리와 목록이 커져 탐색성과 문서 관리성이 떨어진다. 또한 새 티켓 생성 시 이전 활성 티켓 하나만 자동 close 처리하고, 전체 오픈 티켓 수가 늘어나는 상황은 제한하지 않는다.

## Source Observations
`scripts/cli-ticket-commands.mjs`의 `runTicketCreate`가 티켓 파일을 만들고 `appendTicketEntry` 후 `syncActiveTicketId`를 호출한다. 같은 파일의 `runTicketArchive`는 티켓을 `archive/<group>/`로 이동하고 지식 증류와 인덱스 상태 변경을 수행한다. `scripts/cli-utils.mjs`의 `computeTicketPath`는 archived 상태의 표준 경로를 계산하며 기존 테스트는 평평한 archive 경로를 기대한다.

## Cause Hypotheses
티켓 생성 흐름에 저장소 상한 정책이 없어서 닫히지 않은 티켓이 누적된다. 아카이브 흐름도 시간 기반 파티션을 갖지 않아 오래된 문서가 한 디렉터리에 계속 섞인다.

## Decision Rationale
정책은 CLI 내부에서 자동 적용하는 편이 가장 일관적이다. 별도 수동 정리 명령만 추가하면 사용자가 잊는 순간 오픈 티켓 상한이 깨질 수 있다. 완료/취소 티켓을 우선 정리 대상으로 삼고, 그래도 초과하면 가장 오래된 오픈 티켓을 보관해 새 티켓 생성 후 오픈/액티브 수가 20개를 넘지 않게 한다. 아카이브 경로는 생성일 기준 `YYYY-MM/DD`로 나누어 문서가 시간순으로 자연스럽게 묶이게 한다.

## Execution Strategy
티켓 명령 모듈에 상수와 헬퍼를 추가해 오픈 티켓 집합, 아카이브 날짜 파티션, 자동 정리 대상을 계산한다. `runTicketArchive`는 공용 헬퍼를 통해 새 경로를 사용하게 바꾸고, `runTicketCreate`는 티켓 추가 직후 상한 초과분을 자동 아카이브한 뒤 인덱스와 활성 티켓 포인터를 동기화한다. 경로 계산 유틸과 테스트 기대값도 날짜 그룹 경로에 맞춘다.

## Verification Design
`node --test scripts/tests/*.test.mjs`로 티켓 생성/아카이브/경로 계산 회귀를 검증한다. 마크다운 변경 후 `npx deuk-agent-rule lint:md`를 실행한다. 자동 정리 대상이 사용 중인 활성 티켓을 잘못 보관하지 않는지와 기존 아카이브 경로 재빌드가 유지되는지가 남은 주요 확인 지점이다.

## Verification Outcome
`node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과. 집중 검증으로 `node --test scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs`도 먼저 통과했다.
