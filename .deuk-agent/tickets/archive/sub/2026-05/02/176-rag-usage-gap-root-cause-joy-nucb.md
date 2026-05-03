 - - - i d : 1 7 6 - r a g - u s a g e - g a p - r o o t - c a u s e - j o y - n u c b t i t l e : r a g - u s a g e - g a p - r o o t - c a u s e p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : R A G 사 용 누 락 원 인 과 데 이 터 미 수 집 이 유 를 확 인 하 고 , 코 드 쪽 만 쌓 이 는 비 정 상 상 태 를 분 석 한 다 p r i o r i t y : h i g h t a g s : - r a g - t e l e m e t r y - r o o t - c a u s e - u s a g e - g a p c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 9 : 3 1 : 5 8 - - - # r a g - u s a g e - g a p - r o o t - c a u s e > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y r a g - u s a g e - g a p - r o o t - c a u s e - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " R A G 사 용 누 락 원 인 과 데 이 터 미 수 집 이 유 를 확 인 하 고 , 코 드 쪽 만 쌓 이 는 비 정 상 상 태 를 분 석 한 다 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " R A G 사 용 누 락 원 인 과 데 이 터 미 수 집 이 유 를 확 인 하 고 , 코 드 쪽 만 쌓 이 는 비 정 상 상 태 를 분 석 한 다 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " R A G 사 용 누 락 원 인 과 데 이 터 미 수 집 이 유 를 확 인 하 고 , 코 드 쪽 만 쌓 이 는 비 정 상 상 태 를 분 석 한 다 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # V e r i f i c a t i o n - . d e u k - a g e n t / t e l e m e t r y . j s o n l i n s p e c t i o n : t o t a l = 1 0 , w i t h R a g = 0 , r a g C o u n t s = { } , l o c a l F a l l b a c k = 0 , k n o w l e d g e = { } . - A r c h i v e - b a s e d k n o w l e d g e d i s t i l l a t i o n n o w a p p e n d s a t e l e m e t r y e v e n t w i t h a c t i o n = k n o w l e d g e - d i s t i l l , k n o w l e d g e A c t i o n = a d d _ k n o w l e d g e , a n d t o k e n Q u a l i t y = s a v e d s o k n o w l e d g e g e n e r a t i o n i s o b s e r v a b l e e v e n b e f o r e t r u e R A G h o o k s e x i s t . - n o d e - - t e s t s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s : p a s s e d , 2 1 t e s t s . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 7 6 - r a g - u s a g e - g a p - r o o t - c a u s e - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 176 rag usage gap root cause joy nucb report

# RAG Usage Gap Report

## 결론

현재 문제는 단순히 "RAG가 약하다"가 아니라, **RAG 사용 증거가 수집되지 않는다**는 점이다. 그래서 코드와 문서 산출물은 계속 쌓이는데, 정작 에이전트가 그걸 실제로 썼다는 로그는 없다.

## 현재 확인된 사실

- `.deuk-agent/telemetry.jsonl` 기존 로그 10개에 `ragResult`가 없다.
- `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`도 없다.
- `scripts/cli-telemetry-commands.mjs`는 수동 로그용이다.
- `scripts/cli-ticket-commands.mjs`는 archive knowledge를 생성하지만, 이것이 RAG 사용 로그로 이어지지는 않는다.

## 왜 비정상인가

문서와 코드만 쌓이는 상태는 두 가지 의미에서 비정상이다.

1. 사용은 있는데 증거가 없다.
에이전트가 실제로 RAG를 쓰고 있어도 자동 계측이 없으면 확인 불가다.

2. 애초에 쓰지 않고 있을 수 있다.
이 경우 인덱스, knowledge, plan, report는 남지만 실행 경로에 반영되지 않는다.

둘 중 어느 쪽이든 운영 신뢰성은 낮다. 그래서 이번 판정은 `used`가 아니라 `not evidenced`다.

## 다음 확인 지점

- 실제 RAG 호출 지점에 자동 로그가 붙어 있는가
- archive knowledge가 실제 RAG 검색 대상에 들어가는가
- `telemetry log`가 수동이 아니라 이벤트 기반으로 호출되는가
- `savedTokens`와 fallback 비율을 자동으로 집계할 수 있는가

## 현재 변화

- archive 기반 knowledge distillation은 이제 telemetry에 `knowledge-distill` 이벤트를 남긴다.
- 이는 RAG 사용 증명이 아니라, 최소한 knowledge 생성과 코드 축적을 telemetry로 관찰 가능하게 만드는 1차 계측이다.

## 메모

이 보고서는 "사용했다"를 증명하지 않는다. 오히려 현재 로그가 사용 증거를 못 보여준다는 점을 명시한다. 그게 지금 상태의 핵심이다.

## 검증

- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed, 21 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/176-rag-usage-gap-root-cause-joy-nucb.md `merged into this ticket` `merged into this ticket`: passed.

## Merged Legacy Document


### 176 rag usage gap root cause joy nucb plan

# RAG Usage Gap Root Cause Plan

## 문제 분석

