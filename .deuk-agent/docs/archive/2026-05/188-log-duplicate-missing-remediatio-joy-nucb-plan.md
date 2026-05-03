---
summary: "로그 중복과 누락이 발생하는 telemetry 기록 경로를 정리"
status: draft
priority: P2
tags:
  - plan
  - telemetry
  - logging
  - remediation
---

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 telemetry 수정의 범위와 APC 경계를 관리한다.
- 이 문서는 로그 기록 시 `event` 누락을 줄이고, summary/집계가 안정적으로 읽히도록 하는 분석과 검증만 담는다.
- 기존 telemetry 파일의 과거 결손은 보존하되, 새로 쓰는 로그의 품질을 올리는 것이 목표다.

## Problem Analysis
- 현재 telemetry 기록 경로는 `event`를 선택 필드로 취급해서, 일부 work log가 빈 문자열 상태로 저장된다.
- 이 때문에 summary 집계에서 `event` 누락처럼 보이고, 후속 분석에서 로그 타입 구분이 약해진다.
- 중복 생성 자체는 현재 샘플 로그에서 보이지 않지만, 누락된 `event` 때문에 같은 작업 계열 로그가 구분되지 않는 문제가 있다.

## Source Observations
- `scripts/cli-telemetry-commands.mjs`의 `appendTelemetryRecord`는 `event`를 `entry.event || ""`로 저장한다.
- `appendInternalWorkflowEvent`는 `event || action`을 넘기지만, work log 경로는 기본값이 없다.
- `summaryAction`는 `event` 기준으로 workflow 이벤트를 분리하고 있어, 빈 문자열은 관측 품질을 떨어뜨린다.
- 현재 telemetry 파일의 과거 데이터에는 `event`가 비어 있는 행이 있지만, 이는 새 코드가 아닌 과거 기록 때문이다.

## Cause Hypotheses
- work log 기록 시 기본 `event`를 두지 않은 설계가 누락의 주된 원인이다.
- `event`가 없으면 summary에서는 구분 정보가 약해지고, 비슷한 로그가 뭉쳐 보일 수 있다.
- 과거 로그와 새 로그를 함께 볼 때, 과거 결손이 현재 문제처럼 보이는 혼선도 있다.

## Decision Rationale
- `appendTelemetryRecord`에서 기본 `event` 값을 `action` 또는 `kind`로 보강한다.
- 내부 workflow 이벤트와 일반 work log 모두 최소한의 식별자를 갖도록 해서, 이후 집계가 안정적으로 동작하게 한다.
- 기존 저장된 telemetry는 되돌리지 않고, 새로 쓰는 로그만 바로잡는다.

## Execution Strategy
- `scripts/cli-telemetry-commands.mjs`에서 `event` 기본값을 보강한다.
- `scripts/tests/cli-telemetry-commands.test.mjs`에 기본 `event`가 채워지는 회귀 테스트를 추가한다.
- 가능하면 summary가 빈 문자열 대신 의미 있는 이벤트명을 집계하는지 확인한다.

## Verification Design
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`로 telemetry write/summary 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 ticket, plan, report 문서를 검증한다.

## Verification Outcome
- `appendTelemetryRecord` now defaults missing `event` to `action`, then `kind`, then `work`.
- `scripts/tests/cli-telemetry-commands.test.mjs` now covers both explicit-event and default-event telemetry writes.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs` passed.
