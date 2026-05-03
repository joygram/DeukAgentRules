---
summary: "RAG 파이프라인 메트릭과 Agent Critic 루프 실행 사양"
status: draft
priority: high
tags:
  - rag
  - metrics
  - telemetry
  - agent-loop
  - spec
---

# RAG Metrics & Agent Loop Spec

## 목적

RAG/TDW 파이프라인의 개선 여부를 감각이 아니라 지표로 판단한다. 후보 지식은 승인 전까지 공식 인덱스에 반영하지 않고, 작업 단위의 비용/품질/준수율을 기록한다.

## 최소 지표 세트

| Field | Type | Source | 설명 |
|---|---|---|---|
| `ticket_id` | string | TDW | 작업 단위 |
| `phase` | number | ticket frontmatter | 실행 단계 |
| `input_tokens` | number | telemetry | 입력 토큰 |
| `output_tokens` | number | telemetry | 출력 토큰 |
| `total_tokens` | number | telemetry | 총 토큰 |
| `rag_hits_top1_hit` | boolean | evaluator | 첫 결과가 필요한 규칙/결정을 포함했는지 |
| `rag_hits_top3_hit` | boolean | evaluator | 상위 3개 중 필요한 규칙/결정이 있었는지 |
| `context_retrieval_latency_ms` | number | MCP/search wrapper | 검색 지연 |
| `loop_count` | number | conversation/ticket log | 반복 요청 횟수 |
| `revision_count` | number | git/ticket log | 후속 수정 횟수 |
| `first_pass_pass_rate` | number | verifier | 초회 제출 성공률 |
| `defect_reopen_count` | number | ticket status | 재오픈/회귀 |
| `tdw_compliance_score` | number | ticket parser | TDW 준수 점수 |

## JSONL 레코드 초안

```json
{
  "schemaVersion": 1,
  "ticket_id": "132-rag-context-pipeline-improvement-joy-nucb",
  "phase": 2,
  "timestamp": "2026-05-01T00:00:00.000Z",
  "client": "codex",
  "model": "unknown",
  "input_tokens": 0,
  "output_tokens": 0,
  "total_tokens": 0,
  "rag_hits_top1_hit": null,
  "rag_hits_top3_hit": null,
  "context_retrieval_latency_ms": null,
  "loop_count": 0,
  "revision_count": 0,
  "first_pass_pass_rate": null,
  "defect_reopen_count": 0,
  "tdw_compliance_score": null,
  "notes": []
}
```

## TDW 준수 점수 초안

| Check | Weight |
|---|---:|
| ticket exists before writes | 20 |
| APC complete before Phase 2 | 20 |
| planLink exists and is non-placeholder | 20 |
| lint/test verification recorded | 20 |
| close/archive completed with report | 20 |

총점 100점이며, 80점 미만은 Critic review 대상으로 보낸다.

## Agent Loop

### Critic

- 입력: 완료 티켓, plan, report, verification log.
- 출력: 규칙 누락, 반복 원인, RAG miss 원인.
- 권한: read-only. 수정 금지.

### Curator

- 입력: Critic 결과와 candidate schema.
- 출력: `candidate`, `review`, `deprecated` 태그 제안.
- 권한: scratch/report 작성만 허용.

### Validator

- 입력: 샘플 20개 티켓과 제안된 분류.
- 출력: top1/top3 hit, TDW score, false-positive 목록.
- 권한: 공식 인덱스 반영 금지. 승인 전 draft만 작성.

## 후속 구현 티켓

1. `rag-metrics` JSON schema와 writer 추가.
2. TDW compliance scorer 추가.
3. read-only Critic report generator 추가.
4. candidate/approved ingestion gate 설계.
5. 20개 샘플 dry-run 평가.

## 비범위

- MCP 서버와 대시보드 수정.
- 공식 RAG 인덱스 업데이트.
- broad generated reports regeneration.
- candidate를 approved로 자동 승격.
