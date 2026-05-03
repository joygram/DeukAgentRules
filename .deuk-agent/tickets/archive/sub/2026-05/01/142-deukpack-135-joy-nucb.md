 - - - i d : 1 4 2 - d e u k p a c k - 1 3 5 - j o y - n u c b t i t l e : D e u k P a c k 1 3 5 p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o p a r e n t T i c k e t : 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b s u m m a r y : D e u k P a c k 1 3 5 누 락 테 스 트 보 강 본 작 업 ( 총 괄 조 정 ) c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 6 : 1 7 : 2 9 p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - t e s t - c o v e r a g e - t i c k e t - 1 3 5 - - - # D e u k P a c k 1 3 5 > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * . d e u k - a g e n t / d o c s / ( 보 고 서 · 계 획 · 티 켓 추 적 레 이 어 ) . 코 드 생 성 기 , C L I 핵 심 구 현 , 생 성 물 재 생 성 산 출 물 은 1 4 2 의 직 접 수 정 범 위 에 서 제 외 . - * * C o n t e x t F i l e s : * * . d e u k - a g e n t / t i c k e t s / s u b / 1 3 5 - d e u k p a c k - b m t - m i s s i n g - t e s t s - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 4 1 - d e u k p a c k - b m t - l a n g u a g e - r u s t - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 9 - d e u k p a c k - b m t - l a n g u a g e - j a v a - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 4 0 - d e u k p a c k - b m t - l a n g u a g e - g o - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 7 - d e u k p a c k - b m t - l a n g u a g e - p y t h o n - j o y - n u c b . m d , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 8 - d e u k p a c k - b m t - l a n g u a g e - j a v a s c r i p t - j o y - n u c b . m d , l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / * d e u k p a c k * - * * D e s i g n R a t i o n a l e : * * 상 위 티 켓 에 서 언 급 된 누 락 테 스 트 대 응 을 실 제 실 행 가 능 작 업 으 로 정 렬 하 고 , 언 어 별 하 위 티 켓 과 문 서 레 이 어 의 충 돌 을 제 거 하 기 위 함 . - * * C o n s t r a i n t s : * * p h a s e 2 실 행 은 총 괄 정 렬 과 하 위 티 켓 분 기 문 서 화 로 제 한 . 실 행 코 드 는 본 티 켓 단 계 에 서 작 성 하 지 않 음 . 변 경 은 하 위 실 행 티 켓 으 로 위 임 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : . d e u k - a g e n t / t i c k e t s / s u b / , l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / - F o r b i d d e n m o d u l e s : s c r i p t s / , t e m p l a t e s / , b i n / , b e n c h m a r k s / r e p o r t s / ( 재 생 성 산 출 물 ) , d i s t / , g e n / - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 D C - C O D E G E N , D C - O S S 및 A G E N T S 의 코 드 생 성 / 범 위 가 드 # # # [ C O N T R A C T ] - I n p u t : 상 위 / 하 위 티 켓 및 B M T 관 련 p l a n / w a l k t h r o u g h 의 현 재 상 태 - O u t p u t : 1 4 2 티 켓 기 준 누 락 테 스 트 보 강 본 작 업 의 범 위 와 분 기 계 획 확 정 - S i d e e f f e c t s : 하 위 티 켓 진 행 우 선 순 위 정 렬 과 다 음 실 행 티 켓 의 적 용 범 위 명 확 화 # # # [ P A T C H P L A N ] - 상 위 및 기 존 하 위 티 켓 상 태 점 검 - 공 통 누 락 항 목 과 언 어 별 누 락 항 목 을 분 리 - 하 위 티 켓 별 보 강 항 목 을 실 행 단 계 에 서 바 로 반 영 가 능 한 형 태 로 정 렬 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 범 위 정 렬 문 서 화 완 료 - [ x ] 공 통 누 락 항 목 분 류 - [ x ] 하 위 티 켓 별 보 강 우 선 순 위 정 리 - [ x ] 실 행 단 계 진 입 조 건 충 족 ( 계 획 기 반 승 인 ) # # E x e c u t i o n Q u e u e | 순 서 | 티 켓 | 언 어 | 우 선 처 리 항 목 | 상 태 | | - - - | - - - | - - - | - - - | - - - | | 1 | 1 4 1 - d e u k p a c k - b m t - l a n g u a g e - r u s t - j o y - n u c b | R u s t | S t r e a m i n g , E r r o r m o d e l , e v i d e n c e 필 드 정 렬 | c o m p l e t e d | | 2 | 1 3 9 - d e u k p a c k - b m t - l a n g u a g e - j a v a - j o y - n u c b | J a v a | S c h e m a e v o l u t i o n , B a c k w a r d / F o r w a r d c o m p a t i b i l i t y , t o o l i n g e v i d e n c e | c o m p l e t e d | | 3 | 1 4 0 - d e u k p a c k - b m t - l a n g u a g e - g o - j o y - n u c b | G o | S t r e a m i n g , E r r o r m o d e l , c o m p a t i b i l i t y e v i d e n c e | r e a d y | | 4 | 1 3 8 - d e u k p a c k - b m t - l a n g u a g e - j a v a s c r i p t - j o y - n u c b | J a v a S c r i p t / T y p e S c r i p t | T o o l i n g / c o d e g e n m a t u r i t y , s c h e m a c o m p a t i b i l i t y , v e r i f i c a t i o n m e t a d a t a | r e a d y | | 5 | 1 3 7 - d e u k p a c k - b m t - l a n g u a g e - p y t h o n - j o y - n u c b | P y t h o n | C o m p r e s s i o n / t r a n s p o r t , b a c k w a r d c o m p a t i b i l i t y , p a s s - r a t e e v i d e n c e | r e a d y | | 6 | 1 3 6 - d e u k p a c k - b m t - l a n g u a g e - k o r e a n - j o y - n u c b | K o t l i n | C o m p r e s s i o n 회 귀 불 일 치 , s t r e a m i n g 검 증 누 락 , e v i d e n c e 보 강 | r e a d y | # # C o m m o n M i s s i n g - T e s t C o n t r a c t - s u p p o r t _ l e v e l 과 i m p l e m e n t a t i o n _ s t a t e 는 같 은 표 셀 에 서 합 쳐 표 시 하 지 않 는 다 . - t e s t _ i d , l a s t _ v e r i f i e d , p a s s _ r a t e 가 없 으 면 미 검 증 또 는 대 기 로 분 류 한 다 . - 공 식 경 쟁 군 / b a s e l i n e 승 격 은 본 티 켓 에 서 처 리 하 지 않 는 다 . - 생 성 산 출 물 재 생 성 은 사 용 자 명 시 승 인 전 까 지 실 행 하 지 않 는 다 . # # C o o r d i n a t i o n R e s u l t - B M T m a t r i x 역 할 분 리 티 켓 1 3 3 - d e k p a c k - b m t - m a t r i x - j o y - n u c b 완 료 및 a r c h i v e 확 인 . - R u s t 하 위 티 켓 1 4 1 - d e u k p a c k - b m t - l a n g u a g e - r u s t - j o y - n u c b 완 료 및 a r c h i v e 확 인 . - J a v a 하 위 티 켓 1 3 9 - d e u k p a c k - b m t - l a n g u a g e - j a v a - j o y - n u c b 완 료 및 a r c h i v e 확 인 . - 남 은 실 행 큐 는 G o , J a v a S c r i p t / T y p e S c r i p t , P y t h o n , K o t l i n 순 서 로 유 지 한 다 . - M C P s e t _ w o r k f l o w _ c o n t e x t 는 t r a n s p o r t 복 구 중 이 라 본 정 리 단 계 에 서 는 C L I / 로 컬 티 켓 기 준 으 로 만 진 행 했 다 . # # D o n e W h e n - 본 티 켓 이 실 행 가 능 한 총 괄 p l a n 을 보 유 하 고 , 하 위 티 켓 별 누 락 보 강 대 상 이 역 할 / 범 위 를 초 과 하 지 않 음 이 확 인 됨 . - 다 음 실 행 대 상 은 1 4 0 - d e u k p a c k - b m t - l a n g u a g e - g o - j o y - n u c b . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 4 2 - d e u k p a c k - 1 3 5 - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 142 deukpack 135 joy nucb plan

