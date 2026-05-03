 - - - i d : 1 9 6 - d e u k a g e n t - d o c s - a r c h i v e - m o n t h l y - s - j o y - n u c b t i t l e : d e u k a g e n t - d o c s - a r c h i v e - m o n t h l y - s t r u c t u r e - h a r d p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : . d e u k - a g e n t d o c s / 아 카 이 브 문 서 를 연 월 단 위 로 정 리 하 고 분 석 문 서 경 로 를 정 형 화 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 2 4 : 0 8 - - - # d e u k a g e n t - d o c s - a r c h i v e - m o n t h l y - s t r u c t u r e - h a r d > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y d e u k a g e n t - d o c s - a r c h i v e - m o n t h l y - s t r u c t u r e - h a r d - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " . d e u k - a g e n t d o c s / 아 카 이 브 문 서 를 연 월 단 위 로 정 리 하 고 분 석 문 서 경 로 를 정 형 화 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " . d e u k - a g e n t d o c s / 아 카 이 브 문 서 를 연 월 단 위 로 정 리 하 고 분 석 문 서 경 로 를 정 형 화 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " . d e u k - a g e n t d o c s / 아 카 이 브 문 서 를 연 월 단 위 로 정 리 하 고 분 석 문 서 경 로 를 정 형 화 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 196 deukagent docs archive monthly s joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 `merged ticket body`의 문서 정돈 범위만 다룹니다.
- 본 문서는 현재 요청에 대한 분석과 실행 근거를 기록하고, 진행 기록은 티켓 본문에 남깁니다.

## Problem Analysis
- 현재 `merged ticket body`는 `plans`, `merged reports`, `schemas`, `scratch`로만 구성되어 있고, archive가 없어 정렬 기준이 없어 보입니다.
- 아카이브 대상 문서(대부분 과거 티켓 기반 계획/보고서)가 다수 평탄한 상태라 탐색과 보존 정책이 일관되지 않습니다.
- 사용자 요청은 `archive` 하위에 연월(`YYYY-MM`) 단위로 정리해야 한다는 것이므로, 문서 위치를 티켓 상태(활성/비활성)와 무관하게 일괄 규격화할 필요가 있습니다.

## Source Observations
- `AGENTS.md`/`core-rules/AGENTS.md`에서 티켓 기반 거버넌스와 문서 위치 규칙을 확인했습니다.
- `merged ticket body`는 현재 `merged reports`와 `plans`가 월별 디렉터리 없이 평탄하게 존재합니다.
- 티켓 레포지토리는 이미 `.deuk-agent/tickets/archive/<group>/<YYYY-MM>/<DD>/` 구조를 사용 중이며, 이를 문서 보존 분할 규칙의 기준으로 재사용할 수 있습니다.

## Cause Hypotheses
- 초기 정합성 이동은 문서 템플릿 기준(`init`)에 맞춘 기본 정리만 수행했고, 기존 누적 문서는 후속 작업으로 분류되지 않아 정리가 멈췄을 가능성이 큽니다.
- `merged reports`/`plans` 경로의 과거 아카이브 유무를 구분하지 못해 하나의 덩어리로 남아 있을 가능성이 큽니다.

## Decision Rationale
- 문서 파일명 선두의 티켓 ID를 기준으로 티켓 상태를 조회해, 현재 열려 있는 티켓 문서는 그대로 두고 나머지를 월별 archive로 이동하는 방식을 택합니다.
- 이동 대상 월은 해당 티켓의 실제 티켓 `archiveYearMonth`(또는 생성일 기준 fallback)으로 정하고, plan/report를 각각 `archive/plans/<YYYY-MM>/` 및 `archive/merged reports/<YYYY-MM>/`로 분리합니다.
- `scratch`는 임시 작업 산출물로 남겨 두고, `schemas`는 규격 문서이므로 이동하지 않습니다.

## Execution Strategy
1. 현재 `docs` 구조를 확인해 대상 파일 목록을 생성합니다.
2. 이동할 각 문서에서 티켓 ID를 파싱하고, 티켓 상태와 연월 정보를 읽어 `YYYY-MM` 경로를 계산합니다.
3. 비정상 매칭(ID 없음/티켓 파일 부재)은 fallback로 생성월 기준 월별 archive로 옮기되, 이동 실패 위험이 큰 파일은 로그에 남기고 건너뜁니다.
4. `archive` 신규 디렉터리 생성 후 `plans`/`merged reports` 파일을 이동합니다.
5. 이동 완료 후 남은 문서 목록을 점검해 중복/누락 여부를 확인하고, 변경 파일만 간단 점검합니다.

## Verification Design
- 실행 후 `rg --files `merged ticket body`로 월별 폴더가 생성되었는지 확인합니다.
- 이동 후에도 `rg --files `merged ticket body` | wc` 및 `merged reports` 수량이 동일한지 점검합니다.
- `npx deuk-agent-rule lint:md `merged into this ticket` .deuk-agent/tickets/sub/196...md` 를 통해 핵심 문서 lint 통과를 확인합니다.
