---
summary: DeukPack BMT Python 언어 항목의 Compression/transport, backward compatibility, pass-rate evidence 누락을 보강하기 위한 실행 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - python
  - test-coverage
---

# Plan: DeukPack BMT Python 누락 테스트 보강

## 목표
- Python 항목의 `Compression/transport`, `backward compatibility`, `pass-rate evidence` 누락을 분리해 추적한다.
- Pure Python과 Python Rust backend의 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 Python 하위 티켓에 적용한다.

## 범위
- 대상: Python BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Python 코드 생성기 구현 변경, Pure Python fallback 제거, Python Rust backend 암묵 활성화, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-report`, `138-deukpack-bmt-language-javascript-report`, DeukPack `PROJECT_RULE.md`, `BMT_PROTOCOL_MATRIX.md`, `DEUKPACK_TEST_MATRIX.md`

## 실행 항목
1. [x] Python Compression/transport 항목 분리
   - `support_level`은 Pure Python과 Python Rust backend별로 기록
   - `implementation_state`는 compression/transport 구현 상태와 독립적으로 기록
   - runner 또는 transport 근거가 없으면 `미검증`으로 분류
   - 완료 기준: transport 지원 가능성, 구현 상태, 테스트 근거를 각각 독립 필드로 유지
2. [x] backward compatibility 항목 분리
   - backward compatibility 항목을 독립 feature로 유지
   - schema/codec 호환 지원성, 실제 구현 상태, 테스트 통과 여부를 분리
   - compatibility 회귀 근거가 없으면 `대기`로 분류
   - 완료 기준: compatibility 구현 여부와 검증 통과 여부를 같은 셀에서 병합하지 않음
3. [x] pass-rate evidence 필드 정렬
   - Python 근거를 `evidence`로 분리
   - `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `backend`를 필수 확인 포인트로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
   - 완료 기준: pass-rate evidence가 비어 있거나 0이면 `passing`으로 승격 금지
4. [x] 완료 기준 고정
   - Python 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 검증
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md .deuk-agent/docs/plans/137-deukpack-bmt-language-python-joy-nucb-plan.md`

## 실행 결과
- Python `Compression/transport`는 Pure Python과 Python Rust backend별로 지원성, 구현 상태, 검증 근거를 분리하도록 고정했다.
- `backward compatibility`는 schema/codec 호환 지원성, 실제 구현 상태, 회귀 테스트 통과 여부를 병합하지 않는 독립 항목으로 유지했다.
- pass-rate evidence는 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `backend`를 필수 확인 포인트로 고정했다.
- 현재 DeukPack BMT Matrix에서 Python 프로토콜 표는 Pure Python 주요 프로토콜을 `implemented`로 표시하지만, Test Matrix의 Python Pure pass count는 0이므로 성공/passing으로 승격하지 않는다.
- Python Rust backend는 주요 프로토콜이 `missing` 또는 not collected 상태이므로 Pure Python fallback과 독립적으로 `미검증` 또는 `대기`로 분류한다.

## 완료 기준
- Python 보강 대상이 `Compression/transport`, `backward compatibility`, `pass-rate evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨
