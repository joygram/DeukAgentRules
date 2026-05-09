# Deuk Agent Flow Notice

## v4.0.36 init hotfix

Interactive `deuk-agent-flow init` now asks only for the workspace purpose. The CLI infers document language, workflow mode, ticket sharing, agent pointer defaults, and MCP memory defaults from the project directory or safe private defaults.

The Deuk AgentContext MCP choice is hidden during first setup. MCP remains an optional companion setup that can be documented and configured separately.

This hotfix also avoids the post-choice stall that could leave setup incomplete after the user answered an init prompt.

Ticket creation/use surfaces must keep the clickable `Ticket start` line visible before asking for approval. Approval-only replies are treated as a hidden-ticket regression.
