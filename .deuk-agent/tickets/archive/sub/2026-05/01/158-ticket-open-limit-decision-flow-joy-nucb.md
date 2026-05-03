---
id: 158-ticket-open-limit-decision-flow-joy-nucb
title: ticket-open-limit-decision-flow
phase: 3
status: closed
docsLanguage: en
summary: 오픈 티켓 20개 초과 시 자동 아카이브하지 않고 목록 확인 후 사용자가 정리 결정을 하게 한다
priority: P2
tags:
  - ticket
  - archive
createdAt: 2026-05-01 21:36:19
---


# ticket-open-limit-decision-flow

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `scripts/cli-ticket-commands.mjs`, focused ticket command tests
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **PlanLink:** `.deuk-agent/docs/plans/158-ticket-open-limit-decision-flow-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket create/archive command behavior and focused tests
- Forbidden modules: generated artifacts, unrelated init/rule/template distribution code, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current ticket create limit handling and manual archive behavior
- Output: open ticket limit enforcement that blocks excess creation and prints decision-oriented list guidance instead of auto-archiving
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
