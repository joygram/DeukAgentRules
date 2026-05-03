 - - - i d : 1 8 8 - l o g - d u p l i c a t e - m i s s i n g - r e m e d i a t i o - j o y - n u c b t i t l e : l o g - d u p l i c a t e - m i s s i n g - r e m e d i a t i o n p h a s e : 2 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 로 그 중 복 과 누 락 이 발 생 하 는 t e l e m e t r y 기 록 경 로 를 정 리 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 4 9 : 3 6 - - - # l o g - d u p l i c a t e - m i s s i n g - r e m e d i a t i o n > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y l o g - d u p l i c a t e - m i s s i n g - r e m e d i a t i o n - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 로 그 중 복 과 누 락 이 발 생 하 는 t e l e m e t r y 기 록 경 로 를 정 리 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 로 그 중 복 과 누 락 이 발 생 하 는 t e l e m e t r y 기 록 경 로 를 정 리 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 로 그 중 복 과 누 락 이 발 생 하 는 t e l e m e t r y 기 록 경 로 를 정 리 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] A d d d e f a u l t t e l e m e t r y e v e n t c o v e r a g e f o r w o r k a n d w o r k f l o w l o g s . - [ x ] A d d r e g r e s s i o n c o v e r a g e f o r t e l e m e t r y r e c o r d s w i t h m i s s i n g e v e n t f i e l d s . - [ x ] R u n t a r g e t e d t e l e m e t r y t e s t s a n d m a r k d o w n l i n t , t h e n r e c o r d t h e r e s u l t . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 188 log duplicate missing remediatio joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 telemetry 수정의 범위와 APC 경계를 관리한다.
- 이 문서는 로그 기록 시 `event` 누락을 줄이고, summary/집계가 안정적으로 읽히도록 하는 분석과 검증만 담는다.
- 기존 telemetry 파일의 과거 결손은 보존하되, 새로 쓰는 로그의 품질을 올리는 것이 목표다.

## Problem Analysis
- 현재 telemetry 기록 경로는 `event`를 선택 필드로 취급해서, 일부 work log가 빈 문자열 상태로 저장된다.
- 이 때문에 summary 집계에서 `event` 누락처럼 보이고, 후속 분석에서 로그 타입 구분이 약해진다.
- 중복 생성 자체는 현재 샘플 로그에서 보이지 않지만, 누락된 `event` 때문에 같은 작업 계열 로그가 구분되지 않는 문제가 있다.

## Source Observations
- `scripts/cli-telemetry-commands.mjs`의 `appendTelemetryRecord`는 `event`를 `entry.event || ""`로 저장한다.
- `appendInternalWorkflowEvent`는 `event || action`을 넘기지만, work log 경로는 기본값이 없다.
- `summaryAction`는 `event` 기준으로 workflow 이벤트를 분리하고 있어, 빈 문자열은 관측 품질을 떨어뜨린다.
- 현재 telemetry 파일의 과거 데이터에는 `event`가 비어 있는 행이 있지만, 이는 새 코드가 아닌 과거 기록 때문이다.

## Cause Hypotheses
- work log 기록 시 기본 `event`를 두지 않은 설계가 누락의 주된 원인이다.
- `event`가 없으면 summary에서는 구분 정보가 약해지고, 비슷한 로그가 뭉쳐 보일 수 있다.
- 과거 로그와 새 로그를 함께 볼 때, 과거 결손이 현재 문제처럼 보이는 혼선도 있다.

## Decision Rationale
- `appendTelemetryRecord`에서 기본 `event` 값을 `action` 또는 `kind`로 보강한다.
- 내부 workflow 이벤트와 일반 work log 모두 최소한의 식별자를 갖도록 해서, 이후 집계가 안정적으로 동작하게 한다.
- 기존 저장된 telemetry는 되돌리지 않고, 새로 쓰는 로그만 바로잡는다.

## Execution Strategy
- `scripts/cli-telemetry-commands.mjs`에서 `event` 기본값을 보강한다.
- `scripts/tests/cli-telemetry-commands.test.mjs`에 기본 `event`가 채워지는 회귀 테스트를 추가한다.
- 가능하면 summary가 빈 문자열 대신 의미 있는 이벤트명을 집계하는지 확인한다.

## Verification Design
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`로 telemetry write/summary 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 ticket, plan, report 문서를 검증한다.

## Verification Outcome
- `appendTelemetryRecord` now defaults missing `event` to `action`, then `kind`, then `work`.
- `scripts/tests/cli-telemetry-commands.test.mjs` now covers both explicit-event and default-event telemetry writes.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs` passed.
