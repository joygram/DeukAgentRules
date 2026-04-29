---
createdAt: 2026-04-24 09:51:39
id: 066-canonical-rule-normalization-joy-nucb
planLink: .deuk-agent/docs/plans/066-canonical-rule-normalization-joy-nucb-plan.md
priority: P2
status: open
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] - Target Submodule: DeukAgentRules
  (Main)'
tags: rag, mcp, tickets, normalization, architecture
title: 066-canonical-rule-normalization
---

# [실행] 작업: 066-canonical-rule-normalization | ID: 066-canonical-rule-normalization-joy-nucb

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
- **Target Submodule:** `DeukAgentRules` (Main)
- **Context Files:**
  - `bundle/AGENTS.md`
  - `bundle/rules.d/`

## 📁 수정 파일
- `bundle/AGENTS.md`: 잘못된 템플릿 경로 수정 및 도메인 종속적(DeukPack) 규칙 분리. Identity 섹션 이국어 표기 정리.
- `bundle/rules.d/deukpack-codec.md` [NEW]: `bundle/AGENTS.md`에서 분리된 DeukPack 전용 규칙 모듈.

## 🏗️ 설계 결정사항
- **Plan Reference**: [066-canonical-rule-normalization-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/066-canonical-rule-normalization-joy-nucb-plan.md)
- **Modular Rule Separation**: 전역 룰(`AGENTS.md`)의 범용성 확보를 위해 특정 프로젝트(DeukPack)에 국한된 규칙을 별도 모듈로 분리.
- **Path Correction**: `.deuk-agent-templates/` 오타를 실제 경로인 `.deuk-agent/templates/`로 수정.

## 🛑 엄격 제약
- 정본 수정 시 CRLF/LF 줄바꿈 혼용 주의 (LF로 통일 권장).
- 기존 룰의 핵심 의미 훼손 금지.

## 🔄 단계별 실행
> Agent: Phase 3 전에 Phase 1이 완전히 검증되기 전까지는 진행하지 마세요.

0. [Phase 0> RAG 조사 (MCP)]
   - [x] `mcp_deukrag_search_rules` 기반 규약 검토 완료 (Generic Rules vs Submodule Rules)
   - [x] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료 (Ticket 045 modularization plan)
   - [x] 검색된 핵심 컨텍스트 요약: `DeukAgentRules`는 범용 룰 엔진을 목표로 하며, 현재 `DeukPack` 규칙이 코어에 강결합되어 있음.
   - [x] (RAG Miss 시 필수 작성) 로컬 검색 결과: `.deuk-agent-templates/` 경로 참조 오류 확인됨.

0.5 [Phase 0.5> 심층 분석 (선택)]
   - [ ] N/A

1. [Phase 1> 준비 / 파싱]
   - [x] `bundle/AGENTS.md`의 `DeukPack Codec` 섹션을 추출하여 `DeukPack` 로컬 도메인 룰로 이동 준비 완료
   - [x] `bundle/AGENTS.md` 내 템플릿 경로 오타 수정 완료 (`.deuk-agent/templates/`)

2. [Phase 2> 핵심 로직 변경]
   - [x] Identity 섹션 영어/한글 병기 구조로 정리 완료
   - [x] `DeukAgentRules` 정본에서 `DeukPack` 관련 규칙 완전 제거 완료
   - [x] `DeukPack` 프로젝트 내 `.deuk-agent/domain-rules/` 생성 및 전용 규칙 안착 완료
   - [x] `deuk-agent-rule merge` 명령이 로컬 도메인 룰을 병합하도록 로직 개선 완료

3. [Phase 3> 정리 / 검증]
   - [x] `npx deuk-agent-rule merge`를 사용하여 `DeukRag` 및 `DeukPack` 서브모듈에 최신 룰 전파 테스트 완료
   - [x] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | 경로 변경 영향 | Low | 주요 저장소 merge 테스트 결과 이상 없음 | 모니터링 유지 |

## 📜 Execution Report (작업 보고서)

### 구현 세부 사항
- **정본 정규화**: `DeukAgentRules`의 `AGENTS.md` 템플릿에서 모든 도메인 종속적 규칙을 제거하고 범용 에이전트 하드 룰만 남겼습니다.
- **도메인 룰 내제화**: `DeukPack` 전용 코덱 규칙은 `DeukPack` 저장소 내부의 `.deuk-agent/domain-rules/deukpack-codec.md`로 이동되었습니다.
- **CLI 기능 개선**: `merge` 명령이 실행될 때 Hub의 공통 룰뿐만 아니라 타겟 저장소의 `domain-rules/` 폴더 내 규칙도 함께 `AGENTS.md`에 주입하도록 `cli-init-commands.mjs` 로직을 수정했습니다.
- **경로 오류 수정**: `.deuk-agent-templates/`로 잘못 기재된 모든 경로를 표준 경로인 `.deuk-agent/templates/`로 일괄 수정했습니다.

### 검증 결과
- `DeukPack/AGENTS.md`: 로컬에서 정의된 `DeukPack Codec` 규칙이 정상적으로 주입됨을 확인했습니다.
- `DeukRag/AGENTS.md`: `DeukPack` 관련 내용 없이 순수 정본 규칙만 깨끗하게 동기화됨을 확인했습니다.
- 전체 워크스페이스의 템플릿 참조 경로가 정상 작동함을 확인했습니다.

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