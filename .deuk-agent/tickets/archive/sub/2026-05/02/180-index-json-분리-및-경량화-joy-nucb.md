 - - - i d : 1 8 0 - i n d e x - j s o n - 분 리 - 및 - 경 량 화 - j o y - n u c b t i t l e : I N D E X . j s o n 분 리 및 경 량 화 p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : I N D E X . j s o n 을 a c t i v e / a r c h i v e 중 심 으 로 분 리 하 고 경 량 화 해 파 일 시 스 템 D B 안 정 성 을 높 인 다 p r i o r i t y : P 2 t a g s : - i n d e x - s t o r a g e - p a r t i t i o n c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 0 : 2 1 : 1 9 - - - # I N D E X . j s o n 분 리 및 경 량 화 > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y I N D E X . j s o n 분 리 및 경 량 화 - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " I N D E X . j s o n 을 a c t i v e / a r c h i v e 중 심 으 로 분 리 하 고 경 량 화 해 파 일 시 스 템 D B 안 정 성 을 높 인 다 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " I N D E X . j s o n 을 a c t i v e / a r c h i v e 중 심 으 로 분 리 하 고 경 량 화 해 파 일 시 스 템 D B 안 정 성 을 높 인 다 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " I N D E X . j s o n 을 a c t i v e / a r c h i v e 중 심 으 로 분 리 하 고 경 량 화 해 파 일 시 스 템 D B 안 정 성 을 높 인 다 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 180 index json 분리 및 경량화 joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 `INDEX.json`은 티켓 탐색, active 포인터, status 전이, archive 추적을 모두 한 파일에 담고 있습니다. 엔트리 수가 늘어날수록 파일은 커지고, 생성/아카이브/리빌드/복구가 모두 같은 장부를 건드립니다. 이 구조는 동작은 하지만, IDE 종료나 중간 쓰기 실패, 자동 아카이브 연쇄 처리 같은 상황에서 쉽게 흔들릴 수 있습니다.

## Source Observations
- [scripts/cli-ticket-index.mjs](../../../scripts/cli-ticket-index.mjs) 는 `readTicketIndexJson()`과 `writeTicketIndexJson()`로 인덱스를 통째로 읽고 다시 씁니다.
- 같은 파일에서 `syncActiveTicketId()`가 active ticket와 pointer 파일 정리를 함께 맡고 있어, 상태와 포인터 책임이 한 곳에 몰려 있습니다.
- [scripts/cli-ticket-commands.mjs](../../../scripts/cli-ticket-commands.mjs) 는 create, close, move, archive, next, use, list, rebuild에서 모두 동일한 `INDEX.json`을 기준으로 상태를 계산합니다.
- `readTicketIndexJson()`는 path를 다시 계산해 drift를 줄이지만, entries 자체는 계속 누적되어 파일 크기와 갱신 비용이 증가합니다.
- 현재 `INDEX.json` 크기는 약 62KB, 130개 엔트리 수준이라 당장 비정상은 아니지만, 구조적으로는 성장 비용이 계속 붙는 형태입니다.

## Cause Hypotheses
- `INDEX.json`이 사실상 hot index, archive catalog, state cache 역할을 동시에 하고 있습니다.
- archive된 항목이 계속 같은 파일 구조에 남아 있어 active lookup과 cold history가 분리되지 않습니다.
- rebuild와 rollback이 전체 인덱스를 자주 만지므로, 파일이 커질수록 실패 복구 범위가 넓어집니다.
- 현재 구조에는 active-only fast path가 없어서, 자주 쓰는 상태와 오래된 상태가 같은 비용으로 취급됩니다.

## Decision Rationale
- active, archive, meta 역할을 분리하는 방향이 가장 먼저 필요합니다.
- `INDEX.json` 하나를 무조건 유지하기보다, `INDEX.active.json` 같은 작은 hot index와 archive 파티션/스냅샷으로 나누는 것이 안전합니다.
- direct lock보다 재생 가능한 journal/snapshot 모델이 더 적합합니다.
- 모든 기록을 한 번에 재작성하는 방식은 단순하지만, 여기서는 지연 싱크와 파티션이 더 낫습니다.

## Execution Strategy
- 1차로 현재 `INDEX.json`의 사용처를 분류하고, 읽기 경로와 쓰기 경로를 active/archive로 나눌 수 있는 최소 인터페이스를 정의합니다.
- 2차로 active index에는 open/active/current pointer만 남기고, archived entries는 별도 파티션 파일이나 snapshot으로 보냅니다.
- 3차로 `readTicketIndexJson()`과 `writeTicketIndexJson()`의 내부 구현을 분리해, CLI는 같은 API를 쓰되 저장소 레이아웃만 바꾸게 합니다.
- 4차로 rebuild와 rollback은 전체 재작성보다 partition 단위 재생성에 가깝게 바꿉니다.
- 5차로 journal 또는 snapshot을 도입해 IDE 종료나 중간 실패 후에도 재구성할 수 있게 합니다.

## Verification Design
- `ticket list`, `ticket status`, `ticket meta`, `ticket use`, `ticket next`, `ticket close`, `ticket move`, `ticket archive`가 기존과 동일하게 동작해야 합니다.
- active index와 archive 파티션을 나눠도 open/active 탐색 결과가 바뀌지 않아야 합니다.
- 인덱스가 부분적으로 손상된 경우 rebuild 경로로 복구할 수 있어야 합니다.
- CLI가 `INDEX.json`을 직접 대량 재작성하는 횟수가 줄어들어야 합니다.
- 남은 리스크는 파티션 파일이 늘어나면서 관리 대상이 증가하는 점이므로, partition 기준과 GC 규칙을 같이 정의해야 합니다.
