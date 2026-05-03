---
id: 166-mcp-knowledge-quality-natural-re-joy-nucb
title: mcp-knowledge-quality-natural-refresh
phase: 3
status: closed
docsLanguage: ko
summary: MCP 지식 검색 품질 저하와 자연 보강 부재 문제를 분석하고 개선 방향을 수립한다
priority: P1
tags:
  - mcp
  - knowledge-quality
  - rag
  - workflow
createdAt: 2026-05-01 22:23:10
planLink: .deuk-agent/docs/plans/166-mcp-knowledge-quality-natural-re-joy-nucb-plan.md
---


# mcp-knowledge-quality-natural-refresh

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `templates/rules.d/deukcontext-mcp.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Context Files:** `PROJECT_RULE.md`, DeukAgentContext MCP search/advisory evidence, `scripts/cli-ticket-commands.mjs`, RAG protocol template
- **PlanLink:** `.deuk-agent/docs/plans/166-mcp-knowledge-quality-natural-re-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no broad MCP server protected-file changes without explicit DeukAgentContext approval, keep this patch to DeukAgentRules-side behavior and tests.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: DeukAgentRules rule templates, core rules, ticket archive knowledge distillation, focused tests
- Forbidden modules: generated artifacts, unrelated docs, DeukAgentContext protected `src/mcp/server.py` without separate approval
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: MCP search quality observations, current RAG protocol, archive knowledge distillation behavior
- Output: stricter RAG quality protocol plus archive knowledge JSON that includes planLink analysis/decision/verification evidence
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
