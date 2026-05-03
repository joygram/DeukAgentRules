---
summary: "planLink를 에이전트 문제분석 문서로 강화하는 근거"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 13:22:18"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns identity, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.

## Problem Analysis
- 현재 planLink 초안은 `Evidence`, `Execution Steps`, `Verification` 정도만 요구한다.
- 이 구조는 티켓의 작업 목록과 크게 다르지 않아, 에이전트가 문제를 어떻게 이해했는지 남기기 어렵다.
- 사용자가 원하는 기획문서는 파일 분리 자체가 아니라 에이전트의 문제 분석과 결정 흔적이다.

## Cause Hypotheses
- planLink 소유권을 "evidence/steps"로만 표현해 분석 깊이가 부족하다.
- 생성 초안이 문제 구조, 원인 가설, 선택지 판단을 요구하지 않는다.
- 테스트도 비중복 여부만 확인하고 분석 섹션 존재를 검증하지 않는다.

## Decision Rationale
- planLink 기본 섹션을 `Problem Analysis`, `Cause Hypotheses`, `Decision Rationale`, `Execution Strategy`, `Verification Design`로 바꾼다.
- 티켓과 중복을 피하면서도 planLink가 에이전트 사고 과정을 담도록 유도한다.
- docs와 regression test를 함께 갱신해 생성 동작을 고정한다.

## Execution Strategy
- [x] `core-rules/AGENTS.md`에서 planLink 소유권을 analysis 중심으로 재정의한다.
- [x] `ensurePlanDraftFile`의 기본 초안을 analysis 중심 구조로 변경한다.
- [x] 회귀 테스트를 새 섹션명 기준으로 갱신한다.
- [x] 사용자 문서의 planLink 설명을 분석/판단 흔적 중심으로 정리한다.

## Verification
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/149-planlink-agent-analysis-content-joy-nucb.md .deuk-agent/docs/plans/149-planlink-agent-analysis-content-joy-nucb-plan.md`
