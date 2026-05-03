 - - - i d : 1 4 6 - r a g - j s o n - s c h e m a - a r t i f a c t s - j o y - n u c b t i t l e : r a g - j s o n - s c h e m a - a r t i f a c t s p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : R A G c a n d i d a t e 와 m e t r i c s 산 출 물 에 대 해 실 제 J S O N S c h e m a 파 일 을 추 가 한 다 . c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 2 : 3 4 : 4 2 p r i o r i t y : P 2 t a g s : - d e u k p a c k - s c h e m a - r a g - m e t r i c s - a r t i f a c t - - - # r a g - j s o n - s c h e m a - a r t i f a c t s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * . d e u k - a g e n t / d o c s / s c h e m a s / , t h i s t i c k e t , l i n k e d p l a n / r e p o r t . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , l e g a c y p l a n d o c l e g a c y p l a n d o c D e u k P a c k . d e u k e x a m p l e s . - * * D e s i g n R a t i o n a l e : * * 1 3 1 / 1 3 2 에 서 s c h e m a 를 말 했 지 만 실 제 m a c h i n e - r e a d a b l e s o u r c e a r t i f a c t 가 없 었 다 . D e u k P a c k S S o T 방 식 에 맞 춰 . d e u k s c h e m a 를 먼 저 추 가 한 다 . - * * C o n s t r a i n t s : * * D e u k P a c k r e p o 와 g e n e r a t e d o u t p u t s 는 수 정 하 지 않 는 다 . J S O N S c h e m a e m i t / b u i l d / c o d e g e n 은 b r o a d g e n e r a t i o n 이 므 로 별 도 승 인 전 실 행 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - F o r b i d d e n m o d u l e s : / h o m e / j o y / w o r k s p a c e / D e u k P a c k / * * , g e n e r a t e d a r t i f a c t s , o f f i c i a l R A G i n d e x , b e n c h m a r k / r e p o r t g e n e r a t e d o u t p u t s , u n r e l a t e d s o u r c e c o d e . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d D C - C O D E G E N ; c o r e - r u l e s G 7 / G 8 ; D e u k P a c k P R O J E C T _ R U L E g e n e r a t e d o u t p u t s m u s t c o m e f r o m s o u r c e / b u i l d p i p e l i n e . # # # [ C O N T R A C T ] - I n p u t : 1 3 1 c a n d i d a t e s c h e m a m a r k d o w n , 1 3 2 m e t r i c s s p e c m a r k d o w n , D e u k P a c k . d e u k s y n t a x e x a m p l e s . - O u t p u t : D e u k P a c k . d e u k s c h e m a s o u r c e f i l e s f o r R A G c a n d i d a t e a n d R A G m e t r i c s r e c o r d s . - S i d e e f f e c t s : d o c s / s c h e m a a r t i f a c t s o n l y . N o c o d e g e n , n o g e n e r a t e d J S O N S c h e m a , n o o f f i c i a l i n d e x u p d a t e . # # # [ P A T C H P L A N ] - C r e a t e . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ c a n d i d a t e . d e u k . - C r e a t e . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ m e t r i c s . d e u k . - U p d a t e p l a n / r e p o r t t o s t a t e t h e s e a r e D e u k P a c k s o u r c e s c h e m a s ; J S O N S c h e m a e m i s s i o n i s f o l l o w - u p . - R u n m a r k d o w n l i n t f o r t i c k e t / p l a n / r e p o r t a n d i n s p e c t s c h e m a f i l e s f o r D e u k P a c k s y n t a x c o n s i s t e n c y . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] R e a d c o n t e x t f i l e s a n d c o n f i r m s c o p e . - [ x ] A d d D e u k P a c k . d e u k s o u r c e s c h e m a a r t i f a c t s . - [ x ] R u n v e r i f i c a t i o n a n d r e c o r d r e s u l t s . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - D e u k P a c k . d e u k s o u r c e s c h e m a a r t i f a c t s e x i s t u n d e r . d e u k - a g e n t / d o c s / s c h e m a s / . - M a r k d o w n l i n t a n d s c h e m a s y n t a x i n s p e c t i o n p a s s o r f a i l u r e s a r e r e c o r d e d . # # V e r i f i c a t i o n - [ x ] r g - n " n a m e s p a c e | e n u m | s t r u c t | ^ [ [ : s p a c e : ] ] * [ 0 - 9 ] + > " . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ c a n d i d a t e . d e u k . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ m e t r i c s . d e u k - [ x ] n o d e / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b u i l d _ d e u k p a c k . j s . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ c a n d i d a t e . d e u k / t m p / d e u k r u l e s - r a g - c a n d i d a t e - s c h e m a - c h e c k - - j s - - a l l o w - m u l t i - n a m e s p a c e - [ x ] n o d e / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b u i l d _ d e u k p a c k . j s . d e u k - a g e n t / d o c s / s c h e m a s / r a g _ m e t r i c s . d e u k / t m p / d e u k r u l e s - r a g - m e t r i c s - s c h e m a - c h e c k - - j s - - a l l o w - m u l t i - n a m e s p a c e # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 6 - r a g - j s o n - s c h e m a - a r t i f a c t s - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 146 rag json schema artifacts joy nucb report

