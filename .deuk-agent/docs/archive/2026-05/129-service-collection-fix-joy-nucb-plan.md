---
summary: 서비스 서버 감지와 자료 수집/동기화 실패 처리를 안정화한다.
status: active
priority: high
tags:
  - service
  - telemetry
  - mcp
---

# 129-service-collection-fix-joy-nucb 계획

## 목표
서비스 서버 감지와 자료 수집이 실패하는 경로를 수정해 티켓 생성의 MCP 상태 확인과 텔레메트리 수집/동기화가 검증 가능하게 동작하도록 한다.

## 실행 범위
- `scripts/cli-utils.mjs`: MCP/SSE 서비스 감지 로직 보강
- `scripts/cli-telemetry-commands.mjs`: 텔레메트리 로그/동기화 처리 보강
- `scripts/tests/`: 회귀 테스트 추가

## 제외 범위
- `core-rules/`, `templates/`, `oss-public/`, `bin/deuk-agent-rule.js`
- 생성 산출물 재생성 및 OSS 동기화 실행

## 실행 단계
- [x] 현재 MCP/SSE 감지 실패 조건을 테스트로 고정한다.
- [x] `/sse` 엔드포인트가 `HEAD`를 지원하지 않아도 활성 서버로 판단할 수 있게 `isMcpActive`를 수정한다.
- [x] 텔레메트리 로그 수집 입력을 안정화하고, 원격 동기화 실패 시 실패 상태를 보존하며 호출자가 실패를 볼 수 있게 수정한다.
- [x] 관련 단위 테스트를 추가한다.
- [x] `node --test scripts/tests/`와 `npx deuk-agent-rule lint:md`를 실행한다.

## 검증 기준
- SSE 서버가 `GET` 스트림 또는 405/404가 아닌 성공 계열 응답을 반환하면 MCP 활성으로 판단한다.
- MCP command 설정은 기존처럼 활성으로 판단한다.
- 텔레메트리 로그 파일은 유효한 JSONL로 유지된다.
- 원격 동기화 실패 시 미동기 항목은 `synced: false`로 남는다.
