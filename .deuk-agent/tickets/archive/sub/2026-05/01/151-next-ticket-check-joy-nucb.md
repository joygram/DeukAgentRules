---
id: 151-next-ticket-check-joy-nucb
title: no-ticket-gitlog-fallback
phase: 4
status: closed
docsLanguage: ko
summary: 진행 가능한 티켓이 없을 때 신규 티켓을 즉시 만들기보다 최근 git log를 분석해 다음 작업 후보를 복원하도록 규칙을 보강한다.
priority: P2
tags:
  - ticket-discovery
  - workflow
createdAt: 2026-05-01 13:34:22
---


# no-ticket-gitlog-fallback

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, ticket CLI guidance, and matching user-facing documentation
- **Context Files:** `PROJECT_RULE.md`, recent git history, `scripts/cli-ticket-commands.mjs`, related docs
- **PlanLink:** `.deuk-agent/docs/plans/151-next-ticket-check-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, relevant `docs/` guidance, `scripts/cli-ticket-commands.mjs`, focused ticket tests, and this ticket's plan/report artifacts
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user correction that no-ticket fallback should inspect recent git history, plus current Ticket Discovery behavior
- Output: minimal rule/docs/CLI update that directs agents to perform recent git-log analysis before creating a follow-up ticket when `ticket next` finds none
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

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/151-next-ticket-check-joy-nucb-report.md)
