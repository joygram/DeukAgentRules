 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 4 0 1 : 1 7 : 0 1 i d : 0 6 3 - f o r c e - r u l e - a p p r o v a l - g a t e - j o y - n u c b p r i o r i t y : P 2 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : o p e n s u b m o d u l e : D e u k A g e n t R u l e s s u m m a r y : " T a r g e t S u b m o d u l e : D e u k A g e n t R u l e s - D e u k A g e n t R u l e s / g e m i n i . m d - D e u k A g e n t R u l e s / A G E N T S . m d " t a g s : r a g , m c p , t i c k e t s , t e s t i n g t i t l e : f o r c e - r u l e - a p p r o v a l - g a t e - - - # [ E x e c u t i o n ] T a s k : f o r c e - r u l e - a p p r o v a l - g a t e | I D : 0 6 3 - f o r c e - r u l e - a p p r o v a l - g a t e - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > Y o u a r e o p e r a t i n g w i t h i n a l o c k e d m u l t i - m o d u l e m o n o r e p o . > 1 . R e s t r i c t a b s o l u t e l y a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * [ T a r g e t S u b m o d u l e ] * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * [ C o n t e x t F i l e s ] * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r s u b m o d u l e s . # # � � S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * D e u k A g e n t R u l e s - * * C o n t e x t F i l e s : * * - D e u k A g e n t R u l e s / g e m i n i . m d - D e u k A g e n t R u l e s / A G E N T S . m d - D e u k A g e n t R u l e s / s c r i p t s / c l i . m j s - D e u k A g e n t R u l e s / s c r i p t s / c l i - i n i t - c o m m a n d s . m j s - D e u k A g e n t R u l e s / s c r i p t s / c l i - u t i l s . m j s - D e u k A g e n t R u l e s / s c r i p t s / m e r g e - l o g i c . m j s - D e u k A g e n t R u l e s / s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s # # � � F i l e s t o M o d i f y - D e u k A g e n t R u l e s / s c r i p t s / c l i - u t i l s . m j s : a d d e x p l i c i t w o r k f l o w / a p p r o v a l s t a t e a n d s t o p t r e a t i n g u n a p p r o v e d e x e c u t i o n a s i m p l i c i t w r i t e p e r m i s s i o n . - D e u k A g e n t R u l e s / s c r i p t s / c l i - i n i t - c o m m a n d s . m j s : g a t e i n i t / m e r g e w r i t e p a t h s b e h i n d a p p r o v a l s t a t e a n d p e r s i s t t h e s e l e c t e d w o r k f l o w m o d e . - D e u k A g e n t R u l e s / s c r i p t s / m e r g e - l o g i c . m j s : s p l i t p r e p a r a t i o n f r o m m u t a t i o n s o p l a n m o d e c a n n o t w r i t e w i t h o u t a p p r o v a l . - D e u k A g e n t R u l e s / s c r i p t s / c l i . m j s : e x p o s e a p p r o v a l - o r i e n t e d C L I s u r f a c e a n d h e l p t e x t . - D e u k A g e n t R u l e s / A G E N T S . m d : a l i g n t h e d o c u m e n t e d w o r k f l o w w i t h t h e e n f o r c e d a p p r o v a l g a t e . - D e u k A g e n t R u l e s / g e m i n i . m d : a l i g n t h e I D E - f a c i n g w o r k f l o w w i t h t h e e n f o r c e d a p p r o v a l g a t e . # # � � ️ D e s i g n D e c i s i o n s ( R e f e r t o P l a n ) - A p p r o v a l i s a f i r s t - c l a s s r u n t i m e s t a t e , n o t a d o c u m e n t a t i o n c o n v e n t i o n . - P r e p a r a t i o n a n d m u t a t i o n m u s t b e s e p a r a t e p a t h s . - D e f a u l t b e h a v i o r i n u n a p p r o v e d p l a n m o d e m u s t b e a d v i s o r y - o n l y . - E x i s t i n g t i c k e t a n d r u l e d o c u m e n t s r e m a i n t h e s o u r c e o f t r u t h f o r a p p r o v a l s t a t e . # # � � S t r i c t C o n s t r a i n t s ( R u l e s t o n e v e r b r e a k ) - N o s i l e n t f a l l b a c k f r o m p l a n m o d e t o w r i t e m o d e . - N o d e s t r u c t i v e o v e r w r i t e o f t i c k e t c o n t e n t s o r r u l e d o c u m e n t s . - K e e p C L I o u t p u t d e t e r m i n i s t i c a n d c o n c i s e . - P r e s e r v e e x i s t i n g t i c k e t c r e a t i o n a n d r e t r i e v a l f l o w s . # # � � P h a s e d E x e c u t i o n S t e p s > A g e n t : D o N O T a t t e m p t t o d o P h a s e 3 b e f o r e P h a s e 1 i s f u l l y t e s t e d . 0 . [ P h a s e 0 > R A G R e s e a r c h ( M C P ) ] - [ x ] m c p _ d e u k r a g _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ x ] m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ x ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : D e u k A g e n t R u l e s 의 g e m i n i . m d 는 P h a s e 1 에 서 티 켓 생 성 후 승 인 대 기 를 요 구 하 지 만 , c l i - u t i l s . m j s 와 m e r g e - l o g i c . m j s 의 현 재 기 본 경 로 는 a g e n t s M o d e = i n j e c t 라 승 인 상 태 를 강 제 하 지 않 습 니 다 . 따 라 서 p l a n m o d e 와 a p p r o v a l b o u n d a r y 는 문 서 상 존 재 할 뿐 r u n t i m e g a t e 가 없 습 니 다 . - [ x ] ( R A G M i s s 시 필 수 작 성 ) 로 컬 검 색 결 과 m c p _ d e u k r a g _ a d d _ k n o w l e d g e 도 구 로 즉 시 주 입 완 료 여 부 및 주 입 된 파 일 목 록 : R A G M i s s 아 님 . 0 . 5 [ P h a s e 0 . 5 > D e e p A n a l y s i s ( O p t i o n a l ) ] - [ x ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 - A n a l y s i s r e s u l t : a p p r o v a l g a t e m u s t b e r e p r e s e n t e d a s a r u n t i m e s t a t e a n d n o t o n l y a s a r u l e d o c u m e n t . 1 . [ P h a s e 1 > S e t u p / P a r s i n g ] - [ x ] C u r r e n t w o r k f l o w s t a t e s m a p p e d : p l a n , a p p r o v a l p e n d i n g , a p p r o v e d e x e c u t i o n . - [ x ] E n f o r c e m e n t s u r f a c e i d e n t i f i e d : i n i t , m e r g e , s h a r e d a g e n t m e r g e l o g i c , a n d C L I h e l p . 2 . [ P h a s e 2 > C o r e L o g i c C h a n g e ] - [ x ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 - [ x ] I n t r o d u c e e x p l i c i t a p p r o v a l - a w a r e w o r k f l o w s t a t e i n c o n f i g l o a d i n g a n d p e r s i s t e n c e . - [ x ] S p l i t a d v i s o r y p r e p a r a t i o n f r o m w r i t e e x e c u t i o n i n a p p l y A g e n t s ( ) a n d r e l a t e d i n i t / m e r g e f l o w s . - [ x ] A d d a C L I a p p r o v a l b o u n d a r y s o p l a n m o d e c a n c o m p l e t e p r e p a r a t i o n w i t h o u t m u t a t i n g f i l e s . - [ x ] U p d a t e d o c u m e n t a t i o n s t r i n g s s o t h e e n f o r c e d b e h a v i o r m a t c h e s t h e w o r k f l o w c o n t r a c t . 3 . [ P h a s e 3 > C l e a n u p / V e r i f i c a t i o n ] - [ x ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ x ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | L e g a c y c o n f i g n o r m a l i z a t i o n | L o w | E x i s t i n g c o n f i g f i l e s w i t h o u t w o r k f l o w M o d e n o w n o r m a l i z e t o p l a n m o d e , s o w r i t e - s i d e c o m m a n d s r e q u i r e e x p l i c i t - - w o r k f l o w e x e c u t e o r - - a p p r o v a l a p p r o v e d . | D o c u m e n t e d i n A G E N T S . m d , g e m i n i . m d , a n d C L I h e l p ; k e e p t h i s a s a n i n t e n t i o n a l e n f o r c e m e n t b o u n d a r y . | 4 . [ P h a s e 4 > F o l l o w - u p C h a i n i n g ( M A N D A T O R Y i f i s s u e s e x i s t ) ] - [ x ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 에 대 해 별 도 티 켓 발 행 완 료 > C L I C o m m a n d E x a m p l e : d e u k - a g e n t - r u l e t i c k e t c r e a t e - - t o p i c 0 4 8 - F 1 - f i x - i s s u e - - c h a i n - - g r o u p < g r o u p > - [ x ] ( 필 수 작 성 ) 발 행 된 후 속 티 켓 번 호 리 스 트 : n o n e # # ✅ V e r i f i c a t i o n / Q A - [ x ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ x ] * * P o t e n t i a l I s s u e s C h e c k * * : a p p r o v a l g a t e m i s f i r e , c o n f i g m i g r a t i o n , C L I h e l p d r i f t , w r i t e - p a t h r e g r e s s i o n . - [ x ] * * S t r i c t C o n s t r a i n t s A u d i t * * : N o s i l e n t e x e c u t i o n f a l l b a c k , n o t i c k e t m u t a t i o n , n o d e s t r u c t i v e o v e r w r i t e . - [ x ] n p m r u n t e s t 또 는 관 련 검 증 명 령 실 행 결 과 확 인 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 0 6 3 - f o r c e - r u l e - a p p r o v a l - g a t e - j o y - n u c b - r e p o r t . m d ) # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 063 force rule approval gate joy nucb plan

