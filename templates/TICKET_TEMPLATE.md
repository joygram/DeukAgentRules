---
<%- frontmatter %>
---
# <%= meta.title %>

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** [module/submodule path]
- **Context Files:** [architecture docs, key files]
- **Design Rationale:** [Why this change is needed]
- **Constraints:** [No hotpath LINQ, Async Safety, etc.]

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
- [ ] [Task 1]

## Done When
> [Verification steps and completion criteria]
