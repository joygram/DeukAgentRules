---
<%- frontmatter %>
---
# <%= meta.title %>

> Restrict changes to **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `<%= meta.title %>`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Design Rationale:** Preserve existing architecture while implementing the ticket summary.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

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
<%- apcDraft?.patchPlan || "- Analyze current code and apply minimal, scoped patch" %>

## Tasks

- [ ] Read context files and confirm scope.
- [ ] Apply the minimal patch described in APC.
- [ ] Run verification and record results.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
