# [Execution] Task: <%= meta.title %> | ID: <%= meta.id %>

> **[CAUTION FOR AI AGENTS]**
> You are operating within a locked multi-module monorepo.
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds
- **Target Submodule:** `<%- meta.submodule || '[e.g., DeukUI | DeukPack | DeukNavigation]' %>`
- **Context Files:** 
  - `[e.g., DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md]`
  - `[e.g., path/to/your/specific/rules.md]`

## 📁 Files to Modify
- `path/from/root/to/target1`: [Specific instructions. Don't write 'refactor', describe WHAT to refactor.]

## 🏗️ Design Decisions (Refer to Plan)
- **Plan Reference**: <%- meta.planLink %>
- [Briefly restate critical decisions if necessary]

## 🛑 Strict Constraints (Rules to never break)
- [e.g., No hotpath LINQ, Async Safety, No Raw Pointers]

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. 

0. [Phase 0> RAG Research (MCP)]
   - [ ] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [ ] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [ ] (필수 작성) 검색된 핵심 컨텍스트 요약: 
   - [ ] (RAG Miss 시 필수 작성) 로컬 검색 결과 `add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록: 

0.5 [Phase 0.5> Deep Analysis (Optional)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> Setup / Parsing]

2. [Phase 2> Core Logic Change]
   - [ ] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색

3. [Phase 3> Cleanup / Verification]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | | | | |

4. [Phase 4> Follow-up Chaining (MANDATORY if issues exist)]
   - [ ] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --title "Fix the issue" --group <group>`
   - [ ] (필수 작성) 발행된 후속 티켓 번호 리스트:

## ✅ Verification / QA
- [ ] **Deep Analysis Verification**: Phase 0.5에서 도출된 핵심 설계 및 구조적 결정사항이 코드에 모두 올바르게 반영되었는지 확인.
- [ ] **Potential Issues Check**: [Identify side effects, edge cases, or performance impacts]
- [ ] **Strict Constraints Audit**: [No hotpath LINQ, Async Safety, No Raw Pointers, etc.]
- [ ] `npm run test` 또는 관련 검증 명령 실행 결과 확인
