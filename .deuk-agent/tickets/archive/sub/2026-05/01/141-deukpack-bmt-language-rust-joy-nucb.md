 - - - i d : 1 4 1 - d e u k p a c k - b m t - l a n g u a g e - r u s t - j o y - n u c b t i t l e : d e u k p a c k - b m t - l a n g u a g e - r u s t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o p a r e n t T i c k e t : 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b s u m m a r y : " D e u k P a c k B M T 누 락 복 구 : R u s t 언 어 단 위 테 스 트 보 강 " c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 6 : 1 3 : 2 5 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - r u s t - t e s t - c o v e r a g e - - - # d e u k p a c k - b m t - l a n g u a g e - r u s t > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . 연 결 티 켓 : . d e u k - a g e n t / t i c k e t s / s u b / 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b . m d # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * R u s t B M T 문 서 / 테 스 트 근 거 레 이 어 의 항 목 정 의 , 상 태 분 류 , 완 료 기 준 문 서 화 - * * D e s i g n R a t i o n a l e : * * R u s t 항 목 의 S t r e a m i n g / E r r o r m o d e l 검 증 누 락 이 지 원 성 표 시 뒤 에 숨 지 않 도 록 지 원 성 / 구 현 성 / 검 증 성 을 분 리 한 다 . - * * C o n s t r a i n t s : * * 코 드 생 성 기 , R u s t 구 현 체 , 생 성 된 b e n c h m a r k / r e p o r t 산 출 물 은 본 티 켓 에 서 수 정 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : . d e u k - a g e n t / t i c k e t s / s u b / , l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / - F o r b i d d e n m o d u l e s : s c r i p t s / , t e m p l a t e s / , b i n / , b e n c h m a r k s / r e p o r t s / , d i s t / , g e n / - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 D C - C O D E G E N , A G E N T S 의 G 7 / G 8 생 성 물 · b a s e l i n e 가 드 # # # [ C O N T R A C T ] - I n p u t : 1 4 2 총 괄 큐 의 R u s t 우 선 처 리 항 목 과 1 3 3 B M T 설 계 문 서 의 상 태 분 리 규 칙 - O u t p u t : R u s t B M T 누 락 테 스 트 보 강 기 준 과 실 행 결 과 - S i d e e f f e c t s : R u s t 원 천 데 이 터 / 테 스 트 근 거 위 치 를 확 인 할 때 사 용 할 분 류 기 준 제 공 # # # [ P A T C H P L A N ] - R u s t S t r e a m i n g 항 목 을 지 원 성 / 구 현 성 / 검 증 성 으 로 분 리 - R u s t E r r o r m o d e l 항 목 을 독 립 f e a t u r e 로 유 지 - t e s t _ i d , l a s t _ v e r i f i e d , p a s s _ r a t e e v i d e n c e 필 수 필 드 를 완 료 기 준 으 로 고 정 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] R u s t S t r e a m i n g 항 목 분 리 - [ x ] R u s t E r r o r m o d e l 항 목 분 리 - [ x ] R u s t e v i d e n c e 필 드 정 렬 - [ x ] 완 료 기 준 고 정 # # E x e c u t i o n R e s u l t - R u s t S t r e a m i n g 은 독 립 보 강 항 목 으 로 고 정 . - R u s t E r r o r m o d e l 은 독 립 f e a t u r e 로 유 지 . - e v i d e n c e . t e s t _ i d , e v i d e n c e . l a s t _ v e r i f i e d , e v i d e n c e . p a s s _ r a t e 를 필 수 확 인 포 인 트 로 고 정 . - 근 거 없 는 R u s t 항 목 은 성 공 / i m p l e m e n t e d 로 승 격 하 지 않 고 미 검 증 또 는 대 기 로 분 류 . # # D o n e W h e n - R u s t 보 강 대 상 이 S t r e a m i n g , E r r o r m o d e l , e v i d e n c e 로 명 확 히 분 리 됨 - 검 증 근 거 가 없 는 항 목 이 i m p l e m e n t e d 또 는 성 공 표 시 로 오 인 되 지 않 음 - 코 드 / 생 성 물 변 경 없 이 문 서 기 준 의 실 행 범 위 가 확 정 됨 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 1 - d e u k p a c k - b m t - l a n g u a g e - r u s t - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 141 deukpack bmt language rust joy nucb report

