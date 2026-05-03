 - - - i d : 1 3 9 - d e u k p a c k - b m t - l a n g u a g e - j a v a - j o y - n u c b t i t l e : d e u k p a c k - b m t - l a n g u a g e - j a v a p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o p a r e n t T i c k e t : 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b s u m m a r y : " D e u k P a c k B M T 누 락 복 구 : J a v a 언 어 단 위 테 스 트 보 강 " c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 6 : 1 3 : 2 1 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - j a v a - t e s t - c o v e r a g e - - - # d e u k p a c k - b m t - l a n g u a g e - j a v a > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . 연 결 티 켓 : . d e u k - a g e n t / t i c k e t s / s u b / 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b . m d # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * J a v a B M T 문 서 / 테 스 트 근 거 레 이 어 의 항 목 정 의 , 상 태 분 류 , 완 료 기 준 문 서 화 - * * D e s i g n R a t i o n a l e : * * J a v a 항 목 의 s c h e m a e v o l u t i o n , c o m p a t i b i l i t y , t o o l i n g e v i d e n c e 누 락 이 지 원 성 표 시 뒤 에 숨 지 않 도 록 지 원 성 / 구 현 성 / 검 증 성 을 분 리 한 다 . - * * C o n s t r a i n t s : * * 코 드 생 성 기 , J a v a 구 현 체 , 생 성 된 b e n c h m a r k / r e p o r t 산 출 물 은 본 티 켓 P h a s e 1 에 서 수 정 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : . d e u k - a g e n t / t i c k e t s / s u b / , l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / - F o r b i d d e n m o d u l e s : s c r i p t s / , t e m p l a t e s / , b i n / , b e n c h m a r k s / r e p o r t s / , d i s t / , g e n / - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 D C - C O D E G E N , A G E N T S 의 G 7 / G 8 생 성 물 · b a s e l i n e 가 드 # # # [ C O N T R A C T ] - I n p u t : 1 4 2 총 괄 큐 의 J a v a 우 선 처 리 항 목 과 1 3 3 B M T 설 계 문 서 의 상 태 분 리 규 칙 - O u t p u t : J a v a B M T 누 락 테 스 트 보 강 계 획 과 실 행 전 완 료 기 준 - S i d e e f f e c t s : 다 음 P h a s e 2 에 서 J a v a 원 천 데 이 터 / 테 스 트 근 거 위 치 를 확 인 할 때 사 용 할 분 류 기 준 제 공 # # # [ P A T C H P L A N ] - J a v a S c h e m a e v o l u t i o n 항 목 을 지 원 성 / 구 현 성 / 검 증 성 으 로 분 리 - J a v a B a c k w a r d / F o r w a r d c o m p a t i b i l i t y 항 목 을 독 립 검 증 항 목 으 로 유 지 - I D L l i n t , c o d e g e n , p l u g i n 관 련 e v i d e n c e 필 드 를 완 료 기 준 으 로 고 정 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] J a v a S c h e m a e v o l u t i o n 항 목 분 리 - [ x ] J a v a B a c k w a r d / F o r w a r d c o m p a t i b i l i t y 항 목 분 리 - [ x ] J a v a t o o l i n g e v i d e n c e 필 드 정 렬 - [ x ] 완 료 기 준 고 정 # # J a v a B M T E x e c u t i o n C r i t e r i a # # # S c h e m a e v o l u t i o n - s u p p o r t _ l e v e l : J a v a D S L / I D L 레 이 어 가 s c h e m a e v o l u t i o n 개 념 을 어 느 수 준 까 지 지 원 하 는 지 기 록 한 다 . - i m p l e m e n t a t i o n _ s t a t e : o p t i o n a l f i e l d 추 가 , 필 드 r e n a m e , 타 입 변 경 , d e f a u l t v a l u e 처 리 등 실 제 구 현 가 능 한 변 경 유 형 을 별 도 기 록 한 다 . - e v i d e n c e : s c h e m a e v o l u t i o n 회 귀 테 스 트 , f i x t u r e , 또 는 명 시 적 미 지 원 근 거 가 없 으 면 성 공 상 태 로 승 격 하 지 않 는 다 . - C o m p l e t i o n r u l e : 지 원 가 능 성 과 구 현 완 료 여 부 를 같 은 값 으 로 병 합 하 지 않 는 다 . # # # B a c k w a r d c o m p a t i b i l i t y - s u p p o r t _ l e v e l : 이 전 s c h e m a 로 생 성 된 p a y l o a d / f i x t u r e 를 새 J a v a b i n d i n g 에 서 읽 는 시 나 리 오 를 대 상 으 로 한 다 . - i m p l e m e n t a t i o n _ s t a t e : 호 환 r e a d e r , f a l l b a c k / d e f a u l t 처 리 , u n k n o w n f i e l d 처 리 중 실 제 구 현 된 범 위 를 기 록 한 다 . - e v i d e n c e : b a c k w a r d f i x t u r e 테 스 트 또 는 동 일 목 적 의 자 동 화 테 스 트 I D 를 요 구 한 다 . - C o m p l e t i o n r u l e : 테 스 트 근 거 가 없 으 면 p e n d i n g _ e v i d e n c e 로 유 지 한 다 . # # # F o r w a r d c o m p a t i b i l i t y - s u p p o r t _ l e v e l : 새 s c h e m a 로 생 성 된 p a y l o a d / f i x t u r e 를 이 전 J a v a b i n d i n g 또 는 제 한 된 r e a d e r 가 처 리 하 는 시 나 리 오 를 대 상 으 로 한 다 . - i m p l e m e n t a t i o n _ s t a t e : u n k n o w n f i e l d 보 존 / 무 시 , v e r s i o n g a t e , g r a c e f u l d e g r a d a t i o n 처 리 중 실 제 구 현 된 범 위 를 기 록 한 다 . - e v i d e n c e : f o r w a r d f i x t u r e 테 스 트 또 는 호 환 성 실 패 를 명 시 하 는 문 서 화 된 근 거 를 요 구 한 다 . - C o m p l e t i o n r u l e : b a c k w a r d 결 과 를 f o r w a r d 결 과 로 재 사 용 하 지 않 는 다 . # # # T o o l i n g e v i d e n c e - R e q u i r e d e v i d e n c e f i e l d s : t e s t _ i d , l a s t _ v e r i f i e d , p a s s _ r a t e , s o u r c e _ p a t h . - I D L l i n t : J a v a 대 상 I D L v a l i d a t i o n 또 는 s c h e m a l i n t 결 과 를 연 결 한 다 . - C o d e g e n : J a v a c o d e g e n s m o k e / u n i t t e s t 또 는 생 성 실 패 근 거 를 연 결 한 다 . - P l u g i n : J a v a p l u g i n p a c k a g i n g / l o a d e r / r e g i s t r a t i o n 근 거 를 연 결 한 다 . - C o m p l e t i o n r u l e : e v i d e n c e 필 드 가 비 어 있 으 면 i m p l e m e n t e d 나 p a s s i n g 으 로 표 시 하 지 않 는 다 . # # D o n e W h e n - J a v a 보 강 대 상 이 S c h e m a e v o l u t i o n , B a c k w a r d / F o r w a r d c o m p a t i b i l i t y , t o o l i n g e v i d e n c e 로 명 확 히 분 리 됨 - 검 증 근 거 가 없 는 항 목 이 i m p l e m e n t e d 또 는 성 공 표 시 로 오 인 되 지 않 음 - 코 드 / 생 성 물 변 경 없 이 문 서 기 준 의 실 행 범 위 가 확 정 됨 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 9 - d e u k p a c k - b m t - l a n g u a g e - j a v a - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 139 deukpack bmt language java joy nucb plan

