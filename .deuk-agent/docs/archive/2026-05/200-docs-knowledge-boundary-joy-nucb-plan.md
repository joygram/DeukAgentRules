---
summary: "docs와 knowledge 경계 명확화 및 JSON 오분류 방지 계획"
status: verified
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 22:53:53"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`.deuk-agent/docs`와 `.deuk-agent/knowledge`가 모두 과거 작업 보존처럼 보이면서 역할 경계가 흐립니다. 특히 init 정리 로직이 `.json` 파일을 모두 knowledge로 보내고 있어 임의 JSON 산출물도 검색용 지식처럼 보일 수 있습니다. 이는 knowledge를 "distilled retrieval artifact"로 쓰려는 정책과 충돌합니다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`는 티켓 archive 시 `id`, `title`, `summary`, `sourceTicketPath`, `sections`, `analysis`를 가진 JSON을 `.deuk-agent/knowledge/<ticket-id>.json`에 생성합니다.
- `scripts/cli-init-commands.mjs`의 `classifyAgentFileTarget()`은 현재 모든 `.json`을 `.deuk-agent/knowledge/`로 이동합니다.
- `core-rules/AGENTS.md`는 plans/reports/scratch의 문서 위치는 정의하지만 docs와 knowledge의 차이는 명시하지 않습니다.

## Cause Hypotheses
- 역할 정의가 문서화되지 않아 "archive 문서"와 "검색용 요약 JSON"이 같은 보존층처럼 인식됩니다.
- init의 자동 분류가 파일 확장자만 보고 JSON을 knowledge로 보내며, knowledge JSON의 최소 구조를 확인하지 않습니다.

## Decision Rationale
`docs`는 사람이 읽는 원문/계획/리포트/스키마/임시노트로 정의하고, `knowledge`는 archive에서 추출된 기계 검색용 요약 JSON으로 정의합니다. 따라서 임의 JSON은 knowledge가 아니라 `docs/scratch`로 이동해야 합니다. 이 기준을 core rule, template rule, init classifier, regression test에 함께 반영합니다.

## Execution Strategy
`classifyAgentFileTarget()`에 knowledge JSON shape check를 추가합니다. `id`, `summary`, `sourceTicketPath`, `sections`, `analysis`가 있는 JSON만 knowledge로 유지하고, 그 외 JSON은 `docs/scratch`로 분류합니다. `core-rules/AGENTS.md`와 `templates/rules.d/deukcontext-mcp.md`에 docs/knowledge 경계를 짧게 명시합니다. 기존 test fixture도 임의 JSON은 scratch로 가고, distilled knowledge shape만 knowledge로 가도록 바꿉니다.

## Verification Design
`node --check scripts/cli-init-commands.mjs`, `node --test scripts/tests/cli-init-commands.test.mjs`, `node --test scripts/tests/*.test.mjs`, 관련 markdown lint를 실행합니다. 기대 결과는 임의 JSON 오분류가 방지되고, 기존 archive knowledge distillation 테스트는 유지되는 것입니다.

## Verification Outcome
- `classifyAgentFileTarget()` now sends only distilled knowledge JSON to `.deuk-agent/knowledge/`.
- Arbitrary JSON files are routed to `.deuk-agent/docs/scratch/` as human/source artifacts.
- `core-rules/AGENTS.md` and `templates/rules.d/deukcontext-mcp.md` now define the docs/knowledge boundary.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/rules.d/deukcontext-mcp.md .deuk-agent/tickets/sub/200-docs-knowledge-boundary-joy-nucb.md .deuk-agent/docs/plans/200-docs-knowledge-boundary-joy-nucb-plan.md` passed.
- `node --test scripts/tests/*.test.mjs` passed.
- `npx deuk-agent-rule init --dry-run` found no additional cleanup target in the current workspace.