# Plan: DeukPack 135 누락 테스트 보강 본 작업

## 목표
- `DeukPack 135`의 누락 테스트 보강 과제를 실행 가능한 단위로 분해
- 기존 하위 언어 티켓(141~140 계열)이 커버하지 못하는 공통 결손(문서 기준/리포트 기준) 항목을 선별
- 각 하위 티켓의 적용 대상과 완료 기준을 명문화해 실행 단계에서 충돌 없이 진행

## 범위
- 대상 모듈: `merged ticket body` 하위 문서/리포트/트래킹(테스트 소스가 아닌 실행 계획/트리거 아티팩트)
- 대상 모듈이 아님: 실제 코드 생성기(`scripts/`), CLI 바이너리 구현, 배포 산출물 재생성(사용자 승인 없는 재생성 금지)
- 참고 소스: `135-deukpack-bmt-missing-tests-joy-nucb` 상위 티켓, `141~140` 언어 하위 티켓, 관련 Walkthrough/Plan 문서

## 실행 항목
1. [x] 상위/하위 티켓 정렬
   - `.deuk-agent/tickets/sub/135-deukpack-bmt-missing-tests-joy-nucb.md`를 루트로 지정하고, 141~140의 언어 하위 티켓 상태를 확인
   - 본 142 티켓을 언어별 실무 보강의 총괄 진행표로 등록
