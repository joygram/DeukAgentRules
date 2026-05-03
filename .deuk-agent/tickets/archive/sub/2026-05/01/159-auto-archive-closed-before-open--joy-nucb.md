 - - - i d : 1 5 9 - a u t o - a r c h i v e - c l o s e d - b e f o r e - o p e n - - j o y - n u c b t i t l e : a u t o - a r c h i v e - c l o s e d - b e f o r e - o p e n - l i m i t p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : e n s u m m a r y : 오 픈 티 켓 상 한 초 과 시 c l o s e d 계 열 티 켓 은 자 동 아 카 이 브 하 고 o p e n / a c t i v e 정 리 는 사 용 자 결 정 으 로 남 긴 다 p r i o r i t y : P 2 t a g s : - t i c k e t - a r c h i v e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 1 : 3 9 : 2 9 - - - # a u t o - a r c h i v e - c l o s e d - b e f o r e - o p e n - l i m i t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , f o c u s e d t i c k e t c o m m a n d t e s t s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t c r e a t e / a r c h i v e c o m m a n d b e h a v i o r a n d f o c u s e d t e s t s - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d i n i t / r u l e / t e m p l a t e d i s t r i b u t i o n c o d e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : c u r r e n t t i c k e t c r e a t e l i m i t h a n d l i n g a n d a r c h i v e b e h a v i o r - O u t p u t : c l o s e d / c a n c e l l e d / w o n t f i x t i c k e t s a u t o - a r c h i v e d u r i n g c r e a t e , w h i l e o p e n / a c t i v e o v e r - l i m i t h a n d l i n g r e m a i n s u s e r - d e c i s i o n b a s e d - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 159 auto archive closed before open joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 초과 생성 시 open/active 정리는 사용자 결정으로 남기도록 되어 있다. 다만 이미 `closed`, `cancelled`, `wontfix`처럼 완료된 티켓까지 사용자 판단을 요구하면 불필요하게 티켓 저장소가 지저분해진다.

## Source Observations
`scripts/cli-ticket-commands.mjs`에는 수동 아카이브와 같은 파일 이동/지식 증류 헬퍼가 있다. `runTicketCreate`는 새 티켓 생성 후 오픈 티켓 상한 검사를 수행하고, 초과 시 생성물을 롤백한다.

## Cause Hypotheses
완료 상태와 진행 상태를 같은 초과 처리 정책으로 묶으면 자동화 가능한 정리와 사용자 의사결정이 필요한 정리가 구분되지 않는다.

## Decision Rationale
closed 계열 티켓은 생성 직후 자동 아카이브해도 실행 중인 작업 의사결정을 침해하지 않는다. 반면 open/active는 여전히 목록 확인 후 사용자가 선택해야 한다. 따라서 자동 정리는 완료 상태에만 적용하고, 그 뒤에도 오픈/액티브 수가 20개를 넘으면 생성 롤백과 후보 안내를 유지한다.

## Execution Strategy
티켓 생성 흐름에서 상한 검사 전에 closed 계열 엔트리를 자동 아카이브한다. 수동 아카이브와 같은 `archiveTicketEntry`를 재사용해 날짜 그룹 경로를 유지한다. 테스트는 closed 티켓이 자동 아카이브되어 새 티켓 생성이 성공하는 케이스와, open만 20개인 경우 여전히 생성이 차단되는 케이스를 검증한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs`, `node --test scripts/tests/*.test.mjs`, `npx deuk-agent-rule lint:md`를 실행한다.

## Verification Outcome
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` 통과. `node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과.
