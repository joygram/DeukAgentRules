---
id: 211-ticket-start-announcement-rule-joy-nucb
title: ticket-start-announcement-rule
phase: 4
status: closed
docsLanguage: ko
summary: 티켓 처리 시작 시 현재 처리할 티켓 식별자를 사용자에게 한 줄로 알리도록 코어 규칙을 보강한다.
priority: P2
tags: []
createdAt: 2026-05-03 08:01:01
---


# ticket-start-announcement-rule

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
- Forbidden modules: generated consumer spokes, CLI business logic, templates, unrelated docs
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: 현재 저토큰 모드와 부트 시퀀스 규칙
- Output: 티켓 선택/생성 직후 사용자가 현재 처리 티켓을 알 수 있도록 하는 명시 규칙
- Side effects: 코어 규칙 버전/변경 로그 갱신, 티켓 lifecycle 업데이트

### [PATCH PLAN]
- `Silent-by-default` 정책을 유지하되 티켓 시작 공지는 예외로 정의한다.
- 공지는 한 줄, 티켓 ID와 제목/요약 중심으로 제한한다.
- 진행상황 반복 출력이나 phase beacon으로 확장하지 않는다.

## Compact Plan

- **Problem:** 현재 규칙은 저토큰 모드 때문에 티켓 처리 시작 시 어떤 티켓을 다루는지 사용자에게 노출하는 요구가 불명확하다.
- **Approach:** `core-rules/AGENTS.md` 버전을 올리고, Low-Token/Boot Sequence에 티켓 시작 공지의 필수 시점과 형식을 추가한다.
- **Verification:** `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/211-ticket-start-announcement-rule-joy-nucb.md` 및 `npx deuk-agent-rule rules audit --compact`.
- **Linked Issues:** Use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification

- PASS: `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/211-ticket-start-announcement-rule-joy-nucb.md`
- PASS: `npx deuk-agent-rule rules audit --compact`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
