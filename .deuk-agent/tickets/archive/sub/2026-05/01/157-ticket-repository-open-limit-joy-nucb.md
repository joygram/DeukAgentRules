---
id: 157-ticket-repository-open-limit-joy-nucb
title: ticket-repository-open-limit
phase: 3
status: closed
docsLanguage: en
summary: 오픈 티켓이 20개를 넘지 않도록 자동 정리하고 아카이브를 년월/일 단위로 그룹화한다
priority: P2
tags:
  - ticket
  - archive
createdAt: 2026-05-01 21:30:46
---


# ticket-repository-open-limit

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `scripts/cli-ticket-commands.mjs`, `scripts/cli-utils.mjs`, ticket command tests
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-parser.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, `scripts/tests/cli-utils.test.mjs`
- **PlanLink:** `.deuk-agent/docs/plans/157-ticket-repository-open-limit-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket CLI command/path logic and focused tests for open-ticket pruning and archive grouping
- Forbidden modules: generated artifacts, OSS sync outputs, unrelated init/rule/template distribution code, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing ticket create/archive/index behavior and path conventions
- Output: automatic enforcement that open/active tickets do not exceed 20 after creation, plus archived ticket paths grouped by year-month and day
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
