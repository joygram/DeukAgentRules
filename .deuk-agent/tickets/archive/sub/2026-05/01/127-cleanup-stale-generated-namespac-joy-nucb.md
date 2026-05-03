 - - - i d : 1 2 7 - c l e a n u p - s t a l e - g e n e r a t e d - n a m e s p a c - j o y - n u c b t i t l e : c l e a n u p - s t a l e - g e n e r a t e d - n a m e s p a c e p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k 네 임 스 페 이 스 생 성 전 환 뒤 남 은 이 상 한 g e n e r a t e d i m p o r t / 잔 존 물 을 계 획 에 포 함 해 정 리 한 다 . p r i o r i t y : m e d i u m t a g s : - d e u k p a c k - c o d e g e n - n a m e s p a c e - c l e a n u p c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 1 : 4 6 : 0 1 - - - # c l e a n u p - s t a l e - g e n e r a t e d - n a m e s p a c e > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / s r c / m c p / g e n e r a t e d / , / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / d e u k _ i d l / p y t h o n / - * * C o n t e x t F i l e s : * * / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / P R O J E C T _ R U L E . m d , / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / d e u k p a c k . p i p e l i n e . j s o n , D e u k P a c k t i c k e t 3 2 0 - p y t h o n - c o d e g e n - n a m e s p a c e - o u t p u t - * * D e s i g n R a t i o n a l e : * * D e u k P a c k I D L 네 임 스 페 이 스 전 환 후 런 타 임 i m p o r t 는 r a g , w o r k f l o w , m e t r i c s 만 남 아 야 한 다 . 예 전 s r c . m c p . g e n e r a t e d . d e u k _ a g e n t _ c o n t e x t 생 성 물 이 남 으 면 잘 못 된 네 임 스 페 이 스 를 계 속 정 답 처 럼 보 이 게 만 든 다 . - * * C o n s t r a i n t s : * * 생 성 파 일 내 용 직 접 수 정 금 지 . 삭 제 전 전 체 참 조 검 색 으 로 미 사 용 을 증 명 하 고 , 새 D e u k P a c k 생 성 경 로 와 s m o k e / t e s t 로 기 능 동 등 성 을 확 인 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / s r c / m c p / g e n e r a t e d / , 티 켓 / 계 획 문 서 - F o r b i d d e n m o d u l e s : D e u k P a c k g e n e r a t o r 로 직 , D e u k A g e n t C o n t e x t 보 호 파 일 ( s r c / m c p / s e r v e r . p y , . l o c a l / c o n f i g . y a m l , . l o c a l / i n g e s t . y a m l , s r c / r a g / l a n c e _ v e c t o r _ s t o r e . p y , s r c / i n f r a / g l o b a l _ w o r k e r . p y ) - R u l e c i t a t i o n : D e u k A g e n t C o n t e x t D C - C O D E G E N , D C - X R E F , D C - R E F A C T O R ; D e u k A g e n t R u l e s D C - C O D E G E N # # # [ C O N T R A C T ] - I n p u t : D e u k P a c k 3 2 0 수 정 으 로 생 성 된 d e u k _ i d l / p y t h o n / { r a g , w o r k f l o w , m e t r i c s } 패 키 지 와 현 재 i m p o r t 참 조 상 태 - O u t p u t : s r c . m c p . g e n e r a t e d . d e u k _ a g e n t _ c o n t e x t 잔 존 생 성 물 이 제 거 되 고 , 런 타 임 i m p o r t 가 n a m e s p a c e 단 위 패 키 지 만 사 용 함 - S i d e e f f e c t s : G i t d i f f 에 서 구 g e n e r a t e d 파 일 삭 제 가 발 생 한 다 . 새 생 성 물 은 n p x d e u k p a c k r u n 결 과 를 기 준 으 로 유 지 한 다 . # # # [ P A T C H P L A N ] - 전 체 참 조 검 색 으 로 s r c . m c p . g e n e r a t e d , d e u k _ a g e n t _ c o n t e x t , d e u k p a c k _ g e n e r a t e d 사 용 처 를 확 인 한 다 . - 참 조 가 없 는 구 g e n e r a t e d 패 키 지 s r c / m c p / g e n e r a t e d / d e u k _ a g e n t _ c o n t e x t / 와 구 g e n e r a t e d r u n t i m e s t u b s r c / m c p / g e n e r a t e d / d e u k _ p a c k / 를 삭 제 한 다 . - 필 요 시 빈 g e n e r a t e d 패 키 지 디 렉 터 리 를 정 리 하 되 , 새 d e u k _ i d l / p y t h o n / { r a g , w o r k f l o w , m e t r i c s } 생 성 물 은 보 존 한 다 . - D e u k P a c k r u n , s m o k e i m p o r t , a r c h i t e c t u r e g u a r d 테 스 트 로 새 경 로 가 정 상 임 을 확 인 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] 계 획 에 구 g e n e r a t e d 잔 존 물 정 리 를 명 시 한 다 . - [ x ] 삭 제 전 참 조 검 색 결 과 를 확 인 한 다 . - [ x ] s r c / m c p / g e n e r a t e d / 잔 존 생 성 물 을 삭 제 한 다 . - [ x ] D e u k A g e n t C o n t e x t s m o k e / t e s t 를 실 행 한 다 . # # D o n e W h e n > s r c . m c p . g e n e r a t e d 가 파 일 시 스 템 과 i m p o r t 참 조 에 서 사 라 지 고 , r a g , w o r k f l o w , m e t r i c s i m p o r t 기 반 s m o k e / t e s t 가 통 과 한 다 .

## Merged Legacy Document


### 127 cleanup stale generated namespac joy nucb plan

# 127 cleanup-stale-generated-namespace 계획

## 목표

DeukPack IDL 네임스페이스 전환 후 남은 `src.mcp.generated` 계열 생성물을 제거해, 런타임 import와 파일 구조가 `rag`, `workflow`, `metrics` 네임스페이스 단위만 드러내도록 정리한다.

## 범위

- 대상: `/home/joy/workspace/DeukAgentContext/src/mcp/generated/`
- 확인 대상: `/home/joy/workspace/DeukAgentContext/deuk_idl/python/{rag,workflow,metrics}/`
- 제외: DeukPack generator 로직, DeukAgentContext 보호 파일, `.local/config.yaml`, `.local/ingest.yaml`

## 실행 계획

- [x] `rg`로 `src.mcp.generated`, `deuk_agent_context`, `deukpack_generated` 참조를 확인한다.
- [x] 현재 실제 런타임 import가 `rag`, `workflow`, `metrics`인지 확인한다.
- [x] 참조가 없는 예전 generated 패키지 `src/mcp/generated/`를 삭제한다.
- [x] `npx deukpack run`으로 새 생성 경로가 유지되는지 확인한다.
- [x] smoke import로 `rag::RagResponse`, `workflow::WorkflowReport`, `metrics::TicketMetric` 스키마명을 확인한다.
- [x] `poetry run python -m pytest tests/test_architecture_guard.py -q`를 실행한다.

## 검증 기준

- `rg "src\.mcp\.generated|deuk_agent_context|deukpack_generated"` 결과에 런타임 코드 참조가 남지 않는다.
- `src/mcp/generated/`에 구 generated 파일이 남지 않는다.
- DeukAgentContext smoke/test가 통과한다.
