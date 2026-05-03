 - - - i d : 1 4 4 - d e u k p a c k - b m t - f r o n t m a t t e r - c l e a n u p - j o y - n u c b t i t l e : d e u k p a c k - b m t - f r o n t m a t t e r - c l e a n u p p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k B M T 하 위 티 켓 의 p a r e n t T i c k e t f r o n t m a t t e r 중 복 경 고 를 정 리 합 니 다 . c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 8 : 0 3 : 1 4 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - t i c k e t - c l e a n u p - f r o n t m a t t e r - - - # d e u k p a c k - b m t - f r o n t m a t t e r - c l e a n u p > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * . d e u k - a g e n t / t i c k e t s / s u b / 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 7 - d e u k p a c k - b m t - l a n g u a g e - p y t h o n - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 8 - d e u k p a c k - b m t - l a n g u a g e - j a v a s c r i p t - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 4 0 - d e u k p a c k - b m t - l a n g u a g e - g o - j o y - n u c b . m d - * * C o n t e x t F i l e s : * * c o r e - r u l e s / A G E N T S . m d , P R O J E C T _ R U L E . m d , . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 4 2 - d e u k p a c k - 1 3 5 - j o y - n u c b - r e p o r t . m d - * * D e s i g n R a t i o n a l e : * * P h a s e 전 환 시 Y A M L f r o n t m a t t e r p a r s e 경 고 가 반 복 되 어 다 음 B M T 하 위 티 켓 진 행 을 막 고 있 으 므 로 , 중 복 p a r e n t T i c k e t k e y 만 제 거 해 티 켓 파 싱 을 복 구 한 다 . - * * C o n s t r a i n t s : * * 티 켓 본 문 / 계 획 / 업 무 범 위 는 변 경 하 지 않 고 f r o n t m a t t e r 중 복 k e y 만 정 리 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : 위 T a r g e t 에 명 시 된 4 개 하 위 티 켓 f r o n t m a t t e r - F o r b i d d e n m o d u l e s : 코 드 생 성 기 , 템 플 릿 , b e n c h m a r k / r e p o r t 산 출 물 , 하 위 티 켓 본 문 업 무 정 의 - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 D C - C O D E G E N , A G E N T S 의 T D W / 파 일 가 드 # # # [ C O N T R A C T ] - I n p u t : P h a s e 전 환 중 표 시 된 p a r e n t T i c k e t 중 복 p a r s e w a r n i n g - O u t p u t : 각 대 상 티 켓 f r o n t m a t t e r 에 p a r e n t T i c k e t k e y 가 1 회 만 존 재 - S i d e e f f e c t s : 다 음 하 위 티 켓 1 4 0 G o 를 정 상 적 으 로 활 성 화 / 진 행 가 능 # # # [ P A T C H P L A N ] - 대 상 4 개 티 켓 의 중 복 p a r e n t T i c k e t 두 번 째 줄 을 제 거 한 다 . - 티 켓 별 본 문 과 계 획 내 용 은 변 경 하 지 않 는 다 . - l i n t : m d 로 4 개 티 켓 과 c l e a n u p 티 켓 / 계 획 을 확 인 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 1 3 6 K o t l i n 티 켓 f r o n t m a t t e r 중 복 제 거 - [ x ] 1 3 7 P y t h o n 티 켓 f r o n t m a t t e r 중 복 제 거 - [ x ] 1 3 8 J a v a S c r i p t 티 켓 f r o n t m a t t e r 중 복 제 거 - [ x ] 1 4 0 G o 티 켓 f r o n t m a t t e r 중 복 제 거 # # D o n e W h e n - 대 상 4 개 티 켓 이 Y A M L f r o n t m a t t e r 중 복 k e y 없 이 p a r s e 가 능 - l i n t : m d 가 c l e a n u p 티 켓 / 계 획 및 대 상 4 개 티 켓 에 대 해 통 과 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 4 - d e u k p a c k - b m t - f r o n t m a t t e r - c l e a n u p - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 144 deukpack bmt frontmatter cleanup joy nucb plan

# Plan: DeukPack BMT 하위 티켓 frontmatter 정리

## 목표
- `136`, `137`, `138`, `140` 하위 티켓에서 반복되는 `parentTicket` 중복 key 경고를 제거한다.
- 다음 실행 대상인 `140-deukpack-bmt-language-go-joy-nucb`를 정상적으로 활성화할 수 있게 한다.

## 범위
- 대상: `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`, `.deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md`, `.deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md`, `.deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`
- 비대상: 하위 티켓 본문 업무 정의, 각 언어별 BMT 보강 계획, 코드 생성기, benchmark/report 산출물

## 실행 항목
1. [x] 136 Kotlin 티켓의 중복 `parentTicket` 한 줄 제거
2. [x] 137 Python 티켓의 중복 `parentTicket` 한 줄 제거
3. [x] 138 JavaScript 티켓의 중복 `parentTicket` 한 줄 제거
4. [x] 140 Go 티켓의 중복 `parentTicket` 한 줄 제거
5. [x] cleanup 티켓과 대상 4개 티켓 `lint:md` 통과

## 완료 기준
- 대상 티켓 frontmatter에서 `parentTicket` key는 각 1회만 남는다.
- Phase 전환 시 중복 key parse warning이 재발하지 않는다.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`로 유지한다.

## Merged Legacy Document


### 144 deukpack bmt frontmatter cleanup joy nucb report

# Report: DeukPack BMT 하위 티켓 frontmatter cleanup

## 검증 대상
- `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`
- `.deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md`
- `.deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md`
- `.deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`
- `.deuk-agent/tickets/sub/144-deukpack-bmt-frontmatter-cleanup-joy-nucb.md`
- `merged into this ticket`

## 수행 결과
- 대상 4개 하위 티켓의 중복 `parentTicket` key를 제거했다.
- 대상 4개 하위 티켓에 필수 frontmatter `priority`, `tags`를 보강했다.
- 하위 티켓 본문 업무 정의와 언어별 BMT 계획은 변경하지 않았다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/144-deukpack-bmt-frontmatter-cleanup-joy-nucb.md `merged into this ticket` .deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md .deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md .deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md .deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`

## 검증 결과
- `lint:md passed (6 files)`

## 결론
- BMT 하위 티켓의 frontmatter parse 경고는 정리됐다.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`다.
