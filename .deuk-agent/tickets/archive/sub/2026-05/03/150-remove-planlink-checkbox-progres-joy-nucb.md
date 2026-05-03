 - - - i d : 1 5 0 - r e m o v e - - c h e c k b o x - p r o g r e s - j o y - n u c b t i t l e : r e m o v e - - c h e c k b o x - p r o g r e s s p h a s e : 4 s t a t u s : c l o s e d s u b m o d u l e : D e u k A g e n t R u l e s p r o j e c t : D e u k A g e n t R u l e s d o c s L a n g u a g e : k o s u m m a r y : 에 서 진 행 체 크 박 스 를 제 거 하 고 티 켓 만 진 행 상 태 를 소 유 하 도 록 규 칙 , 생 성 초 안 , 테 스 트 를 개 선 한 다 . p r i o r i t y : P 1 t a g s : - r u l e s - p r o g r e s s c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 3 : 2 7 : 5 0 - - - # r e m o v e - - c h e c k b o x - p r o g r e s s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , f o c u s e d T D W d o c s . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , d o c s / p r i n c i p l e s . k o . m d , d o c s / u s a g e - g u i d e . k o . m d - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , f o c u s e d d o c s , t h i s t i c k e t / p l a n . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , c o n s u m e r s p o k e s , c o n s u m e r A G E N T S . m d , b i n / d e u k - a g e n t - r u l e . j s , u n r e l a t e d C L I i m p l e m e n t a t i o n . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - L E G A C Y / D C - O S S + c o r e - r u l e s / A G E N T S . m d v 2 1 . # # # [ C O N T R A C T ] - I n p u t : c u r r e n t a n a l y s i s g e n e r a t o r , T D W r u l e s , a n d d o c s . - O u t p u t : d r a f t w i t h o u t p r o g r e s s c h e c k b o x e s ; t i c k e t r e m a i n s t h e o n l y p r o g r e s s c h e c k l i s t o w n e r . - S i d e e f f e c t s : s c o p e d r u l e / d o c s / t e s t u p d a t e s o n l y . # # # [ P A T C H P L A N ] - R e m o v e c h e c k l i s t s y n t a x f r o m g e n e r a t e d a n a l y s i s s e c t i o n s . - C l a r i f y i n r u l e s / d o c s t h a t p r o g r e s s c h e c k b o x e s b e l o n g t o t i c k e t s , n o t . - A d d r e g r e s s i o n c o v e r a g e t h a t g e n e r a t e d c o n t a i n s n o m a r k d o w n c h e c k b o x e s . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] U p d a t e r u l e / d o c s t o s e p a r a t e t i c k e t p r o g r e s s f r o m a n a l y s i s . - [ x ] R e m o v e g e n e r a t e d c h e c k b o x p r o m p t s . - [ x ] A d d r e g r e s s i o n c o v e r a g e a n d r u n v e r i f i c a t i o n . # # D o n e W h e n - G e n e r a t e d d r a f t s c o n t a i n n o [ ] o r [ x ] c h e c k b o x s y n t a x . - T i c k e t r e m a i n s t h e p r o g r e s s c h e c k l i s t o w n e r . - M a r k d o w n l i n t / t e s t s p a s s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 5 0 - r e m o v e - - c h e c k b o x - p r o g r e s - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 150 remove legacy split reference checkbox progres joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 legacy split reference 초안은 분석 섹션을 갖고 있지만 각 섹션이 체크박스 한 줄로 되어 있다. 실행 후 한 번에 체크하면 진행 추적 의미가 없고, 티켓의 lifecycle checklist와 역할이 다시 겹친다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `ensurePlanDraftFile`가 legacy split reference 섹션마다 `- [ ]` 프롬프트를 생성한다.
- `core-rules/AGENTS.md`는 ticket/legacy split reference 소유권을 나누지만, 체크박스 소유권은 명시하지 않는다.
- `scripts/tests/cli-ticket-commands.test.mjs`는 분석 섹션 존재만 확인하고 체크박스 부재를 검증하지 않는다.

## Cause Hypotheses
- legacy split reference가 분석 문서로 재정의됐지만, 생성 초안이 여전히 진행 체크리스트 문법을 사용한다.
- 체크박스 업데이트를 사후 일괄 처리하면 상태 신호가 아니라 noise가 된다.

## Decision Rationale
진행 상태는 티켓에만 둔다. legacy split reference는 체크 가능한 작업 목록 대신 서술형 분석 프롬프트를 제공한다. 이렇게 하면 legacy split reference가 문제 이해와 결정 근거를 담고, 티켓은 실행 상태를 담는 구조가 유지된다.

## Execution Strategy
1. `core-rules/AGENTS.md`에 legacy split reference 체크박스 금지와 티켓 진행 소유권을 명시한다.
2. `ensurePlanDraftFile`의 `- [ ]` 프롬프트를 서술형 문장으로 바꾼다.
3. legacy split reference 생성 테스트에 checkbox 부재 assertion을 추가한다.
4. 관련 사용자 문서의 legacy split reference 설명을 상태 추적이 아닌 분석/판단 기록으로 맞춘다.

## Verification Design
- `node --test scripts/tests/*.test.mjs`: 생성 legacy split reference에 분석 섹션이 있고 체크박스가 없어야 한다.
- `npx deuk-agent-rule lint:md ...`: 변경된 룰/문서/티켓/legacy split reference markdown이 통과해야 한다.
- Residual risk: 기존에 이미 생성된 legacy split reference의 체크박스는 마이그레이션 범위 밖이다.

## Merged Legacy Document


### 150 remove legacy split reference checkbox progres joy nucb report

# Remove legacy split reference Progress Checkboxes

## Summary
- Updated `core-rules/AGENTS.md` to v22.
- Clarified that tickets own progress checkboxes and lifecycle status.
- Clarified that legacy split reference is prose analysis and decision trace, not a progress checklist.
- Removed generated `[ ]` prompts from legacy split reference drafts.
- Added regression coverage that generated legacy split reference drafts contain no markdown checkbox syntax.

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/150-remove-legacy split reference-checkbox-progres-joy-nucb.md `merged into this ticket`
- Result: passed.

## Notes
- Existing ArchitectureGuard tests still print a shell warning from their grep helper, but all node tests pass.
