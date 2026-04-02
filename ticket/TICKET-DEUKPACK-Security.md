<!-- Ticket (repo-relative): DeukAgentRules/ticket/TICKET-DEUKPACK-Security.md -->
# Task: DeukPack — 엔진 안정화, 보안 강화 및 세니타이즈 (Phase 1–2)

> **[CAUTION FOR AI AGENTS]** 
> You are operating within a locked multi-module monorepo. 
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds

- **Target Submodule:** `DeukPack`
- **Context Files:** 
  - `DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md`

## 📁 Files to Modify (다음 단계 — Phase 2 우선)
- `DeukPack/src/serialization/WireSerializer.ts`: 직렬화 핸들러 레지스트리 도입 및 `WireSerializer` 클래스 경량화.
- `DeukPack/src/core/IdlParser.ts`: 파일 파싱 및 포함 구조 관리 로직 유틸리티화.
- `DeukPack/docs/internal/`: 내부 문서 파일명 및 본문 내 잔여 레거시 식별자(`GPLAT` 등) 2차 전수조사.

## 🏗️ Design Decisions
- 보안 가드(`MAX_SAFE_LENGTH`, `MAX_RECURSION_DEPTH`) 정책을 신규 프로토콜 및 모든 전송 레이어에 강제 상속.
- 비대 모듈 방지: 코어 클래스(Engine, Protocol, Parser)는 500라인 이내 유지를 지향하며 리팩토링 시 `utils/`로 즉시 분할.
- 중립성 규약: 모든 벤치마크 지표 및 스크립트(`bench-project-dp-define.js`)에서 프로젝트 중립 명칭 고수.

## 🛑 Strict Constraints
- **바이너리 호환성**: 프로토콜 최저 규격 변경 시 반드시 `test-e2e-roundtrip-chain.js`를 통해 타 언어 엔진과의 호환성 회귀 테스트 수행.
- **문서 외부 유출 금지**: `docs/internal/` 디렉토리는 `OSS_PUBLISH_SCOPE.md`에 따라 공개 저장소 동기화 범위에서 영구 제외.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 2 before Phase 1 is fully tested. Use separate chat messages per phase if the task is large.
1. [Phase 1 완료] **보안 가드 도입**: `MAX_SAFE_LENGTH`(10MB) 및 `MAX_RECURSION_DEPTH`(64) Elixir 등 전역 적용, 식별자 세니타이즈 완료.
2. **[Phase 2 진행 중]** `WireSerializer` 직렬화 레지스트리 분리 방어 및 `IdlParser` 유틸 분리.

## ✅ Verification / QA
- [ ] `node scripts/test-e2e-roundtrip-chain.js` 통과 증명
- [ ] OOM 방어를 위한 Payload Fuzzing 테스트 통과 증명
