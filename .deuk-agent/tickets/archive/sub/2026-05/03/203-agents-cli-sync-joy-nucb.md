---
id: 203-agents-cli-sync-joy-nucb
title: agents-cli-sync
phase: 3
status: closed
docsLanguage: en
summary: Align core AGENTS.md guidance with ticket-create lint and plan template flow
priority: P2
tags: []
createdAt: 2026-05-03 03:48:32
---


# agents-cli-sync

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `agents-cli-sync`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/archive/2026-05/203-agents-cli-sync-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "Align core AGENTS.md guidance with ticket-create lint and plan template flow"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "Align core AGENTS.md guidance with ticket-create lint and plan template flow"
- Output: minimal implementation and tests that satisfy "Align core AGENTS.md guidance with ticket-create lint and plan template flow"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Compact Plan

- **Problem:** `ticket create` already auto-seeds a ticket and plan draft, but the phase-1 gate only verified that the linked plan file existed. That let placeholder plan scaffolds look "complete" even when the plan still contained generic template prose.
- **Approach:** Add a small plan-content helper in `scripts/cli-ticket-commands.mjs`.
- **Verification:** `node scripts/cli.mjs ticket create --topic ... --summary ... --require-filled --skip-phase0 --non-interactive` should fail when the generated plan is still scaffold text.
- **Linked Issues:** none

## Tasks
- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
