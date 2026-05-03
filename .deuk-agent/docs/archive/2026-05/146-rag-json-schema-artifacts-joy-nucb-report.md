---
summary: "RAG candidate/metrics DeukPack schema artifact report"
status: complete
priority: P2
tags:
  - report
  - deukpack
  - schema
  - rag
  - metrics
---

# RAG Schema Artifact Report

## Correction

The earlier 131/132 work described JSON/schema artifacts but only produced markdown examples. This ticket adds actual DeukPack schema source artifacts instead of hand-written JSON Schema files.

## Artifacts

- `.deuk-agent/docs/schemas/rag_candidate.deuk`
- `.deuk-agent/docs/schemas/rag_metrics.deuk`

## Design

- DeukPack `.deuk` files are the source of truth.
- JSON Schema emission or conversion is deferred to a follow-up DeukPack pipeline ticket.
- Official RAG indexing is not changed by this ticket.

## Verification

- `rg -n "namespace|enum|struct|^[[:space:]]*[0-9]+>" .deuk-agent/docs/schemas/rag_candidate.deuk .deuk-agent/docs/schemas/rag_metrics.deuk`: passed.
- `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js .deuk-agent/docs/schemas/rag_candidate.deuk /tmp/deukrules-rag-candidate-schema-check --js --allow-multi-namespace`: passed.
- `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js .deuk-agent/docs/schemas/rag_metrics.deuk /tmp/deukrules-rag-metrics-schema-check --js --allow-multi-namespace`: passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/146-rag-json-schema-artifacts-joy-nucb.md .deuk-agent/docs/plans/146-rag-json-schema-artifacts-joy-nucb-plan.md`: passed.

## Follow-Up

- Add an explicit DeukPack emit/conversion step if JSON Schema files are still required as derived artifacts.
- Decide whether generated schema artifacts should live under `/tmp`, `.deuk-agent/docs/generated/`, or a DeukPack-owned output directory before committing generated outputs.
