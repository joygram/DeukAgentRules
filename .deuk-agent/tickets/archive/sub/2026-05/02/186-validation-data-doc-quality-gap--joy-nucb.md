 - - - i d : 1 8 6 - v a l i d a t i o n - d a t a - d o c - q u a l i t y - g a p - - j o y - n u c b t i t l e : v a l i d a t i o n - d a t a - d o c - q u a l i t y - g a p - a n a l y s i s p h a s e : 2 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 검 증 데 이 터 기 반 문 서 품 질 통 계 분 석 과 누 락 문 장 원 인 조 사 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 3 6 : 3 5 - - - # v a l i d a t i o n - d a t a - d o c - q u a l i t y - g a p - a n a l y s i s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y v a l i d a t i o n - d a t a - d o c - q u a l i t y - g a p - a n a l y s i s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 검 증 데 이 터 기 반 문 서 품 질 통 계 분 석 과 누 락 문 장 원 인 조 사 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 검 증 데 이 터 기 반 문 서 품 질 통 계 분 석 과 누 락 문 장 원 인 조 사 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 검 증 데 이 터 기 반 문 서 품 질 통 계 분 석 과 누 락 문 장 원 인 조 사 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 8 6 - v a l i d a t i o n - d a t a - d o c - q u a l i t y - g a p - - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 186 validation data doc quality gap joy nucb report

# Validation Data Doc Quality Gap Report

## 요약

검증 데이터를 통계로 보면, 문서 품질 문제는 단일 원인보다 복합 원인에 가깝다.

- telemetry 29행 중 15행은 `event`가 없다.
- 10행은 `ragResult`가 없고, 10행은 `knowledgeAction`과 `tokenQuality`도 없다.
- walkthrough 보고서 49개 중 명시적 outcome 섹션이 있는 문서는 12개뿐이다.
- 33개 보고서는 결과 섹션이 없어서, 검증이 있었는지와 무엇을 증명했는지 문장으로 남지 않는다.

## 통계

### Telemetry

- total rows: `29`
- missing `event`: `15`
- missing `ragResult`: `10`
- missing `knowledgeAction`: `10`
- missing `tokenQuality`: `10`
- `localFallback=true`: `0`

### Walkthrough Reports

- total reports: `49`
- reports with summary section: `11`
- reports with verification section: `41`
- reports with outcome section: `12`
- reports with notes section: `5`
- reports with conclusion section: `19`
- reports with placeholder text: `3`
- reports mixing English and Korean headings: `2`

## 누락 원인

### 1. 데이터 수집 이전의 로그

초기 telemetry는 현재 스키마가 안정화되기 전에 기록된 것으로 보인다. 그래서 `event`나 RAG 관련 필드가 비어 있다. 이 경우 누락은 문서 품질 문제가 아니라 관측 데이터 자체의 결손이다.

### 2. outcome 섹션을 강제하지 않은 템플릿

많은 보고서가 `Verification`은 있지만 `Verification Outcome` 또는 `검증 결과`가 없다. 검증 명령은 적혀 있어도, 결과 문장이 빠지기 쉽다.

### 3. 헤딩 혼용

영어와 한국어 헤딩이 함께 쓰이면 섹션 탐지 규칙이 약해진다. 같은 의미의 섹션이라도 집계에서는 누락처럼 보인다.

### 4. 요약형 보고서

몇몇 문서는 짧은 Summary/Verification 메모만 남기고 끝난다. 이 경우 문서가 틀린 것은 아니지만, 통계 분석에는 정보가 부족하다.

### 5. 자리표시자 잔존

placeholder, TODO, `[ ]` 같은 토큰이 남은 보고서는 적지만 존재한다. 이것은 작성 중 초안이 검증 없이 저장된 신호다.

## 해석

이번 분석의 핵심은 “문서가 아예 없다”가 아니라 “문서가 있어도 증명 문장이 빠진다”는 점이다.

그래서 후속 개선은 두 갈래로 나뉜다.

1. telemetry 스키마가 안정화되기 전의 로그는 `raw`로 취급한다.
2. 보고서 템플릿은 outcome 섹션을 강제하고, 헤딩 언어를 하나로 고정한다.

## 결론

문서 품질의 누락 원인은 주로 다음 세 가지다.

- 수집 시점의 데이터 결손
- outcome 섹션을 강제하지 않은 보고서 템플릿
- 혼용된 헤딩과 짧은 초안

