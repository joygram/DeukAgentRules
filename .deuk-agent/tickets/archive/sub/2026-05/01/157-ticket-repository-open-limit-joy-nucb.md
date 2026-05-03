 - - - i d : 1 5 7 - t i c k e t - r e p o s i t o r y - o p e n - l i m i t - j o y - n u c b t i t l e : t i c k e t - r e p o s i t o r y - o p e n - l i m i t p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : e n s u m m a r y : 오 픈 티 켓 이 2 0 개 를 넘 지 않 도 록 자 동 정 리 하 고 아 카 이 브 를 년 월 / 일 단 위 로 그 룹 화 한 다 p r i o r i t y : P 2 t a g s : - t i c k e t - a r c h i v e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 1 : 3 0 : 4 6 - - - # t i c k e t - r e p o s i t o r y - o p e n - l i m i t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - u t i l s . m j s , t i c k e t c o m m a n d t e s t s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t C L I c o m m a n d / p a t h l o g i c a n d f o c u s e d t e s t s f o r o p e n - t i c k e t p r u n i n g a n d a r c h i v e g r o u p i n g - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , O S S s y n c o u t p u t s , u n r e l a t e d i n i t / r u l e / t e m p l a t e d i s t r i b u t i o n c o d e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g t i c k e t c r e a t e / a r c h i v e / i n d e x b e h a v i o r a n d p a t h c o n v e n t i o n s - O u t p u t : a u t o m a t i c e n f o r c e m e n t t h a t o p e n / a c t i v e t i c k e t s d o n o t e x c e e d 2 0 a f t e r c r e a t i o n , p l u s a r c h i v e d t i c k e t p a t h s g r o u p e d b y y e a r - m o n t h a n d d a y - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 157 ticket repository open limit joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 티켓 저장소는 완료 티켓을 `archive/<group>/` 아래에 평평하게 쌓는다. 장기간 사용 시 아카이브 디렉터리와 목록이 커져 탐색성과 문서 관리성이 떨어진다. 또한 새 티켓 생성 시 이전 활성 티켓 하나만 자동 close 처리하고, 전체 오픈 티켓 수가 늘어나는 상황은 제한하지 않는다.

## Source Observations
`scripts/cli-ticket-commands.mjs`의 `runTicketCreate`가 티켓 파일을 만들고 `appendTicketEntry` 후 `syncActiveTicketId`를 호출한다. 같은 파일의 `runTicketArchive`는 티켓을 `archive/<group>/`로 이동하고 지식 증류와 인덱스 상태 변경을 수행한다. `scripts/cli-utils.mjs`의 `computeTicketPath`는 archived 상태의 표준 경로를 계산하며 기존 테스트는 평평한 archive 경로를 기대한다.

## Cause Hypotheses
티켓 생성 흐름에 저장소 상한 정책이 없어서 닫히지 않은 티켓이 누적된다. 아카이브 흐름도 시간 기반 파티션을 갖지 않아 오래된 문서가 한 디렉터리에 계속 섞인다.

## Decision Rationale
정책은 CLI 내부에서 자동 적용하는 편이 가장 일관적이다. 별도 수동 정리 명령만 추가하면 사용자가 잊는 순간 오픈 티켓 상한이 깨질 수 있다. 완료/취소 티켓을 우선 정리 대상으로 삼고, 그래도 초과하면 가장 오래된 오픈 티켓을 보관해 새 티켓 생성 후 오픈/액티브 수가 20개를 넘지 않게 한다. 아카이브 경로는 생성일 기준 `YYYY-MM/DD`로 나누어 문서가 시간순으로 자연스럽게 묶이게 한다.

## Execution Strategy
티켓 명령 모듈에 상수와 헬퍼를 추가해 오픈 티켓 집합, 아카이브 날짜 파티션, 자동 정리 대상을 계산한다. `runTicketArchive`는 공용 헬퍼를 통해 새 경로를 사용하게 바꾸고, `runTicketCreate`는 티켓 추가 직후 상한 초과분을 자동 아카이브한 뒤 인덱스와 활성 티켓 포인터를 동기화한다. 경로 계산 유틸과 테스트 기대값도 날짜 그룹 경로에 맞춘다.

## Verification Design
`node --test scripts/tests/*.test.mjs`로 티켓 생성/아카이브/경로 계산 회귀를 검증한다. 마크다운 변경 후 `npx deuk-agent-rule lint:md`를 실행한다. 자동 정리 대상이 사용 중인 활성 티켓을 잘못 보관하지 않는지와 기존 아카이브 경로 재빌드가 유지되는지가 남은 주요 확인 지점이다.

## Verification Outcome
`node --test scripts/tests/*.test.mjs` 통과. `npx deuk-agent-rule lint:md` 통과. 집중 검증으로 `node --test scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs`도 먼저 통과했다.
