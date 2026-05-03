---
id: 207-verify-after-execute-rule-harden-joy-nucb
title: verify-after-execute-rule-hardening
phase: 4
status: closed
docsLanguage: ko
summary: 실행 단계 구현 후 검증 생략을 막도록 core agent rules의 검증 의무와 우선순위를 보강
priority: P2
tags: []
createdAt: 2026-05-03 07:41:03
---


# verify-after-execute-rule-hardening

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `verify-after-execute-rule-hardening`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "실행 단계 구현 후 검증 생략을 막도록 core agent rules의 검증 의무와 우선순위를 보강"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "실행 단계 구현 후 검증 생략을 막도록 core agent rules의 검증 의무와 우선순위를 보강"
- Output: minimal implementation and tests that satisfy "실행 단계 구현 후 검증 생략을 막도록 core agent rules의 검증 의무와 우선순위를 보강"
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** 현재 core rules는 Phase 3 Verify를 정의하지만, 실행 요청 후 구현을 완료한 에이전트가 일반 클라이언트 지침이나 "사용자 명시 요청" 해석을 이유로 관련 검증을 생략하는 상황을 충분히 차단하지 못한다.
- **Approach:** `core-rules/AGENTS.md`에 실행 후 검증이 기본 의무임을 명시하고, 검증 생략 허용 조건을 사용자 명시 보류/환경 차단/계획 전용 작업으로 제한한다.
- **Verification:** `npx deuk-agent-rule lint:md` 및 `node --test scripts/tests/*.test.mjs`.
- **Linked Issues:** None.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Outcome

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/207-verify-after-execute-rule-harden-joy-nucb.md`: passed.
- `node --test scripts/tests/lint-rules.test.mjs`: passed.
- `npx deuk-agent-rule rules audit --compact`: passed.
- `node --test scripts/tests/*.test.mjs`: failed outside this ticket's changed surface.
- Known failing slices from full suite: `ArchitectureGuard.test.mjs` DR-03 hardcoded `.deuk-agent` paths in `scripts/sync-oss.mjs`, and `cli-init-commands.test.mjs` linked plan archive assertion.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
