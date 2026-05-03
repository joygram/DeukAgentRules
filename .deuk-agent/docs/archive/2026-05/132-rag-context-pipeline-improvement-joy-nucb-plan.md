---
id: 132-rag-context-pipeline-improvement-joy-nucb
title: rag-context-pipeline-improvement
language: ko
createdAt: 2026-05-01 04:20:11
summary: context RAG 및 파이프라인의 목표 부합성 평가와 통계-에이전트 기반 개선 루프 설계
status: active
priority: high
tags: rag, pipeline, telemetry, agent-loop
---


# Plan: 132-rag-context-pipeline-improvement

## 1. 현재 적합성 평가 (문답 요약)
- **적합한 점**
  - 목표 정합성: TDW + RAG + 아카이브 distillation 구조가 “누가, 왜, 어느 범위에서” 작업했는지 추적하는 기본 골격은 갖춤.
  - 규칙/플로우 정합성: `AGENTS.md`와 `PROJECT_RULE.md`가 허브-스포크 방식으로 분리돼 있고, 레거시 경로 정리/포인터 동기화가 명시됨.
- **갭**
  - RAG 입력 신호가 정량화되지 않음: 검색 결과 품질 변화가 실험 없이 “느낌”에 의존.
  - 파이프라인 성능 측정이 token/반복률/재작업률 중심으로 연결되지 않음.
  - 내부 LLM/에이전트를 구조적으로 “검증자·재정렬자”로 쓰는 고리(루프)가 약함.

## 2. 목표 대비 점검
- 현재 목표: 생산성, 품질, 비용을 동시에 개선.
- 현재 상태:
  - 프로세스는 있어도 지표가 약함(의사결정 불가).
  - 후보 지식(legacy/ticket/doc)은 수집되지만, **자동 반영 품질 판단 임계치**가 부재.
- 결론: **골격은 맞지만 “측정+피드백 루프”가 부족**해 목표 달성 미흡.

## 3. 제안 아키텍처 (전면 개선안)
1. **Ingestion Layer**
   - 입력: legacy ticket, plan, migration 산출물, mcp 검색 후보
   - 출력: 정규화 Candidate 객체(JSONL)
2. **Scoring Layer**
   - 점수 필드: 모듈 정합성, 목표 적합성, 충돌 위험도, 증거성(테스트/체크리스트 유무)
   - 상태: `candidate` → `review` → `approved` → `active-index`
3. **Execution Layer**
   - approved만 RAG 공식 인덱스에 반영(버전 태그 포함)
4. **Telemetry Layer**
   - 작업 단위별 토큰/실행시간/재질문 횟수/수정 이슈/성공율 로그 수집
5. **Agent Critic Layer (내부 LLM/에이전트)**
   - 주기적으로 ticket/run 로그를 해석해 규칙 누락, 목표 이탈, 위험 패턴을 탐지
   - 수정 지시를 plan 형식으로 재발행하거나 plan 개선 제안

## 4. 수집 지표 설계 (필수 10개)
- `input_tokens`, `output_tokens`, `total_tokens`
- `rag_hits_top1_hit`, `rag_hits_top3_hit`
- `context_retrieval_latency_ms`
- `goal_completion_time_sec`
- `loop_count`(요청 반복 횟수)
- `revision_count`(후속 수정 횟수)
- `first_pass_pass_rate`(초회 제출 성공률)
- `defect_reopen_count`(회귀/재오픈)
- `agent_override_count`(내부 에이전트 교정 횟수)
- `tdw_compliance_score`(ticket 단계 준수율)

## 5. 내부 LLM/에이전트 활용 구조
- **Critic 에이전트(비수정 모드)**: 실패/저성능 작업의 로그를 읽고 규칙 위반 패턴만 추출.
- **Curator 에이전트(제안 모드)**: 후보 텍스트를 재정렬하고 plan 링크/상태 태깅을 제안.
- **Validator 에이전트(회귀 모드)**: 제안 반영 후 소규모 셋(샘플 20개)에서 목표 충족 여부 테스트.
- 이 세 역할은 매일 `nxt` 배치로 순환.

## 6. 실행 항목
1. 텔레메트리 스키마 확장 (`telemetry.jsonl` + summary/abreport 산출 포맷)
2. `candidate`/`approved` 상태 스키마와 게이트(Phase0 evidence 연동) 추가
3. RAG 평가 지표 수집기 추가 (`scripts/` 하위에 `rag-metrics` 모듈)
4. Agent Critic 프롬프트 템플릿(karpathy-style “가정-검증-근거” 형식) 추가
5. 4주 파일럿(100개 작업셋) 후 임계치 기반 승인/차단 정책 반영

## 7. 개선 임계치 (제안)
- 토큰 절감: 총 토큰 기준 10~15% 개선 목표(파이프라인 2개월 평균)
- 1차 통과율: `first_pass_pass_rate` +15%p
- 재작업률: 20% 이상 개선(목표치 감소)
- tdw 위반: 2회 미만/주

## 8. 산출물
- `rag-metrics` 운영 대시보드 JSON/CSV
- Candidate 승인 정책과 Critic 교정 로그
- 계획서 자동 업데이트 스크립트
- 티켓 템플릿/운영 가이드 업데이트 PR

## 9. 위험 및 대체안
- 과도한 로그 수집 → 지표 수집은 핵심 6개에서 시작 후 확장
- 내부 에이전트 오탐 → human-in-the-loop 승인 단계 의무화
- 외부 시스템 동기화 실패 → 로컬 캐시 후 재시도 배치

## 10. Phase 2 결과

- [x] RAG/TDW 메트릭과 Agent Critic 루프 실행 사양 작성: `.deuk-agent/docs/plans/132-rag-metrics-agent-loop-spec.md`
- [x] 공식 인덱스 반영과 대시보드 구현은 후속 티켓으로 분리
- [ ] 4주 파일럿 실행은 별도 승인 후 수행
