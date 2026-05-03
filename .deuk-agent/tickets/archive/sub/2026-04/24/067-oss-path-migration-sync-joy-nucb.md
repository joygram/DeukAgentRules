---
createdAt: 2026-04-24 21:26:33
id: 067-oss-path-migration-sync-joy-nucb
planLink: .deuk-agent/docs/plans/067-oss-path-migration-sync-joy-nucb-plan.md
priority: P2
status: open
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] - Target Submodule: DeukPack, DeukAgentRules
  (OSS mirror 경로 정합성)'
tags: rag, mcp, tickets, architecture, migration
title: oss-path-migration-sync
---

# [실행] 작업: oss-path-migration-sync | ID: 067-oss-path-migration-sync-joy-nucb

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
   - **Target Submodule:** `DeukPack`, `DeukAgentRules` (OSS mirror 경로 정합성)
   - **Context Files:**
      - `DeukPack/scripts/mirror-to-oss.js`
      - `DeukPack/scripts/mirror-to-oss.sh`
      - `DeukAgentRules/scripts/sync-oss.mjs`
      - `DeukAgentRules/OSS_SYNC.internal.md`

## 📁 수정 파일
   - `DeukPack/package.json`: `sync:oss`, `sync:oss:apply` 명령을 표준화하고 기존 `mirror:oss*`는 호환 별칭으로 유지
   - `DeukPack/scripts/mirror-to-oss.js`: 공개 미러에서 `sync:oss*`, `mirror:oss*` 내부 스크립트 제거 정합성 반영
   - `DeukAgentRules/.deuk-agent/tickets/sub/067-oss-path-migration-sync-joy-nucb.md`: 이동 단계 제거 및 실행 기준 갱신
   - `DeukAgentRules/.deuk-agent/docs/plans/067-oss-path-migration-sync-joy-nucb-plan.md`: 최신 실행계획 반영

## 🏗️ 설계 결정사항
   - **Plan Reference**: [067-oss-path-migration-sync-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/067-oss-path-migration-sync-joy-nucb-plan.md)
   - **DeukAgentRules**: `sync-oss.mjs`가 이미 `workspace/OSS/DeukAgentRulesOSS`를 타겟으로 설정 완료 → 경로 수정 불필요, 실행만 검증
   - **DeukPack**: 실제 OSS 동기화 구현은 유지하되, 사용자 진입 명령은 `sync:oss`, `sync:oss:apply`로 통일
   - 기존 `mirror:oss*`는 하위 호환용 alias로 남기고, 문서/운영 기준 명령은 `sync:oss*`로 간주
   - 사용자 지시에 따라 OSS 이동 작업은 완료된 것으로 간주하고, 본 티켓에서는 경로 이동 절차를 제외
   - `workspace/OSS/DeukPackKitsOSS`는 `DeukPackStarterKit` (별도 프로젝트, 관계 없음)

## 🛑 엄격 제약
   - 기존 `mirror:oss*` 호출자와 릴리즈 자동화는 깨지지 않아야 함
   - 공개 미러 `package.json`에는 내부 동기화 스크립트가 남지 않아야 함
   - 실제 OSS 대상 경로 존재 여부는 검증 단계에서 별도 확인

## 🔄 단계별 실행
> Agent: Phase 3 전에 Phase 1이 완전히 검증되기 전까지는 진행하지 마세요.

0. [Phase 0> RAG 조사 (MCP)]
   - [x] 로컬 파일 직접 확인으로 현황 파악 완료 (MCP 미사용)
   - [x] 핵심 컨텍스트: DeukAgentRules는 이미 `sync:oss` 기준, DeukPack은 문서와 package.json 명령명이 불일치

0.5 [Phase 0.5> 심층 분석 (선택)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> 준비 / 파싱]
   - [x] DeukPack npm script 명칭을 `sync:oss*` 기준으로 정리하고 기존 `mirror:oss*`는 alias로 유지

2. [Phase 2> 핵심 로직 변경]
   - [ ] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색
   - [x] `npm run sync:oss -- --help` 기준으로 DeukPack 표준 명령 노출 검증 완료
   - [x] `npm run sync:oss` dry-run 기준으로 DeukPack OSS 동기화 경로 해석 검증 완료

3. [Phase 3> 정리 / 검증]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
   | OSS apply 대상 경로 준비 필요 | 중간 | dry-run은 성공했지만 `sync:oss:apply` 전 실제 미러 clone 위치는 별도 보장 필요 | apply 직전 `workspace/OSS/DeukPackOSS` 준비 여부 확인 |

4. [Phase 4> 후속 연결 (이슈가 있으면 필수)]
   - [ ] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [ ] (필수 작성) 발행된 후속 티켓 번호 리스트:

## ✅ 검증 / QA
- [ ] **Deep Analysis Verification**: Phase 0.5에서 도출된 핵심 설계 및 구조적 결정사항이 코드에 모두 올바르게 반영되었는지 확인.
- [ ] **Potential Issues Check**: [side effect, edge case, performance impact를 적으세요]
- [ ] **Strict Constraints Audit**: [No hotpath LINQ, Async Safety, No Raw Pointers 등]
- [x] `npm run sync:oss -- --help` 결과 확인
- [x] `npm run sync:oss` dry-run 결과 확인 (`/home/joy/workspace/OSS/DeukPackOSS` 대상으로 목록 출력 성공)