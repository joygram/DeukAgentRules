---
id: 230-still-talking-root-cause-joy-nucb
title: still-talking-root-cause
phase: 1
status: open
docsLanguage: en
summary: Investigate why the agent still talks despite silent-by-default rules
  and identify the root cause in workflow or rule enforcement.
priority: P2
tags: []
createdAt: 2026-05-03 10:14:30
---
# still-talking-root-cause

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `still-talking-root-cause`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket formatting and template files that control Phase 1 ticket quality, plus the ticket record itself for durable analysis notes.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, and broad workflow refactors outside ticket/template quality.
- Rule citation: [`PROJECT_RULE.md`](../../../PROJECT_RULE.md) + [`core-rules/AGENTS.md`](../../../core-rules/AGENTS.md)

### [CONTRACT]
- Input: the current ticket scaffold, the shared ticket template, and the create-time validation path in [`scripts/cli-ticket-commands.mjs`](../../../scripts/cli-ticket-commands.mjs).
- Output: a ticket that records the root cause, the plan direction, and the verification boundary, plus a template that nudges future tickets toward substantive Phase 1 analysis.
- Side effects: ticket updates, template updates, and narrowly scoped tests if needed to protect the new shape

### [PATCH PLAN]
- Keep the main ticket as the durable analysis record for this issue.
- Update `templates/TICKET_TEMPLATE.md` so the default scaffold includes concrete prompts for finding, root cause, RAG evidence, approach, and verification instead of vague filler.
- Keep the fix narrow: do not alter ticket lifecycle semantics beyond the template and this ticket's Phase 1 evidence.

## Compact Plan

- **Finding:** `ticket create` currently accepts `--non-interactive` placeholder scaffolds unless `--require-filled` or `--from-plan` is passed, so a user can receive a valid ticket file whose APC and compact plan are still template-grade. The attached ticket is an example of that failure mode.
- **Root cause / hypothesis:** The create path in [`scripts/cli-ticket-commands.mjs`](../../../scripts/cli-ticket-commands.mjs) only enforces strict phase-1 completeness when `strictCreate` is enabled. The default template in [`templates/TICKET_TEMPLATE.md`](../../../templates/TICKET_TEMPLATE.md) also uses neutral placeholder guidance, so it does not force the user or agent to write a concrete root cause before the ticket is considered usable.
- **RAG evidence:** Local-only analysis was sufficient. The rules in [`core-rules/AGENTS.md`](../../../core-rules/AGENTS.md) already define Phase 1 as a substantive planning record and explicitly say `ticket create` seeds only a draft scaffold. No MCP search was needed because the failure mode was fully visible in the local CLI and template code.
- **Approach:** Reword the shared template so the default Phase 1 scaffold asks for a concrete symptom, root-cause hypothesis, affected files or symbols, and a verification signal. Keep this ticket updated with the actual analysis so Phase 1 stays durable even when the command path still allows drafts.
- **Verification:** Run `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/230-still-talking-root-cause-joy-nucb.md templates/TICKET_TEMPLATE.md` and `node --test scripts/tests/cli-ticket-commands.test.mjs`. Expected result: markdown passes, and existing ticket-create strictness tests still pass while the new template text is lint-safe.
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
