---
summary: "legacy RAG 후보 정규화 스키마와 상태 머신 초안"
status: draft
priority: high
tags:
  - rag
  - legacy
  - candidate
  - schema
  - state-machine
---

# Legacy RAG Candidate Schema

## 목적

레거시 티켓, 과거 plan/report, 임시 노트를 바로 공식 RAG 지식으로 승격하지 않고 `candidate` 상태로 수집한다. 검증된 항목만 `approved`를 거쳐 공식 인덱스에 반영한다.

## 상태 모델

| State | 의미 | 진입 조건 | 다음 상태 |
|---|---|---|---|
| `raw` | 원본 입력 | legacy ticket, plan, report, scratch 문서 발견 | `candidate`, `rejected` |
| `candidate` | 구조화 후보 | 필수 필드 추출 성공, 출처 보존 | `review`, `rejected` |
| `review` | 검토 대기 | 중복/충돌/오래된 규칙 여부 확인 필요 | `approved`, `rejected`, `candidate` |
| `approved` | 공식 반영 승인 | 사람 또는 정책 게이트 통과 | `active-index`, `deprecated` |
| `active-index` | 공식 RAG 반영 | 인덱싱 완료, 버전 태그 기록 | `deprecated` |
| `rejected` | 반영 금지 | 출처 불명확, 충돌, placeholder, 품질 미달 | 없음 |
| `deprecated` | 과거 지식 | 최신 규칙/티켓으로 대체됨 | 없음 |

## 필수 필드

```json
{
  "id": "legacy-rag-candidate-id",
  "sourcePath": ".deuk-agent/tickets/archive/sub/example.md",
  "sourceType": "ticket|plan|report|scratch|external",
  "status": "candidate",
  "summary": "짧은 문제/결정 요약",
  "problem": "증상 또는 요구",
  "decision": "확정된 결정 또는 후보 결정",
  "evidence": ["검증 명령, 보고서, 코드 경로"],
  "scope": ["영향 모듈 또는 문서"],
  "rules": ["DC-CODEGEN", "TDW"],
  "confidence": 0.0,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## 승격 게이트

- `summary`, `sourcePath`, `sourceType`, `status`, `problem`이 비어 있으면 `candidate`로도 승격하지 않는다.
- placeholder 문구가 포함되면 `rejected` 또는 `candidate` 유지.
- `core-rules/AGENTS.md`, `PROJECT_RULE.md`와 충돌하면 `review`에 머문다.
- generated output, benchmark report, 공식 baseline을 바꾸는 지식은 G7/G8 승인 없이 `approved`가 될 수 없다.
- 동일 주제의 최신 archived report가 있으면 오래된 후보는 `deprecated` 후보로 표시한다.

## 품질 지표

| Metric | 정의 | 목표 |
|---|---|---|
| `top1_rule_hit` | 첫 RAG 결과가 필요한 규칙/결정을 포함 | 상승 |
| `top3_rule_hit` | 상위 3개 결과 중 필요한 규칙/결정을 포함 | 상승 |
| `placeholder_rate` | 후보 중 placeholder 포함 비율 | 하락 |
| `rework_rate` | RAG 결과 기반 작업의 재수정 비율 | 하락 |
| `token_delta` | 기존 검색 대비 입력 토큰 변화 | 하락 |

## 후속 구현 분해

1. `legacy-rag-candidate` JSON schema 파일 추가.
2. legacy ticket/plan/report에서 필드를 추출하는 read-only scanner 추가.
3. placeholder/conflict/deprecated 판정기를 추가.
4. 승인 전 후보를 `.deuk-agent/docs/scratch/` 또는 별도 candidate store에 저장한다.
5. `approved`만 공식 RAG ingestion 대상으로 넘기는 게이트를 설계한다.
6. A/B 평가 스크립트는 별도 티켓으로 분리한다.

## 비범위

- 이 문서는 공식 RAG 인덱스를 변경하지 않는다.
- 기존 archive 티켓을 대량 수정하지 않는다.
- 대시보드나 MCP 서버 코드는 수정하지 않는다.
