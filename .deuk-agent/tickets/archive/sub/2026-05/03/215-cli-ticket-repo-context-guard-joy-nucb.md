---
id: 215-cli-ticket-repo-context-guard-joy-nucb
title: cli-ticket-repo-context-guard
phase: 4
status: closed
docsLanguage: ko
summary: ticket lifecycle CLI가 잘못된 저장소 cwd에서 실행되는 일을 방지
priority: P2
tags: []
createdAt: 2026-05-03 08:26:00
---


# cli-ticket-repo-context-guard

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** `scripts/cli-args.mjs`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-args.mjs`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval. Keep the fix focused on ticket lifecycle CLI repo context resolution.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket argument parsing, ticket lifecycle command context resolution, and focused ticket CLI tests
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, unrelated CLI actions
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: a ticket markdown path supplied to lifecycle commands from any current working directory
- Output: lifecycle commands infer the owning repository root from that ticket path before moving, closing, archiving, or using the ticket
- Side effects: ticket docs updates, scoped CLI behavior change, focused test coverage

### [PATCH PLAN]
- Keep compact planning in this ticket and avoid a separate plan file.
- Add path-aware argument parsing and a shared ticket path context resolver.
- Cover the behavior with focused CLI unit tests.

## Compact Plan

- **Problem:** `ticket move/close` currently operate only against `opts.cwd`, so a valid ticket path from another repo can fail as "No matching ticket found" when the current shell is in the wrong workspace.
- **Approach:** Add `--ticket-path` and path-like `--topic` support, infer the owning repo root from `.deuk-agent/tickets`, load the ticket frontmatter, and rewrite `opts.cwd/topic` before lifecycle selection.
- **Verification:** Run focused `node --test scripts/tests/cli-ticket-commands.test.mjs` and markdown lint for touched docs.
- **Linked Issues:** None.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Result

- PASS: `node --test scripts/tests/cli-ticket-commands.test.mjs`
- PASS: `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/215-cli-ticket-repo-context-guard-joy-nucb.md`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