2. [x] 공통 결손 항목 추출
   - `merged into this ticket`
   - `merged into this ticket`
   - `merged into this ticket`
   에서 `테스트 누락`으로 표현된 항목과 실제 실행 문서에서 미반영된 항목 매칭
3. [x] 누락 보강 대상 정합성 규칙 정의
   - “보고서/프로토콜/테스트 매트릭스” 역할 분리 규칙을 기준으로 누락 상태를 분류
   - 분류 결과를 `실행 대상`, `대기`, `범위외` 3분류로 구분
4. [x] 하위 티켓 보강 계획 생성
   - 언어별 티켓(141~140)에서 누락된 항목을 선별해 각 티켓별 `Tasks`를 한 번에 1개 이상의 실제 변경 항목으로 정의
   - 누락이 문서 조정형인지 테스트 항목 확장형인지 유형별로 기록
5. [x] 종료 기준 정리
   - 142 티켓에서 각 하위 티켓 진행 상태를 실시간 반영 가능한 체크리스트로 전환
   - 다음 실행 티켓으로 넘어갈 때 적용 범위가 모호하지 않도록 `Target`과 `Out-of-scope`를 고정

## 실행 기준
- 공통 결손: `support_level`, `implementation_state`, `evidence.test_id`, `evidence.last_verified`, `evidence.pass_rate`가 같은 항목 단위에서 분리되어야 한다.
- 실행 대상: 언어별 구현 완성도 표와 테스트 신뢰도 표에 들어갈 수 있는 항목.
- 대기: 실제 BMT 원천 데이터나 테스트 러너 위치가 아직 확인되지 않은 항목.
- 범위외: 공식 경쟁군/baseline 승격, 생성 산출물 재생성, CLI/코드 생성기 구조 변경.

## 하위 티켓 실행 순서

| 순서 | 티켓 | 언어 | 우선 처리 항목 | 상태 |
|---|---|---|---|---|
| 1 | `141-deukpack-bmt-language-rust-joy-nucb` | Rust | Streaming, Error model, evidence 필드 정렬 | completed |
| 2 | `139-deukpack-bmt-language-java-joy-nucb` | Java | Schema evolution, Backward/Forward compatibility, tooling evidence | completed |
| 3 | `140-deukpack-bmt-language-go-joy-nucb` | Go | Streaming, Error model, compatibility evidence | ready |
| 4 | `138-deukpack-bmt-language-javascript-joy-nucb` | JavaScript/TypeScript | Tooling/codegen maturity, schema compatibility, verification metadata | ready |
| 5 | `137-deukpack-bmt-language-python-joy-nucb` | Python | Compression/transport, backward compatibility, pass-rate evidence | ready |
| 6 | `136-deukpack-bmt-language-korean-joy-nucb` | Kotlin | Compression 회귀 불일치, streaming 검증 누락, evidence 보강 | ready |

