---
id: 223-rag-evidence-local-first-joy-nucb
title: rag-evidence-local-first
phase: 4
status: closed
docsLanguage: en
summary: Clarify ticket workflow to check local knowledge first, then request
  RAG analysis when evidence is insufficient.
priority: P2
tags: []
createdAt: 2026-05-03 09:18:32
---


# rag-evidence-local-first

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md` and any project rule pointer that needs the same local-first / RAG-fallback guidance.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, and the local workflow rules that govern ticket evidence collection.
- **Constraints:** No unrelated refactors, no broad regeneration, and no change to non-rule source files unless they are needed to keep the rule set consistent.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: rule text in `core-rules/AGENTS.md` and matching project rule pointers that describe evidence collection behavior.
- Forbidden modules: generated artifacts, unrelated product code, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: the current workflow rules and ticketing guidance.
- Output: a small rule update that states the local-first evidence check and RAG fallback explicitly.
- Side effects: ticket updates and rule-doc edits only.

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** The workflow currently implies RAG quality checks, but the local-first requirement and explicit fallback behavior are not spelled out together in one place.
- **Approach:** Add one concise rule line under the MCP knowledge guidance so the agent must check local code/docs/tickets/history first, then request RAG analysis only when the local evidence is still insufficient or ambiguous.
- **Verification:** Re-read the edited rule text and run `npx deuk-agent-rule lint:md` for the touched markdown files.
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
