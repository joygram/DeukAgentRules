---
id: 208-silent-boot-output-joy-nucb
title: silent-boot-output
phase: 4
status: closed
docsLanguage: ko
summary: 에이전트가 AGENTS.md 부트 정보를 매번 화면에 설명해 토큰을 쓰는 문제를 줄인다.
priority: P2
tags: []
createdAt: 2026-05-03 07:46:30
---


# silent-boot-output

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, root pointer `AGENTS.md`, spoke generation in `scripts/cli-init-commands.mjs`, and rule audit tests.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-init-commands.mjs`, `scripts/lint-rules.mjs`
- **Constraints:** No generated consumer output edits beyond the repository root pointer, no unrelated refactors, no broad regeneration.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: rule hub/pointer wording and audit checks that enforce silent boot output.
- Forbidden modules: generated artifacts outside this repo pointer, unrelated CLI behavior, package/release metadata
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user report that agents still explain DeukAgentRules boot details despite the low-token rule.
- Output: minimal rule/pointer wording that requires reading the hub but forbids routine screen explanation of version/DC rules.
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Remove pointer instructions that force agents to state version/DC rules on screen.
- Change boot sequence wording to record version/DC applicability internally or in ticket state, not commentary.
- Add/adjust audit checks so verbose boot-output requirements do not return.

## Compact Plan

- **Problem:** 루트 포인터가 core rules의 low-token mode와 충돌하면서 에이전트에게 버전/DC 규칙 설명을 화면 출력하도록 강제한다.
- **Approach:** 포인터와 core boot sequence를 "읽고 내부 확인" 중심으로 바꾸고, audit에서 화면 설명 강제를 금지한다.
- **Verification:** `npx deuk-agent-rule lint:md`, `node --test scripts/tests/*.test.mjs`, `npx deuk-agent-rule rules audit --compact`
- **Linked Issues:** Use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification

- `npx deuk-agent-rule lint:md AGENTS.md core-rules/AGENTS.md .deuk-agent/tickets/sub/208-silent-boot-output-joy-nucb.md` passed.
- `npx deuk-agent-rule rules audit --compact` passed.
- `node --test scripts/tests/*.test.mjs` failed on pre-existing unrelated failures: `DR-03` hardcoded `.deuk-agent` paths in `scripts/sync-oss.mjs:83-84`, and `cli-init-commands.test.mjs` linked-plan archive assertion.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
