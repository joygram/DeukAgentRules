---
summary: "MCP 서버 연결 감지 이슈 조사 및 DeukAgentRules CLI 안정화 계획"
status: draft
priority: P2
tags:
  - plan
  - mcp
  - connection
  - sse
  - stability
---

# MCP 서버 연결 이슈 처리 계획

## 목표

DeukAgentRules가 DeukAgentContext MCP 서버 연결 상태를 정확히 감지하도록 조사하고, 필요한 경우 CLI 감지 로직과 테스트/문서를 최소 수정한다.

## 현재 확인 사항

- 프로젝트 루트 `.mcp.json`에는 `deuk-agent-context`가 `http://localhost:8001/sse`로 등록되어 있다.
- `scripts/cli-utils.mjs`의 `isMcpActive()`는 다음 경로를 확인한다.
  - `.mcp.json`
  - `.cursor/mcp.json`
  - `.vscode/mcp.json`
- SSE URL은 `probeMcpUrl()`에서 `HEAD`, `GET` 순서로 1초 timeout probe를 수행한다.
- 기존 테스트는 stdio command config와 `HEAD 405 → GET 200` SSE fallback을 검증한다.
- 079 보고서에 따르면 DeukAgentContext 서버는 `GET /sse`와 legacy `POST /sse`를 모두 처리하는 hybrid transport로 안정화된 이력이 있다.

## 실행 후보

1. [x] Read-only 재현
   - `.mcp.json` parse가 정상인지 확인한다.
   - 가능하면 `isMcpActive(process.cwd())`를 직접 호출해 현재 workspace 감지 결과를 확인한다.
   - 실제 `curl`/fetch probe는 읽기 요청만 사용한다.

2. [x] CLI 감지 하드닝
   - `mcpServers`와 `servers` schema는 유지한다.
   - `type: "sse"`가 있고 url이 있는 경우를 명확히 처리한다.
   - 여러 config 파일 중 하나가 실패해도 다른 후보를 계속 확인할지 검토한다.
   - JSON parse 실패가 전체 false로 조기 종료되는 현재 동작이 문제라면 테스트와 함께 수정한다.

3. [x] 테스트
   - 기존 `isMcpActive` 테스트 유지.
   - 필요 시 malformed `.mcp.json` 뒤에 `.cursor/mcp.json`이 정상일 때 fallback 되는 케이스를 추가한다.
   - 필요 시 URL probe timeout/failure 후 stdio config 감지 케이스를 추가한다.

4. [x] 문서
   - `docs/claude-code-mcp-setup.md`가 현재 `.mcp.json` 상태나 모델/effort 안내와 다르면 보정한다.
   - 문서 변경은 실제 확인된 차이에 한정한다.

## 비범위

- DeukAgentContext 서버 코드 수정.
- systemd service 수정/재시작.
- `claude mcp add` 실행으로 사용자 환경 변경.
- broad generated output 재생성.

## 검증

- [x] `node --test scripts/tests/cli-utils.test.mjs`
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md docs/claude-code-mcp-setup.md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md .deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md`

## 승인 게이트

이 계획은 Phase 1 산출물이다. Phase 2 승인 전에는 CLI 코드, 테스트, 문서를 수정하지 않는다.
