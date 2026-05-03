---
summary: RAG 사용 여부를 telemetry 로그로 검증하고, 현재 로그에서 증거가 있는지 판정하는 계획
status: draft
priority: medium
tags:
  - rag
  - telemetry
  - usage
  - proof
---

# RAG Usage Verification Plan

## 문제 분석

이 작업은 "인덱스가 존재한다"가 아니라 "에이전트가 실제로 RAG를 사용하고 있는가"를 검증한다. 즉, 문서가 저장돼 있고 검색 가능해 보여도, 실제 작업 로그에서 `ragResult`, `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`가 찍히지 않으면 사용 증거가 없다.

현재 telemetry 파일은 기존 작업 로그만 갖고 있고, 방금 추가한 RAG 필드가 찍힌 기록은 없다. 따라서 이번 검증은 RAG 사용을 입증하는 것이 아니라, 현재 로그에서는 사용 증거가 없다는 사실을 명확히 보여주는 데 목적이 있다.

## 근거 관찰

`.deuk-agent/telemetry.jsonl`을 읽어보면 총 10개 로그가 있으며, 그중 `ragResult`가 존재하는 항목은 0개였다. `localFallback`과 `knowledgeAction`도 0개였고, `ragCounts`는 비어 있었다.

이 수치는 현재 telemetry가 RAG 사용 증거를 아직 축적하지 못했다는 뜻이다. 따라서 "RAG가 쓰이고 있다"는 주장은 현재 로그 기준으로는 증명되지 않는다.

## 판단 기준

- `ragResult`가 실제 로그에 남아야 한다.
- `localFallback`이 함께 관찰되어야 RAG 실패 경로까지 검증된다.
- `knowledgeAction`이 있어야 `add_knowledge`/`refresh_document`의 실사용을 구분할 수 있다.
- `savedTokens`가 쌓여야 토큰 절감 주장도 가능하다.

## 실행 전략

1. 현재 telemetry 로그를 읽어 RAG 관련 필드 존재 여부를 계산한다.
2. 결과를 report에 수치로 남긴다.
3. 증거가 없으면 "사용됨"이 아니라 "증거 없음"으로 판정한다.
4. 이후 실제 사용을 보려면 다음 작업부터 RAG 필드가 찍히는지 추가 관찰한다.

## 검증 설계

읽기 전용 로그 검사만 사용한다. 코드 변경은 없다. 검증의 기준은 `ragResult`가 0인지, 그리고 `knowledgeAction`/`localFallback`/`savedTokens`가 실제로 나타나는지다.

## 완료 기준

- report가 현재 로그 기준의 판정을 담는다.
- "RAG가 사용되고 있다"가 아니라 "현재 로그에서 사용 증거가 없다"는 결론이 분명하다.
- 추후 관찰 대상 필드가 명시된다.
