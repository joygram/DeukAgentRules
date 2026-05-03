---
id: 127-cleanup-stale-generated-namespac-joy-nucb
title: cleanup-stale-generated-namespace
phase: 4
status: closed
docsLanguage: ko
summary: DeukPack 네임스페이스 생성 전환 뒤 남은 이상한 generated import/잔존물을 계획에 포함해 정리한다.
priority: medium
tags:
  - deukpack
  - codegen
  - namespace
  - cleanup
createdAt: 2026-05-01 01:46:01
planLink: .deuk-agent/docs/plans/127-cleanup-stale-generated-namespac-joy-nucb-plan.md
---


# cleanup-stale-generated-namespace

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `/home/joy/workspace/DeukAgentContext/src/mcp/generated/`, `/home/joy/workspace/DeukAgentContext/deuk_idl/python/`
- **Context Files:** `/home/joy/workspace/DeukAgentContext/PROJECT_RULE.md`, `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`, DeukPack ticket `320-python-codegen-namespace-output`
- **Design Rationale:** DeukPack IDL 네임스페이스 전환 후 런타임 import는 `rag`, `workflow`, `metrics`만 남아야 한다. 예전 `src.mcp.generated.deuk_agent_context` 생성물이 남으면 잘못된 네임스페이스를 계속 정답처럼 보이게 만든다.
- **Constraints:** 생성 파일 내용 직접 수정 금지. 삭제 전 전체 참조 검색으로 미사용을 증명하고, 새 DeukPack 생성 경로와 smoke/test로 기능 동등성을 확인한다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `/home/joy/workspace/DeukAgentContext/src/mcp/generated/`, 티켓/계획 문서
- Forbidden modules: DeukPack generator 로직, DeukAgentContext 보호 파일(`src/mcp/server.py`, `.local/config.yaml`, `.local/ingest.yaml`, `src/rag/lance_vector_store.py`, `src/infra/global_worker.py`)
- Rule citation: DeukAgentContext `DC-CODEGEN`, `DC-XREF`, `DC-REFACTOR`; DeukAgentRules `DC-CODEGEN`

### [CONTRACT]
- Input: DeukPack 320 수정으로 생성된 `deuk_idl/python/{rag,workflow,metrics}` 패키지와 현재 import 참조 상태
- Output: `src.mcp.generated.deuk_agent_context` 잔존 생성물이 제거되고, 런타임 import가 namespace 단위 패키지만 사용함
- Side effects: Git diff에서 구 generated 파일 삭제가 발생한다. 새 생성물은 `npx deukpack run` 결과를 기준으로 유지한다.

### [PATCH PLAN]
- 전체 참조 검색으로 `src.mcp.generated`, `deuk_agent_context`, `deukpack_generated` 사용처를 확인한다.
- 참조가 없는 구 generated 패키지 `src/mcp/generated/deuk_agent_context/`와 구 generated runtime stub `src/mcp/generated/deuk_pack/`를 삭제한다.
- 필요 시 빈 generated 패키지 디렉터리를 정리하되, 새 `deuk_idl/python/{rag,workflow,metrics}` 생성물은 보존한다.
- DeukPack run, smoke import, architecture guard 테스트로 새 경로가 정상임을 확인한다.

## Tasks
- [x] 계획에 구 generated 잔존물 정리를 명시한다.
- [x] 삭제 전 참조 검색 결과를 확인한다.
- [x] `src/mcp/generated/` 잔존 생성물을 삭제한다.
- [x] DeukAgentContext smoke/test를 실행한다.

## Done When
> `src.mcp.generated`가 파일 시스템과 import 참조에서 사라지고, `rag`, `workflow`, `metrics` import 기반 smoke/test가 통과한다.
