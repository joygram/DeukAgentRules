 - - - i d : 1 8 1 - a r c h i v e - p a r t i t i o n - g c - r e p a i r - j o y - n u c b t i t l e : a r c h i v e - p a r t i t i o n - g c - r e p a i r p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 월 별 I N D E X . a r c h i v e . j s o n 파 티 셔 닝 , 오 래 된 a r c h i v e G C , r e b u i l d / r e p a i r 경 로 의 p a r t i t i o n - a w a r e 정 비 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 0 : 2 6 : 2 9 - - - # a r c h i v e - p a r t i t i o n - g c - r e p a i r > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y a r c h i v e - p a r t i t i o n - g c - r e p a i r - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 월 별 I N D E X . a r c h i v e . j s o n 파 티 셔 닝 , 오 래 된 a r c h i v e G C , r e b u i l d / r e p a i r 경 로 의 p a r t i t i o n - a w a r e 정 비 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 월 별 I N D E X . a r c h i v e . j s o n 파 티 셔 닝 , 오 래 된 a r c h i v e G C , r e b u i l d / r e p a i r 경 로 의 p a r t i t i o n - a w a r e 정 비 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 월 별 I N D E X . a r c h i v e . j s o n 파 티 셔 닝 , 오 래 된 a r c h i v e G C , r e b u i l d / r e p a i r 경 로 의 p a r t i t i o n - a w a r e 정 비 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 181 archive partition gc repair joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 아카이브 티켓은 본문 파일이 `archive/<group>/YYYY-MM/DD/` 구조로 나뉘어 있지만, 인덱스는 `INDEX.archive.json` 단일 파일로 유지됩니다. 이 구조는 아카이브가 적을 때는 충분하지만, 누적될수록 파일이 커지고 재작성 비용이 높아집니다.

추가로 `ticket archive`의 repair 경로는 실제 파일 존재 여부를 기준으로 아카이브 티켓을 복구하지만, 아카이브 저장 경로 자체가 월 단위 파티션이라는 사실을 적극적으로 활용하지 않습니다. 결과적으로 repair는 여전히 재귀 탐색에 많이 의존하고, rebuild는 전체 인덱스를 한 번에 다시 쓰는 쪽에 가깝습니다.

사용자가 원하는 다음 단계는 세 가지로 읽힙니다.
- `INDEX.archive.json`을 월별 파티션으로 쪼개기.
- 오래된 archive 인덱스 파티션을 자동 정리하는 GC 추가.
- rebuild/repair 경로를 파티션 인식형으로 다듬기.

이 세 가지는 분리해도 되지만, 실제로는 한 저장소 레이아웃 변경의 서로 다른 면입니다. 파티션 규칙이 먼저 정해져야 GC와 repair가 안정적으로 맞물립니다.

## Source Observations
- [scripts/cli-ticket-index.mjs](../../../scripts/cli-ticket-index.mjs) 는 현재 `INDEX.json`과 `INDEX.archive.json`을 읽어 하나의 엔트리 집합으로 합칩니다.
- 같은 파일의 `writeTicketIndexJson()`는 active/open 엔트리와 archive 엔트리를 분리해 각각 다른 파일에 저장하지만, archive 쪽은 아직 단일 파일 기준입니다.
- [scripts/cli-utils.mjs](../../../scripts/cli-utils.mjs) 의 `computeTicketPath()`는 아카이브 티켓 본문 경로에 `archive/<group>/<YYYY-MM>/<DD>/`를 이미 반영합니다.
- [scripts/cli-ticket-commands.mjs](../../../scripts/cli-ticket-commands.mjs) 의 `archiveTicketEntry()`는 이미 `archiveYearMonth`/`archiveDay`를 계산하고, repair 시에는 `findExistingArchivedTicketPath()`로 실제 파일을 찾습니다.
- 같은 파일의 `getArchiveDestination()`와 `archiveStorageFromPath()`는 아카이브 파티션을 계산하지만, 인덱스 파일의 저장 파티션과는 아직 연결되어 있지 않습니다.
- [scripts/tests/cli-ticket-commands.test.mjs](../../../scripts/tests/cli-ticket-commands.test.mjs) 에는 현재 `INDEX.archive.json` 단일 파일을 전제로 한 검증이 있습니다.

