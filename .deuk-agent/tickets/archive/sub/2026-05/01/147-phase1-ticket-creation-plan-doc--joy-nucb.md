 - - - i d : 1 4 7 - p h a s e 1 - t i c k e t - c r e a t i o n - p l a n - d o c - - j o y - n u c b t i t l e : p h a s e 1 - t i c k e t - c r e a t i o n - p l a n - d o c - s e m a n t i c s p h a s e : 4 s t a t u s : c l o s e d s u b m o d u l e : D e u k A g e n t R u l e s p r o j e c t : D e u k A g e n t R u l e s d o c s L a n g u a g e : k o s u m m a r y : P h a s e 1 은 티 켓 생 성 과 계 획 기 록 의 규 격 화 단 계 로 정 의 하 고 , 티 켓 생 성 자 체 를 코 드 수 정 승 인 게 이 트 와 분 리 한 다 . p r i o r i t y : P 1 t a g s : - r u l e s - t d w - p h a s e 1 c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 3 : 0 3 : 5 8 - - - # p h a s e 1 - t i c k e t - c r e a t i o n - p l a n - d o c - s e m a n t i c s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , u s e r - f a c i n g d o c s t h a t d e s c r i b e T D W p h a s e s e m a n t i c s . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d o c s / p r i n c i p l e s . k o . m d , d o c s / u s a g e - g u i d e . k o . m d , d o c s / h o w - i t - w o r k s . k o . m d - * * D e s i g n R a t i o n a l e : * * P h a s e 1 s h o u l d m e a n t i c k e t c r e a t i o n a n d s t r u c t u r e d p l a n n i n g / r e p o r t i n g f o r R A G / s e a r c h a b i l i t y . I t s h o u l d n o t c r e a t e d u p l i c a t e t i c k e t s o r f o r c e a s t o p w h e n t h e u s e r h a s a l r e a d y r e q u e s t e d e x e c u t i o n . - * * C o n s t r a i n t s : * * K e e p g e n e r a t e d c o n s u m e r o u t p u t s u n t o u c h e d . K e e p c o d e - w r i t e g u a r d : n o c o d e e d i t s u n t i l a n a c t i v e t i c k e t e x i s t s a n d e x e c u t i o n i s a u t h o r i z e d . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , f o c u s e d T D W d o c s u n d e r d o c s / , a n d t h i s t i c k e t / p l a n d o c u m e n t a t i o n . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , c o n s u m e r . c u r s o r / r u l e s / , c o n s u m e r A G E N T S . m d , b i n / d e u k - a g e n t - r u l e . j s , u n r e l a t e d C L I i m p l e m e n t a t i o n . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - L E G A C Y / D C - O S S + c o r e - r u l e s / A G E N T S . m d v 1 8 . # # # [ C O N T R A C T ] - I n p u t : c u r r e n t T D W p h a s e t a b l e , p r e - a c t i o n g u a r d s , g u i d a n c e , a n d d o c s e x p l a i n i n g P h a s e 1 / 2 . - O u t p u t : r e v i s e d r u l e t e x t t h a t t r e a t s t i c k e t c r e a t i o n a s P h a s e 1 , t r e a t s a s i n d e x e d p l a n n i n g e v i d e n c e , a n d a l l o w s e x e c u t i o n t o c o n t i n u e w h e n e x p l i c i t u s e r i n t e n t e x i s t s a n d P h a s e 1 a r t i f a c t s a r e c o m p l e t e . - S i d e e f f e c t s : r u l e / d o c s w o r d i n g u p d a t e s o n l y . # # # [ P A T C H P L A N ] - U p d a t e c o r e - r u l e s / A G E N T S . m d P h a s e 1 / 2 w o r d i n g a n d g u a r d s s o t i c k e t c r e a t i o n i s n o t t r e a t e d a s c o d e m o d i f i c a t i o n . - C l a r i f y t h a t p l a n d o c u m e n t s e x i s t f o r i n d e x e d p l a n n i n g / r e p o r t i n g a n d s h o u l d n o t c a u s e d u p l i c a t e t i c k e t c h u r n . - U p d a t e K o r e a n d o c s t h a t c u r r e n t l y d e s c r i b e P h a s e 1 a s a h a r d p r e - c o d e s t o p . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] R e a d c o n t e x t f i l e s a n d c o n f i r m s c o p e . - [ x ] U p d a t e c o r e T D W p h a s e / g u a r d w o r d i n g . - [ x ] U p d a t e f o c u s e d K o r e a n u s e r d o c s t o m a t c h t h e n e w s e m a n t i c s . - [ x ] R u n m a r k d o w n l i n t a n d r e c o r d r e s u l t s . # # D o n e W h e n - P h a s e 1 i s d e f i n e d a s t i c k e t c r e a t i o n p l u s s t r u c t u r e d p l a n n i n g e v i d e n c e , n o t d u p l i c a t e - t i c k e t p r o d u c t i o n . - E x p l i c i t e x e c u t i o n i n t e n t c a n p r o g r e s s f r o m c o m p l e t e d P h a s e 1 t o P h a s e 2 w i t h o u t a n e x t r a a p p r o v a l r o u n d , e x c e p t f o r h i g h - r i s k g u a r d c a s e s . - M a r k d o w n l i n t p a s s e s f o r c h a n g e d d o c s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 7 - p h a s e 1 - t i c k e t - c r e a t i o n - p l a n - d o c - - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 147 phase1 ticket creation plan doc joy nucb plan