현재 상태는 두 층이 분리돼 있다. 한쪽에는 티켓/plan/report/archive로 계속 쌓이는 코드·문서 산출물이 있고, 다른 한쪽에는 실제 RAG 사용 흔적을 증명하는 telemetry 데이터가 거의 없다. 이 분리 때문에 "문서는 늘어나는데 에이전트는 그걸 쓰지 않는다"는 비정상 감각이 생긴다.

실제 로그를 읽어보면 `.deuk-agent/telemetry.jsonl`의 기존 10개 로그에는 `ragResult`, `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`가 없다. 즉, 현재 telemetry는 RAG 사용을 증명하지 못한다. 반면 archive 흐름은 `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`를 통해 knowledge JSON을 계속 생성하지만, 그 결과가 실제 RAG 검색 품질이나 사용 증거로 이어진다는 연결은 아직 보이지 않는다.

## Source Observations

- `scripts/cli-telemetry-commands.mjs`는 `telemetry log|sync|summary`만 제공하고, RAG 호출 지점에 자동으로 연결되는 훅은 없다.
- `scripts/cli-args.mjs`는 `--rag-result`, `--local-fallback`, `--knowledge-action`, `--token-quality`, `--saved-tokens`를 파싱하지만, 이것은 수동 입력용 옵션일 뿐이다.
- `.deuk-agent/telemetry.jsonl`의 기존 로그는 모두 legacy 형식이며 RAG 필드가 없다.
- `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`는 archive 시 knowledge JSON을 생성하지만, 이 지식이 실제 RAG 인덱싱 범위에 들어간다는 증거는 별도다.
- 이전 분석 노트에서는 `distillKnowledge`의 sections가 legacy split reference 분석을 충분히 담지 못하거나, knowledge 디렉토리가 검색 대상 밖일 수 있다는 지적이 이미 있었다.

## Cause Hypotheses

1. RAG 사용 데이터가 자동으로 수집되지 않는다.
`telemetry`는 CLI 명령일 뿐이고, RAG 수행 시 자동 로깅 경로가 보이지 않는다. 그래서 실제 사용이 있어도 증거가 남지 않을 수 있다.

2. knowledge/문서 축적과 RAG 관측이 분리돼 있다.
`archive`는 knowledge JSON을 만들지만, 그 데이터가 검색/랭킹 경로에서 실사용되는지 확인하는 계측이 없다. 결과적으로 코드와 문서만 쌓이고 사용 데이터는 비어 보인다.

3. 수동 telemetry만 있어서 운영자가 직접 찍지 않으면 데이터가 없다.
필드가 존재해도 세션마다 누가 `telemetry log`를 호출하지 않으면 `ragResult`는 계속 0이다.

4. 현재 보고 체계가 "존재"와 "사용"을 혼동한다.
인덱스나 knowledge 파일 생성은 증거가 아니고, 실제 조회 로그와 토큰 절감 로그가 있어야 사용 증거가 된다.

## Decision Rationale

이번 티켓의 목표는 기능 추가보다 원인 분해다. 그래서 먼저 "왜 데이터가 없는가"를 분해하고, 그 다음 "어디에 강제 계측을 넣어야 하는가"를 후속 티켓으로 나눈다. 즉, 이번 작업에서 바로 RAG 서버나 generated artifacts를 건드리기보다, DeukAgentRules 쪽에서 관측 가능성을 복원하는 게 우선이다.

## Execution Strategy

1. telemetry 로그를 기준으로 RAG 사용 증거의 현재 부재를 명시한다.
2. `cli-telemetry-commands.mjs`와 `cli-ticket-commands.mjs`의 분리된 책임을 문서화한다.
3. archive knowledge 생성과 RAG 사용 증거 수집이 연결되지 않는 지점을 정리한다.
4. 후속 티켓에서 자동 계측 또는 canary 로그를 넣을지 결정한다.

## Verification Design

이 티켓에서는 읽기 전용 검사와 문서 증명만 수행한다.

- `.deuk-agent/telemetry.jsonl`에 RAG 필드가 실제로 없는지 확인한다.
- archive knowledge는 생성되더라도 RAG 사용 증거가 아님을 명시한다.
- 문서 lint로 계획/보고서 구조를 검증한다.

## Execution Notes

- `telemetry.jsonl` inspection 결과: total 10 logs, `ragResult=0`, `localFallback=0`, `knowledgeAction=0`.
- `scripts/cli-telemetry-commands.mjs`에는 수동 로그/요약만 있고 자동 RAG hook은 없다.
- `scripts/cli-ticket-commands.mjs`에는 archive knowledge distillation이 있으나, 이것만으로 실사용 증거가 생기지 않는다.
- archive knowledge distillation now appends a telemetry event, so knowledge generation is observable even before true RAG hooks exist.

## Verification Outcome

- RAG 사용 증거는 현재 telemetry 로그에서 확인되지 않았다.
- 코드/문서 산출물은 쌓이지만 관측 데이터는 비어 있어, "사용됨"이 아니라 "미증명"이 정확한 판정이다.
- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed, 21 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/176-rag-usage-gap-root-cause-joy-nucb.md `merged into this ticket` `merged into this ticket`: passed.
