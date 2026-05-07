---
summary: ProjectPilot Refactor Contract Kit의 공용 의미, 공용 템플릿 구조, 소비 프로젝트 적용 기준.
status: draft
priority: P1
tags: [projectpilot, refactor-contract, skill, template]
---

# ProjectPilot

## Positioning

ProjectPilot은 프로젝트에 설치되는 refactor-contract skill이다.

역할은 기존 코드, 문서, 테스트, 티켓에서 구현 방식과 작업 흐름을 읽고,
그 프로젝트의 리팩터링 계약을 명시화한 뒤 이후 변경이 그 계약을 벗어나지
않도록 돕는 것이다.

ProjectPilot 공용 본체와 공용 템플릿의 소유권은 DeukAgentRules에 있다.
개별 프로젝트는 소비자이자 파일럿 검증 프로젝트일 수는 있지만 공용 본체의
소유자는 아니다.

## Functional Subtitle

ProjectPilot: Refactor Contract Kit

## Why This Exists

다음 조건이 겹치면 단순 수정의 누적이 오히려 비용을 키운다.

- 여러 언어가 같은 기능 계약을 공유한다.
- generated output과 source-of-truth가 다르다.
- runtime, factory, helper, codegen, report가 다른 표면을 가진다.
- fail-fast 대신 fallback, alias, no-op, silent stub가 남는다.
- 한 언어 수정이 전체 제품 정합성 수정처럼 오인된다.

ProjectPilot은 이런 작업을 "코드 수정"이 아니라 "계약 기반 리팩터링"으로 다룬다.

## Applicability

다음 작업은 ProjectPilot 절차를 먼저 통과해야 한다.

- 다언어 기능 추가 또는 변경
- protocol, serialization, transport, codec 작업
- generated/runtime 계약 조정
- cross-language parity 수정
- 반복되는 버그 군집 수습
- convention, naming, file layout, factory surface 통일
- release truth와 관련된 matrix/report/gate 수정

## Core Units

ProjectPilot 검토 단위는 아래 여섯 개다.

| Unit | Meaning |
| --- | --- |
| `feature` | 사용자 또는 시스템이 기대하는 단일 기능 |
| `contract` | 구현체가 공유해야 하는 공식 의미 |
| `surface` | language, runtime, generated API, factory, report 등 노출 면 |
| `owner` | 수정 권한이 있는 source-of-truth 위치 |
| `gate` | 구현 전후 통과해야 하는 검증 규칙 |
| `evidence` | 판정 근거가 되는 파일, 라인, 명령 |

## Non-Negotiable Rules

1. matrix 없이 리팩터링 계약 수정에 들어가지 않는다.
2. generated 산출물 증상만 보고 생성물을 직접 고치지 않는다.
3. fallback, alias, no-op, placeholder, silent stub는 계약상 허용인지 버그인지 먼저 분류한다.
4. 한 언어만 고친 뒤 전체 해결처럼 닫지 않는다.
5. verification 결과 없이 "구조가 맞다"고 주장하지 않는다.
6. unsupported-by-contract와 broken-entrypoint를 섞지 않는다.
7. 반복되는 실패군은 단발 버그가 아니라 계약 결함으로 본다.

## Required Artifacts

ProjectPilot 적용 작업은 아래 산출물을 남긴다.

| Artifact | Purpose |
| --- | --- |
| Implementation Matrix | 언어 x 기능 또는 surface x contract 실제 상태 분류 |
| Refactor Contract | 공식 API, entrypoint, result shape, unsupported rule |
| Flow Contract | 작업 흐름, 호출 흐름, 생성/검증 흐름의 기준 |
| Integration Contract | runtime, generated, report, test 사이 연계 기준 |
| Owner Map | generated/source/runtime/report의 수정 소유권 |
| Drift Checklist | 금지 우회와 허용 예외 목록 |
| Conformance Gate | 구현 전후 검증 명령과 통과 기준 |
| Remediation Plan | 후속 수정 티켓 분리 기준과 순서 |

## Standard Workflow

