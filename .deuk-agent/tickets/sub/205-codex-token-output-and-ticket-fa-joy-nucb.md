---
id: 205-codex-token-output-and-ticket-fa-joy-nucb
title: codex-token-output-and-ticket-fastpath
phase: 2
status: active
docsLanguage: ko
summary: Codex 출력 토큰 소비를 줄이고 다음 티켓 탐색을 CLI 원샷으로 단축하는 개선 계획 수립
priority: P2
tags: []
createdAt: 2026-05-03 06:08:44
planLink: .deuk-agent/docs/plan/205-codex-token-output-and-ticket-fa-joy-nucb-plan.md
---


# codex-token-output-and-ticket-fastpath

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-migration.mjs`, `scripts/cli-init-commands.mjs`, `scripts/lint-rules.mjs`, `scripts/cli-args.mjs`, `scripts/cli.mjs`, related CLI tests
- **Context Files:** `PROJECT_RULE.md`, `docs/architecture.md`, target source files, linked plan
- **PlanLink:** `.deuk-agent/docs/plan/205-codex-token-output-and-ticket-fa-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, ticket template, ticket/init/rules CLI command/argument/help/migration code, and related tests required for compact ticket output, planLink consolidation, and rule audit returns.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current Low-Token rules, ticket discovery rules, `ticket next` behavior, CLI argument parsing, and ticket command tests.
- Output: main-ticket SSoT workflow, optional planLink creation, init migration for existing planLink consolidation, rg-first source inspection rules, machine-returnable rules audit, and matching tests.
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Compact Plan

- **Problem:** screen progress, ticket text, and planLink text duplicate the same planning facts and increase output plus future input token cost.
- **Approach:** make the main ticket the default planning SSoT, keep planLink opt-in for new tickets, consolidate existing planLink files into tickets during init, record related issues through CLI links, require rg-first source inspection, and add `rules audit` so violations return non-zero.
- **Verification:** run ticket/init CLI tests and markdown lint for changed rule/template/test files.
- **Linked Issues:** none.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Implement main-ticket compact plan default and optional planLink.
- [x] Implement init migration that removes existing ticket `planLink` frontmatter after compact consolidation.
- [x] Implement CLI rule audit for low-token and ticket SSoT violations.
- [x] Record verification outcome after markdown lint.

## Verification Outcome

- `node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-init-commands.test.mjs scripts/tests/cli-utils.test.mjs scripts/tests/lint-rules.test.mjs` passed.
- `node scripts/cli.mjs rules audit --compact` returned `rules:audit ok`.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md scripts/lint-rules.mjs scripts/cli.mjs scripts/cli-args.mjs scripts/tests/lint-rules.test.mjs scripts/tests/cli-utils.test.mjs .deuk-agent/tickets/sub/205-codex-token-output-and-ticket-fa-joy-nucb.md` passed.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