# RAG Schema Artifact Report

## Correction

The earlier 131/132 work described JSON/schema artifacts but only produced markdown examples. This ticket adds actual DeukPack schema source artifacts instead of hand-written JSON Schema files.

## Artifacts

- `merged ticket body`
- `merged ticket body`

## Design

- DeukPack `.deuk` files are the source of truth.
- JSON Schema emission or conversion is deferred to a follow-up DeukPack pipeline ticket.
- Official RAG indexing is not changed by this ticket.

## Verification

- `rg -n "namespace|enum|struct|^[[:space:]]*[0-9]+>" `merged ticket body` `merged ticket body`: passed.
- `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js `merged ticket body` /tmp/deukrules-rag-candidate-schema-check --js --allow-multi-namespace`: passed.
- `node /home/joy/workspace/DeukPack/scripts/build_deukpack.js `merged ticket body` /tmp/deukrules-rag-metrics-schema-check --js --allow-multi-namespace`: passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/146-rag-json-schema-artifacts-joy-nucb.md `merged into this ticket`: passed.

## Follow-Up

- Add an explicit DeukPack emit/conversion step if JSON Schema files are still required as derived artifacts.
- Decide whether generated schema artifacts should live under `/tmp`, `merged ticket body`, or a DeukPack-owned output directory before committing generated outputs.

## Merged Legacy Document


### 146 rag json schema artifacts joy nucb plan

# DeukPack Schema Artifact Plan

## Goal

131/132에서 누락된 machine-readable schema artifact를 DeukPack `.deuk` 원본으로 추가한다. JSON Schema 파일을 손으로 쓰지 않고, 후속 DeukPack emit/import 파이프라인에서 파생 가능한 source-of-truth를 만든다.

## Scope

- Add `merged ticket body`.
- Add `merged ticket body`.
- Do not modify DeukPack source.
- Do not run codegen/build/emit.
- Do not update official RAG index.

## Steps

- [x] Read 131/132 schema markdown and DeukPack `.deuk` examples.
- [x] Write DeukPack `.deuk` source schema artifacts.
- [x] Run markdown lint for ticket/plan/report.
- [x] Inspect `.deuk` files for namespace, enum, struct, and field-id consistency.

## Verification

- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/146-rag-json-schema-artifacts-joy-nucb.md `merged into this ticket`
- [x] `rg -n "namespace|enum|struct|^[[:space:]]*[0-9]+>" `merged ticket body` `merged ticket body`
- [x] DeukPack one-shot JS generation to `/tmp` succeeded for both schema files.
