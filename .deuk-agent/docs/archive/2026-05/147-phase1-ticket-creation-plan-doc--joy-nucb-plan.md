---
summary: "Phase 1은 티켓 생성과 계획 기록의 규격화 단계로 정의하고, 티켓 생성 자체를 코드 수정 승인 게이트와 분리한다."
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 13:03:58"
---

# Execution Plan

## Goal
- Phase 1을 "티켓 생성 + 검색 가능한 계획/보고 기록" 단계로 재정의하고, 코드 수정이 아닌 티켓/계획 작성 때문에 불필요하게 대기하거나 중복 티켓을 만들지 않도록 룰 문구를 정리한다.

## Evidence
- 현재 `core-rules/AGENTS.md`는 Phase 1의 STOP 조건을 "Wait for user approval"로 고정한다.
- 이 때문에 사용자가 "다음티켓", "진행"처럼 실행 의도를 말해도 에이전트가 계획 문서만 채우고 대기한다.
- `planLink`의 목적은 실행 승인 장벽 자체가 아니라, 계획과 판단 근거를 규격화해 RAG 검색과 사후 추적을 쉽게 만드는 것이다.
- 티켓 생성과 계획 문서 작성은 코드 수정이 아니므로, 코드 쓰기 권한과 같은 의미로 취급하면 TDW가 과도하게 느려진다.

## Steps
- [x] `core-rules/AGENTS.md`에서 Phase 1 설명을 티켓 생성/APC/planLink 기록 단계로 정리한다.
- [x] Phase 1 STOP 조건을 "명시 실행 의도가 없으면 확인"으로 바꾸고, 명시 실행 의도가 있으면 Phase 2로 전환할 수 있게 한다.
- [x] `G1.1`, `G1.2`를 코드 쓰기 전 안전장치로 유지하되, 티켓/계획 문서 작성과 코드 수정의 차이를 명확히 한다.
- [x] `docs/principles.ko.md`, `docs/usage-guide.ko.md`, `docs/how-it-works.ko.md` 중 Phase 1/2 의미가 어긋나는 문구를 갱신한다.
- [x] 변경된 markdown 파일 lint를 실행한다.

## Verification
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/147-phase1-ticket-creation-plan-doc--joy-nucb.md .deuk-agent/docs/plans/147-phase1-ticket-creation-plan-doc--joy-nucb-plan.md`

## Expected Outcomes
- "티켓 생성 = Phase 1" 의미가 유지된다.
- `planLink`는 중복 티켓 생산 장치가 아니라 검색 가능한 계획/보고 문서로 설명된다.
- 사용자의 실행 의도가 명확하면 완료된 Phase 1에서 Phase 2로 이어갈 수 있다.
- 생성물 및 고위험 변경에 대한 명시 승인 요구는 유지된다.
