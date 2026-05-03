---
summary: "legacy RAG 정합성 비전 및 candidate schema 산출 보고서"
status: complete
priority: high
tags:
  - report
  - rag
  - legacy
  - candidate
  - schema
---

# Legacy RAG Compat Vision 보고서

## 산출물

- `.deuk-agent/docs/plans/131-legacy-rag-candidate-schema.md`

## 완료 내용

- 레거시 티켓/RAG 정합성 개선안을 `raw → candidate → review → approved → active-index` 상태 모델로 정리했다.
- 필수 필드, 승격 게이트, 품질 지표, 후속 구현 분해를 문서화했다.
- 공식 RAG 인덱스, 대시보드, MCP 서버, archive 티켓 대량 수정은 수행하지 않았다.

## 후속 분리

- candidate JSON schema 파일 추가.
- read-only legacy scanner 추가.
- placeholder/conflict/deprecated 판정기 추가.
- approved-only ingestion 게이트 설계.
- A/B 평가 스크립트와 대시보드 집계는 별도 티켓으로 분리.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/131-legacy-rag-compat-vision-joy-nucb.md .deuk-agent/docs/plans/131-legacy-rag-compat-vision-joy-nucb-plan.md .deuk-agent/docs/plans/131-legacy-rag-candidate-schema.md`: 통과.
