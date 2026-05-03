---
id: 195-deukagentrules-dotdeuk-agent-can-joy-nucb
title: deukagentrules-dotdeuk-agent-canonicalization
phase: 3
status: closed
docsLanguage: ko
summary: DeukAgentRules .deuk-agent 디렉토리의 현재/레거시 혼재 정리
priority: P2
tags:
  - deuk-agent
  - migration
  - docs
  - archive
  - scratch
createdAt: 2026-05-02 22:11:32
---


# deukagentrules-dotdeuk-agent-canonicalization

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `scripts/cli-init-commands.mjs`, `scripts/tests/cli-init-commands.test.mjs`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-init-commands.mjs`, `scripts/cli-init-logic.mjs`
- **PlanLink:** `.deuk-agent/docs/plans/195-deukagentrules-dotdeuk-agent-can-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-init-commands.mjs`, `scripts/tests/cli-init-commands.test.mjs`
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing init migration path plus current `.deuk-agent` layout state
- Output: minimal migration and tests that make `.deuk-agent` canonical again
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
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
- Legacy scratch reports and legacy archive shard directories are normalized into canonical `.deuk-agent/docs/walkthroughs/` and `.deuk-agent/tickets/archive/sub/` paths.
