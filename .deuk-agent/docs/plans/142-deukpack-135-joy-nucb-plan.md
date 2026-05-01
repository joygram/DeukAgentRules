---
summary: DeukPack 135 누락 테스트 보강 본 작업의 대상 모듈과 보강 항목을 확정하고, 언어별 하위 티켓으로 분기할 실행 계획 수립
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - test-coverage
  - ticket-135
---

# Plan: DeukPack 135 누락 테스트 보강 본 작업

## 목표
- `DeukPack 135`의 누락 테스트 보강 과제를 실행 가능한 단위로 분해
- 기존 하위 언어 티켓(141~140 계열)이 커버하지 못하는 공통 결손(문서 기준/리포트 기준) 항목을 선별
- 각 하위 티켓의 적용 대상과 완료 기준을 명문화해 실행 단계에서 충돌 없이 진행

## 범위
- 대상 모듈: `.deuk-agent/docs/` 하위 문서/리포트/트래킹(테스트 소스가 아닌 실행 계획/트리거 아티팩트)
- 대상 모듈이 아님: 실제 코드 생성기(`scripts/`), CLI 바이너리 구현, 배포 산출물 재생성(사용자 승인 없는 재생성 금지)
- 참고 소스: `135-deukpack-bmt-missing-tests-joy-nucb` 상위 티켓, `141~140` 언어 하위 티켓, 관련 Walkthrough/Plan 문서

## 실행 항목
1. [x] 상위/하위 티켓 정렬
   - `.deuk-agent/tickets/sub/135-deukpack-bmt-missing-tests-joy-nucb.md`를 루트로 지정하고, 141~140의 언어 하위 티켓 상태를 확인
   - 본 142 티켓을 언어별 실무 보강의 총괄 진행표로 등록
2. [x] 공통 결손 항목 추출
   - `.deuk-agent/docs/walkthroughs/133-dekpack-bmt-matrix-joy-nucb-report.md`
   - `.deuk-agent/docs/plans/133-dekpack-bmt-matrix-joy-nucb-plan.md`
   - `.deuk-agent/docs/plans/134-deukpack-bmt-master-meaning-repa-joy-nucb-plan.md`
   에서 `테스트 누락`으로 표현된 항목과 실제 실행 문서에서 미반영된 항목 매칭
3. [x] 누락 보강 대상 정합성 규칙 정의
   - “보고서/프로토콜/테스트 매트릭스” 역할 분리 규칙을 기준으로 누락 상태를 분류
   - 분류 결과를 `실행 대상`, `대기`, `범위외` 3분류로 구분
4. [x] 하위 티켓 보강 계획 생성
   - 언어별 티켓(141~140)에서 누락된 항목을 선별해 각 티켓별 `Tasks`를 한 번에 1개 이상의 실제 변경 항목으로 정의
   - 누락이 문서 조정형인지 테스트 항목 확장형인지 유형별로 기록
5. [x] 종료 기준 정리
   - 142 티켓에서 각 하위 티켓 진행 상태를 실시간 반영 가능한 체크리스트로 전환
   - 다음 실행 티켓으로 넘어갈 때 적용 범위가 모호하지 않도록 `Target`과 `Out-of-scope`를 고정

## 실행 기준
- 공통 결손: `support_level`, `implementation_state`, `evidence.test_id`, `evidence.last_verified`, `evidence.pass_rate`가 같은 항목 단위에서 분리되어야 한다.
- 실행 대상: 언어별 구현 완성도 표와 테스트 신뢰도 표에 들어갈 수 있는 항목.
- 대기: 실제 BMT 원천 데이터나 테스트 러너 위치가 아직 확인되지 않은 항목.
- 범위외: 공식 경쟁군/baseline 승격, 생성 산출물 재생성, CLI/코드 생성기 구조 변경.

## 하위 티켓 실행 순서

| 순서 | 티켓 | 언어 | 우선 처리 항목 | 상태 |
|---|---|---|---|---|
| 1 | `141-deukpack-bmt-language-rust-joy-nucb` | Rust | Streaming, Error model, evidence 필드 정렬 | completed |
| 2 | `139-deukpack-bmt-language-java-joy-nucb` | Java | Schema evolution, Backward/Forward compatibility, tooling evidence | completed |
| 3 | `140-deukpack-bmt-language-go-joy-nucb` | Go | Streaming, Error model, compatibility evidence | ready |
| 4 | `138-deukpack-bmt-language-javascript-joy-nucb` | JavaScript/TypeScript | Tooling/codegen maturity, schema compatibility, verification metadata | ready |
| 5 | `137-deukpack-bmt-language-python-joy-nucb` | Python | Compression/transport, backward compatibility, pass-rate evidence | ready |
| 6 | `136-deukpack-bmt-language-korean-joy-nucb` | Kotlin | Compression 회귀 불일치, streaming 검증 누락, evidence 보강 | ready |

## 하위 티켓 공통 작업 템플릿
- `Target`은 해당 언어의 BMT 문서/테스트 근거 레이어로 제한한다.
- `Tasks`는 최소 3개로 고정한다: 상태 분리, evidence 보강, 완료 기준 문서화.
- `Done When`은 지원성/구현성/검증성이 한 셀에서 섞이지 않는 상태로 정의한다.

## 완료 기준
- 본 티켓 계획이 실행 가능하고 비공란인 항목으로 정리되어 있음
- 누락 테스트 보강 본문이 상위 티켓-하위 티켓 구조에서 중복 또는 누락 없이 정렬됨
- 다음 실행 단계에서 수정 범위가 언어별 티켓 또는 문서 역할 분리 규칙으로 명확히 전달됨

## 총괄 정리 결과
- BMT matrix 역할 분리 티켓 `133-dekpack-bmt-matrix-joy-nucb`는 완료 및 archive 처리됨.
- Rust 하위 티켓 `141-deukpack-bmt-language-rust-joy-nucb`는 완료 및 archive 처리됨.
- Java 하위 티켓 `139-deukpack-bmt-language-java-joy-nucb`는 완료 및 archive 처리됨.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`로 고정한다.
- MCP transport 복구 중에는 `set_workflow_context` 없이 CLI/로컬 티켓 기준으로만 정리한다.
