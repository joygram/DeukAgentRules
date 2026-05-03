---
id: 256-fix-sync-oss-agent-root-dir-joy-nucb
title: fix-sync-oss-agent-root-dir
phase: 4
status: closed
docsLanguage: en
summary: Fix DR-03 hardcoded .deuk-agent paths in sync-oss and commit
priority: P2
tags:
  - rules
  - tests
  - sync-oss
createdAt: 2026-05-03 22:57:37
---


# fix-sync-oss-agent-root-dir

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** `scripts/sync-oss.mjs`, focused architecture guard tests, ticket lifecycle state, and commit.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/sync-oss.mjs`, `scripts/cli-utils.mjs`, `scripts/tests/ArchitectureGuard.test.mjs`.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/sync-oss.mjs` and this ticket.
- Forbidden modules: generated artifacts, unrelated rule changes, unrelated CLI behavior, external module roots.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: DR-03 failure from `scripts/tests/ArchitectureGuard.test.mjs`, `AGENT_ROOT_DIR` from `scripts/cli-utils.mjs`, and current `scripts/sync-oss.mjs`.
- Output: `sync-oss` uses shared `AGENT_ROOT_DIR` instead of hardcoded `.deuk-agent`, architecture guard passes, and a scoped commit is created.
- Side effects: ticket updates, scoped code change, verification commands, git commit.

### [PATCH PLAN]
- Import `AGENT_ROOT_DIR` from `scripts/cli-utils.mjs`.
- Replace `join(ossRoot, ".deuk-agent")` with a single `agentRoot` path built from `AGENT_ROOT_DIR`.
- Run focused and full tests, markdown lint, diff check, then commit scoped changes.

## Compact Plan

- **Problem:** Full test verification fails at DR-03 because `scripts/sync-oss.mjs` contains two direct `join(ossRoot, ".deuk-agent")` references instead of using `AGENT_ROOT_DIR`.
- **Approach:** Keep behavior unchanged and replace only the hardcoded agent root string with the shared constant.
- **Verification:** `node --test scripts/tests/ArchitectureGuard.test.mjs`, `node --test scripts/tests/*.test.mjs`, `npx deuk-agent-rule rules audit --compact`, focused markdown lint, and `git diff --check`.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Outcome

- **Check:** `node --test scripts/tests/ArchitectureGuard.test.mjs`
- **Result:** pass. DR-03 now accepts `scripts/sync-oss.mjs`.
- **Check:** `node --test scripts/tests/*.test.mjs`
- **Result:** pass, 84/84 tests.
- **Check:** `npx deuk-agent-rule rules audit --compact`
- **Result:** pass, `rules:audit ok`.
- **Check:** `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/256-fix-sync-oss-agent-root-dir-joy-nucb.md`
- **Result:** pass.
- **Check:** `git diff --check`
- **Result:** pass.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