# Plan: force-rule-approval-gate

## Summary
- 목적: plan mode와 execution mode를 분리하고, 승인 전에는 rule injection과 file mutation이 진행되지 않도록 강제하는 workflow gate를 추가합니다.
- 범위: `DeukAgentRules` CLI, merge/init flow, workflow documentation, and approval-state persistence.
- 비범위: ticket storage format 변경, unrelated submodule refactor, external agent product redesign.

## Current Gaps
- `agentsMode`는 현재 `inject`가 기본값이라 승인 없이도 write 경로로 흐를 수 있습니다.
- `applyAgents()`는 skip/overwrite 외에는 advisory-only 분기가 없습니다.
- 문서에는 `STOP & WAIT`가 있지만 런타임에서 승인 조건을 강제하지 않습니다.

## Design Decisions
- Approval is a first-class runtime state, not a documentation convention.
- Preparation and mutation must be separated.
- Default behavior in unapproved plan mode should be advisory-only.
- CLI help and config persistence must reflect the enforced workflow.

## Implementation Plan
1. Add explicit approval/workflow state to config loading and persistence.
2. Change init/merge paths so they can prepare output without mutating files when approval is missing.
3. Add a CLI-visible approval boundary and update help text.
4. Align workflow docs and AGENTS guidance with the runtime gate.

