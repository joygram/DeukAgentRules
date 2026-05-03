---
summary: "RAG context pipeline 개선 사양 산출 보고서"
status: complete
priority: high
tags:
  - report
  - rag
  - metrics
  - telemetry
  - agent-loop
---

# RAG Context Pipeline Improvement 보고서

## 산출물

- `.deuk-agent/docs/plans/132-rag-metrics-agent-loop-spec.md`

## 완료 내용

- RAG/TDW 개선 여부를 측정하기 위한 최소 지표 세트를 정의했다.
- JSONL 레코드 초안과 TDW compliance score 초안을 작성했다.
- Critic, Curator, Validator 역할로 내부 에이전트 루프를 분리했다.
- 공식 RAG 인덱스, 대시보드, MCP 서버 구현은 수행하지 않았다.

## 후속 분리

- `rag-metrics` JSON schema와 writer 추가.
- TDW compliance scorer 추가.
- read-only Critic report generator 추가.
- candidate/approved ingestion gate 설계.
- 20개 샘플 dry-run 평가.
- 4주 파일럿 계획 실행.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/132-rag-context-pipeline-improvement-joy-nucb.md .deuk-agent/docs/plans/132-rag-context-pipeline-improvement-joy-nucb-plan.md .deuk-agent/docs/plans/132-rag-metrics-agent-loop-spec.md`: 통과.