## Cause Hypotheses
- archive 인덱스가 본문 파일 경로와 독립된 단일 캐시처럼 남아 있어, 아카이브가 쌓일수록 hot path와 cold history가 같은 파일에 몰립니다.
- repair 경로가 파일 시스템 탐색에 의존하므로, 아카이브 파티션 구조를 알고 있어도 그 정보를 우선 활용하지 못합니다.
- rebuild 경로는 현재 인덱스 전체를 재구성하는 방식에 가까워서, 월별 파티션을 나눠도 저장 측면의 이득이 반감됩니다.
- GC 규칙이 없으면 파티션만 늘어나고 관리 비용이 남습니다. 반대로 GC가 너무 공격적이면 재구성 가능성이 깨집니다.

## Decision Rationale
- archive 인덱스를 `YYYY-MM` 단위 shard로 저장하는 방식이 가장 단순하고, 기존 아카이브 본문 경로와도 자연스럽게 맞습니다.
- `INDEX.archive.json`은 레거시 호환 읽기용으로만 유지하고, 쓰기는 월별 shard를 기준으로 바꾸는 쪽이 안전합니다.
- GC는 본문 파일 삭제가 아니라 archive index shard 정리부터 시작하는 편이 리스크가 낮습니다. 본문 파일은 소스 오브 트루스로 남기고, shard는 다시 만들 수 있는 캐시로 취급합니다.
- repair는 월별 shard 경로를 먼저 추정하고, 그다음에 전체 탐색으로 후퇴하는 2단계 전략이 적절합니다.
- rebuild는 archive shard를 모두 합치되, active index와 분리된 읽기/쓰기 경로를 유지해야 합니다.

## Execution Strategy
- `cli-ticket-index.mjs` 에 archive shard 파일 탐색, 읽기, 쓰기, 병합 로직을 추가한다.
- archive 엔트리를 `archiveYearMonth` 기준으로 묶어 `INDEX.archive.<YYYY-MM>.json` 같은 월별 파일에 저장한다.
- 기존 `INDEX.archive.json`은 읽기 호환용으로만 처리하고, 새 쓰기 경로가 자리 잡으면 더 이상 단일 파일에 의존하지 않게 한다.
- 오래된 shard는 retention 기준을 두고 정리한다. 우선은 파일 삭제보다 “빈 shard 정리 + 오래된 shard 수명 제한”처럼 안전한 규칙부터 적용한다.
- `cli-ticket-commands.mjs` 의 repair 경로는 기대 파티션 경로를 우선 확인하고, 없을 때만 재귀 탐색으로 후퇴하게 바꾼다.
- rebuild는 archive shard를 순회하며 병합하고, 필요하면 shard 단위로 다시 써서 대형 단일 파일 재작성 횟수를 줄인다.
- 테스트는 단일 archive 파일, 월별 shard, repair fallback, GC 후 재구성 가능성을 모두 확인하도록 보강한다.

## Verification Design
- `node --test scripts/tests/cli-ticket-commands.test.mjs` 에서 archive/create/repair 관련 회귀가 유지되어야 한다.
- 신규 테스트는 월별 shard 생성, legacy `INDEX.archive.json` 호환 읽기, repair 시 파티션 우선 탐색, GC 후 rebuild 복원 가능성을 확인해야 한다.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/181-archive-partition-gc-repair-joy-nucb.md `merged into this ticket` 로 Phase 1 문서 상태를 검증한다.
- 남은 리스크는 GC 기준이 너무 보수적이면 shard가 계속 쌓이고, 너무 공격적이면 오래된 archive 캐시가 사라지는 점이다. 따라서 첫 구현에서는 보수적인 retention과 레거시 호환을 우선한다.

## Verification Outcome
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/181-archive-partition-gc-repair-joy-nucb.md `merged into this ticket`: passed.
- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed.
- `node --test scripts/tests/*.test.mjs`: passed.
- Commit `e5d48b7` captured the implementation and tests.
