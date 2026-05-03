 - - - i d : 1 6 1 - a u t o - d o c - l a n g u a g e - f r o m - u s e r - p r o m - j o y - n u c b t i t l e : a u t o - d o c - l a n g u a g e - f r o m - u s e r - p r o m p t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 티 켓 / p l a n 생 성 시 d o c s L a n g u a g e 와 본 문 언 어 를 사 용 자 현 재 프 롬 프 트 언 어 기 반 으 로 자 동 설 정 해 수 동 언 어 변 경 낭 비 를 줄 인 다 . p r i o r i t y : P 2 t a g s : - t i c k e t - d o c s - l a n g u a g e c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 1 : 5 1 : 1 9 - - - # a u t o - d o c - l a n g u a g e - f r o m - u s e r - p r o m p t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y a u t o - d o c - l a n g u a g e - f r o m - u s e r - p r o m p t - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 티 켓 / p l a n 생 성 시 d o c s L a n g u a g e 와 본 문 언 어 를 사 용 자 현 재 프 롬 프 트 언 어 기 반 으 로 자 동 설 정 해 수 동 언 어 변 경 낭 비 를 줄 인 다 . " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 티 켓 / p l a n 생 성 시 d o c s L a n g u a g e 와 본 문 언 어 를 사 용 자 현 재 프 롬 프 트 언 어 기 반 으 로 자 동 설 정 해 수 동 언 어 변 경 낭 비 를 줄 인 다 . " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 티 켓 / p l a n 생 성 시 d o c s L a n g u a g e 와 본 문 언 어 를 사 용 자 현 재 프 롬 프 트 언 어 기 반 으 로 자 동 설 정 해 수 동 언 어 변 경 낭 비 를 줄 인 다 . " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 161 auto doc language from user prom joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket create` currently resolves `docsLanguage` through CLI input, saved init config, and environment locale. That makes newly generated ticket and plan artifacts drift away from the user's current prompt language when a workspace config or system locale disagrees with the prompt. The ticket body and `legacy split reference` are the first records an agent reads, so the language decision must be stable at creation time.

## Source Observations
- `scripts/cli-ticket-commands.mjs` resolves the ticket template before parsing the final summary/from-plan body. The resolver currently prefers `opts.docsLanguage || config.docsLanguage || "auto"`.
- `scripts/cli-utils.mjs` has `normalizeDocsLanguage`, `inferDocsLanguageFromEnv`, `resolveDocsLanguage`, and localized template selection. There is no prompt-text language heuristic.
- `scripts/tests/cli-ticket-commands.test.mjs` already covers explicit docsLanguage template selection and localized fallback.
- `PROJECT_RULE.md` allows edits in `scripts/` and tests while generated consumer spokes and copied `AGENTS.md` outputs must not be edited directly.

## Cause Hypotheses
- The CLI treats saved configuration as a stronger signal than the current task text, which conflicts with the updated rule that user prompt language wins for tickets and plans.
- The ticket create path computes language too early, before the final summary is known for `--from-plan` cases.
- Existing tests focus on explicit language selection, so the prompt-language precedence gap can survive regression.

## Decision Rationale
Add a small text-language inference helper in `cli-utils` and use it only in `ticket create` language selection. Explicit `--docs-language ko|en` should continue to act as a direct user override. When the option is absent or `auto`, the final ticket text inputs should be checked before falling back to saved config and environment. This keeps init behavior unchanged and avoids broad template or config refactors.

## Execution Strategy
Move ticket-template resolution until after the final title/topic and summary are known. Build a prompt-language candidate from summary, title/topic, and parsed plan body when present. Resolve the ticket's stored `docsLanguage` from that candidate first, then config/env fallback. Add focused tests proving Korean prompt text overrides an English config and English prompt text overrides a Korean config when no explicit language flag is passed.

## Verification Design
Run markdown lint on the ticket and plan after Phase 1 edits. Then run the ticket command test file and the utility test file. Expected outcome: prompt-language inference tests pass without changing existing explicit docsLanguage behavior. Residual risk is heuristic ambiguity for mixed-language prompts; the implementation should prefer clear Hangul detection and otherwise fall back to English when enough Latin words are present.

## Verification Result
Markdown lint passed for the ticket and this plan. Focused tests passed with `node --test scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs` covering 34 subtests. Full script tests passed with `node --test scripts/tests/*.test.mjs` covering 40 subtests. No residual failures were observed.
