 - - - i d : 1 9 3 - t i c k e t - f o l d e r - c a n o n i c a l i z a t i o n - j o y - n u c b t i t l e : t i c k e t - f o l d e r - c a n o n i c a l i z a t i o n p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 티 켓 폴 더 와 레 거 시 티 켓 / 보 고 서 흔 적 을 i n i t 마 이 그 레 이 션 으 로 정 본 구 조 로 정 리 p r i o r i t y : P 2 t a g s : - t i c k e t s - m i g r a t i o n - r e p o r t s - a r c h i v e - p h a s e 1 c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 1 : 5 7 : 5 8 - - - # t i c k e t - f o l d e r - c a n o n i c a l i z a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y t i c k e t - f o l d e r - c a n o n i c a l i z a t i o n - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 티 켓 폴 더 와 레 거 시 흔 적 을 i n i t 마 이 그 레 이 션 으 로 정 본 구 조 로 정 리 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 티 켓 폴 더 와 레 거 시 흔 적 을 i n i t 마 이 그 레 이 션 으 로 정 본 구 조 로 정 리 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 티 켓 폴 더 와 레 거 시 흔 적 을 i n i t 마 이 그 레 이 션 으 로 정 본 구 조 로 정 리 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . - L e g a c y r e p o r t a r t i f a c t s n o w l i v e u n d e r . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / , a n d e m p t y l e g a c y t i c k e t f o l d e r s a r e r e m o v e d b y i n i t m i g r a t i o n .

## Merged Legacy Document


### 193 ticket folder canonicalization joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The ticket tree is still carrying multiple legacy shapes at once.

- Active tickets live under `.deuk-agent/tickets/sub/`.
- Historical archive shards live under `.deuk-agent/tickets/archive/`.
- Old root/group folders such as `core/`, `global/`, `main/`, and `tickets/` still exist as empty or semi-empty remnants.
- A legacy report file still lives under `.deuk-agent/tickets/reports/`, even though current report flow writes to `merged ticket body`.

The workspace is not wrong because of one broken path. It is noisy because canonical and legacy storage locations co-exist, which makes navigation and cleanup harder than necessary.

## Source Observations
- `scripts/cli-init-commands.mjs` already runs legacy structure migration, path normalization, frontmatter migration, and spoke/template sync in `init`.
- `scripts/cli-ticket-migration.mjs` contains `performUpgradeMigration()`, `performDefragmentation()`, and `normalizeTicketPaths()`, so the cleanup hook already exists.
- `scripts/cli-ticket-commands.mjs` writes reports to `merged ticket body` when attaching or auto-detecting reports.
- `scripts/tests/cli-ticket-commands.test.mjs` already expects `merged ticket body` as the canonical report location.
- Legacy archived ticket `archive/sub/051-agent-fast-track-hardening-joy-nucb.md` still links to `../../reports/REPORT-051-agent-fast-track-hardening-joy-nucb.md`.

## Cause Hypotheses
- The migration path handled active tickets and archive shards, but not legacy report placement.
- Empty legacy ticket root folders were left behind after earlier directory reshaping.
- Old reports survived because archived ticket links still pointed at the legacy `tickets/reports/` location.

## Decision Rationale
- Extend the existing migration path instead of adding a separate cleanup command.
- Canonicalize report storage into `merged ticket body` so current behavior and historical artifacts use one report location.
- Remove or empty legacy folder shells only after their contents are moved or re-linked.
- Keep archive history intact while reducing the number of active storage roots.

## Execution Strategy
- Add migration steps for legacy ticket/report folder cleanup.
- Move or normalize legacy report artifacts into the canonical walkthrough/report area.
- Rebuild index state after file moves so active/archive paths stay consistent.
- Add regression coverage for the legacy report migration and cleanup behavior.

## Verification Design
- `npx deuk-agent-rule init --dry-run --workflow execute --non-interactive`
- `npx deuk-agent-rule init --workflow execute --non-interactive`
- `node --test scripts/tests/*.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/193-ticket-folder-canonicalization-joy-nucb.md `merged into this ticket`

Expected outcome:
- Legacy ticket/report folder noise is reduced without breaking archived ticket links.
- Canonical report storage remains under `merged ticket body`.
- Index and archive paths remain consistent after migration.

Residual risk:
- If any legacy ticket report is referenced outside the archive ticket tree, the migration may need a follow-up link repair ticket rather than a blind move.

## Execution Notes

- Extended the init migration path so it now handles legacy report files under `.deuk-agent/tickets/reports/`.
- Canonical report storage is now `merged ticket body`, and archived ticket links are rewritten to match their per-file relative path.
- Empty legacy ticket root folders `.deuk-agent/tickets/core/`, `.deuk-agent/tickets/global/`, `.deuk-agent/tickets/main/`, and `.deuk-agent/tickets/reports/` are pruned after migration.

## Verification Notes

- `node --test scripts/tests/cli-init-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/193-ticket-folder-canonicalization-joy-nucb.md `merged into this ticket`

Observed outcome:
- Legacy report `REPORT-051-agent-fast-track-hardening-joy-nucb.md` was moved into `merged ticket body`.
- Archived ticket `051-agent-fast-track-hardening-joy-nucb.md` now links to the canonical walkthrough path.
- Empty legacy ticket directories were removed during migration.
