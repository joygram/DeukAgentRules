 - - - i d : 1 6 8 - d e u k p a c k - b m t - i s s u e - c o n t i n u a t i o n - - j o y - n u c b t i t l e : d e u k p a c k - b m t - i s s u e - c o n t i n u a t i o n - j o y - n u c b p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 득 팩 B M T 이 슈 이 어 서 진 행 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - t r u t h - g a t e - c o n t i n u a t i o n c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 2 : 4 4 : 0 8 - - - # d e u k p a c k - b m t - i s s u e - c o n t i n u a t i o n - j o y - n u c b > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * D e u k P a c k B M T t r u t h g a t e c o n t i n u a t i o n : / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / * , B M T r e p o r t s , a n d t h i s t i c k e t / p l a n / r e p o r t e v i d e n c e - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / P R O J E C T _ R U L E . m d , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / m a t r i x - v a l i d a t o r . j s , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / p r e f l i g h t - m a t r i x . j s , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / g e n e r a t e d - c o d e - r u n n e r . j s , c u r r e n t B M T r e p o r t - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t / p l a n / r e p o r t d o c s a n d D e u k P a c k B M T s o u r c e u n d e r / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / - F o r b i d d e n m o d u l e s : g e n e r a t e d b e n c h m a r k a r t i f a c t s u n l e s s p r o d u c e d b y a n a p p r o v e d B M T r u n , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , D e u k P a c k g e n e r a t e d o u t p u t s u n d e r d i s t / , b e n c h m a r k s / g e n / , b e n c h m a r k s / d e u k p a c k _ o u t / - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : t i c k e t 1 5 3 - 1 5 6 B M T r e p o r t s , c u r r e n t D e u k P a c k B M T v a l i d a t o r / p r e f l i g h t / r u n n e r i m p l e m e n t a t i o n , a n d l a t e s t B M T o u t p u t - O u t p u t : c u r r e n t f a i l u r e c l a s s i f i c a t i o n p l u s m i n i m a l B M T p r o o f / p r e f l i g h t / r e p o r t u p d a t e s n e e d e d t o m o v e t o w a r d a t r u t h f u l g r e e n o r c o n d i t i o n a l s t a t e - S i d e e f f e c t s : t i c k e t + p l a n / r e p o r t d o c s u p d a t e s a n d s c o p e d D e u k P a c k B M T e d i t s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / d o c s / w a l k t h r o u g h s / 1 6 8 - d e u k p a c k - b m t - i s s u e - c o n t i n u a t i o n - - j o y - n u c b - r e p o r t . m d ) # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 6 8 - d e u k p a c k - b m t - i s s u e - c o n t i n u a t i o n - - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 168 deukpack bmt issue continuation joy nucb plan

# DeukPack BMT 이슈 연속 대응

## Ticket Contract Pointer
- 티켓 168은 `deukpack-bmt-issue-continuation--joy-nucb`의 범위를 관리하고, 본 계획문은 원인 분석·의사결정·실행 설계를 관리한다.
- 실행은 `project=DeukPack` 쪽 BMT 증거 수집/검증 파이프라인에 한정한다.

## Problem Analysis
- 현재 canonical report 기준 판단은 `green`이 아니며, 실패 사유는 사실상 두 가지다.
  - C++ preflight 10건: `cmake: not found`로 `verify_failed`.
  - Java preflight 10건: `mvn ENOENT`로 `unavailable`.
- 유사 competitor(예: MessagePack) 행은 `plain-object` 및 `dependencyProof` 미기재로 인해 `Third-party Truth Gate`에서 신뢰성이 낮다고 판단됨.
- 기존 155/156 티켓은 게이트 강화 자체는 완료했으므로, 남은 과제는 **실제 환경 구성 + 실제 dependency/schema 증거 보강**이다.

## Source Observations
- `merged into this ticket`에서 최종 판단을 `failed`로 고정하고 실패 사유를 명시하고 있음.
- `155-deukpack-bmt-validation-truth-ga-joy-nucb.md` 보고서에서 후속 작업으로 `C++/Java 환경 구성` 및 `third-party 실제 증명 추가`를 제시함.
- `Third-party` 증거는 현재 `schemaProof.kind: plain-object`와 `dependency proof 없음` 케이스가 다수 관찰됨.

## Cause Hypotheses
- H1: 벤치마크 실행 환경이 C++/Java 도구 체인을 갖추지 못해 preflight proof가 생성되지 않았고, 그 상태가 과거엔 그레이닝 오해로 이어질 수 있었다.
- H2: competitor 비교 데이터가 실제 의존성/스키마 호환 증거 없이 최소 필드로 채워져 있어, 강화된 truth gate에서 신뢰성 검증을 통과하지 못함.
- H3: BMT 실패 원인 해결은 코드 변경보다 실행 환경 정비 및 증거 채택 작업이 병행되어야 한다.

