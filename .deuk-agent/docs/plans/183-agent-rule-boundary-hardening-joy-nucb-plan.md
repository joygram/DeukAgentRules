---
summary: "문서 경계 반복 수정과 상태 전환 혼선을 막는 규칙 보강 계획"
status: draft
priority: P2
tags:
  - plan
  - phase1
  - rules
  - boundary
  - workflow
createdAt: "2026-05-02 11:06:51"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
최근 작업에서 티켓/plan 문서를 반복 수정하게 된 근본 원인은 규칙이 "문서는 계획 기록"이라는 점과 "workflow 상태 정합성"을 너무 가깝게 묶어 놓았기 때문입니다. 그 결과 문서 경계가 한 번 정해진 뒤에도, phase 전환이나 archive 과정에서 다시 손대야 할 것처럼 느껴졌습니다.

이 티켓의 목표는 코드 수정이 아니라 에이전트룰 보강입니다. 특히 다음 혼선을 줄여야 합니다.
- Phase 1 이후에도 planLink/ticket 본문을 반복 갱신하는 습관
- 상태 전환이나 archive가 문서 경계 재수정으로 이어지는 관성
- 내부 workflow event 수집과 문서 기록을 같은 축으로 취급하는 해석

핵심은 "문서 경계는 한 번 정하고, 상태는 별도 이벤트로 기록"하는 분리입니다.

## Source Observations
- [core-rules/AGENTS.md](../../../core-rules/AGENTS.md) 는 Phase 1에서 티켓과 planLink를 채우고, Phase 2에서 실행하라고 요구합니다.
- 같은 문서는 `planLink`에 진행 체크박스를 두지 말고, 티켓만 상태를 가진다고 명시합니다.
- [PROJECT_RULE.md](../../../PROJECT_RULE.md) 는 `scripts/`가 CLI business logic의 소유지라고만 정리하고 있어, 문서 경계의 반복 수정 금지 규칙은 아직 명시되지 않았습니다.
- [scripts/cli.mjs](../../../scripts/cli.mjs) 와 ticket lifecycle 명령은 상태 전환을 수행하지만, 문서 경계를 다시 써야 한다는 규칙은 없습니다.

## Cause Hypotheses
- 규칙이 "Phase 전환 = 문서 업데이트"처럼 오해되기 쉽습니다.
- 상태 전환과 문서 기록의 책임 경계가 분리되어 있지 않습니다.
- 티켓/plan이 같이 움직여야 한다는 압박 때문에, 문서가 작업 로그처럼 반복 수정됩니다.

## Decision Rationale
- 티켓은 identity, scope, contract, lifecycle만 갖고, planLink는 한 번 완성되면 사실상 고정되는 기록으로 다룹니다.
- 상태 변화는 ticket lifecycle event로만 남기고, 문서 내용 재작성은 예외로만 허용합니다.
- 문서 경계가 바뀌어야 하면 기존 티켓을 계속 덧칠하지 말고 새 티켓을 여는 쪽이 더 안전합니다.

## Execution Strategy
- core rules에 "Phase 1 이후 티켓/planLink 반복 수정 금지" 조항을 추가합니다.
- `ticket close`, `ticket archive`, `ticket move`는 상태 전환 기록이지만, 문서 경계를 다시 여는 면허가 아니라는 점을 명시합니다.
- 문서 수정이 필요한 경우를 "planLink의 사실 오류 수정"과 "새 요구사항"으로 나누고, 후자는 새 티켓으로 강제합니다.
- 내부 workflow event 수집은 문서 경계 보강과 별개로 두어, 상태 추적과 문서 수정이 뒤섞이지 않게 합니다.

## Verification Design
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/183-agent-rule-boundary-hardening-joy-nucb.md .deuk-agent/docs/plans/183-agent-rule-boundary-hardening-joy-nucb-plan.md` 로 Phase 1 문서 검증을 통과시킵니다.
- 규칙 수정 후에는 ticket/plan 반복 수정 금지와 새 티켓 분리 규칙이 문서에 명확히 드러나는지 확인합니다.
- 후속 구현이 있다면 `core-rules/AGENTS.md`와 `PROJECT_RULE.md`에 동일한 의미의 조항이 맞물리게 적용합니다.

## Verification Outcome
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md PROJECT_RULE.md`: passed.
