---
summary: 100-standardize-non-interactive-cli--joy-nucb-report
status: active
priority: P3
tags: docs, migrated
---


# Walkthrough - Standardizing Non-Interactive CLI Behavior

Improved the CLI to be automation-friendly by removing interactive prompts and making Phase 0 RAG evidence a non-blocking requirement.

## Changes Made

### DeukAgentRules

#### [cli-ticket-commands.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-commands.mjs)
- **Phase 0 RAG Prompt Removal**: Removed the "Did you perform Phase 0 RAG search?" prompt from `ensurePhase0Validation`. The tool now proceeds without asking.
- **Non-Blocking Evidence**: Changed the hard error for missing evidence (when MCP is active) to a warning. This ensures that ticket creation is never blocked by MCP-related issues or missing evidence.
- **Command Standardization**: Updated `runTicketClose`, `runTicketUse`, and `runTicketArchive` to check for `nonInteractive` mode. If mandatory arguments (like `--topic`) are missing in non-interactive mode, the commands now throw a clear usage error instead of hanging in interactive mode.

## Verification Results

### Automated Tests
- **Test Case: Ticket Create (No Evidence)**:
  - Command: `npx deuk-agent-rule ticket create --topic "test" --non-interactive`
  - Result: Successfully created ticket with a warning: `[WARNING] Phase 0 RAG evidence is recommended when the MCP server is active.`
- **Test Case: Ticket Close (No Args)**:
  - Command: `npx deuk-agent-rule ticket close --non-interactive`
  - Result: Correctly failed with: `ticket close: --topic or --latest is required in non-interactive mode.`
