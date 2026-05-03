---
id: 139-deukpack-bmt-language-java-joy-nucb
title: deukpack-bmt-language-java
phase: 4
status: closed
docsLanguage: ko
parentTicket: 135-deukpack-bmt-missing-tests-joy-nucb
summary: "DeukPack BMT 누락 복구: Java 언어 단위 테스트 보강"
createdAt: 2026-05-01 06:13:21
priority: high
tags:
  - deukpack
  - bmt
  - java
  - test-coverage
---


# deukpack-bmt-language-java

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.
연결 티켓: .deuk-agent/tickets/sub/135-deukpack-bmt-missing-tests-joy-nucb.md

## Scope & Constraints
- **Target:** Java BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- **Context Files:** `.deuk-agent/tickets/sub/142-deukpack-135-joy-nucb.md`, `.deuk-agent/docs/plans/142-deukpack-135-joy-nucb-plan.md`, `.deuk-agent/docs/plans/133-dekpack-bmt-matrix-joy-nucb-plan.md`, `.deuk-agent/docs/walkthroughs/133-dekpack-bmt-matrix-joy-nucb-report.md`
- **Design Rationale:** Java 항목의 schema evolution, compatibility, tooling evidence 누락이 지원성 표시 뒤에 숨지 않도록 지원성/구현성/검증성을 분리한다.
- **Constraints:** 코드 생성기, Java 구현체, 생성된 benchmark/report 산출물은 본 티켓 Phase 1에서 수정하지 않는다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `.deuk-agent/tickets/sub/`, `.deuk-agent/docs/plans/`, `.deuk-agent/docs/walkthroughs/`
- Forbidden modules: `scripts/`, `templates/`, `bin/`, `benchmarks/reports/`, `dist/`, `gen/`
- Rule citation: `PROJECT_RULE.md`의 `DC-CODEGEN`, AGENTS의 G7/G8 생성물·baseline 가드

### [CONTRACT]
- Input: 142 총괄 큐의 Java 우선 처리 항목과 133 BMT 설계 문서의 상태 분리 규칙
- Output: Java BMT 누락 테스트 보강 계획과 실행 전 완료 기준
- Side effects: 다음 Phase 2에서 Java 원천 데이터/테스트 근거 위치를 확인할 때 사용할 분류 기준 제공

### [PATCH PLAN]
- Java Schema evolution 항목을 지원성/구현성/검증성으로 분리
- Java Backward/Forward compatibility 항목을 독립 검증 항목으로 유지
- IDL lint, codegen, plugin 관련 evidence 필드를 완료 기준으로 고정

## Tasks
- [x] Java Schema evolution 항목 분리
- [x] Java Backward/Forward compatibility 항목 분리
- [x] Java tooling evidence 필드 정렬
- [x] 완료 기준 고정

## Java BMT Execution Criteria

### Schema evolution
- `support_level`: Java DSL/IDL 레이어가 schema evolution 개념을 어느 수준까지 지원하는지 기록한다.
- `implementation_state`: optional field 추가, 필드 rename, 타입 변경, default value 처리 등 실제 구현 가능한 변경 유형을 별도 기록한다.
- `evidence`: schema evolution 회귀 테스트, fixture, 또는 명시적 미지원 근거가 없으면 성공 상태로 승격하지 않는다.
- Completion rule: 지원 가능성과 구현 완료 여부를 같은 값으로 병합하지 않는다.

### Backward compatibility
- `support_level`: 이전 schema로 생성된 payload/fixture를 새 Java binding에서 읽는 시나리오를 대상으로 한다.
- `implementation_state`: 호환 reader, fallback/default 처리, unknown field 처리 중 실제 구현된 범위를 기록한다.
- `evidence`: backward fixture 테스트 또는 동일 목적의 자동화 테스트 ID를 요구한다.
- Completion rule: 테스트 근거가 없으면 `pending_evidence`로 유지한다.

### Forward compatibility
- `support_level`: 새 schema로 생성된 payload/fixture를 이전 Java binding 또는 제한된 reader가 처리하는 시나리오를 대상으로 한다.
- `implementation_state`: unknown field 보존/무시, version gate, graceful degradation 처리 중 실제 구현된 범위를 기록한다.
- `evidence`: forward fixture 테스트 또는 호환성 실패를 명시하는 문서화된 근거를 요구한다.
- Completion rule: backward 결과를 forward 결과로 재사용하지 않는다.

### Tooling evidence
- Required evidence fields: `test_id`, `last_verified`, `pass_rate`, `source_path`.
- IDL lint: Java 대상 IDL validation 또는 schema lint 결과를 연결한다.
- Codegen: Java codegen smoke/unit test 또는 생성 실패 근거를 연결한다.
- Plugin: Java plugin packaging/loader/registration 근거를 연결한다.
- Completion rule: evidence 필드가 비어 있으면 `implemented`나 `passing`으로 표시하지 않는다.

## Done When
- Java 보강 대상이 `Schema evolution`, `Backward/Forward compatibility`, `tooling evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/139-deukpack-bmt-language-java-joy-nucb-report.md)
