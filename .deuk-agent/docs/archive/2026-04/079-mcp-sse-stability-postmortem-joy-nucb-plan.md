---
summary: 079-mcp-sse-stability-postmortem-joy-nucb-plan
status: active
priority: P3
tags: docs, migrated
---


# 계획: MCP-SSE-Stability-PostMortem

## 요약
- **목적**: 클러드 코드의 무지성 탐색(Shoveling) 원인 분석 및 MCP-SSE 연결 안정화
- **범위**: `DeukAgentContext` 서버 프로토콜 수정 및 시스템 서비스 설정 최적화
- **비범위**: RAG 로직 자체의 성능 개선

## 현재 격차
- **현상 1**: 클러드 코드가 `streamable-http` 프로토콜 미지원으로 30초 타임아웃 발생 -> 수동 `grep/find` 삽질로 이어짐.
- **현상 2**: `uvicorn` 직접 실행 시 FastMCP 라이프사이클이 누락되어 SSE 엔드포인트가 이벤트를 방출하지 않음.
- **현상 3 (진행중)**: 표준 SSE 전환 후 클러드 코드는 복구되었으나, 안티그라비티(Antigravity) 플랫폼 클라이언트가 `POST /sse` (405 에러)를 시도하며 연결 실패.

## 설계 결정
- **프로토콜 표준화**: 비표준 `streamable-http`를 폐기하고 표준 `mcp.server.sse`를 사용.
- **서비스 구동 방식**: `python -m uvicorn` 대신 `python src/mcp/server.py`를 통해 FastMCP가 직접 ASGI 루프를 제어하도록 변경.
- **하이브리드 대응**: 안티그라비티 플랫폼의 특이한 POST 패턴 대응을 위해 필요한 경우 라우팅 보완.

## 구현 계획
1. **[DONE]** `server.py`에서 `streamable_http_path` 및 `stateless_http` 제거, `transport="sse"`로 변경.
2. **[DONE]** `cli/main.py`의 시스템 서비스 설정을 `uvicorn`에서 `python` 명령으로 수정 및 `PYTHONPATH` 환경변수 추가.
3. **[TODO]** 안티그라비티 연결 복구를 위한 서버 사이드 POST 라우팅 검증.
4. **[TODO]** `DeukAgentContext`에 `setup-ide` 명령어를 내장하여 모든 프로젝트에 MCP 설정을 자동 주입.

## 검증 계획
- `curl -v -H "Accept: text/event-stream" http://localhost:8001/sse` 실행 시 `endpoint` 이벤트 즉시 수신 확인.
- 클러드 코드 `ListTools` 정상 동작 확인.
- 안티그라비티 도구 목록 노출 확인.

## 리스크
- 특정 에이전트 클라이언트가 구형 MCP 사양(POST /sse)을 고집할 경우 호환성 문제 발생 가능.

## 수용 기준
- 클러드 코드와 안티그라비티 모두 타임아웃 없이 MCP 도구를 즉시 로드해야 함.
- 프로젝트 전체에 대해 `deuk-agent-context setup-ide` 한 줄로 설정이 완료되어야 함.
