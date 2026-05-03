 - - - i d : 1 8 3 - a g e n t - r u l e - b o u n d a r y - h a r d e n i n g - j o y - n u c b t i t l e : a g e n t - r u l e - b o u n d a r y - h a r d e n i n g p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 에 이 전 트 룰 에 서 문 서 경 계 반 복 수 정 과 상 태 전 환 혼 선 을 막 는 규 칙 보 강 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 0 6 : 5 1 - - - # a g e n t - r u l e - b o u n d a r y - h a r d e n i n g > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y a g e n t - r u l e - b o u n d a r y - h a r d e n i n g - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 에 이 전 트 룰 에 서 문 서 경 계 반 복 수 정 과 상 태 전 환 혼 선 을 막 는 규 칙 보 강 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 에 이 전 트 룰 에 서 문 서 경 계 반 복 수 정 과 상 태 전 환 혼 선 을 막 는 규 칙 보 강 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 에 이 전 트 룰 에 서 문 서 경 계 반 복 수 정 과 상 태 전 환 혼 선 을 막 는 규 칙 보 강 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 183 agent rule boundary hardening joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
최근 작업에서 티켓/plan 문서를 반복 수정하게 된 근본 원인은 규칙이 "문서는 계획 기록"이라는 점과 "workflow 상태 정합성"을 너무 가깝게 묶어 놓았기 때문입니다. 그 결과 문서 경계가 한 번 정해진 뒤에도, phase 전환이나 archive 과정에서 다시 손대야 할 것처럼 느껴졌습니다.

이 티켓의 목표는 코드 수정이 아니라 에이전트룰 보강입니다. 특히 다음 혼선을 줄여야 합니다.
- Phase 1 이후에도 legacy split reference/ticket 본문을 반복 갱신하는 습관
- 상태 전환이나 archive가 문서 경계 재수정으로 이어지는 관성
- 내부 workflow event 수집과 문서 기록을 같은 축으로 취급하는 해석

핵심은 "문서 경계는 한 번 정하고, 상태는 별도 이벤트로 기록"하는 분리입니다.

## Source Observations
- [core-rules/AGENTS.md](../../../core-rules/AGENTS.md) 는 Phase 1에서 티켓과 legacy split reference를 채우고, Phase 2에서 실행하라고 요구합니다.
- 같은 문서는 `legacy split reference`에 진행 체크박스를 두지 말고, 티켓만 상태를 가진다고 명시합니다.
- [PROJECT_RULE.md](../../../PROJECT_RULE.md) 는 `scripts/`가 CLI business logic의 소유지라고만 정리하고 있어, 문서 경계의 반복 수정 금지 규칙은 아직 명시되지 않았습니다.
- [scripts/cli.mjs](../../../scripts/cli.mjs) 와 ticket lifecycle 명령은 상태 전환을 수행하지만, 문서 경계를 다시 써야 한다는 규칙은 없습니다.

## Cause Hypotheses
- 규칙이 "Phase 전환 = 문서 업데이트"처럼 오해되기 쉽습니다.
- 상태 전환과 문서 기록의 책임 경계가 분리되어 있지 않습니다.
- 티켓/plan이 같이 움직여야 한다는 압박 때문에, 문서가 작업 로그처럼 반복 수정됩니다.

## Decision Rationale
- 티켓은 identity, scope, contract, lifecycle만 갖고, legacy split reference는 한 번 완성되면 사실상 고정되는 기록으로 다룹니다.
- 상태 변화는 ticket lifecycle event로만 남기고, 문서 내용 재작성은 예외로만 허용합니다.
- 문서 경계가 바뀌어야 하면 기존 티켓을 계속 덧칠하지 말고 새 티켓을 여는 쪽이 더 안전합니다.

## Execution Strategy
- core rules에 "Phase 1 이후 티켓/legacy split reference 반복 수정 금지" 조항을 추가합니다.
- `ticket close`, `ticket archive`, `ticket move`는 상태 전환 기록이지만, 문서 경계를 다시 여는 면허가 아니라는 점을 명시합니다.
- 문서 수정이 필요한 경우를 "legacy split reference의 사실 오류 수정"과 "새 요구사항"으로 나누고, 후자는 새 티켓으로 강제합니다.
- 내부 workflow event 수집은 문서 경계 보강과 별개로 두어, 상태 추적과 문서 수정이 뒤섞이지 않게 합니다.

## Verification Design
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/183-agent-rule-boundary-hardening-joy-nucb.md `merged into this ticket` 로 Phase 1 문서 검증을 통과시킵니다.
- 규칙 수정 후에는 ticket/plan 반복 수정 금지와 새 티켓 분리 규칙이 문서에 명확히 드러나는지 확인합니다.
- 후속 구현이 있다면 `core-rules/AGENTS.md`와 `PROJECT_RULE.md`에 동일한 의미의 조항이 맞물리게 적용합니다.

## Verification Outcome
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md PROJECT_RULE.md`: passed.