# Execution Plan

## Goal
- Phase 1을 "티켓 생성 + 검색 가능한 계획/보고 기록" 단계로 재정의하고, 코드 수정이 아닌 티켓/계획 작성 때문에 불필요하게 대기하거나 중복 티켓을 만들지 않도록 룰 문구를 정리한다.

## Evidence
- 현재 `core-rules/AGENTS.md`는 Phase 1의 STOP 조건을 "Wait for user approval"로 고정한다.
- 이 때문에 사용자가 "다음티켓", "진행"처럼 실행 의도를 말해도 에이전트가 계획 문서만 채우고 대기한다.
- `legacy split reference`의 목적은 실행 승인 장벽 자체가 아니라, 계획과 판단 근거를 규격화해 RAG 검색과 사후 추적을 쉽게 만드는 것이다.
- 티켓 생성과 계획 문서 작성은 코드 수정이 아니므로, 코드 쓰기 권한과 같은 의미로 취급하면 TDW가 과도하게 느려진다.

## Steps
- [x] `core-rules/AGENTS.md`에서 Phase 1 설명을 티켓 생성/APC/legacy split reference 기록 단계로 정리한다.
- [x] Phase 1 STOP 조건을 "명시 실행 의도가 없으면 확인"으로 바꾸고, 명시 실행 의도가 있으면 Phase 2로 전환할 수 있게 한다.
- [x] `G1.1`, `G1.2`를 코드 쓰기 전 안전장치로 유지하되, 티켓/계획 문서 작성과 코드 수정의 차이를 명확히 한다.
- [x] `docs/principles.ko.md`, `docs/usage-guide.ko.md`, `docs/how-it-works.ko.md` 중 Phase 1/2 의미가 어긋나는 문구를 갱신한다.
- [x] 변경된 markdown 파일 lint를 실행한다.

## Verification
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/147-phase1-ticket-creation-plan-doc--joy-nucb.md `merged into this ticket`

## Expected Outcomes
- "티켓 생성 = Phase 1" 의미가 유지된다.
- `legacy split reference`는 중복 티켓 생산 장치가 아니라 검색 가능한 계획/보고 문서로 설명된다.
- 사용자의 실행 의도가 명확하면 완료된 Phase 1에서 Phase 2로 이어갈 수 있다.
- 생성물 및 고위험 변경에 대한 명시 승인 요구는 유지된다.

## Merged Legacy Document


### 147 phase1 ticket creation plan doc joy nucb report

# Phase 1 Ticket + Plan Semantics Report

## Summary
- Updated `core-rules/AGENTS.md` to v19.
- Clarified Phase 1 as ticket creation plus indexed planning evidence.
- Clarified that ticket/plan docs are not code writes and should not create duplicate ticket churn.
- Allowed explicit user execution intent to continue into Phase 2 once Phase 1 artifacts are complete and linted.

## Files Changed
- `core-rules/AGENTS.md`
- `docs/principles.ko.md`
- `docs/principles.md`
- `docs/usage-guide.ko.md`
- `docs/how-it-works.ko.md`
- `docs/how-it-works.md`
- `.deuk-agent/tickets/sub/147-phase1-ticket-creation-plan-doc--joy-nucb.md`
- `merged into this ticket`

## Verification
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/147-phase1-ticket-creation-plan-doc--joy-nucb.md `merged into this ticket`
- Result: passed.
