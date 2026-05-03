---
id: 218-planlink-execution-log-regressio-joy-nucb
title: planlink-execution-log-regression
phase: 4
status: closed
docsLanguage: ko
summary: planLink에 실행 기록을 남기는 잘못된 동작의 원인을 확인하고 규칙/템플릿/검증을 수정합니다.
priority: P2
tags: []
createdAt: 2026-05-03 08:50:29
---


# planlink-execution-log-regression

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, `templates/TICKET_TEMPLATE.md`, workflow docs, rule audit/tests
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, ticket template, workflow docs, lint rule/tests
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: canonical rules/docs/templates and focused audit/test code that define planLink boundaries.
- Forbidden modules: generated consumer outputs unless regenerated from source, unrelated runtime code, external module roots.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user screenshot showing final-answer claim that execution logs were written to planLink, current rules/docs mentioning planLink as analysis/verification-design storage.
- Output: explicit rule/doc/test guard that planLink is planning-only and must never receive execution logs, command transcripts, completion summaries, or verification results.
- Side effects: ticket updates, scoped rule/doc/template/test changes only.

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** Existing docs still described planLink as owning verification design and some guidance said to "정리" progress at completion, but did not explicitly forbid execution logs/results in planLink. That ambiguity let an agent treat planLink as a completion log target.
- **Approach:** Strengthen the canonical rule, local project rule, template, and user docs so planLink is strictly Phase 1 planning/design only; execution logs and verification results must live in the main ticket lifecycle record, report, final answer, or telemetry.
- **Verification:** Run rule audit, focused markdown lint, and tests that assert the new guard text is present.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Root Cause

- Canonical rules said `planLink` was optional, but older docs still described APC plus `planLink` as a required Phase 1 record.
- Several docs said `planLink` owned "verification design" without explicitly saying verification results and execution logs are forbidden there.
- The Korean prompt guide said to organize progress records at completion, which could be misread as putting execution summaries into a plan document.

## Verification Outcome

- `node --test scripts/tests/lint-rules.test.mjs scripts/tests/cli-ticket-commands.test.mjs` passed.
- `npx deuk-agent-rule rules audit --compact` passed.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md PROJECT_RULE.md templates/TICKET_TEMPLATE.md docs/how-it-works.md docs/how-it-works.ko.md docs/principles.md docs/principles.ko.md docs/usage-guide.ko.md docs/ticket-create-improvements.md .deuk-agent/tickets/sub/218-planlink-execution-log-regressio-joy-nucb.md` passed.
- `npx deuk-agent-rule init --workflow execute --non-interactive` synced the local ticket template copy.
- `rg -n -uu "If an optional planLink exists|Never append execution logs|planLink is planning-only|실행 로그|compact plan 미충족" .deuk-agent/templates templates core-rules PROJECT_RULE.md docs scripts/tests scripts/lint-rules.mjs` confirmed the guard text is present in source and synced templates.
- `npx deuk-agent-rule lint:md .deuk-agent/templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/218-planlink-execution-log-regressio-joy-nucb.md` passed after template sync.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
