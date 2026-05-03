---
summary: "Agent problem analysis and decision trace for 198-검증-디렉토리정리-초기화-완결성-joy-nucb-plan"
status: done
priority: P2
tags:
  - plan
  - phase1
  - verification
createdAt: "2026-05-02 22:33:04"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
핵심 질문은 “`init` 마이그레이션 정규화가 끝난 뒤에도 `.deuk-agent`에 레거시 디렉토리와 문서 위치가 잔존하는지”였다.
과거 정리 과정에서 대량 이동이 발생했고, 현재 트리는 일부가 정리되지 않은 채 남아 있거나 월별 보관 규칙을 벗어난 경로가 있을 가능성이 있어 회귀 점검이 필요했다.

## Source Observations
### 실행 명령
- `find .deuk-agent -maxdepth 3 -type d`
- `find .deuk-agent/tickets -maxdepth 2 -type d`
- `find .deuk-agent/docs/archive -maxdepth 3 -type f`
- `npx deuk-agent-rule init --workflow execute --dry-run`

### 핵심 관찰
- `.deuk-agent` 최상위는 현재 `config.json`, `telemetry.jsonl`, `docs`, `knowledge`, `tickets`만 보유한다.
- `tickets`는 `archive/sub`, `sub`만 보유한다.
- `docs`의 archive는 `plans/2026-04`, `plans/2026-05`, `walkthroughs/2026-04`, `walkthroughs/2026-05`로만 존재한다.
- 레거시 후보 경로(`tickets/core`, `tickets/main`, `tickets/global`, `tickets/reports`, `tickets/archive/core`, `tickets/archive/main`, `tickets/archive/global`)는 모두 존재하지 않는다.
- `init --dry-run` 실행 결과는 spoke sync 로그 외에 추가 마이그레이션 이동 로그를 출력하지 않았다.
- 활성 `sub` 티켓은 총 2건(과거 잔여 179, 이번 검증 198)이며, 목표 범위(디렉토리 정합성)와 무관한 잔여 작업은 별도 티켓에서 지속 추적 필요.

## Cause Hypotheses
1. 과거 이행 중 `init` 결과가 부분 반영되어 일부 파일만 새 스키마로 이동된 상태일 수 있다.
2. 월별 archive 이동은 과거 경로와 섞여 공존했을 가능성이 있으므로 `init` 기준점에서 다시 정규화가 필요한 시점이 있을 수 있다.
3. dry-run에서만 정합하고 실제 실행에서는 정책/조건이 달라져 잔재가 남을 수 있다.

## Decision Rationale
실행 계획은 `init` dry-run 중심 검증을 채택했다.

이유는 두 가지다.
1) 실제 변경 없이 정합성만 판별할 수 있어 회귀에 안전하다.
2) 레거시 탐지 지표가 명확한 상태(예: 경로 존재 여부, month-bucket 규칙 충족, 문서 이동 로그 미발생) 기반으로 재현 가능하다.

대안인 강제 재실행은 현재 상태에서 불필요한 추가 변경 리스크가 커 우선순위가 낮다.

## Execution Strategy
1. 현재 트리 기준으로 레거시/월별 bucket 규칙의 구조 정합성만 판별한다.
2. `init --workflow execute --dry-run`으로 이동 정책 충돌 여부를 확인한다.
3. 결과를 `archive`/`tickets`/`knowledge` 계열로 분리해 검증 보고한다.
4. 실패 항목이 발견되면 관련 스크립트 테스트(특히 `scripts/cli-init-logic.mjs`의 정규화 함수)로 증거를 얻는다.

## Verification Design
- `find .deuk-agent -maxdepth 3 -type d`
  - 기대: `.deuk-agent/{docs,tickets,knowledge}` 하위 레이어가 정규화 스키마를 만족하고 레거시 top-level dir가 없어야 함
- `find .deuk-agent/tickets/archive/sub -type d`
  - 기대: 월별 아카이브 구조(예: `YYYY-MM`) 보장
- `find .deuk-agent/docs/archive -maxdepth 3 -type f`
  - 기대: `archive/plans`, `archive/walkthroughs` 하위 월별 디렉토리만 존재
- `npx deuk-agent-rule init --workflow execute --dry-run`
  - 기대: 추가 병합/삭제 로그가 과도하게 없고 구조 위반이 없어야 함

## Result
요구한 정합성 검사 기준은 모두 충족되었다.

- 레거시 티켓/문서 루트 잔재 없음 확인.
- 월별 아카이브 구조 준수 확인.
- `init --dry-run` 단계에서 대규모 추가 마이그레이션 로그 미발생.

남은 리스크:
- 현재 작업 트리가 이미 다수의 이전 정리 변경으로 뒤섞인 상태라(아카이브/레거시 경로 다수 삭제/이동된 흔적) 장기적으로 `index` 파일 정합성 재생성이 더 필요할 수 있음.
- `tickets/sub`에 179번 과거 티켓이 남아 있어, 본 티켓 범위를 넘는 정리 항목으로 별도 추적이 필요.