1. Local rule과 architecture 문서를 읽는다.
2. 변경하려는 기능의 refactor contract를 정의한다.
3. implementation matrix를 만든다.
4. drift를 분류한다.
5. owner map을 확정한다.
6. drift checklist를 채운다.
7. conformance gate를 티켓에 고정한다.
8. 그 다음에만 remediation ticket을 분리하고 수정한다.

## Drift Taxonomy

기본 분류는 아래를 사용한다.

| Code | Meaning | Action |
| --- | --- | --- |
| `C` | complete | 유지, 회귀만 감시 |
| `P` | partial | 기능 일부 구현. hardening 티켓 분리 |
| `S` | stub | 빈 구현, placeholder, no-op, fake success |
| `B` | broken-entrypoint | factory, helper, signature, wiring 불일치 |
| `U` | unsupported-by-contract | 버그가 아니라 공식 미지원 |
| `D` | documented exception | 공통 계약에서 벗어나지만 문서화된 예외 |

프로젝트별 세분화는 가능하지만 `B`와 `U`는 반드시 분리한다.

## Drift Policy

기본 금지 패턴은 아래와 같다.

- silent fallback
- ambiguous alias
- no-op skip/read/write
- `return 0`, empty object, empty string으로 오류 흉내내기
- generated file 직접 수정
- runtime 미구현을 report pass 또는 skip처럼 보이게 처리
- 한 언어에서만 helper 우회로 해결

허용 가능한 예외는 아래 조건을 모두 만족해야 한다.

- 문서화된 contract 예외다.
- 왜 예외인지 설명 가능하다.
- 대체 entrypoint와 unsupported error가 명시된다.
- matrix와 verification이 그 예외를 알고 있다.

## Remediation Ordering

후속 구현 순서는 기본적으로 아래를 따른다.

1. `broken-entrypoint`
2. `stub`
3. `partial`
4. `unsupported-by-contract`의 공식화
5. shared contract 정렬
6. generated/runtime/report gate 정렬

이 순서를 바꾸려면 티켓에 이유와 위험을 기록한다.

## Verification Model

검증은 최소 세 층으로 잡는다.

- 구조 검증: 문서, template, matrix, contract surface 일치 여부
- 소유권 검증: source-of-truth 수정 경로가 맞는지
- 기능 검증: 빌드, 테스트, BMT, compile gate, snapshot, roundtrip 중 필요한 최소 증거

가능한 한 가장 작은 증거를 남긴다.

## Shared Asset Layout

ProjectPilot 공용 자산은 아래 경로를 source of truth로 사용한다.

- `docs/PROJECT_PILOT.md`
- `templates/project-pilot/IMPLEMENTATION_MATRIX_TEMPLATE.md`
- `templates/project-pilot/REFACTOR_CONTRACT_TEMPLATE.md`
- `templates/project-pilot/FLOW_CONTRACT_TEMPLATE.md`
- `templates/project-pilot/INTEGRATION_CONTRACT_TEMPLATE.md`
- `templates/project-pilot/OWNER_MAP_TEMPLATE.md`
- `templates/project-pilot/DRIFT_CHECKLIST.md`
- `templates/project-pilot/CONFORMANCE_GATE_TEMPLATE.md`
- `templates/project-pilot/REMEDIATION_PLAN_TEMPLATE.md`

소비 프로젝트는 이 공용 자산을 기준으로 문서를 쓰고, 공용 템플릿 자체를
프로젝트별 로컬 복제본으로 장기 보관하지 않는다.

## Consumer Model

소비 프로젝트는 다음 원칙을 따른다.

- 공용 semantics는 DeukAgentRules 문서를 본다.
- 프로젝트 로컬에는 pilot evidence와 project-local reference만 둔다.
- shared template 수정은 DeukAgentRules에서만 한다.
- consumer workspace는 공용 자산의 소유자가 아니다.

## Expected Outcome

ProjectPilot이 작동하면 다음 변화가 생겨야 한다.

- "빨리 고친 것"보다 "다시 안 틀어지는 것"이 우선된다.
- 리팩터링은 언어 단독이 아니라 matrix 단위로 추적된다.
- 예외는 숨어 있지 않고 문서화된다.
- 수습 비용이 구현 비용보다 커지는 구조를 줄인다.
