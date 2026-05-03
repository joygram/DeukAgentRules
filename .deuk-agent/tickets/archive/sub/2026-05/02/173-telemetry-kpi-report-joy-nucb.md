 - - - i d : 1 7 3 - t e l e m e t r y - k p i - r e p o r t - j o y - n u c b t i t l e : t e l e m e t r y - k p i - r e p o r t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k A g e n t C o n t e x t t e l e m e t r y s u m m a r y 결 과 를 바 탕 으 로 R A G H i t R a t e , S t a l e R a t e , T o k e n S a v e d 리 포 트 를 작 성 한 다 p r i o r i t y : m e d i u m t a g s : - t e l e m e t r y - r a g - q u a l i t y - t o k e n - k p i - r e p o r t c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 9 : 0 5 : 1 5 - - - # t e l e m e t r y - k p i - r e p o r t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y t e l e m e t r y - k p i - r e p o r t - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " D e u k A g e n t C o n t e x t t e l e m e t r y s u m m a r y 결 과 를 바 탕 으 로 R A G H i t R a t e , S t a l e R a t e , T o k e n S a v e d 리 포 트 를 작 성 한 다 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " D e u k A g e n t C o n t e x t t e l e m e t r y s u m m a r y 결 과 를 바 탕 으 로 R A G H i t R a t e , S t a l e R a t e , T o k e n S a v e d 리 포 트 를 작 성 한 다 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " D e u k A g e n t C o n t e x t t e l e m e t r y s u m m a r y 결 과 를 바 탕 으 로 R A G H i t R a t e , S t a l e R a t e , T o k e n S a v e d 리 포 트 를 작 성 한 다 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # V e r i f i c a t i o n # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 7 3 - t e l e m e t r y - k p i - r e p o r t - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 173 telemetry kpi report joy nucb report

# Telemetry KPI Report

## 요약

이번 리포트는 `telemetry summary`가 제공하는 신호를 기준으로 DeukAgentContext의 존재 가치를 해석하는 문서다. 현재 summary는 총 토큰 수만이 아니라 RAG 결과 분포, local fallback 여부, knowledge action, token quality, saved tokens를 함께 보여준다.

핵심 결론은 단순하다. `RAG Hit Rate`가 높고 `Stale Rate`가 낮으며 `Token Saved`가 누적될수록 DeukAgentContext는 단순 검색기가 아니라 운영 효율 장치로 작동한다. 반대로 `miss`와 `stale`가 많고 `localFallback`이 높으면, 컨텍스트는 탐색 비용을 줄이지 못하고 재검증 부담만 늘린다.

## 현재 KPI 해석

`telemetry summary`는 다음 항목을 읽을 수 있게 한다.

- `Total Tokens`
- `Saved Tokens`
- `RAG Quality`
- `Hit Rate`
- `Miss Rate`
- `Stale Rate`
- `Local Fallback Rate`
- `By RAG Result`
- `By Token Quality`
- `By Knowledge Action`

이 구성을 기준으로 보면, 리포트의 판단 축은 세 개다.

1. `RAG Hit Rate`
문서나 과거 지식이 실제로 재사용되었는지 보는 지표다. `hit`와 `weak-hit`를 함께 보되, `weak-hit` 비중이 높으면 품질은 중간 수준으로 본다.

2. `Stale Rate`
오래된 지식이 검색되어 교정이 필요한 정도를 보여준다. 이 값이 높으면 `refresh_document`가 충분히 작동하지 않거나, 지식 축적 기준이 너무 넓다는 뜻이다.

3. `Token Saved`
RAG 사용으로 생략된 읽기나 재탐색의 크기를 가늠하는 추정치다. `savedTokens`가 누적되지만 `Hit Rate`가 낮으면, 절감이 아니라 우연한 기록일 수 있다.

## 해석 기준

- `Hit Rate`가 높고 `Stale Rate`가 낮으면, DeukAgentContext는 재사용 가능한 기억층으로 유효하다.
- `Miss Rate`와 `localFallback`이 함께 높으면, 검색은 되었지만 실무 의사결정에는 도움이 덜 된 것이다.
- `savedTokens`가 커도 `tokenQuality`가 `rework` 위주면, 절감이 아니라 회피에 가까울 수 있다.
- `knowledgeAction`에서 `refresh_document` 비중이 높으면, 지식 품질 관리가 작동하고 있다는 뜻이다.

