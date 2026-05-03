---
id: 225-silent-step-reporting-absolute-r-joy-nucb
title: silent-step-reporting-absolute-rule
phase: 4
status: closed
docsLanguage: ko
summary: 강제 단계 보고 생략 규칙을 core-rules에 추가
priority: P2
tags: []
createdAt: 2026-05-03 09:37:32
---


# silent-step-reporting-absolute-rule

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `silent-step-reporting-absolute-rule`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md` and the ticket metadata/doc fields needed to record this rule update
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current core agent rules and ticket metadata for the silent-by-default workflow
- Output: a rules update that makes step-by-step reporting explicitly forbidden except for the required ticket-start line
- Side effects: ticket updates, scoped documentation changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** The current low-token guidance still permits progress narration through general silence wording, so the rule needs an explicit absolute prohibition on step-by-step reporting.
- **Approach:** Add one clear rule line in `core-rules/AGENTS.md` near the silent-by-default section and update the changelog/version so the new prohibition is visible to downstream consumers.
- **Verification:** Run `npx deuk-agent-rule lint:md` on touched markdown and confirm the updated rule text and ticket metadata lint cleanly.
- **Ticket Numbering:** use the numbered ticket ID as the canonical reference for this change; do not split this rule update into follow-up tickets.

## Tasks

- [ ] Complete compact plan and APC.
- [ ] Execute changes inside APC boundary.
- [ ] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
