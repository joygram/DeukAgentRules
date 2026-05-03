---
id: 216-cli-ticket-id-root-resolution-joy-nucb
title: cli-ticket-id-root-resolution
phase: 4
status: closed
docsLanguage: ko
summary: 절대 티켓 경로 없이 티켓 ID로 소유 저장소를 찾아 lifecycle 명령을 실행
priority: P2
tags: []
createdAt: 2026-05-03 08:31:36
---


# cli-ticket-id-root-resolution

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval. Keep the fix focused on resolving ticket ownership from ticket id/topic, not requiring absolute paths.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket lifecycle context resolution and focused ticket CLI tests
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, unrelated CLI actions
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: ticket id/topic supplied from any workspace under the same parent workspace
- Output: lifecycle commands infer the owning repo root from indexed tickets when the current cwd has no match
- Side effects: ticket docs updates, scoped CLI behavior change, focused test coverage

### [PATCH PLAN]
- Keep compact planning in this ticket and avoid a separate plan file.
- Add topic-based repo discovery across nearby `.deuk-agent/tickets/INDEX.json` files.
- Fail on ambiguous matches instead of guessing.

## Compact Plan

- **Problem:** The previous path-based fix still implies passing an absolute ticket path, but lifecycle commands should work from ticket id/topic without making the operator supply filesystem paths.
- **Approach:** When a lifecycle command cannot find the topic in `opts.cwd`, scan nearby workspace roots for `.deuk-agent/tickets/INDEX.json`, match by topic/id, switch `opts.cwd` to the owning repo root, and continue. If multiple repos match, fail with an explicit ambiguous-ticket error.
- **Verification:** Run focused `node --test scripts/tests/cli-ticket-commands.test.mjs` and markdown lint for touched docs.
- **Linked Issues:** None.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Result

- PASS: `node --test scripts/tests/cli-ticket-commands.test.mjs`
- PASS: `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/216-cli-ticket-id-root-resolution-joy-nucb.md`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