## Verification Plan
- Run the CLI smoke path for init/merge in approved and unapproved states.
- Verify that plan mode does not write files before approval.
- Verify that approved mode still preserves existing ticket/template behavior.
- Run the relevant test command for the package and inspect the output.

## Risks
- Existing automation may assume inject-by-default behavior and need migration handling.
- Approval state persistence may conflict with older config files if not normalized carefully.
- CLI users may rely on the previous implicit write path and need updated docs.

## Acceptance Criteria
- Plan mode can prepare context without mutating files.
- Mutation is blocked until approval is explicit.
- Documentation matches runtime behavior.
- Existing ticket create/use flows remain intact.

## Merged Legacy Document


### 063 force rule approval gate joy nucb report

# Completion Report: force-rule-approval-gate

## Summary
- `init` and `merge` now treat plan mode as non-executable unless the caller passes `--workflow execute` or `--approval approved`.
- `workflowMode` and `approvalState` are persisted in `.deuk-agent/config.json`.
- CLI help and agent-facing docs now describe the plan/execute boundary.

## Verification
- `node --check` passed for:
  - `scripts/cli-utils.mjs`
  - `scripts/cli-args.mjs`
  - `scripts/cli-prompts.mjs`
  - `scripts/cli-init-commands.mjs`
  - `scripts/cli.mjs`
- Smoke tests:
  - `merge --non-interactive` is blocked in plan mode.
  - `merge --workflow execute --dry-run --non-interactive` proceeds as a dry-run.
- `mcp_deukrag_synthesize_knowledge` confirmed the new gate matches the recorded workflow design.

## Risks
- Legacy configs without `workflowMode` now normalize to plan mode. Existing automation needs an explicit execute flag.
- `init` persists workflow state in config even when the workspace remains in plan mode.

## Follow-up
- No immediate follow-up ticket was required after verification.
