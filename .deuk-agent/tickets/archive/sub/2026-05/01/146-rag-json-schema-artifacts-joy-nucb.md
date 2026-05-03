---
id: 146-rag-json-schema-artifacts-joy-nucb
title: rag-json-schema-artifacts
phase: 4
status: closed
docsLanguage: ko
summary: RAG candidate와 metrics 산출물에 대해 실제 JSON Schema 파일을 추가한다.
createdAt: 2026-05-01 12:34:42
planLink: .deuk-agent/docs/plans/146-rag-json-schema-artifacts-joy-nucb-plan.md
priority: P2
tags:
  - deukpack
  - schema
  - rag
  - metrics
  - artifact
---


# rag-json-schema-artifacts

> Restrict changes to **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints

- **Target:** `.deuk-agent/docs/schemas/`, this ticket, linked plan/report.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `.deuk-agent/docs/plans/131-legacy-rag-candidate-schema.md`, `.deuk-agent/docs/plans/132-rag-metrics-agent-loop-spec.md`, DeukPack `.deuk` examples.
- **Design Rationale:** 131/132에서 schema를 말했지만 실제 machine-readable source artifact가 없었다. DeukPack SSoT 방식에 맞춰 `.deuk` schema를 먼저 추가한다.
- **Constraints:** DeukPack repo와 generated outputs는 수정하지 않는다. JSON Schema emit/build/codegen은 broad generation이므로 별도 승인 전 실행하지 않는다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `.deuk-agent/docs/schemas/*.deuk`, `.deuk-agent/docs/plans/146-rag-json-schema-artifacts-joy-nucb-plan.md`, this ticket, optional walkthrough report.
- Forbidden modules: `/home/joy/workspace/DeukPack/**`, generated artifacts, official RAG index, benchmark/report generated outputs, unrelated source code.
- Rule citation: PROJECT_RULE.md DC-CODEGEN; core-rules G7/G8; DeukPack PROJECT_RULE generated outputs must come from source/build pipeline.

### [CONTRACT]
- Input: 131 candidate schema markdown, 132 metrics spec markdown, DeukPack `.deuk` syntax examples.
- Output: DeukPack `.deuk` schema source files for RAG candidate and RAG metrics records.
- Side effects: docs/schema artifacts only. No codegen, no generated JSON Schema, no official index update.

### [PATCH PLAN]
- Create `.deuk-agent/docs/schemas/rag_candidate.deuk`.
- Create `.deuk-agent/docs/schemas/rag_metrics.deuk`.
- Update plan/report to state these are DeukPack source schemas; JSON Schema emission is follow-up.
- Run markdown lint for ticket/plan/report and inspect schema files for DeukPack syntax consistency.

## Tasks

- [x] Read context files and confirm scope.
- [x] Add DeukPack `.deuk` source schema artifacts.
- [x] Run verification and record results.

## Done When

- APC is complete and non-placeholder.
- DeukPack `.deuk` source schema artifacts exist under `.deuk-agent/docs/schemas/`.
- Markdown lint and schema syntax inspection pass or failures are recorded.

## Verification

- [x] `rg -n "namespace|enum|struct|^[[:space:]]*[0-9]+>" .deuk-agent/docs/schemas/rag_candidate.deuk .deuk-agent/docs/schemas/rag_metrics.deuk`
- [x] `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js .deuk-agent/docs/schemas/rag_candidate.deuk /tmp/deukrules-rag-candidate-schema-check --js --allow-multi-namespace`
- [x] `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js .deuk-agent/docs/schemas/rag_metrics.deuk /tmp/deukrules-rag-metrics-schema-check --js --allow-multi-namespace`
- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/146-rag-json-schema-artifacts-joy-nucb.md .deuk-agent/docs/plans/146-rag-json-schema-artifacts-joy-nucb-plan.md`

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/146-rag-json-schema-artifacts-joy-nucb-report.md)
