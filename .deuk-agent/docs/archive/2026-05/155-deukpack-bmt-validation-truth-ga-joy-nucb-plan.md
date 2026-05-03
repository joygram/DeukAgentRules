---
summary: "DeukPack BMT gate가 환경 미구성/가짜 third-party 근거를 통과시키지 못하도록 검증을 강화한다."
status: active
priority: high
tags:
  - plan
  - phase1
  - deukpack
  - bmt
  - validation
createdAt: "2026-05-01 15:02:38"
---

# BMT Truth Gate 보강 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
직전 BMT 실행은 validation gate 14/14 통과로 보고됐지만, 실제 내용은 거짓 양성이다.

`bmt-latest.json`에는 C++ external preflight 10건이 `cmake: not found`로 `verify_failed`, Java external preflight 10건이 `mvn ENOENT`로 `unavailable`이었다. 환경이 구성되지 않았는데도 gate가 통과한 것은 검증 게이트의 실패다.

또한 generated-code competitor row 중 similar competitor는 plain object를 MessagePack 등으로 인코딩하는 수준이며, third-party 설치/스키마 동등성 증명이 충분하지 않다. 이 상태를 “경쟁사 대비 근거”로 인정하면 BMT가 거짓말 대잔치가 된다.

## Source Observations
- `/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`는 `bmt.preflight.statuses`의 `verify_failed`/`unavailable`을 전역 실패 조건으로 보지 않는다.
- 같은 validator는 오래된 BenchmarkDotNet artifact를 읽어 C# 항목을 통과시킬 수 있다. 이 검증은 이번 BMT 실행의 fresh 환경 성공 여부와 분리돼 있다.
- `/home/joy/workspace/DeukPack/benchmarks/out/bmt-latest.json` 기준 preflight는 generated_roundtrip 30 passed, external_preflight 30 passed, 10 verify_failed, 10 unavailable이다.
- C++ 실패 원인은 `/bin/sh: 1: cmake: not found`다.
- Java unavailable 원인은 `spawnSync mvn ENOENT`다.
- competitor rows는 `schemaProof.kind: plain-object` 또는 native JSON 수준의 근거를 갖는다. similar competitor가 plain-object면 같은 IDL/schema 기반 경쟁 비교가 아니다.

## Cause Hypotheses
- validator의 REQUIRED_MATRIX가 오래된 개별 산출물 존재 여부 중심으로 구성되어, 이번 run의 preflight 진실성을 강제하지 못한다.
- generated runner의 competitor proof가 “패키지를 사용했다”와 “동등한 third-party schema/workload를 갖췄다”를 구분하지 않는다.
- external preflight는 smoke 수준인데, gate 이름은 hard validation이라 사용자가 실제 end-to-end 검증으로 오해하게 만든다.

## Decision Rationale
리포트 문구만 고치지 않는다. 문제는 gate가 실패해야 할 상황을 통과시키는 것이므로 `matrix-validator.js`를 수정한다.

첫 번째 새 check는 `bmt.preflight.statuses`의 `verify_failed`, `unavailable`, `missing evidenceKind`를 hard failure로 처리한다.

두 번째 새 check는 competitor evidence를 검사한다. direct/native JSON은 제한적으로 허용하지만, `comparisonClass: similar`인 competitor가 `schemaProof.kind: plain-object`이거나 dependency proof가 없으면 실패시킨다.

이렇게 하면 현재 BMT 결과는 의도적으로 실패해야 한다. 실패가 올바른 결과다.

## Execution Strategy
`scripts/bmt/matrix-validator.js`에 `preflight_truth_gate`와 `third_party_truth_gate` checks를 추가하고 REQUIRED_MATRIX 앞쪽에 배치한다.

`preflight_truth_gate`는 current run의 generated/external preflight 상태를 직접 읽는다.

`third_party_truth_gate`는 `matrixRows`의 competitor rows를 검사한다. similar competitor는 plain object 대체물과 설치 증명 부재를 허용하지 않는다.

## Verification Design
`node --check scripts/bmt/matrix-validator.js`로 문법을 확인한다.

`node scripts/bmt/matrix-validator.js --fix-suggestions`를 실행한다. 현재 환경에서는 실패해야 한다. 기대 실패 원인은 C++ `cmake` 누락, Java `mvn` 누락, similar competitor proof 부족이다.

DeukAgentRules ticket/plan/report는 `npx deuk-agent-rule lint:md`로 검증한다.

## Execution Result
`/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`에 두 개의 hard gate를 추가했다.

`Preflight Truth Gate`는 `bmt.preflight.statuses`를 직접 읽고, `evidenceKind` 누락, `verify_failed`, `unavailable`을 실패로 처리한다.

`Third-party Truth Gate`는 `matrixRows`의 competitor row를 검사한다. `comparisonClass: similar`인데 `dependencyProof.installed`가 없거나 `schemaProof.kind: plain-object`이면 third-party 비교 근거로 인정하지 않는다.

## Verification Result
`node --check scripts/bmt/matrix-validator.js`는 통과했다.

`node scripts/bmt/matrix-validator.js --fix-suggestions`는 의도대로 실패했다.

실패 요약은 다음과 같다.

- `Preflight Truth Gate`: 20 preflight rows failed or unavailable
- C++: `cmake: not found`
- Java: `mvn ENOENT`
- `Third-party Truth Gate`: 12 similar competitor rows lack real dependency/schema proof
- 대표 사례: TypeScript/JavaScript/Python `MessagePack` rows가 `schemaProof.kind: plain-object`이고 dependency proof가 없다.
