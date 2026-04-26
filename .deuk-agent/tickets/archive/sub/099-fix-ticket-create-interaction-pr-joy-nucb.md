---
id: 099-fix-ticket-create-interaction-pr-joy-nucb
title: "Fix-Ticket-Create-Interaction-Prompt"
---
# Fix-Ticket-Create-Interaction-Prompt

## Analysis & Constraints (Deep Review)
- **Root Cause**: `ensurePhase0Validation` in `scripts/cli-ticket-commands.mjs` calls `withReadline` without checking for `--non-interactive` flag.
- **Architecture Constraint**: The ticket system requires Phase 0 RAG evidence when the MCP server is active.
- **Risk**: In CI/CD or Agent environments, this causes the process to hang indefinitely.

## Strict Rules Check
- [AGENTS.md] Dry, concise, technical tone.
- [AGENTS.md] No Ticket, No Code.

## Scope (In / Out)
- **In**: `scripts/cli-ticket-commands.mjs`
- **Out**: Other CLI commands not related to ticket creation validation.

## Tasks
- [x] Create ticket for the fix.
- [ ] Modify `ensurePhase0Validation` in `scripts/cli-ticket-commands.mjs` to handle `nonInteractive` mode.
- [ ] Verify fix with dry-run and non-interactive flags.

## Done When
- `npx deuk-agent-rule ticket create` returns a clear error message instead of hanging when evidence is missing in `--non-interactive` mode.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/099-fix-ticket-create-interaction-pr-joy-nucb-report.md)