즉, 이 문제는 작성자 실수만으로 설명되지 않는다. 데이터 계층과 문서 계층을 같이 고쳐야 한다.

## 검증

- `node` 스크립트로 `.deuk-agent/telemetry.jsonl`의 필드 누락을 집계했다.
- `node` 스크립트로 `merged ticket body`의 섹션 존재 비율을 집계했다.

## Verification Outcome

- telemetry와 report 통계가 실제 누락 원인을 분리해서 보여준다.
- 현재 문서 품질 결함은 결과 섹션 누락, 헤딩 혼용, 데이터 수집 이전 로그가 겹친 상태다.
- `npx deuk-agent-rule lint:md`는 새 report 구조 규칙을 적용한 뒤 다시 확인할 수 있다.

## Merged Legacy Document


### 186 validation data doc quality gap joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 분석의 범위와 APC 경계를 관리한다.
- 이 문서는 검증 데이터의 통계, 문서 품질 지표, 누락 원인 분류만 담는다.
- 구현 코드는 수정하지 않는다.

## Problem Analysis
- 검증 데이터가 충분히 쌓였는지 먼저 확인해야 문서 품질을 신뢰할 수 있다.
- 현재 telemetry와 walkthrough 보고서에는 필드 누락, 섹션 누락, 헤딩 혼용이 함께 보인다.
- 그래서 누락 문장을 단순 실수로 보기보다, 데이터 수집 상태와 템플릿 성숙도 문제로 분리해 봐야 한다.

## Source Observations
- `.deuk-agent/telemetry.jsonl`에는 29개 로그가 있고, 그중 15개는 `event`가 없다.
- 같은 로그에서 10개는 `ragResult`, `knowledgeAction`, `tokenQuality`가 없다.
- `merged ticket body` 보고서 49개 중 명시적 outcome 섹션이 있는 것은 12개뿐이다.
- 33개 보고서는 `Verification Outcome` 또는 `검증 결과` 같은 명시적 결과 섹션이 없다.
- 보고서 본문에는 `Summary`, `Verification`, `Notes` 같은 영어 헤딩과 `요약`, `검증`, `결론` 같은 한국어 헤딩이 혼재한다.

## Cause Hypotheses
- 초기 로그는 스키마가 안정화되기 전에 쌓여서 필드가 비어 있을 가능성이 높다.
- 오래된 보고서는 템플릿이 느슨해서 검증 결과를 별도 섹션으로 강제하지 않았을 가능성이 높다.
- 영어/한국어 헤딩 혼용은 섹션 탐지 기준을 약화시키고, 결과적으로 누락처럼 보이게 만든다.
- 짧은 요약형 보고서는 실험 결과가 적어서 서술이 부족해 보인다.

## Decision Rationale
- 정확한 원인 분석을 위해 telemetry와 문서 구조를 함께 본다.
- 누락을 하나의 결함으로 뭉치지 않고, `데이터 없음`, `템플릿 약함`, `헤딩 불일치`, `검증 미기록`으로 나눈다.
- 이렇게 나눠야 후속 개선이 수집 파이프라인 수정인지, 문서 템플릿 보강인지 판단할 수 있다.

## Execution Strategy
- telemetry JSONL을 읽어 필드 존재 여부와 이벤트 분포를 집계한다.
- walkthrough 보고서의 섹션 헤딩을 검사해 outcome 섹션 존재 비율을 구한다.
- 누락 원인을 유형별로 분류하고, 각 유형의 대표 파일을 확인한다.
- 결과를 보고서와 legacy split reference에 각각 남긴다.

## Verification Design
- `node` 스크립트로 telemetry 필드 누락 수를 집계한다.
- `node` 스크립트로 walkthrough 보고서의 헤딩 존재 비율을 집계한다.
- `npx deuk-agent-rule lint:md`로 문서 형식을 검증한다.

## Verification Outcome
- telemetry 29행 기준으로 `event` 미존재 15, `ragResult` 미존재 10, `knowledgeAction` 미존재 10, `tokenQuality` 미존재 10을 확인했다.
- walkthrough 보고서 49개 기준으로 outcome 섹션이 12개뿐임을 확인했다.
- 누락 원인은 주로 legacy template drift, mixed headings, terse summary reports, pre-schema telemetry로 수렴한다.
