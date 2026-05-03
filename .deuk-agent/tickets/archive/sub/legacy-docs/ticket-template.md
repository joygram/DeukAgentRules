---
summary: ticket-template
status: archived
priority: P3
tags: migrated
id: ticket-template
title: ticket-template
createdAt: 2026-05-03 08:54:51
---

# ticket-template

> Legacy separated docs are merged here so this ticket is the single source of truth.

## Scope & Constraints

- **Target:** migrated legacy work record.
- **Context Files:** merged legacy content below.
- **Constraints:** preserve historical content without keeping separate docs files.
- **Lifecycle Guard:** this ticket is the canonical record.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: historical ticket record only.
- Forbidden modules: product/source changes from this migration.
- Rule citation: local project rules if present.

### [CONTRACT]
- Input: separated legacy docs files.
- Output: one canonical ticket containing merged legacy content.
- Side effects: legacy docs files removed after merge.

### [PATCH PLAN]
- Merge separated docs into this ticket.
- Remove source docs after merge.

## Compact Plan

- **Problem:** this work item existed as separated docs outside the ticket.
- **Approach:** merge the legacy content below and keep this ticket as canonical.
- **Verification:** confirm the source docs files are removed and this ticket remains.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Merge separated docs content into this ticket.
- [x] Remove separated docs files.

## Done When

- This ticket contains the merged content.
- Separate docs files are removed.
## Merged Legacy Document

### TICKET TEMPLATE

# <%= meta.title %>

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `<%= meta.title %>`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
<%- apcDraft?.boundaryEditable || "- Editable modules: ticket target modules related to this summary" %>
<%- apcDraft?.boundaryForbidden || "- Forbidden modules: generated artifacts and unrelated module roots" %>
<%- apcDraft?.boundaryRule || "- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md" %>

### [CONTRACT]
<%- apcDraft?.contractInput || "- Input: existing implementation context for this ticket" %>
<%- apcDraft?.contractOutput || "- Output: minimal implementation + validation evidence" %>
<%- apcDraft?.contractSideEffects || "- Side effects: scoped changes and docs updates" %>

### [PATCH PLAN]
<%- apcDraft?.patchPlan || "- Compact planning lives in this ticket; create/link subissues for related work instead of expanding scope." %>

## Compact Plan

- **Problem:** Record the stable issue once in this main ticket. Do not duplicate design or analysis in follow-up tickets.
- **Approach:** Capture the selected design and analysis path here, including root cause, constraints, and the implementation direction. Split related follow-up work into sub tickets instead of expanding this record.
- **Verification:** List the smallest relevant commands or checks and the expected result.
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
## Merged Legacy Document

### TICKET TEMPLATE

# <%= meta.title %>

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `<%= meta.title %>`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
<%- apcDraft?.boundaryEditable || "- Editable modules: ticket target modules related to this summary" %>
<%- apcDraft?.boundaryForbidden || "- Forbidden modules: generated artifacts and unrelated module roots" %>
<%- apcDraft?.boundaryRule || "- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md" %>

### [CONTRACT]
<%- apcDraft?.contractInput || "- Input: existing implementation context for this ticket" %>
<%- apcDraft?.contractOutput || "- Output: minimal implementation + validation evidence" %>
<%- apcDraft?.contractSideEffects || "- Side effects: scoped changes and docs updates" %>

### [PATCH PLAN]
<%- apcDraft?.patchPlan || "- Compact planning lives in this ticket; create/link subissues for related work instead of expanding scope." %>

## Compact Plan

- **Problem:** Record the stable issue once in this main ticket. Do not duplicate design or analysis in follow-up tickets.
- **Approach:** Capture the selected design and analysis path here, including root cause, constraints, and the implementation direction. Split related follow-up work into sub tickets instead of expanding this record.
- **Verification:** List the smallest relevant commands or checks and the expected result.
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
