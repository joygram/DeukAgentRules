---
id: 179-md-lint-automation-and-rule-hard-joy-nucb
title: md-lint-automation-and-rule-hardening
phase: 1
status: open
docsLanguage: ko
summary: 티켓 lifecycle에 md lint 자동화를 편입하고 에이전트룰의 검증 경계를 보강한다
createdAt: 2026-05-02 09:52:13
planLink: .deuk-agent/docs/plans/179-md-lint-automation-and-rule-hard-joy-nucb-plan.md
---
# md-lint-automation-and-rule-hardening

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `md-lint-automation-and-rule-hardening`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/179-md-lint-automation-and-rule-hard-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "티켓 lifecycle에 md lint 자동화를 편입하고 에이전트룰의 검증 경계를 보강한다"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "티켓 lifecycle에 md lint 자동화를 편입하고 에이전트룰의 검증 경계를 보강한다"
- Output: minimal implementation and tests that satisfy "티켓 lifecycle에 md lint 자동화를 편입하고 에이전트룰의 검증 경계를 보강한다"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [ ] Complete non-duplicative `planLink` evidence/steps/verification.
- [ ] Execute changes inside APC boundary.
- [ ] Record verification outcome in the linked report or planLink.
- [ ] Make ticket lifecycle commands auto-run markdown lint and roll back on failure.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands enforce markdown lint automatically on touched artifacts.
