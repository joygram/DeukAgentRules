---
id: 136-deukpack-bmt-language-korean-joy-nucb
title: deukpack-bmt-language-korean
phase: 4
status: closed
docsLanguage: ko
parentTicket: 135-deukpack-bmt-missing-tests-joy-nucb
summary: "DeukPack BMT 누락 복구: Kotlin 언어 단위 테스트 보강"
createdAt: 2026-05-01 06:13:16
planLink: .deuk-agent/docs/plans/136-deukpack-bmt-language-korean-joy-nucb-plan.md
priority: high
tags:
  - deukpack
  - bmt
  - kotlin
  - test-coverage
---


# deukpack-bmt-language-korean

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.
연결 티켓: .deuk-agent/tickets/sub/135-deukpack-bmt-missing-tests-joy-nucb.md

## Scope & Constraints
- **Target:** `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`, `.deuk-agent/docs/plans/136-deukpack-bmt-language-korean-joy-nucb-plan.md`
- **Context Files:** `.deuk-agent/docs/walkthroughs/142-deukpack-135-joy-nucb-report.md`, `.deuk-agent/docs/walkthroughs/137-deukpack-bmt-language-python-joy-nucb-report.md`, `/home/joy/workspace/DeukPack/PROJECT_RULE.md`, `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_PROTOCOL_MATRIX.md`, `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`
- **Design Rationale:** Python 보강 기준이 완료되었으므로 남은 큐의 마지막 항목인 Kotlin BMT 근거 레이어에서 Compression 회귀 불일치, streaming 검증 누락, evidence 보강을 분리해 공식 Matrix에 없는 항목이 성공 상태로 승격되지 않도록 한다.
- **Constraints:** benchmark/report 산출물 재생성 금지, 공식 baseline/catalog 확장 금지, 생성 파일 직접 수정 금지, DeukPack 코드 생성기/런타임 구현 변경 금지

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: 본 티켓 파일, 연결 plan 파일, 필요 시 `.deuk-agent/docs/walkthroughs/136-deukpack-bmt-language-korean-joy-nucb-report.md`
- Forbidden modules: `/home/joy/workspace/DeukPack/dist/`, `/home/joy/workspace/DeukPack/dist-test/`, `/home/joy/workspace/DeukPack/benchmarks/reports/`, `/home/joy/workspace/DeukPack/benchmarks/templates/`, `/home/joy/workspace/DeukPack/benchmarks/history/`, DeukPack codegen/runtime source
- Rule citation: DeukAgentRules `core-rules/AGENTS.md` v17 G7/G8, DeukPack `PROJECT_RULE.md` DC-CODEGEN/DC-VERIFY-BMT/DC-TICKET-FIRST

### [CONTRACT]
- Input: 142 총괄 큐의 Kotlin 잔여 항목, 137 Python 완료 패턴, DeukPack BMT Matrix의 현재 언어/근거 상태
- Output: Kotlin BMT 보강 기준이 Compression regression, streaming verification, evidence metadata로 분리된 실행 가능 plan과 검증 기록
- Side effects: 티켓/plan 문서 갱신 및 markdown lint 결과 기록

### [PATCH PLAN]
- Kotlin BMT 근거에서 compression 회귀 상태, streaming 검증 상태, evidence metadata를 분리해 plan에 고정한다.
- 공식 Matrix에 Kotlin 섹션이나 원천 근거가 없으면 `미검증` 또는 `대기`로 분류하고 성공 상태로 승격하지 않는다.
- evidence 필수 확인 포인트를 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`로 정의한다.
- `lint:md`로 티켓과 plan frontmatter/본문 정합성을 검증한다.

## Tasks
- [x] Kotlin Compression 회귀 불일치 항목 분리
- [x] streaming 검증 누락 항목을 구현 상태와 테스트 근거로 분리
- [x] evidence metadata 필수 확인 포인트 고정
- [x] 티켓/plan markdown lint 통과

## Done When
> Kotlin BMT 보강 기준이 지원성/구현성/검증성 3층으로 분리되고, 공식 근거 없는 항목이 implemented/passing으로 승격되지 않으며, 티켓과 plan이 `lint:md`를 통과한다.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/136-deukpack-bmt-language-korean-joy-nucb-report.md)
