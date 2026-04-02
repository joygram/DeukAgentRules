## Task: DeukPack — 엔진 안정화, 보안 강화 및 세니타이즈 (Phase 2 이관)

### Files to modify
- `DeukPack/src/serialization/WireSerializer.ts`: 직렬화 핸들러 레지스트리 분리 및 `WireSerializer` 클래스 경량화 (Phase 2).
- `DeukPack/src/core/IdlParser.ts`: 파일 파싱 및 포함 구조 관리 로직 유틸리티 추출.
- `DeukPack/docs/internal/`: 내부 문서 파일명 및 본문 내 잔여 레거시 식별자(`GPLAT` 등) 2차 전수조사.
- `DeukPack/package.json`: Phase 2 리팩토링물에 대한 진입점 정합성 유지.

### Design decisions
- **보안 가드 표준화**: `BinaryReader`, `TBinaryProtocol`, `TCompactProtocol`에 적용된 `MAX_SAFE_LENGTH`(10MB)와 `WireDeserializer`의 `MAX_RECURSION_DEPTH`(64) 정책을 향후 모든 전송 레이어에 강제 적용.
- **모듈 책임 분할**: 비대해진 코어 클래스를 `utils/`, `ast/`, `serialization/` 하위 모듈로 즉시 분리하여 각 코드 블록을 500라인 이내로 유지함.
- **중립성 유지**: 모든 공개 명칭, 벤치마크 스크립트(`bench-project-dp-define.js`), 환경 변수(`DEUK_BENCH_PROJECT_DP_ROOT`)에서 식별자 중립성 원칙 고수.

### Constraints
- **바이너리 호환 유지**: `BinaryWriter`의 I64 수정 및 `TBinaryProtocol` 문자열 쓰기 수정에 따른 타 언어 엔진(C++, C#, Java)과의 호환성 회귀 테스트(`test-e2e-roundtrip-chain.js`) 수행 필수.
- **문서 외부 유출 방지**: `docs/internal/` 디렉토리는 공개 GitHub(DeukPackOSS) 동기화 범위에서 영구 제외(`OSS_PUBLISH_SCOPE.md` 준수).

### Current state
- **Phase 1 완료**:
  - `BinaryWriter` I64 절삭 버그 및 `TProtocol` 문자열 중복 쓰기 버그 수정.
  - `MAX_SAFE_LENGTH` / `MAX_RECURSION_DEPTH` 보안 가드 전역 적용.
  - `gplat`, `project_i` 등 내부 식별자 1차 제거 및 벤치마크 환경 업데이트.
  - `DeukPackEngine`, `ExcelProtocol` 분할 완료 (PathUtils, ASTResolver, ExcelObjectReader, ExcelUtils 파생).
- **검증**: `npm run verify:quick` 통과. 워크트리 clean.

### How to pick up
1. **WireSerializer 경량화**: `WireSerializer.ts` 내부의 직렬화 로직을 별도 핸들러로 추출하여 클래스 크기를 축소함.
2. **IDL 파서 리팩토링**: `IdlParser.ts`의 포함 그래프 관리 및 파일 비즈니스 로직을 `DeukPackEngine`에서 사용한 `PathUtils` 규격에 맞춰 체계화함.
3. **2차 세니타이즈**: `docs/internal/` 내의 파일명 중 `GPLAT_` 접두어가 남은 항목이 있는지 재검독하고, 본문 내 잔여 내부 명칭 치환.

### Risks
- **타 언어 연동**: 바이너리 레이어 수정으로 인해 Unity(C#)나 서버(C++) 연동 시 비정상적인 데이터 파싱이 발생하는지 원격 엔진과 교차 검증 필요.
- **포함 경로**: `PathUtils` 통합 과정에서 `include` 깊이가 깊은 복잡한 IDL 트리에 대한 파싱 순환 오류가 발생하지 않는지 확인.

Generated: 2026-03-29
