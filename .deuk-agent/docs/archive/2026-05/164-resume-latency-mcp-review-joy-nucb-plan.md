---
summary: "Agent problem analysis and decision trace for 164-resume-latency-mcp-review-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 22:05:52"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
이어받기에서 지연이 발생하는 구간은 MCP 자체보다 규칙 부트스트랩, 티켓 식별 실패 복구, `npx` 기반 CLI 반복 실행, Phase 1 문서 보강과 lint/test 실행이 누적되는 구조다. 문제는 필수 안전 절차를 유지하면서도 매번 같은 규칙 숙지와 티켓 복구 비용을 줄일 수 있는 운영/CLI 설계가 부족하다는 점이다.

## Source Observations
- `core-rules/AGENTS.md`는 매 세션 첫 단계로 core rules와 `PROJECT_RULE.md` 읽기, 티켓 식별, `set_workflow_context` 호출을 요구한다.
- `core-rules/AGENTS.md`의 Ticket Discovery는 사용자가 티켓 ID/주제를 언급하면 직접 사용하고, 모호하면 `ticket next --path-only` 한 번으로 제한한다.
- `scripts/cli-ticket-commands.mjs`는 ticket create 시 MCP 활성 여부를 검사해 Phase 0 RAG 경고를 낸다.
- 직전 실행에서 MCP `search_tickets`와 `set_workflow_context` 응답은 짧았고, 지연은 `npx deuk-agent-rule` 다회 호출과 규칙/문서 작업 누적에서 발생했다.

## Cause Hypotheses
- 별칭 티켓(`득팩343`)이 실제 티켓 ID로 매칭되지 않으면 실패-검색-대체 탐색 경로가 발생한다.
- 규칙 숙지 결과가 세션 단위로만 존재하고 CLI/티켓 상태에는 “이미 읽은 규칙 버전” 캐시가 없다.
- `npx` 호출은 Node startup과 local proxy 탐색 비용이 반복된다.
- MCP 활성 여부 확인과 RAG 검색은 계측이 부족해, 사용자가 지연 원인을 MCP로 오인하기 쉽다.

## Decision Rationale
안전 규칙을 줄이는 대신 “증거 있는 fast path”를 만든다. core rules 버전, project rule mtime/hash, active ticket id, phase, plan completeness, MCP 상태, CLI 호출 시간을 한 번에 보고하는 resume preflight가 있으면 에이전트가 읽어야 할 최소 항목을 바로 알 수 있다. MCP는 끄는 대상이 아니라 계측과 timeout/fallback 정책을 넣어 병목 여부를 분리해야 한다.

## Execution Strategy
제안은 세 단계다. 첫째, `ticket resume` 또는 `agent preflight` 명령을 추가해 규칙 버전/프로젝트 규칙/활성 티켓/planLink 완성도/MCP 상태를 JSON으로 한 번에 반환한다. 둘째, 티켓 별칭 인덱스를 도입해 사용자의 짧은 별칭을 실제 티켓 ID로 해석한다. 셋째, CLI 내부에 latency trace를 추가해 `rulesRead`, `ticketResolve`, `mcpProbe`, `ragSearch`, `lint`, `test` 같은 구간별 시간을 출력하거나 telemetry에 남긴다.

요구사항 반영 범위는 즉시 효과가 있는 두 지점으로 좁힌다. `ticket use`에서 주어진 topic이 매칭되지 않으면 마지막 closed 티켓과 현재 open/active 티켓 목록을 보여주고, interactive 모드에서는 그 후보 중 선택하게 한다. non-interactive 모드에서는 자동 선택하지 않고 후보와 명령 예시를 포함한 오류를 반환한다. 또한 core rule의 Phase 4 문구는 즉시 archive를 강제하지 않고 close를 완료 상태로 보며, archive는 lazy cleanup이나 명시적 보관 작업으로 맡기도록 바꾼다.

## Verification Design
계획 단계에서는 markdown lint로 티켓과 planLink의 형식을 검증한다. 실행 단계로 전환하면 preflight 명령 단위 테스트, 별칭 매칭 테스트, MCP timeout/fallback 테스트, 기존 ticket create/next/archive 회귀 테스트를 추가한다. 기대 결과는 모호한 이어받기의 첫 왕복을 줄이고, MCP가 느린지 CLI가 느린지 수치로 판별 가능해지는 것이다.

## Verification Result
`ticket use` 매칭 실패 시 마지막 closed 티켓과 open/active 티켓 후보를 보여주는 회귀 테스트를 추가했다. `node --test scripts/tests/cli-ticket-commands.test.mjs`는 17개 subtest가 통과했고, `node --test scripts/tests/*.test.mjs`는 41개 subtest가 통과했다. markdown lint는 티켓과 planLink에 대해 통과했다.
