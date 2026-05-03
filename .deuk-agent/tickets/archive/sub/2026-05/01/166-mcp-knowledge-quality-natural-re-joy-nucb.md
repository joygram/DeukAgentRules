 - - - i d : 1 6 6 - m c p - k n o w l e d g e - q u a l i t y - n a t u r a l - r e - j o y - n u c b t i t l e : m c p - k n o w l e d g e - q u a l i t y - n a t u r a l - r e f r e s h p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : M C P 지 식 검 색 품 질 저 하 와 자 연 보 강 부 재 문 제 를 분 석 하 고 개 선 방 향 을 수 립 한 다 p r i o r i t y : P 1 t a g s : - m c p - k n o w l e d g e - q u a l i t y - r a g - w o r k f l o w c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 2 : 2 3 : 1 0 - - - # m c p - k n o w l e d g e - q u a l i t y - n a t u r a l - r e f r e s h > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / r u l e s . d / d e u k c o n t e x t - m c p . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , D e u k A g e n t C o n t e x t M C P s e a r c h / a d v i s o r y e v i d e n c e , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , R A G p r o t o c o l t e m p l a t e - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o b r o a d M C P s e r v e r p r o t e c t e d - f i l e c h a n g e s w i t h o u t e x p l i c i t D e u k A g e n t C o n t e x t a p p r o v a l , k e e p t h i s p a t c h t o D e u k A g e n t R u l e s - s i d e b e h a v i o r a n d t e s t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : D e u k A g e n t R u l e s r u l e t e m p l a t e s , c o r e r u l e s , t i c k e t a r c h i v e k n o w l e d g e d i s t i l l a t i o n , f o c u s e d t e s t s - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d d o c s , D e u k A g e n t C o n t e x t p r o t e c t e d s r c / m c p / s e r v e r . p y w i t h o u t s e p a r a t e a p p r o v a l - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : M C P s e a r c h q u a l i t y o b s e r v a t i o n s , c u r r e n t R A G p r o t o c o l , a r c h i v e k n o w l e d g e d i s t i l l a t i o n b e h a v i o r - O u t p u t : s t r i c t e r R A G q u a l i t y p r o t o c o l p l u s a r c h i v e k n o w l e d g e J S O N t h a t i n c l u d e s a n a l y s i s / d e c i s i o n / v e r i f i c a t i o n e v i d e n c e - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 166 mcp knowledge quality natural re joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 MCP 지식 검색은 오래된 archived ticket, placeholder plan, 중복 ticket/report chunk를 높은 점수로 반환한다. 그 결과 에이전트가 실제 코드를 바로 읽어야 하는 상황에서도 RAG를 반복 호출하고, 검색 결과가 부실한데도 로컬 분석 결과를 `add_knowledge`나 문서 refresh로 승격하지 않는다. 지식 저장소가 "현재 코드 상태를 설명하는 기억"이 아니라 "과거 티켓 조각의 대량 검색"처럼 동작한다.

## Source Observations
- `decision_advisory` 결과는 `fragmentation_detected: true`, `dynamic_chunk_count: 8`, `active_ticket_count: 232`를 보고했고, 오래된 archived ticket placeholder를 evidence로 반환했다.
- `synthesize_knowledge`는 동일 archive ticket과 placeholder plan을 반복 반환했다.
- DeukAgentContext `src/mcp/server.py`의 `synthesize_knowledge`는 rules/tickets/source를 모두 검색한 뒤 단순 distance 정렬 및 상위 slice를 수행한다.
- DeukAgentContext `src/mcp/rag_codec_adapter.py`는 placeholder를 skip summary로 표시하지만 응답 chunk 자체는 유지한다.
- DeukAgentRules `distillKnowledge()`는 ticket 본문의 일부 섹션만 추출한다. 현재 티켓 구조에서 핵심 분석은 대부분 `legacy split reference`에 있으므로 knowledge JSON이 빈 sections가 되기 쉽다.
- `templates/rules.d/deukcontext-mcp.md`는 RAG miss 시 `add_knowledge`를 optional로만 안내한다.

## Cause Hypotheses
- 검색 단계에 quality gate가 없어서 placeholder/중복/오래된 archive가 에이전트 응답까지 올라온다.
- DeukAgentRules archive 지식 증류가 legacy split reference를 읽지 않아 실제 분석과 검증 결과가 MCP에 자연 보강되지 않는다.
- 에이전트 규칙이 RAG를 "우선"으로만 말하고, 낮은 품질 결과를 버리고 로컬 코드 분석으로 전환하는 기준이 부족하다.
- `add_knowledge`가 miss 후 선택 사항으로 표현되어 reusable finding이 있어도 자연 호출되지 않는다.

## Decision Rationale
이번 패치는 DeukAgentRules 쪽에서 즉시 개선 가능한 두 지점을 먼저 고친다. MCP 서버의 protected file을 직접 수정하지 않고, 1) archive knowledge distillation에 legacy split reference analysis/decision/verification을 포함하고, 2) core/template RAG protocol에 quality gate와 natural enrichment 의무를 추가한다. DeukAgentContext 서버의 dedup/rerank/filter는 별도 티켓에서 다루는 것이 안전하다.

## Execution Strategy
`scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`를 확장해 ticket sections와 legacy split reference sections를 각각 JSON에 저장한다. legacy split reference 경로는 ticket frontmatter의 `legacy split reference`를 기준으로 cwd에서 읽는다. 테스트는 archive 실행 후 `.deuk-agent/knowledge/<ticket>.json`에 legacy split reference의 Problem Analysis, Source Observations, Decision Rationale, Verification Outcome이 들어가는지 검증한다. `core-rules/AGENTS.md`와 `templates/rules.d/deukcontext-mcp.md`에는 MCP 품질 게이트와 `add_knowledge` 승격 기준을 명시한다.

## Verification Design
`node --test scripts/tests/cli-ticket-commands.test.mjs`로 archive knowledge distillation regression을 검증한다. `npx deuk-agent-rule lint:md`로 수정된 markdown 문서와 티켓/플랜을 검증한다. 잔여 리스크는 DeukAgentContext 서버 내부 검색 랭킹/중복 제거가 아직 남는다는 점이며, protected-file 변경은 별도 티켓과 승인이 필요하다.

## Execution Notes
- Updated `distillKnowledge()` in `scripts/cli-ticket-commands.mjs` to store both ticket sections and legacy split reference analysis sections in `.deuk-agent/knowledge/<ticket>.json`.
- Added `extractMarkdownSections()` and `readLegacy split referenceSections()` so archive knowledge includes current Problem Analysis, Source Observations, Decision Rationale, Execution Notes, and Verification Outcome from the plan file.
- Updated `core-rules/AGENTS.md` to version 25 with an MCP Knowledge Quality Gate.
- Updated `templates/rules.d/deukcontext-mcp.md` to treat placeholder, duplicate, stale, or unrelated RAG hits as misses and require local code analysis plus `add_knowledge` for reusable findings.
- Added a regression test proving archive knowledge JSON includes legacy split reference analysis evidence.
- Added a DeukAgentContext dynamic knowledge fact for this exact source-level finding via `add_knowledge`.

## Verification Outcome
- `node --test scripts/tests/cli-ticket-commands.test.mjs` passed: 18/18 tests.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/rules.d/deukcontext-mcp.md .deuk-agent/tickets/sub/166-mcp-knowledge-quality-natural-re-joy-nucb.md `merged into this ticket` passed.
- Residual risk: DeukAgentContext MCP server still needs a separate protected-file ticket for search result deduplication, placeholder suppression, source-code-first reranking, and stale archive demotion.
