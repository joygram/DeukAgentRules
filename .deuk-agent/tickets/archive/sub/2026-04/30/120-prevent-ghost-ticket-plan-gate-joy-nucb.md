 - - - i d : 1 2 0 - p r e v e n t - g h o s t - t i c k e t - p l a n - g a t e - j o y - n u c b t i t l e : p r e v e n t - g h o s t - t i c k e t - p l a n - g a t e p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 티 켓 발 행 시 실 행 문 서 누 락 방 지 를 위 한 A G E N T S . m d 게 이 트 강 화 p r i o r i t y : h i g h t a g s : - r u l e s - t i c k e t - l i f e c y c l e - g o v e r n a n c e c r e a t e d A t : 2 0 2 6 - 0 4 - 3 0 1 0 : 0 3 : 4 4 - - - # p r e v e n t - g h o s t - t i c k e t - p l a n - g a t e > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d 의 T i c k e t L i f e c y c l e / P r e - A c t i o n G u a r d s / D o c s 규 칙 강 화 - * * C o n t e x t F i l e s : * * c o r e - r u l e s / A G E N T S . m d , D e u k A g e n t R u l e s 티 켓 템 플 릿 , 최 근 고 스 트 티 켓 사 례 - * * D e s i g n R a t i o n a l e : * * t i c k e t c r e a t e 만 수 행 되 고 실 행 문 서 가 생 성 되 지 않 으 면 고 스 트 티 켓 이 발 생 하 여 추 적 성 과 실 행 력 이 떨 어 짐 - * * C o n s t r a i n t s : * * 규 칙 문 서 외 코 드 변 경 금 지 , 기 존 C L I 명 령 호 환 성 유 지 , 강 제 검 증 규 칙 은 최 소 침 습 으 로 추 가 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - * * 변 경 금 지 모 듈 : * * c o r e - r u l e s 외 코 드 / 스 크 립 트 , 런 타 임 소 스 , 배 포 아 티 팩 트 # # # [ C O N T R A C T ] - * * i n p u t : * * 사 용 자 요 청 ( " 티 켓 발 행 시 실 행 문 서 누 락 원 인 확 인 + 룰 개 선 " ) - * * o u t p u t : * * 고 스 트 티 켓 방 지 규 칙 ( G 1 . 2 / P h a s e 1 완 료 조 건 / 검 증 항 목 ) 반 영 된 A G E N T S . m d - * * s i d e e f f e c t s : * * 티 켓 생 성 직 후 p l a n 문 서 생 성 / 검 증 절 차 가 의 무 화 되 어 작 업 초 기 오 버 헤 드 가 소 폭 증 가 - * * R u l e C i t a t i o n : * * G 1 , G 1 . 1 , T i c k e t L i f e c y c l e , D o c s & A r t i f a c t s # # # [ P A T C H P L A N ] - * * f i l e : * * c o r e - r u l e s / A G E N T S . m d | * * f u n c t i o n : * * P r e - A c t i o n G u a r d s | * * c h a n g e : * * 미 생 성 / p l a c e h o l d e r 감 지 시 하 드 블 록 규 칙 추 가 - * * f i l e : * * c o r e - r u l e s / A G E N T S . m d | * * f u n c t i o n : * * T i c k e t L i f e c y c l e | * * c h a n g e : * * P h a s e 1 완 료 조 건 에 실 행 가 능 한 p l a n 문 서 필 수 화 - * * f i l e : * * c o r e - r u l e s / A G E N T S . m d | * * f u n c t i o n : * * D o c s , A r t i f a c t s & P l a t f o r m | * * c h a n g e : * * 티 켓 / 플 랜 동 시 l i n t 및 존 재 성 검 증 절 차 추 가 | F i e l d | V a l u e | | - - - - - - - | - - - - - - - | | E d i t a b l e m o d u l e s | c o r e - r u l e s / A G E N T S . m d , t i c k e t / p l a n a r t i f a c t s f o r 1 2 0 | | F o r b i d d e n m o d u l e s | r u n t i m e / s o u r c e c o d e o u t s i d e r u l e s d o c s | | I n p u t | u s e r r e q u e s t t o p r e v e n t g h o s t t i c k e t s b y r u l e i m p r o v e m e n t | | O u t p u t | e n f o r c e a b l e r u l e t e x t t h a t r e q u i r e s e x e c u t a b l e p l a n a r t i f a c t s | | S i d e e f f e c t s | s t r i c t e r p h a s e - 1 g a t i n g a n d a d d i t i o n a l l i n t s t e p | | R u l e c i t a t i o n | A G E N T S . m d S e c t i o n 2 , 3 , 6 | # # P a t c h P l a n | F i l e | F u n c t i o n | C h a n g e | | - - - - - - | - - - - - - - - - - | - - - - - - - - | | c o r e - r u l e s / A G E N T S . m d | P r e - A c t i o n G u a r d s | a d d p l a n a r t i f a c t g a t e b e f o r e e x e c u t e w r i t e s | | c o r e - r u l e s / A G E N T S . m d | T i c k e t L i f e c y c l e | r e q u i r e p l a n f i l e c r e a t i o n / c o m p l e t e n e s s i n P h a s e 1 | | c o r e - r u l e s / A G E N T S . m d | D o c s , A r t i f a c t s | r e q u i r e t i c k e t + p l a n l i n t p a i r v a l i d a t i o n | # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] A G E N T S . m d 에 고 스 트 티 켓 방 지 가 드 ( G 1 . 2 ) 추 가 - [ x ] P h a s e 1 완 료 조 건 에 실 행 문 서 존 재 / 완 성 기 준 추 가 - [ x ] 문 서 검 증 절 차 에 t i c k e t + p l a n 동 시 l i n t 규 칙 추 가 # # D o n e W h e n > A G E N T S . m d 에 고 스 트 티 켓 방 지 규 칙 이 반 영 되 고 , 새 티 켓 생 성 시 " t i c k e t + p l a n 문 서 + l i n t 통 과 " 가 최 소 완 료 기 준 으 로 명 시 되 면 완 료 .

## Merged Legacy Document


### 120 prevent ghost ticket plan gate joy nucb plan

# Plan: 120-prevent-ghost-ticket-plan-gate-joy-nucb

## Goal
- 티켓 발행만으로 종료되는 고스트 티켓을 차단한다.
- Phase 1 완료 조건에 실행 가능한 legacy split reference 문서와 검증 절차를 강제한다.

## Changes
1. Pre-Action Guards에 G1.2 추가
- legacy split reference 파일 미존재 또는 placeholder-only인 경우 Execute 단계 쓰기 하드 블록.

2. Ticket Lifecycle의 Phase 1 조건 강화
- ticket create 이후 legacy split reference 파일 생성 및 실행 가능한 내용 채우기를 명시.

3. Docs & Artifacts 검증 강화
- Phase 1 완료 시 ticket + legacy split reference 동시 lint를 의무화.

## Verification
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/120-prevent-ghost-ticket-plan-gate-joy-nucb.md `merged into this ticket`

## Rollback
- 규칙 적용으로 과도한 차단이 발생하면 G1.2 조건을 "missing plan file"로 완화하고 placeholder 기준을 별도 lint 규칙으로 분리한다.
