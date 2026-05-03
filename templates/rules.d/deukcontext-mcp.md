---
id: deukcontext-mcp
condition:
  mcp: deuk-agent-context
inject_target: ["AGENTS.md", "GEMINI.md"]
---
## DeukContext RAG Protocol

### RAG Usage
- Use `mcp_deukcontext_search_*` during Phase 0 (Research) and when encountering unfamiliar code during Phase 2 (Execute).
- Use RAG as advisory memory. Current source code, tests, and ticket state remain the source of truth.
- Treat DeukAgentContext as an online-only memory layer. Do not rely on offline snapshots or local mirrors as the primary context source.
- Search narrowly: include the concrete project plus symbol, file, command, or failure mode.
- Stop after 2 MCP calls for the same question. Do not broaden repeatedly.
- **Do NOT use RAG for Ticket Navigation.** Ticket lookup is a direct CLI operation, not a search task.

### RAG Quality Gate
- Treat placeholder summaries, duplicate ticket/report chunks, stale archive-only hits, unrelated projects, or summaries with no usable fact as a miss.
- When a result only says to read the file, read the current file locally before deciding.
- Prefer `search_code` for implementation questions and request evidence only when the extra context is likely to be useful.

### RAG Failure Handling
- **Error** (2+ failures): Switch to local search (`grep_search`/`view_file`). Do not retry in a loop.
- **Miss or weak hit** (`[RAG-MISS]`, placeholder, duplicate, stale): Fall back to local search. If local analysis finds reusable current-code knowledge, inject it once via `mcp_deukcontext_add_knowledge` with project, source path, code status, and applicability.
- **Stale indexed doc**: If an indexed document is wrong or incomplete, use `mcp_deukcontext_refresh_document` instead of adding a competing fragment.
- **Archive boundary**: Completed work should be preserved through ticket archive and knowledge distillation so the active context does not accumulate stale live-state references.
- **Docs vs knowledge**: `.deuk-agent/docs/` holds human-readable source artifacts (all plans and reports under `docs/plan`, archived originals in `docs/archive`). `.deuk-agent/knowledge/` holds only distilled machine-readable retrieval JSON generated from archived tickets/plans.