## 결론

이 리포트의 목적은 DeukAgentContext를 과장하지도, 축소하지도 않는 데 있다. 현재 summary는 충분히 쓸 만한 KPI 계층을 제공하고 있으며, 실제 사용 가치 판단은 누적 로그를 통해 `hit/miss/stale/saved`의 균형을 보는 방식으로 해야 한다.

실데이터가 쌓인 뒤에는 이 문서를 월간 리포트 템플릿으로 재사용할 수 있다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/173-telemetry-kpi-report-joy-nucb.md `merged into this ticket` `merged into this ticket`: passed

## Merged Legacy Document


### 173 telemetry kpi report joy nucb plan

# Telemetry KPI Report Plan

## 문제 분석

`telemetry summary`는 이제 토큰 총량만이 아니라 `ragResult`, `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`를 함께 집계한다. 이 변화의 의미는 단순 로그 집계를 넘어서, DeukAgentContext가 실제로 반복 탐색을 줄였는지와 stale 지식을 얼마나 빨리 교정하는지까지 읽을 수 있게 되었다는 점이다.

이 계획의 목적은 이 집계 결과를 해석 가능한 리포트로 정리하는 것이다. 특히 `RAG Hit Rate`, `Stale Rate`, `Token Saved`를 한 문서 안에서 함께 읽을 수 있어야 한다. 지금 단계에서는 새로운 알고리즘을 더하는 것이 아니라, 현재 summary가 제공하는 신호를 사용자 친화적인 보고 문맥으로 정리하는 데 초점을 둔다.

## 근거 관찰

직전 작업에서 `scripts/cli-telemetry-commands.mjs`는 RAG 결과 분포와 토큰 품질 분포를 요약할 수 있게 바뀌었다. 이로 인해 별도의 데이터 파이프라인이 없어도 로컬 `telemetry.jsonl` 수준에서 초기 KPI 해석이 가능하다.

문서 작업이므로 코드 변경은 없고, Phase 1 범위는 계획 문서와 리포트 문서의 구조 정합성을 맞추는 것이다. 후속 자동화가 필요해지면 그때 별도 티켓으로 분리하는 것이 맞다.

## 판단 가설

리포트의 가치는 다음 질문에 답하는 데 있다.

- RAG가 실제로 유용했는가
- stale 지식이 얼마나 자주 발견되는가
- `savedTokens`가 총 토큰 사용량 대비 의미 있는가
- `localFallback`이 높은지 낮은지
- `add_knowledge`와 `refresh_document`가 운영상 어떤 차이를 만드는가

이 질문이 한 번에 보이지 않으면 summary는 존재하지만 판단은 어려운 상태가 된다. 따라서 리포트는 숫자를 나열하는 문서가 아니라, 숫자 사이의 관계를 짧게 설명하는 문서여야 한다.

## 실행 전략

1. 현재 telemetry summary 필드를 정리한다.
2. KPI별 해석 문장을 작성한다.
3. 실제 로그 데이터가 없는 경우와 있는 경우를 구분해 적는다.
4. `telemetry summary --json` 출력과 사람이 읽는 텍스트 출력의 역할을 구분한다.
5. 보고서와 legacy split reference가 서로 같은 문장을 반복하지 않도록 한다.

## 검증 설계

문서 lint가 통과해야 하고, 문서 내용은 telemetry CLI의 현재 구현과 일치해야 한다. 실제 수치 검증은 사용자가 telemetry 로그를 누적한 뒤 별도 실행 단계에서 수행한다. 이 티켓에서는 리포트 구조와 해석 문장만 다룬다.

## 완료 기준

- legacy split reference가 분석 문서로서 성립한다.
- walkthrough report가 현재 telemetry summary 구조를 정확히 설명한다.
- 티켓과 legacy split reference, report가 서로 중복 없이 역할 분리된다.
