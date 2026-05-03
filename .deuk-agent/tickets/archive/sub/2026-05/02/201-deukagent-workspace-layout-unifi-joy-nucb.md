 - - - i d : 2 0 1 - d e u k a g e n t - w o r k s p a c e - l a y o u t - u n i f i - j o y - n u c b t i t l e : d e u k a g e n t - w o r k s p a c e - l a y o u t - u n i f i c a t i o n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : i 및 w o r k s p a c e 전 체 . d e u k - a g e n t 디 렉 토 리 구 조 정 합 화 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 3 : 0 6 : 4 1 - - - # d e u k a g e n t - w o r k s p a c e - l a y o u t - u n i f i c a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y d e u k a g e n t - w o r k s p a c e - l a y o u t - u n i f i c a t i o n - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * : * * l e g a c y p l a n d o c o w n s e v i d e n c e , d e c i s i o n s , d e t a i l e d s t e p s , a n d v e r i f i c a t i o n n o t e s . - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " i 및 w o r k s p a c e 전 체 . d e u k - a g e n t 디 렉 토 리 구 조 정 합 화 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " i 및 w o r k s p a c e 전 체 . d e u k - a g e n t 디 렉 토 리 구 조 정 합 화 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " i 및 w o r k s p a c e 전 체 . d e u k - a g e n t 디 렉 토 리 구 조 정 합 화 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . # # E x e c u t i o n O u t c o m e - i 대 상 정 리 : / h o m e / j o y / w o r k s p a c e / i 에 서 n o d e / h o m e / j o y / w o r k s p a c e / D e u k A g e n t R u l e s / b i n / d e u k - a g e n t - r u l e . j s i n i t - - a p p r o v a l a p p r o v e d 를 재 실 행 하 여 t i c k e t a r c h i v e 정 합 성 ( l e g a c y 이 동 정 리 / 빈 폴 더 제 거 ) 을 반 영 함 . - 전 체 2 차 정 리 : / h o m e / j o y / w o r k s p a c e 아 래 2 2 개 . d e u k - a g e n t 경 로 에 대 해 n p x i n i t ( 실 패 시 N o d e 직 접 실 행 으 로 보 정 ) 재 실 행 수 행 . - 결 과 판 독 : 즉 시 확 인 기 준 에 서 d o c s / a r c h i v e / p l a n s / w a l k t h r o u g h s , t i c k e t s / s u b | a r c h i v e 위 주 로 표 준 레 이 아 웃 복 구 확 인 , 4 0 4 / 오 류 기 반 추 가 잔 해 디 렉 토 리 미 검 출 . - 확 인 되 지 않 은 잔 여 : D e u k P a c k 의 특 정 p l a n 충 돌 2 건 은 내 용 충 돌 로 스 킵 되 어 수 동 병 합 대 상 확 인 필 요 . - 추 가 반 영 ( 루 트 원 인 보 완 ) : - s c r i p t s / c l i - i n i t - c o m m a n d s . m j s 의 c a n o n i c a l i z e A g e n t T i c k e t s L a y o u t 에 서 t i c k e t s / a r c h i v e 하 위 루 트 에 직 접 존 재 하 는 . m d 파 일 을 무 시 하 던 로 직 을 보 완 . - 수 정 으 로 이 제 a r c h i v e 루 트 파 일 도 r o u t e M i s p l a c e d T i c k e t F i l e 경 로 로 재 분 류 되 어 정 렬 되 도 록 함 . - 보 완 후 a p t - g u a r d 정 합 성 경 로 ( T I C K E T - 0 0 2 , T I C K E T - 0 0 3 ) 가 t i c k e t s / a r c h i v e / s u b / 2 0 2 6 - 0 5 / 0 3 / 로 복 귀 . - 재 점 검 결 과 : n o d e / t m p / d e u k - a g e n t - s t r i c t - a u d i t . m j s 기 준 / h o m e / j o y / w o r k s p a c e 내 . d e u k - a g e n t 는 C L E A N 처 리 ( 추 가 이 상 디 렉 토 리 미 검 출 ) .

## Merged Legacy Document


### 201 deukagent workspace layout unifi joy nucb plan

# 201-deukagent-workspace-layout-unification-plan

## 문제 정의
기존 `i`와 기타 저장소의 `.deuk-agent` 하위가 과도하게 분산되어 보이며, 과거 구조 흔적과 현재 구조가 혼합되어 있어 정합성 점검이 어렵다.

## 현상 관측
- `i`는 `docs/`, `tickets/`, `config.json` 중심의 구조만 유지되며, `knowledge/`는 존재하지 않음
- `/home/joy/workspace` 전체에서도 저장소별로 `init` 실행 이력/구조 정리 편차가 누적되어 있을 수 있음
- `init` 실행 시점마다 환경별 `npx` 가용성(예: `i`) 차이로 정규화가 일부 경로에서 반복 필요

## 원인 가설
- 모듈별 init의 실행 경로/버전 편차
- 오래된 경로(`legacy`, 루트 `ticket`, 보고서/티켓 폴더의 분산)이 스크립트 실행 사이클에서 완전 동기화되지 못함
- `docs`/`tickets`/`knowledge` 경계는 규칙상 존재하나, 실제 운영자는 “불필요 분리”로 인지하기 쉬운 깊은 하위 경로 혼재

## 결정/전략
1. 우선 `i`만 직접 재정규화 실행하여 즉시 체감 개선
2. 이어서 `/home/joy/workspace` 내 모든 `.deuk-agent`에 대해 동일 정합화 명령을 재실행
3. 충돌/예외(`npx` 미결정) 항목은 Node 직접 실행 경로로 보정
4. 재실행 결과에서 추가 조치가 필요한 과도 분리만 별도 보고

## 실행 설계
- `i`: `node /home/joy/workspace/DeukAgentRules/bin/deuk-agent-rule.js init --approval approved`
- workspace 전체: 각 `.deuk-agent` 디렉토리에서 보정 명령 반복 실행
  - 기본 경로는 `npx deuk-agent-rule init --approval approved`
  - 실패 시 동일한 Node 직접 실행으로 보정

## 검증 설계
- `i/.deuk-agent`와 전체 `.deuk-agent`에서 주요 디렉토리 목록을 재출력
- 핵심 규칙 충돌(legacy/misplaced directory) 재발생 여부 확인
- 결과 요약을 사용자가 바로 승인 가능한 형태로 리포트
