---
id: 129-service-collection-fix-joy-nucb
title: service-collection-fix
phase: 4
status: closed
priority: high
tags:
  - service
  - telemetry
  - mcp
docsLanguage: ko
summary: 서비스 서버와 자료 수집이 제대로 이루어지지 않는 문제를 조사하고 수정한다.
createdAt: 2026-05-01 02:19:06
planLink: .deuk-agent/docs/plans/129-service-collection-fix-joy-nucb-plan.md
---


# service-collection-fix

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `scripts/cli-utils.mjs`, `scripts/cli-telemetry-commands.mjs`, `scripts/tests/`
- **Context Files:** `PROJECT_RULE.md`, `docs/architecture.md`, `scripts/cli-ticket-commands.mjs`, `package.json`
- **Design Rationale:** MCP/SSE 서비스 감지와 텔레메트리 자료 수집/동기화 실패가 티켓 생성과 운영 데이터 수집 흐름을 불안정하게 만든다.
- **Constraints:** 생성 산출물과 OSS 동기화 산출물은 수정하지 않는다. 서비스 감지는 실패해도 티켓 생성 자체를 막지 않아야 한다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-utils.mjs`, `scripts/cli-telemetry-commands.mjs`, `scripts/tests/`
- Forbidden modules: `core-rules/`, `templates/`, `oss-public/`, `bin/deuk-agent-rule.js`, 생성/동기화 산출물
- Rule citation: `PROJECT_RULE.md` Module Ownership, DC-CODEGEN, DC-OSS

### [CONTRACT]
- Input: MCP 설정 파일(`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`), `.deuk-agent/config.json`, `.deuk-agent/telemetry.jsonl`
- Output: SSE/HTTP 서비스 활성 여부를 안정적으로 감지하고, 텔레메트리 로그 수집 및 원격 동기화 실패를 검증 가능한 방식으로 처리한다.
- Side effects: 로컬 텔레메트리 파일에 로그가 추가되거나, 원격 동기화 성공 시 `synced` 상태가 갱신된다.

### [PATCH PLAN]
- `isMcpActive`의 SSE 감지를 `HEAD` 단일 시도에서 `GET`/스트리밍 응답 허용 방식으로 보강한다.
- 텔레메트리 입력 검증과 동기화 실패 처리를 보강해 호출자가 실패를 확인할 수 있게 한다.
- Node test로 SSE 감지, command 기반 MCP 감지, 텔레메트리 수집/동기화 동작을 검증한다.

## Tasks
- [x] MCP/SSE 서비스 감지 실패 경로 재현 및 수정
- [x] 텔레메트리 자료 수집/동기화 실패 처리 보강
- [x] 관련 테스트 추가 및 전체 테스트 실행

## Done When
> `node --test scripts/tests/`가 통과하고, MCP/SSE 감지와 텔레메트리 수집/동기화 실패 처리 동작이 테스트로 검증된다.
