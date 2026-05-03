 - - - i d : 1 2 9 - s e r v i c e - c o l l e c t i o n - f i x - j o y - n u c b t i t l e : s e r v i c e - c o l l e c t i o n - f i x p h a s e : 4 s t a t u s : c l o s e d p r i o r i t y : h i g h t a g s : - s e r v i c e - t e l e m e t r y - m c p d o c s L a n g u a g e : k o s u m m a r y : 서 비 스 서 버 와 자 료 수 집 이 제 대 로 이 루 어 지 지 않 는 문 제 를 조 사 하 고 수 정 한 다 . c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 2 : 1 9 : 0 6 - - - # s e r v i c e - c o l l e c t i o n - f i x > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - t e l e m e t r y - c o m m a n d s . m j s , s c r i p t s / t e s t s / - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , d o c s / a r c h i t e c t u r e . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , p a c k a g e . j s o n - * * D e s i g n R a t i o n a l e : * * M C P / S S E 서 비 스 감 지 와 텔 레 메 트 리 자 료 수 집 / 동 기 화 실 패 가 티 켓 생 성 과 운 영 데 이 터 수 집 흐 름 을 불 안 정 하 게 만 든 다 . - * * C o n s t r a i n t s : * * 생 성 산 출 물 과 O S S 동 기 화 산 출 물 은 수 정 하 지 않 는 다 . 서 비 스 감 지 는 실 패 해 도 티 켓 생 성 자 체 를 막 지 않 아 야 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - t e l e m e t r y - c o m m a n d s . m j s , s c r i p t s / t e s t s / - F o r b i d d e n m o d u l e s : c o r e - r u l e s / , t e m p l a t e s / , o s s - p u b l i c / , b i n / d e u k - a g e n t - r u l e . j s , 생 성 / 동 기 화 산 출 물 - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d M o d u l e O w n e r s h i p , D C - C O D E G E N , D C - O S S # # # [ C O N T R A C T ] - I n p u t : M C P 설 정 파 일 ( . m c p . j s o n , . c u r s o r / m c p . j s o n , . v s c o d e / m c p . j s o n ) , . d e u k - a g e n t / c o n f i g . j s o n , . d e u k - a g e n t / t e l e m e t r y . j s o n l - O u t p u t : S S E / H T T P 서 비 스 활 성 여 부 를 안 정 적 으 로 감 지 하 고 , 텔 레 메 트 리 로 그 수 집 및 원 격 동 기 화 실 패 를 검 증 가 능 한 방 식 으 로 처 리 한 다 . - S i d e e f f e c t s : 로 컬 텔 레 메 트 리 파 일 에 로 그 가 추 가 되 거 나 , 원 격 동 기 화 성 공 시 s y n c e d 상 태 가 갱 신 된 다 . # # # [ P A T C H P L A N ] - i s M c p A c t i v e 의 S S E 감 지 를 H E A D 단 일 시 도 에 서 G E T / 스 트 리 밍 응 답 허 용 방 식 으 로 보 강 한 다 . - 텔 레 메 트 리 입 력 검 증 과 동 기 화 실 패 처 리 를 보 강 해 호 출 자 가 실 패 를 확 인 할 수 있 게 한 다 . - N o d e t e s t 로 S S E 감 지 , c o m m a n d 기 반 M C P 감 지 , 텔 레 메 트 리 수 집 / 동 기 화 동 작 을 검 증 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] M C P / S S E 서 비 스 감 지 실 패 경 로 재 현 및 수 정 - [ x ] 텔 레 메 트 리 자 료 수 집 / 동 기 화 실 패 처 리 보 강 - [ x ] 관 련 테 스 트 추 가 및 전 체 테 스 트 실 행 # # D o n e W h e n > n o d e - - t e s t s c r i p t s / t e s t s / 가 통 과 하 고 , M C P / S S E 감 지 와 텔 레 메 트 리 수 집 / 동 기 화 실 패 처 리 동 작 이 테 스 트 로 검 증 된 다 .

## Merged Legacy Document


### 129 service collection fix joy nucb plan

# 129-service-collection-fix-joy-nucb 계획

## 목표
서비스 서버 감지와 자료 수집이 실패하는 경로를 수정해 티켓 생성의 MCP 상태 확인과 텔레메트리 수집/동기화가 검증 가능하게 동작하도록 한다.

## 실행 범위
- `scripts/cli-utils.mjs`: MCP/SSE 서비스 감지 로직 보강
- `scripts/cli-telemetry-commands.mjs`: 텔레메트리 로그/동기화 처리 보강
- `scripts/tests/`: 회귀 테스트 추가

## 제외 범위
- `core-rules/`, `templates/`, `oss-public/`, `bin/deuk-agent-rule.js`
- 생성 산출물 재생성 및 OSS 동기화 실행

## 실행 단계
- [x] 현재 MCP/SSE 감지 실패 조건을 테스트로 고정한다.
- [x] `/sse` 엔드포인트가 `HEAD`를 지원하지 않아도 활성 서버로 판단할 수 있게 `isMcpActive`를 수정한다.
- [x] 텔레메트리 로그 수집 입력을 안정화하고, 원격 동기화 실패 시 실패 상태를 보존하며 호출자가 실패를 볼 수 있게 수정한다.
- [x] 관련 단위 테스트를 추가한다.
- [x] `node --test scripts/tests/`와 `npx deuk-agent-rule lint:md`를 실행한다.

## 검증 기준
- SSE 서버가 `GET` 스트림 또는 405/404가 아닌 성공 계열 응답을 반환하면 MCP 활성으로 판단한다.
- MCP command 설정은 기존처럼 활성으로 판단한다.
- 텔레메트리 로그 파일은 유효한 JSONL로 유지된다.
- 원격 동기화 실패 시 미동기 항목은 `synced: false`로 남는다.
