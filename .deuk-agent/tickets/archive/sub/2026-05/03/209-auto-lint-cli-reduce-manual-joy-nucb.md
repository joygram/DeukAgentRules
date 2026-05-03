---
id: 209-auto-lint-cli-reduce-manual-joy-nucb
title: auto-lint-cli-reduce-manual
phase: 4
status: closed
docsLanguage: ko
summary: 수동 lint:md 반복 호출을 줄이도록 CLI 자동 린트 흐름을 보강한다.
priority: P2
tags: []
createdAt: 2026-05-03 07:49:34
---


# auto-lint-cli-reduce-manual

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** ticket lifecycle lint helpers in `scripts/cli-ticket-commands.mjs`, markdown lint target discovery in `scripts/lint-md.mjs`, and related tests.
- **Context Files:** `PROJECT_RULE.md`, `scripts/cli-ticket-commands.mjs`, `scripts/lint-md.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: CLI lint helper and ticket lifecycle command tests.
- Forbidden modules: generated artifacts, unrelated CLI command surfaces, release/package metadata
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user report that manual `lint:md` calls consume time/tokens after rule markdown edits.
- Output: ticket lifecycle commands automatically lint currently changed markdown files in addition to the ticket markdown they mutate.
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Reuse `lint-md` changed-file discovery instead of duplicating git parsing.
- Add changed markdown targets to ticket lifecycle lint targets.
- Cover the behavior with a ticket move regression test.

## Compact Plan

- **Problem:** lifecycle commands lint the ticket file they mutate, but markdown files changed during the same task still require separate manual `lint:md` calls.
- **Approach:** export changed markdown discovery from `lint-md` and include those files in ticket lifecycle lint targets.
- **Verification:** focused ticket command test, `npx deuk-agent-rule rules audit --compact`, and markdown lint as recorded.
- **Linked Issues:** Use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification

- `node --test --test-name-pattern "changed markdown outside|ignores linked plan markdown and still moves" scripts/tests/cli-ticket-commands.test.mjs` passed.
- `node --test scripts/tests/lint-md.test.mjs scripts/tests/cli-ticket-commands.test.mjs scripts/tests/lint-rules.test.mjs` passed.
- `npx deuk-agent-rule rules audit --compact` passed.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
