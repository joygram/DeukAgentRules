# Task: [Task Title] | Ticket: [TICKET-XXX]

> **[CAUTION FOR AI AGENTS]** 
> You are operating within a locked multi-module monorepo. 
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds

- **Target Submodule:** `[e.g., DeukUI | DeukPack | DeukNavigation]`
- **Context Files:** 
  - `[e.g., DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md]`
  - `[e.g., path/to/your/specific/rules.md]`

## 📁 Files to Modify
- `path/from/root/to/target1`: [Specific instructions. Don't write 'refactor', describe WHAT to refactor.]
- `path/from/root/to/target2`: [Instructions...]

## 🏗️ Design Decisions (For Context)
- [Why are we doing this? E.g., "To isolate the IR Layout bindings from DOM events"]
- [What pattern to use?]

## 🛑 Strict Constraints (Rules to never break)
- [e.g., Do NOT remove existing @ts-nocheck headers]
- [e.g., MUST retain C# [SerializeField] directives]
- [e.g., Do NOT import Vue logic into DeukPack]

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. Use separate chat messages per phase if the task is large.
0. [Phase 0> RAG Research (MCP)]
   - [ ] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [ ] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [ ] (필수 작성) 검색된 핵심 컨텍스트 요약: 
1. [Phase 1> Setup / Parsing]
2. [Phase 2> Core Logic Change]
   - [ ] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색
3. [Phase 3> Cleanup / Verification]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색

## ✅ Verification / QA
- [ ] Potential Issues Check: [Identify side effects, edge cases, or performance impacts]
- [ ] Existing Tests Maintenance: [Ensure all existing tests pass and no regression occurs]
- [ ] Strict Constraints Audit: [No hotpath LINQ, Async Safety, No Raw Pointers, etc.]
- [ ] Cross-Language Compatibility: [Ensure codec consistency across target languages]
- [e.g., Check CLI command output `npm run test`]
- [e.g., Validate Inspector mounts properly in Figma]
