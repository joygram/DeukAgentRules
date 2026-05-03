 - - - i d : 1 9 7 - g l o b a l - d e u k a g e n t r o o t - d i r e c t o r y - u - j o y - n u c b t i t l e : g l o b a l - d e u k a g e n t r o o t - d i r e c t o r y - u n i f i c a t i o n - f o r - d e u k p a c k - c o n t e x t - r u l e s p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k / D e u k A g e n t R u l e s / D e u k A g e n t C o n t e x t . d e u k - a g e n t 디 렉 토 리 ( 문 서 · 티 켓 ) 정 규 화 및 월 별 a r c h i v e 적 용 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 2 7 : 2 8 - - - # g l o b a l - d e u k a g e n t r o o t - d i r e c t o r y - u n i f i c a t i o n - f o r - d e u k p a c k - c o n t e x t - r u l e s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y g l o b a l - d e u k a g e n t r o o t - d i r e c t o r y - u n i f i c a t i o n - f o r - d e u k p a c k - c o n t e x t - r u l e s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * : * * l e g a c y p l a n d o c o w n s e v i d e n c e , d e c i s i o n s , d e t a i l e d s t e p s , a n d v e r i f i c a t i o n n o t e s . - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " D e u k P a c k / D e u k A g e n t R u l e s / D e u k A g e n t C o n t e x t . d e u k - a g e n t 디 렉 토 리 ( 문 서 · 티 켓 ) 정 규 화 및 월 별 a r c h i v e 적 용 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " D e u k P a c k / D e u k A g e n t R u l e s / D e u k A g e n t C o n t e x t . d e u k - a g e n t 디 렉 토 리 ( 문 서 · 티 켓 ) 정 규 화 및 월 별 a r c h i v e 적 용 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " D e u k P a c k / D e u k A g e n t R u l e s / D e u k A g e n t C o n t e x t . d e u k - a g e n t 디 렉 토 리 ( 문 서 · 티 켓 ) 정 규 화 및 월 별 a r c h i v e 적 용 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 197 global deukagentroot directory u joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Ticket `197-global-deukagentroot-directory-u-joy-nucb` owns the scoped contract, phase gates, and lifecycle checklist.
- This plan contains only the analysis and execution trace requested for Phase 1 and verification planning.

