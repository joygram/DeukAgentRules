 - - - i d : 1 7 9 - m d - l i n t - a u t o m a t i o n - a n d - r u l e - h a r d - j o y - n u c b t i t l e : m d - l i n t - a u t o m a t i o n - a n d - r u l e - h a r d e n i n g p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o p r i o r i t y : P 2 s u m m a r y : 티 켓 l i f e c y c l e 에 m d l i n t 자 동 화 를 편 입 하 고 에 이 전 트 룰 의 검 증 경 계 를 보 강 한 다 c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 9 : 5 2 : 1 3 t a g s : - a u t o m a t i o n - l i n t - - - # m d - l i n t - a u t o m a t i o n - a n d - r u l e - h a r d e n i n g > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y m d - l i n t - a u t o m a t i o n - a n d - r u l e - h a r d e n i n g - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 티 켓 l i f e c y c l e 에 m d l i n t 자 동 화 를 편 입 하 고 에 이 전 트 룰 의 검 증 경 계 를 보 강 한 다 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 티 켓 l i f e c y c l e 에 m d l i n t 자 동 화 를 편 입 하 고 에 이 전 트 룰 의 검 증 경 계 를 보 강 한 다 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 티 켓 l i f e c y c l e 에 m d l i n t 자 동 화 를 편 입 하 고 에 이 전 트 룰 의 검 증 경 계 를 보 강 한 다 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . - [ x ] M a k e t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t a n d r o l l b a c k o n f a i l u r e . # # V e r i f i c a t i o n 결 과 요 약 - n o d e - - t e s t s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s 통 과 ( 2 8 / 2 8 ) : c r e a t e / m o v e / c l o s e / a r c h i v e r o l l b a c k 및 l i n t 연 동 경 로 가 이 미 구 현 되 어 있 음 . - n p x d e u k - a g e n t - r u l e l i n t : m d ( t i c k e t + p l a n ) 통 과 . - n o d e - - t e s t s c r i p t s / t e s t s / l i n t - m d . t e s t . m j s 통 과 ( 2 / 2 ) : w a l k t h r o u g h 산 출 물 규 칙 및 결 과 섹 션 요 구 충 족 . 현 재 상 태 에 서 는 추 가 코 드 수 정 없 이 기 존 구 현 이 요 구 사 항 을 충 족 하 므 로 , 해 당 티 켓 은 구 현 검 증 중 심 으 로 마 감 가 능 한 상 태 로 판 단 됨 . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s e n f o r c e m a r k d o w n l i n t a u t o m a t i c a l l y o n t o u c h e d a r t i f a c t s .

## Merged Legacy Document


### 179 md lint automation and rule hard joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 `lint:md`는 존재하지만, 티켓 라이프사이클이 그 검증을 자동으로 보장하지 않습니다. `ticket create`, `move`, `close`, `archive`가 Markdown 파일을 쓰는 동안 잘못된 frontmatter, 깨진 링크, 미완성 템플릿이 그대로 인덱스에 반영될 수 있습니다. 그 결과는 두 가지입니다. 첫째, 문서가 "생성됨" 상태로 보이지만 실제로는 에이전트가 안전하게 읽을 수 없는 상태가 됩니다. 둘째, 규칙 문서에는 lint를 하라고 써 있어도 실행 경로가 자동화되어 있지 않으면 사용자가 기억해야만 막을 수 있습니다.

## Source Observations
- `scripts/lint-md.mjs`는 현재 Markdown 파일을 검사하는 CLI이지만, 재사용 가능한 함수 경로가 약해서 lifecycle 코드에서 바로 호출하기 불편했습니다.
- `scripts/cli-ticket-commands.mjs`는 ticket create/move/close/archive를 한 곳에서 처리하지만, write 이후에 markdown 검증을 자동 수행하는 공통 훅은 없었습니다.
- `core-rules/AGENTS.md`에는 markdown edit 후 lint를 권장하는 문구가 있었지만, lifecycle command 수준의 강제 규칙은 명시적이지 않았습니다.
- `templates/TICKET_TEMPLATE.md`는 수동 체크리스트 중심이라 lifecycle 자동 검증을 기대하기 어렵습니다.

