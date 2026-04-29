---
summary: 079-mcp-hybrid-transport-fix-report
status: active
priority: P3
tags: docs, migrated
---


# Walkthrough: MCP Hybrid Transport & Stability Fix

## Problem Description
- Claude Code experienced 30s timeouts due to server-side hangs and protocol mismatch.
- Antigravity (Google) experienced 405 Method Not Allowed due to legacy POST-based transport expectations.
- Systemd services were failing to initialize the ASGI lifecycle correctly when using `uvicorn` directly.

## Changes Made
### 1. Hybrid MCP Transport (`src/mcp/server.py`)
- Implemented a unified Starlette app that routes:
    - `GET /sse` -> Standard SSE (Anthropic/Cursor)
    - `POST /sse` -> Streamable HTTP (Google/Legacy)
    - `POST /messages` -> Standard SSE Message Handler
- Replaced `uvicorn` with `python src/mcp/server.py` to ensure `mcp.run()` initializes the session manager and pre-warming logic.

### 2. CLI Hardening (`src/cli/main.py`)
- Updated `cmd_init` to use `python` and set `PYTHONPATH` in systemd.
- Added `setup-ide` command to mass-configure all registered projects with the correct MCP URL.

### 3. Knowledge Base
- Added `rules.d/mcp_hybrid_transport_fix.md` for real-time RAG ingestion of the solution pattern.

## Verification Results
- **Claude Code**: Verified via `curl http://localhost:8001/sse` receiving `event: endpoint`.
- **Antigravity (Legacy)**: Verified via `curl -X POST http://localhost:8001/sse` receiving 200 OK (with message payload).
- **Automation**: `setup-ide` successfully updated 7 projects across the workspace.

## Next Steps
- Monitor dashboard for token consumption parity between clients.
- Verify if any other IDEs (Windsurf, PearAI) require additional path mapping.
