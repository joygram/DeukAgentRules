 - - - i d : 1 2 1 - t i c k e t - t e m p l a t e - a p c - s e c t i o n - f o r m - j o y - n u c b t i t l e : t i c k e t - t e m p l a t e - a p c - s e c t i o n - f o r m a t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 티 켓 생 성 템 플 릿 의 A P C 형 식 을 P h a s e 승 급 검 증 기 가 요 구 하 는 [ B O U N D A R Y ] , [ C O N T R A C T ] , [ P A T C H P L A N ] 섹 션 구 조 와 일 치 시 킨 다 . p r i o r i t y : h i g h t a g s : - t e m p l a t e s - t i c k e t - a p c - c l i c r e a t e d A t : 2 0 2 6 - 0 4 - 3 0 2 0 : 5 7 : 0 2 - - - # t i c k e t - t e m p l a t e - a p c - s e c t i o n - f o r m a t > 변 경 은 선 언 된 * * T a r g e t M o d u l e * * 로 제 한 한 다 . 코 드 생 성 전 에 * * C o n t e x t F i l e s * * 를 먼 저 읽 는 다 . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * t e m p l a t e s / T I C K E T _ T E M P L A T E . m d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , d o c s / u s a g e - g u i d e . k o . m d - * * D e s i g n R a t i o n a l e : * * 티 켓 생 성 템 플 릿 은 표 기 반 A P C 를 만 들 지 만 P h a s e 2 승 급 검 증 기 는 # # # [ B O U N D A R Y ] , # # # [ C O N T R A C T ] , # # # [ P A T C H P L A N ] 섹 션 만 인 정 한 다 . 새 티 켓 이 생 성 직 후 부 터 검 증 기 와 일 치 하 도 록 템 플 릿 을 고 친 다 . - * * C o n s t r a i n t s : * * C L I 비 즈 니 스 로 직 은 변 경 하 지 않 는 다 . 템 플 릿 포 맷 만 검 증 기 와 문 서 에 맞 춘 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , l e g a c y p l a n d o c - F o r b i d d e n m o d u l e s : s c r i p t s / * * , b i n / * * , c o r e - r u l e s / * * , g e n e r a t e d c o n s u m e r o u t p u t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d M o d u l e O w n e r s h i p s a y s t e m p l a t e s / i s e d i t a b l e a n d d i s t r i b u t e d t o c o n s u m e r s v i a i n i t . # # # [ C O N T R A C T ] - I n p u t : 표 기 반 A P C 템 플 릿 과 섹 션 기 반 승 급 검 증 기 사 이 의 불 일 치 - O u t p u t : 새 티 켓 이 생 성 될 때 승 급 검 증 기 와 일 치 하 는 섹 션 기 반 A P C s k e l e t o n - S i d e e f f e c t s : 이 후 생 성 되 는 티 켓 m a r k d o w n 기 본 구 조 변 경 # # # [ P A T C H P L A N ] - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d : A P C 표 와 별 도 # # P a t c h P l a n 표 를 제 거 하 고 # # # [ B O U N D A R Y ] , # # # [ C O N T R A C T ] , # # # [ P A T C H P L A N ] s k e l e t o n 으 로 교 체 한 다 . - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d : p l a c e h o l d e r 문 구 는 C L I p l a c e h o l d e r 검 출 과 사 용 자 가 채 우 기 쉬 운 형 태 로 유 지 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 템 플 릿 과 C L I 승 급 검 증 형 식 불 일 치 확 인 - [ x ] T I C K E T _ T E M P L A T E . m d 를 섹 션 기 반 A P C 형 식 으 로 수 정 - [ x ] l i n t 및 최 소 생 성 / 검 증 시 나 리 오 확 인 # # D o n e W h e n > 새 티 켓 템 플 릿 의 A P C 구 조 가 C L I 승 급 검 증 기 와 일 치 하 고 , m a r k d o w n l i n t 가 통 과 한 다 .

## Merged Legacy Document


### 121 ticket template apc section form joy nucb plan

# 목표

새 티켓이 생성 직후부터 Phase 2 승급 검증기가 요구하는 APC 구조를 갖도록 `templates/TICKET_TEMPLATE.md`를 수정한다.

# 원인

현재 템플릿은 `## Agent Permission Contract (APC)` 아래에 표를 생성한다. 반면 CLI 승급 검증기는 같은 APC 블록 안에서 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]` 섹션을 정규식으로 찾는다.

# 변경 계획

1. `templates/TICKET_TEMPLATE.md`의 표 기반 APC를 섹션 기반 skeleton으로 바꾼다.
2. 별도 `## Patch Plan` 섹션은 제거하고 APC 내부 `### [PATCH PLAN]`에 통합한다.
3. placeholder는 사용자가 채울 위치를 알 수 있게 두되, 승급 전 반드시 교체해야 하는 형태로 유지한다.
4. `npx deuk-agent-rule lint:md`로 티켓과 계획서를 검증한다.

# 검증

1. 현재 티켓과 계획서 markdown lint 통과.
2. 템플릿에 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]`가 존재하는지 확인.
3. 새 티켓 생성 시 같은 skeleton이 들어갈 수 있음을 템플릿 기준으로 확인.
