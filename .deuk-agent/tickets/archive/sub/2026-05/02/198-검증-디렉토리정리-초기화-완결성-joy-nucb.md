 - - - i d : 1 9 8 - 검 증 - 디 렉 토 리 정 리 - 초 기 화 - 완 결 성 - j o y - n u c b t i t l e : 검 증 - 디 렉 토 리 정 리 - 초 기 화 - 완 결 성 p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : i n i t 실 행 후 . d e u k - a g e n t 구 조 정 리 및 레 거 시 잔 재 제 거 가 완 결 되 었 는 지 검 증 한 다 . p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 3 3 : 0 4 - - - # 검 증 - 디 렉 토 리 정 리 - 초 기 화 - 완 결 성 > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y 검 증 - 디 렉 토 리 정 리 - 초 기 화 - 완 결 성 - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " i n i t 실 행 후 . d e u k - a g e n t 구 조 정 리 및 레 거 시 잔 재 제 거 가 완 결 되 었 는 지 검 증 한 다 . " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " i n i t 실 행 후 . d e u k - a g e n t 구 조 정 리 및 레 거 시 잔 재 제 거 가 완 결 되 었 는 지 검 증 한 다 . " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " i n i t 실 행 후 . d e u k - a g e n t 구 조 정 리 및 레 거 시 잔 재 제 거 가 완 결 되 었 는 지 검 증 한 다 . " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # V e r i f i c a t i o n 결 과 요 약 - n p x d e u k - a g e n t - r u l e i n i t - - w o r k f l o w e x e c u t e - - d r y - r u n 에 서 추 가 구 조 마 이 그 레 이 션 로 그 미 발 생 ( 현 재 상 태 유 지 관 찰 ) . - . d e u k - a g e n t 는 d o c s / t i c k e t s / k n o w l e d g e 3 개 하 위 축 으 로 정 렬 되 어 있 고 레 거 시 상 위 디 렉 토 리 ( t i c k e t s / c o r e | g l o b a l | m a i n | r e p o r t s 등 ) 미 존 재 . - d o c s / t i c k e t s a r c h i v e 는 월 별 b u c k e t ( 2 0 2 6 - 0 4 , 2 0 2 6 - 0 5 ) 기 준 으 로 만 남 아 있 음 . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 198 검증 디렉토리정리 초기화 완결성 joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
핵심 질문은 “`init` 마이그레이션 정규화가 끝난 뒤에도 `.deuk-agent`에 레거시 디렉토리와 문서 위치가 잔존하는지”였다.
과거 정리 과정에서 대량 이동이 발생했고, 현재 트리는 일부가 정리되지 않은 채 남아 있거나 월별 보관 규칙을 벗어난 경로가 있을 가능성이 있어 회귀 점검이 필요했다.

## Source Observations
### 실행 명령
- `find .deuk-agent -maxdepth 3 -type d`
- `find .deuk-agent/tickets -maxdepth 2 -type d`
- `find `merged ticket body` -maxdepth 3 -type f`
- `npx deuk-agent-rule init --workflow execute --dry-run`

### 핵심 관찰
- `.deuk-agent` 최상위는 현재 `config.json`, `telemetry.jsonl`, `docs`, `knowledge`, `tickets`만 보유한다.
- `tickets`는 `archive/sub`, `sub`만 보유한다.
- `docs`의 archive는 `plans/2026-04`, `plans/2026-05`, `merged reports/2026-04`, `merged reports/2026-05`로만 존재한다.
- 레거시 후보 경로(`tickets/core`, `tickets/main`, `tickets/global`, `tickets/reports`, `tickets/archive/core`, `tickets/archive/main`, `tickets/archive/global`)는 모두 존재하지 않는다.
- `init --dry-run` 실행 결과는 spoke sync 로그 외에 추가 마이그레이션 이동 로그를 출력하지 않았다.
- 활성 `sub` 티켓은 총 2건(과거 잔여 179, 이번 검증 198)이며, 목표 범위(디렉토리 정합성)와 무관한 잔여 작업은 별도 티켓에서 지속 추적 필요.

## Cause Hypotheses
1. 과거 이행 중 `init` 결과가 부분 반영되어 일부 파일만 새 스키마로 이동된 상태일 수 있다.
2. 월별 archive 이동은 과거 경로와 섞여 공존했을 가능성이 있으므로 `init` 기준점에서 다시 정규화가 필요한 시점이 있을 수 있다.
3. dry-run에서만 정합하고 실제 실행에서는 정책/조건이 달라져 잔재가 남을 수 있다.

## Decision Rationale
실행 계획은 `init` dry-run 중심 검증을 채택했다.

이유는 두 가지다.
1) 실제 변경 없이 정합성만 판별할 수 있어 회귀에 안전하다.
2) 레거시 탐지 지표가 명확한 상태(예: 경로 존재 여부, month-bucket 규칙 충족, 문서 이동 로그 미발생) 기반으로 재현 가능하다.

대안인 강제 재실행은 현재 상태에서 불필요한 추가 변경 리스크가 커 우선순위가 낮다.

## Execution Strategy
1. 현재 트리 기준으로 레거시/월별 bucket 규칙의 구조 정합성만 판별한다.
2. `init --workflow execute --dry-run`으로 이동 정책 충돌 여부를 확인한다.
3. 결과를 `archive`/`tickets`/`knowledge` 계열로 분리해 검증 보고한다.
4. 실패 항목이 발견되면 관련 스크립트 테스트(특히 `scripts/cli-init-logic.mjs`의 정규화 함수)로 증거를 얻는다.

## Verification Design
- `find .deuk-agent -maxdepth 3 -type d`
  - 기대: `.deuk-agent/{docs,tickets,knowledge}` 하위 레이어가 정규화 스키마를 만족하고 레거시 top-level dir가 없어야 함
- `find .deuk-agent/tickets/archive/sub -type d`
  - 기대: 월별 아카이브 구조(예: `YYYY-MM`) 보장
- `find `merged ticket body` -maxdepth 3 -type f`
  - 기대: `archive/plans`, `archive/merged reports` 하위 월별 디렉토리만 존재
- `npx deuk-agent-rule init --workflow execute --dry-run`
  - 기대: 추가 병합/삭제 로그가 과도하게 없고 구조 위반이 없어야 함

## Result
요구한 정합성 검사 기준은 모두 충족되었다.

- 레거시 티켓/문서 루트 잔재 없음 확인.
- 월별 아카이브 구조 준수 확인.
- `init --dry-run` 단계에서 대규모 추가 마이그레이션 로그 미발생.

남은 리스크:
- 현재 작업 트리가 이미 다수의 이전 정리 변경으로 뒤섞인 상태라(아카이브/레거시 경로 다수 삭제/이동된 흔적) 장기적으로 `index` 파일 정합성 재생성이 더 필요할 수 있음.
- `tickets/sub`에 179번 과거 티켓이 남아 있어, 본 티켓 범위를 넘는 정리 항목으로 별도 추적이 필요.
