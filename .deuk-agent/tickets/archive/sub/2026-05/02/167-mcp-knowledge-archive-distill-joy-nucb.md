 - - - i d : 1 6 7 - m c p - k n o w l e d g e - a r c h i v e - d i s t i l l - j o y - n u c b t i t l e : m c p - k n o w l e d g e - a r c h i v e - d i s t i l l p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : e n s u m m a r y : C o n t i n u e v 2 5 M C P k n o w l e d g e q u a l i t y g a t e w o r k b y c o m p l e t i n g t i c k e t a r c h i v e k n o w l e d g e d i s t i l l a t i o n , e v i d e n c e c a p t u r e , a n d v e r i f i c a t i o n . p r i o r i t y : P 2 t a g s : - t i c k e t - k n o w l e d g e - a r c h i v e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 1 : 1 2 : 1 8 - - - # m c p - k n o w l e d g e - a r c h i v e - d i s t i l l > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / r u l e s . d / d e u k c o n t e x t - m c p . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - m i g r a t i o n . m j s , s c r i p t s / c l i - i n i t - * . m j s , s c r i p t s / c l i . m j s , s c r i p t s / l i n t - m d . m j s , r e l e v a n t d o c s , a n d m a t c h i n g t e s t s . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d o c s / a r c h i t e c t u r e . m d , r e c e n t g i t h i s t o r y , c u r r e n t d i f f , a n d t a r g e t s o u r c e f i l e s . - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : D e u k A g e n t R u l e s r u l e h u b / t e m p l a t e d o c s , t i c k e t / a r c h i v e C L I b e h a v i o r , l e g a c y p a t h c o n s t a n t c l e a n u p a l r e a d y p r e s e n t i n t h e c o n t i n u a t i o n d i f f , m a r k d o w n l i n t h e l p e r , a n d t e s t s p r o v i n g t h e b e h a v i o r . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : v 2 5 M C P / R A G q u a l i t y r u l e u p d a t e s , e x i s t i n g a r c h i v e / c r e a t e b e h a v i o r , f r o n t m a t t e r c o n v e n t i o n s , r e c e n t c o m m i t s s h o w i n g t i c k e t r e s u m e / a r c h i v e h a r d e n i n g , a n d t h e c u r r e n t u n c o m m i t t e d d i f f . - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t e n s u r e a r c h i v e k n o w l e d g e J S O N p r e s e r v e s t i c k e t s c o p e p l u s a n a l y s i s , t i c k e t a n a l y s i s D o c d e f a u l t s u s e s h a r e d c o n s t a n t s , a n d d o c s / t e m p l a t e s d e s c r i b e t h e R A G q u a l i t y g a t e a n d g i t - h i s t o r y f a l l b a c k a c c u r a t e l y . - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 167 mcp knowledge archive distill joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket next` found no active or open ticket even though the working tree contains substantial continuation changes. Recent commits show active hardening around ticket resume, archive rollback, archived index recovery, and dry-run side effects. The current diff extends that same line of work with v25 MCP/RAG quality rules and archive-time knowledge distillation, so this follow-up ticket records the missing active-ticket boundary before continuing execution.

The core product gap is that archive knowledge should remain useful after Phase 1 split ticket content away from legacy split reference analysis. If distillation only reads the ticket body, closed-ticket knowledge loses the agent's problem analysis, source observations, rationale, and verification outcomes now stored in the legacy split reference.

## Source Observations
`core-rules/AGENTS.md` is now version 25 and adds an MCP knowledge quality gate: narrow searches, two-call limit, treating stale or placeholder results as misses, local source as truth, and promotion of reusable findings to DeukAgentContext.

`templates/rules.d/deukcontext-mcp.md` mirrors the RAG guidance for generated consumer spokes, while `PROJECT_RULE.md` marks those consumer spokes as generated from templates through `npx deuk-agent-rule init`.

`scripts/cli-ticket-commands.mjs` currently adds helpers to extract ticket sections and to read analysis sections from `meta.legacy split reference` during `distillKnowledge`. The related test in `scripts/tests/cli-ticket-commands.test.mjs` expects archived knowledge JSON to contain `summary`, `sourceTicketPath`, `legacy split reference`, ticket `sections`, and legacy split reference `analysis`.

`scripts/cli-ticket-migration.mjs` switches default legacy split reference construction to the shared `PLAN_LINKS_DIR` constant, matching the no-hardcoded-path direction already enforced by architecture tests. Additional diffs in init and lint helpers replace legacy literal paths with shared constants.

Docs already describe the new fallback rule: when no active/open ticket exists, inspect recent git history before creating a follow-up ticket.

## Cause Hypotheses
The missing active ticket is likely a workflow-state gap rather than a code-design change: prior closed/archive cleanup left no open continuation record while implementation edits remained in progress.

The archive knowledge gap likely emerged from the recent ticket/plan separation. Existing archive logic knew how to distill ticket body sections, but it did not yet follow the `legacy split reference` pointer to capture the analysis sections that Phase 1 now requires.

Architecture tests needed small command-execution cleanup because shell-quoted grep patterns can behave differently across environments; using `execFileSync` makes those checks less dependent on shell parsing.

## Decision Rationale
Continue the existing implementation instead of starting a broader refactor. The current diff is already scoped to rule text, archive distillation, path-constant cleanup, and tests, which aligns with the recent commit history.

Keep the ticket body thin and put detailed reasoning here because v25 explicitly separates ticket-owned scope/contracts from legacy split reference-owned analysis. For archive distillation, store legacy split reference analysis under a separate `analysis` key rather than mixing it with ticket `sections`; this preserves the source boundary and keeps consumers able to distinguish contract data from reasoning evidence.

## Execution Strategy
Finish Phase 1 by linting this ticket and plan, then move to Phase 2 because the user explicitly requested continuation. In execution, review the current implementation for edge cases around missing legacy split reference files, absolute-vs-relative plan paths, section extraction, and JSON shape stability. Keep edits inside the declared APC boundary and avoid touching generated consumer outputs.

After implementation review, run the targeted ticket tests first, then the full project test suite if the targeted run passes. Run markdown lint after ticket/plan edits and record any failures here.

## Verification Design
Run `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/167-mcp-knowledge-archive-distill-joy-nucb.md `merged into this ticket` for Phase 1 markdown validation.

Run `node --test scripts/tests/cli-ticket-commands.test.mjs` to verify archive knowledge distillation and ticket command behavior.

Run `node --test scripts/tests/*.test.mjs` for broader regression coverage across CLI, architecture guard, migration, and utility behavior.

Residual risk is that existing uncommitted deletions/INDEX changes from archive cleanup may be intentionally produced by the ticket CLI. Do not revert them without explicit user direction; keep source changes independent of that state.

## Execution Notes
`extractMarkdownSections` now escapes requested header names before building its matcher and returns the captured section body directly. This fixes literal section names containing regex syntax, especially `Agent Permission Contract (APC)`.

The archive knowledge test now asserts that the parenthesized APC section is preserved in `sections`, alongside legacy split reference analysis stored under `analysis`.

## Verification Outcome
Phase 1 markdown lint passed for the ticket and plan after adding required ticket `priority` and `tags` frontmatter.

`node --test scripts/tests/cli-ticket-commands.test.mjs` passed: 21 tests.

`node --test scripts/tests/*.test.mjs` passed: 45 tests.
