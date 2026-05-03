---
id: 131-legacy-rag-compat-vision-joy-nucb
title: legacy-rag-compat-vision
phase: 4
status: closed
docsLanguage: ko
summary: "래거시 티켓/RAG 정합성 개선: 토큰비용 감소·생산 품질 상향을 위한 후보 수집/정규화/평가 파이프라인 수립"
priority: high
tags: legacy-rag, plan-gate
createdAt: 2026-05-01 04:18:01
planLink: .deuk-agent/docs/plans/131-legacy-rag-compat-vision-joy-nucb-plan.md
---


# legacy-rag-compat-vision

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `DeukAgentRules/scripts`, `.deuk-agent` 규칙/티켓 파이프라인
- **Context Files:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, `docs/rule-optimization-guide.md`, `.deuk-agent/tickets/`, `.deuk-agent/docs/plans/`
- **Design Rationale:** 레거시 티켓 정합성 문제로 검색 정확도 및 생산 반복성이 떨어져 RAG 품질과 비용이 불안정함
- **Constraints:** 기존 규칙 계보(`core`/`project`/`templates`)와 TDW 게이트를 우회하지 않음

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/`, `.deuk-agent/docs/`, `templates/`, `core-rules/AGENTS.md` (업데이트 시 버전 호환 검토)
- Forbidden modules: `.deuk-agent-ticket/`, OSS 동기화 산출물, 기존 아카이브 티켓 파일(사전 승인 없는 직접 변경 금지)
- Rule citation: `PROJECT_RULE.md`(DC-LEGACY, DC-OSS), `core-rules/AGENTS.md` TDW/게이트 규칙

### [CONTRACT]
- Input: 레거시 티켓/문서 덤프, 현재 MCP/RAG 사용 현황, 기존 아카이브 정합성
- Output: `candidate`→`approved` 정규화 파이프라인, 토큰/품질 A/B 평가 프레임, 실행 지표 대시보드 결과
- Side effects: 기존 검색결과 순위 재정렬, 비승인 후보의 반영 차단, 대시보드 산출 항목 추가

### [PATCH PLAN]
- `scripts/cli-ticket-parser` 및 정규화 유틸 정비
- RAG 인덱싱 전 후보 정규화 계층 추가
- A/B 평가 수집기 및 리포트 산출기 구현
- 테스트/검증 지표 자동화 및 문서화

## Tasks
- [x] 레거시 티켓 정규화 스키마 및 상태 머신 설계
- [ ] candidate/approved 전환 규칙 구현
- [ ] RAG 검색 재랭크에 2티어 상태 반영
- [ ] 토큰·품질 A/B 측정 스크립트 + 대시보드 집계 구현
- [ ] 2주 파일럿 실행 및 개선안 반영

## Execution Notes

- Phase 2에서는 공식 인덱스/대시보드/코드 구현 대신 `candidate` 스키마와 상태 머신 문서를 먼저 작성했다.
- 산출물: `.deuk-agent/docs/plans/131-legacy-rag-candidate-schema.md`
- 나머지 구현은 G6/G8 경계가 있어 후속 티켓으로 분리한다.
- 보고서: `.deuk-agent/docs/walkthroughs/131-legacy-rag-compat-vision-joy-nucb-report.md`

## Done When
> 정규화 후보 수집 정확도, A/B 비용/품질 지표 기준치 달성(예: 토큰 12%↓, 재작업률 8%↓), Phase 2 테스트 통과, planLink와 ticket 연계 완료 후 실행/보관.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/131-legacy-rag-compat-vision-joy-nucb-report.md)
