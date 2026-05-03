---
id: 131-legacy-rag-compat-vision-joy-nucb
title: legacy-rag-compat-vision
language: ko
createdAt: 2026-05-01 04:18:01
summary: 레거시 티켓/RAG 정합성 개선을 통한 토큰 비용 절감·생산 품질 향상
status: active
priority: high
tags: rag, legacy, quality-metrics
---


# Plan: 131-legacy-rag-compat-vision

## 1. 목적
- 목표: 기존 `legacy` 티켓 포맷과 비정형 지식을 **RAG 적합형 지식으로 정규화**해, AI 작업 시 `필수 규칙 적중률`과 `재실행 정확도`를 올리고 토큰 사용량을 낮춘다.
- 기준: Andrej/Karpathy 가이드(재사용 가능한 4원칙)는 `명확한 가정`, `최소 변경`, `목표 기반 검증`에 일치하므로 이를 DeukAgentRules의 TDW와 결합한다.
  - 핵심 문장: Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution.

## 2. 현재 격차 (Current gaps)
- 레거시 티켓이 규격 미준수 형태로 남아 있어 RAG에서 검색/필터/스코어링이 불안정함.
- `요청-해결-검증`의 인덱스 추적이 분리되어 있어 중복 정보가 생기고, 검색 시 오래된 규칙이 우선되는 구간이 존재함.
- 비교 가능한 정량 지표가 없어 개선이 체감되더라도 성능/품질 상승을 증빙하지 못함.

## 3. 제안 아키텍처: 2티어 처리 (Candidate / Canonical)
- **Tier-1 Candidate (RAG 입력층)**: 외부/레거시 문서에서 자동 추출한 정규화 후보만 수집.
- **Tier-2 Canonical (공식 승인층)**: AGENTS/PROJECT_RULE과 TDW의 gate 통과 항목만 공식 반영.
- 공식 승인 전까지는 코드 수정/배포에 반영하지 않음.

## 4. 정규화 파이프라인
1. Legacy 입력 수집기
   - 대상: `legacy ticket`, `TICKET_LIST`, 비표준 문서, 임시 노트.
2. 구조 정규화
   - 필드 강제: `id/phase/status/summary/planLink/priorities/tags/context`.
3. 의미 정제
 - 핵심 문제(증상·재현·원인·해결·검증) 섹션 추출.
 - 규칙 충돌 탐지: 중복/상충 항목 태깅.
4. 승인 큐
   - 사람 또는 정책 엔진이 `agent-ready`로 마킹.
5. 공식 반영
   - Canonical 탑재 후 RAG 인덱싱 수행.

## 5. 토큰 비용/생산 품질 비교 실험
- 실험군 비교:
  - A군: 현재 방식(비정규화 레거시 병행 검색)
  - B군: 정규화 2티어 처리 + RAG 재랭크 적용
- 각 작업당 측정치(필수):
  - `input_tokens`, `output_tokens`, `total_tokens` (가능 시 실제 사용량 로그 사용)
  - 작업 당 `반복 횟수`(재질문/수정 루프)
  - `핵심 의사결정 지연`(요청-완료시간)
  - `재작업률`(생성물 재작성/회귀 수정 비율)
  - `문맥 충족률`(요구사항 항목 대비 정답 포함율)
- 평가 방식:
  - 동일 80건 과거 작업셋을 A/B로 동일 모델, 동일 프롬프트 패턴에서 반복 실행.
  - 최소 2회 반복 평균/표준편차 산출.
  - 결과 저장: `.deuk-agent/knowledge/<ticket-id>-rag-eval.json`(스키마 고정).

## 6. 실행 항목
1. `legacy ticket` 정규화 스키마 초안 작성 및 파서 유효성 규칙 작성.
2. RAG 추출기(후보층)에서 정규화 포맷을 강제하는 변환기 추가.
3. Canonical 승인 게이트(phase/evidence/APC 확인) 통합.
4. A/B 비교 모듈과 결과 집계 스크립트 제작.
5. 2주 파일럿: 100개 레거시 항목 대상으로 1차 정규화 + 지표 수집 + 회고.

## 7. 위험/완화
- 위험: 정규화 오탐으로 유효 규칙 삭제.
- 완화: 승격 전 수동 리뷰 큐 적용 및 rollback 태그 적용.
- 위험: 측정 지표 수집이 과도하게 느려짐.
- 완화: 10개 메타 항목만 수집(우선 6개), 나머지는 차후 확장.

## 8. 승인 기준 (DoD)
- 정규화 스키마 기준을 통과한 후보는 자동으로 `candidate`/`approved` 상태 전이.
- A/B 분석에서 `total_tokens` 평균이 기준 대비 최소 12% 개선 또는 `재작업률` 최소 8% 개선이 확인되면 다음 단계로 승인.
- 실패한 항목은 `candidate`로 유지하고 자동 반영하지 않음.

## 9. 산출물
- `legacy-rag-candidate` 정규화 사양서
- `rag-ab-eval` 대시보드 지표 JSON/CSV
- `planLink` 기반 실행 체크리스트 및 문서 업데이트

## 10. Phase 2 결과

- [x] `legacy-rag-candidate` 정규화 사양서 초안 작성: `.deuk-agent/docs/plans/131-legacy-rag-candidate-schema.md`
- [ ] `rag-ab-eval` 대시보드 지표 JSON/CSV 구현은 후속 티켓으로 분리
- [ ] 공식 RAG 재랭크/인덱스 반영은 G8 승인 게이트 이후 후속 티켓으로 분리
