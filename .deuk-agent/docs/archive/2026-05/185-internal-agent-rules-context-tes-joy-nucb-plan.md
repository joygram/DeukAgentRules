---
summary: "내부 에이전트룰 개선과 컨텍스트 연결 회귀 테스트 계획"
status: draft
priority: P2
tags:
  - plan
  - test
  - mcp
---

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 작업의 범위와 APC 경계를 관리한다.
- 이 문서는 strict ticket create 동작과 DeukContext 연결 회귀를 검증하기 위한 분석, 근거, 검증 설계만 담는다.
- 진행 체크박스는 두지 않는다.

## Problem Analysis
- 현재 CLI는 `--require-filled`와 `--from-plan` 조합에서 Phase 1 완성도 검사를 수행할 수 있다.
- 다만 이 동작을 보증하는 회귀 테스트가 부족해서, 규칙 개선 이후에도 placeholder 상태가 다시 허용될 위험이 있다.
- MCP 검색은 이번 질문에 대해 빈 결과를 반환했지만, 로컬 코드 분석에서 현재 동작이 이미 구현되어 있음을 확인했다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `runTicketCreate`는 strict create 경로에서 Phase 1 incomplete 상태를 감지하고 실패시 롤백한다.
- `scripts/cli-args.mjs`는 `--require-filled`와 `--from-plan` 인자를 이미 파싱한다.
- `scripts/tests/cli-ticket-commands.test.mjs`에는 `requireFilled` 인자와 dry-run 경로는 있지만, strict create 실패/롤백 경로를 직접 검증하는 테스트가 없다.
- `templates/rules.d/deukcontext-mcp.md`는 RAG miss 시 로컬 검색과 `add_knowledge`로 전환하라는 프로토콜을 정의한다.

## Cause Hypotheses
- 기능 자체의 결함보다, strict create 실패 경로에 대한 테스트 부재가 규칙 회귀의 원인일 가능성이 높다.
- 현재 규칙 문서는 MCP 사용과 로컬 진실 소스를 구분하지만, 이를 실제 코드 회귀 테스트와 연결하는 증거가 약하다.

## Decision Rationale
- CLI 로직을 다시 구현하는 대신, 현재 구현을 고정하는 회귀 테스트를 추가한다.
- 규칙 개선의 효과는 문서가 아니라 실제 동작 검증으로 확인하는 편이 더 안정적이다.
- MCP miss 후 로컬 분석을 신뢰하고, 그 사실을 DeukAgentContext에 한 번만 증류하는 절차를 유지한다.

## Execution Strategy
- `scripts/tests/cli-ticket-commands.test.mjs`에 strict create 실패 케이스를 추가한다.
- 테스트는 placeholder summary 또는 incomplete APC 상태가 strict create에서 거부되고, 생성된 티켓/plan/index가 롤백되는지 확인한다.
- 필요하면 문서 쪽의 설명도 현재 구현 상태에 맞게 최소한으로 보정한다.

## Verification Design
- `node --test scripts/tests/cli-ticket-commands.test.mjs`로 관련 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 티켓과 planLink 마크다운을 함께 검증한다.
- 실패 시 남는 파일이 없는지 `ticketDir`와 plan 디렉터리를 점검한다.

## Verification Outcome
- `node --test scripts/tests/cli-ticket-commands.test.mjs` 통과.
- `npx deuk-agent-rule lint:md` 통과.
- strict create 롤백 테스트는 placeholder summary 입력 시 티켓과 plan 파일을 남기지 않는 것을 확인했다.
