 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 6 0 7 : 1 1 : 0 0 g r o u p : m a i n i d : 0 8 2 - r e f a c t o r - c l i - t e c h n i c a l - d e b t - j o y - n u c b p r i o r i t y : P 2 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : c l o s e d s u m m a r y : " T a r g e t : [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - C o n t e x t F i l e s : [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] - R o o t C a u s e : T h e C L I i m p l e m e n t a t i o n a c c u m u l a t e d f r a g i l e h e u r i s t i c s ( r e g e x - b a s e d p a r s i n g , h a r d c o d e d p r o j e c t n a m e s , p s a u x s n i f f . . . " t a g s : r a g , f r o n t m a t t e r , m c p , t i c k e t s , a r c h i t e c t u r e t i t l e : r e f a c t o r - c l i - t e c h n i c a l - d e b t - - - # r e f a c t o r - c l i - t e c h n i c a l - d e b t > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - * * C o n t e x t F i l e s : * * [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] # # A n a l y s i s & C o n s t r a i n t s ( D e e p R e v i e w ) - * * R o o t C a u s e * * : T h e C L I i m p l e m e n t a t i o n a c c u m u l a t e d f r a g i l e h e u r i s t i c s ( r e g e x - b a s e d p a r s i n g , h a r d c o d e d p r o j e c t n a m e s , p s a u x s n i f f i n g ) t h a t r e d u c e r e l i a b i l i t y a n d p o r t a b i l i t y . - * * C o n s t r a i n t s * * : - M u s t r e m a i n c o m p a t i b l e w i t h N o d e . j s 1 8 + . - M u s t n o t b r e a k e x i s t i n g t i c k e t s t r u c t u r e s . - M u s t s t r i c t l y e n f o r c e P h a s e 0 i f M C P i s a c t i v e ( l o c a l o r r e m o t e ) . - * * R i s k * * : - T h r o w i n g e r r o r s o n i n v a l i d Y A M L m i g h t b r e a k e x i s t i n g w o r k f l o w s i f u s e r s h a v e c o r r u p t e d f i l e s . - M C P c o n n e c t i v i t y c h e c k s ( f e t c h ) m i g h t h a n g i f n o t p r o p e r l y t i m e d o u t . # # S t r i c t R u l e s C h e c k - [ x ] * * M a r k d o w n H y g i e n e * * : R u n n p m r u n l i n t : m d a f t e r e d i t s . - [ x ] * * N o H a r d c o d i n g * * : R e m o v e p r o j e c t - s p e c i f i c l i s t s ( P R U N E _ S U B M O D U L E _ L I S T ) . - [ x ] * * E r r o r H a n d l i n g * * : N o s w a l l o w i n g e r r o r s i n c o r e p a r s i n g l o g i c . L e t i t f a i l f a s t . - [ x ] * * C L I C o n s i s t e n c y * * : U n i f y c o d e p a t t e r n s a c r o s s a l l s c r i p t s / f i l e s . # # S c o p e ( I n / O u t ) - * * I N * * : s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - l o g i c . m j s . - * * O U T * * : b u n d l e / c o n t e n t , b i n / e n t r y p o i n t . # # T a s k s - [ x ] R e m o v e h a r d c o d e d P R U N E _ S U B M O D U L E _ L I S T a n d c l e a n u p c l i - u t i l s . m j s . - [ x ] R e f a c t o r p a r s e F r o n t M a t t e r t o u s e s t r i n g s p l i t / s t a r t s W i t h a n d t h r o w o n Y A M L e r r o r . - [ x ] R e f a c t o r t i t l e e x t r a c t i o n t o r e m o v e r e g e x a n d r e l y o n m e t a o r b a s e n a m e . - [ x ] I m p l e m e n t r o b u s t M C P v a l i d a t i o n ( c h e c k . m c p . j s o n / . c u r s o r / m c p . j s o n + S S E p i n g ) . - [ x ] S t a n d a r d i z e e r r o r h a n d l i n g a n d r e m o v e e x c e s s i v e t r y / c a t c h g u a r d s a c r o s s C L I . - [ x ] V e r i f y v i a n p x d e u k - a g e n t - r u l e t i c k e t l i s t a n d l i n t : m d . # # D o n e W h e n - [ x ] A l l r e g e x - b a s e d p a r s i n g i s r e p l a c e d w i t h s t r i n g l o g i c . - [ x ] P R U N E _ S U B M O D U L E _ L I S T i s d e l e t e d . - [ x ] M C P s k i p v a l i d a t i o n c o r r e c t l y d e t e c t s S S E a n d s t d i o s e r v e r s . - [ x ] n p m r u n l i n t : m d p a s s e s .

## Merged Legacy Document


### 082 refactor cli technical debt joy nucb report

# Walkthrough - Refactor CLI Technical Debt (082)

## Changes Made

### 1. Hardcoding Removal
- Removed `PRUNE_SUBMODULE_LIST` and `cleanSubmoduleStubs` from [cli-utils.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-utils.mjs).
- Refactored `performDefragmentation` in [cli-ticket-logic.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-logic.mjs) to be workspace-agnostic, checking for actual directory presence and `.deuk-agent` installation.

### 2. Regex-to-String Refactoring
- **FrontMatter**: Replaced regex with line-based split logic in `parseFrontMatter`. Now throws on YAML errors to prevent data loss.
- **Title Extraction**: Standardized title extraction to prioritize metadata, falling back to clean basename logic.
- **Project Detection**: Refactored `detectProjectFromBody` to use simple string checks.

### 3. MCP Validation Overhaul
- Removed `ps aux` / `tasklist` sniffing.
- Implemented `isMcpActive` helper in [cli-ticket-commands.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-commands.mjs) which:
  - Detects `.mcp.json`, `.cursor/mcp.json`, or `.vscode/mcp.json`.
  - Distinguishes between `stdio` (managed) and `SSE` (remote).
  - Pings SSE servers to verify connectivity before allowing `--skip-phase0`.

### 4. Code Pattern Unification
- Standardized error handling patterns across `scripts/`.
- Resolved `SyntaxError` by updating imports in `cli-init-commands.mjs`.

## Verification Results

### Automated Tests
- `npm run lint:md`: **PASSED**
- `npx deuk-agent-rule ticket list`: **PASSED** (Verified index integrity and title rendering).

### Manual Verification
- Verified that ticket creation correctly enforces Phase 0 summaries.
- Verified that `--skip-phase0` is blocked when a local MCP configuration is found.
