---
summary: "Remove planLink progress checkboxes report"
status: active
priority: P1
tags:
  - report
  - planlink
  - progress
---

# Remove planLink Progress Checkboxes

## Summary
- Updated `core-rules/AGENTS.md` to v22.
- Clarified that tickets own progress checkboxes and lifecycle status.
- Clarified that planLink is prose analysis and decision trace, not a progress checklist.
- Removed generated `[ ]` prompts from planLink drafts.
- Added regression coverage that generated planLink drafts contain no markdown checkbox syntax.

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/150-remove-planlink-checkbox-progres-joy-nucb.md .deuk-agent/docs/plans/150-remove-planlink-checkbox-progres-joy-nucb-plan.md`
- Result: passed.

## Notes
- Existing ArchitectureGuard tests still print a shell warning from their grep helper, but all node tests pass.
