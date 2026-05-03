 - - - i d : 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b t i t l e : d e u k p a c k - b m t - l a n g u a g e - k o r e a n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o p a r e n t T i c k e t : 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b s u m m a r y : " D e u k P a c k B M T 누 락 복 구 : K o t l i n 언 어 단 위 테 스 트 보 강 " c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 6 : 1 3 : 1 6 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - k o t l i n - t e s t - c o v e r a g e - - - # d e u k p a c k - b m t - l a n g u a g e - k o r e a n > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . 연 결 티 켓 : . d e u k - a g e n t / t i c k e t s / s u b / 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b . m d # # S c o p e & C o n s t r a i n t s - * * C o n t e x t F i l e s : * * . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 4 2 - d e u k p a c k - 1 3 5 - j o y - n u c b - r e p o r t . m d , . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 3 7 - d e u k p a c k - b m t - l a n g u a g e - p y t h o n - j o y - n u c b - r e p o r t . m d , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / P R O J E C T _ R U L E . m d , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / r e p o r t s / B M T _ P R O T O C O L _ M A T R I X . m d , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / r e p o r t s / D E U K P A C K _ T E S T _ M A T R I X . m d - * * D e s i g n R a t i o n a l e : * * P y t h o n 보 강 기 준 이 완 료 되 었 으 므 로 남 은 큐 의 마 지 막 항 목 인 K o t l i n B M T 근 거 레 이 어 에 서 C o m p r e s s i o n 회 귀 불 일 치 , s t r e a m i n g 검 증 누 락 , e v i d e n c e 보 강 을 분 리 해 공 식 M a t r i x 에 없 는 항 목 이 성 공 상 태 로 승 격 되 지 않 도 록 한 다 . - * * C o n s t r a i n t s : * * b e n c h m a r k / r e p o r t 산 출 물 재 생 성 금 지 , 공 식 b a s e l i n e / c a t a l o g 확 장 금 지 , 생 성 파 일 직 접 수 정 금 지 , D e u k P a c k 코 드 생 성 기 / 런 타 임 구 현 변 경 금 지 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : 본 티 켓 파 일 , 연 결 p l a n 파 일 , 필 요 시 . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b - r e p o r t . m d - F o r b i d d e n m o d u l e s : / h o m e / j o y / w o r k s p a c e / D e u k P a c k / d i s t / , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / d i s t - t e s t / , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / r e p o r t s / , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / t e m p l a t e s / , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / h i s t o r y / , D e u k P a c k c o d e g e n / r u n t i m e s o u r c e - R u l e c i t a t i o n : D e u k A g e n t R u l e s c o r e - r u l e s / A G E N T S . m d v 1 7 G 7 / G 8 , D e u k P a c k P R O J E C T _ R U L E . m d D C - C O D E G E N / D C - V E R I F Y - B M T / D C - T I C K E T - F I R S T # # # [ C O N T R A C T ] - I n p u t : 1 4 2 총 괄 큐 의 K o t l i n 잔 여 항 목 , 1 3 7 P y t h o n 완 료 패 턴 , D e u k P a c k B M T M a t r i x 의 현 재 언 어 / 근 거 상 태 - O u t p u t : K o t l i n B M T 보 강 기 준 이 C o m p r e s s i o n r e g r e s s i o n , s t r e a m i n g v e r i f i c a t i o n , e v i d e n c e m e t a d a t a 로 분 리 된 실 행 가 능 p l a n 과 검 증 기 록 - S i d e e f f e c t s : 티 켓 / p l a n 문 서 갱 신 및 m a r k d o w n l i n t 결 과 기 록 # # # [ P A T C H P L A N ] - K o t l i n B M T 근 거 에 서 c o m p r e s s i o n 회 귀 상 태 , s t r e a m i n g 검 증 상 태 , e v i d e n c e m e t a d a t a 를 분 리 해 p l a n 에 고 정 한 다 . - 공 식 M a t r i x 에 K o t l i n 섹 션 이 나 원 천 근 거 가 없 으 면 미 검 증 또 는 대 기 로 분 류 하 고 성 공 상 태 로 승 격 하 지 않 는 다 . - e v i d e n c e 필 수 확 인 포 인 트 를 t e s t _ i d , l a s t _ v e r i f i e d , p a s s _ r a t e , s o u r c e _ p a t h , r u n n e r , l a n g u a g e 로 정 의 한 다 . - l i n t : m d 로 티 켓 과 p l a n f r o n t m a t t e r / 본 문 정 합 성 을 검 증 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] K o t l i n C o m p r e s s i o n 회 귀 불 일 치 항 목 분 리 - [ x ] s t r e a m i n g 검 증 누 락 항 목 을 구 현 상 태 와 테 스 트 근 거 로 분 리 - [ x ] e v i d e n c e m e t a d a t a 필 수 확 인 포 인 트 고 정 - [ x ] 티 켓 / p l a n m a r k d o w n l i n t 통 과 # # D o n e W h e n > K o t l i n B M T 보 강 기 준 이 지 원 성 / 구 현 성 / 검 증 성 3 층 으 로 분 리 되 고 , 공 식 근 거 없 는 항 목 이 i m p l e m e n t e d / p a s s i n g 으 로 승 격 되 지 않 으 며 , 티 켓 과 p l a n 이 l i n t : m d 를 통 과 한 다 . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 136 deukpack bmt language korean joy nucb plan

