 - - - i d : 1 5 8 - t i c k e t - o p e n - l i m i t - d e c i s i o n - f l o w - j o y - n u c b t i t l e : t i c k e t - o p e n - l i m i t - d e c i s i o n - f l o w p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : e n s u m m a r y : 오 픈 티 켓 2 0 개 초 과 시 자 동 아 카 이 브 하 지 않 고 목 록 확 인 후 사 용 자 가 정 리 결 정 을 하 게 한 다 p r i o r i t y : P 2 t a g s : - t i c k e t - a r c h i v e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 1 : 3 6 : 1 9 - - - # t i c k e t - o p e n - l i m i t - d e c i s i o n - f l o w > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , f o c u s e d t i c k e t c o m m a n d t e s t s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t c r e a t e / a r c h i v e c o m m a n d b e h a v i o r a n d f o c u s e d t e s t s - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d i n i t / r u l e / t e m p l a t e d i s t r i b u t i o n c o d e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : c u r r e n t t i c k e t c r e a t e l i m i t h a n d l i n g a n d m a n u a l a r c h i v e b e h a v i o r - O u t p u t : o p e n t i c k e t l i m i t e n f o r c e m e n t t h a t b l o c k s e x c e s s c r e a t i o n a n d p r i n t s d e c i s i o n - o r i e n t e d l i s t g u i d a n c e i n s t e a d o f a u t o - a r c h i v i n g - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 158 ticket open limit decision flow joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
직전 구현은 20개 초과 시 가장 오래된 오픈 티켓을 자동 아카이브한다. 사용자는 자동 정리가 아니라 티켓 목록을 보고 정리 대상을 직접 판단하기를 원한다. 티켓은 작업 맥락과 의사결정 기록이므로, CLI가 임의로 보관 상태를 바꾸면 사용자의 우선순위 판단을 건너뛸 위험이 있다.

## Source Observations
직전 구현의 `scripts/cli-ticket-commands.mjs`는 티켓 생성 후 자동 정리 함수를 호출해 대상 파일을 이동하고 인덱스를 변경했다. `runTicketArchive`의 날짜 그룹 아카이브 경로는 수동 보관 흐름에 필요하므로 유지해야 한다. 테스트에는 자동 아카이브 동작을 기대하는 케이스가 추가되어 있었다.

## Cause Hypotheses
오픈 티켓 수 제한과 문서 정리를 같은 자동 동작으로 묶어버린 것이 문제다. 제한 정책은 필요하지만, 정리 대상 선택은 사용자의 업무 판단이 들어가야 한다.

## Decision Rationale
`ticket create`는 새 티켓 파일을 만든 뒤 오픈/액티브 수를 검사한다. 20개를 초과하면 생성된 새 티켓을 롤백하고, 오래된 후보 목록과 `ticket list`/`ticket archive` 명령을 안내하며 실패한다. 이렇게 하면 오픈 티켓은 20개를 넘지 않고, 정리 대상 선택은 사용자가 목록을 확인한 뒤 결정한다. 수동 `ticket archive`의 년월/일 그룹 보관 기능은 유지한다.

## Execution Strategy
자동 아카이브 헬퍼를 초과 검사/메시지 생성 헬퍼로 바꾼다. 생성 흐름에서는 인덱스 추가 후 초과 여부를 검사하고, 초과면 방금 만든 티켓 파일과 legacy split reference를 제거한 뒤 인덱스를 이전 상태로 되돌리고 오류를 던진다. 테스트는 자동 이동 기대를 제거하고, 21번째 생성이 실패하며 후보 목록과 정리 명령을 안내하는지 검증한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs`로 집중 검증하고, 이후 `node --test scripts/tests/*.test.mjs`와 `npx deuk-agent-rule lint:md`를 실행한다.

## Verification Outcome
`node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` 통과. `node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과.
