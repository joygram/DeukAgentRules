---
id: 222-remove-planlink-residual-fixture-joy-nucb
title: remove-planlink-residual-fixtures
phase: 4
status: closed
docsLanguage: ko
summary: 규칙 표면을 정리한 뒤에도 테스트 fixture와 동기화 파일에 남은 잔재를 정리하고, 검색 결과에서 더 이상 계획 링크가
  반복적으로 노출되지 않도록 합니다.
priority: P2
tags: []
createdAt: 2026-05-03 09:11:30
---


# remove-residual-fixtures

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** `scripts/tests/cli-init-commands.test.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, synced templates/pointers
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, `scripts/tests/cli-init-commands.test.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: residual test fixtures, synced templates/pointers, and focused tests that keep legacy planning links out of current guidance.
- Forbidden modules: unrelated runtime logic, external module roots, broad regeneration without approval.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: remaining legacy planning-link fixture strings in tests and synced pointer files.
- Output: tests and synced templates no longer advertise legacy planning links as part of current workflow guidance.
- Side effects: ticket updates, scoped fixture/test/template changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** Record the stable issue once in this main ticket. Do not duplicate design or analysis in follow-up tickets.
- **Approach:** Capture the selected design and analysis path here, including root cause, constraints, and the implementation direction. Split related follow-up work into sub tickets instead of expanding this record.
- **Verification:** List the smallest relevant commands or checks and the expected result.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Root Cause

- The current code and docs had mostly removed the old planning-link wording, but archived and fixture-based tests still contained the old string.
- `init` sync also copied a template copy into `.deuk-agent/templates`, so stale wording could keep reappearing after regeneration.
- The remaining occurrences were not new runtime behavior, but they kept the search surface noisy and made the removal look incomplete.

## Verification Outcome

- `node --test scripts/tests/lint-rules.test.mjs scripts/tests/cli-init-commands.test.mjs` passed.
- `npx deuk-agent-rule rules audit --compact` passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/222-remove-planlink-residual-fixture-joy-nucb.md scripts/tests/cli-init-commands.test.mjs scripts/tests/cli-ticket-commands.test.mjs` passed.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
