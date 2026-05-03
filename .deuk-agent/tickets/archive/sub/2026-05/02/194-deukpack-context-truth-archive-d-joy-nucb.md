 - - - i d : 1 9 4 - d e u k p a c k - c o n t e x t - t r u t h - a r c h i v e - d - j o y - n u c b t i t l e : d e u k p a c k - c o n t e x t - t r u t h - a r c h i v e - d o c - s y n c p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k 문 서 에 S S O T / c o n t e x t / a r c h i v e 원 칙 반 영 p r i o r i t y : P 2 t a g s : - d e u k p a c k - d o c s - m c p - a r c h i v e - s s o t c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 0 6 : 0 2 - - - # d e u k p a c k - c o n t e x t - t r u t h - a r c h i v e - d o c - s y n c > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . m d a n d d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . k o . m d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . m d , d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . k o . m d - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . m d a n d d e u k p a c k . a p p / d o c s / j o u r n a l / a i - c o n t r o l - p l a n e - d e s i g n . k o . m d - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g D e u k P a c k d o c c o n t e x t r e q u i r e d t o d o c u m e n t S S O T / c o n t e x t / a r c h i v e s e p a r a t i o n - O u t p u t : m i n i m a l d o c u m e n t a t i o n u p d a t e a n d v e r i f i c a t i o n t h a t s a t i s f y t h e d o c s y n c - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . - D e u k P a c k j o u r n a l d o c s n o w i n c l u d e a n e x p l i c i t s o u r c e / c o n t e x t / a r c h i v e h i e r a r c h y .

## Merged Legacy Document


### 194 deukpack context truth archive d joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
DeukPack's MCP/context story already explains intent and identity, but it does not yet state the operating hierarchy clearly enough for agents and contributors.

- The journal article explains why structure alone is not enough for AI context.
- The distribution/source guide explains when source should be used, but it does not explicitly separate current truth, advisory context, and long-term archive.
- Without that distinction, a reader can incorrectly treat cached context or archived notes as if they were the current source of truth.

## Source Observations
- `deukpack.app/docs/journal/ai-control-plane-design.md` already frames MCP as access plus intent, with `Identity Card` semantics for AI agents.
- `deukpack.app/docs/journal/ai-control-plane-design.ko.md` mirrors the same argument in Korean, so the update should stay bilingual and structurally aligned.
- `deukpack.app/docs/tutorial/distribution-vs-source.md` and `.ko.md` already distinguish distribution from source, which is a good nearby reference for a truth-layer note.
- `deukpack.app/docs/products/mcp-hub.md` presents MCP as a bridge/hub, not as the authoritative storage layer.

## Cause Hypotheses
- The documentation emphasizes how to reach data and how to model identity, but not which layer is authoritative when they disagree.
- Archive and context terminology are used informally across docs, so the practical hierarchy is left implicit.

## Decision Rationale
- Add a short truth-layer section to the journal article rather than inventing a new standalone doc.
- Keep the message close to the MCP/context discussion so the "source is truth, context is advisory, archive is durable history" rule lands where the confusion starts.
- Use the Korean and English article pair to avoid asymmetric guidance.

## Execution Strategy
- Insert a concise section before the conclusion in both journal variants.
- Describe three layers explicitly: source/SSOT, online context, and archive.
- Keep the wording descriptive rather than policy-heavy so the article still reads like a product essay.

## Execution Notes

- Added a new truth-layer section to `deukpack.app/docs/journal/ai-control-plane-design.md`.
- Added the same guidance in Korean to `deukpack.app/docs/journal/ai-control-plane-design.ko.md`.
- Kept the change local to the journal pair instead of spreading the same idea into multiple docs at once.

## Verification Design
- Review the edited docs for heading consistency and translation parity.
- Run markdown lint on the touched files if available in the repo.
- Confirm the new section does not change product semantics beyond the intended clarification.

Residual risk:
- If this note proves too narrow, a follow-up update may still be needed in the distribution/source guide to reinforce the same hierarchy from another angle.

## Verification Notes

- `git -C /home/joy/workspace/deukpack.app diff --check -- docs/journal/ai-control-plane-design.md docs/journal/ai-control-plane-design.ko.md`
- Manual review confirmed the inserted section reads consistently in English and Korean.

Observed outcome:
- The DeukPack article now states the operating hierarchy explicitly: source is the SSOT, context is advisory, archive is durable history.
- The Korean article mirrors the same hierarchy and preserves the original narrative tone.
