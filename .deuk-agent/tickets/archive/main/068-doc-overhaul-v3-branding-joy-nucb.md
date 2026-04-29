---
id: 068-doc-overhaul-v3-branding-joy-nucb
title: doc-overhaul-v3-branding
status: open
project: DeukAgentRules
createdAt: 2026-04-25 01:58:59
summary: doc-overhaul-v3-branding
planLink: .deuk-agent/docs/plans/068-doc-overhaul-v3-branding-joy-nucb-plan.md
---


# [실행] 작업: doc-overhaul-v3-branding | ID: 068-doc-overhaul-v3-branding-joy-nucb

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
- **Target Submodule:** `DeukAgentRules` (Root & Documentation)
- **Context Files:**
  - `README.md` (Main entry point)
  - `docs/principles.md`, `docs/how-it-works.md`
  - `bundle/AGENTS.md` (Core rule bundle)

## 📁 수정 파일
- `README.md`, `README.ko.md`: 브랜드 아이덴티티 및 v3 메커니즘 반영
- `docs/principles.md`, `docs/principles.ko.md`: Hub-Spoke, Zero-Legacy 철학 명시
- `docs/how-it-works.md`, `docs/how-it-works.ko.md`: v3 실행 흐름 및 백업 로직 기술
- `docs/architecture.md`, `docs/architecture.ko.md`: [NEW] 아키텍처 인포그래픽 및 구조도
- `bundle/AGENTS.md`: 도메인 특화 하드코딩 규칙 제거 (범용화)

## 🏗️ 설계 결정사항
- **Plan Reference**: [068-doc-overhaul-v3-branding-joy-nucb-plan.md](file:///home/joy/workspace/DeukAgentRules/.deuk-agent/docs/plans/068-doc-overhaul-v3-branding-joy-nucb-plan.md)
- **Identity Shift**: DeukAgentRules를 "AI Orchestration Protocol"로 재정의.
- **Visual Priority**: Mermaid 대신 고해상도 PNG 인포그래픽 우선 사용.

## 🛑 엄격 제약
- **No Domain Hardcoding**: 번들 AGENTS.md에 Unity/C++/DeukPack 관련 규칙 절대 금지.
- **Bilingual Parity**: 한/영 문서의 내용과 링크 구조를 완벽하게 일치시킬 것.

## 🔄 단계별 실행
> Agent: Phase 3 전에 Phase 1이 완전히 검증되기 전까지는 진행하지 마세요.

1. [Phase 1> Branding & Bundle Core]
   - [ ] `bundle/AGENTS.md`에서 특정 도메인(Unity, C++, DeukPack) 하드코딩 제거
   - [ ] 범용 프로토콜 규칙으로 Identity 문구 재작성
   - [ ] `package.json` 버전 3.0.0 재확인

2. [Phase 2> High-End Visuals & Architecture Docs]
   - [ ] `docs/assets/architecture-v3.png` 배치 확인 (완료됨)
   - [ ] `docs/architecture.md` (한/영) 신설하여 다이어그램 및 흐름 설명 추가

3. [Phase 3> 정리 / 검증]
   - [ ] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
   - [ ] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | | | | |

4. [Phase 4> README Finalization & SEO]
   - [ ] `README.md` (한/영) 최상단에 Visual Hero 및 신규 캐치프레이즈 적용
   - [ ] "What's New in v3.0" 섹션 작성 및 Getting Started 갱신
   - [ ] SEO 태그 업데이트

5. [Phase 5> Changelog & Final Audit]
   - [ ] `CHANGELOG.md` 3.0.0 섹션 상세화
   - [ ] `npm run lint:md`로 모든 문서 링크 및 포맷 검증

## ✅ 검증 / QA
- [ ] **Bilingual Sync**: 한/영 문서 간의 링크 및 정보 정합성 확인
- [ ] **Visual Check**: README에서 인포그래픽이 올바르게 렌더링되는지 확인
- [ ] `npm run lint:md` 통과 여부 확인
