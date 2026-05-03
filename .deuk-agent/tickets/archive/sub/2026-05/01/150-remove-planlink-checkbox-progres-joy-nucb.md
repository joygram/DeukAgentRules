---
id: 150-remove-planlink-checkbox-progres-joy-nucb
title: remove-planlink-checkbox-progress
phase: 4
status: closed
submodule: DeukAgentRules
project: DeukAgentRules
docsLanguage: ko
summary: planLink에서 진행 체크박스를 제거하고 티켓만 진행 상태를 소유하도록 규칙, 생성 초안, 테스트를 개선한다.
priority: P1
tags:
  - rules
  - planlink
  - progress
createdAt: 2026-05-01 13:27:50
---


# remove-planlink-checkbox-progress

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, focused TDW docs.
- **Context Files:** `PROJECT_RULE.md`, `templates/TICKET_TEMPLATE.md`, `docs/principles.ko.md`, `docs/usage-guide.ko.md`
- **PlanLink:** `.deuk-agent/docs/plans/150-remove-planlink-checkbox-progres-joy-nucb-plan.md` owns analysis and decision trace, not progress tracking.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, focused docs, this ticket/plan.
- Forbidden modules: generated artifacts, consumer spokes, consumer `AGENTS.md`, `bin/deuk-agent-rule.js`, unrelated CLI implementation.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN/DC-LEGACY/DC-OSS + `core-rules/AGENTS.md` v21.

### [CONTRACT]
- Input: current planLink analysis generator, TDW rules, and docs.
- Output: planLink draft without progress checkboxes; ticket remains the only progress checklist owner.
- Side effects: scoped rule/docs/test updates only.

### [PATCH PLAN]
- Remove checklist syntax from generated planLink analysis sections.
- Clarify in rules/docs that progress checkboxes belong to tickets, not planLink.
- Add regression coverage that generated planLink contains no markdown checkboxes.

## Tasks

- [x] Update rule/docs to separate ticket progress from planLink analysis.
- [x] Remove generated planLink checkbox prompts.
- [x] Add regression coverage and run verification.

## Done When

- Generated planLink drafts contain no `[ ]` or `[x]` checkbox syntax.
- Ticket remains the progress checklist owner.
- Markdown lint/tests pass.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/150-remove-planlink-checkbox-progres-joy-nucb-report.md)
