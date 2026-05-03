 - - - i d : 1 7 8 - t d w - t e l e m e t r y - s u m m a r y - v i s i b i l i t y - j o y - n u c b t i t l e : t d w - t e l e m e t r y - s u m m a r y - v i s i b i l i t y p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : t e l e m e t r y s u m m a r y 에 T D W 집 계 와 가 시 성 을 추 가 해 T D W 사 용 여 부 를 바 로 확 인 할 수 있 게 한 다 p r i o r i t y : m e d i u m t a g s : - t d w - t e l e m e t r y - s u m m a r y - m e t r i c s c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 9 : 4 5 : 4 3 - - - # t d w - t e l e m e t r y - s u m m a r y - v i s i b i l i t y > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y t d w - t e l e m e t r y - s u m m a r y - v i s i b i l i t y - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " t e l e m e t r y s u m m a r y 에 T D W 집 계 와 가 시 성 을 추 가 해 T D W 사 용 여 부 를 바 로 확 인 할 수 있 게 한 다 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " t e l e m e t r y s u m m a r y 에 T D W 집 계 와 가 시 성 을 추 가 해 T D W 사 용 여 부 를 바 로 확 인 할 수 있 게 한 다 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " t e l e m e t r y s u m m a r y 에 T D W 집 계 와 가 시 성 을 추 가 해 T D W 사 용 여 부 를 바 로 확 인 할 수 있 게 한 다 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # V e r i f i c a t i o n - n o d e - - t e s t s c r i p t s / t e s t s / c l i - t e l e m e t r y - c o m m a n d s . t e s t . m j s : p a s s e d , 2 t e s t s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 7 8 - t d w - t e l e m e t r y - s u m m a r y - v i s i b i l i t y - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 178 tdw telemetry summary visibility joy nucb plan

# TDW Telemetry Summary Visibility Plan

## 문제 분석

현재 telemetry 로그에는 `tdw` 필드가 있지만, summary 출력은 총 토큰과 RAG 관련 정보만 강조하고 TDW 총량과 비율을 보여주지 않는다. 이 때문에 TDW가 실제로 어느 정도 사용됐는지 한눈에 확인할 수 없고, TDW 준수 여부를 감각적으로만 판단하게 된다.

## Source Observations

- `scripts/cli-telemetry-commands.mjs`는 `tdw` 값을 log entry에 저장하지만 summary에서는 합산하지 않는다.
- `scripts/tests/cli-utils.test.mjs`는 `parseTelemetryArgs`가 `--tdw`를 파싱하는지 확인하지만, summary 출력 검증은 없다.
- `merged into this ticket`는 TDW compliance score와 관련 지표를 이미 구상하고 있다.

## Cause Hypotheses

- TDW 값은 저장되지만 집계되지 않아, 사용량과 준수도를 읽을 수 없다.
- RAG 요약이 먼저 들어간 뒤 TDW 요약이 빠져서, 운영자가 TDW를 부차적 신호로만 오해한다.
- JSON 출력에도 TDW 정보가 없어서 외부 리포트/자동화가 활용할 수 없다.

## Decision Rationale

TDW를 별도 섹션으로 요약에 노출하면, 로그 수집 구조를 바꾸지 않고도 현재 상태의 TDW 사용량을 확인할 수 있다. 이를 통해 나중에 compliance scorer나 더 정교한 TDW score를 얹기 전에 최소한의 가시성을 확보한다.

## Execution Strategy

1. `telemetry summary`에 TDW 총량과 엔트리 수를 추가한다.
2. TDW 커버리지율과 총 토큰 대비 비율을 보여준다.
3. JSON summary에도 같은 필드를 넣어 리포트 자동화를 가능하게 한다.
4. TDW 출력이 실제로 보이는지 테스트를 추가한다.

## Verification Design

`node --test scripts/tests/cli-telemetry-commands.test.mjs`로 TDW summary 출력과 JSON 필드를 검증한다. `npx deuk-agent-rule lint:md`로 티켓, plan, report 문서 형식을 확인한다.

## Verification Outcome

- TDW summary는 `TDW Tokens`, `Entries`, `Coverage Rate`, `Token Share`, `Average Tokens/Entry`를 출력한다.
- JSON summary는 `totalTdwTokens`, `tdwEntryCount`, `tdwCoverageRate`, `tdwTokenShare`, `tdwAverageTokensPerEntry`를 노출한다.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`: passed, 2 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md `merged into this ticket` `merged into this ticket`: passed.

## Merged Legacy Document


### 178 tdw telemetry summary visibility joy nucb report

# TDW Telemetry Summary Visibility Report

## 결론

`telemetry summary`는 이제 TDW 토큰 총량과 커버리지율을 보여준다. 즉, TDW가 로그에만 잠겨 있지 않고 요약 화면에서도 읽히게 됐다.

## 확인한 것

- `TDW Tokens`가 summary 본문에 출력된다.
- `Entries`, `Coverage Rate`, `Token Share`, `Average Tokens/Entry`가 함께 보인다.
- JSON summary에는 `totalTdwTokens`, `tdwEntryCount`, `tdwCoverageRate`, `tdwTokenShare`, `tdwAverageTokensPerEntry`가 포함된다.

## 의미

이 변경은 TDW compliance scorer 자체를 만든 것은 아니다. 대신 TDW가 얼마나 사용되고 있는지 바로 확인할 수 있는 최소 가시성을 만든다. 그 결과 TDW 개선 포인트를 숫자로 이어갈 수 있다.

## 검증

- `node --test scripts/tests/cli-telemetry-commands.test.mjs`
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md `merged into this ticket` `merged into this ticket`

## Verification Outcome

- `node --test scripts/tests/cli-telemetry-commands.test.mjs`: passed, 2 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/178-tdw-telemetry-summary-visibility-joy-nucb.md `merged into this ticket` `merged into this ticket`: passed.
