---
id: 099-fix-ticket-create-interaction-pr-joy-nucb
planLink: .deuk-agent/docs/plans/099-fix-ticket-create-interaction-pr-joy-nucb-plan.md
priority: P2
status: in_progress
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] - Root Cause: ensurePhase0Validation
  in scripts/cli-ticket-commands.mjs calls withReadline without checking for --non-interacti...'
tags: rag, mcp, tickets, architecture
title: Fix-Ticket-Create-Interaction-Prompt
---

# Fix-Ticket-Create-Interaction-Prompt

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

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