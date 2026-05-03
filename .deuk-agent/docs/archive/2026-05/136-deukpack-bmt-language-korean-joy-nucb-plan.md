---
summary: DeukPack BMT Kotlin 언어 항목의 Compression 회귀 불일치, streaming 검증 누락, evidence 보강을 위한 실행 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - kotlin
  - test-coverage
---

# Plan: DeukPack BMT Kotlin 누락 테스트 보강

## 목표
- Kotlin 항목의 `Compression regression`, `streaming verification`, `evidence metadata` 누락을 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 공식 BMT Matrix에 Kotlin 섹션이나 원천 근거가 없으면 성공 상태로 승격하지 않는다.
- 상위 142 티켓의 공통 누락 계약을 Kotlin 하위 티켓에 적용한다.

## 범위
- 대상: Kotlin BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Kotlin 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격, Kotlin을 공식 Matrix 언어로 추가
- 참고: `142-deukpack-135-report`, `137-deukpack-bmt-language-python-report`, DeukPack `PROJECT_RULE.md`, `BMT_PROTOCOL_MATRIX.md`, `DEUKPACK_TEST_MATRIX.md`

## 실행 항목
1. [x] Kotlin Compression 회귀 불일치 항목 분리
   - `support_level`은 Kotlin 도입 가능성 또는 후보 상태로 기록
   - `implementation_state`는 compression 구현/누락/대기 상태와 독립적으로 기록
   - 회귀 테스트 근거가 없으면 `미검증`으로 분류
   - 완료 기준: compression 지원 가능성, 구현 상태, 회귀 테스트 근거를 각각 독립 필드로 유지
2. [x] streaming 검증 누락 항목 분리
   - streaming 항목을 독립 feature로 유지
   - streaming 지원성, 실제 구현 상태, 테스트 통과 여부를 분리
   - streaming runner 또는 source path 근거가 없으면 `대기`로 분류
   - 완료 기준: streaming 구현 여부와 검증 통과 여부를 같은 셀에서 병합하지 않음
3. [x] evidence metadata 필드 정렬
   - Kotlin 근거를 `evidence`로 분리
   - `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`를 필수 확인 포인트로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
   - 완료 기준: evidence metadata가 비어 있으면 `implemented`나 `passing`으로 승격 금지
4. [x] 완료 기준 고정
   - Kotlin 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 공식 Matrix에 Kotlin 원천 근거가 없으면 후보/대기 상태로 유지
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 검증
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md .deuk-agent/docs/plans/136-deukpack-bmt-language-korean-joy-nucb-plan.md`

## 실행 결과
- Kotlin `Compression regression`은 지원 가능성, 구현 상태, 회귀 테스트 근거를 독립 필드로 유지하도록 고정했다.
- `streaming verification`은 streaming 지원성, 실제 구현 상태, runner/source path 근거를 병합하지 않는 독립 항목으로 유지했다.
- evidence metadata는 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`를 필수 확인 포인트로 고정했다.
- 현재 DeukPack BMT Matrix에는 Kotlin 전용 공식 섹션이나 원천 근거가 확인되지 않으므로, Kotlin 항목은 공식 성공/implemented/passing 상태로 승격하지 않는다.
- 실제 원천 데이터나 테스트 러너 위치가 확인되기 전까지 Kotlin 항목은 후보, `미검증`, 또는 `대기`로 분류한다.

## 완료 기준
- Kotlin 보강 대상이 `Compression regression`, `streaming verification`, `evidence metadata`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨
