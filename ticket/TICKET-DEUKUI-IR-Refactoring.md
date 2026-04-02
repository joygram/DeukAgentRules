<!-- Ticket (repo-relative): DeukAgentRules/ticket/TICKET-DEUKUI-IR-Refactoring.md -->
# Task: DeukUI — IR 도입 및 아키텍처 리팩토링 (Phase 1–6)

> **[CAUTION FOR AI AGENTS]** 
> You are operating within a locked multi-module monorepo. 
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds

- **Target Submodule:** `DeukUI`
- **Context Files:** 
  - `DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md`

## 📁 Files to Modify (다음 단계 — Phase 3 우선)
- `DeukUI/plugin/generators/dto-field-mapper.ts`: `convertDataPathToDto` 직접 호출 축소 → `runDtoPipeline()` + IR `BindingRegistry` / `bindingRegistry.resolve` 위임. codegen 진입점에서 `bindingRegistry.validate()` 결과 로깅 또는 실패 처리(정책 합의 후).
- `DeukUI/plugin/utils/option-categories.ts`: `OPTION_SCHEMA` 기반으로 `getAllKeywords()`, `getKeywordsByCategory()` 등 재구현(중복 키워드 목록 제거).
- `DeukUI/plugin/src/export/combined-image-helpers.ts`: 합치기 대상에서 `[editorOnly]` / `ParsedOptions.isEditorOnly` 일관 필터(export 파이프라인이 IR 또는 동일 파싱 결과 사용).
- `DeukUI/plugin/src/export/selection.ts`: export 1-pass 흐름에 `buildIR` 또는 사전 `irById` 공유 여부 검토(중복 파싱 방지).
- `DeukUI/plugin/render-core.ts` (Phase 3–4 지속): `_loopParent` / `_gridContext` mutation 제거 — 자식 재귀 시 `IRNode.context`(loopItemName, gridDataPropName 등) 또는 `irById` + 부모 IR 참조로 치환. monolith 분할은 타입별 `BaseRenderer`를 브리지 **앞에** `register`하며 점진 이전.
- `DeukUI/plugin/renderers/renderer-router.ts`: 장기적으로 13-param `routeRenderer`를 `RenderContext` 단일 인자로 정리(브리지·전용 렌더러와 시그니처 통일).
- `DeukUI/plugin/generators/ref-components-generator.ts`: `PrefabRef` + `Override` 구조로 재귀 `generateCode` 정리(Phase 4).
- `DeukUI/plugin/ir/…`(선택): `[portal]`/`overlay` 실출력 시 `OverlayRenderer` 서브클래스 등록 및 브리지보다 우선 배치 — 기존 모달/드롭다운 동작 회귀 테스트 필수.

## 🏗️ Design Decisions
- IR 생성은 `buildIR()` / `buildIRFromNodeMap()` 단일 진입점. Phase 2에서는 렌더 본문이 여전히 원본 노드를 쓰되, dispatch 지점에서 IR(`_source`)과 `BindingRegistry`를 함께 공급한다.
- `IrRouteBridgeRenderer`는 폴백 겸 **확장 포인트**: 앞으로 `BaseRenderer` 구현체를 먼저 등록하면 동일 `dispatch` 경로로 전용 구현을 끼워 넣을 수 있다.
- `[portal]` / `[overlay]` → IR에서는 `styleMode.kind = 'overlay'`; 실제 Portal JSX 생성은 `OverlayRenderer` 등록 시에만 출력 경로에 반영(미등록 시 기존 렌더와 동일하게 유지).
- `[editorOnly]` → IR 트리 제외 + `render-core`에서 출력 제외 이중 적용. 이미지 합치기 등 export 단계도 동일 규칙으로 맞출 것.
- DTO 파이프라인: `normalize → alias → transform` 체인. `dto-pipeline.config.json`으로 외부 설정.
- `IRLayoutContext` 스택으로 Auto Layout 내부 constraints 무시 (Figma 스펙 준수).
- 루프/그리드 컨텍스트는 `IRContext` 정적 속성으로 이전하는 것이 목표; `_loopParent` 제거는 render 경로와 layout 렌더러를 함께 건드림.
- `IRLayoutNode.layout.slots` Map으로 슬롯 기반 컴포넌트 재사용.

## 🛑 Strict Constraints
- `@ts-nocheck` 제거는 파일별 점진적 진행. 일괄 strict 전환 금지.
- `createRenderNode` 반환 `(node, indent?, parent?) => string` 시그니처 유지(외부 codegen 계약).
- `createRenderNode` 호출마다 `rendererRegistry.clear()` 후 등록하므로, 동일 프로세스에서 codegen 병렬 실행 시 레지스트리 경쟁 주의.
- `ir/` 및 신규 TS는 UTF-8 유지(주석 한글 깨짐 방지). 저장 시 인코딩 확인.
- `ir/` 디렉토리 파일은 `@ts-nocheck` 없이 strict 타입 적용(새 파일 기준).
- Phase 순서: 1(메타언어) → 2(IR+스타일) → 3(DTO) → 4(프리팹/에디터뷰) → 5(렌더러) → 6(테스트). 역순 금지.
- `node-name-parser.js` 수정 금지 (`.ts` 소스 작성 후 교체).
- 중복 디렉토리(`utils/utils/`, `generators/generators/` 등) 정리는 빌드 산출물 분리(outDir) 완료 후 진행.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. Use separate chat messages per phase if the task is large.
1. [Phase 1 완료] `plugin/ir/` 신규 파일 생성 및 메타언어 스키마 구축.
2. [Phase 2 완료] `plugin/render-core.ts` 브리지 라우팅 및 `IrRouteBridgeRenderer` 구축.
3. [Phase 3 완료] DTO 필드 매핑 로직(`dto-field-mapper.ts`) 파이프라인 전환 및 `Export` 흐름 1-pass 통일.

## ✅ Verification / QA
- [ ] `npm run build:plugin --prefix DeukUI` 성공 여부
- [ ] 모달/드롭다운 등 기존 포탈 객체들의 회귀 테스트 정상 통과 여부