## Decision Rationale
- 게이트 규칙은 완화하지 않는다. 오히려 현재 strict 하게 유지해 실제 실패를 드러내는 상태를 보존한다.
- 1순위로 BMT 증거의 진위를 확보한다: 환경 의존성 preflight와 third-party proof를 실제 증거 기반으로 보강한다.
- 2순위로 문서/자동화에서 실행 조건을 명확히 해 동일 실수를 재발하지 않게 한다.
- 3순위로 재실행한 결과만을 기준으로 상태를 갱신한다.

## Execution Strategy
1. DeukPack 쪽 preflight 환경 가이드와 실제 실행 조건을 문서/스크립트로 정리한다.
2. C++/Java 의존성이 확보된 환경에서 BMT를 재실행한다.
3. MessagePack 등 유사 comparator 행의 `third-party` 메타데이터(`schemaProof`, `dependencyProof`) 채우기를 점검하고, 필요 시 스크립트 보강으로 자동화한다.
4. 결과 리포트를 최신 상태로 반영하고, `deukpack-bmt-current-report.md` 업데이트 기준을 맞춘다.

## Verification Design
- 재실행 기준: 기존 BMT 실행 커맨드로 preflight 검증 상태(`verify_failed`, `unavailable`) 감소를 확인한다.
- 증명 기준: 강화된 truth gate에서 `third-party` plain-object/의존성 미기재 경고가 제거되는지 확인한다.
- 최종 판단 기준: 갱신된 `deukpack-bmt-current-report.md`의 결론 섹션에서 상태가 `green` 혹은 조건부 판정으로 전환되는지 검토한다.
- 잔여 위험: CI/로컬 환경 제약으로 재실행 비용이 높고, 라이선스/의존성 설치 정책이 필요한 범위로 제한될 수 있다.

## Execution Result
- `node --check scripts/bmt/orchestrator.js` 통과.
- `node --check scripts/bmt/matrix-validator.js` 통과.
- `node scripts/bmt/orchestrator.js`는 의도대로 실패했다. 실패 상태는 C# generated roundtrip 22건, cross-language transfer `blocked` 1008건, legacy compatibility `blocked` 128건으로 구체화되었다.
- `third-party truth gate`는 현재 산출물 기준 direct 12 / similar 12로 통과했다.

## Merged Legacy Document


### 168 deukpack bmt issue continuation joy nucb report

# DeukPack BMT 이슈 연속 진행 보고서

## 결론

BMT는 여전히 실패 상태다.

이번 진행에서는 `crossTransferRows`와 `legacyCompatibilityRows`가 비어 있어 validator가 단순 missing으로만 보고하던 상태를 고쳤다. 이제 BMT 산출물은 해당 영역이 구현되지 않았음을 요구 cell별 `blocked` evidence로 기록한다.

## 변경

`/home/joy/workspace/DeukPack/scripts/bmt/orchestrator.js`

- cross-language transfer 요구 cell 1008개를 `blocked` row로 생성한다.
- legacy compatibility 요구 cell 128개를 `blocked` row로 생성한다.
- blocked row는 fixture hash와 실패 이유를 포함해 release truth gate에서 green으로 오인되지 않게 한다.

`/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`

- cross-language/legacy row 존재 여부와 pass 여부를 분리해서 판단한다.
- row가 있지만 `passed`가 아니면 `missing` 대신 `blocked` 또는 실패 상태와 detail을 보고한다.

## 검증

`node --check scripts/bmt/orchestrator.js` 통과.

`node --check scripts/bmt/matrix-validator.js` 통과.

`node scripts/bmt/orchestrator.js` 실행 결과 validator는 의도대로 실패했다.

- Passed: 14 / 18
- Failed: 4 / 18
- `crossTransferRows`: 1008개, 전부 `blocked`
- `legacyCompatibilityRows`: 128개, 전부 `blocked`
- `third-party truth gate`: 통과, direct 12 / similar 12
- C# generated rows: 22개 실패
- Preflight failed/unavailable/blocked rows: 166개

## 남은 실패

- C# generated roundtrip:
  - `XTCompact`은 `Attempted to read past the end of the stream`
  - `XTJson`, `DpPack`, `DpJson`, `DpYaml` 일부 모델은 unpack 결과가 fixture와 불일치
  - `DpZero`, `DpCsv`는 C# `DpFormat`에 매핑되지 않음
- Cross-language transfer runner는 아직 실제 source/target payload proof를 만들지 않는다.
- Legacy compatibility runner는 아직 legacy codec payload proof를 만들지 않는다.

## 다음 작업

우선순위는 C# generated roundtrip 실패 수리다. 그 다음 cross-language transfer runner와 legacy compatibility runner를 실제 proof 기반으로 구현해야 한다.
