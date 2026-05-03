 - - - i d : 1 4 5 - d e u k p a c k - m i s s i n g - i m p l e m e n t a t i o n - j o y - n u c b t i t l e : D e u k P a c k - m i s s i n g - i m p l e m e n t a t i o n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k 누 락 구 현 범 위 를 확 인 하 고 실 행 가 능 한 구 현 계 획 을 수 립 한 다 . p r i o r i t y : P 2 t a g s : - t i c k e t - p h a s e 1 - d e u k p a c k c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 9 : 2 5 : 2 9 - - - # D e u k P a c k - m i s s i n g - i m p l e m e n t a t i o n > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s , s c r i p t s / c l i - a r g s . m j s , s c r i p t s / t e s t s / - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d o c s / a r c h i t e c t u r e . m d , s c r i p t s / c l i . m j s , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s - * * D e s i g n R a t i o n a l e : * * - - s u b m o d u l e < n a m e > i s d o c u m e n t e d a n d p a r s e d , b u t t i c k e t s e l e c t i o n p a t h s s u c h a s t i c k e t n e x t a n d s h a r e d t i c k e t p i c k i n g d o n o t c o n s i s t e n t l y h o n o r i t . D e u k P a c k - s c o p e d w o r k f l o w s t h e r e f o r e c a n s e l e c t u n r e l a t e d a c t i v e / o p e n t i c k e t s . - * * C o n s t r a i n t s : * * K e e p b i n / d e u k - a g e n t - r u l e . j s p r o x y u n t o u c h e d . D o n o t e d i t g e n e r a t e d c o n s u m e r s p o k e s o r d i s t r i b u t e d o u t p u t s . P r e s e r v e e x i s t i n g d e f a u l t b e h a v i o r w h e n n o p r o j e c t / s u b m o d u l e f i l t e r i s s u p p l i e d . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s , s c r i p t s / c l i - a r g s . m j s , f o c u s e d t e s t s u n d e r s c r i p t s / t e s t s / , a n d t h i s t i c k e t / p l a n d o c u m e n t a t i o n . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , c o n s u m e r . c u r s o r / r u l e s / s p o k e s , c o n s u m e r A G E N T S . m d o u t p u t s , b i n / d e u k - a g e n t - r u l e . j s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - L E G A C Y / D C - O S S + c o r e - r u l e s / A G E N T S . m d v 1 9 . # # # [ C O N T R A C T ] - I n p u t : t i c k e t i n d e x e n t r i e s c o n t a i n i n g p r o j e c t , s u b m o d u l e , s t a t u s , c r e a t e d A t , t o p i c , a n d i d ; C L I o p t i o n s p a r s e d f r o m t i c k e t n e x t , t i c k e t u s e , a n d r e l a t e d t i c k e t c o m m a n d s . - O u t p u t : f i l t e r e d t i c k e t s e l e c t i o n t h a t h o n o r s - - s u b m o d u l e D e u k P a c k a n d e x i s t i n g - - p r o j e c t s e m a n t i c s w h e r e a p p l i c a b l e , w i t h r e g r e s s i o n c o v e r a g e f o r d e f a u l t a n d f i l t e r e d s e l e c t i o n . - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d s c r i p t / t e s t c h a n g e s o n l y . # # # [ P A T C H P L A N ] - A d d a s m a l l s h a r e d f i l t e r h e l p e r f o r t i c k e t e n t r i e s t h a t a p p l i e s o p t s . p r o j e c t a n d o p t s . s u b m o d u l e w i t h o u t c h a n g i n g u n f i l t e r e d b e h a v i o r . - U p d a t e p i c k T i c k e t E n t r y a n d r u n T i c k e t N e x t t o u s e t h e f i l t e r b e f o r e s e l e c t i n g b y t o p i c , a c t i v e / o p e n s t a t e , o r c r e a t e d t i m e . - A d d f o c u s e d n o d e t e s t c o v e r a g e f o r p i c k T i c k e t E n t r y a n d t i c k e t n e x t - - s u b m o d u l e D e u k P a c k s e l e c t i o n b e h a v i o r . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] I m p l e m e n t s c o p e d t i c k e t - e n t r y f i l t e r i n g f o r p r o j e c t a n d s u b m o d u l e . - [ x ] W i r e t h e f i l t e r i n t o p i c k T i c k e t E n t r y a n d r u n T i c k e t N e x t . - [ x ] A d d r e g r e s s i o n t e s t s f o r D e u k P a c k - s c o p e d n e x t - t i c k e t s e l e c t i o n . - [ x ] R u n m a r k d o w n l i n t a n d n o d e t e s t s . # # D o n e W h e n - n p x d e u k - a g e n t - r u l e t i c k e t n e x t - - s u b m o d u l e D e u k P a c k - - p a t h - o n l y s e l e c t s t h e f i r s t a c t i v e / o p e n D e u k P a c k t i c k e t i n s t e a d o f a n u n r e l a t e d g l o b a l t i c k e t . - E x i s t i n g u n f i l t e r e d t i c k e t n e x t b e h a v i o r i s p r e s e r v e d . - n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s p a s s e s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 5 - d e u k p a c k - m i s s i n g - i m p l e m e n t a t i o n - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 145 deukpack missing implementation joy nucb plan

