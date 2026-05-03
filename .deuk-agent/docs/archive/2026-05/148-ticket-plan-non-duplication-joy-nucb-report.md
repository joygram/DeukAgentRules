---
summary: "Ticket and planLink non-duplication rule report"
status: active
priority: P1
tags:
  - report
  - ticket
  - planlink
---

# Ticket And PlanLink Non-Duplication Report

## Summary
- Updated `core-rules/AGENTS.md` to v20.
- Defined ticket ownership as identity, scope, constraints, APC, and lifecycle checklist.
- Defined planLink ownership as evidence, decision notes, concrete execution steps, and verification evidence.
- Updated the ticket template and plan draft generator to avoid repeating ticket summary/APC in planLink.
- Added a regression test for non-duplicative ticket/planLink generation.

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/148-ticket-plan-non-duplication-joy-nucb.md .deuk-agent/docs/plans/148-ticket-plan-non-duplication-joy-nucb-plan.md`
- Result: passed.

## Notes
- Existing ArchitectureGuard tests still print a shell warning from their grep helper, but the node test run passes.