# Plan: DeukPack BMT Java 누락 테스트 보강

## 목표
- Java 항목의 `Schema evolution`, `Backward compatibility`, `Forward compatibility`, `tooling evidence`를 분리해 추적한다.
- 지원성(`support_level`), 구현성(`implementation_state`), 검증성(`evidence`)이 같은 표 셀에서 섞이지 않도록 한다.
- 상위 142 티켓의 공통 누락 계약을 Java 하위 티켓에 적용한다.

## 범위
- 대상: Java BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화
- 비대상: Java 코드 생성기 구현 변경, benchmark/report 산출물 재생성, 공식 경쟁군 baseline 승격
- 참고: `142-deukpack-135-joy-nucb`, `133-dekpack-bmt-matrix-joy-nucb-plan`, `133-dekpack-bmt-matrix-joy-nucb-report`

## 실행 항목
1. [x] Java Schema evolution 항목 분리
   - 스키마 변경 허용 범위는 `support_level`로 기록
   - 실제 호환 구현 상태는 `implementation_state`로 기록
   - 테스트 근거가 없으면 성공 상태로 승격하지 않음
   - 완료 기준: optional field, rename, type change, default value 처리 범위를 지원성/구현성/검증성으로 분리
2. [x] Java Backward/Forward compatibility 항목 분리
   - backward와 forward를 각각 독립 검증 항목으로 유지
   - compatibility 결과는 pass/fail이 아니라 근거 포함 상태로 분류
   - 회귀 테스트 근거가 없으면 `대기`로 분류
   - 완료 기준: backward fixture와 forward fixture를 서로 대체하지 않고 각각 독립 evidence를 요구
