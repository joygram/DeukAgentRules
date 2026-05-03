---
summary: "검증 데이터 기반 문서 품질 통계와 누락 원인 조사 보고서"
status: draft
priority: P2
tags:
  - report
  - docs-quality
  - telemetry
  - analysis
---

# Validation Data Doc Quality Gap Report

## 요약

검증 데이터를 통계로 보면, 문서 품질 문제는 단일 원인보다 복합 원인에 가깝다.

- telemetry 29행 중 15행은 `event`가 없다.
- 10행은 `ragResult`가 없고, 10행은 `knowledgeAction`과 `tokenQuality`도 없다.
- walkthrough 보고서 49개 중 명시적 outcome 섹션이 있는 문서는 12개뿐이다.
- 33개 보고서는 결과 섹션이 없어서, 검증이 있었는지와 무엇을 증명했는지 문장으로 남지 않는다.

## 통계

### Telemetry

- total rows: `29`
- missing `event`: `15`
- missing `ragResult`: `10`
- missing `knowledgeAction`: `10`
- missing `tokenQuality`: `10`
- `localFallback=true`: `0`

### Walkthrough Reports

- total reports: `49`
- reports with summary section: `11`
- reports with verification section: `41`
- reports with outcome section: `12`
- reports with notes section: `5`
- reports with conclusion section: `19`
- reports with placeholder text: `3`
- reports mixing English and Korean headings: `2`

## 누락 원인

### 1. 데이터 수집 이전의 로그

초기 telemetry는 현재 스키마가 안정화되기 전에 기록된 것으로 보인다. 그래서 `event`나 RAG 관련 필드가 비어 있다. 이 경우 누락은 문서 품질 문제가 아니라 관측 데이터 자체의 결손이다.

### 2. outcome 섹션을 강제하지 않은 템플릿

많은 보고서가 `Verification`은 있지만 `Verification Outcome` 또는 `검증 결과`가 없다. 검증 명령은 적혀 있어도, 결과 문장이 빠지기 쉽다.

### 3. 헤딩 혼용

영어와 한국어 헤딩이 함께 쓰이면 섹션 탐지 규칙이 약해진다. 같은 의미의 섹션이라도 집계에서는 누락처럼 보인다.

### 4. 요약형 보고서

몇몇 문서는 짧은 Summary/Verification 메모만 남기고 끝난다. 이 경우 문서가 틀린 것은 아니지만, 통계 분석에는 정보가 부족하다.

### 5. 자리표시자 잔존

placeholder, TODO, `[ ]` 같은 토큰이 남은 보고서는 적지만 존재한다. 이것은 작성 중 초안이 검증 없이 저장된 신호다.

## 해석

이번 분석의 핵심은 “문서가 아예 없다”가 아니라 “문서가 있어도 증명 문장이 빠진다”는 점이다.

그래서 후속 개선은 두 갈래로 나뉜다.

1. telemetry 스키마가 안정화되기 전의 로그는 `raw`로 취급한다.
2. 보고서 템플릿은 outcome 섹션을 강제하고, 헤딩 언어를 하나로 고정한다.

## 결론

문서 품질의 누락 원인은 주로 다음 세 가지다.

- 수집 시점의 데이터 결손
- outcome 섹션을 강제하지 않은 보고서 템플릿
- 혼용된 헤딩과 짧은 초안

즉, 이 문제는 작성자 실수만으로 설명되지 않는다. 데이터 계층과 문서 계층을 같이 고쳐야 한다.

## 검증

- `node` 스크립트로 `.deuk-agent/telemetry.jsonl`의 필드 누락을 집계했다.
- `node` 스크립트로 `.deuk-agent/docs/walkthroughs`의 섹션 존재 비율을 집계했다.

## Verification Outcome

- telemetry와 report 통계가 실제 누락 원인을 분리해서 보여준다.
- 현재 문서 품질 결함은 결과 섹션 누락, 헤딩 혼용, 데이터 수집 이전 로그가 겹친 상태다.
- `npx deuk-agent-rule lint:md`는 새 report 구조 규칙을 적용한 뒤 다시 확인할 수 있다.
