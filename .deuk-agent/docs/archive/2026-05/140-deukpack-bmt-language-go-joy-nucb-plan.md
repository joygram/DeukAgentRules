---
summary: DeukPack BMT Go 언어 항목의 Streaming, Error model, compatibility evidence 누락을 보강하기 위한 실행 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - go
  - test-coverage
---

# Plan: DeukPack BMT Go 누락 테스트 보강

## 목표
- Go 항목의 `Streaming`, `Error model`, `compatibility evidence` 누락을 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 Go 하위 티켓에 적용한다.

## 범위
- 대상: Go BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Go 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-report`, `133-dekpack-bmt-matrix-plan`, `133-dekpack-bmt-matrix-report`

## 실행 항목
1. [x] Go Streaming 항목 분리
   - `support_level`은 기능 지원 가능성으로 기록
   - `implementation_state`는 실제 구현/부분구현/누락 상태로 기록
   - streaming 테스트 근거가 없으면 `미검증`으로 분류
   - 완료 기준: streaming 지원 가능성, 구현 상태, 테스트 근거를 각각 독립 필드로 유지
2. [x] Go Error model 항목 분리
   - 오류 모델 일관성 항목을 독립 feature로 유지
   - 구현 상태와 테스트 통과 여부를 분리
   - 회귀 테스트 근거가 없으면 `대기`로 분류
   - 완료 기준: 오류 모델 구현 여부와 검증 통과 여부를 같은 셀에서 병합하지 않음
3. [x] Go compatibility evidence 필드 정렬
   - backward/forward compatibility 근거를 `evidence`로 분리
   - `test_id`, `last_verified`, `pass_rate`, `source_path`를 필수 확인 포인트로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
   - 완료 기준: compatibility evidence가 비어 있으면 `implemented`나 `passing`으로 승격 금지
4. [x] 완료 기준 고정
   - Go 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 실행 결과
- Go `Streaming`은 독립 보강 항목으로 고정했다.
- Go `Error model`은 독립 feature로 유지하고, 구현 상태와 테스트 근거를 분리하도록 정의했다.
- compatibility evidence는 backward/forward 근거를 분리하고 `test_id`, `last_verified`, `pass_rate`, `source_path`를 필수 확인 포인트로 고정했다.
- 실제 원천 데이터나 테스트 러너 위치가 확인되기 전까지 근거 없는 항목은 `미검증` 또는 `대기`로 분류한다.

## 완료 기준
- Go 보강 대상이 `Streaming`, `Error model`, `compatibility evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨
