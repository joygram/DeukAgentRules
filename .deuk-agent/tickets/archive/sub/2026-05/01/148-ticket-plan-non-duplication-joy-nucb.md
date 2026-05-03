---
id: 148-ticket-plan-non-duplication-joy-nucb
title: ticket-plan-non-duplication
phase: 4
status: closed
submodule: DeukAgentRules
project: DeukAgentRules
docsLanguage: ko
summary: 티켓과 기획문서의 역할을 분리해 중복 내용을 금지하고, 각각 계약/실행근거로 검색 신호를 나누도록 규칙과 템플릿을 정리한다.
priority: P1
tags:
  - rules
  - ticket
  - planlink
createdAt: 2026-05-01 13:14:10
---


# ticket-plan-non-duplication

> Restrict changes to **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, `scripts/cli-ticket-commands.mjs`, focused TDW docs.
- **Context Files:** `PROJECT_RULE.md`, `docs/principles.ko.md`, `docs/usage-guide.ko.md`, `docs/how-it-works.ko.md`
- **Design Rationale:** 티켓과 planLink가 같은 summary/steps를 반복하면 RAG 검색 신호가 흐려지고, 에이전트가 티켓/기획문서를 중복 산출물로 오해한다.
- **Constraints:** 생성물은 수정하지 않는다. 티켓은 계약/경계, planLink는 근거/실행/검증을 맡도록 역할을 분리한다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, `scripts/cli-ticket-commands.mjs`, focused docs under `docs/`, this ticket/plan.
- Forbidden modules: generated artifacts, consumer `.cursor/rules/`, consumer `AGENTS.md`, `bin/deuk-agent-rule.js`, unrelated CLI implementation.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN/DC-LEGACY/DC-OSS + `core-rules/AGENTS.md` v19.

### [CONTRACT]
- Input: current Phase 1 rules, ticket template, plan draft generator, and user-facing TDW docs.
- Output: non-overlap rule: ticket owns identity/scope/APC; planLink owns evidence/steps/verification.
- Side effects: scoped rule/template/docs updates only.

### [PATCH PLAN]
- Update core rules to forbid duplicated ticket/plan content and require replacement with cross-references.
- Update ticket template so it does not include detailed execution evidence or duplicate plan steps.
- Update plan draft generator so generated plans do not repeat ticket summary/APC and instead hold evidence, implementation steps, and verification.

## Tasks

- [x] Update core rule wording for non-overlap.
- [x] Update ticket template and generated plan draft shape.
- [x] Update docs that describe planLink/APC roles.
- [x] Run markdown lint and node tests.

## Done When

- Ticket and planLink have distinct responsibilities.
- Generated ticket/plan drafts avoid repeating the same summary/steps.
- Markdown lint and relevant node tests pass.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/148-ticket-plan-non-duplication-joy-nucb-report.md)
