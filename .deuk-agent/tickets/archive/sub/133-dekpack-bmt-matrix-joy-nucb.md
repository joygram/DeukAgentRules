---
id: 133-dekpack-bmt-matrix-joy-nucb
title: DEKPACK-BMT-MATRIX
phase: 4
status: closed
docsLanguage: ko
summary: BMT Master/Protocol/Test 문서 역할 분리 및 raw 성능표 정리
priority: high
tags: deukpack, bmt, matrix, compatibility
createdAt: 2026-05-01 05:04:09
planLink: .deuk-agent/docs/plans/133-deukpack-bmt-matrix-joy-nucb-plan.md
---


# DEKPACK-BMT-MATRIX

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `.deuk-agent/docs/plans/`, `.deuk-agent/docs/` 내 BMT 매트릭스 설계/정책 문서, `benchmarks/reports/BMT_MASTER_REPORT.md`, `benchmarks/reports/BMT_PROTOCOL_MATRIX.md`, `benchmarks/reports/DEUKPACK_TEST_MATRIX.md`, 필요 시 관련 규칙 문서
- **Context Files:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, `.deuk-agent/docs/plans/133-dekpack-bmt-matrix-joy-nucb-plan.md`
- **Design Rationale:** 현재 DeukPack BMT 리포트는 지원성, 구현성, 검증을 분리하지 못하고 Master에 raw 성능표가 남아 문서 역할이 혼재됨
- **Constraints:** 공식 baseline/경쟁 비교 카탈로그 확장은 G8 승인 없이 확정하지 않음, 생성 산출물 직접 수정 대신 원본 설계/정책 문서 우선, Phase 2 범위는 문서화 및 설계 확정 중심으로 제한

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `.deuk-agent/docs/plans/`, `.deuk-agent/docs/`, `.deuk-agent/tickets/sub/133-dekpack-bmt-matrix-joy-nucb.md`, `benchmarks/reports/BMT_MASTER_REPORT.md`, `benchmarks/reports/BMT_PROTOCOL_MATRIX.md`, `benchmarks/reports/DEUKPACK_TEST_MATRIX.md`
- Forbidden modules: `bin/deuk-agent-rule.js`, OSS 배포 산출물, 생성 결과물, 미승인 공식 경쟁사/프로토콜 카탈로그
- Rule citation: `PROJECT_RULE.md`의 `DC-CODEGEN`, `DC-OSS`, `core-rules/AGENTS.md`의 G6/G8/TDW 게이트

### [CONTRACT]
- Input: 사용자 요구사항(DeukPack BMT 리포트 매트릭스 문서 역할 정합), 기존 계획 문서, 규칙 문서
- Output: Master/Protocol/Test 3문서 역할 분리 실행 산출물, 검증 규칙, 티켓/계획 문서 정합화
- Side effects: Master는 결론형으로 고정되고, 근거는 Protocol Matrix, 검증은 Test Matrix로 고정됨

### [PATCH PLAN]
- 범위 확장 반영한 APC를 현재 계획 기준으로 보강한다
- Master의 raw 성능표를 제거하고 결론/참조 중심 구조로 개편한다
- Protocol/Test 매트릭스를 근거·검증 표로 고정하고 링크 의존성을 정리한다
- 완료 시 티켓 상태와 체크리스트를 반영해 후속 구현 티켓이 바로 착수 가능하게 한다

## Tasks
- [x] APC와 계획 문서를 실행 가능한 수준으로 정합화
- [x] BMT 매트릭스용 데이터 스키마 및 상태 체계 정의
- [x] 표 배치/렌더/검증 규칙 문서화
- [x] 후속 구현 티켓에서 사용할 변경 기준 정리
- [x] Master/Protocol/Test 문서 역할 강제 분리(결론-근거-검증) 문서 계획 정리
- [x] BMT_MASTER_REPORT.md에서 .NET 포함 raw 벤치 수치 및 중복 근거표 제거
- [x] Protocol Matrix / Test Matrix를 근거·검증 기준 문서로 참조고정

## Done When
> 계획 문서와 티켓의 APC가 일치하고, 지원성/구현성/검증성 분리 기준 및 샘플 표, 검증 규칙, 후속 구현 기준이 모두 문서화되면 완료.

## Execute Notes (Current Session)
- `DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md` 위치의 문서가 실제 중복 raw를 포함한 주 원본이므로 티켓 대상에 포함.
- 완료: Master Report에 역할 경계를 명시하고, 성능/수집 근거는 `BMT_PROTOCOL_MATRIX.md`, 구현/검증 상태는 `DEUKPACK_TEST_MATRIX.md` 기준으로 참조 고정.
- 관찰: 현재 Master Report에는 .NET 상세 raw table, Python raw appendix, 프로토콜별 전수 matrix row가 직접 포함되어 있지 않으며 결론/참조 중심 구조로 정리됨.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/133-dekpack-bmt-matrix-joy-nucb-report.md)
