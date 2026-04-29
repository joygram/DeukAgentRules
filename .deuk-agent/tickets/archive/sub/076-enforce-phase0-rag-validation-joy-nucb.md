---
id: 076-enforce-phase0-rag-validation-joy-nucb
title: 076-enforce-phase0-rag-validation
status: open
project: DeukAgentRules
createdAt: 2026-04-25 09:24:43
summary: 076-enforce-phase0-rag-validation
planLink: .deuk-agent/docs/plans/076-enforce-phase0-rag-validation-joy-nucb-plan.md
---


# [실행] 작업: 076-enforce-phase0-rag-validation | ID: 076-enforce-phase0-rag-validation-joy-nucb

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
- **Target Submodule:** `DeukAgentRules` (CLI and Templates)
- **Context Files:**
  - `AGENTS.md`
  - `bundle/templates/TICKET_TEMPLATE.md`
  - `scripts/cli-ticket-commands.mjs`

## 🚨 하드룰 위반 원인 보고 (Post-Mortem)
- **위반 사항**: "Plan in Ticket (Hard Rule)" 위반. 정식 티켓 본문이 아닌 임시 아티팩트(`implementation_plan.md`)에 플랜을 작성함.
- **근본 원인**: 저(Antigravity)의 내장 코어 프롬프트(Planning Mode)는 "항상 `implementation_plan.md` 아티팩트를 생성하여 승인을 받아라"라고 강력하게 지시하도록 설계되어 있습니다. 이 내장 지시사항과 저장소의 `AGENTS.md` 하드룰이 충돌했을 때, 내장 지시사항을 우선시하는 판단 오류를 범했습니다.
- **재발 방지**: 향후 계획 수립 시, 내장된 아티팩트 생성 지시보다 `AGENTS.md`의 "티켓 내 작성" 하드룰을 최우선으로 적용하여 즉시 `ticket create`를 호출하겠습니다.

## 📁 수정 파일
- `AGENTS.md`: Phase 0 (RAG 조사)의 비용/편익 분석 및 명확한 실행 지침 추가.
- `bundle/templates/TICKET_TEMPLATE.md` & `ko.md`: Phase 0 체크박스를 구체적인 Evidence Summary 요구 섹션으로 대체.
- `scripts/cli-ticket-commands.mjs`: 티켓 생성 전 Phase 0 증거 제출을 강제하는 Pre-Validation Gate 추가.

## 🏗️ 설계 결정사항
- **CLI Pre-Validation Gate 방식**: CLI 실행 시 TTY 환경에서는 프롬프트로 Phase 0 수행 여부를 확인하고, Non-TTY 환경(에이전트)에서는 `--evidence` 플래그를 요구합니다. 미제공 시 티켓 생성을 차단(Throw Error)하여 강제성을 부여합니다.
- **프롬프트 후킹 (Planning Mode Hook)**: 에이전트 내장 시스템 프롬프트가 `implementation_plan.md`를 강제 생성하도록 지시하더라도, 이를 `AGENTS.md`에서 텍스트 패턴 매칭으로 가로채어 강제로 티켓 시스템으로 우회하도록 `Plan in Ticket` 룰을 강화합니다.

## 🛑 엄격 제약
- [예: No hotpath LINQ, Async Safety, No Raw Pointers]

## 🔄 단계별 실행
> Agent: Phase 3 전에 Phase 1이 완전히 검증되기 전까지는 진행하지 마세요.

0. [Phase 0> RAG 조사 (MCP)]
   - [ ] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [ ] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [ ] (필수 작성) 검색된 핵심 컨텍스트 요약:
   - [ ] (RAG Miss 시 필수 작성) 로컬 검색 결과 `mcp_deukrag_add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록:

0.5 [Phase 0.5> 심층 분석 (선택)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> 준비 / 파싱]

2. [Phase 2> 핵심 로직 변경]
   - [ ] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색

3. [Phase 3> 정리 / 검증]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
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
