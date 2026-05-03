---
summary: DeukAgentContext 토큰 생성 이후 KPI 기반 존재 가치 평가와 개선 실행 계획
status: draft
priority: medium
tags:
  - deukagentcontext
  - telemetry
  - rag-quality
  - token-kpi
---

# DeukAgentContext 토큰/KPI 평가 계획

## 문제 분석

DeukAgentContext는 단순 문서 검색 기능으로 평가하면 가치가 과소평가된다. 현재 규칙은 MCP 품질 게이트, RAG-MISS 판정, `add_knowledge`, `refresh_document`를 포함하고 있으므로 실제 존재 가치는 "문서를 찾았는가"보다 "생성 토큰 이후 반복 탐색과 재작업을 줄였는가"로 판단해야 한다.

현재 약점은 정량 계측이다. 규칙은 검색 실패 시 로컬 확인으로 전환하라고 말하지만, 각 RAG 호출이 실제로 `hit`, `weak-hit`, `miss`, `stale` 중 무엇이었는지 누적 기록하는 체계는 별도로 정리되어 있지 않다. 따라서 DeukAgentContext가 토큰을 절감했는지, 오히려 검증 비용을 늘렸는지 사후 평가가 어렵다.

## 근거 관찰

`core-rules/AGENTS.md` v25는 DeukAgentContext를 보조 기억층으로 두고, 같은 질문에 대해 MCP 조회를 최대 2회로 제한한다. 또한 placeholder, 중복, stale, 무관 결과를 RAG-MISS로 취급하고, 로컬 분석에서 재사용 가능한 사실이 나오면 `add_knowledge`를 호출하도록 요구한다.

승인 규칙상 현재 작업은 Phase 1 계획 문서 작성까지 가능하다. 실제 telemetry 필드 추가, CLI 리포트 변경, 규칙 정본 수정은 planLink가 완성되고 Phase 2 실행 승인이 있을 때만 진행한다. 특히 broad regeneration, official baseline/catalog 확장, 인프라성 변경은 별도 명시 승인이 필요하다.

## 원인 가설

DeukAgentContext의 체감 가치가 흔들리는 원인은 검색 결과 품질이 아니라 품질 결과를 기록하지 않는 데 있다. `hit`인 검색은 다음 탐색을 줄이지만, `miss` 또는 `stale` 검색은 입력 토큰과 판단 시간을 추가로 소비한다.

또한 생성 토큰의 품질을 평가하지 않으면, 긴 계획이나 요약이 실제 작업 절감으로 이어졌는지 알 수 없다. 따라서 생성 이후 `useful`, `waste`, `rework`, `saved` 판정을 붙이는 방식이 필요하다.

## 결정 기준

DeukAgentContext는 다음 조건을 만족하면 유지 가치가 높다고 판단한다.

- RAG Hit Rate가 안정적으로 60% 이상이다.
- RAG Miss Rate가 25% 이하로 유지된다.
- Stale Knowledge Rate가 10% 이하이다.
- 작업당 Token Saved Estimate가 RAG 호출 토큰보다 크다.
- 반복 검색 감소율이 월 단위로 개선된다.
- stale 발견 시 `refresh_document`가 `add_knowledge`보다 우선된다.

반대로 다음 상태가 반복되면 운영 개선 또는 축소를 검토한다.

- placeholder/중복 결과가 반복된다.
- 로컬 fallback이 대부분의 작업에서 필수로 발생한다.
- RAG 결과를 신뢰했다가 로컬 소스 확인에서 뒤집히는 rework가 늘어난다.
- 수집 지식이 실행 규칙이나 현재 코드보다 오래된 판단을 제공한다.

## 실행 전략

1. Phase 1에서는 KPI 정의와 승인 경계를 문서화한다.
2. Phase 2 승인 후 telemetry 입력 지점과 리포트 지점을 좁혀 확인한다.
3. 필요한 경우 telemetry 이벤트에 `rag_result`, `local_fallback`, `knowledge_action`, `token_quality` 필드를 추가한다.
4. 월간 리포트 계산식은 우선 문서 기준으로 정의하고, 자동화는 별도 승인 후 구현한다.
5. RAG는 현재 코드/정본 규칙보다 우선하지 않는다는 원칙을 유지한다.

## 검증 설계

문서 단계 검증은 Markdown lint 통과 여부로 확인한다. 구현 단계가 승인되면 telemetry 관련 단위 테스트를 추가하거나 기존 테스트를 갱신한다. 실제 DeukAgentContext 효과 검증은 최소 1주 이상의 작업 기록을 기준으로 `hit/miss/stale`, 토큰 절감 추정, local fallback 비율을 집계해 판단한다.

## 승인 기준

Phase 2로 진행하려면 사용자가 telemetry 또는 rule 변경 실행을 명확히 승인해야 한다. 승인 전에는 이 계획과 티켓/APC만 공식 기록으로 유지한다.
