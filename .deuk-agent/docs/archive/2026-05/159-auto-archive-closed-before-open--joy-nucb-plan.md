---
summary: "closed 계열 자동 아카이브와 open/active 사용자 결정 분리 설계"
status: ready
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 21:39:29"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 초과 생성 시 open/active 정리는 사용자 결정으로 남기도록 되어 있다. 다만 이미 `closed`, `cancelled`, `wontfix`처럼 완료된 티켓까지 사용자 판단을 요구하면 불필요하게 티켓 저장소가 지저분해진다.

## Source Observations
`scripts/cli-ticket-commands.mjs`에는 수동 아카이브와 같은 파일 이동/지식 증류 헬퍼가 있다. `runTicketCreate`는 새 티켓 생성 후 오픈 티켓 상한 검사를 수행하고, 초과 시 생성물을 롤백한다.

## Cause Hypotheses
완료 상태와 진행 상태를 같은 초과 처리 정책으로 묶으면 자동화 가능한 정리와 사용자 의사결정이 필요한 정리가 구분되지 않는다.

## Decision Rationale
closed 계열 티켓은 생성 직후 자동 아카이브해도 실행 중인 작업 의사결정을 침해하지 않는다. 반면 open/active는 여전히 목록 확인 후 사용자가 선택해야 한다. 따라서 자동 정리는 완료 상태에만 적용하고, 그 뒤에도 오픈/액티브 수가 20개를 넘으면 생성 롤백과 후보 안내를 유지한다.

## Execution Strategy
티켓 생성 흐름에서 상한 검사 전에 closed 계열 엔트리를 자동 아카이브한다. 수동 아카이브와 같은 `archiveTicketEntry`를 재사용해 날짜 그룹 경로를 유지한다. 테스트는 closed 티켓이 자동 아카이브되어 새 티켓 생성이 성공하는 케이스와, open만 20개인 경우 여전히 생성이 차단되는 케이스를 검증한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs`, `node --test scripts/tests/*.test.mjs`, `npx deuk-agent-rule lint:md`를 실행한다.

## Verification Outcome
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` 통과. `node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과.
