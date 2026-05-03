---
summary: "DeukPack BMT 이슈의 연속 대응 계획(환경 구성 및 third-party proof 보강)"
status: draft
priority: high
createdAt: "2026-05-02 02:44:08"
tags:
  - deukpack
  - bmt
  - issue-continuation
  - phase1
---

# DeukPack BMT 이슈 연속 대응

## Ticket Contract Pointer
- 티켓 168은 `deukpack-bmt-issue-continuation--joy-nucb`의 범위를 관리하고, 본 계획문은 원인 분석·의사결정·실행 설계를 관리한다.
- 실행은 `project=DeukPack` 쪽 BMT 증거 수집/검증 파이프라인에 한정한다.

## Problem Analysis
- 현재 canonical report 기준 판단은 `green`이 아니며, 실패 사유는 사실상 두 가지다.
  - C++ preflight 10건: `cmake: not found`로 `verify_failed`.
  - Java preflight 10건: `mvn ENOENT`로 `unavailable`.
- 유사 competitor(예: MessagePack) 행은 `plain-object` 및 `dependencyProof` 미기재로 인해 `Third-party Truth Gate`에서 신뢰성이 낮다고 판단됨.
- 기존 155/156 티켓은 게이트 강화 자체는 완료했으므로, 남은 과제는 **실제 환경 구성 + 실제 dependency/schema 증거 보강**이다.

## Source Observations
- `.deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md`에서 최종 판단을 `failed`로 고정하고 실패 사유를 명시하고 있음.
- `155-deukpack-bmt-validation-truth-ga-joy-nucb.md` 보고서에서 후속 작업으로 `C++/Java 환경 구성` 및 `third-party 실제 증명 추가`를 제시함.
- `Third-party` 증거는 현재 `schemaProof.kind: plain-object`와 `dependency proof 없음` 케이스가 다수 관찰됨.

## Cause Hypotheses
- H1: 벤치마크 실행 환경이 C++/Java 도구 체인을 갖추지 못해 preflight proof가 생성되지 않았고, 그 상태가 과거엔 그레이닝 오해로 이어질 수 있었다.
- H2: competitor 비교 데이터가 실제 의존성/스키마 호환 증거 없이 최소 필드로 채워져 있어, 강화된 truth gate에서 신뢰성 검증을 통과하지 못함.
- H3: BMT 실패 원인 해결은 코드 변경보다 실행 환경 정비 및 증거 채택 작업이 병행되어야 한다.

## Decision Rationale
- 게이트 규칙은 완화하지 않는다. 오히려 현재 strict 하게 유지해 실제 실패를 드러내는 상태를 보존한다.
- 1순위로 BMT 증거의 진위를 확보한다: 환경 의존성 preflight와 third-party proof를 실제 증거 기반으로 보강한다.
- 2순위로 문서/자동화에서 실행 조건을 명확히 해 동일 실수를 재발하지 않게 한다.
- 3순위로 재실행한 결과만을 기준으로 상태를 갱신한다.

## Execution Strategy
1. DeukPack 쪽 preflight 환경 가이드와 실제 실행 조건을 문서/스크립트로 정리한다.
2. C++/Java 의존성이 확보된 환경에서 BMT를 재실행한다.
3. MessagePack 등 유사 comparator 행의 `third-party` 메타데이터(`schemaProof`, `dependencyProof`) 채우기를 점검하고, 필요 시 스크립트 보강으로 자동화한다.
4. 결과 리포트를 최신 상태로 반영하고, `deukpack-bmt-current-report.md` 업데이트 기준을 맞춘다.

## Verification Design
- 재실행 기준: 기존 BMT 실행 커맨드로 preflight 검증 상태(`verify_failed`, `unavailable`) 감소를 확인한다.
- 증명 기준: 강화된 truth gate에서 `third-party` plain-object/의존성 미기재 경고가 제거되는지 확인한다.
- 최종 판단 기준: 갱신된 `deukpack-bmt-current-report.md`의 결론 섹션에서 상태가 `green` 혹은 조건부 판정으로 전환되는지 검토한다.
- 잔여 위험: CI/로컬 환경 제약으로 재실행 비용이 높고, 라이선스/의존성 설치 정책이 필요한 범위로 제한될 수 있다.

## Execution Result
- `node --check scripts/bmt/orchestrator.js` 통과.
- `node --check scripts/bmt/matrix-validator.js` 통과.
- `node scripts/bmt/orchestrator.js`는 의도대로 실패했다. 실패 상태는 C# generated roundtrip 22건, cross-language transfer `blocked` 1008건, legacy compatibility `blocked` 128건으로 구체화되었다.
- `third-party truth gate`는 현재 산출물 기준 direct 12 / similar 12로 통과했다.