# Execution Plan

## Goal
- `ticket next --submodule DeukPack`가 DeukPack 범위의 active/open 티켓을 선택하도록 누락된 필터 구현을 보완한다.

## Evidence
- `scripts/cli-args.mjs`는 `--submodule`과 `--project`를 파싱한다.
- `scripts/cli.mjs` 도움말은 `--submodule <name>`을 티켓 옵션으로 노출한다.
- `scripts/cli-ticket-commands.mjs`의 `runTicketList`는 `project/submodule` 필터를 적용하지만, `pickTicketEntry`와 `runTicketNext`는 현재 필터 없이 전체 인덱스에서 선택한다.
- `PROJECT_RULE.md`에 따라 CLI 비즈니스 로직은 `scripts/`에서 수정하고 `bin/deuk-agent-rule.js`는 수정하지 않는다.

## Steps
- [x] `scripts/cli-ticket-commands.mjs`에 티켓 엔트리 필터 헬퍼를 추가하거나 기존 선택 로직에 동등한 필터를 적용한다.
- [x] `pickTicketEntry(opts, indexJson)`가 `opts.project`와 `opts.submodule`을 먼저 반영한 뒤 topic/id/latest 선택을 수행하도록 변경한다.
- [x] `runTicketNext(opts)`가 필터링된 목록에서 active 우선, 없으면 open 우선, 생성일 오름차순 선택을 유지하도록 변경한다.
- [x] `scripts/tests/`에 기본 선택 동작과 `--submodule DeukPack` 필터 동작을 검증하는 회귀 테스트를 추가한다.
- [x] 결과가 기존 `ticket list` 필터와 충돌하지 않는지 확인한다.

## Verification
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/145-deukpack-missing-implementation-joy-nucb.md `merged into this ticket`
- [x] 임시 fixture 기반 `runTicketNext({ submodule: "DeukPack", pathOnly: true })` 테스트로 DeukPack 티켓 선택을 확인한다.

## Expected Outcomes
- `--submodule` 또는 `--project`가 없으면 기존 next/use/archive 계열 선택 의미가 유지된다.
- `--submodule DeukPack`가 있으면 DeukPack 티켓만 후보가 된다.
- 필터 결과가 없을 때는 명확한 “no matching entry” 또는 “No active or open tickets” 계열 오류가 발생한다.

## Merged Legacy Document


### 145 deukpack missing implementation joy nucb report

# DeukPack Ticket Selection Report

## Summary
- Added scoped ticket-entry filtering for `project` and `submodule`.
- Applied the filter to `pickTicketEntry` and `runTicketNext`.
- Added regression tests for DeukPack-scoped selection and unfiltered active-first behavior.

## Files Changed
- `scripts/cli-ticket-commands.mjs`
- `scripts/tests/cli-ticket-commands.test.mjs`

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/145-deukpack-missing-implementation-joy-nucb.md `merged into this ticket`
- Result: passed.

## Notes
- The existing ArchitectureGuard test suite still prints a shell warning from its grep helper, but all node tests pass.
