 - - - i d : 1 4 8 - t i c k e t - p l a n - n o n - d u p l i c a t i o n - j o y - n u c b t i t l e : t i c k e t - p l a n - n o n - d u p l i c a t i o n p h a s e : 4 s t a t u s : c l o s e d s u b m o d u l e : D e u k A g e n t R u l e s p r o j e c t : D e u k A g e n t R u l e s d o c s L a n g u a g e : k o s u m m a r y : 티 켓 과 기 획 문 서 의 역 할 을 분 리 해 중 복 내 용 을 금 지 하 고 , 각 각 계 약 / 실 행 근 거 로 검 색 신 호 를 나 누 도 록 규 칙 과 템 플 릿 을 정 리 한 다 . p r i o r i t y : P 1 t a g s : - r u l e s - t i c k e t c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 3 : 1 4 : 1 0 - - - # t i c k e t - p l a n - n o n - d u p l i c a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , f o c u s e d T D W d o c s . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d o c s / p r i n c i p l e s . k o . m d , d o c s / u s a g e - g u i d e . k o . m d , d o c s / h o w - i t - w o r k s . k o . m d - * * D e s i g n R a t i o n a l e : * * 티 켓 과 가 같 은 s u m m a r y / s t e p s 를 반 복 하 면 R A G 검 색 신 호 가 흐 려 지 고 , 에 이 전 트 가 티 켓 / 기 획 문 서 를 중 복 산 출 물 로 오 해 한 다 . - * * C o n s t r a i n t s : * * 생 성 물 은 수 정 하 지 않 는 다 . 티 켓 은 계 약 / 경 계 , 는 근 거 / 실 행 / 검 증 을 맡 도 록 역 할 을 분 리 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , f o c u s e d d o c s u n d e r d o c s / , t h i s t i c k e t / p l a n . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , c o n s u m e r . c u r s o r / r u l e s / , c o n s u m e r A G E N T S . m d , b i n / d e u k - a g e n t - r u l e . j s , u n r e l a t e d C L I i m p l e m e n t a t i o n . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - L E G A C Y / D C - O S S + c o r e - r u l e s / A G E N T S . m d v 1 9 . # # # [ C O N T R A C T ] - I n p u t : c u r r e n t P h a s e 1 r u l e s , t i c k e t t e m p l a t e , p l a n d r a f t g e n e r a t o r , a n d u s e r - f a c i n g T D W d o c s . - O u t p u t : n o n - o v e r l a p r u l e : t i c k e t o w n s i d e n t i t y / s c o p e / A P C ; o w n s e v i d e n c e / s t e p s / v e r i f i c a t i o n . - S i d e e f f e c t s : s c o p e d r u l e / t e m p l a t e / d o c s u p d a t e s o n l y . # # # [ P A T C H P L A N ] - U p d a t e c o r e r u l e s t o f o r b i d d u p l i c a t e d t i c k e t / p l a n c o n t e n t a n d r e q u i r e r e p l a c e m e n t w i t h c r o s s - r e f e r e n c e s . - U p d a t e t i c k e t t e m p l a t e s o i t d o e s n o t i n c l u d e d e t a i l e d e x e c u t i o n e v i d e n c e o r d u p l i c a t e p l a n s t e p s . - U p d a t e p l a n d r a f t g e n e r a t o r s o g e n e r a t e d p l a n s d o n o t r e p e a t t i c k e t s u m m a r y / A P C a n d i n s t e a d h o l d e v i d e n c e , i m p l e m e n t a t i o n s t e p s , a n d v e r i f i c a t i o n . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] U p d a t e c o r e r u l e w o r d i n g f o r n o n - o v e r l a p . - [ x ] U p d a t e t i c k e t t e m p l a t e a n d g e n e r a t e d p l a n d r a f t s h a p e . - [ x ] U p d a t e d o c s t h a t d e s c r i b e / A P C r o l e s . - [ x ] R u n m a r k d o w n l i n t a n d n o d e t e s t s . # # D o n e W h e n - T i c k e t a n d h a v e d i s t i n c t r e s p o n s i b i l i t i e s . - G e n e r a t e d t i c k e t / p l a n d r a f t s a v o i d r e p e a t i n g t h e s a m e s u m m a r y / s t e p s . - M a r k d o w n l i n t a n d r e l e v a n t n o d e t e s t s p a s s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 8 - t i c k e t - p l a n - n o n - d u p l i c a t i o n - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 148 ticket plan non duplication joy nucb report

# Ticket And Legacy split reference Non-Duplication Report

## Summary
- Updated `core-rules/AGENTS.md` to v20.
- Defined ticket ownership as identity, scope, constraints, APC, and lifecycle checklist.
- Defined legacy split reference ownership as evidence, decision notes, concrete execution steps, and verification evidence.
- Updated the ticket template and plan draft generator to avoid repeating ticket summary/APC in legacy split reference.
- Added a regression test for non-duplicative ticket/legacy split reference generation.

## Verification
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/148-ticket-plan-non-duplication-joy-nucb.md `merged into this ticket`
- Result: passed.

## Notes
- Existing ArchitectureGuard tests still print a shell warning from their grep helper, but the node test run passes.

## Merged Legacy Document


### 148 ticket plan non duplication joy nucb plan

# Planning Evidence

## Ticket Contract Pointer
- 경계, 금지 영역, 산출 계약은 linked ticket의 APC가 소유한다.
- 이 문서는 같은 내용을 반복하지 않고 근거, 구현 순서, 검증 증거만 기록한다.

## Evidence
- 현재 티켓 템플릿은 Scope/APC/Tasks를 생성하고, legacy split reference 초안은 Goal/Steps/Verification을 생성한다.
- CLI의 legacy split reference 초안은 티켓 summary를 frontmatter와 Goal에 반복한다.
- 사용자는 티켓과 기획문서 사이에 중복 내용이 없어야 한다고 명시했다.

## Steps
- [x] `core-rules/AGENTS.md`에 티켓/legacy split reference 소유권 분리를 명시한다.
- [x] `templates/TICKET_TEMPLATE.md`에서 상세 실행 절차가 legacy split reference로 넘어가도록 문구를 정리한다.
- [x] `scripts/cli-ticket-commands.mjs`의 legacy split reference 초안 생성 내용을 비중복 구조로 바꾼다.
- [x] 사용자 문서에서 legacy split reference의 역할을 “반복 계획”이 아니라 “근거/실행/검증 기록”으로 설명한다.

## Verification
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/148-ticket-plan-non-duplication-joy-nucb.md `merged into this ticket`
- [x] `node --test scripts/tests/*.test.mjs`

## Expected Outcomes
- 티켓은 identity/scope/APC만 보유한다.
- legacy split reference는 evidence/steps/verification만 보유한다.
- 같은 문장이나 같은 단계 목록을 양쪽에 복사하지 않는다.