3. [x] Java tooling evidence 필드 정렬
   - IDL lint, codegen, plugin 성숙도 근거를 `evidence` 필드로 분리
   - `test_id`, `last_verified`, `pass_rate`를 필수 확인 포인트로 정의
   - 완료 기준: `test_id`, `last_verified`, `pass_rate`, `source_path`가 비어 있으면 성공 상태로 승격 금지
4. [x] 완료 기준 고정
   - Java 항목은 지원성/구현성/검증성 3층으로 표시 가능해야 함
   - 다음 실행 단계에서 실제 원천 파일 또는 데이터 모델 위치가 확인되면 같은 분류를 그대로 적용

## Phase 2 결과
- Java `Schema evolution`은 지원 가능성(`support_level`), 실제 구현 상태(`implementation_state`), 검증 근거(`evidence`)를 분리해 판단한다.
- `Backward compatibility`와 `Forward compatibility`는 독립 항목으로 유지하며, 한쪽 fixture나 테스트 결과를 다른 쪽의 근거로 재사용하지 않는다.
- Java tooling evidence는 IDL lint, codegen, plugin 근거를 한 셀에 합치지 않고 `test_id`, `last_verified`, `pass_rate`, `source_path`로 정렬한다.
- 검증 근거가 없는 항목은 `implemented`, `passing`, 성공 표시로 승격하지 않고 `pending_evidence`로 남긴다.

## 완료 기준
- Java 보강 대상이 `Schema evolution`, `Backward/Forward compatibility`, `tooling evidence`로 명확히 분리됨
- 검증 근거가 없는 항목이 `implemented` 또는 성공 표시로 오인되지 않음
- 코드/생성물 변경 없이 문서 기준의 실행 범위가 확정됨

## Merged Legacy Document


### 139 deukpack bmt language java joy nucb report

# Report: DeukPack BMT Java 누락 테스트 보강

## 검증 대상
- 티켓: `.deuk-agent/tickets/sub/139-deukpack-bmt-language-java-joy-nucb.md`
- 계획: `merged into this ticket`
- 범위: Java BMT 문서/테스트 근거 레이어의 항목 정의, 상태 분류, 완료 기준 문서화

## 수행 결과
- Java `Schema evolution` 기준을 `support_level`, `implementation_state`, `evidence`로 분리했다.
- `Backward compatibility`와 `Forward compatibility`를 독립 검증 항목으로 유지했다.
- Java tooling evidence 필드를 `test_id`, `last_verified`, `pass_rate`, `source_path` 기준으로 정렬했다.
- 검증 근거가 없는 항목은 `implemented`, `passing`, 성공 표시로 승격하지 않고 `pending_evidence`로 남기도록 완료 기준을 고정했다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/139-deukpack-bmt-language-java-joy-nucb.md `merged into this ticket`

## 검증 결과
- `lint:md passed (2 files)`

## 발견 이슈
- Phase 3 전환 중 형제 티켓 `136`, `137`, `138`, `140`에서 `parentTicket` frontmatter 중복 경고가 표시됐다.
- 해당 파일들은 Java 티켓의 Target Module 밖이며, 본 티켓에서는 수정하지 않았다.
- 필요하면 별도 정리 티켓에서 중복 frontmatter를 수정한다.

## 결론
- Java BMT 보강 기준은 문서 기준으로 검증 완료됐다.
- 생성물, 코드 생성기, benchmark/report 산출물은 수정하지 않았다.
