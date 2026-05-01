---
summary: DeukPack BMT Java 언어 항목의 Schema evolution, compatibility, tooling evidence 누락을 보강하기 위한 실행 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - java
  - test-coverage
---

# Plan: DeukPack BMT Java 누락 테스트 보강

## 목표
- Java 항목의 `Schema evolution`, `Backward compatibility`, `Forward compatibility`, `tooling evidence`를 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 Java 하위 티켓에 적용한다.

## 범위
- 대상: Java BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Java 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-joy-nucb`, `133-dekpack-bmt-matrix-joy-nucb-plan`, `133-dekpack-bmt-matrix-joy-nucb-report`

## 실행 항목
1. [x] Java Schema evolution 항목 분리
   - 스키마 변경 허용 범위는 `support_level`로 기록
   - 실제 호환 구현 상태는 `implementation_state`로 기록
   - 테스트 근거가 없으면 성공 상태로 승격하지 않음
   - 완료 기준: optional field, rename, type change, default value 처리 범위를 지원성/구현성/검증성으로 분리
2. [x] Java Backward/Forward compatibility 항목 분리
   - backward와 forward를 각각 독립 검증 항목으로 유지
   - compatibility 결과는 pass/fail이 아니라 근거 포함 상태로 분류
   - 회귀 테스트 근거가 없으면 `대기`로 분류
   - 완료 기준: backward fixture와 forward fixture를 서로 대체하지 않고 각각 독립 evidence를 요구
3. [x] Java tooling evidence 필드 정렬
   - IDL lint, codegen, plugin 성숙도 근거를 `evidence` 필드로 분리
   - `test_id`, `last_verified`, `pass_rate`를 필수 확인 포인트로 정의
   - 완료 기준: `test_id`, `last_verified`, `pass_rate`, `source_path`가 비어 있으면 성공 상태로 승격 금지
4. [x] 완료 기준 고정
   - Java 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## Phase 2 결과
- Java `Schema evolution`은 지원 가능성(`support_level`), 실제 구현 상태(`implementation_state`), 검증 근거(`evidence`)를 분리해 판단한다.
- `Backward compatibility`와 `Forward compatibility`는 독립 항목으로 유지하며, 한쪽 fixture나 테스트 결과를 다른 쪽의 근거로 재사용하지 않는다.
- Java tooling evidence는 IDL lint, codegen, plugin 근거를 한 셀에 합치지 않고 `test_id`, `last_verified`, `pass_rate`, `source_path`로 정렬한다.
- 검증 근거가 없는 항목은 `implemented`, `passing`, 성공 표시로 승격하지 않고 `pending_evidence`로 남긴다.

## 완료 기준
- Java 보강 대상이 `Schema evolution`, `Backward/Forward compatibility`, `tooling evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨
