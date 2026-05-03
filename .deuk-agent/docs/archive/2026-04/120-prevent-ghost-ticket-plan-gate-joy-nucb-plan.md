---
summary: 고스트 티켓 방지를 위한 Phase 1 실행문서 강제 게이트 도입 계획
status: completed
priority: high
tags:
  - rules
  - ticket-lifecycle
  - governance
---

# Plan: 120-prevent-ghost-ticket-plan-gate-joy-nucb

## Goal
- 티켓 발행만으로 종료되는 고스트 티켓을 차단한다.
- Phase 1 완료 조건에 실행 가능한 planLink 문서와 검증 절차를 강제한다.

## Changes
1. Pre-Action Guards에 G1.2 추가
- planLink 파일 미존재 또는 placeholder-only인 경우 Execute 단계 쓰기 하드 블록.

2. Ticket Lifecycle의 Phase 1 조건 강화
- ticket create 이후 planLink 파일 생성 및 실행 가능한 내용 채우기를 명시.

3. Docs & Artifacts 검증 강화
- Phase 1 완료 시 ticket + planLink 동시 lint를 의무화.

## Verification
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/120-prevent-ghost-ticket-plan-gate-joy-nucb.md .deuk-agent/docs/plans/120-prevent-ghost-ticket-plan-gate-joy-nucb-plan.md`

## Rollback
- 규칙 적용으로 과도한 차단이 발생하면 G1.2 조건을 "missing plan file"로 완화하고 placeholder 기준을 별도 lint 규칙으로 분리한다.
