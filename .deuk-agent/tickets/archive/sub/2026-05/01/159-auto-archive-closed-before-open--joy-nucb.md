---
id: 159-auto-archive-closed-before-open--joy-nucb
title: auto-archive-closed-before-open-limit
phase: 3
status: closed
docsLanguage: en
summary: 오픈 티켓 상한 초과 시 closed 계열 티켓은 자동 아카이브하고 open/active 정리는 사용자 결정으로 남긴다
priority: P2
tags:
  - ticket
  - archive
createdAt: 2026-05-01 21:39:29
---


# auto-archive-closed-before-open-limit

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `scripts/cli-ticket-commands.mjs`, focused ticket command tests
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **PlanLink:** `.deuk-agent/docs/plans/159-auto-archive-closed-before-open--joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket create/archive command behavior and focused tests
- Forbidden modules: generated artifacts, unrelated init/rule/template distribution code, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current ticket create limit handling and archive behavior
- Output: closed/cancelled/wontfix tickets auto-archive during create, while open/active over-limit handling remains user-decision based
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
