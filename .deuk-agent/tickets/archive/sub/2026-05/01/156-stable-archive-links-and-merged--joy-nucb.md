 - - - i d : 1 5 6 - s t a b l e - a r c h i v e - l i n k s - a n d - m e r g e d - - j o y - n u c b t i t l e : s t a b l e - a r c h i v e - l i n k s - a n d - m e r g e d - b m t - r e p o r t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : A r c h i v e 후 티 켓 경 로 안 내 를 안 정 화 하 고 D e u k P a c k B M T 관 련 분 산 리 포 트 를 하 나 의 현 재 리 포 트 로 합 친 다 . p r i o r i t y : h i g h t a g s : - t i c k e t s - a r c h i v e - r e p o r t s - b m t c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 5 : 0 7 : 4 6 - - - # s t a b l e - a r c h i v e - l i n k s - a n d - m e r g e d - b m t - r e p o r t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / d e u k p a c k - b m t - c u r r e n t - r e p o r t . m d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , e x i s t i n g B M T r e p o r t s 1 5 3 / 1 5 4 / 1 5 5 - * * C o n s t r a i n t s : * * D o n o t e d i t g e n e r a t e d o u t p u t s . D o n o t d e l e t e a r c h i v e d p e r - t i c k e t e v i d e n c e w i t h o u t p r o o f . K e e p C L I c h a n g e l i m i t e d t o a r c h i v e p a t h s t a b i l i t y / r e p o r t d i s c o v e r a b i l i t y . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t a r c h i v e / r e p o r t c o m m a n d l o g i c , i t s f o c u s e d t e s t s , a n d t h e c a n o n i c a l m e r g e d B M T r e p o r t d o c u m e n t . - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d C L I s u b c o m m a n d s , D e u k P a c k s o u r c e / r u n t i m e f i l e s , h i s t o r i c a l a r c h i v e t i c k e t f i l e s e x c e p t v i a C L I l i f e c y c l e . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : c u r r e n t a r c h i v e c o m m a n d b e h a v i o r , t i c k e t i n d e x s t a t e , a n d B M T r e p o r t e v i d e n c e f r o m t i c k e t s 1 5 3 / 1 5 4 / 1 5 5 . - O u t p u t : a r c h i v e c o m m a n d u p d a t e s I N D E X t o f i n a l a r c h i v e d p a t h , p r i n t s f i n a l r e p o - r e l a t i v e p a t h , h a s r e g r e s s i o n c o v e r a g e , a n d p r o v i d e s o n e c a n o n i c a l B M T c u r r e n t r e p o r t . - S i d e e f f e c t s : t i c k e t + p l a n / r e p o r t d o c s u p d a t e s a n d s c o p e d C L I / t e s t c h a n g e s o n l y . # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] U p d a t e a r c h i v e c o m m a n d s o s t o r e d / o u t p u t t i c k e t p a t h f o l l o w s t h e a r c h i v e d f i l e . - [ x ] A d d r e g r e s s i o n c o v e r a g e f o r a r c h i v e p a t h / i n d e x u p d a t e . - [ x ] M e r g e B M T 1 5 3 / 1 5 4 / 1 5 5 r e p o r t e v i d e n c e i n t o o n e c a n o n i c a l c u r r e n t r e p o r t . - [ x ] R u n m a r k d o w n l i n t a n d r e l e v a n t n o d e t e s t s . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 5 6 - s t a b l e - a r c h i v e - l i n k s - a n d - m e r g e d - - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 156 stable archive links and merged joy nucb report

# 156 stable archive links and merged BMT report 결과

## 변경

`scripts/cli-ticket-commands.mjs`의 `ticket archive`가 최종 archived ticket path를 repo-relative 경로로 출력하고, API 호출 결과로도 `{ id, path }`를 반환하도록 했다.

기존 INDEX writer는 physical path snapshot을 저장하지 않고 status/fileName으로 경로를 재계산하는 구조다. 따라서 저장층 패턴은 유지하고, archive 직후 대화/로그에서 재사용할 수 있는 최종 경로를 명시적으로 제공하는 방식으로 정리했다.

`scripts/tests/cli-ticket-commands.test.mjs`에 archive regression test를 추가했다. 실제 임시 티켓 파일을 archive한 뒤 archived 파일 존재, INDEX status, 반환 path, 콘솔 final path 출력을 검증한다.

DeukPack BMT 보고서는 `merged into this ticket`로 합쳤다. 153/154/155 per-ticket report는 archive evidence로 보존하고, 사용자-facing 현재 판단은 통합 리포트를 기준으로 본다.

