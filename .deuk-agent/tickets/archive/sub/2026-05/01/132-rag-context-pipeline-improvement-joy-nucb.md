 - - - i d : 1 3 2 - r a g - c o n t e x t - p i p e l i n e - i m p r o v e m e n t - j o y - n u c b t i t l e : r a g - c o n t e x t - p i p e l i n e - i m p r o v e m e n t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : c o n t e x t R A G + 파 이 프 라 인 적 합 성 진 단 및 통 계 · 에 이 전 트 루 프 기 반 개 선 구 조 설 계 p r i o r i t y : h i g h t a g s : r a g , p i p e l i n e , m e t r i c s , a g e n t - l o o p c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 4 : 2 0 : 1 1 - - - # r a g - c o n t e x t - p i p e l i n e - i m p r o v e m e n t > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / + . d e u k - a g e n t / 파 이 프 라 인 전 반 ( 티 켓 / 플 랜 / 텔 레 메 트 리 ) , d o c s / 가 이 드 보 강 - * * C o n t e x t F i l e s : * * A G E N T S . m d , P R O J E C T _ R U L E . m d , d o c s / a r c h i t e c t u r e . k o . m d , d o c s / h o w - i t - w o r k s . k o . m d , d o c s / u s a g e - g u i d e . k o . m d , s c r i p t s / c l i - t e l e m e t r y - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - m i g r a t i o n . m j s - * * D e s i g n R a t i o n a l e : * * 현 재 R A G 파 이 프 라 인 은 구 조 는 갖 춰 져 있 으 나 , 목 표 달 성 을 입 증 할 정 량 피 드 백 루 프 가 부 재 해 개 선 우 선 순 위 판 단 이 어 렵 기 때 문 - * * C o n s t r a i n t s : * * 기 존 T D W 게 이 트 를 깨 지 않 음 , C L I 아 키 텍 처 상 수 / 가 드 준 수 ( A R C H 테 스 트 D R - 0 1 ~ D R - 0 6 ) , 레 거 시 보 존 규 칙 준 수 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : . d e u k - a g e n t / d o c s / , s c r i p t s / - F o r b i d d e n m o d u l e s : s c r i p t s / A r c h i t e c t u r e G u a r d . t e s t . m j s ( 비 필 수 변 경 시 ) , 외 부 O S S s y n c 대 상 경 로 , 레 거 시 . d e u k - a g e n t - t i c k e t / - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d ( D C - L E G A C Y / D C - O S S ) , c o r e - r u l e s / A G E N T S . m d ( T D W , p h a s e g a t e ) # # # [ C O N T R A C T ] - I n p u t : 기 존 R A G / T i c k e t 운 영 로 그 , l e g a c y t i c k e t 구 조 , 현 재 수 집 / 평 가 방 식 - O u t p u t : C a n d i d a t e → A p p r o v e d 게 이 트 가 내 재 된 컨 텍 스 트 R A G 개 선 구 조 , 토 큰 · 품 질 지 표 수 집 / 대 시 보 드 초 안 , 내 부 에 이 전 트 피 드 백 루 프 제 안 - S i d e e f f e c t s : 승 인 되 지 않 은 후 보 항 목 은 자 동 반 영 되 지 않 으 며 , 지 표 기 반 임 계 치 정 책 이 도 입 됨 # # # [ P A T C H P L A N ] - 텔 레 메 트 리 스 키 마 보 강 설 계 - c a n d i d a t e 승 인 상 태 모 델 정 의 ( 필 드 / 승 인 규 칙 ) - 지 표 수 집 기 ( R A G 품 질 + 반 복 비 용 ) 설 계 및 표 준 리 포 트 - 내 부 에 이 전 트 루 프 ( 검 증 · 보 정 · 재 분 류 ) 제 안 템 플 릿 확 장 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 현 재 파 이 프 라 인 의 목 표 부 합 성 진 단 리 포 트 작 성 ( 문 서 화 ) - [ x ] 후 보 정 규 화 + 승 인 상 태 구 조 화 설 계 - [ x ] R A G 품 질 지 표 와 토 큰 / 시 간 / 재 작 업 률 수 집 규 격 수 립 - [ x ] 내 부 에 이 전 트 피 드 백 루 프 ( 비 수 정 / 제 안 / 검 증 ) 설 계 - [ ] 4 주 파 일 럿 계 획 및 평 가 임 계 치 적 용 - [ x ] 완 료 기 준 점 검 후 P h a s e 2 반 영 대 상 분 해 ( 다 음 티 켓 으 로 분 리 ) # # E x e c u t i o n N o t e s - P h a s e 2 에 서 는 공 식 R A G 인 덱 스 / 대 시 보 드 / 서 버 구 현 대 신 실 행 가 능 한 측 정 사 양 을 문 서 화 했 다 . - 산 출 물 : l e g a c y p l a n d o c - 4 주 파 일 럿 과 구 현 은 후 속 티 켓 으 로 분 리 한 다 . - 보 고 서 : . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 3 2 - r a g - c o n t e x t - p i p e l i n e - i m p r o v e m e n t - j o y - n u c b - r e p o r t . m d # # D o n e W h e n > 1 ) t a r g e t e d 후 보 품 질 지 표 가 측 정 가 능 한 스 키 마 로 정 리 되 어 있 음 > 2 ) 기 존 목 표 와 의 갭 이 텍 스 트 + 수 치 로 매 핑 됨 ( 토 큰 / 시 간 / 재 작 업 률 / 합 격 률 ) > 3 ) 실 행 가 능 계 획 ( 작 업 항 목 , 우 선 순 위 , 임 계 치 ) 이 다 음 실 행 티 켓 으 로 분 해 되 어 있 음 > 4 ) l i n t : m d 통 과 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 2 - r a g - c o n t e x t - p i p e l i n e - i m p r o v e m e n t - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 132 rag context pipeline improvement joy nucb report

