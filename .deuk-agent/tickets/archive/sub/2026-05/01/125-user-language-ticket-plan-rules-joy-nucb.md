 - - - i d : 1 2 5 - u s e r - l a n g u a g e - t i c k e t - p l a n - r u l e s - j o y - n u c b t i t l e : u s e r - l a n g u a g e - t i c k e t - p l a n - r u l e s p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : R e q u i r e g e n e r a t e d t i c k e t s a n d p l a n s t o u s e t h e u s e r ' s p r o m p t l a n g u a g e p r i o r i t y : P 2 t a g s : r u l e s , t i c k e t s , p l a n s , l a n g u a g e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 1 : 0 8 : 4 1 - - - # u s e r - l a n g u a g e - t i c k e t - p l a n - r u l e s > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - p r o m p t s . m j s , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s - * * D e s i g n R a t i o n a l e : * * 티 켓 과 플 랜 은 사 용 자 의 작 업 요 청 을 바 로 추 적 하 는 산 출 물 이 므 로 , 사 용 자 프 롬 프 트 언 어 를 기 준 으 로 생 성 되 어 야 합 니 다 . - * * C o n s t r a i n t s : * * 소 비 자 워 크 스 페 이 스 의 생 성 된 A G E N T S . m d 나 . c u r s o r / r u l e s / 파 일 은 직 접 수 정 하 지 않 습 니 다 . S S o T 인 c o r e r u l e s 를 수 정 하 고 i n i t 으 로 전 파 합 니 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , l e g a c y p l a n d o c c u r r e n t t i c k e t m e t a d a t a . - F o r b i d d e n m o d u l e s : g e n e r a t e d c o n s u m e r A G E N T S . m d , . c u r s o r / r u l e s / , d i s t / , g e n / , d e u k p a c k _ o u t / . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N ; c o r e - r u l e s / A G E N T S . m d i s t h e h u b S S o T . # # # [ C O N T R A C T ] - I n p u t : U s e r r e q u e s t : " 플 랜 , 티 켓 생 성 하 는 거 사 용 자 언 어 기 반 으 로 만 들 게 룰 보 강 " . - O u t p u t : C o r e r u l e t e x t e x p l i c i t l y r e q u i r e s n e w t i c k e t s a n d p l a n f i l e s t o m a t c h t h e u s e r ' s p r o m p t l a n g u a g e , o v e r r i d i n g s a v e d / d e f a u l t d o c s l a n g u a g e w h e n t h e y c o n f l i c t . - S i d e e f f e c t s : R u l e v e r s i o n / c h a n g e l o g m a y b e b u m p e d ; g e n e r a t e d s p o k e s r e q u i r e f u t u r e i n i t p r o p a g a t i o n . # # # [ P A T C H P L A N ] - A d d a c l e a r l a n g u a g e - s e l e c t i o n r u l e n e a r T o n e o r D o c s s e c t i o n s . - C l a r i f y P h a s e 1 t i c k e t / p l a n c r e a t i o n m u s t u s e t h e u s e r ' s p r o m p t l a n g u a g e f o r t i t l e , s u m m a r y , A P C , t a s k s , a n d p l a n c o n t e n t . - R u n m a r k d o w n l i n t a n d t e s t s . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] U p d a t e c o r e r u l e s l a n g u a g e p o l i c y f o r t i c k e t s / p l a n s . - [ x ] B u m p c o r e r u l e v e r s i o n / c h a n g e l o g . - [ x ] R u n m a r k d o w n l i n t a n d r e l e v a n t t e s t s . - [ ] M o v e t i c k e t t h r o u g h v e r i f y / c l o s e a f t e r i m p l e m e n t a t i o n . # # V e r i f i c a t i o n - n o d e - - t e s t s c r i p t s / t e s t s / p a s s e d : 1 7 t e s t s . # # D o n e W h e n > C o r e r u l e s r e q u i r e u s e r - p r o m p t - l a n g u a g e t i c k e t s / p l a n s , l i n t / t e s t s p a s s , a n d t h e t i c k e t i s c l o s e d o r h a s d o c u m e n t e d b l o c k e r s .

## Merged Legacy Document


### 125 user language ticket plan rules joy nucb plan

# 계획: 사용자 언어 기반 티켓/플랜 생성 규칙 보강

## 목표

새 티켓과 플랜을 만들 때 저장된 `docsLanguage`, 시스템 로케일, 기존 템플릿 기본값보다 사용자의 현재 요청 언어를 우선하도록 `core-rules/AGENTS.md`에 명시합니다.

## 수정 범위

- `core-rules/AGENTS.md`
  - Tone 또는 Docs 섹션에 티켓/플랜 언어 선택 규칙 추가
  - Phase 1 설명에 티켓과 `legacy split reference` 내용이 사용자 프롬프트 언어를 따라야 한다는 조건 추가
  - version/changelog 갱신

## 제외 범위

- 생성된 소비자 `AGENTS.md`, `.cursor/rules/` 직접 수정
- CLI의 실제 언어 감지 로직 변경
- `templates/` 구조 변경

## 실행 절차

1. 티켓을 Phase 2로 이동합니다.
2. `core-rules/AGENTS.md`를 수정합니다.
3. 필요하면 현재 티켓 체크박스를 갱신합니다.
4. `npx deuk-agent-rule lint:md`를 실행합니다.
5. `node --test scripts/tests/`를 실행합니다.
6. 결과를 기록하고 티켓을 닫습니다.

## 승인 기준

- 새 규칙이 “티켓/플랜은 사용자 프롬프트 언어 기준”을 명확히 말합니다.
- 저장된 `docsLanguage`가 있더라도 현재 사용자 언어와 충돌하면 사용자 언어가 우선임을 알 수 있습니다.
- lint와 테스트가 통과합니다.
