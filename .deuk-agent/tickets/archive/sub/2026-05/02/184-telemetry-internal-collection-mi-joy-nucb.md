 - - - i d : 1 8 4 - t e l e m e t r y - i n t e r n a l - c o l l e c t i o n - m i - j o y - n u c b t i t l e : t e l e m e t r y - i n t e r n a l - c o l l e c t i o n - m i r r o r - i n t e g r a t i o n - t e s t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 텔 레 매 트 리 내 부 수 집 과 미 러 연 동 동 작 을 검 증 하 는 테 스 트 를 추 가 하 고 , 내 부 w o r k f l o w e v e n t 와 미 러 경 계 가 서 로 간 섭 하 지 않 는 지 확 인 한 다 . p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 1 3 : 3 3 - - - # t e l e m e t r y - i n t e r n a l - c o l l e c t i o n - m i r r o r - i n t e g r a t i o n - t e s t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / s y n c - o s s . m j s a n d t h e r e l a t e d t e l e m e t r y / m i r r o r t e s t c o v e r a g e n e e d e d t o p r o v e i n t e r n a l t e l e m e t r y s t a y s o u t o f t h e p u b l i c m i r r o r c o n t r a c t - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / s y n c - o s s . m j s a n d t h e a s s o c i a t e d t e s t f i l e ( s ) d i r e c t l y r e q u i r e d t o v e r i f y t h a t i n t e r n a l t e l e m e t r y c o l l e c t i o n d o e s n o t l e a k i n t o t h e O S S m i r r o r c o n t r a c t - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t a m i r r o r - b o u n d a r y t e s t f o r i n t e r n a l t e l e m e t r y c o l l e c t i o n - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t p r o v e i n t e r n a l t e l e m e t r y s t a y s o u t o f t h e p u b l i c m i r r o r p a y l o a d a n d f i l e c o n t r a c t - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 184 telemetry internal collection mi joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The telemetry implementation now writes both manual work logs and internal workflow events into `.deuk-agent/telemetry.jsonl`. The remaining risk is not the telemetry data itself, but whether the public mirror sync path accidentally treats that internal collection as part of the mirror contract.

`scripts/sync-oss.mjs` currently mirrors package/source artifacts into the OSS tree. We need a focused test that proves the mirror payload is still limited to public distributable files and does not grow internal telemetry-specific paths or collections.

## Source Observations
- `scripts/cli-telemetry-commands.mjs` now separates `source: "internal"` / `kind: "workflow_event"` entries from work logs during telemetry summary.
- `scripts/cli-ticket-commands.mjs` appends internal workflow events for ticket lifecycle actions and knowledge distillation.
- `scripts/sync-oss.mjs` builds the OSS mirror from public files only and never references `.deuk-agent` paths.
- There is currently no direct test that locks the mirror payload against telemetry-specific leakage.

## Cause Hypotheses
- The OSS sync script is written as a top-level side-effect module, which makes it easy to test by behavior but harder to isolate without a small exported helper.
- The current coverage exercises telemetry summary behavior, but not the boundary between internal telemetry storage and public mirror packaging.
- Without an explicit test, future edits to the sync script could accidentally widen the mirrored file set.

## Decision Rationale
Add a small pure helper in `scripts/sync-oss.mjs` that constructs the mirrored package payload, then test that helper. This keeps the behavior stable without introducing a broad refactor or a fragile integration harness.

Alternative approaches were not chosen:
- Running the full sync script in a temp OSS workspace is heavier and depends on repository layout assumptions.
- Static string assertions on the source file would miss real contract drift in the mirrored package payload.

## Execution Strategy
1. Extract the OSS package payload construction into a named export.
2. Add a unit test that feeds a representative source package into that helper and asserts the mirrored `files` contract stays public-only.
3. Include an assertion that the payload does not introduce `.deuk-agent` or telemetry-specific paths.
4. Run the focused test plus the broader `node --test scripts/tests/*.test.mjs` suite.

## Verification Design
Commands:
- `node --test scripts/tests/sync-oss.test.mjs`
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/184-telemetry-internal-collection-mi-joy-nucb.md `merged into this ticket`

Expected outcomes:
- The mirror helper keeps only public distributable paths in the OSS payload.
- Telemetry-specific internal paths are absent from the mirror contract.
- Markdown lint passes for the ticket and plan.

Residual risks:
- The test will verify the contract at the package-payload level, not by actually publishing to a remote OSS repository.

## Verification Outcome
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/184-telemetry-internal-collection-mi-joy-nucb.md `merged into this ticket` passed.
- `node --test scripts/tests/sync-oss.test.mjs scripts/tests/cli-telemetry-commands.test.mjs scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs` passed.
- The OSS mirror helper now has a direct contract test that rejects `.deuk-agent` and `telemetry.jsonl` from the mirrored package payload.
