 - - - i d : 1 3 0 - m c p - s e r v e r - c o n n e c t i o n - i s s u e - j o y - n u c b t i t l e : m c p - s e r v e r - c o n n e c t i o n - i s s u e p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 현 재 M C P 서 버 연 결 이 슈 를 조 사 하 고 필 요 한 연 결 안 정 화 수 정 을 수 행 한 다 . c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 2 : 2 3 : 2 1 p r i o r i t y : P 2 t a g s : - m c p - c o n n e c t i o n - s s e - s t a b i l i t y - - - # m c p - s e r v e r - c o n n e c t i o n - i s s u e > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s , d o c s / c l a u d e - c o d e - m c p - s e t u p . m d , t h i s t i c k e t / p l a n / r e p o r t . - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , . m c p . j s o n , . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 0 7 9 - m c p - h y b r i d - t r a n s p o r t - f i x - r e p o r t . m d . - * * D e s i g n R a t i o n a l e : * * D e u k A g e n t R u l e s 가 M C P 활 성 상 태 를 안 정 적 으 로 감 지 해 야 P h a s e 0 / R A G 안 내 와 i n i t 정 책 메 시 지 가 실 제 연 결 상 태 와 어 긋 나 지 않 는 다 . - * * C o n s t r a i n t s : * * D e u k A g e n t C o n t e x t 서 버 코 드 는 이 티 켓 에 서 수 정 하 지 않 는 다 . b r o a d s e r v i c e r e s t a r t , s y s t e m d 변 경 , g e n e r a t e d o u t p u t 변 경 은 금 지 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - F o r b i d d e n m o d u l e s : D e u k A g e n t C o n t e x t s e r v e r f i l e s , s e r v i c e / s y s t e m d c o n f i g s , g e n e r a t e d c o n s u m e r s p o k e s , b e n c h m a r k / r e p o r t g e n e r a t e d a r t i f a c t s , b i n / d e u k - a g e n t - r u l e . j s . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d s a y s r e a l C L I l o g i c l i v e s i n s c r i p t s / ; g e n e r a t e d c o n s u m e r s p o k e s a r e b u i l t f r o m t e m p l a t e s / c o r e a n d m u s t n o t b e e d i t e d d i r e c t l y . # # # [ C O N T R A C T ] - I n p u t : l o c a l . m c p . j s o n , i s M c p A c t i v e ( ) / p r o b e M c p U r l ( ) i m p l e m e n t a t i o n , e x i s t i n g M C P s e t u p d o c s , 0 7 9 h y b r i d t r a n s p o r t r e p o r t . - O u t p u t : M C P c o n n e c t i o n i s s u e a n a l y s i s , o p t i o n a l C L I d e t e c t i o n h a r d e n i n g w i t h f o c u s e d t e s t s , a n d u p d a t e d d o c u m e n t a t i o n i f n e e d e d . - S i d e e f f e c t s : R e a d - o n l y M C P p r o b e / t e s t e x e c u t i o n o n l y . N o p a c k a g e i n s t a l l , s e r v i c e r e s t a r t , o r s e r v e r c o d e m u t a t i o n . # # # [ P A T C H P L A N ] - C o n f i r m . m c p . j s o n r e g i s t r a t i o n a n d c u r r e n t S S E p r o b e b e h a v i o r . - I f d e t e c t i o n i s t o o n a r r o w , p a t c h i s M c p A c t i v e ( ) / p r o b e M c p U r l ( ) i n s c r i p t s / c l i - u t i l s . m j s . - A d d / a d j u s t t e s t s i n s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s f o r t h e c o n n e c t i o n e d g e c a s e . - U p d a t e d o c s / c l a u d e - c o d e - m c p - s e t u p . m d o n l y i f o b s e r v e d b e h a v i o r d i f f e r s f r o m t h e g u i d e . - R u n m a r k d o w n l i n t a n d f o c u s e d / a l l t e s t s . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] I n s p e c t M C P s e t u p d o c s , . m c p . j s o n , c u r r e n t d e t e c t i o n c o d e , a n d 0 7 9 s t a b i l i t y r e p o r t . - [ x ] C r e a t e c o n c r e t e p l a n / A P C a n d f i l e . - [ x ] M o v e t o P h a s e 2 a f t e r a p p r o v a l , t h e n i m p l e m e n t o n l y i f a c o n c r e t e d e t e c t i o n / d o c g a p i s c o n f i r m e d . - [ x ] V e r i f y w i t h l i n t / t e s t s a n d c l o s e / a r c h i v e . # # D o n e W h e n M C P c o n n e c t i o n i s s u e s c o p e i s c o n c r e t e , P h a s e 2 c a n p r o c e e d w i t h o u t g u e s s i n g , a n d a n y i m p l e m e n t a t i o n s t a y s l i m i t e d t o D e u k A g e n t R u l e s C L I d e t e c t i o n / d o c s / t e s t s . # # V e r i f i c a t i o n - [ x ] n o d e - - i n p u t - t y p e = m o d u l e - e " i m p o r t { i s M c p A c t i v e } f r o m ' . / s c r i p t s / c l i - u t i l s . m j s ' ; c o n s o l e . l o g ( a w a i t i s M c p A c t i v e ( p r o c e s s . c w d ( ) ) ) ; " r e t u r n e d t r u e . - [ x ] n o d e - - t e s t s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s : 1 7 t e s t s p a s s e d . - [ x ] n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s : 2 3 t e s t s p a s s e d . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 0 - m c p - s e r v e r - c o n n e c t i o n - i s s u e - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 130 mcp server connection issue joy nucb plan

