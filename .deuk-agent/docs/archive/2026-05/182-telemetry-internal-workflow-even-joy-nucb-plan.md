---
summary: "telemetry 내부 workflow event 수집과 이벤트 timestamp 기반 자동 timing 산출 계획"
status: draft
priority: P2
tags:
  - plan
  - phase1
  - telemetry
  - workflow-events
  - timing
createdAt: "2026-05-02 10:49:48"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 telemetry에는 수동 `telemetry log` 입력값과 archive knowledge distill 자동 이벤트가 섞여 있습니다. 하지만 ticket lifecycle 자체의 내부 이벤트는 일관되게 남지 않아서, 티켓 생성부터 phase 이동, close/archive까지 걸린 시간을 telemetry summary에서 계산할 수 없습니다.

앞선 잘못된 접근은 "CLI 실행 시간"으로 범위를 넓힌 점이 문제였습니다. 이번 범위는 CLI runtime profiler가 아니라 TDW 내부 workflow event입니다. 즉, `ticket_created`, `ticket_phase_moved`, `ticket_closed`, `ticket_archived`, `knowledge_distilled` 같은 도메인 이벤트를 남기고, 그 이벤트들의 timestamp 차이로 자동 timing을 산출합니다.

## Source Observations
- [scripts/cli-telemetry-commands.mjs](../../../scripts/cli-telemetry-commands.mjs)는 수동 로그와 summary 집계를 처리하지만 내부 workflow event writer는 없습니다.
- [scripts/cli-ticket-commands.mjs](../../../scripts/cli-ticket-commands.mjs)는 archive knowledge distill 시 telemetry를 append하는 로컬 helper를 갖고 있으나, create/move/close/archive lifecycle 이벤트는 공통 형식으로 남기지 않습니다.
- [scripts/cli-args.mjs](../../../scripts/cli-args.mjs)는 RAG/knowledge 수동 로그 필드를 파싱하지만 내부 이벤트용 `source`, `kind`, `event` 입력은 아직 없습니다.
- [scripts/tests/cli-telemetry-commands.test.mjs](../../../scripts/tests/cli-telemetry-commands.test.mjs)는 TDW token summary만 검증하고, 내부 이벤트와 derived timing summary는 검증하지 않습니다.

## Cause Hypotheses
- telemetry 로그가 "작업 토큰" 중심으로 시작되어 ticket lifecycle 이벤트 스키마가 따로 없습니다.
- 자동 이벤트가 archive distill에 부분적으로만 존재해서 summary 계산의 기준선이 불완전합니다.
- timing을 직접 저장하려고 하면 clock skew나 중복 기록에 취약합니다. 이벤트 timestamp를 남기고 summary에서 파생 계산하는 편이 더 안정적입니다.

## Decision Rationale
- 내부 수집 이벤트에는 `source: "internal"`, `kind: "workflow_event"`, `event`, `occurredAt`를 둡니다.
- 기존 수동 로그는 `source: "manual"`, `kind: "work"`로 취급하되, legacy row는 summary에서 work log로 후방 호환 처리합니다.
- timing은 이벤트 레코드 자체에 억지로 저장하지 않고 summary에서 ticket별 이벤트 timestamp 차이로 계산합니다.
- CLI runtime duration은 이번 범위에서 제외합니다. 사용자 요청의 "자동 타이밍"은 TDW workflow timing으로 해석합니다.

## Execution Strategy
- `cli-telemetry-commands.mjs`에 공통 append helper와 내부 workflow event helper를 추가합니다.
- `telemetry log`가 수동 로그임을 명시하는 `source/kind/occurredAt` 필드를 기록하게 합니다.
- `summaryAction()`은 manual/work logs와 internal workflow events를 분리해 집계합니다.
- workflow timing summary는 ticket별 `ticket_created`, `ticket_phase_moved`, `ticket_closed`, `ticket_archived` timestamp를 읽어 `timeToCloseMs`, `timeToArchiveMs`, 평균값을 계산합니다.
- `cli-ticket-commands.mjs`의 create/move/close/archive 성공 지점에 내부 workflow event append를 추가합니다.
- 기존 archive knowledge distill telemetry는 새 공통 writer를 쓰되 `knowledge_distilled` 이벤트로도 분류합니다.

## Verification Design
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`로 internal workflow event와 derived timing summary를 검증합니다.
- `node --test scripts/tests/cli-ticket-commands.test.mjs`로 ticket lifecycle hook이 기존 동작을 깨지 않는지 확인합니다.
- `node --test scripts/tests/cli-utils.test.mjs`로 telemetry args 후방 호환을 확인합니다.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/182-telemetry-internal-workflow-even-joy-nucb.md .deuk-agent/docs/plans/182-telemetry-internal-workflow-even-joy-nucb-plan.md`로 Phase 1 문서 상태를 검증합니다.

## Verification Outcome
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/182-telemetry-internal-workflow-even-joy-nucb.md .deuk-agent/docs/plans/182-telemetry-internal-workflow-even-joy-nucb-plan.md`: passed.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs`: passed.
- `node --test scripts/tests/*.test.mjs`: passed.
