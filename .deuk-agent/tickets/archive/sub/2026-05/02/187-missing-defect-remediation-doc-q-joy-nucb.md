 - - - i d : 1 8 7 - m i s s i n g - d e f e c t - r e m e d i a t i o n - d o c - q - j o y - n u c b t i t l e : m i s s i n g - d e f e c t - r e m e d i a t i o n - d o c - q u a l i t y p h a s e : 3 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 검 증 데 이 터 기 반 문 서 품 질 누 락 결 함 을 템 플 릿 과 출 력 규 칙 에 서 수 정 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 1 : 4 0 : 1 5 - - - # m i s s i n g - d e f e c t - r e m e d i a t i o n - d o c - q u a l i t y > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y m i s s i n g - d e f e c t - r e m e d i a t i o n - d o c - q u a l i t y - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 검 증 데 이 터 기 반 문 서 품 질 누 락 결 함 을 템 플 릿 과 출 력 규 칙 에 서 수 정 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 검 증 데 이 터 기 반 문 서 품 질 누 락 결 함 을 템 플 릿 과 출 력 규 칙 에 서 수 정 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 검 증 데 이 터 기 반 문 서 품 질 누 락 결 함 을 템 플 릿 과 출 력 규 칙 에 서 수 정 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] A d d r e p o r t - s p e c i f i c l i n t c o v e r a g e f o r m i s s i n g o u t c o m e s e c t i o n s . - [ x ] U p d a t e c u r r e n t r e p o r t d r a f t ( s ) t o i n c l u d e e x p l i c i t v e r i f i c a t i o n o u t c o m e t e x t . - [ x ] R u n m a r k d o w n l i n t a n d t a r g e t e d t e s t s , t h e n r e c o r d t h e r e s u l t . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 8 7 - m i s s i n g - d e f e c t - r e m e d i a t i o n - d o c - q - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 187 missing defect remediation doc q joy nucb report

# Missing Defect Remediation Report

## Summary

walkthrough/report 문서에서 결과 섹션이 빠지는 결함을 막기 위해 `lint-md`에 report 전용 구조 검사를 추가했다.

## Verification

- `scripts/lint-md.mjs`에 `merged reports/*-report.md` 구조 검사를 추가했다.
- `scripts/tests/lint-md.test.mjs`로 report 누락/정상 케이스를 검증했다.
- `scripts/tests/cli-ticket-commands.test.mjs`의 walkthrough report attach 샘플을 새 구조에 맞췄다.

## Verification Outcome

- `node --test scripts/tests/lint-md.test.mjs`: passed
- `node --test scripts/tests/*.test.mjs`: passed
- `npx deuk-agent-rule lint:md`: passed after the report sample and current report draft were aligned

## Notes

- 새 규칙은 Summary/Verification에 더해 `Verification Outcome`/`Verification Results`/`검증 결과`를 요구한다.
- 현재 report 초안도 outcome 섹션을 포함하도록 보강했다.

## Merged Legacy Document


### 187 missing defect remediation doc q joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 수정의 범위와 APC 경계를 관리한다.
- 이 문서는 walkthrough/report 문서의 누락 결함을 막는 lint 규칙과 검증 결과 보강만 다룬다.
- 보고서의 검증 결과 누락을 다음 작업부터 자동으로 잡는 것이 목표다.

## Problem Analysis
- 현재 report 문서는 Summary/Verification만 있고, 결과를 명시하는 섹션이 빠진 경우가 많다.
- 이 때문에 검증 데이터는 있어도 문서가 무엇을 증명했는지 한눈에 읽히지 않는다.
- 기존 lint는 frontmatter와 링크 무결성만 보므로, 결과 섹션 누락은 통과한다.

## Source Observations
- `scripts/lint-md.mjs`는 모든 markdown에 대해 frontmatter와 링크만 검사한다.
- `scripts/cli-ticket-commands.mjs`는 report attach 시 파일을 복사하지만 report 내용 구조는 검사하지 않는다.
- 기존 walkthrough report들 중 상당수는 `Verification Outcome` 또는 `검증 결과` 섹션이 없다.
- 새로 만든 report 초안도 검증은 적어도 결과를 따로 적지 않으면 품질 분석에 불리하다.

## Cause Hypotheses
- 문서 품질 결함은 작성자 실수만이 아니라, output rule의 부재로 반복된다.
- report를 ticket/plan처럼 구조화된 산출물로 다루지 않아서 outcome 누락이 감지되지 않는다.
- 기존 문서가 통과해 온 이유는 lint가 구조적 완성도를 검사하지 않았기 때문이다.

## Decision Rationale
- report 문서를 바꾸는 대신, report 파일에만 적용되는 lint 규칙을 추가한다.
- 이렇게 하면 기존 티켓/플랜 규칙과 충돌하지 않고, 앞으로 작성되는 report의 누락만 막을 수 있다.
- 현재 존재하는 report 초안에는 outcome 섹션을 보강해 규칙을 충족시킨다.

## Execution Strategy
- `scripts/lint-md.mjs`에 walkthrough report 전용 섹션 검사를 추가한다.
- report 파일은 `Summary/요약`, `Verification/검증`, `Verification Outcome/검증 결과` 중 최소 결과 섹션을 요구한다.
- 관련 테스트를 추가해 report 구조 누락이 lint 실패로 이어지는지 확인한다.
- 현재 생성된 보고서 초안도 결과 섹션을 채운다.

## Verification Design
- `node --test scripts/tests/*.test.mjs`로 lint와 report 관련 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 현재 변경 문서가 새 규칙을 통과하는지 확인한다.
- 변경된 report 문서에 `Verification Outcome`이 포함되는지 확인한다.

## Verification Outcome
- `scripts/lint-md.mjs`에 walkthrough report 전용 Summary/Verification/Outcome 검사가 추가됐다.
- `scripts/tests/lint-md.test.mjs`와 `scripts/tests/cli-ticket-commands.test.mjs`가 새 규칙을 통과했다.
- `node --test scripts/tests/*.test.mjs`와 `npx deuk-agent-rule lint:md`가 모두 통과했다.