# Report: DeukPack BMT Rust 누락 테스트 보강

## 검증 대상
- 티켓: `.deuk-agent/tickets/sub/141-deukpack-bmt-language-rust-joy-nucb.md`
- 계획: `merged into this ticket`
- 범위: Rust BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화

## 수행 결과
- Rust `Streaming`을 독립 보강 항목으로 고정했다.
- Rust `Error model`을 독립 feature로 유지했다.
- `evidence.test_id`, `evidence.last_verified`, `evidence.pass_rate`를 필수 확인 포인트로 고정했다.
- 근거 없는 Rust 항목은 성공/implemented로 승격하지 않고 `미검증` 또는 `대기`로 분류하도록 했다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/141-deukpack-bmt-language-rust-joy-nucb.md `merged into this ticket`

## 검증 결과
- `lint:md passed (2 files)`

## 발견 이슈
- Phase 전환 중 형제 BMT 언어 티켓 `136`, `137`, `138`, `140`에서 `parentTicket` frontmatter 중복 경고가 표시됐다.
- 해당 파일들은 Rust 티켓의 Target Module 밖이며, 본 티켓에서는 수정하지 않았다.
- 필요하면 별도 정리 티켓에서 중복 frontmatter를 수정한다.

## 결론
- Rust BMT 보강 기준은 문서 기준으로 검증 완료됐다.
- 코드 생성기, Rust 구현체, benchmark/report 산출물은 수정하지 않았다.

## Merged Legacy Document


### 141 deukpack bmt language rust joy nucb plan

# Plan: DeukPack BMT Rust 누락 테스트 보강

## 목표
- Rust 항목의 `Streaming`, `Error model`, 검증 근거(`evidence`) 누락을 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 Rust 하위 티켓에 적용한다.

## 범위
- 대상: Rust BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Rust 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-joy-nucb`, `133-dekpack-bmt-matrix-joy-nucb-plan`, `133-dekpack-bmt-matrix-joy-nucb-report`

## 실행 항목
1. [x] Rust Streaming 항목 분리
   - `support_level`은 기능 지원 가능성으로 기록
   - `implementation_state`는 실제 구현/부분구현/누락 상태로 기록
   - `evidence.test_id`가 없으면 `미검증`으로 분류
2. [x] Rust Error model 항목 분리
   - 오류 모델 일관성 항목을 독립 feature로 유지
   - 구현 상태와 테스트 통과 여부를 분리
   - 회귀 테스트 근거가 없으면 `대기`로 분류
3. [x] Rust evidence 필드 정렬
   - `test_id`, `last_verified`, `pass_rate`를 필수 근거 필드로 정의
   - 근거가 없는 항목은 지원성 표에서 성공 상태로 승격하지 않음
4. [x] 완료 기준 고정
   - Rust 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## 완료 기준
- Rust 보강 대상이 `Streaming`, `Error model`, `evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨

## 실행 결과
- `Streaming`은 Rust BMT의 독립 보강 항목으로 고정했다.
- `Error model`은 Rust BMT의 독립 feature로 유지하고, 구현 상태와 테스트 근거를 분리하도록 정의했다.
- `evidence`는 `test_id`, `last_verified`, `pass_rate` 3개 필드를 필수 확인 포인트로 고정했다.
- 실제 원천 데이터나 테스트 러너 위치가 확인되기 전까지 근거 없는 항목은 `미검증` 또는 `대기`로 분류한다.
