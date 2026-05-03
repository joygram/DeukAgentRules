 - - - i d : 2 0 0 - d o c s - k n o w l e d g e - b o u n d a r y - j o y - n u c b t i t l e : d o c s - k n o w l e d g e - b o u n d a r y p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : d o c s 와 k n o w l e d g e 경 계 를 명 확 히 하 고 잘 못 된 J S O N 분 류 를 방 지 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 5 3 : 5 3 - - - # d o c s - k n o w l e d g e - b o u n d a r y > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y d o c s - k n o w l e d g e - b o u n d a r y - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * : * * l e g a c y p l a n d o c o w n s e v i d e n c e , d e c i s i o n s , d e t a i l e d s t e p s , a n d v e r i f i c a t i o n n o t e s . - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " d o c s 와 k n o w l e d g e 경 계 를 명 확 히 하 고 잘 못 된 J S O N 분 류 를 방 지 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " d o c s 와 k n o w l e d g e 경 계 를 명 확 히 하 고 잘 못 된 J S O N 분 류 를 방 지 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " d o c s 와 k n o w l e d g e 경 계 를 명 확 히 하 고 잘 못 된 J S O N 분 류 를 방 지 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 200 docs knowledge boundary joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`merged ticket body`와 `.deuk-agent/knowledge`가 모두 과거 작업 보존처럼 보이면서 역할 경계가 흐립니다. 특히 init 정리 로직이 `.json` 파일을 모두 knowledge로 보내고 있어 임의 JSON 산출물도 검색용 지식처럼 보일 수 있습니다. 이는 knowledge를 "distilled retrieval artifact"로 쓰려는 정책과 충돌합니다.

## Source Observations
- `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`는 티켓 archive 시 `id`, `title`, `summary`, `sourceTicketPath`, `sections`, `analysis`를 가진 JSON을 `.deuk-agent/knowledge/<ticket-id>.json`에 생성합니다.
- `scripts/cli-init-commands.mjs`의 `classifyAgentFileTarget()`은 현재 모든 `.json`을 `.deuk-agent/knowledge/`로 이동합니다.
- `core-rules/AGENTS.md`는 plans/reports/scratch의 문서 위치는 정의하지만 docs와 knowledge의 차이는 명시하지 않습니다.

## Cause Hypotheses
- 역할 정의가 문서화되지 않아 "archive 문서"와 "검색용 요약 JSON"이 같은 보존층처럼 인식됩니다.
- init의 자동 분류가 파일 확장자만 보고 JSON을 knowledge로 보내며, knowledge JSON의 최소 구조를 확인하지 않습니다.

## Decision Rationale
`docs`는 사람이 읽는 원문/계획/리포트/스키마/임시노트로 정의하고, `knowledge`는 archive에서 추출된 기계 검색용 요약 JSON으로 정의합니다. 따라서 임의 JSON은 knowledge가 아니라 `docs/scratch`로 이동해야 합니다. 이 기준을 core rule, template rule, init classifier, regression test에 함께 반영합니다.

## Execution Strategy
`classifyAgentFileTarget()`에 knowledge JSON shape check를 추가합니다. `id`, `summary`, `sourceTicketPath`, `sections`, `analysis`가 있는 JSON만 knowledge로 유지하고, 그 외 JSON은 `docs/scratch`로 분류합니다. `core-rules/AGENTS.md`와 `templates/rules.d/deukcontext-mcp.md`에 docs/knowledge 경계를 짧게 명시합니다. 기존 test fixture도 임의 JSON은 scratch로 가고, distilled knowledge shape만 knowledge로 가도록 바꿉니다.

## Verification Design
`node --check scripts/cli-init-commands.mjs`, `node --test scripts/tests/cli-init-commands.test.mjs`, `node --test scripts/tests/*.test.mjs`, 관련 markdown lint를 실행합니다. 기대 결과는 임의 JSON 오분류가 방지되고, 기존 archive knowledge distillation 테스트는 유지되는 것입니다.

## Verification Outcome
- `classifyAgentFileTarget()` now sends only distilled knowledge JSON to `.deuk-agent/knowledge/`.
- Arbitrary JSON files are routed to `merged ticket body` as human/source artifacts.
- `core-rules/AGENTS.md` and `templates/rules.d/deukcontext-mcp.md` now define the docs/knowledge boundary.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/rules.d/deukcontext-mcp.md .deuk-agent/tickets/sub/200-docs-knowledge-boundary-joy-nucb.md `merged into this ticket` passed.
- `node --test scripts/tests/*.test.mjs` passed.
- `npx deuk-agent-rule init --dry-run` found no additional cleanup target in the current workspace.
