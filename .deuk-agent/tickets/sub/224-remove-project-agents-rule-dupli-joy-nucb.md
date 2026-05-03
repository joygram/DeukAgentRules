---
id: 224-remove-project-agents-rule-dupli-joy-nucb
title: remove-project-agents-rule-duplication
phase: 4
status: closed
docsLanguage: en
summary: Remove duplicated rule text between PROJECT_RULE.md and AGENTS.md by
  keeping source-of-truth guidance in AGENTS and shortening PROJECT_RULE
  pointers.
priority: P2
tags: []
createdAt: 2026-05-03 09:20:07
---


# remove-project-agents-rule-duplication

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** `PROJECT_RULE.md` only, with any supporting pointer text needed to keep it aligned with `core-rules/AGENTS.md`.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, and the existing project architecture notes.
- **Constraints:** No source code changes, no generated output edits, and no changes outside rule/documentation files.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `PROJECT_RULE.md` and only the minimal wording needed to remove duplicated rule text.
- Forbidden modules: generated artifacts, product code, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: the current wording in `PROJECT_RULE.md` and the source-of-truth guidance in `core-rules/AGENTS.md`.
- Output: a shorter `PROJECT_RULE.md` that points to `core-rules/AGENTS.md` instead of repeating the same workflow rules.
- Side effects: ticket updates and markdown edits only.

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** `PROJECT_RULE.md` repeats workflow guidance that already lives in `core-rules/AGENTS.md`, which makes maintenance harder and risks drift.
- **Approach:** Keep `PROJECT_RULE.md` focused on project-specific boundaries, generated-file mapping, and build/test commands. Replace duplicated workflow text with a single pointer to `core-rules/AGENTS.md`.
- **Verification:** Re-read the edited markdown and run `npx deuk-agent-rule lint:md` on the touched files.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

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
