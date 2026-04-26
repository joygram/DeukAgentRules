# Walkthrough - Fixing Ticket Create Interaction Prompt

Fixed an issue where `npx deuk-agent-rule ticket create` would hang in non-interactive mode when `--evidence` was missing.

## Changes Made

### DeukAgentRules

#### [cli-ticket-commands.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-commands.mjs)
- Modified `ensurePhase0Validation` to explicitly check for the `nonInteractive` flag.
- If `nonInteractive` is true and `evidence` is missing, it now sets `skipPhase0 = true` instead of calling `withReadline`.
- This allows the subsequent MCP activity check to throw a proper error message if needed, instead of hanging on a prompt.

## Verification Results

### Automated Tests
- **Test Case 1**: Run without `--evidence` and with `--non-interactive`.
  - **Result**: Correctly exited with an error message: `ticket create: --skip-phase0 is restricted and ONLY allowed when the MCP server is disconnected...`
- **Test Case 2**: Run with `--evidence` and `--non-interactive`.
  - **Result**: Successfully "created" the ticket (verified with `--dry-run`).