## 검증

`node --test scripts/tests/cli-ticket-commands.test.mjs` 통과.

`npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md `merged into this ticket` `merged into this ticket` 통과.

`git diff --check -- scripts/cli-ticket-commands.mjs scripts/tests/cli-ticket-commands.test.mjs .deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md `merged into this ticket` `merged into this ticket` 통과.

## 현재 BMT 판단

BMT는 green이 아니다. 기존 gate는 통과했지만, truth gate 보강 후에는 C++ `cmake` 부재, Java `mvn` 부재, MessagePack similar competitor의 third-party proof 부족 때문에 실패해야 하는 상태다.

Canonical current report: `merged into this ticket`

## Merged Legacy Document


### 156 stable archive links and merged joy nucb plan

# 156 stable archive links and merged BMT report plan

## Ticket Contract Pointer

작업 경계와 APC는 `.deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md`가 소유한다. 이 문서는 문제 분석, 근거, 실행 전략, 검증 설계만 기록한다.

## Problem Analysis

현재 `ticket archive`는 티켓 파일을 `.deuk-agent/tickets/archive/<group>/`로 이동하지만, INDEX entry에는 기존 `found.path`가 남을 수 있다. 대화창이나 후속 CLI 출력이 작업 당시의 이동 전 경로를 그대로 참조하면, 실제 파일 위치와 사용자가 보는 링크가 어긋난다.

DeukPack BMT 작업도 감사, 실행 결과, truth gate 보강이 153/154/155 세 보고서로 나뉘어 있다. 개별 티켓의 증거 보존은 유효하지만, 사용자에게 현재 판단을 전달할 canonical report가 없어서 “무엇이 최종 결론인지”가 흐려진다.

## Source Observations

`scripts/cli-ticket-commands.mjs`의 `runTicketArchive`는 `newAbsPath`로 파일을 이동한 뒤 status와 updatedAt만 갱신한다. 최종 archived path를 INDEX에 반영하지 않고, 콘솔 출력도 file URI 중심이라 대화에서 재사용할 repo-relative 최종 경로가 명시적으로 남지 않는다.

기존 보고서 153은 evidence kind 분리, 154는 실제 BMT 실행 결과, 155는 환경 미구성과 third-party fake proof를 실패로 처리한 truth gate를 다룬다. 세 문서는 하나의 BMT 현재 상태 판단으로 합칠 수 있다.

## Cause Hypotheses

경로 문제의 직접 원인은 archive move 후 INDEX path 미갱신이다. 간접 원인은 archive 출력이 “최종 경로를 이후 답변에서 쓰라”는 형태로 안정화되어 있지 않아, 에이전트가 이미 읽은 pre-archive path를 계속 인용하기 쉽다는 점이다.

리포트 분산 문제의 원인은 티켓별 report 자동 연결 관성이다. 티켓 evidence와 현재 상태 보고서의 목적이 다른데, 둘을 모두 `<ticket-id>-report.md`에만 두면 current view가 쪼개진다.

## Decision Rationale

CLI 쪽은 `runTicketArchive`에서 INDEX entry의 `path`를 `archive/...` 최종 위치로 갱신하고, `fileName`도 최종 파일명과 동기화한다. 출력에는 repo-relative final path를 추가해 대화/로그에서 그대로 쓸 수 있게 한다.

리포트 쪽은 기존 per-ticket report를 삭제하지 않고, `merged into this ticket`를 canonical current report로 만든다. 삭제는 archive ticket의 증거 링크를 끊을 수 있으므로 이번 변경에서는 보존한다.

## Execution Strategy

`runTicketArchive`의 move 완료 직후 index entry update block에 final path/fileName을 기록한다. 테스트는 임시 workspace에 실제 티켓 파일과 INDEX entry를 만들고 archive 실행 후 archived file existence와 INDEX path/status를 검증한다.

통합 보고서는 153/154/155의 결론을 합쳐 “현재 BMT는 green이 아니며, generated roundtrip과 external smoke/preflight를 구분해야 하고, 환경/third-party proof가 채워지기 전까지 통과로 보지 않는다”로 정리한다.

## Verification Design

Markdown 변경 후 `npx deuk-agent-rule lint:md`로 ticket/plan/report를 검사한다. CLI 변경은 `node --test scripts/tests/cli-ticket-commands.test.mjs`로 검증하고, syntax regression을 겸한다. 필요하면 `git diff --check`로 공백 오류를 확인한다.
