---
summary: DeukAgentContext telemetry summary 해석과 KPI 리포트 작성 계획
status: draft
priority: medium
tags:
  - telemetry
  - rag-quality
  - token-kpi
  - report
---

# Telemetry KPI Report Plan

## 문제 분석

`telemetry summary`는 이제 토큰 총량만이 아니라 `ragResult`, `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`를 함께 집계한다. 이 변화의 의미는 단순 로그 집계를 넘어서, DeukAgentContext가 실제로 반복 탐색을 줄였는지와 stale 지식을 얼마나 빨리 교정하는지까지 읽을 수 있게 되었다는 점이다.

이 계획의 목적은 이 집계 결과를 해석 가능한 리포트로 정리하는 것이다. 특히 `RAG Hit Rate`, `Stale Rate`, `Token Saved`를 한 문서 안에서 함께 읽을 수 있어야 한다. 지금 단계에서는 새로운 알고리즘을 더하는 것이 아니라, 현재 summary가 제공하는 신호를 사용자 친화적인 보고 문맥으로 정리하는 데 초점을 둔다.

## 근거 관찰

직전 작업에서 `scripts/cli-telemetry-commands.mjs`는 RAG 결과 분포와 토큰 품질 분포를 요약할 수 있게 바뀌었다. 이로 인해 별도의 데이터 파이프라인이 없어도 로컬 `telemetry.jsonl` 수준에서 초기 KPI 해석이 가능하다.

문서 작업이므로 코드 변경은 없고, Phase 1 범위는 계획 문서와 리포트 문서의 구조 정합성을 맞추는 것이다. 후속 자동화가 필요해지면 그때 별도 티켓으로 분리하는 것이 맞다.

## 판단 가설

리포트의 가치는 다음 질문에 답하는 데 있다.

- RAG가 실제로 유용했는가
- stale 지식이 얼마나 자주 발견되는가
- `savedTokens`가 총 토큰 사용량 대비 의미 있는가
- `localFallback`이 높은지 낮은지
- `add_knowledge`와 `refresh_document`가 운영상 어떤 차이를 만드는가

이 질문이 한 번에 보이지 않으면 summary는 존재하지만 판단은 어려운 상태가 된다. 따라서 리포트는 숫자를 나열하는 문서가 아니라, 숫자 사이의 관계를 짧게 설명하는 문서여야 한다.

## 실행 전략

1. 현재 telemetry summary 필드를 정리한다.
2. KPI별 해석 문장을 작성한다.
3. 실제 로그 데이터가 없는 경우와 있는 경우를 구분해 적는다.
4. `telemetry summary --json` 출력과 사람이 읽는 텍스트 출력의 역할을 구분한다.
5. 보고서와 planLink가 서로 같은 문장을 반복하지 않도록 한다.

## 검증 설계

문서 lint가 통과해야 하고, 문서 내용은 telemetry CLI의 현재 구현과 일치해야 한다. 실제 수치 검증은 사용자가 telemetry 로그를 누적한 뒤 별도 실행 단계에서 수행한다. 이 티켓에서는 리포트 구조와 해석 문장만 다룬다.

## 완료 기준

- planLink가 분석 문서로서 성립한다.
- walkthrough report가 현재 telemetry summary 구조를 정확히 설명한다.
- 티켓과 planLink, report가 서로 중복 없이 역할 분리된다.
