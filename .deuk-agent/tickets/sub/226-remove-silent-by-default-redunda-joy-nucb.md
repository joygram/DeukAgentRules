---
id: 226-remove-silent-by-default-redunda-joy-nucb
title: remove-silent-by-default-redundancy
phase: 4
status: closed
docsLanguage: ko
summary: silent-by-default 문구의 중복 규칙 제거
priority: P2
tags: []
createdAt: 2026-05-03 09:38:40
---


# remove-silent-by-default-redundancy

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `remove-silent-by-default-redundancy`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md` and this ticket's metadata/plan fields
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: the current silent-by-default block in `core-rules/AGENTS.md`
- Output: a deduplicated rule block that preserves the same meaning with one canonical sentence
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** The silent-by-default section repeats the same prohibition in multiple bullets.
- **Approach:** Merge the overlapping bullets into one concise rule line while keeping the ticket-start-line exception explicit.
- **Verification:** Run `npx deuk-agent-rule lint:md` on the edited markdown and confirm the block reads as a single rule.
- **Ticket Numbering:** use the numbered ticket ID as the canonical reference for this change; do not split this into follow-up tickets.

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
