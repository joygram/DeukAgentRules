---
summary: "TDW telemetry summary 가시성 개선 검증 보고서"
status: draft
priority: medium
tags:
  - tdw
  - telemetry
  - summary
  - metrics
---

# TDW Telemetry Summary Visibility Report

## 결론

`telemetry summary`는 이제 TDW 토큰 총량과 커버리지율을 보여준다. 즉, TDW가 로그에만 잠겨 있지 않고 요약 화면에서도 읽히게 됐다.

## 확인한 것

- `TDW Tokens`가 summary 본문에 출력된다.
- `Entries`, `Coverage Rate`, `Token Share`, `Average Tokens/Entry`가 함께 보인다.
- JSON summary에는 `totalTdwTokens`, `tdwEntryCount`, `tdwCoverageRate`, `tdwTokenShare`, `tdwAverageTokensPerEntry`가 포함된다.

## 의미

이 변경은 TDW compliance scorer 자체를 만든 것은 아니다. 대신 TDW가 얼마나 사용되고 있는지 바로 확인할 수 있는 최소 가시성을 만든다. 그 결과 TDW 개선 포인트를 숫자로 이어갈 수 있다.

## 검증

- `node --test scripts/tests/cli-telemetry-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md .deuk-agent/docs/plans/178-tdw-telemetry-summary-visibility-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/178-tdw-telemetry-summary-visibility-joy-nucb-report.md`

## Verification Outcome

- `node --test scripts/tests/cli-telemetry-commands.test.mjs`: passed, 2 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md .deuk-agent/docs/plans/178-tdw-telemetry-summary-visibility-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/178-tdw-telemetry-summary-visibility-joy-nucb-report.md`: passed.
