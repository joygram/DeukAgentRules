 - - - i d : 1 7 2 - a g e n t - c o n t e x t - t o k e n - k p i - e v a l u a t i - j o y - n u c b t i t l e : a g e n t - c o n t e x t - t o k e n - k p i - e v a l u a t i o n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k A g e n t C o n t e x t 토 큰 생 성 이 후 K P I 기 반 존 재 가 치 평 가 및 개 선 계 획 수 립 p r i o r i t y : m e d i u m t a g s : - d e u k a g e n t c o n t e x t - t e l e m e t r y - r a g - q u a l i t y - t o k e n - k p i c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 6 : 1 9 : 3 6 - - - # a g e n t - c o n t e x t - t o k e n - k p i - e v a l u a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t e l e m e t r y - r e l a t e d C L I m o d u l e s u n d e r s c r i p t s / , a n d i n d e x e d p l a n n i n g / r e p o r t a r t i f a c t s u n d e r . d e u k - a g e n t / d o c s / - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , t e l e m e t r y - r e l a t e d C L I m o d u l e s , a n d D e u k A g e n t C o n t e x t M C P q u a l i t y g u i d a n c e - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t , i t s , s c o p e d r u l e t e x t i n c o r e - r u l e s / A G E N T S . m d , a n d t e l e m e t r y - r e l a t e d C L I m o d u l e s u n d e r s c r i p t s / i f i m p l e m e n t a t i o n i s l a t e r a p p r o v e d - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , b r o a d i n i t / s y n c o u t p u t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s , a n d o f f i c i a l b a s e l i n e / c a t a l o g e x p a n s i o n s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - L E G A C Y / D C - O S S / D C - C O D E G E N b o u n d a r i e s + c o r e - r u l e s / A G E N T S . m d v 2 5 G 1 / G 1 . 1 / G 1 . 2 / G 6 / G 7 / G 8 / F 3 # # # [ C O N T R A C T ] - I n p u t : c u r r e n t A G E N T S a p p r o v a l / M C P q u a l i t y r u l e s , e x i s t i n g t e l e m e t r y C L I b e h a v i o r , a n d o b s e r v e d n e e d t o e v a l u a t e D e u k A g e n t C o n t e x t b y t o k e n / K P I o u t c o m e s a f t e r g e n e r a t i o n - O u t p u t : a K P I - d r i v e n e v a l u a t i o n p l a n f o r D e u k A g e n t C o n t e x t e x i s t e n c e v a l u e ; o p t i o n a l l a t e r i m p l e m e n t a t i o n m a y a d d t e l e m e t r y f i e l d s o r r e p o r t i n g h o o k s o n l y a f t e r P h a s e 2 a p p r o v a l - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s i n P h a s e 1 ; n o p r o d u c t / s o u r c e / c o n f i g m u t a t i o n u n t i l i s c o m p l e t e a n d e x e c u t i o n i s a p p r o v e d # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # V e r i f i c a t i o n - n o d e - - t e s t s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s : p a s s e d , 1 8 t e s t s

## Merged Legacy Document


### 172 agent context token kpi evaluati joy nucb plan

# DeukAgentContext 토큰/KPI 평가 계획

## 문제 분석

DeukAgentContext는 단순 문서 검색 기능으로 평가하면 가치가 과소평가된다. 현재 규칙은 MCP 품질 게이트, RAG-MISS 판정, `add_knowledge`, `refresh_document`를 포함하고 있으므로 실제 존재 가치는 "문서를 찾았는가"보다 "생성 토큰 이후 반복 탐색과 재작업을 줄였는가"로 판단해야 한다.

현재 약점은 정량 계측이다. 규칙은 검색 실패 시 로컬 확인으로 전환하라고 말하지만, 각 RAG 호출이 실제로 `hit`, `weak-hit`, `miss`, `stale` 중 무엇이었는지 누적 기록하는 체계는 별도로 정리되어 있지 않다. 따라서 DeukAgentContext가 토큰을 절감했는지, 오히려 검증 비용을 늘렸는지 사후 평가가 어렵다.

