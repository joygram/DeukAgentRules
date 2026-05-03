---
summary: "RAG candidate와 metrics 산출물에 대해 DeukPack .deuk 스키마 원본을 추가한다."
status: draft
priority: P2
tags:
  - plan
  - deukpack
  - schema
  - rag
  - metrics
createdAt: "2026-05-01 12:34:42"
---

# DeukPack Schema Artifact Plan

## Goal

131/132에서 누락된 machine-readable schema artifact를 DeukPack `.deuk` 원본으로 추가한다. JSON Schema 파일을 손으로 쓰지 않고, 후속 DeukPack emit/import 파이프라인에서 파생 가능한 source-of-truth를 만든다.

## Scope

- Add `.deuk-agent/docs/schemas/rag_candidate.deuk`.
- Add `.deuk-agent/docs/schemas/rag_metrics.deuk`.
- Do not modify DeukPack source.
- Do not run codegen/build/emit.
- Do not update official RAG index.

## Steps

- [x] Read 131/132 schema markdown and DeukPack `.deuk` examples.
- [x] Write DeukPack `.deuk` source schema artifacts.
- [x] Run markdown lint for ticket/plan/report.
- [x] Inspect `.deuk` files for namespace, enum, struct, and field-id consistency.

## Verification

- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/146-rag-json-schema-artifacts-joy-nucb.md .deuk-agent/docs/plans/146-rag-json-schema-artifacts-joy-nucb-plan.md`
- [x] `rg -n "namespace|enum|struct|^[[:space:]]*[0-9]+>" .deuk-agent/docs/schemas/rag_candidate.deuk .deuk-agent/docs/schemas/rag_metrics.deuk`
- [x] DeukPack one-shot JS generation to `/tmp` succeeded for both schema files.
