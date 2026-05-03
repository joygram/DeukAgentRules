---
id: 149-planlink-agent-analysis-content-joy-nucb
title: planlink-agent-analysis-content
phase: 4
status: closed
submodule: DeukAgentRules
project: DeukAgentRules
docsLanguage: ko
summary: 기획문서(planLink)에 티켓과 다른 에이전트 문제분석, 원인 가설, 결정 근거, 검증 설계가 담기도록 규칙과 생성 초안을 정리한다.
priority: P1
tags:
  - rules
  - planlink
  - analysis
createdAt: 2026-05-01 13:22:18
planLink: .deuk-agent/docs/plans/149-planlink-agent-analysis-content-joy-nucb-plan.md
---


# planlink-agent-analysis-content

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, focused TDW docs.
- **Context Files:** `PROJECT_RULE.md`, `templates/TICKET_TEMPLATE.md`, `docs/principles.ko.md`, `docs/usage-guide.ko.md`
- **PlanLink:** `.deuk-agent/docs/plans/149-planlink-agent-analysis-content-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, focused docs, this ticket/plan.
- Forbidden modules: generated artifacts, consumer spokes, consumer `AGENTS.md`, `bin/deuk-agent-rule.js`, unrelated CLI implementation.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN/DC-LEGACY/DC-OSS + `core-rules/AGENTS.md` v20.

### [CONTRACT]
- Input: current planLink ownership rule, plan draft generator, and docs that describe planLink.
- Output: planLink rule/generator that requires agent-authored analysis rather than ticket-like restatement.
- Side effects: scoped rule/docs/test updates only.

### [PATCH PLAN]
- Preserve ticket as contract/boundary only.
- Move analysis requirements into planLink sections and generator.
- Add regression coverage that generated planLink includes analysis-specific sections.

## Tasks

- [x] Complete analysis-focused `planLink`.
- [x] Update rule/generator/docs inside APC boundary.
- [x] Record verification outcome.

## Done When

- planLink is defined as agent analysis, not a second ticket.
- Generated planLink draft prompts problem analysis, hypotheses, rationale, strategy, and verification design.
- Markdown lint/tests pass.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/149-planlink-agent-analysis-content-joy-nucb-report.md)
