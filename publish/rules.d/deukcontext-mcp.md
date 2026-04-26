---
id: deukcontext-mcp
condition:
  mcp: deuk-agent-context
inject_target: ["AGENTS.md", "GEMINI.md"]
---
## DeukContext RAG Protocol

### RAG Usage
- Use `mcp_deukcontext_search_*` during Phase 0 (Research) and when encountering unfamiliar code during Phase 2 (Execute).
- Prefer RAG results over local search when available.
- **Do NOT use RAG for Ticket Navigation.** Ticket lookup is a direct CLI operation, not a search task.

### RAG Failure Handling
- **Error** (2+ failures): Switch to local search (`grep_search`/`view_file`). Do not retry in a loop.
- **Miss** (`[RAG-MISS]`): Fall back to local search. Optionally inject findings via `mcp_deukcontext_add_knowledge` if the discovery is reusable.
