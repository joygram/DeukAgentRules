 - - - i d : 1 8 5 - i n t e r n a l - a g e n t - r u l e s - c o n t e x t - t e s - j o y - n u c b t i t l e : i n t e r n a l - a g e n t - r u l e s - c o n t e x t - t e s t p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 내 부 에 이 전 트 룰 개 선 사 항 과 컨 텍 스 트 연 결 을 검 증 하 는 테 스 트 작 업 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 2 9 : 1 1 - - - # i n t e r n a l - a g e n t - r u l e s - c o n t e x t - t e s t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y i n t e r n a l - a g e n t - r u l e s - c o n t e x t - t e s t - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 내 부 에 이 전 트 룰 개 선 사 항 과 컨 텍 스 트 연 결 을 검 증 하 는 테 스 트 작 업 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 내 부 에 이 전 트 룰 개 선 사 항 과 컨 텍 스 트 연 결 을 검 증 하 는 테 스 트 작 업 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 내 부 에 이 전 트 룰 개 선 사 항 과 컨 텍 스 트 연 결 을 검 증 하 는 테 스 트 작 업 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] A d d a r e g r e s s i o n t e s t f o r s t r i c t t i c k e t c r e a t e p l a c e h o l d e r r e j e c t i o n a n d r o l l b a c k . - [ x ] V e r i f y t h e c u r r e n t M C P / c o n t e x t c o n n e c t i o n p a t h a n d k e e p r e u s a b l e f a c t s i n D e u k A g e n t C o n t e x t . - [ x ] R u n m a r k d o w n l i n t a n d t h e t a r g e t e d t e s t c o m m a n d , t h e n r e c o r d t h e r e s u l t . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 185 internal agent rules context tes joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 작업의 범위와 APC 경계를 관리한다.
- 이 문서는 strict ticket create 동작과 DeukContext 연결 회귀를 검증하기 위한 분석, 근거, 검증 설계만 담는다.
- 진행 체크박스는 두지 않는다.

## Problem Analysis
- 현재 CLI는 `--require-filled`와 `--from-plan` 조합에서 Phase 1 완성도 검사를 수행할 수 있다.
- 다만 이 동작을 보증하는 회귀 테스트가 부족해서, 규칙 개선 이후에도 placeholder 상태가 다시 허용될 위험이 있다.
- MCP 검색은 이번 질문에 대해 빈 결과를 반환했지만, 로컬 코드 분석에서 현재 동작이 이미 구현되어 있음을 확인했다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `runTicketCreate`는 strict create 경로에서 Phase 1 incomplete 상태를 감지하고 실패시 롤백한다.
- `scripts/cli-args.mjs`는 `--require-filled`와 `--from-plan` 인자를 이미 파싱한다.
- `scripts/tests/cli-ticket-commands.test.mjs`에는 `requireFilled` 인자와 dry-run 경로는 있지만, strict create 실패/롤백 경로를 직접 검증하는 테스트가 없다.
- `templates/rules.d/deukcontext-mcp.md`는 RAG miss 시 로컬 검색과 `add_knowledge`로 전환하라는 프로토콜을 정의한다.

## Cause Hypotheses
- 기능 자체의 결함보다, strict create 실패 경로에 대한 테스트 부재가 규칙 회귀의 원인일 가능성이 높다.
- 현재 규칙 문서는 MCP 사용과 로컬 진실 소스를 구분하지만, 이를 실제 코드 회귀 테스트와 연결하는 증거가 약하다.

## Decision Rationale
- CLI 로직을 다시 구현하는 대신, 현재 구현을 고정하는 회귀 테스트를 추가한다.
- 규칙 개선의 효과는 문서가 아니라 실제 동작 검증으로 확인하는 편이 더 안정적이다.
- MCP miss 후 로컬 분석을 신뢰하고, 그 사실을 DeukAgentContext에 한 번만 증류하는 절차를 유지한다.

## Execution Strategy
- `scripts/tests/cli-ticket-commands.test.mjs`에 strict create 실패 케이스를 추가한다.
- 테스트는 placeholder summary 또는 incomplete APC 상태가 strict create에서 거부되고, 생성된 티켓/plan/index가 롤백되는지 확인한다.
- 필요하면 문서 쪽의 설명도 현재 구현 상태에 맞게 최소한으로 보정한다.

## Verification Design
- `node --test scripts/tests/cli-ticket-commands.test.mjs`로 관련 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 티켓과 legacy split reference 마크다운을 함께 검증한다.
- 실패 시 남는 파일이 없는지 `ticketDir`와 plan 디렉터리를 점검한다.

## Verification Outcome
- `node --test scripts/tests/cli-ticket-commands.test.mjs` 통과.
- `npx deuk-agent-rule lint:md` 통과.
- strict create 롤백 테스트는 placeholder summary 입력 시 티켓과 plan 파일을 남기지 않는 것을 확인했다.
