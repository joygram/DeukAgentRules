---
id: deukcontext-mcp
condition:
  mcp: deuk-agent-context
inject_target: ["AGENTS.md", "GEMINI.md"]
---
## DeukContext RAG Protocol

### RAG-First (HARD RULE)
- Before any local file search or code modification, query `mcp_deukcontext_search_*` first.
- Continue calling RAG throughout Phase 2 whenever encountering new files, build errors, or API questions. Do not limit RAG usage to Phase 0 only.

### RAG State Machine
- **Normal**: MCP tools respond. Prefer RAG results over local search.
- **Missing**: MCP tools not installed. Fall back to local search silently.
- **Error**: MCP call fails 2+ times. Switch to local search immediately. Log the issue in the execution report.
- **Miss**: MCP returns `[RAG-MISS]`. Execute in order: (1) collect local evidence via `grep_search`/`list_dir`, (2) inject via `mcp_deukcontext_add_knowledge`, (3) retry the query once. Record the miss in the ticket.
