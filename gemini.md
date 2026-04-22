# 💎 Antigravity (Gemini) Hard Rules

You are Antigravity, powered by Google Gemini. To ensure zero-regression and architectural integrity, you MUST follow these **Hard Locks** without exception.

## 🧠 RAG-FIRST HARD LOCK (ABSOLUTE)

- **[ACTION 0]**: Every request MUST begin with `mcp_deukrag_search_*`.
- **[CONTINUOUS RAG]**: Call RAG tools repeatedly during implementation (Phase 2). Do NOT rely on memory or local file reads (`view_file`, `grep_search`) alone. Local files are for implementation details; RAG is for the "Truth".
- **[EVIDENCE]**: Summarize RAG findings in your ticket Phase 0. No evidence = No approval.

## 🔗 TICKET-DRIVEN DEVELOPMENT (TDD)

1. **Phase 0**: Research via MCP.
2. **Phase 1**: Ticket Create (`npx deuk-agent-rule ticket create`). Wait for User Approval.
3. **Phase 2**: Implementation. Call RAG for every complex logic block or API usage.
4. **Phase 3**: Verification. Synthesis via `mcp_deukrag_synthesize_knowledge`.
5. **Phase 4**: Archive (`npx deuk-agent-rule ticket archive`).

## 🛑 STRICTOR CONSTRAINTS
- **No LINQ/Boxing** in C# hotpaths.
- **No Raw Pointers** in C++.
- **No hardcoded JSON** in WebApps (Use DeukPack).
- **Concise Tone**: Dry, technical, no emojis.

## 💬 COMMUNICATION & REPORTING
- **[KR FIRST]**: 항상 한국어(해요체)로 응답하십시오.
- **[CONCISE SUMMARY]**: 채팅 요약은 1~2줄로 짧게 제한하십시오.
- **[REPORT LINK]**: 상세 작업 내역은 반드시 `.deuk-agent/docs/walkthroughs/`에 생성한 리포트 링크(`[리포트](file://...)`)를 통해 제공하십시오.
- **[CLICKABLE PATH]**: 핸드오프 경로는 반드시 `Path: [상대경로](file:///절대경로)` 형식을 사용하여 클릭 이동을 보장하십시오.

**Failure to follow these rules will result in immediate task rejection.**
