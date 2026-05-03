---
id: 212-clickable-next-ticket-link-joy-nucb
title: clickable-next-ticket-link
phase: 4
status: closed
docsLanguage: ko
summary: 다음 티켓 안내에서 관련 티켓 파일 링크를 클릭 가능하게 표시한다.
priority: P2
tags: []
createdAt: 2026-05-03 08:10:13
---


# clickable-next-ticket-link

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`; ticket markdown for lifecycle/APC/verification only
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing low-token boot and next-ticket surfacing rules
- Output: minimal rule change that makes the active ticket announcement and next-ticket prompt use clickable markdown links to the ticket file
- Side effects: core-rule version/changelog update, ticket lifecycle updates

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Keep the change limited to the ticket-start and next-ticket wording in `core-rules/AGENTS.md`.
- Do not expand this into unrelated CLI or ticket-discovery work.

## Compact Plan

- **Problem:** 다음 티켓을 안내할 때 티켓 식별자는 보이지만, 사용자가 바로 클릭할 수 있는 파일 링크 형식이 규칙에 명시돼 있지 않다.
- **Approach:** `core-rules/AGENTS.md`의 low-token 예외와 boot sequence 문구를 마크다운 링크 형식으로 바꿔서, 티켓 ID와 파일 경로가 함께 클릭 가능하게 보이도록 한다.
- **Verification:** `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/212-clickable-next-ticket-link-joy-nucb.md` and `npx deuk-agent-rule rules audit --compact`.
- **Linked Issues:** Use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification

- PASS: `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/212-clickable-next-ticket-link-joy-nucb.md`
- PASS: `npx deuk-agent-rule rules audit --compact`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
