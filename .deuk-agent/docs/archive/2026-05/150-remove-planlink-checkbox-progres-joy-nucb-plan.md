---
summary: "planLink 체크박스 제거 및 분석문서 역할 강화 근거"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 13:27:50"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 planLink 초안은 분석 섹션을 갖고 있지만 각 섹션이 체크박스 한 줄로 되어 있다. 실행 후 한 번에 체크하면 진행 추적 의미가 없고, 티켓의 lifecycle checklist와 역할이 다시 겹친다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `ensurePlanDraftFile`가 planLink 섹션마다 `- [ ]` 프롬프트를 생성한다.
- `core-rules/AGENTS.md`는 ticket/planLink 소유권을 나누지만, 체크박스 소유권은 명시하지 않는다.
- `scripts/tests/cli-ticket-commands.test.mjs`는 분석 섹션 존재만 확인하고 체크박스 부재를 검증하지 않는다.

## Cause Hypotheses
- planLink가 분석 문서로 재정의됐지만, 생성 초안이 여전히 진행 체크리스트 문법을 사용한다.
- 체크박스 업데이트를 사후 일괄 처리하면 상태 신호가 아니라 noise가 된다.

## Decision Rationale
진행 상태는 티켓에만 둔다. planLink는 체크 가능한 작업 목록 대신 서술형 분석 프롬프트를 제공한다. 이렇게 하면 planLink가 문제 이해와 결정 근거를 담고, 티켓은 실행 상태를 담는 구조가 유지된다.

## Execution Strategy
1. `core-rules/AGENTS.md`에 planLink 체크박스 금지와 티켓 진행 소유권을 명시한다.
2. `ensurePlanDraftFile`의 `- [ ]` 프롬프트를 서술형 문장으로 바꾼다.
3. planLink 생성 테스트에 checkbox 부재 assertion을 추가한다.
4. 관련 사용자 문서의 planLink 설명을 상태 추적이 아닌 분석/판단 기록으로 맞춘다.

## Verification Design
- `node --test scripts/tests/*.test.mjs`: 생성 planLink에 분석 섹션이 있고 체크박스가 없어야 한다.
- `npx deuk-agent-rule lint:md ...`: 변경된 룰/문서/티켓/planLink markdown이 통과해야 한다.
- Residual risk: 기존에 이미 생성된 planLink의 체크박스는 마이그레이션 범위 밖이다.