# MCP 서버 연결 이슈 처리 계획

## 목표

DeukAgentRules가 DeukAgentContext MCP 서버 연결 상태를 정확히 감지하도록 조사하고, 필요한 경우 CLI 감지 로직과 테스트/문서를 최소 수정한다.

## 현재 확인 사항

- 프로젝트 루트 `.mcp.json`에는 `deuk-agent-context`가 `http://localhost:8001/sse`로 등록되어 있다.
- `scripts/cli-utils.mjs`의 `isMcpActive()`는 다음 경로를 확인한다.
  - `.mcp.json`
  - `.cursor/mcp.json`
  - `.vscode/mcp.json`
- SSE URL은 `probeMcpUrl()`에서 `HEAD`, `GET` 순서로 1초 timeout probe를 수행한다.
- 기존 테스트는 stdio command config와 `HEAD 405 → GET 200` SSE fallback을 검증한다.
- 079 보고서에 따르면 DeukAgentContext 서버는 `GET /sse`와 legacy `POST /sse`를 모두 처리하는 hybrid transport로 안정화된 이력이 있다.

## 실행 후보

1. [x] Read-only 재현
   - `.mcp.json` parse가 정상인지 확인한다.
   - 가능하면 `isMcpActive(process.cwd())`를 직접 호출해 현재 workspace 감지 결과를 확인한다.
   - 실제 `curl`/fetch probe는 읽기 요청만 사용한다.

2. [x] CLI 감지 하드닝
   - `mcpServers`와 `servers` schema는 유지한다.
   - `type: "sse"`가 있고 url이 있는 경우를 명확히 처리한다.
   - 여러 config 파일 중 하나가 실패해도 다른 후보를 계속 확인할지 검토한다.
   - JSON parse 실패가 전체 false로 조기 종료되는 현재 동작이 문제라면 테스트와 함께 수정한다.

3. [x] 테스트
   - 기존 `isMcpActive` 테스트 유지.
   - 필요 시 malformed `.mcp.json` 뒤에 `.cursor/mcp.json`이 정상일 때 fallback 되는 케이스를 추가한다.
   - 필요 시 URL probe timeout/failure 후 stdio config 감지 케이스를 추가한다.

4. [x] 문서
   - `docs/claude-code-mcp-setup.md`가 현재 `.mcp.json` 상태나 모델/effort 안내와 다르면 보정한다.
   - 문서 변경은 실제 확인된 차이에 한정한다.

## 비범위

- DeukAgentContext 서버 코드 수정.
- systemd service 수정/재시작.
- `claude mcp add` 실행으로 사용자 환경 변경.
- broad generated output 재생성.

## 검증

- [x] `node --test scripts/tests/cli-utils.test.mjs`
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md docs/claude-code-mcp-setup.md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md `merged into this ticket`

## 승인 게이트

이 계획은 Phase 1 산출물이다. Phase 2 승인 전에는 CLI 코드, 테스트, 문서를 수정하지 않는다.

## Merged Legacy Document


### 130 mcp server connection issue joy nucb report

# MCP 서버 연결 감지 안정화 보고서

## 변경 요약

- 현재 workspace의 `.mcp.json` 기반 MCP 감지는 정상으로 확인했다.
- `isMcpActive()`가 앞쪽 MCP config JSON parse 실패 시 즉시 `false`를 반환하던 흐름을 수정해 다음 후보 config를 계속 확인하도록 했다.
- malformed `.mcp.json` 뒤에 정상 `.cursor/mcp.json`이 있는 경우를 회귀 테스트로 추가했다.
- DEBUG parse 로그는 stack trace 대신 짧은 메시지만 출력하도록 줄였다.

## 검증

- `node --input-type=module -e "import { isMcpActive } from './scripts/cli-utils.mjs'; console.log(await isMcpActive(process.cwd()));"`: `true`.
- `GET http://localhost:8001/sse`: `200`, `text/event-stream`.
- `node --test scripts/tests/cli-utils.test.mjs`: 17 tests passed.
- `node --test scripts/tests/*.test.mjs`: 23 tests passed.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/130-mcp-server-connection-issue-joy-nucb.md `merged into this ticket` docs/claude-code-mcp-setup.md`: passed.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- DeukAgentContext 서버 코드, systemd/service 설정, generated outputs는 수정하지 않았다.