# Plan: DeukPack BMT Kotlin 누락 테스트 보강

## 목표
- Kotlin 항목의 `Compression regression`, `streaming verification`, `evidence metadata` 누락을 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 공식 BMT Matrix에 Kotlin 섹션이나 원천 근거가 없으면 성공 상태로 승격하지 않는다.
- 상위 142 티켓의 공통 누락 계약을 Kotlin 하위 티켓에 적용한다.

## 범위
- 대상: Kotlin BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Kotlin 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격, Kotlin을 공식 Matrix 언어로 추가
- 참고: `142-deukpack-135-report`, `137-deukpack-bmt-language-python-report`, DeukPack `PROJECT_RULE.md`, `BMT_PROTOCOL_MATRIX.md`, `DEUKPACK_TEST_MATRIX.md`

## 실행 항목
1. [x] Kotlin Compression 회귀 불일치 항목 분리
   - `support_level`은 Kotlin 도입 가능성 또는 후보 상태로 기록
   - `implementation_state`는 compression 구현/누락/대기 상태와 독립적으로 기록
   - 회귀 테스트 근거가 없으면 `미검증`으로 분류
   - 완료 기준: compression 지원 가능성, 구현 상태, 회귀 테스트 근거를 각각 독립 필드로 유지
2. [x] streaming 검증 누락 항목 분리
   - streaming 항목을 독립 feature로 유지
   - streaming 지원성, 실제 구현 상태, 테스트 통과 여부를 분리
   - streaming runner 또는 source path 근거가 없으면 `대기`로 분류
   - 완료 기준: streaming 구현 여부와 검증 통과 여부를 같은 셀에서 병합하지 않음
3. [x] evidence metadata 필드 정렬
   - Kotlin 근거를 `evidence`로 분리
   - `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`를 필수 확인 포인트로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
   - 완료 기준: evidence metadata가 비어 있으면 `implemented`나 `passing`으로 승격 금지
4. [x] 완료 기준 고정
   - Kotlin 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 공식 Matrix에 Kotlin 원천 근거가 없으면 후보/대기 상태로 유지
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 검증
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md `merged into this ticket`

## 실행 결과
- Kotlin `Compression regression`은 지원 가능성, 구현 상태, 회귀 테스트 근거를 독립 필드로 유지하도록 고정했다.
- `streaming verification`은 streaming 지원성, 실제 구현 상태, runner/source path 근거를 병합하지 않는 독립 항목으로 유지했다.
- evidence metadata는 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`를 필수 확인 포인트로 고정했다.
- 현재 DeukPack BMT Matrix에는 Kotlin 전용 공식 섹션이나 원천 근거가 확인되지 않으므로, Kotlin 항목은 공식 성공/implemented/passing 상태로 승격하지 않는다.
- 실제 원천 데이터나 테스트 러너 위치가 확인되기 전까지 Kotlin 항목은 후보, `미검증`, 또는 `대기`로 분류한다.

## 완료 기준
- Kotlin 보강 대상이 `Compression regression`, `streaming verification`, `evidence metadata`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨

## Merged Legacy Document


### 136 deukpack bmt language korean joy nucb report

# Report: DeukPack BMT Kotlin 누락 테스트 보강

## 검증 대상
- 티켓: `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`
- 계획: `merged into this ticket`
- 범위: Kotlin BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화

## 수행 결과
- Kotlin `Compression regression`을 독립 보강 항목으로 고정했다.
- `streaming verification`을 독립 feature로 유지했다.
- evidence metadata를 `evidence`로 분리하고 `test_id`, `last_verified`, `pass_rate`, `source_path`, `runner`, `language`를 필수 확인 포인트로 고정했다.
- 공식 BMT Matrix에 Kotlin 전용 섹션이나 원천 근거가 없으면 성공/implemented/passing으로 승격하지 않도록 했다.
- Kotlin 항목은 실제 원천 데이터나 테스트 러너 위치가 확인되기 전까지 후보, `미검증`, 또는 `대기`로 분류하도록 했다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md `merged into this ticket` `merged into this ticket`

## 검증 결과
- `lint:md passed (3 files)`

## 결론
- Kotlin BMT 보강 기준은 문서 기준으로 확정됐다.
- 코드 생성기, Kotlin 구현체, benchmark/report 산출물은 수정하지 않았다.