## 하위 티켓 공통 작업 템플릿
- `Target`은 해당 언어의 BMT 문서/테스트 근거 레이어로 제한한다.
- `Tasks`는 최소 3개로 고정한다: 상태 분리, evidence 보강, 완료 기준 문서화.
- `Done When`은 지원성/구현성/검증성이 한 셀에서 섞이지 않는 상태로 정의한다.

## 완료 기준
- 본 티켓 계획이 실행 가능하고 비공란인 항목으로 정리되어 있음
- 누락 테스트 보강 본문이 상위 티켓-하위 티켓 구조에서 중복 또는 누락 없이 정렬됨
- 다음 실행 단계에서 수정 범위가 언어별 티켓 또는 문서 역할 분리 규칙으로 명확히 전달됨

## 총괄 정리 결과
- BMT matrix 역할 분리 티켓 `133-dekpack-bmt-matrix-joy-nucb`는 완료 및 archive 처리됨.
- Rust 하위 티켓 `141-deukpack-bmt-language-rust-joy-nucb`는 완료 및 archive 처리됨.
- Java 하위 티켓 `139-deukpack-bmt-language-java-joy-nucb`는 완료 및 archive 처리됨.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`로 고정한다.
- MCP transport 복구 중에는 `set_workflow_context` 없이 CLI/로컬 티켓 기준으로만 정리한다.

## Merged Legacy Document


### 142 deukpack 135 joy nucb report

# Report: DeukPack 135 누락 테스트 보강 총괄

## 검증 대상
- 티켓: `.deuk-agent/tickets/sub/142-deukpack-135-joy-nucb.md`
- 계획: `merged into this ticket`
- 상위 티켓: `.deuk-agent/tickets/sub/135-deukpack-bmt-missing-tests-joy-nucb.md`

## 수행 결과
- BMT matrix 역할 분리 티켓 `133-dekpack-bmt-matrix-joy-nucb` 완료 상태를 총괄 큐에 반영했다.
- Rust 하위 티켓 `141-deukpack-bmt-language-rust-joy-nucb` 완료 상태를 총괄 큐에 반영했다.
- Java 하위 티켓 `139-deukpack-bmt-language-java-joy-nucb` 완료 상태를 총괄 큐에 반영했다.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`로 고정했다.

## 남은 실행 큐

| 순서 | 티켓 | 언어 | 우선 처리 항목 | 상태 |
|---|---|---|---|---|
| 1 | `140-deukpack-bmt-language-go-joy-nucb` | Go | Streaming, Error model, compatibility evidence | ready |
| 2 | `138-deukpack-bmt-language-javascript-joy-nucb` | JavaScript/TypeScript | Tooling/codegen maturity, schema compatibility, verification metadata | ready |
| 3 | `137-deukpack-bmt-language-python-joy-nucb` | Python | Compression/transport, backward compatibility, pass-rate evidence | ready |
| 4 | `136-deukpack-bmt-language-korean-joy-nucb` | Kotlin | Compression 회귀 불일치, streaming 검증 누락, evidence 보강 | ready |

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/142-deukpack-135-joy-nucb.md `merged into this ticket`

## 검증 결과
- `lint:md passed (2 files)`

## 발견 이슈
- MCP `set_workflow_context`는 transport 복구 중이라 본 정리 단계에서는 CLI/로컬 티켓 기준으로만 진행했다.
- Phase 전환 중 남은 하위 티켓 `136`, `137`, `138`, `140`에서 `parentTicket` frontmatter 중복 경고가 표시됐다.
- 해당 중복 경고는 각 하위 티켓 진행 전 정리하거나, 별도 frontmatter cleanup 티켓에서 처리한다.

## 결론
- DeukPack 135 총괄 큐는 완료/잔여 상태를 반영했고, 다음 실행 대상은 Go 하위 티켓으로 확정됐다.
- 코드 생성기, benchmark/report 산출물, 공식 baseline은 수정하지 않았다.
