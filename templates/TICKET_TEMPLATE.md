---
<%- frontmatter %>
---
# <%= meta.title %>

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

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

- **Problem:** [Fill only the stable problem statement for the main ticket.]
- **Approach:** [Fill the selected strategy. Keep alternatives out unless they affect risk.]
- **Verification:** [Fill the smallest relevant commands/checks.]
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
