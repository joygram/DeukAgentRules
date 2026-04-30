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
- Editable modules: [Add editable module paths]
- Forbidden modules: [Add forbidden module paths]
- Rule citation: [Add PROJECT_RULE.md or architecture rule citation, or "N/A"]

### [CONTRACT]
- Input: [Add input/context for this ticket]
- Output: [Add expected output]
- Side effects: [Add expected side effects]

### [PATCH PLAN]
- [Add file/function/change plan]

## Tasks
- [ ] [Task 1]

## Done When
> [Verification steps and completion criteria]
