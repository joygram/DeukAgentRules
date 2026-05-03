---
<%- frontmatter %>
---
# <%= meta.title %>

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact but substantive in this ticket. The main ticket owns design and analysis, plus investigation, RAG evidence, and verification; chat stays short and points here.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

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

- **Finding:** Record the concrete symptom, risk, or requested change this ticket owns. State what is broken, what is missing, and who or what is affected.
- **Root cause / hypothesis:** Capture the current best explanation and cite affected files, symbols, commands, or rules. If the cause is uncertain, say what evidence would separate the plausible causes.
- **RAG evidence:** Record MCP tool/query quality when used: hit, weak-hit, miss, stale, and whether it changed the plan. If RAG is not used, say that local evidence was sufficient.
- **Approach:** Capture the selected design path and implementation direction. Explain why this path is preferred over at least one alternative. Split material new scope into sub tickets instead of expanding this record.
- **Verification:** List the smallest relevant commands/checks, expected result, and the pass/fail signal that must be recorded after execution. Prefer the narrowest gate that proves the fix.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [ ] Complete compact plan and APC.
- [ ] Execute changes inside APC boundary.
- [ ] Record durable verification outcome in this ticket.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
