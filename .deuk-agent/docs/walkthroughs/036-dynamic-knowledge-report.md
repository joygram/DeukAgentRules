# Dynamic Knowledge Ingestion Implementation

## Overview
Based on user feedback, the RAG-Miss rules were shifted to the central rule repository (`DeukAgentRulesOSS`) and a new dynamic ingestion tool was added to the DeukRag MCP server. This allows agents to seamlessly plug missing information back into the vector store, actively "healing" the RAG system in real-time.

## Changes Made

### 1. DeukAgentRulesOSS Updates
> [!IMPORTANT]
> The source of truth rules repository has been correctly updated.

- **`publish/rules.d/deukrag-mcp.md`**: Added `State D: RAG-Miss (Zero Results)`, dictating that agents must actively call `add_knowledge` when they rely on local search instead of MCP.
- **`publish/templates/TICKET_TEMPLATE.md`**: Appended the RAG Miss verification item directly into Phase 0. 
- **`bundle/` Syncing**: Executed `npm run sync` to propagate the template and rule changes correctly. 

### 2. DeukRag MCP Server
- **`src/mcp/server.py`**: Created and registered the `@mcp.tool()` `add_knowledge`.
  - Accepts `content`, `project`, `category`, and `source_path`.
  - Instantly upserts the given content into the running `VectorStore` using SQLite-vec JSON metadata.
  - Automatically flags entries with `is_dynamic: True` for clarity.

## Impact
From now on, when agents encounter a "Miss", they won't just complain or quietly use `grep_search`. They are now equipped to inject what they learn directly into the RAG's brain, immediately improving performance for all future operations.
