---
id: 125-user-language-ticket-plan-rules-joy-nucb
title: user-language-ticket-plan-rules
phase: 4
status: closed
docsLanguage: ko
summary: Require generated tickets and plans to use the user's prompt language
priority: P2
tags: rules, tickets, plans, language
createdAt: 2026-05-01 01:08:41
planLink: .deuk-agent/docs/plans/125-user-language-ticket-plan-rules-joy-nucb-plan.md
---


# user-language-ticket-plan-rules

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `core-rules/AGENTS.md`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-utils.mjs`, `scripts/cli-prompts.mjs`, `scripts/cli-ticket-commands.mjs`
- **Design Rationale:** 티켓과 플랜은 사용자의 작업 요청을 바로 추적하는 산출물이므로, 사용자 프롬프트 언어를 기준으로 생성되어야 합니다.
- **Constraints:** 소비자 워크스페이스의 생성된 `AGENTS.md`나 `.cursor/rules/` 파일은 직접 수정하지 않습니다. SSoT인 core rules를 수정하고 init으로 전파합니다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, `.deuk-agent/docs/plans/`, current ticket metadata.
- Forbidden modules: generated consumer `AGENTS.md`, `.cursor/rules/`, `dist/`, `gen/`, `deukpack_out/`.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN; `core-rules/AGENTS.md` is the hub SSoT.

### [CONTRACT]
- Input: User request: "플랜, 티켓 생성하는거 사용자 언어기반으로 만들게 룰보강".
- Output: Core rule text explicitly requires new tickets and plan files to match the user's prompt language, overriding saved/default docs language when they conflict.
- Side effects: Rule version/changelog may be bumped; generated spokes require future `init` propagation.

### [PATCH PLAN]
- Add a clear language-selection rule near Tone or Docs sections.
- Clarify Phase 1 ticket/plan creation must use the user's prompt language for title, summary, APC, tasks, and plan content.
- Run markdown lint and tests.

## Tasks
- [x] Update core rules language policy for tickets/plans.
- [x] Bump core rule version/changelog.
- [x] Run markdown lint and relevant tests.
- [ ] Move ticket through verify/close after implementation.

## Verification
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/125-user-language-ticket-plan-rules-joy-nucb.md .deuk-agent/docs/plans/125-user-language-ticket-plan-rules-joy-nucb-plan.md` passed.
- `node --test scripts/tests/` passed: 17 tests.

## Done When
> Core rules require user-prompt-language tickets/plans, lint/tests pass, and the ticket is closed or has documented blockers.
