---
id: 172-agent-context-token-kpi-evaluati-joy-nucb
title: agent-context-token-kpi-evaluation
phase: 4
status: closed
docsLanguage: ko
summary: DeukAgentContext 토큰 생성 이후 KPI 기반 존재 가치 평가 및 개선 계획 수립
priority: medium
tags:
  - deukagentcontext
  - telemetry
  - rag-quality
  - token-kpi
createdAt: 2026-05-02 06:19:36
---


# agent-context-token-kpi-evaluation

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, telemetry-related CLI modules under `scripts/`, and indexed planning/report artifacts under `.deuk-agent/docs/`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, telemetry-related CLI modules, and DeukAgentContext MCP quality guidance
- **PlanLink:** `.deuk-agent/docs/plans/172-agent-context-token-kpi-evaluati-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: this ticket, its planLink, scoped rule text in `core-rules/AGENTS.md`, and telemetry-related CLI modules under `scripts/` if implementation is later approved
- Forbidden modules: generated artifacts, broad init/sync outputs, unrelated shared infrastructure, external module roots, and official baseline/catalog expansions
- Rule citation: `PROJECT_RULE.md` DC-LEGACY/DC-OSS/DC-CODEGEN boundaries + `core-rules/AGENTS.md` v25 G1/G1.1/G1.2/G6/G7/G8/F3

### [CONTRACT]
- Input: current AGENTS approval/MCP quality rules, existing telemetry CLI behavior, and observed need to evaluate DeukAgentContext by token/KPI outcomes after generation
- Output: a KPI-driven evaluation plan for DeukAgentContext existence value; optional later implementation may add telemetry fields or reporting hooks only after Phase 2 approval
- Side effects: ticket + plan docs updates in Phase 1; no product/source/config mutation until planLink is complete and execution is approved

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

## Verification

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/172-agent-context-token-kpi-evaluati-joy-nucb.md .deuk-agent/docs/plans/172-agent-context-token-kpi-evaluati-joy-nucb-plan.md`: passed
- `node --test scripts/tests/cli-utils.test.mjs`: passed, 18 tests