## Problem Analysis
- Three worktrees (`DeukPack`, `DeukAgentRules`, `DeukAgentContext`) no longer have consistent `.deuk-agent` layout in `docs` and `tickets`.
- `DeukPack` and `DeukAgentContext` have large active `merged ticket body`s`/`merged ticket body` trees at root without archive partitioning.
- `DeukAgentRules` has a partially normalized doc archive plus active root docs; not obviously wrong, but mixed legacy/open artifact placement persists across all 3 repos.
- Ticket trees include multiple legacy/uneven archive groupings (`archive/main`, `archive/core`, `archive/global`, `archive/tickets` nesting), and `archive/tickets` still exists in `DeukAgentContext`.
- `archive/sub` is used but at different depths: `DeukPack` and some items in `DeukAgentRules` are depth-3 (`archive/sub/<file>.md`) while `DeukRules/Context` contain depth-4+ (`archive/sub/YYYY-MM/DD/<file>.md`) patterns.

## Source Observations
- `DeukAgentRules/core-rules/AGENTS.md` version is `25`; this task already has open ticket `197` in progress and currently has no `ACTIVE_TICKET` lock.
- Relevant CLI migration helpers exist in `DeukAgentRules/scripts/cli-ticket-migration.mjs` and `cli-init-commands.mjs`.
  - `migrateLegacyArchiveTickets()` handles legacy `archive/tickets/*` → `archive/sub/*`.
  - `normalizeTicketPaths()` repairs index/path drifts after moves.
- `DeukAgentRules/scripts/cli-utils.mjs` defines canonical ticket folder roots and archive path policy as `AGENT_ROOT_DIR/tickets/archive/<group>/<...>`.
- `DeukPack` currently has no `merged ticket body` and all archive ticket markdown files are flat under `tickets/archive/sub`.
- `DeukAgentContext` currently has both `tickets/archive/sub` and legacy `tickets/archive/tickets` with month/day nesting.
- `DeukAgentRules` already has `merged into this ticket`,merged reports}` but most historical docs in this repo are mixed with active root docs and are not consistently archived by status.

## Cause Hypotheses
- Migration and archival tools were applied per repository at different times and with different target options, producing mixed layouts.
- One-off cleanup focused on specific subtrees (e.g., only plan docs in one repo) without synchronized execution across sibling repos.
- Legacy archive folders (`archive/tickets`, `archive/core`, `archive/global`, `archive/main`) were retained as historical residue instead of being normalized to a unified active layout.
- Active-vs-closed doc split was not consistently enforced in bulk cleanup runs, so non-active docs remained at root.

## Decision Rationale
- Keep open tickets/docs available in the canonical active positions (`tickets/sub/*.md`, active docs under `merged ticket body`s`/`merged reports`).
- Move non-open documentation under monthly archive partitions per repo to improve discoverability and parity with earlier cleanup decisions (`merged into this ticket`).
- Normalize legacy ticket archive locations by moving `tickets/archive/tickets` into `tickets/archive/sub` and pruning now-empty legacy archive containers.
- Avoid aggressive reclassification of ticket `status` itself; only file-path migration and consistency cleanup are performed, with index reconciliation afterward.
- Do not rename or edit ticket content unless required by existing tooling (`summary`/`legacy split reference` migration is out of scope for this ticket).

## Execution Strategy
- Fill ticket 197 with a concrete contract and keep `legacy split reference` as the detailed reasoning artifact.
- For each workspace in scope (`DeukPack`, `DeukAgentRules`, `DeukAgentContext`):
  1. Snapshot current ticket and doc counts (docs: plans/merged reports, tickets: sub/archive).
  2. Back up candidate move sets by dry-run style inspection: identify docs tied to currently open tickets and leave them in active locations; move the rest to archive.
  3. Build doc destination as `merged into this ticket`.
     - `YYYY-MM` source fallback: ticket frontmatter `createdAt` month where ticket is found; if missing, use file mtime month.
  4. Normalize ticket archive trees:
     - `tickets/archive/tickets/*` → `tickets/archive/sub/*` (when duplicates/content identical, keep canonical destination).
     - Remove now-empty legacy archive dirs (`archive/main`, `archive/core`, `archive/global`, legacy `archive/tickets`) to reduce drift.
  5. Run rebuild/validation paths for ticket index consistency after moves.
- Track migration evidence and deltas in the existing walkthrough/report output and final ticket comments.

## Verification Design
- Structural checks per workspace after each phase:
  - `find `merged ticket body` -maxdepth 3 -type d` and `find `merged ticket body` -maxdepth 4 -type f -name '*.md'` confirm archive partition presence.
  - `find .deuk-agent/tickets -maxdepth 4 -type d | sort` confirms no legacy archive groups remain.
  - Ticket and doc counts before/after by type (`plans`, `merged reports`, `tickets/sub`, `tickets/archive`).
- Tooling checks:
  - `npx deuk-agent-rule lint:md` on the 197 ticket+plan and touched artifacts before lifecycle transition.
  - `npx deuk-agent-rule ticket list --non-interactive --json` in each repo if available to confirm open/archived visibility.
  - Rebuild ticket index where needed to synchronize moved paths.
- Residual risk log:
  - Missing/duplicate ticket IDs in docs may force fallback archive month by mtime; those cases should be recorded in migration log.
  - Duplicate destination filenames require skip/overwrite policy verification before execution.

## Execution Log
- Applied one-pass cleanup on:
  - `/home/joy/workspace/DeukPack`
  - `/home/joy/workspace/DeukAgentRules`
  - `/home/joy/workspace/DeukAgentContext`
- Executed as a structural migration using:
  - ticket status map from `.deuk-agent/tickets/**/*.md` frontmatter.
  - active docs kept when status is `open`.
  - non-active docs moved to `merged into this ticket`.
  - legacy ticket archive groups moved into canonical `.deuk-agent/tickets/archive/sub/...`.
- Result summary:
  - `DeukPack`: plans moved 83 / kept 45, merged reports moved 29 / kept 25, ticket legacy groups unchanged (none matched our legacy-group target set).
  - `DeukAgentRules`: plans moved 89 / kept 15, merged reports moved 49 / kept 3, ticket legacy groups moved 4.
  - `DeukAgentContext`: plans moved 24 / kept 32, merged reports moved 8 / kept 25, ticket legacy groups moved 2.
- Structural verification:
  - Archive docs now exist under monthly partitions in all repos.
  - Legacy ticket archive roots (`main`, `core`, `global`, `tickets`) no longer remain under each repository's `.deuk-agent/tickets/archive`.
- Tooling verification:
  - `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/197-global-deukagentroot-directory-u-joy-nucb.md `merged into this ticket` passed.
  - `npx deuk-agent-rule ticket list --non-interactive --json` executed for each scope repo and returned valid JSON with expected open/archived distributions.
- Residual risks and open items:
  - Some repositories had existing historical `.deuk-agent` structural drift beyond this ticket scope; only requested directories were normalized.
  - Additional pass could normalize every pre-existing legacy `tickets/archive/*` branch depth pattern if strict canonical-depth policy changes.
