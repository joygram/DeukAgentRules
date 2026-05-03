---
summary: "DeukPack 네임스페이스 생성 전환 뒤 남은 구 generated 패키지를 정리한다."
status: "planned"
priority: "medium"
tags: ["deukpack", "codegen", "namespace", "deuk-agent-context"]
---

# 127 cleanup-stale-generated-namespace 계획

## 목표

DeukPack IDL 네임스페이스 전환 후 남은 `src.mcp.generated` 계열 생성물을 제거해, 런타임 import와 파일 구조가 `rag`, `workflow`, `metrics` 네임스페이스 단위만 드러내도록 정리한다.

## 범위

- 대상: `/home/joy/workspace/DeukAgentContext/src/mcp/generated/`
- 확인 대상: `/home/joy/workspace/DeukAgentContext/deuk_idl/python/{rag,workflow,metrics}/`
- 제외: DeukPack generator 로직, DeukAgentContext 보호 파일, `.local/config.yaml`, `.local/ingest.yaml`

## 실행 계획

- [x] `rg`로 `src.mcp.generated`, `deuk_agent_context`, `deukpack_generated` 참조를 확인한다.
- [x] 현재 실제 런타임 import가 `rag`, `workflow`, `metrics`인지 확인한다.
- [x] 참조가 없는 예전 generated 패키지 `src/mcp/generated/`를 삭제한다.
- [x] `npx deukpack run`으로 새 생성 경로가 유지되는지 확인한다.
- [x] smoke import로 `rag::RagResponse`, `workflow::WorkflowReport`, `metrics::TicketMetric` 스키마명을 확인한다.
- [x] `poetry run python -m pytest tests/test_architecture_guard.py -q`를 실행한다.

## 검증 기준

- `rg "src\.mcp\.generated|deuk_agent_context|deukpack_generated"` 결과에 런타임 코드 참조가 남지 않는다.
- `src/mcp/generated/`에 구 generated 파일이 남지 않는다.
- DeukAgentContext smoke/test가 통과한다.
