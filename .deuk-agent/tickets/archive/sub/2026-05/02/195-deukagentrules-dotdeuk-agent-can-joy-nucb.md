 - - - i d : 1 9 5 - d e u k a g e n t r u l e s - d o t d e u k - a g e n t - c a n - j o y - n u c b t i t l e : d e u k a g e n t r u l e s - d o t d e u k - a g e n t - c a n o n i c a l i z a t i o n p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k A g e n t R u l e s . d e u k - a g e n t 디 렉 토 리 의 현 재 / 레 거 시 혼 재 정 리 p r i o r i t y : P 2 t a g s : - d e u k - a g e n t - m i g r a t i o n - d o c s - a r c h i v e - s c r a t c h c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 1 1 : 3 2 - - - # d e u k a g e n t r u l e s - d o t d e u k - a g e n t - c a n o n i c a l i z a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - i n i t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - i n i t - c o m m a n d s . t e s t . m j s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - i n i t - c o m m a n d s . m j s , s c r i p t s / c l i - i n i t - l o g i c . m j s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / c l i - i n i t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - i n i t - c o m m a n d s . t e s t . m j s - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g i n i t m i g r a t i o n p a t h p l u s c u r r e n t . d e u k - a g e n t l a y o u t s t a t e - O u t p u t : m i n i m a l m i g r a t i o n a n d t e s t s t h a t m a k e . d e u k - a g e n t c a n o n i c a l a g a i n - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . - L e g a c y s c r a t c h r e p o r t s a n d l e g a c y a r c h i v e s h a r d d i r e c t o r i e s a r e n o r m a l i z e d i n t o c a n o n i c a l . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / a n d . d e u k - a g e n t / t i c k e t s / a r c h i v e / s u b / p a t h s .

## Merged Legacy Document


### 195 deukagentrules dotdeuk agent can joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`.deuk-agent` still contains a mix of canonical and legacy document storage patterns.

- `merged ticket body` is the canonical home for report-style artifacts.
- `docs/scratch/` is intended to be ephemeral, but it currently contains at least one report-style markdown file that is duplicated elsewhere.
- `tickets/archive/tickets/` is a legacy archive shard that still holds the old root-ticket shape.

The result is a confusing directory tree where a reader can encounter both current and historical artifacts in the same location, even when the canonical target already exists.

## Source Observations
- `core-rules/AGENTS.md` treats `docs/scratch/` as ephemeral scratch space.
- `scripts/cli-init-commands.mjs` already performs legacy structure migration and report migration during `init`.
- `merged ticket body` duplicates the canonical report in `merged ticket body`.
- `.deuk-agent/tickets/archive/tickets/044-deukagentrules-hardening-joy-nucb.md` is the only file left under the legacy `archive/tickets/` shard.

## Cause Hypotheses
- Earlier migrations normalized active tickets and walkthrough reports, but they did not fully prune every legacy residual path.
- Scratch space accumulated a report artifact that should have been kept only in merged reports.
- The old root-ticket archive shard remained after the ticket path recalculation fix, because the cleanup code only targeted the more common archive directories.

## Decision Rationale
- Extend the existing init migration rather than adding a separate one-off cleanup command.
- Remove duplicate scratch reports when a canonical walkthrough copy already exists.
- Migrate the legacy `archive/tickets/` shard into the canonical archive layout so the directory tree stops advertising an obsolete storage shape.

## Execution Strategy
- Add migration logic for scratch report cleanup and legacy archive shard relocation.
- Keep moves safe by deleting duplicate content only when the canonical destination already exists with identical content.
- Add regression tests for both the scratch report case and the archive shard case.

## Verification Design
- Run the focused init migration test file.
- Run markdown lint on the touched ticket and plan.
- Confirm the legacy scratch report disappears from `docs/scratch/` and the legacy archive shard no longer remains under `tickets/archive/tickets/`.

Residual risk:
- If `docs/scratch/` later accumulates a new report-like file with a different basename, the cleanup rule may need to be widened or paired with a stricter file-naming policy.

## Execution Notes

- Extended the init migration path to clean duplicate scratch reports and relocate the legacy `archive/tickets/` shard.
- Kept the migration conservative: duplicate content is removed only when the canonical target already exists with identical content.

## Verification Notes

- `node --test scripts/tests/cli-init-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/195-deukagentrules-dotdeuk-agent-can-joy-nucb.md `merged into this ticket`
- `npx deuk-agent-rule init --workflow execute --non-interactive`

Observed outcome:
- Duplicate scratch report `docs/scratch/065-doc-lint-after-document-write-ru-joy-nucb-report.md` was removed.
- Legacy archive shard `tickets/archive/tickets/044-deukagentrules-hardening-joy-nucb.md` was moved into `tickets/archive/sub/044-deukagentrules-hardening-joy-nucb.md`.
- `init` normalized the ticket index and synced the usual spoke files without reintroducing the legacy shard.
