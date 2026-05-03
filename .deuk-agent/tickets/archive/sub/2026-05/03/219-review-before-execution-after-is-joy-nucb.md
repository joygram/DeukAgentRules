---
id: 219-review-before-execution-after-is-joy-nucb
title: review-before-execution-after-issue
phase: 4
status: closed
docsLanguage: ko
summary: 이슈 제기 후 티켓 생성 직후 검토 없이 실행으로 넘어가는 원인을 분석하고, 티켓 생성 후 진행 전 검토 절차를 강제하도록
  규칙/문서/검증을 수정합니다.
priority: P2
tags: []
createdAt: 2026-05-03 08:56:45
---


# review-before-execution-after-issue

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, ticket template, workflow docs, rule audit/tests
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, workflow docs, `scripts/lint-rules.mjs`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: canonical rules/docs/templates and focused audit/test code that define the issue-review gate.
- Forbidden modules: unrelated runtime code, generated consumer outputs unless synced from source, external module roots.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user complaint that issue reports are converted into tickets and immediately executed without review.
- Output: rule/docs/template/test guard that issue reports are Phase 1 review-gated before Phase 2 execution.
- Side effects: ticket updates, scoped rule/doc/template/test changes only.

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** Current rules let "explicit execution intent" count as approval after Phase 1, and the default agent posture says to implement unless the user only asks for a plan. Issue reports such as "원인 분석 및 해결" were therefore treated as permission to proceed directly after ticket creation.
- **Approach:** Add an issue-review gate: create/fill/lint the ticket first, then stop for user review before Phase 2 unless the user explicitly approves execution after seeing the ticket plan.
- **Verification:** Run rule audit, focused markdown lint, and tests asserting the review-gate rule exists.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Root Cause

- The global rules treated explicit execution intent as enough to move Phase 2 forward once a ticket existed, which was too permissive for issue/regression reports.
- The workflow docs explained Phase 1 and Phase 2, but did not clearly say that issue/regression reports must stop for user review after ticket creation.
- The ticket template and project rule needed an explicit “review-gated” sentence so the default posture is to pause after Phase 1, not to execute immediately.

## Verification Outcome

- `node --test scripts/tests/lint-rules.test.mjs scripts/tests/cli-ticket-commands.test.mjs` passed.
- `npx deuk-agent-rule rules audit --compact` passed.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md PROJECT_RULE.md templates/TICKET_TEMPLATE.md docs/how-it-works.md docs/how-it-works.ko.md docs/usage-guide.ko.md scripts/lint-rules.mjs scripts/tests/cli-ticket-commands.test.mjs .deuk-agent/tickets/sub/219-review-before-execution-after-is-joy-nucb.md` passed.

## Notes

- The active policy now says issue/regression reports are review-gated, `planLink` stays planning-only, and explicit execution intent only counts after the Phase 1 plan has been created or reviewed.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
