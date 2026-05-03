 - - - i d : 1 2 8 - t i g h t e n - s c o p e - g e n e r a t e d - o u t p u t - g - j o y - n u c b t i t l e : t i g h t e n - s c o p e - g e n e r a t e d - o u t p u t - g u a r d p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 후 보 조 사 요 청 을 공 식 데 이 터 모 델 변 경 이 나 생 성 리 포 트 재 생 성 으 로 확 대 하 지 못 하 도 록 에 이 전 트 룰 을 보 완 한 다 . p r i o r i t y : h i g h t a g s : - r u l e s - s c o p e - g e n e r a t e d - o u t p u t - g u a r d r a i l c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 2 : 1 0 : 5 7 - - - # t i g h t e n - s c o p e - g e n e r a t e d - o u t p u t - g u a r d > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d - * * D e s i g n R a t i o n a l e : * * 조 사 / 후 보 / 매 칭 요 청 을 구 현 요 청 으 로 과 해 석 하 거 나 생 성 리 포 트 를 재 생 성 하 는 사 고 를 룰 로 차 단 한 다 . - * * C o n s t r a i n t s : * * c o n s u m e r 생 성 물 ( . c u r s o r / r u l e s / , c o n s u m e r A G E N T S . m d ) 은 직 접 수 정 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , l e g a c y p l a n d o c - F o r b i d d e n m o d u l e s : g e n e r a t e d c o n s u m e r s p o k e s , u n r e l a t e d C L I l o g i c - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N , D C - L E G A C Y , D C - O S S # # # [ C O N T R A C T ] - I n p u t : 후 보 조 사 요 청 이 공 식 코 드 / 생 성 산 출 물 변 경 으 로 확 대 된 사 고 . - O u t p u t : 후 보 / 조 사 요 청 , g e n e r a t e d r e p o r t , e x p e c t e d b a s e l i n e 변 경 을 명 시 적 으 로 통 제 하 는 룰 . - S i d e e f f e c t s : l i n t : m d 검 증 . # # # [ P A T C H P L A N ] - c o r e - r u l e s / A G E N T S . m d 버 전 과 c h a n g e l o g 를 갱 신 한 다 . - P r e - A c t i o n G u a r d s 에 e x p l o r a t i o n - o n l y , g e n e r a t e d o u t p u t , b a s e l i n e e x p a n s i o n g u a r d 를 추 가 한 다 . - T i c k e t L i f e c y c l e / D o c s 섹 션 에 승 인 없 는 리 포 트 재 생 성 금 지 를 보 강 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 사 고 유 형 을 막 는 룰 문 구 추 가 - [ x ] v e r s i o n / c h a n g e l o g 갱 신 - [ x ] m a r k d o w n l i n t 검 증 # # D o n e W h e n

## Merged Legacy Document


### 128 tighten scope generated output g joy nucb plan

# 후보 조사 요청의 범위 확대와 생성 산출물 오염 방지 룰 보완

## 목표

사용자가 “뽑아보자”, “매칭해보자”, “검토”, “후보”처럼 조사/분류를 요청했을 때, 에이전트가 공식 데이터 모델 변경이나 생성 리포트 재생성으로 확대하지 못하게 한다.

## 실행 계획

- [x] `core-rules/AGENTS.md` 버전을 v17로 올리고 changelog를 추가한다.
- [x] Pre-Action Guards에 exploration-only 요청과 generated output 재생성 제한을 추가한다.
- [x] 공식 baseline/expected competitor/테스트 매트릭스 변경은 별도 승인 없이는 금지한다고 명시한다.
- [x] Markdown lint로 규칙 문서를 검증한다.

## 검증

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/128-tighten-scope-generated-output-g-joy-nucb.md `merged into this ticket`
