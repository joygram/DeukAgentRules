## Task: DeukUI Container 생성기 단일화 2차

### Files to modify
- DeukUI/plugin/generators/container-code-generator.ts: 단일 진입점을 container-unified 중심으로 고정하고, 기존 분기 로직을 최소화
- DeukUI/plugin/generators/container-generator-new.ts: wrapper 성격으로 축소하거나 호출 경로 제거 시 안전하게 정리
- DeukUI/plugin/generators/container-unified.ts: 실제 생성 흐름을 단일 소스로 유지하도록 누락 경로 보강
- DeukUI/plugin/generators/steps/code-generation-steps.ts: container 단계 계약(입력/출력 context) 주석 또는 체크리스트 추가

### Design decisions
- 1차에서 완료한 경계 분리(container-step-helpers)는 유지하고, 2차는 진입점 단일화에 집중
- 기능 변경보다 생성 경로 일원화와 충돌 감소를 우선
- legacy 호환 레이어는 즉시 삭제보다 단계적 축소
- 대규모 트리 환경이므로 작은 슬라이스 단위 커밋 유지

### Constraints
- npm run build:codegen 실행 시 plugin/code-generator.ts 버전 bump 가능성 있음
- build 산출물(plugin/code.js, plugin/ui.html)은 가능하면 기능 검증용으로만 보고 불필요 diff 확산 방지
- 현재 브랜치는 이미 대규모 변경을 포함하므로 되돌리기보다 전진식 정리
- 검증은 build:plugin + get_errors 우선

### Current state
- 기준 커밋 1: 33b7c615
  - refactor(generator): split container step helpers
  - 포함: container-step-helpers 신규, code-generation-steps import 전환, container-generator re-export 정리, import-css 주석 보정
- 기준 커밋 2: 87524aab
  - chore(plugin): checkpoint remaining generator and runtime changes
  - 잔여 변경 57개 파일 체크포인트 커밋 완료
- 워크트리 상태: clean

### How to pick up
1. 진입점 호출 그래프 확인
- container-code-generator, container-generator-new, container-unified 간 실제 호출/사용 관계를 먼저 확정

2. 단일 경로 강제
- 최종 생성이 container-unified 한 경로로만 수렴하도록 호출부 정리
- 기존 경로는 wrapper로 축소하거나 dead path 제거

3. Step 계약 문서화
- code-generation-steps.ts의 container 단계에 consumed/produced context 명시
- 다음 구현자가 안전하게 수정할 수 있도록 체크리스트 추가

4. 검증
- npm run build:plugin
- 대상 파일 get_errors
- 가능하면 샘플 입력 1건으로 생성 결과 스모크 확인

### Risks
- container-generator 계열 직접 참조가 남아 있으면 경로 단일화 시 회귀 가능
- 체크포인트 이후 작업에서 build 산출물 diff가 다시 커질 수 있음
- PluginData 전환 트랙과 병행되는 영역이라 책임 범위가 섞일 위험 있음

Generated: 2026-03-29
