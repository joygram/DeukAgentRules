---
summary: "MCP 서버 연결 감지 안정화 보고서"
status: complete
priority: P2
tags:
  - report
  - mcp
  - connection
  - sse
  - stability
---

# MCP 서버 연결 감지 안정화 보고서

## 변경 요약

- 현재 workspace의 `.mcp.json` 기반 MCP 감지는 정상으로 확인했다.
- `isMcpActive()`가 앞쪽 MCP config JSON parse 실패 시 즉시 `false`를 반환하던 흐름을 수정해 다음 후보 config를 계속 확인하도록 했다.
- malformed `.mcp.json` 뒤에 정상 `.cursor/mcp.json`이 있는 경우를 회귀 테스트로 추가했다.
- DEBUG parse 로그는 stack trace 대신 짧은 메시지만 출력하도록 줄였다.

## 검증

- `node --input-type=module -e "import { isMcpActive } from './scripts/cli-utils.mjs'; console.log(await isMcpActive(process.cwd()));"`: `true`.
- `GET http://localhost:8001/sse`: `200`, `text/event-stream`.
- `node --test scripts/tests/cli-utils.test.mjs`: 17 tests passed.
- `node --test scripts/tests/*.test.mjs`: 23 tests passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md .deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md docs/claude-code-mcp-setup.md`: passed.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- DeukAgentContext 서버 코드, systemd/service 설정, generated outputs는 수정하지 않았다.
