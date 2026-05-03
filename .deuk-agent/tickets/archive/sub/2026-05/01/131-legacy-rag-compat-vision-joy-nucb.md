 - - - i d : 1 3 1 - l e g a c y - r a g - c o m p a t - v i s i o n - j o y - n u c b t i t l e : l e g a c y - r a g - c o m p a t - v i s i o n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : " 래 거 시 티 켓 / R A G 정 합 성 개 선 : 토 큰 비 용 감 소 · 생 산 품 질 상 향 을 위 한 후 보 수 집 / 정 규 화 / 평 가 파 이 프 라 인 수 립 " p r i o r i t y : h i g h t a g s : l e g a c y - r a g , p l a n - g a t e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 4 : 1 8 : 0 1 - - - # l e g a c y - r a g - c o m p a t - v i s i o n > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * D e u k A g e n t R u l e s / s c r i p t s , . d e u k - a g e n t 규 칙 / 티 켓 파 이 프 라 인 - * * D e s i g n R a t i o n a l e : * * 레 거 시 티 켓 정 합 성 문 제 로 검 색 정 확 도 및 생 산 반 복 성 이 떨 어 져 R A G 품 질 과 비 용 이 불 안 정 함 - * * C o n s t r a i n t s : * * 기 존 규 칙 계 보 ( c o r e / p r o j e c t / t e m p l a t e s ) 와 T D W 게 이 트 를 우 회 하 지 않 음 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / , . d e u k - a g e n t / d o c s / , t e m p l a t e s / , c o r e - r u l e s / A G E N T S . m d ( 업 데 이 트 시 버 전 호 환 검 토 ) - F o r b i d d e n m o d u l e s : . d e u k - a g e n t - t i c k e t / , O S S 동 기 화 산 출 물 , 기 존 아 카 이 브 티 켓 파 일 ( 사 전 승 인 없 는 직 접 변 경 금 지 ) - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d ( D C - L E G A C Y , D C - O S S ) , c o r e - r u l e s / A G E N T S . m d T D W / 게 이 트 규 칙 # # # [ C O N T R A C T ] - I n p u t : 레 거 시 티 켓 / 문 서 덤 프 , 현 재 M C P / R A G 사 용 현 황 , 기 존 아 카 이 브 정 합 성 - O u t p u t : c a n d i d a t e → a p p r o v e d 정 규 화 파 이 프 라 인 , 토 큰 / 품 질 A / B 평 가 프 레 임 , 실 행 지 표 대 시 보 드 결 과 - S i d e e f f e c t s : 기 존 검 색 결 과 순 위 재 정 렬 , 비 승 인 후 보 의 반 영 차 단 , 대 시 보 드 산 출 항 목 추 가 # # # [ P A T C H P L A N ] - s c r i p t s / c l i - t i c k e t - p a r s e r 및 정 규 화 유 틸 정 비 - R A G 인 덱 싱 전 후 보 정 규 화 계 층 추 가 - A / B 평 가 수 집 기 및 리 포 트 산 출 기 구 현 - 테 스 트 / 검 증 지 표 자 동 화 및 문 서 화 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 레 거 시 티 켓 정 규 화 스 키 마 및 상 태 머 신 설 계 - [ ] c a n d i d a t e / a p p r o v e d 전 환 규 칙 구 현 - [ ] R A G 검 색 재 랭 크 에 2 티 어 상 태 반 영 - [ ] 토 큰 · 품 질 A / B 측 정 스 크 립 트 + 대 시 보 드 집 계 구 현 - [ ] 2 주 파 일 럿 실 행 및 개 선 안 반 영 # # E x e c u t i o n N o t e s - P h a s e 2 에 서 는 공 식 인 덱 스 / 대 시 보 드 / 코 드 구 현 대 신 c a n d i d a t e 스 키 마 와 상 태 머 신 문 서 를 먼 저 작 성 했 다 . - 나 머 지 구 현 은 G 6 / G 8 경 계 가 있 어 후 속 티 켓 으 로 분 리 한 다 . - 보 고 서 : . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 3 1 - l e g a c y - r a g - c o m p a t - v i s i o n - j o y - n u c b - r e p o r t . m d # # D o n e W h e n > 정 규 화 후 보 수 집 정 확 도 , A / B 비 용 / 품 질 지 표 기 준 치 달 성 ( 예 : 토 큰 1 2 % ↓ , 재 작 업 률 8 % ↓ ) , P h a s e 2 테 스 트 통 과 , 와 t i c k e t 연 계 완 료 후 실 행 / 보 관 . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 1 - l e g a c y - r a g - c o m p a t - v i s i o n - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 131 legacy rag compat vision joy nucb report

# Legacy RAG Compat Vision 보고서

## 산출물

- `merged into this ticket`

## 완료 내용

- 레거시 티켓/RAG 정합성 개선안을 `raw → candidate → review → approved → active-index` 상태 모델로 정리했다.
- 필수 필드, 승격 게이트, 품질 지표, 후속 구현 분해를 문서화했다.
- 공식 RAG 인덱스, 대시보드, MCP 서버, archive 티켓 대량 수정은 수행하지 않았다.

