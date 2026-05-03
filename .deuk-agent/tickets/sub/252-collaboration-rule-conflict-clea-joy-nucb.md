---
id: 252-collaboration-rule-conflict-clea-joy-nucb
title: collaboration-rule-conflict-cleanup
phase: 1
status: open
docsLanguage: en
summary: Clarify precedence between collaboration updates and DeukAgentRules
  silent-by-default behavior
priority: P2
tags: []
createdAt: 2026-05-03 21:16:41
---
# collaboration-rule-conflict-cleanup

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `collaboration-rule-conflict-cleanup`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "Clarify precedence between collaboration updates and DeukAgentRules silent-by-default behavior"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "Clarify precedence between collaboration updates and DeukAgentRules silent-by-default behavior"
- Output: minimal implementation and tests that satisfy "Clarify precedence between collaboration updates and DeukAgentRules silent-by-default behavior"
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** `core-rules/AGENTS.md` allowed a higher-level collaboration hint to coexist with `silent-by-default`, which made the update policy feel inconsistent during long work sessions.
- **Approach:** Clarify that automatic progress commentary is never allowed in `DeukAgentRules` unless the user explicitly requests live narration or a blocker/user decision must be surfaced.
- **Verification:** Run `npx deuk-agent-rule lint:md` and confirm the edited rule block remains valid markdown.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Outcome

- `npx deuk-agent-rule lint:md` passed after the rule wording update.
- The conflicting line now explicitly says automatic progress commentary is not allowed unless the user asks for live narration or a blocker/user decision must be surfaced.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
