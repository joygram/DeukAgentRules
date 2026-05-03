---
summary: "DeukAgentContext telemetry summary 기반 KPI 리포트"
status: draft
priority: medium
tags:
  - telemetry
  - rag-quality
  - token-kpi
  - report
---

# Telemetry KPI Report

## 요약

이번 리포트는 `telemetry summary`가 제공하는 신호를 기준으로 DeukAgentContext의 존재 가치를 해석하는 문서다. 현재 summary는 총 토큰 수만이 아니라 RAG 결과 분포, local fallback 여부, knowledge action, token quality, saved tokens를 함께 보여준다.

핵심 결론은 단순하다. `RAG Hit Rate`가 높고 `Stale Rate`가 낮으며 `Token Saved`가 누적될수록 DeukAgentContext는 단순 검색기가 아니라 운영 효율 장치로 작동한다. 반대로 `miss`와 `stale`가 많고 `localFallback`이 높으면, 컨텍스트는 탐색 비용을 줄이지 못하고 재검증 부담만 늘린다.

## 현재 KPI 해석

`telemetry summary`는 다음 항목을 읽을 수 있게 한다.

- `Total Tokens`
- `Saved Tokens`
- `RAG Quality`
- `Hit Rate`
- `Miss Rate`
- `Stale Rate`
- `Local Fallback Rate`
- `By RAG Result`
- `By Token Quality`
- `By Knowledge Action`

이 구성을 기준으로 보면, 리포트의 판단 축은 세 개다.

1. `RAG Hit Rate`
문서나 과거 지식이 실제로 재사용되었는지 보는 지표다. `hit`와 `weak-hit`를 함께 보되, `weak-hit` 비중이 높으면 품질은 중간 수준으로 본다.

2. `Stale Rate`
오래된 지식이 검색되어 교정이 필요한 정도를 보여준다. 이 값이 높으면 `refresh_document`가 충분히 작동하지 않거나, 지식 축적 기준이 너무 넓다는 뜻이다.

3. `Token Saved`
RAG 사용으로 생략된 읽기나 재탐색의 크기를 가늠하는 추정치다. `savedTokens`가 누적되지만 `Hit Rate`가 낮으면, 절감이 아니라 우연한 기록일 수 있다.

## 해석 기준

- `Hit Rate`가 높고 `Stale Rate`가 낮으면, DeukAgentContext는 재사용 가능한 기억층으로 유효하다.
- `Miss Rate`와 `localFallback`이 함께 높으면, 검색은 되었지만 실무 의사결정에는 도움이 덜 된 것이다.
- `savedTokens`가 커도 `tokenQuality`가 `rework` 위주면, 절감이 아니라 회피에 가까울 수 있다.
- `knowledgeAction`에서 `refresh_document` 비중이 높으면, 지식 품질 관리가 작동하고 있다는 뜻이다.

## 결론

이 리포트의 목적은 DeukAgentContext를 과장하지도, 축소하지도 않는 데 있다. 현재 summary는 충분히 쓸 만한 KPI 계층을 제공하고 있으며, 실제 사용 가치 판단은 누적 로그를 통해 `hit/miss/stale/saved`의 균형을 보는 방식으로 해야 한다.

실데이터가 쌓인 뒤에는 이 문서를 월간 리포트 템플릿으로 재사용할 수 있다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/173-telemetry-kpi-report-joy-nucb.md .deuk-agent/docs/plans/173-telemetry-kpi-report-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/173-telemetry-kpi-report-joy-nucb-report.md`: passed
