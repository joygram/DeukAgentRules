---
summary: archive knowledge distillation이 telemetry에 knowledge-distill 이벤트를 남기는지 확인하는 스모크 계획
status: draft
priority: medium
tags:
  - telemetry
  - knowledge
  - smoke
  - archive
---

# Telemetry Knowledge Distill Smoke Plan

## 문제 분석

이전까지의 문제는 archive로 knowledge JSON은 만들어지는데, 그 과정이 telemetry에는 남지 않아 관측이 끊겼다는 점이다. 그래서 "knowledge가 생성됐다"와 "knowledge 생성이 기록됐다"가 분리되어 있었다.

이 스모크의 목적은 archive 기반 knowledge distillation이 telemetry에 `knowledge-distill` 이벤트를 남기는지 확인하는 것이다. 이것이 통과하면 적어도 knowledge 생성과 코드 축적이 관찰 가능해진다.

## 근거 관찰

`scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`는 archive 시 knowledge JSON을 생성하고, 현재는 `appendTelemetryEvent()`를 호출해 `telemetry.jsonl`에 이벤트를 남긴다. `scripts/tests/cli-ticket-commands.test.mjs`에는 archive 후 knowledge JSON뿐 아니라 telemetry 이벤트까지 확인하는 assertion이 들어가 있다.

## 판단 기준

- archive 실행 후 `telemetry.jsonl`에 새 행이 남아야 한다.
- 마지막 행의 `action`은 `knowledge-distill`이어야 한다.
- `knowledgeAction`은 `add_knowledge`여야 한다.
- `tokenQuality`는 `saved`여야 한다.

## 실행 전략

1. `cli-ticket-commands` 테스트를 실행한다.
2. archive knowledge 생성과 telemetry append가 함께 통과하는지 본다.
3. 문서 lint로 티켓, planLink, report 형식을 검증한다.

## 검증 설계

`node --test scripts/tests/cli-ticket-commands.test.mjs` 결과를 최종 증거로 사용한다. 추가 코드 변경이 없으면 이 티켓은 스모크 증명 티켓으로 닫는다.

## 완료 기준

- archive knowledge distillation telemetry assertion이 통과한다.
- 결과가 report에 남는다.
- knowledge 생성과 관측 가능성이 연결되었다고 말할 수 있다.

## Verification Outcome

- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed, 21 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/177-telemetry-knowledge-distill-smok-joy-nucb.md .deuk-agent/docs/plans/177-telemetry-knowledge-distill-smok-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/177-telemetry-knowledge-distill-smok-joy-nucb-report.md`: passed.
