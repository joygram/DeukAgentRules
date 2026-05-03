---
summary: telemetry summary에서 TDW 토큰과 커버리지 지표를 보여주도록 개선하는 계획
status: draft
priority: medium
tags:
  - tdw
  - telemetry
  - summary
  - metrics
---

# TDW Telemetry Summary Visibility Plan

## 문제 분석

현재 telemetry 로그에는 `tdw` 필드가 있지만, summary 출력은 총 토큰과 RAG 관련 정보만 강조하고 TDW 총량과 비율을 보여주지 않는다. 이 때문에 TDW가 실제로 어느 정도 사용됐는지 한눈에 확인할 수 없고, TDW 준수 여부를 감각적으로만 판단하게 된다.

## Source Observations

- `scripts/cli-telemetry-commands.mjs`는 `tdw` 값을 log entry에 저장하지만 summary에서는 합산하지 않는다.
- `scripts/tests/cli-utils.test.mjs`는 `parseTelemetryArgs`가 `--tdw`를 파싱하는지 확인하지만, summary 출력 검증은 없다.
- `docs/plans/132-rag-metrics-agent-loop-spec.md`는 TDW compliance score와 관련 지표를 이미 구상하고 있다.

## Cause Hypotheses

- TDW 값은 저장되지만 집계되지 않아, 사용량과 준수도를 읽을 수 없다.
- RAG 요약이 먼저 들어간 뒤 TDW 요약이 빠져서, 운영자가 TDW를 부차적 신호로만 오해한다.
- JSON 출력에도 TDW 정보가 없어서 외부 리포트/자동화가 활용할 수 없다.

## Decision Rationale

TDW를 별도 섹션으로 요약에 노출하면, 로그 수집 구조를 바꾸지 않고도 현재 상태의 TDW 사용량을 확인할 수 있다. 이를 통해 나중에 compliance scorer나 더 정교한 TDW score를 얹기 전에 최소한의 가시성을 확보한다.

## Execution Strategy

1. `telemetry summary`에 TDW 총량과 엔트리 수를 추가한다.
2. TDW 커버리지율과 총 토큰 대비 비율을 보여준다.
3. JSON summary에도 같은 필드를 넣어 리포트 자동화를 가능하게 한다.
4. TDW 출력이 실제로 보이는지 테스트를 추가한다.

## Verification Design

`node --test scripts/tests/cli-telemetry-commands.test.mjs`로 TDW summary 출력과 JSON 필드를 검증한다. `npx deuk-agent-rule lint:md`로 티켓, plan, report 문서 형식을 확인한다.

## Verification Outcome

- TDW summary는 `TDW Tokens`, `Entries`, `Coverage Rate`, `Token Share`, `Average Tokens/Entry`를 출력한다.
- JSON summary는 `totalTdwTokens`, `tdwEntryCount`, `tdwCoverageRate`, `tdwTokenShare`, `tdwAverageTokensPerEntry`를 노출한다.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`: passed, 2 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md .deuk-agent/docs/plans/178-tdw-telemetry-summary-visibility-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/178-tdw-telemetry-summary-visibility-joy-nucb-report.md`: passed.
