---
summary: DeukAgentContext IDL namespace를 도메인 단위로 수정
status: active
priority: P2
tags: deukpack, python, generated, namespace
---

# 계획: IDL namespace 정리

## 문제

현재 IDL의 `namespace deuk_agent_context`는 프로젝트 이름을 모델 namespace로 사용합니다. 사용자의 기준상 import에는 IDL source/output 경로나 프로젝트명이 아니라 도메인 namespace 단위만 나와야 합니다.

## 방향

IDL을 도메인 단위 namespace로 바꿉니다.

- `rag`: `RagChunk`, `RagResponse`
- `workflow`: `WorkflowReport`
- `metrics`: `TicketMetric`

생성 파일은 직접 수정하지 않고 `npx deukpack run`으로 재생성합니다. DeukPack이 namespace-only import를 깨끗하게 지원하지 못하면, DeukPack 쪽 후속 티켓을 먼저 생성하고 원인/대안을 기록합니다.

## 실행 절차

1. 티켓을 Phase 2로 이동합니다.
2. `deuk_idl/rag_response.deuk`를 도메인별 IDL 파일로 분리하거나 namespace를 재구성합니다.
3. 필요하면 `deukpack.pipeline.json`/`pyproject.toml`을 조정해 생성 namespace package가 path hack 없이 import되게 합니다.
4. `npx deukpack run`을 실행합니다.
5. MCP application import를 namespace 기준으로 변경합니다.
6. `rg`로 `deuk_agent_context` 직접 import가 남았는지 확인합니다.
7. `poetry run python` smoke test를 실행합니다.
8. `poetry run python -m pytest tests/test_architecture_guard.py -q`를 실행합니다.

## 제외

- DeukPack generated 파일 직접 수정
- 생성기 자체 변경은 이번 티켓에서 제외합니다. 필요 시 DeukPack 티켓을 별도로 생성합니다.
