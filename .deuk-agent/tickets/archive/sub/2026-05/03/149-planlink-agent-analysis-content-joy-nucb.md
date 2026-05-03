 - - - i d : 1 4 9 - - a g e n t - a n a l y s i s - c o n t e n t - j o y - n u c b t i t l e : - a g e n t - a n a l y s i s - c o n t e n t p h a s e : 4 s t a t u s : c l o s e d s u b m o d u l e : D e u k A g e n t R u l e s p r o j e c t : D e u k A g e n t R u l e s d o c s L a n g u a g e : k o s u m m a r y : 기 획 문 서 ( ) 에 티 켓 과 다 른 에 이 전 트 문 제 분 석 , 원 인 가 설 , 결 정 근 거 , 검 증 설 계 가 담 기 도 록 규 칙 과 생 성 초 안 을 정 리 한 다 . p r i o r i t y : P 1 t a g s : - r u l e s - a n a l y s i s c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 3 : 2 2 : 1 8 - - - # - a g e n t - a n a l y s i s - c o n t e n t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , f o c u s e d T D W d o c s . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , d o c s / p r i n c i p l e s . k o . m d , d o c s / u s a g e - g u i d e . k o . m d - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , f o c u s e d d o c s , t h i s t i c k e t / p l a n . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , c o n s u m e r s p o k e s , c o n s u m e r A G E N T S . m d , b i n / d e u k - a g e n t - r u l e . j s , u n r e l a t e d C L I i m p l e m e n t a t i o n . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - L E G A C Y / D C - O S S + c o r e - r u l e s / A G E N T S . m d v 2 0 . # # # [ C O N T R A C T ] - I n p u t : c u r r e n t o w n e r s h i p r u l e , p l a n d r a f t g e n e r a t o r , a n d d o c s t h a t d e s c r i b e a n a l y s i s D o c . - O u t p u t : r u l e / g e n e r a t o r t h a t r e q u i r e s a g e n t - a u t h o r e d a n a l y s i s r a t h e r t h a n t i c k e t - l i k e r e s t a t e m e n t . - S i d e e f f e c t s : s c o p e d r u l e / d o c s / t e s t u p d a t e s o n l y . # # # [ P A T C H P L A N ] - P r e s e r v e t i c k e t a s c o n t r a c t / b o u n d a r y o n l y . - M o v e a n a l y s i s r e q u i r e m e n t s i n t o s e c t i o n s a n d g e n e r a t o r . - A d d r e g r e s s i o n c o v e r a g e t h a t g e n e r a t e d i n c l u d e s a n a l y s i s - s p e c i f i c s e c t i o n s . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e a n a l y s i s - f o c u s e d . - [ x ] U p d a t e r u l e / g e n e r a t o r / d o c s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e . # # D o n e W h e n - i s d e f i n e d a s a g e n t a n a l y s i s , n o t a s e c o n d t i c k e t . - G e n e r a t e d d r a f t p r o m p t s p r o b l e m a n a l y s i s , h y p o t h e s e s , r a t i o n a l e , s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n . - M a r k d o w n l i n t / t e s t s p a s s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 9 - - a g e n t - a n a l y s i s - c o n t e n t - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 149 legacy split reference agent analysis content joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns identity, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.

## Problem Analysis
- 현재 legacy split reference 초안은 `Evidence`, `Execution Steps`, `Verification` 정도만 요구한다.
- 이 구조는 티켓의 작업 목록과 크게 다르지 않아, 에이전트가 문제를 어떻게 이해했는지 남기기 어렵다.
- 사용자가 원하는 기획문서는 파일 분리 자체가 아니라 에이전트의 문제 분석과 결정 흔적이다.

## Cause Hypotheses
- legacy split reference 소유권을 "evidence/steps"로만 표현해 분석 깊이가 부족하다.
- 생성 초안이 문제 구조, 원인 가설, 선택지 판단을 요구하지 않는다.
- 테스트도 비중복 여부만 확인하고 분석 섹션 존재를 검증하지 않는다.

## Decision Rationale
- legacy split reference 기본 섹션을 `Problem Analysis`, `Cause Hypotheses`, `Decision Rationale`, `Execution Strategy`, `Verification Design`로 바꾼다.
- 티켓과 중복을 피하면서도 legacy split reference가 에이전트 사고 과정을 담도록 유도한다.
- docs와 regression test를 함께 갱신해 생성 동작을 고정한다.

## Execution Strategy
- [x] `core-rules/AGENTS.md`에서 legacy split reference 소유권을 analysis 중심으로 재정의한다.
- [x] `ensurePlanDraftFile`의 기본 초안을 analysis 중심 구조로 변경한다.
- [x] 회귀 테스트를 새 섹션명 기준으로 갱신한다.
- [x] 사용자 문서의 legacy split reference 설명을 분석/판단 흔적 중심으로 정리한다.

## Verification
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/149-legacy split reference-agent-analysis-content-joy-nucb.md `merged into this ticket`

## Merged Legacy Document


### 149 legacy split reference agent analysis content joy nucb report

# legacy split reference Agent Analysis Content Update

## Summary
- Updated `core-rules/AGENTS.md` to v21.
- Reframed legacy split reference as the agent's problem-analysis and decision-trace document.
- Updated generated legacy split reference drafts to require problem analysis, source observations, cause hypotheses, decision rationale, execution strategy, and verification design.
- Updated docs and regression tests to match the new structure.

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/149-legacy split reference-agent-analysis-content-joy-nucb.md `merged into this ticket`
- Result: passed.

## Notes
- The existing ArchitectureGuard grep helper still prints a shell warning, but all tests pass.