## 근거 관찰

`core-rules/AGENTS.md` v25는 DeukAgentContext를 보조 기억층으로 두고, 같은 질문에 대해 MCP 조회를 최대 2회로 제한한다. 또한 placeholder, 중복, stale, 무관 결과를 RAG-MISS로 취급하고, 로컬 분석에서 재사용 가능한 사실이 나오면 `add_knowledge`를 호출하도록 요구한다.

승인 규칙상 현재 작업은 Phase 1 계획 문서 작성까지 가능하다. 실제 telemetry 필드 추가, CLI 리포트 변경, 규칙 정본 수정은 legacy split reference가 완성되고 Phase 2 실행 승인이 있을 때만 진행한다. 특히 broad regeneration, official baseline/catalog 확장, 인프라성 변경은 별도 명시 승인이 필요하다.

## 원인 가설

DeukAgentContext의 체감 가치가 흔들리는 원인은 검색 결과 품질이 아니라 품질 결과를 기록하지 않는 데 있다. `hit`인 검색은 다음 탐색을 줄이지만, `miss` 또는 `stale` 검색은 입력 토큰과 판단 시간을 추가로 소비한다.

또한 생성 토큰의 품질을 평가하지 않으면, 긴 계획이나 요약이 실제 작업 절감으로 이어졌는지 알 수 없다. 따라서 생성 이후 `useful`, `waste`, `rework`, `saved` 판정을 붙이는 방식이 필요하다.

## 결정 기준

DeukAgentContext는 다음 조건을 만족하면 유지 가치가 높다고 판단한다.

- RAG Hit Rate가 안정적으로 60% 이상이다.
- RAG Miss Rate가 25% 이하로 유지된다.
- Stale Knowledge Rate가 10% 이하이다.
- 작업당 Token Saved Estimate가 RAG 호출 토큰보다 크다.
- 반복 검색 감소율이 월 단위로 개선된다.
- stale 발견 시 `refresh_document`가 `add_knowledge`보다 우선된다.

반대로 다음 상태가 반복되면 운영 개선 또는 축소를 검토한다.

- placeholder/중복 결과가 반복된다.
- 로컬 fallback이 대부분의 작업에서 필수로 발생한다.
- RAG 결과를 신뢰했다가 로컬 소스 확인에서 뒤집히는 rework가 늘어난다.
- 수집 지식이 실행 규칙이나 현재 코드보다 오래된 판단을 제공한다.

## 실행 전략

1. Phase 1에서는 KPI 정의와 승인 경계를 문서화한다.
2. Phase 2 승인 후 telemetry 입력 지점과 리포트 지점을 좁혀 확인한다.
3. 필요한 경우 telemetry 이벤트에 `rag_result`, `local_fallback`, `knowledge_action`, `token_quality` 필드를 추가한다.
4. 월간 리포트 계산식은 우선 문서 기준으로 정의하고, 자동화는 별도 승인 후 구현한다.
5. RAG는 현재 코드/정본 규칙보다 우선하지 않는다는 원칙을 유지한다.

## 검증 설계

문서 단계 검증은 Markdown lint 통과 여부로 확인한다. 구현 단계가 승인되면 telemetry 관련 단위 테스트를 추가하거나 기존 테스트를 갱신한다. 실제 DeukAgentContext 효과 검증은 최소 1주 이상의 작업 기록을 기준으로 `hit/miss/stale`, 토큰 절감 추정, local fallback 비율을 집계해 판단한다.

## 승인 기준

Phase 2로 진행하려면 사용자가 telemetry 또는 rule 변경 실행을 명확히 승인해야 한다. 승인 전에는 이 계획과 티켓/APC만 공식 기록으로 유지한다.
