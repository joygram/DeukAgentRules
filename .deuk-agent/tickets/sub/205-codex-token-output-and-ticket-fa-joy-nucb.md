---
summary: 205-codex-token-output-and-ticket-fa-joy-nucb
status: active
priority: P3
tags: migrated
id: 205-codex-token-output-and-ticket-fa-joy-nucb
title: 205-codex-token-output-and-ticket-fa-joy-nucb
createdAt: 2026-05-03 07:16:33
---

# 205-codex-token-output-and-ticket-fa-joy-nucb

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** CLI ticket discovery, token output, and fast-path navigation rules.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, ticket CLI source files, and relevant tests.
- **Constraints:** no unrelated refactors, no broad regeneration without approval, no generated output edits.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-migration.mjs`, `scripts/cli-init-commands.mjs`, `scripts/cli-args.mjs`, `scripts/cli.mjs`, and relevant tests.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots.
- Rule citation: `PROJECT_RULE.md` + `core-rules/AGENTS.md`

### [CONTRACT]
- Input: current low-token rules, ticket discovery rules, CLI argument parsing, and ticket command tests.
- Output: single-ticket SSoT workflow, faster ticket discovery, and stable rule-audit returns.
- Side effects: ticket updates and scoped code changes only.

### [PATCH PLAN]
- Keep the main ticket as the default planning SSOT.
- Reduce duplicate output and unnecessary token spend in ticket/init flows.
- Keep fast-path behavior explicit and auditable.

## Compact Plan

- **Problem:** ticket/init flows still emit too much duplicated context and can lose the fast path for next-ticket discovery.
- **Approach:** keep the main ticket compact, reduce duplicate progress text, and ensure CLI discovery stays one-shot and auditable.
- **Verification:** run the relevant CLI tests and rule audit checks against ticket/init paths.
- **Linked Issues:** none.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
