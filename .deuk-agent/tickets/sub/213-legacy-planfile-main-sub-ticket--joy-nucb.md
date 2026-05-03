---
id: 213-legacy-planfile-main-sub-ticket--joy-nucb
title: legacy-planfile-main-sub-ticket-flow
phase: 1
status: open
docsLanguage: ko
summary: 레거시 플랜파일 생성에서 빈 템플릿이 섞이지 않도록, 신규 티켓은 메인으로 시작하고 유사 수정은 서브 티켓으로 넘기는 흐름을 정리한다.
priority: P2
tags: []
createdAt: 2026-05-03 08:16:21
---
# legacy-planfile-main-sub-ticket-flow

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `legacy-planfile-main-sub-ticket-flow`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-init-commands.mjs`, `templates/TICKET_TEMPLATE.md`, `scripts/tests/cli-init-commands.test.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, archived ticket bodies
- Rule citation: `PROJECT_RULE.md` + `core-rules/AGENTS.md`

### [CONTRACT]
- Input: legacy-doc merge path, ticket template scaffold, and the current compact ticket-generation tests.
- Output: empty legacy docs are skipped instead of producing placeholder tickets, and the default ticket scaffold states that the main ticket owns design/analysis.
- Side effects: scoped code edits, markdown updates, and targeted regression tests only

### [PATCH PLAN]
- Guard legacy-doc migration so blank or frontmatter-only markdown does not spawn a canonical ticket.
- Rewrite the default ticket scaffold to describe the main-ticket SSoT role and numbering-based sub-ticket inference without inline master links.
- Add regression coverage for the empty-legacy-doc skip path and the main-ticket scaffold wording.

## Compact Plan

- **Problem:** legacy plan/report merges can still emit placeholder tickets when the source markdown has no meaningful body, and the default ticket scaffold still reads like a blank template instead of a main-ticket SSoT record.
- **Approach:** skip empty legacy docs before they create or merge into tickets, then tighten the default scaffold so the main ticket clearly owns design/analysis while follow-up work is inferred by ticket numbering.
- **Verification:** `node --test scripts/tests/cli-init-commands.test.mjs scripts/tests/cli-ticket-commands.test.mjs` and `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/213-legacy-planfile-main-sub-ticket--joy-nucb.md`
- **Linked Issues:** use ticket numbering to infer the main/sub relationship; no inline master link is needed.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Verification passed: `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/213-legacy-planfile-main-sub-ticket--joy-nucb.md` and `node --test scripts/tests/cli-init-commands.test.mjs scripts/tests/cli-ticket-commands.test.mjs`.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
