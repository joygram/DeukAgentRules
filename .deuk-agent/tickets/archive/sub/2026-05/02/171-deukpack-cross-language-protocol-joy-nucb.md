 - - - i d : 1 7 1 - d e u k p a c k - c r o s s - l a n g u a g e - p r o t o c o l - j o y - n u c b t i t l e : d e u k p a c k - c r o s s - l a n g u a g e - p r o t o c o l - r u n t i m e - c o n s i s t e n c y p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k 전 언 어 프 로 토 콜 r u n t i m e 매 핑 / r o u n d t r i p 정 책 분 리 및 커 버 리 지 정 합 성 검 증 p r i o r i t y : P 2 t a g s : - d e u k p a c k - p r o t o c o l - p h a s e 4 c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 4 : 4 4 : 1 4 - - - # d e u k p a c k - c r o s s - l a n g u a g e - p r o t o c o l - r u n t i m e - c o n s i s t e n c y > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y d e u k p a c k - c r o s s - l a n g u a g e - p r o t o c o l - r u n t i m e - c o n s i s t e n c y - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " D e u k P a c k 전 언 어 프 로 토 콜 r u n t i m e 매 핑 / r o u n d t r i p 패 턴 심 층 분 석 및 일 괄 교 정 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " D e u k P a c k 전 언 어 프 로 토 콜 r u n t i m e 매 핑 / r o u n d t r i p 패 턴 심 층 분 석 및 일 괄 교 정 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " D e u k P a c k 전 언 어 프 로 토 콜 r u n t i m e 매 핑 / r o u n d t r i p 패 턴 심 층 분 석 및 일 괄 교 정 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 171 deukpack cross language protocol joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The roundtrip matrix originally risked treating every generated protocol as if it belonged in the same clean-room path. That is unsafe for two lanes:

- `XTJson` is a schema-sensitive interop JSON lane with dedicated protocol behavior.
- `DpCsv` is a table-oriented lane that does not belong in the clean-room wire matrix.

Without an explicit policy split, generated protocol growth can create silent skips or accidental coverage gaps.

## Source Observations
- `src/protocols/DpFormatRuntime.ts` now defines `WIRE_ROUNDTRIP_POLICY_PROTOCOLS` for `XTJson` and `DpCsv`, while `WIRE_ROUNDTRIP_PROTOCOLS` excludes those lanes from the clean-room matrix.
- `src/serialization/__tests__/WireRoundtripMatrix.test.ts` adds a Phase 0 policy test that requires exact coverage across matrix + policy-only lanes.
- `scripts/bmt/protocol-contract.json` still lists all generated protocol contracts, so the runtime policy must stay explicit rather than inferred.
- `src/__tests__/BmtGeneratedRoundtripPolicy.test.ts` confirms the separate generated-language gating model used elsewhere in the repo.

## Cause Hypotheses
- Protocol coverage had been derived from the generated enum set without a separate lane policy.
- `XTJson` and `DpCsv` need different verification assumptions than the clean-room roundtrip matrix.
- The protocol list can expand faster than matrix logic, so hidden omissions were possible without a direct coverage assertion.

## Decision Rationale
- Keep the generated protocol contract untouched.
- Encode policy in source constants instead of scattering exceptions through tests.
- Treat `XTJson` and `DpCsv` as policy-only lanes, while keeping `DpYaml` in the matrix via its explicit YAML branch.
- Add a coverage test that fails if any generated protocol is neither matrix-covered nor policy-covered.

## Execution Strategy
- Derive roundtrip matrix inputs from a clean-room protocol list.
- Keep policy-only lanes centralized in `WIRE_ROUNDTRIP_POLICY_PROTOCOLS`.
- Verify exact coverage by comparing the matrix set, policy set, and generated protocol list.
- Preserve direct protocol roundtrip tests for the matrix lanes and retain the YAML-specific path.

## Verification Design
- `npx jest src/serialization/__tests__/WireRoundtripMatrix.test.ts --runInBand`
- `npm test` was attempted, but the environment is blocked later in `build:cpp` because `cmake` is not installed.
- Expected outcome: phase 0 policy coverage test passes, and the matrix still roundtrips all included protocols.

## Verification Outcome
- `npx jest src/serialization/__tests__/WireRoundtripMatrix.test.ts --runInBand` passed.
- The policy split now covers all generated protocols exactly once across matrix + policy-only lanes.
- Residual risk: broad `npm test` remains environment-dependent because of the missing `cmake` tool in this session.
