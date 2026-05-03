 - - - i d : 1 9 0 - s s o t - o n l i n e - c o n t e x t - a r c h i v e - p o l i - j o y - n u c b t i t l e : s s o t - o n l i n e - c o n t e x t - a r c h i v e - p o l i c y p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : S S O T 는 로 컬 규 칙 의 단 일 진 실 , c o n t e x t 는 온 라 인 R A G 보 조 , a r c h i v e 는 영 구 기 록 층 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 1 : 3 2 : 0 7 - - - # s s o t - o n l i n e - c o n t e x t - a r c h i v e - p o l i c y > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y s s o t - o n l i n e - c o n t e x t - a r c h i v e - p o l i c y - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " S S O T 는 로 컬 규 칙 의 단 일 진 실 , c o n t e x t 는 온 라 인 R A G 보 조 , a r c h i v e 는 영 구 기 록 층 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " S S O T 는 로 컬 규 칙 의 단 일 진 실 , c o n t e x t 는 온 라 인 R A G 보 조 , a r c h i v e 는 영 구 기 록 층 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " S S O T 는 로 컬 규 칙 의 단 일 진 실 , c o n t e x t 는 온 라 인 R A G 보 조 , a r c h i v e 는 영 구 기 록 층 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 190 ssot online context archive poli joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The repository already treats `AGENTS.md` as the global SSoT, but the operational boundary around DeukAgentContext needed to be stated more explicitly: it should act as online advisory memory only, not as a local cache or second truth source. The archive layer also needed to be called out as the durable place for completed work so active context stays small and current.

## Source Observations
- `docs/principles.md` and `docs/architecture.md` already describe SSoT, but did not explicitly state that RAG must stay online-only.
- `templates/rules.d/deukcontext-mcp.md` already separates RAG quality-gate behavior from source-of-truth behavior, which makes it a natural place to encode the online-only rule.
- `core-rules/AGENTS.md` already treats DeukAgentContext as advisory memory, so the new wording can tighten that rule without changing workflow mechanics.
- Archive behavior already exists through ticket archive and knowledge distillation, so the missing piece is policy clarity rather than new implementation.

## Cause Hypotheses
- The system had the right mechanics, but the source-of-truth boundary was stated in a way that still left room for local mirrors or cached snapshots to be treated as context.
- Without an explicit archive-preservation rule, completed work can remain conceptually in the active loop even when it has already been archived.

## Decision Rationale
I chose to tighten the policy language in the stable docs and RAG protocol instead of adding new runtime behavior. That keeps the rule system coherent, avoids unnecessary code churn, and makes the intended data flow obvious: local code and tickets are truth, online RAG is advisory, archive is durable history.

## Execution Strategy
1. Update the English and Korean principles docs to state that DeukAgentContext is online-only advisory memory.
2. Add an explicit archive-preservation principle so completed work is pushed out of active context.
3. Mirror the same boundary in the DeukContext MCP protocol and core rules.
4. Keep the ticket/plan docs aligned with the final policy wording.

## Verification Design
Run `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/190-ssot-online-context-archive-poli-joy-nucb.md `merged into this ticket` docs/principles.md docs/principles.ko.md docs/architecture.md docs/architecture.ko.md templates/rules.d/deukcontext-mcp.md core-rules/AGENTS.md`.

Expected outcome:
- Markdown lint passes for the updated rule documents.
- The policy now clearly states SSoT, online-only RAG usage, and archive preservation.

Verification Outcome:
- Implemented in docs and core rules; `npx deuk-agent-rule lint:md` passed for the touched policy files.
