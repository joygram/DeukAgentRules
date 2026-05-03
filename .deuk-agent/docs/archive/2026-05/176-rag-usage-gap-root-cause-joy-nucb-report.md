---
summary: "RAG 사용 누락과 데이터 미수집 원인 분석 보고서"
status: draft
priority: high
tags:
  - rag
  - telemetry
  - root-cause
  - usage-gap
---

# RAG Usage Gap Report

## 결론

현재 문제는 단순히 "RAG가 약하다"가 아니라, **RAG 사용 증거가 수집되지 않는다**는 점이다. 그래서 코드와 문서 산출물은 계속 쌓이는데, 정작 에이전트가 그걸 실제로 썼다는 로그는 없다.

## 현재 확인된 사실

- `.deuk-agent/telemetry.jsonl` 기존 로그 10개에 `ragResult`가 없다.
- `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`도 없다.
- `scripts/cli-telemetry-commands.mjs`는 수동 로그용이다.
- `scripts/cli-ticket-commands.mjs`는 archive knowledge를 생성하지만, 이것이 RAG 사용 로그로 이어지지는 않는다.

## 왜 비정상인가

문서와 코드만 쌓이는 상태는 두 가지 의미에서 비정상이다.

1. 사용은 있는데 증거가 없다.
에이전트가 실제로 RAG를 쓰고 있어도 자동 계측이 없으면 확인 불가다.

2. 애초에 쓰지 않고 있을 수 있다.
이 경우 인덱스, knowledge, plan, report는 남지만 실행 경로에 반영되지 않는다.

둘 중 어느 쪽이든 운영 신뢰성은 낮다. 그래서 이번 판정은 `used`가 아니라 `not evidenced`다.

## 다음 확인 지점

- 실제 RAG 호출 지점에 자동 로그가 붙어 있는가
- archive knowledge가 실제 RAG 검색 대상에 들어가는가
- `telemetry log`가 수동이 아니라 이벤트 기반으로 호출되는가
- `savedTokens`와 fallback 비율을 자동으로 집계할 수 있는가

## 현재 변화

- archive 기반 knowledge distillation은 이제 telemetry에 `knowledge-distill` 이벤트를 남긴다.
- 이는 RAG 사용 증명이 아니라, 최소한 knowledge 생성과 코드 축적을 telemetry로 관찰 가능하게 만드는 1차 계측이다.

## 메모

이 보고서는 "사용했다"를 증명하지 않는다. 오히려 현재 로그가 사용 증거를 못 보여준다는 점을 명시한다. 그게 지금 상태의 핵심이다.

## 검증

- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed, 21 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/176-rag-usage-gap-root-cause-joy-nucb.md .deuk-agent/docs/plans/176-rag-usage-gap-root-cause-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/176-rag-usage-gap-root-cause-joy-nucb-report.md`: passed.
