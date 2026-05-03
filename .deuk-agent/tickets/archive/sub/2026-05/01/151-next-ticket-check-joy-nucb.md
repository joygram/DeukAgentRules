 - - - i d : 1 5 1 - n e x t - t i c k e t - c h e c k - j o y - n u c b t i t l e : n o - t i c k e t - g i t l o g - f a l l b a c k p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 진 행 가 능 한 티 켓 이 없 을 때 신 규 티 켓 을 즉 시 만 들 기 보 다 최 근 g i t l o g 를 분 석 해 다 음 작 업 후 보 를 복 원 하 도 록 규 칙 을 보 강 한 다 . p r i o r i t y : P 2 t a g s : - t i c k e t - d i s c o v e r y - w o r k f l o w c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 3 : 3 4 : 2 2 - - - # n o - t i c k e t - g i t l o g - f a l l b a c k > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t i c k e t C L I g u i d a n c e , a n d m a t c h i n g u s e r - f a c i n g d o c u m e n t a t i o n - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e c e n t g i t h i s t o r y , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , r e l a t e d d o c s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : c o r e - r u l e s / A G E N T S . m d , r e l e v a n t d o c s / g u i d a n c e , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , f o c u s e d t i c k e t t e s t s , a n d t h i s t i c k e t ' s p l a n / r e p o r t a r t i f a c t s - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : u s e r c o r r e c t i o n t h a t n o - t i c k e t f a l l b a c k s h o u l d i n s p e c t r e c e n t g i t h i s t o r y , p l u s c u r r e n t T i c k e t D i s c o v e r y b e h a v i o r - O u t p u t : m i n i m a l r u l e / d o c s / C L I u p d a t e t h a t d i r e c t s a g e n t s t o p e r f o r m r e c e n t g i t - l o g a n a l y s i s b e f o r e c r e a t i n g a f o l l o w - u p t i c k e t w h e n t i c k e t n e x t f i n d s n o n e - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 5 1 - n e x t - t i c k e t - c h e c k - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 151 next ticket check joy nucb plan

# 티켓 없음 fallback 보강 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
사용자는 “득팩다음티켓” 요청 후, 진행 가능한 티켓이 없을 때 임시 티켓을 만들고 폐기하는 방식보다 기존 git log의 최근 변경 흐름을 보고 심층분석하는 것이 맞다고 정정했다.

현재 core-rules/AGENTS.md v22는 새 작업이면 즉시 티켓을 생성하고, truly unknown이면 `ticket next --path-only`를 1회 호출하도록 한다. 하지만 `ticket next`가 빈 결과를 돌려주는 경우의 fallback 분석 절차가 없다. 이 공백 때문에 실제 이어받을 작업 흐름이 git history에 남아 있어도 새 티켓 생성으로 흐를 수 있다.

## Source Observations
- `/home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md` version 22를 먼저 읽었다.
- `PROJECT_RULE.md`는 Hub-Spoke 구조, 코드 생성 산출물 매핑, DC-LEGACY/DC-OSS 가드를 정의한다.
- `npx deuk-agent-rule ticket next --path-only` 결과는 `No active or open tickets found to proceed with.`였다.
- 최근 git log는 `fix(rules): keep legacy split reference free of progress checkboxes`, `fix(rules): make legacy split reference capture agent analysis`, `fix(rules): separate ticket and plan content`, `fix(ticket): honor project and submodule filters`, `docs(rules): clarify phase one execution semantics` 순으로 TDW Phase 1과 ticket/legacy split reference 경계 강화 흐름을 보여준다.
- 관련 코드 표면은 `scripts/cli-ticket-commands.mjs`의 `runTicketNext` 에러 메시지와 `scripts/tests/cli-ticket-commands.test.mjs`의 next/create 테스트다.

## Cause Hypotheses
- 실제로 열린 티켓이 없어서 다음 티켓 탐색이 실패했을 가능성이 가장 높다.
- 열린 티켓 없음은 작업 없음이 아니라 최근 커밋에서 닫힌 작업의 후속 미정리 지점이 남아 있을 수 있다는 신호일 수 있다.
- 규칙이 no-ticket fallback을 정의하지 않으면 에이전트는 새 티켓을 성급하게 만들거나, 반대로 아무 후속 분석 없이 멈출 수 있다.

## Decision Rationale
다음 티켓 탐색은 이미 1-CALL RULE에 따라 1회 수행했다. 그 결과가 비었을 때의 정석 절차를 core rules에 명시한다.

새 fallback은 read-only git history 분석을 먼저 요구하고, 분석 결과로 이어받을 후속 작업이 확인될 때만 그 분석을 근거로 티켓을 생성하도록 한다. 이렇게 하면 ghost ticket을 줄이면서도 No Ticket, No Code 원칙은 유지된다.

## Execution Strategy
`core-rules/AGENTS.md`의 Ticket Discovery 표와 CLI Reference 설명에 no-ticket fallback을 추가한다.

`scripts/cli-ticket-commands.mjs`의 빈 결과 에러 메시지는 에이전트가 최근 git log 분석으로 넘어가야 함을 안내하도록 보강한다. 테스트는 에러 메시지가 fallback guidance를 포함하는지 확인한다.

한국어/영어 사용자 문서는 TDW 일상 흐름 안에 “다음 티켓 없음” 상황의 처리 원칙을 짧게 추가한다.

## Verification Design
`npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/151-next-ticket-check-joy-nucb.md `merged into this ticket`를 실행한다.

규칙과 CLI 변경 후 `npx deuk-agent-rule lint:md`와 `node --test scripts/tests/*.test.mjs`를 실행한다. 기대 결과는 markdown lint와 focused CLI tests 통과다.

## Verification Result
`npx deuk-agent-rule lint:md`는 6개 파일을 검사해 통과했다.

`node --test scripts/tests/*.test.mjs`는 29개 테스트가 모두 통과했다. 기존 진단 테스트 실행 중 `/bin/sh: 1: Syntax error: Unterminated quoted string` 경고가 출력되지만, 테스트 결과는 fail 없이 pass다.

## Merged Legacy Document


### 151 next ticket check joy nucb report

# 티켓 없음 fallback 보강 보고서

## 변경 요약
진행 가능한 티켓이 없을 때 곧바로 신규 티켓을 만드는 흐름을 바로잡았다.

`core-rules/AGENTS.md`는 v23으로 올라갔고, `ticket next`가 active/open 티켓을 찾지 못하면 최근 git history를 read-only로 분석한 뒤 후속 티켓을 만들도록 명시했다.

CLI의 `ticket next` 빈 결과 에러 메시지도 같은 행동을 안내하도록 바꿨고, 관련 테스트를 추가했다.

## 검증
`npx deuk-agent-rule lint:md` 통과.

`node --test scripts/tests/*.test.mjs` 통과. 총 29개 테스트가 pass했다.

## 참고
테스트 중 기존 진단 테스트에서 `/bin/sh: 1: Syntax error: Unterminated quoted string` 경고가 출력되지만, 테스트 실패로 이어지지 않았다.
