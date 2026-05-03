 - - - i d : 1 5 2 - s e t t l e - v 2 3 - n o - t i c k e t - f a l l b a c k - j o y - n u c b t i t l e : s e t t l e - v 2 3 - n o - t i c k e t - f a l l b a c k p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : v 2 3 n o - t i c k e t f a l l b a c k 변 경 과 티 켓 a r c h i v e / I N D E X 상 태 를 검 토 해 커 밋 가 능 한 변 경 단 위 로 정 리 한 다 . p r i o r i t y : P 2 t a g s : - w o r k f l o w - g i t - h i s t o r y - r e l e a s e - h y g i e n e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 4 : 4 3 : 0 9 - - - # s e t t l e - v 2 3 - n o - t i c k e t - f a l l b a c k > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * w o r k t r e e s t a t u s , v 2 3 n o - t i c k e t f a l l b a c k f i l e s , t i c k e t a r c h i v e / i n d e x m e t a d a t a - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , r e c e n t g i t l o g , c u r r e n t g i t d i f f - - n a m e - s t a t u s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t , i t s p l a n / r e p o r t a r t i f a c t s , a n d r e v i e w n o t e s f o r c u r r e n t d i r t y w o r k t r e e s t a t e - F o r b i d d e n m o d u l e s : p r o d u c t / s o u r c e b e h a v i o r c h a n g e s , g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , u s e r - o w n e d u n c o m m i t t e d c h a n g e s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : n o a c t i v e / o p e n t i c k e t r e s u l t , r e c e n t g i t h i s t o r y , c u r r e n t d i r t y w o r k t r e e s t a t u s - O u t p u t : c l e a r r e c o m m e n d a t i o n f o r t h e n e x t c o m m i t - r e a d y u n i t a n d a n y f i l e s t h a t s h o u l d b e e x c l u d e d o r h a n d l e d s e p a r a t e l y - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s o n l y u n l e s s t h e u s e r e x p l i c i t l y r e q u e s t s c o m m i t / s t a g i n g # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] C l a s s i f y c u r r e n t d i r t y w o r k t r e e i n t o v 2 3 f a l l b a c k c h a n g e s , t i c k e t a r c h i v e m e t a d a t a , a n d p r e - e x i s t i n g u n r e l a t e d c h a n g e s . - [ x ] R e c o m m e n d t h e n e x t c o m m i t o r c l e a n u p a c t i o n w i t h o u t s t a g i n g / c o m m i t t i n g u n l e s s e x p l i c i t l y r e q u e s t e d . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 152 settle v23 no ticket fallback joy nucb plan

# v23 변경 정리 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket next --path-only`는 active/open 티켓이 없다고 보고했다. 새 fallback 규칙에 따라 최근 git history와 현재 worktree를 분석했다.

최근 커밋 흐름은 ticket/legacy split reference Phase 1 의미를 강화하는 작업들로 이어졌고, 직전 작업에서는 no-ticket fallback 자체를 v23 규칙으로 보강했다. 하지만 그 변경은 아직 커밋되지 않았고, ticket archive와 INDEX 갱신도 같은 worktree에 남아 있다.

따라서 다음 작업은 새 기능 구현이 아니라 현재 dirty worktree를 커밋 가능한 단위로 분류하고, 사용자가 커밋을 요청할 때 안전하게 진행할 수 있는 상태를 만드는 것이다.

## Source Observations
- `ticket next --path-only` 결과는 active/open 티켓 없음이며, CLI는 최근 git history 분석을 안내했다.
- 최근 커밋은 `fix(rules): keep legacy split reference free of progress checkboxes`, `fix(rules): make legacy split reference capture agent analysis`, `fix(rules): separate ticket and plan content`, `fix(ticket): honor project and submodule filters` 순서로 TDW 경계 강화 흐름을 보인다.
- 현재 dirty worktree에는 v23 fallback 변경(`core-rules/AGENTS.md`, `docs/*`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`)이 있다.
- 동시에 `.deuk-agent/tickets/INDEX.json` 갱신과 오래된 open ticket 파일 삭제 상태가 남아 있다.
- 삭제 상태인 legacy/BMT ticket 파일들은 최근 archive/index 흐름과 연결되어 보이지만, 별도 사용자 변경일 수 있으므로 되돌리거나 커밋 범위에 포함하기 전에 확인이 필요하다.

## Cause Hypotheses
- 직전 TDW 작업은 Phase 4/archive까지 진행했지만 git commit은 수행하지 않았기 때문에 변경이 worktree에 남았다.
- ticket archive 명령이 INDEX와 ticket 파일 위치를 정리하면서 과거 open ticket 파일 삭제 상태를 표면화했을 수 있다.
- v23 규칙 변경과 ticket metadata 정리가 하나의 commit에 섞이면 리뷰와 rollback이 어려워진다.

## Decision Rationale
새 코드 수정을 바로 시작하지 않는다. 현재 저장소 상태는 먼저 정리 단위 판단이 필요하다.

우선 v23 no-ticket fallback 변경은 하나의 명확한 commit 후보로 분리할 수 있다. ticket archive/INDEX 변경은 TDW 운영 메타데이터이므로 같은 commit에 포함할지, 별도 commit 또는 제외 처리할지 판단해야 한다.

사용자에게 명시적 commit 요청을 받기 전에는 staging/commit을 하지 않는다. 대신 파일 그룹과 권장 순서를 정리한다.

## Execution Strategy
현재 dirty worktree를 세 그룹으로 분류한다.

그룹 A는 v23 fallback 규칙/문서/테스트 변경이다. 그룹 B는 티켓 archive와 `.deuk-agent/tickets/INDEX.json` 변경이다. 그룹 C는 이전부터 존재한 것으로 보이는 legacy ticket 삭제 상태다.

각 그룹의 포함/제외 판단을 정리하고, 필요하면 사용자가 바로 커밋할 수 있는 명령 후보를 제시한다.

## Verification Design
문서 기록은 `npx deuk-agent-rule lint:md`로 검증한다.

코드 변경 자체는 직전 작업에서 `node --test scripts/tests/*.test.mjs`가 통과했으므로, 이 티켓에서는 추가 코드 실행보다 상태 분류 정확도를 우선한다.

잔여 리스크는 `.deuk-agent/tickets/INDEX.json`과 삭제된 ticket 파일들이 사용자 의도 변경인지 자동 archive 결과인지 완전히 분리되지 않았다는 점이다.
