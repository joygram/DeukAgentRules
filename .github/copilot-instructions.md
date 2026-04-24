<!-- deuk-agent-rule:begin -->
# Deuk Agent Rules

This project follows the Deuk Agent Rules framework.
- Read the full rules: [AGENTS.md](../AGENTS.md)
- Module-specific rules: [.deuk-agent/rules/](../.deuk-agent/rules/)
## Copilot Execution Rules
- Treat this file as the fast-start entrypoint for Copilot chat sessions.
- Read `AGENTS.md` before implementing broad or multi-file changes.
- Use a ticket before multi-step work; do not improvise scope outside the ticket.
- If MCP is available, search rules and tickets first; otherwise fall back to local files.
- Keep changes inside the declared submodule and stop after two repeated errors.

## Critical Rules
- Use `.deuk-agent/templates/TICKET_TEMPLATE.md` for multi-step tasks.
- RAG-First: Use MCP tools before local file search when available.
- Error Loop Prevention: Stop after 2 repeated errors, create a ticket.

<!-- deuk-agent-rule:end -->
