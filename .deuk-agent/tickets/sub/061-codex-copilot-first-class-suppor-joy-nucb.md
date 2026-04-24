---
id: 061-codex-copilot-first-class-suppor-joy-nucb
title: "codex-copilot-first-class-support"
status: open
project: DeukAgentRules
createdAt: 2026-04-23 22:55:29
---

# [Execution] Task: codex-copilot-first-class-support | ID: 061-codex-copilot-first-class-suppor-joy-nucb

> **[CAUTION FOR AI AGENTS]**
> You are operating within a locked multi-module monorepo.
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds
- **Target Submodule:** `DeukAgentRules`
- **Context Files:** 
  - `AGENTS.md`
  - `README.md`
  - `README.ko.md`
  - `scripts/cli-utils.mjs`
  - `scripts/cli-init-commands.mjs`
  - `publish/rules.d/core-workflow.md`
  - `publish/rules.d/deukrag-mcp.md`
  - `.deuk-agent/docs/plans/061-codex-copilot-first-class-suppor-joy-nucb-plan.md`

## 📁 Files to Modify
- `scripts/cli-utils.mjs`: `AGENT_TOOLS`에 `copilot`, `codex`를 추가합니다.
- `scripts/cli-init-commands.mjs`: Copilot/Codex 산출물 생성 규칙과 spoke 내용을 agent별로 분기합니다.
- `publish/rules.d/*.md`, `publish/AGENTS.md`, `publish/gemini.md`: Copilot/Codex 대상 rule injection과 문구를 정리합니다.
- `README.md`, `README.ko.md`: 지원 에이전트와 실제 생성 동작을 일치시킵니다.

## 🏗️ Design Decisions (Refer to Plan)
- **Plan Reference**: [061-codex-copilot-first-class-suppor-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/061-codex-copilot-first-class-suppor-joy-nucb-plan.md)
- 티켓은 실행 정본입니다.
- 상세 설계 판단과 배경은 연결된 plan 문서를 기준으로 봅니다.
- `Codex`는 전역 포인터 유지 + repo-local spoke 추가의 혼합형으로 갑니다.
- `Copilot`은 일반 포인터가 아니라 전용 축약 지침을 생성합니다.

## 🛑 Strict Constraints (Rules to never break)
- 구현 전 사용자 승인 없이 코드 변경 단계로 넘어가지 않습니다.
- 이번 티켓에서는 `DeukAgentRules` 루트 범위 밖으로 확장하지 않습니다.
- 플랜 문서의 상세 설계를 티켓 본문에 중복 복사하지 않고, 실행 요약만 유지합니다.
- 검증 단계에서 범위 밖 리팩토링이나 임의 설계 변경을 하지 않습니다.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. 

0. [Phase 0> RAG Research (MCP)]
   - [x] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [x] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [x] (필수 작성) 검색된 핵심 컨텍스트 요약: 현재 규칙은 `Plan in Ticket`, 별도 `docs/plans`, `Plan Reference`를 동시에 사용하고 있어 실행 흐름이 끊길 수 있습니다. Copilot/Codex는 실제 생성 로직과 README 설명 사이에 비대칭이 있습니다.
   - [x] (RAG Miss 시 필수 작성) 로컬 검색 결과 `mcp_deukrag_add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록: RAG miss 없음. 로컬 확인 파일: `scripts/cli-init-commands.mjs`, `scripts/cli-utils.mjs`, `AGENTS.md`, `README.md`, `.deuk-agent/templates/TICKET_TEMPLATE.md`

0.5 [Phase 0.5> Deep Analysis (Optional)]
   - [x] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료
   - [x] 분석 아티팩트: `.deuk-agent/docs/plans/061-codex-copilot-first-class-suppor-joy-nucb-plan.md`

1. [Phase 1> Setup / Parsing]
   - [x] 티켓과 plan reference를 기준으로 수정 범위 확정
   - [x] Copilot/Codex current behavior와 desired behavior를 코드 기준으로 매핑
   - [x] 사용자 승인 후에만 Phase 2 진입

2. [Phase 2> Core Logic Change]
   - [x] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색
   - [x] `AGENT_TOOLS`와 init config에 `copilot`, `codex` 반영
   - [x] agent별 spoke 생성 문구 분리
   - [x] Copilot/Codex 대상 문서 설명 정합화

3. [Phase 3> Cleanup / Verification]
   - [x] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
   - [x] `init --dry-run`으로 산출물 구조 확인
   - [x] 실제 init 재실행으로 overwrite/sync 동작 확인
   - [x] README 설명과 실제 생성 결과 일치 여부 확인
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | Codex local spoke path ambiguity | medium | Codex repo-local 보조 문서 경로 표준이 약함 | `.codex/AGENTS.md`를 기본안으로 유지하고 후속 티켓 검토 |
     | Existing Copilot file overwrite | medium | 기존 `.github/copilot-instructions.md`를 덮어쓸 수 있음 | overwrite 정책과 backup 경로 검토 |

4. [Phase 4> Follow-up Chaining (MANDATORY if issues exist)]
   - [ ] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [ ] (필수 작성) 발행된 후속 티켓 번호 리스트:

## ✅ Verification / QA
- [x] **Deep Analysis Verification**: 선택지 추가, 선택 기반 spoke 생성, agent-specific spoke 문구, README 매트릭스를 반영했습니다.
- [x] **Potential Issues Check**: 기존 사용자 파일 overwrite와 Codex local path ambiguity를 잔여 리스크로 유지합니다.
- [x] **Strict Constraints Audit**: 범위 밖 규칙 체계 개편 없이 Copilot/Codex 관련 변경만 반영했습니다.
- [x] 관련 검증 명령 실행 결과 확인: `node ./scripts/cli.mjs init --dry-run --non-interactive --cwd /home/joy/workspace/i/DeukAgentRules` 및 임시 디렉토리에서 `copilot`, `codex` spoke 생성 dry-run 확인