# RAG Context Pipeline Improvement 보고서

## 산출물

- `merged into this ticket`

## 완료 내용

- RAG/TDW 개선 여부를 측정하기 위한 최소 지표 세트를 정의했다.
- JSONL 레코드 초안과 TDW compliance score 초안을 작성했다.
- Critic, Curator, Validator 역할로 내부 에이전트 루프를 분리했다.
- 공식 RAG 인덱스, 대시보드, MCP 서버 구현은 수행하지 않았다.

## 후속 분리

- `rag-metrics` JSON schema와 writer 추가.
- TDW compliance scorer 추가.
- read-only Critic report generator 추가.
- candidate/approved ingestion gate 설계.
- 20개 샘플 dry-run 평가.
- 4주 파일럿 계획 실행.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/132-rag-context-pipeline-improvement-joy-nucb.md `merged into this ticket` `merged into this ticket`: 통과.

## Merged Legacy Document


### 132 rag metrics agent loop spec

# RAG Metrics & Agent Loop Spec

## 목적

RAG/TDW 파이프라인의 개선 여부를 감각이 아니라 지표로 판단한다. 후보 지식은 승인 전까지 공식 인덱스에 반영하지 않고, 작업 단위의 비용/품질/준수율을 기록한다.

## 최소 지표 세트

| Field | Type | Source | 설명 |
|---|---|---|---|
| `ticket_id` | string | TDW | 작업 단위 |
| `phase` | number | ticket frontmatter | 실행 단계 |
| `input_tokens` | number | telemetry | 입력 토큰 |
| `output_tokens` | number | telemetry | 출력 토큰 |
| `total_tokens` | number | telemetry | 총 토큰 |
| `rag_hits_top1_hit` | boolean | evaluator | 첫 결과가 필요한 규칙/결정을 포함했는지 |
| `rag_hits_top3_hit` | boolean | evaluator | 상위 3개 중 필요한 규칙/결정이 있었는지 |
| `context_retrieval_latency_ms` | number | MCP/search wrapper | 검색 지연 |
| `loop_count` | number | conversation/ticket log | 반복 요청 횟수 |
| `revision_count` | number | git/ticket log | 후속 수정 횟수 |
| `first_pass_pass_rate` | number | verifier | 초회 제출 성공률 |
| `defect_reopen_count` | number | ticket status | 재오픈/회귀 |
| `tdw_compliance_score` | number | ticket parser | TDW 준수 점수 |

## JSONL 레코드 초안

```json
{
  "schemaVersion": 1,
  "ticket_id": "132-rag-context-pipeline-improvement-joy-nucb",
  "phase": 2,
  "timestamp": "2026-05-01T00:00:00.000Z",
  "client": "codex",
  "model": "unknown",
  "input_tokens": 0,
  "output_tokens": 0,
  "total_tokens": 0,
  "rag_hits_top1_hit": null,
  "rag_hits_top3_hit": null,
  "context_retrieval_latency_ms": null,
  "loop_count": 0,
  "revision_count": 0,
  "first_pass_pass_rate": null,
  "defect_reopen_count": 0,
  "tdw_compliance_score": null,
  "notes": []
}
```

## TDW 준수 점수 초안

| Check | Weight |
|---|---:|
| ticket exists before writes | 20 |
| APC complete before Phase 2 | 20 |
| legacy split reference exists and is non-placeholder | 20 |
| lint/test verification recorded | 20 |
| close/archive completed with report | 20 |

총점 100점이며, 80점 미만은 Critic review 대상으로 보낸다.

## Agent Loop

### Critic

- 입력: 완료 티켓, plan, report, verification log.
- 출력: 규칙 누락, 반복 원인, RAG miss 원인.
- 권한: read-only. 수정 금지.

### Curator

- 입력: Critic 결과와 candidate schema.
- 출력: `candidate`, `review`, `deprecated` 태그 제안.
- 권한: scratch/report 작성만 허용.

### Validator

- 입력: 샘플 20개 티켓과 제안된 분류.
- 출력: top1/top3 hit, TDW score, false-positive 목록.
- 권한: 공식 인덱스 반영 금지. 승인 전 draft만 작성.

## 후속 구현 티켓

1. `rag-metrics` JSON schema와 writer 추가.
2. TDW compliance scorer 추가.
3. read-only Critic report generator 추가.
4. candidate/approved ingestion gate 설계.
5. 20개 샘플 dry-run 평가.

## 비범위

- MCP 서버와 대시보드 수정.
- 공식 RAG 인덱스 업데이트.
- broad generated reports regeneration.
- candidate를 approved로 자동 승격.

## Merged Legacy Document


### 132 rag context pipeline improvement joy nucb plan

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

- [x] RAG/TDW 메트릭과 Agent Critic 루프 실행 사양 작성: `merged into this ticket`
- [x] 공식 인덱스 반영과 대시보드 구현은 후속 티켓으로 분리
- [ ] 4주 파일럿 실행은 별도 승인 후 수행
