---
id: 130-mcp-server-connection-issue-joy-nucb
title: mcp-server-connection-issue
phase: 4
status: closed
docsLanguage: ko
summary: 현재 MCP 서버 연결 이슈를 조사하고 필요한 연결 안정화 수정을 수행한다.
createdAt: 2026-05-01 02:23:21
planLink: .deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md
priority: P2
tags:
  - mcp
  - connection
  - sse
  - stability
---


# mcp-server-connection-issue

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints

- **Target:** `scripts/cli-utils.mjs`, `scripts/tests/cli-utils.test.mjs`, `docs/claude-code-mcp-setup.md`, this ticket/plan/report.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `.mcp.json`, `.deuk-agent/docs/walkthroughs/079-mcp-hybrid-transport-fix-report.md`.
- **Design Rationale:** DeukAgentRules가 MCP 활성 상태를 안정적으로 감지해야 Phase 0/RAG 안내와 init 정책 메시지가 실제 연결 상태와 어긋나지 않는다.
- **Constraints:** DeukAgentContext 서버 코드는 이 티켓에서 수정하지 않는다. broad service restart, systemd 변경, generated output 변경은 금지한다.

## Agent Permission Contract (APC)

### [BOUNDARY]

- Editable modules: `scripts/cli-utils.mjs`, `scripts/tests/cli-utils.test.mjs`, `docs/claude-code-mcp-setup.md`, `.deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md`, this ticket, optional walkthrough report.
- Forbidden modules: DeukAgentContext server files, service/systemd configs, generated consumer spokes, benchmark/report generated artifacts, `bin/deuk-agent-rule.js`.
- Rule citation: PROJECT_RULE.md says real CLI logic lives in `scripts/`; generated consumer spokes are built from templates/core and must not be edited directly.

### [CONTRACT]

- Input: local `.mcp.json`, `isMcpActive()`/`probeMcpUrl()` implementation, existing MCP setup docs, 079 hybrid transport report.
- Output: MCP connection issue analysis, optional CLI detection hardening with focused tests, and updated documentation if needed.
- Side effects: Read-only MCP probe/test execution only. No package install, service restart, or server code mutation.

### [PATCH PLAN]

- Confirm `.mcp.json` registration and current SSE probe behavior.
- If detection is too narrow, patch `isMcpActive()`/`probeMcpUrl()` in `scripts/cli-utils.mjs`.
- Add/adjust tests in `scripts/tests/cli-utils.test.mjs` for the connection edge case.
- Update `docs/claude-code-mcp-setup.md` only if observed behavior differs from the guide.
- Run markdown lint and focused/all tests.

## Tasks

- [x] Inspect MCP setup docs, `.mcp.json`, current detection code, and 079 stability report.
- [x] Create concrete plan/APC and planLink file.
- [x] Move to Phase 2 after approval, then implement only if a concrete detection/doc gap is confirmed.
- [x] Verify with lint/tests and close/archive.

## Done When

MCP connection issue scope is concrete, Phase 2 can proceed without guessing, and any implementation stays limited to DeukAgentRules CLI detection/docs/tests.

## Verification

- [ ] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md .deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md`
- [x] `node --input-type=module -e "import { isMcpActive } from './scripts/cli-utils.mjs'; console.log(await isMcpActive(process.cwd()));"` returned `true`.
- [x] `node --test scripts/tests/cli-utils.test.mjs`: 17 tests passed.
- [x] `node --test scripts/tests/*.test.mjs`: 23 tests passed.
- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md .deuk-agent/docs/plans/130-mcp-server-connection-issue-joy-nucb-plan.md docs/claude-code-mcp-setup.md`

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/130-mcp-server-connection-issue-joy-nucb-report.md)
