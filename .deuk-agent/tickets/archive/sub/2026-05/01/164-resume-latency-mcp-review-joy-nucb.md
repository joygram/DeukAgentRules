 - - - i d : 1 6 4 - r e s u m e - l a t e n c y - m c p - r e v i e w - j o y - n u c b t i t l e : r e s u m e - l a t e n c y - m c p - r e v i e w p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 이 어 받 기 지 연 원 인 과 M C P 영 향 여 부 를 실 행 기 록 기 준 으 로 검 토 한 다 . p r i o r i t y : P 2 t a g s : - p l a n n i n g - l a t e n c y - m c p c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 2 2 : 0 5 : 5 2 - - - # r e s u m e - l a t e n c y - m c p - r e v i e w > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y r e s u m e - l a t e n c y - m c p - r e v i e w - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 이 어 받 기 지 연 원 인 과 M C P 영 향 여 부 를 실 행 기 록 기 준 으 로 검 토 한 다 . " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 이 어 받 기 지 연 원 인 과 M C P 영 향 여 부 를 실 행 기 록 기 준 으 로 검 토 한 다 . " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 이 어 받 기 지 연 원 인 과 M C P 영 향 여 부 를 실 행 기 록 기 준 으 로 검 토 한 다 . " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 164 resume latency mcp review joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
이어받기에서 지연이 발생하는 구간은 MCP 자체보다 규칙 부트스트랩, 티켓 식별 실패 복구, `npx` 기반 CLI 반복 실행, Phase 1 문서 보강과 lint/test 실행이 누적되는 구조다. 문제는 필수 안전 절차를 유지하면서도 매번 같은 규칙 숙지와 티켓 복구 비용을 줄일 수 있는 운영/CLI 설계가 부족하다는 점이다.

## Source Observations
- `core-rules/AGENTS.md`는 매 세션 첫 단계로 core rules와 `PROJECT_RULE.md` 읽기, 티켓 식별, `set_workflow_context` 호출을 요구한다.
- `core-rules/AGENTS.md`의 Ticket Discovery는 사용자가 티켓 ID/주제를 언급하면 직접 사용하고, 모호하면 `ticket next --path-only` 한 번으로 제한한다.
- `scripts/cli-ticket-commands.mjs`는 ticket create 시 MCP 활성 여부를 검사해 Phase 0 RAG 경고를 낸다.
- 직전 실행에서 MCP `search_tickets`와 `set_workflow_context` 응답은 짧았고, 지연은 `npx deuk-agent-rule` 다회 호출과 규칙/문서 작업 누적에서 발생했다.

## Cause Hypotheses
- 별칭 티켓(`득팩343`)이 실제 티켓 ID로 매칭되지 않으면 실패-검색-대체 탐색 경로가 발생한다.
- 규칙 숙지 결과가 세션 단위로만 존재하고 CLI/티켓 상태에는 “이미 읽은 규칙 버전” 캐시가 없다.
- `npx` 호출은 Node startup과 local proxy 탐색 비용이 반복된다.
- MCP 활성 여부 확인과 RAG 검색은 계측이 부족해, 사용자가 지연 원인을 MCP로 오인하기 쉽다.

## Decision Rationale
안전 규칙을 줄이는 대신 “증거 있는 fast path”를 만든다. core rules 버전, project rule mtime/hash, active ticket id, phase, plan completeness, MCP 상태, CLI 호출 시간을 한 번에 보고하는 resume preflight가 있으면 에이전트가 읽어야 할 최소 항목을 바로 알 수 있다. MCP는 끄는 대상이 아니라 계측과 timeout/fallback 정책을 넣어 병목 여부를 분리해야 한다.

## Execution Strategy
제안은 세 단계다. 첫째, `ticket resume` 또는 `agent preflight` 명령을 추가해 규칙 버전/프로젝트 규칙/활성 티켓/legacy split reference 완성도/MCP 상태를 JSON으로 한 번에 반환한다. 둘째, 티켓 별칭 인덱스를 도입해 사용자의 짧은 별칭을 실제 티켓 ID로 해석한다. 셋째, CLI 내부에 latency trace를 추가해 `rulesRead`, `ticketResolve`, `mcpProbe`, `ragSearch`, `lint`, `test` 같은 구간별 시간을 출력하거나 telemetry에 남긴다.

요구사항 반영 범위는 즉시 효과가 있는 두 지점으로 좁힌다. `ticket use`에서 주어진 topic이 매칭되지 않으면 마지막 closed 티켓과 현재 open/active 티켓 목록을 보여주고, interactive 모드에서는 그 후보 중 선택하게 한다. non-interactive 모드에서는 자동 선택하지 않고 후보와 명령 예시를 포함한 오류를 반환한다. 또한 core rule의 Phase 4 문구는 즉시 archive를 강제하지 않고 close를 완료 상태로 보며, archive는 lazy cleanup이나 명시적 보관 작업으로 맡기도록 바꾼다.

## Verification Design
계획 단계에서는 markdown lint로 티켓과 legacy split reference의 형식을 검증한다. 실행 단계로 전환하면 preflight 명령 단위 테스트, 별칭 매칭 테스트, MCP timeout/fallback 테스트, 기존 ticket create/next/archive 회귀 테스트를 추가한다. 기대 결과는 모호한 이어받기의 첫 왕복을 줄이고, MCP가 느린지 CLI가 느린지 수치로 판별 가능해지는 것이다.

## Verification Result
`ticket use` 매칭 실패 시 마지막 closed 티켓과 open/active 티켓 후보를 보여주는 회귀 테스트를 추가했다. `node --test scripts/tests/cli-ticket-commands.test.mjs`는 17개 subtest가 통과했고, `node --test scripts/tests/*.test.mjs`는 41개 subtest가 통과했다. markdown lint는 티켓과 legacy split reference에 대해 통과했다.