## Cause Hypotheses
- lint 로직이 CLI 진입점에만 묶여 있어서 command 내부에서 재사용할 수 없습니다.
- ticket lifecycle은 여러 파일을 동시에 바꾸는데, write 직후 검증과 rollback 전략이 분리되어 있어 자동화가 빠지기 쉽습니다.
- 규칙 문구가 "lint를 하라" 수준이면, 실행 순서나 실패 시 복구 동작이 구현되지 않아도 문제로 감지되지 않습니다.

## Decision Rationale
- `lint-md`를 함수로 분리해 lifecycle command가 직접 호출하도록 합니다.
- `create/move/close/archive`는 write 후 성공 반환 전에 lint를 실행하고, 실패하면 원상복구하도록 만듭니다.
- 규칙과 템플릿에도 같은 제약을 적어두어, 코드와 문서의 기대치를 맞춥니다.
- 외부 셸로 `npx deuk-agent-rule lint:md`를 다시 호출하는 방식은 간단하지만, rollback과 공통 에러 메시지를 관리하기 어렵기 때문에 내부 함수 재사용을 선택합니다.

## Execution Strategy
- `scripts/lint-md.mjs`에 재사용 가능한 `lintMarkdownPaths()`를 노출합니다.
- `scripts/cli-ticket-commands.mjs`에 lifecycle lint helper를 추가하고, ticket create/move/close/archive 경로에 연결합니다.
- create는 ticket/plan draft가 만들어진 직후 lint하고, 실패 시 새 파일과 plan draft를 함께 제거합니다.
- move/close는 기존 본문과 index 스냅샷을 저장한 뒤 write 후 lint하고, 실패하면 이전 상태로 되돌립니다.
- archive는 이동된 ticket, linked plan, attached report까지 검증하고, 실패하면 이동/knowledge/report 생성 결과를 롤백합니다.
- `core-rules/AGENTS.md`와 `templates/TICKET_TEMPLATE.md`에는 lifecycle auto-lint 정책을 명시합니다.
- 테스트는 create/move/archive의 rollback 동작과 자동 lint 실패를 모두 확인하는 방향으로 추가합니다.

## Verification Design
- `runTicketCreate`는 broken markdown template를 만나면 ticket/plan/index를 남기지 않고 실패해야 합니다.
- `runTicketMove`는 linked plan의 broken link를 만나면 phase/status 변경을 되돌려야 합니다.
- `runTicketArchive`는 plan lint 실패 시 archive 이동, knowledge json, report copy를 되돌려야 합니다.
- 문서 변경 후에는 markdown lint가 수동 audit 용도로만 남아 있어도, lifecycle path가 먼저 차단해야 합니다.
- 남는 리스크는 auto-archive 연쇄 실패처럼 복수 ticket을 한 번에 다루는 경로인데, 그 경우에도 최소한 현재 ticket mutation이 깨끗하게 롤백되는지 확인해야 합니다.

## Verification Result
- `node --test scripts/tests/cli-ticket-commands.test.mjs`에서 `runTicketCreate/runTicketMove/runTicketClose/runTicketArchive`의 lint 실패 rollback 시나리오가 모두 검증되어 통과(28/28).
- `node --test scripts/tests/lint-md.test.mjs`에서 walkthrough 결과 섹션 검증이 통과(2/2).
- `npx deuk-agent-rule lint:md`가 현재 ticket/plan 쌍에 대해 통과(2 files).

## Conclusion
- lifecycle lint 자동화/롤백 요구사항은 이미 코드 경로에 반영돼 있으며, 본 티켓에서 추가 구현이 아니라 결과 검증이 우선임을 확인했다.
