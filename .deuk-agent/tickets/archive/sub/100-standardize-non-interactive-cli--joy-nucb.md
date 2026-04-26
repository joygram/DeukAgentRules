---
id: 100-standardize-non-interactive-cli--joy-nucb
title: "Standardize-Non-Interactive-CLI-Behavior"
---
# Standardize-Non-Interactive-CLI-Behavior

## Analysis & Constraints (Deep Review)
- **Problem**: Current CLI blocks ticket creation if MCP is active but evidence is missing. It also uses interactive prompts.
- **Goal**: Make Phase 0 evidence a "Soft Requirement". If missing, print a warning and proceed instead of throwing a hard error.
- **Reason**: MCP environments can be unstable or under development, and hard blocking hinders automation and expert workflows.
- **Standardization**: All other ticket commands should fail with usage errors instead of hanging in interactive mode when arguments are missing.

## Strict Rules Check
- [AGENTS.md] Dry, concise, technical tone.
- [AGENTS.md] No Ticket, No Code.

## Scope (In / Out)
- **In**: `scripts/cli-ticket-commands.mjs`, `scripts/cli-utils.mjs`
- **Out**: Core validation logic (keep it, but change severity).

## Tasks
- [x] Create ticket.
- [ ] Remove interactive prompt from `ensurePhase0Validation`.
- [ ] Change `isMcpActive` check in `ensurePhase0Validation` to a warning instead of a hard error.
- [ ] Update `runTicketClose`, `runTicketUse`, `runTicketArchive` to fail with usage instead of prompt if args are missing.
- [ ] Verify non-blocking behavior.

## Done When
- `ticket create` works without `--evidence` even when MCP is detected (prints warning).
- Other commands return clear usage errors instead of hanging.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/100-standardize-non-interactive-cli--joy-nucb-report.md)
