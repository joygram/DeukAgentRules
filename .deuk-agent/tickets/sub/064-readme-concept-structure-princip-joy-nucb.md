---
id: 064-readme-concept-structure-princip-joy-nucb
title: "readme-concept-structure-principles-docs"
status: open
submodule: DeukAgentRules
project: DeukAgentRules
createdAt: 2026-04-24 01:36:33
---

# [Execution] Task: readme-concept-structure-principles-docs | ID: 064-readme-concept-structure-princip-joy-nucb

> **[CAUTION FOR AI AGENTS]**
> You are operating within a locked multi-module monorepo.
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds
- **Target Submodule:** `DeukAgentRules`
- **Context Files:** 
  - `README.md`
  - `README.ko.md`
  - `AGENTS.md`
  - `gemini.md`
  - `publish/templates/TICKET_TEMPLATE.md`

## 📁 Files to Modify
- `README.md`: add concept expansion, document map, and direct links to the detailed docs.
- `README.ko.md`: add the same concept expansion in Korean and mirror the detailed doc links.
- `docs/how-it-works.md`: add the detailed structure explanation for the ticket workflow and rule layout.
- `docs/how-it-works.ko.md`: add the Korean mirror of the detailed structure explanation.
- `docs/principles.md`: add the operating principles and why the workflow is structured this way.
- `docs/principles.ko.md`: add the Korean mirror of the operating principles.

## 🏗️ Design Decisions (Refer to Plan)
- **Plan Reference**: [064-readme-concept-structure-princip-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/064-readme-concept-structure-princip-joy-nucb-plan.md)
- **Plan Path Rule**: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- README stays short and navigational.
- Detailed behavior moves into standalone docs so the README becomes a concept entrypoint rather than the only source of truth.
- English and Korean docs are kept in sync because this repo ships bilingual user-facing documentation.

## 🛑 Strict Constraints (Rules to never break)
- Preserve existing README structure and tone.
- Keep the new docs aligned with the already enforced ticket/approval workflow.
- Do not modify OSS mirror files for this documentation task.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. 

0. [Phase 0> RAG Research (MCP)]
   - [x] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [x] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [x] (필수 작성) 검색된 핵심 컨텍스트 요약:
     - README already covers workflow basics, but it does not yet expose a compact concept map or direct links to detailed structure/principle docs.
     - Existing tickets and reports show a pattern of keeping runtime gates documented alongside the workflow, which supports a separate principles doc rather than overloading the README.
     - The repo is bilingual, so the docs set should be mirrored in English and Korean.
   - [x] (RAG Miss 시 필수 작성) 로컬 검색 결과 `mcp_deukrag_add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록:
     - Not needed. The relevant context was found locally and through DeukRag search.

0.5 [Phase 0.5> Deep Analysis (Optional)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> Setup / Parsing]
   - [x] README expansion scope locked
   - [x] detail-doc file layout confirmed

2. [Phase 2> Core Logic Change]
   - [x] (CONTINUOUS RAG) markdown sections and links updated without breaking existing navigation
   - [x] detailed docs added and cross-linked from both READMEs

3. [Phase 3> Cleanup / Verification]
   - [x] README link targets resolve
   - [x] bilingual docs are aligned
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | 없음 | 낮음 | README와 상세 문서가 같은 구조를 공유함 | 후속 조치 없음 |

4. [Phase 4> Follow-up Chaining (MANDATORY if issues exist)]
   - [ ] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [ ] (필수 작성) 발행된 후속 티켓 번호 리스트:

## ✅ Verification / QA
- [x] **Deep Analysis Verification**: README, detailed structure docs, and principle docs all present the same workflow model.
- [x] **Potential Issues Check**: [Identify side effects, edge cases, or performance impacts]
- [x] **Strict Constraints Audit**: [No hotpath LINQ, Async Safety, No Raw Pointers, etc.]
- [x] `git diff --check` 검증 결과 확인
