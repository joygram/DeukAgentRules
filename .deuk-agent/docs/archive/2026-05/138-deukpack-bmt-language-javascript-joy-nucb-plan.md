---
summary: DeukPack BMT JavaScript/TypeScript 언어 항목의 tooling/codegen maturity, schema compatibility, verification metadata 누락을 보강하기 위한 실행 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - javascript
  - test-coverage
---

# Plan: DeukPack BMT JavaScript/TypeScript 누락 테스트 보강

## 목표
- JavaScript/TypeScript 항목의 `tooling/codegen maturity`, `schema compatibility`, `verification metadata` 누락을 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 JavaScript/TypeScript 하위 티켓에 적용한다.

## 범위
- 대상: JavaScript/TypeScript BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: JavaScript/TypeScript 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-report`, `140-deukpack-bmt-language-go-report`, DeukPack `PROJECT_RULE.md`, `BMT_PROTOCOL_MATRIX.md`, `DEUKPACK_TEST_MATRIX.md`

## 실행 항목
1. [x] JavaScript/TypeScript tooling/codegen maturity 항목 분리
   - `support_level`은 generated path를 유지하며 비교 도입 가능한지로 기록
   - `implementation_state`는 codegen/runtime 구현 상태와 독립적으로 기록
   - runner 또는 generated-code matrix 근거가 없으면 `미검증`으로 분류
   - 완료 기준: tooling 성숙도, codegen 구현 상태, 테스트 근거를 각각 독립 필드로 유지
2. [x] schema compatibility 항목 분리
   - backward/forward compatibility 항목을 독립 feature로 유지
   - schema evolution 지원성, 실제 구현 상태, 테스트 통과 여부를 분리
   - compatibility 회귀 근거가 없으면 `대기`로 분류
   - 완료 기준: compatibility 구현 여부와 검증 통과 여부를 같은 셀에서 병합하지 않음
3. [x] verification metadata 필드 정렬
   - JavaScript/TypeScript 근거를 `evidence`로 분리
   - `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`를 필수 확인 포인트로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
   - 완료 기준: verification metadata가 비어 있으면 `implemented`나 `passing`으로 승격 금지
4. [x] 완료 기준 고정
   - JavaScript/TypeScript 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 검증
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md .deuk-agent/docs/plans/138-deukpack-bmt-language-javascript-joy-nucb-plan.md`

## 실행 결과
- JavaScript/TypeScript `tooling/codegen maturity`는 generated path 유지 가능성, codegen/runtime 구현 상태, runner 근거를 분리해 기록하도록 고정했다.
- `schema compatibility`는 schema evolution 지원성, 실제 구현 상태, backward/forward 검증 근거를 병합하지 않는 독립 항목으로 유지했다.
- verification metadata는 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`를 필수 확인 포인트로 고정했다.
- 현재 DeukPack BMT Matrix의 TypeScript/JavaScript 주요 프로토콜은 구현 및 pass count 근거가 있으나, 산출물 재생성이나 공식 baseline 승격 없이 해석 기준만 문서화했다.
- 실제 원천 데이터나 테스트 러너 위치가 확인되지 않은 항목은 `미검증` 또는 `대기`로 분류한다.

## 완료 기준
- JavaScript/TypeScript 보강 대상이 `tooling/codegen maturity`, `schema compatibility`, `verification metadata`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨
