---
summary: "MCP 지식 품질 저하와 자연 보강 루프 개선 계획"
status: ready
priority: P1
tags:
  - plan
  - phase1
createdAt: "2026-05-01 22:23:10"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 MCP 지식 검색은 오래된 archived ticket, placeholder plan, 중복 ticket/report chunk를 높은 점수로 반환한다. 그 결과 에이전트가 실제 코드를 바로 읽어야 하는 상황에서도 RAG를 반복 호출하고, 검색 결과가 부실한데도 로컬 분석 결과를 `add_knowledge`나 문서 refresh로 승격하지 않는다. 지식 저장소가 "현재 코드 상태를 설명하는 기억"이 아니라 "과거 티켓 조각의 대량 검색"처럼 동작한다.

## Source Observations
- `decision_advisory` 결과는 `fragmentation_detected: true`, `dynamic_chunk_count: 8`, `active_ticket_count: 232`를 보고했고, 오래된 archived ticket placeholder를 evidence로 반환했다.
- `synthesize_knowledge`는 동일 archive ticket과 placeholder plan을 반복 반환했다.
- DeukAgentContext `src/mcp/server.py`의 `synthesize_knowledge`는 rules/tickets/source를 모두 검색한 뒤 단순 distance 정렬 및 상위 slice를 수행한다.
- DeukAgentContext `src/mcp/rag_codec_adapter.py`는 placeholder를 skip summary로 표시하지만 응답 chunk 자체는 유지한다.
- DeukAgentRules `distillKnowledge()`는 ticket 본문의 일부 섹션만 추출한다. 현재 티켓 구조에서 핵심 분석은 대부분 `planLink`에 있으므로 knowledge JSON이 빈 sections가 되기 쉽다.
- `templates/rules.d/deukcontext-mcp.md`는 RAG miss 시 `add_knowledge`를 optional로만 안내한다.

## Cause Hypotheses
- 검색 단계에 quality gate가 없어서 placeholder/중복/오래된 archive가 에이전트 응답까지 올라온다.
- DeukAgentRules archive 지식 증류가 planLink를 읽지 않아 실제 분석과 검증 결과가 MCP에 자연 보강되지 않는다.
- 에이전트 규칙이 RAG를 "우선"으로만 말하고, 낮은 품질 결과를 버리고 로컬 코드 분석으로 전환하는 기준이 부족하다.
- `add_knowledge`가 miss 후 선택 사항으로 표현되어 reusable finding이 있어도 자연 호출되지 않는다.

## Decision Rationale
이번 패치는 DeukAgentRules 쪽에서 즉시 개선 가능한 두 지점을 먼저 고친다. MCP 서버의 protected file을 직접 수정하지 않고, 1) archive knowledge distillation에 planLink analysis/decision/verification을 포함하고, 2) core/template RAG protocol에 quality gate와 natural enrichment 의무를 추가한다. DeukAgentContext 서버의 dedup/rerank/filter는 별도 티켓에서 다루는 것이 안전하다.

## Execution Strategy
`scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`를 확장해 ticket sections와 planLink sections를 각각 JSON에 저장한다. planLink 경로는 ticket frontmatter의 `planLink`를 기준으로 cwd에서 읽는다. 테스트는 archive 실행 후 `.deuk-agent/knowledge/<ticket>.json`에 planLink의 Problem Analysis, Source Observations, Decision Rationale, Verification Outcome이 들어가는지 검증한다. `core-rules/AGENTS.md`와 `templates/rules.d/deukcontext-mcp.md`에는 MCP 품질 게이트와 `add_knowledge` 승격 기준을 명시한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs`로 archive knowledge distillation regression을 검증한다. `npx deuk-agent-rule lint:md`로 수정된 markdown 문서와 티켓/플랜을 검증한다. 잔여 리스크는 DeukAgentContext 서버 내부 검색 랭킹/중복 제거가 아직 남는다는 점이며, protected-file 변경은 별도 티켓과 승인이 필요하다.

## Execution Notes
- Updated `distillKnowledge()` in `scripts/cli-ticket-commands.mjs` to store both ticket sections and planLink analysis sections in `.deuk-agent/knowledge/<ticket>.json`.
- Added `extractMarkdownSections()` and `readPlanLinkSections()` so archive knowledge includes current Problem Analysis, Source Observations, Decision Rationale, Execution Notes, and Verification Outcome from the plan file.
- Updated `core-rules/AGENTS.md` to version 25 with an MCP Knowledge Quality Gate.
- Updated `templates/rules.d/deukcontext-mcp.md` to treat placeholder, duplicate, stale, or unrelated RAG hits as misses and require local code analysis plus `add_knowledge` for reusable findings.
- Added a regression test proving archive knowledge JSON includes planLink analysis evidence.
- Added a DeukAgentContext dynamic knowledge fact for this exact source-level finding via `add_knowledge`.

## Verification Outcome
- `node --test scripts/tests/cli-ticket-commands.test.mjs` passed: 18/18 tests.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/rules.d/deukcontext-mcp.md .deuk-agent/tickets/sub/166-mcp-knowledge-quality-natural-re-joy-nucb.md .deuk-agent/docs/plans/166-mcp-knowledge-quality-natural-re-joy-nucb-plan.md` passed.
- Residual risk: DeukAgentContext MCP server still needs a separate protected-file ticket for search result deduplication, placeholder suppression, source-code-first reranking, and stale archive demotion.
