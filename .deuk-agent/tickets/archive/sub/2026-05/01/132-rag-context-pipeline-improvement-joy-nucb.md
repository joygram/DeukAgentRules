---
id: 132-rag-context-pipeline-improvement-joy-nucb
title: rag-context-pipeline-improvement
phase: 4
status: closed
docsLanguage: ko
summary: context RAG+파이프라인 적합성 진단 및 통계·에이전트 루프 기반 개선 구조 설계
priority: high
tags: rag, pipeline, metrics, agent-loop
createdAt: 2026-05-01 04:20:11
---


# rag-context-pipeline-improvement

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `scripts/` + `.deuk-agent/` 파이프라인 전반(티켓/플랜/텔레메트리), `docs/` 가이드 보강
- **Context Files:** `AGENTS.md`, `PROJECT_RULE.md`, `docs/architecture.ko.md`, `docs/how-it-works.ko.md`, `docs/usage-guide.ko.md`, `scripts/cli-telemetry-commands.mjs`, `scripts/cli-ticket-migration.mjs`
- **Design Rationale:** 현재 RAG 파이프라인은 구조는 갖춰져 있으나, 목표 달성을 입증할 정량 피드백 루프가 부재해 개선 우선순위 판단이 어렵기 때문
- **Constraints:** 기존 TDW 게이트를 깨지 않음, CLI 아키텍처 상수/가드 준수(ARCH 테스트 DR-01~DR-06), 레거시 보존 규칙 준수

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `.deuk-agent/docs/`, `scripts/`
- Forbidden modules: `scripts/ArchitectureGuard.test.mjs`(비필수 변경 시), 외부 OSS sync 대상 경로, 레거시 `.deuk-agent-ticket/`
- Rule citation: `PROJECT_RULE.md`(DC-LEGACY/DC-OSS), `core-rules/AGENTS.md`(TDW, phase gate)

### [CONTRACT]
- Input: 기존 RAG/Ticket 운영 로그, legacy ticket 구조, 현재 수집/평가 방식
- Output: Candidate→Approved 게이트가 내재된 컨텍스트 RAG 개선 구조, 토큰·품질 지표 수집/대시보드 초안, 내부 에이전트 피드백 루프 제안
- Side effects: 승인되지 않은 후보 항목은 자동 반영되지 않으며, 지표 기반 임계치 정책이 도입됨

### [PATCH PLAN]
- 텔레메트리 스키마 보강 설계
- candidate 승인 상태 모델 정의(필드/승인 규칙)
- 지표 수집기(RAG 품질 + 반복 비용) 설계 및 표준 리포트
- 내부 에이전트 루프(검증·보정·재분류) 제안 템플릿 확장

## Tasks
- [x] 현재 파이프라인의 목표 부합성 진단 리포트 작성(문서화)
- [x] 후보 정규화 + 승인 상태 구조화 설계
- [x] RAG 품질 지표와 토큰/시간/재작업률 수집 규격 수립
- [x] 내부 에이전트 피드백 루프(비수정/제안/검증) 설계
- [ ] 4주 파일럿 계획 및 평가 임계치 적용
- [x] 완료 기준 점검 후 Phase 2 반영 대상 분해(다음 티켓으로 분리)

## Execution Notes

- Phase 2에서는 공식 RAG 인덱스/대시보드/서버 구현 대신 실행 가능한 측정 사양을 문서화했다.
- 산출물: `.deuk-agent/docs/plans/132-rag-metrics-agent-loop-spec.md`
- 4주 파일럿과 구현은 후속 티켓으로 분리한다.
- 보고서: `.deuk-agent/docs/walkthroughs/132-rag-context-pipeline-improvement-joy-nucb-report.md`

## Done When
> 1) `targeted` 후보 품질 지표가 측정 가능한 스키마로 정리되어 있음
> 2) 기존 목표와의 갭이 텍스트 + 수치로 매핑됨(토큰/시간/재작업률/합격률)
> 3) 실행 가능 계획(작업 항목, 우선순위, 임계치)이 다음 실행 티켓으로 분해되어 있음
> 4) `lint:md` 통과

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/132-rag-context-pipeline-improvement-joy-nucb-report.md)
