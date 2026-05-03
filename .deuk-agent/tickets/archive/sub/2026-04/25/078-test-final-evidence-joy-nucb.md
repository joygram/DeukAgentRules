---
createdAt: 2026-04-25 09:31:37
id: 078-test-final-evidence-joy-nucb
priority: P2
status: open
summary: "Target: [Fill in the target module/submodule path] - Context Files:
  [List architecture docs or key files to read first] - Target Submodule: [예:
  DeukUI | DeukPack | DeukNavigation]"
tags: rag, mcp, tickets, architecture, performance
title: test-final-evidence
---


# [실행] 작업: test-final-evidence | ID: 078-test-final-evidence-joy-nucb

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

> **[에이전트 주의]**
> 이 작업은 잠긴 멀티 모듈 모노레포 안에서 진행돼요.
> 1. 아래의 **[Target Submodule]** 밖으로 분석, 파일 생성, 수정 범위를 넓히지 마세요.
> 2. 코드 생성 전에 **[Context Files]** 를 먼저 읽으세요.
> 3. 다른 서브모듈의 설정, 로직, 의존성을 섞어 쓰지 마세요.

## 🎯 범위
- **Target Submodule:** `[예: DeukUI | DeukPack | DeukNavigation]`
- **Context Files:**
  - `[예: DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md]`
  - `[예: path/to/your/specific/rules.md]`

## 📁 수정 파일
- `path/from/root/to/target1`: [무엇을 수정하는지 구체적으로 적으세요.]

## 🏗️ 설계 결정사항
- **Plan Reference**: [078-test-final-evidence-joy-nucb-plan.md](file:///home/joy/workspace/DeukAgentRules/.deuk-agent/docs/plans/078-test-final-evidence-joy-nucb-plan.md)
- **Plan Path Rule**: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- [필요한 핵심 결정을 간단히 적으세요]

## 🛑 엄격 제약
- [예: No hotpath LINQ, Async Safety, No Raw Pointers]

## 🔄 단계별 실행
> Agent: Phase 3 전에 Phase 1이 완전히 검증되기 전까지는 진행하지 마세요.

0. [Phase 0> RAG 조사 (MCP)]
   > **[필수 작성: EVIDENCE SUMMARY]**
   > 아래 항목은 RAG 검색(`mcp_deukcontext_search_*`) 결과를 바탕으로 작성되어야 합니다. 로컬 검색으로 대체할 수 없습니다.

   ### RAG 검색 결과
   - **유사 티켓**:
   - **관련 규약**:
   - **코드 패턴**:

   ### 발견사항 (RAG 기반)
   - Final test evidence string

   - [ ] (RAG Miss 시 필수) `mcp_deukcontext_add_knowledge` 주입 완료:

0.5 [Phase 0.5> 심층 분석 (선택)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> 준비 / 파싱]

2. [Phase 2> 핵심 로직 변경]
   - [ ] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukcontext_search_code` 및 `search_rules`로 관련 패턴 수시 검색

3. [Phase 3> 정리 / 검증]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukcontext_search_tickets` 로 과거 해결책 우선 탐색
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | | | | |

4. [Phase 4> 후속 연결 (이슈가 있으면 필수)]
   - [ ] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [ ] (필수 작성) 발행된 후속 티켓 번호 리스트:

## ✅ 검증 / QA
- [ ] **Deep Analysis Verification**: Phase 0.5에서 도출된 핵심 설계 및 구조적 결정사항이 코드에 모두 올바르게 반영되었는지 확인.
- [ ] **Potential Issues Check**: [side effect, edge case, performance impact를 적으세요]
- [ ] **Strict Constraints Audit**: [No hotpath LINQ, Async Safety, No Raw Pointers 등]
- [ ] `npm run test` 또는 관련 검증 명령 실행 결과 확인