## 후속 분리

- candidate JSON schema 파일 추가.
- read-only legacy scanner 추가.
- placeholder/conflict/deprecated 판정기 추가.
- approved-only ingestion 게이트 설계.
- A/B 평가 스크립트와 대시보드 집계는 별도 티켓으로 분리.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/131-legacy-rag-compat-vision-joy-nucb.md `merged into this ticket` `merged into this ticket`: 통과.

## Merged Legacy Document


### 131 legacy rag candidate schema

# Legacy RAG Candidate Schema

## 목적

레거시 티켓, 과거 plan/report, 임시 노트를 바로 공식 RAG 지식으로 승격하지 않고 `candidate` 상태로 수집한다. 검증된 항목만 `approved`를 거쳐 공식 인덱스에 반영한다.

## 상태 모델

| State | 의미 | 진입 조건 | 다음 상태 |
|---|---|---|---|
| `raw` | 원본 입력 | legacy ticket, plan, report, scratch 문서 발견 | `candidate`, `rejected` |
| `candidate` | 구조화 후보 | 필수 필드 추출 성공, 출처 보존 | `review`, `rejected` |
| `review` | 검토 대기 | 중복/충돌/오래된 규칙 여부 확인 필요 | `approved`, `rejected`, `candidate` |
| `approved` | 공식 반영 승인 | 사람 또는 정책 게이트 통과 | `active-index`, `deprecated` |
| `active-index` | 공식 RAG 반영 | 인덱싱 완료, 버전 태그 기록 | `deprecated` |
| `rejected` | 반영 금지 | 출처 불명확, 충돌, placeholder, 품질 미달 | 없음 |
| `deprecated` | 과거 지식 | 최신 규칙/티켓으로 대체됨 | 없음 |

## 필수 필드

```json
{
  "id": "legacy-rag-candidate-id",
  "sourcePath": ".deuk-agent/tickets/archive/sub/example.md",
  "sourceType": "ticket|plan|report|scratch|external",
  "status": "candidate",
  "summary": "짧은 문제/결정 요약",
  "problem": "증상 또는 요구",
  "decision": "확정된 결정 또는 후보 결정",
  "evidence": ["검증 명령, 보고서, 코드 경로"],
  "scope": ["영향 모듈 또는 문서"],
  "rules": ["DC-CODEGEN", "TDW"],
  "confidence": 0.0,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

## 승격 게이트

- `summary`, `sourcePath`, `sourceType`, `status`, `problem`이 비어 있으면 `candidate`로도 승격하지 않는다.
- placeholder 문구가 포함되면 `rejected` 또는 `candidate` 유지.
- `core-rules/AGENTS.md`, `PROJECT_RULE.md`와 충돌하면 `review`에 머문다.
- generated output, benchmark report, 공식 baseline을 바꾸는 지식은 G7/G8 승인 없이 `approved`가 될 수 없다.
- 동일 주제의 최신 archived report가 있으면 오래된 후보는 `deprecated` 후보로 표시한다.

## 품질 지표

| Metric | 정의 | 목표 |
|---|---|---|
| `top1_rule_hit` | 첫 RAG 결과가 필요한 규칙/결정을 포함 | 상승 |
| `top3_rule_hit` | 상위 3개 결과 중 필요한 규칙/결정을 포함 | 상승 |
| `placeholder_rate` | 후보 중 placeholder 포함 비율 | 하락 |
| `rework_rate` | RAG 결과 기반 작업의 재수정 비율 | 하락 |
| `token_delta` | 기존 검색 대비 입력 토큰 변화 | 하락 |

## 후속 구현 분해

1. `legacy-rag-candidate` JSON schema 파일 추가.
2. legacy ticket/plan/report에서 필드를 추출하는 read-only scanner 추가.
3. placeholder/conflict/deprecated 판정기를 추가.
4. 승인 전 후보를 `merged ticket body` 또는 별도 candidate store에 저장한다.
5. `approved`만 공식 RAG ingestion 대상으로 넘기는 게이트를 설계한다.
6. A/B 평가 스크립트는 별도 티켓으로 분리한다.

## 비범위

- 이 문서는 공식 RAG 인덱스를 변경하지 않는다.
- 기존 archive 티켓을 대량 수정하지 않는다.
- 대시보드나 MCP 서버 코드는 수정하지 않는다.

## Merged Legacy Document


### 131 legacy rag compat vision joy nucb plan

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
   - 필드 강제: `id/phase/status/summary/legacy split reference/priorities/tags/context`.
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
- `legacy split reference` 기반 실행 체크리스트 및 문서 업데이트

## 10. Phase 2 결과

- [x] `legacy-rag-candidate` 정규화 사양서 초안 작성: `merged into this ticket`
- [ ] `rag-ab-eval` 대시보드 지표 JSON/CSV 구현은 후속 티켓으로 분리
- [ ] 공식 RAG 재랭크/인덱스 반영은 G8 승인 게이트 이후 후속 티켓으로 분리
