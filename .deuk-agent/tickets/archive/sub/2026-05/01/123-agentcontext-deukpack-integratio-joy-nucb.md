 - - - i d : 1 2 3 - a g e n t c o n t e x t - d e u k p a c k - i n t e g r a t i o - j o y - n u c b t i t l e : a g e n t c o n t e x t - d e u k p a c k - i n t e g r a t i o n - r e v i e w p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : A g e n t C o n t e x t D e u k P a c k i n i t / s r c i n s t a l l / D p J s o n s c h e m a i n t e g r a t i o n r e v i e w c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 0 : 0 4 : 3 9 p r i o r i t y : P 2 t a g s : - r e v i e w - d e u k p a c k - a g e n t c o n t e x t - i n t e g r a t i o n - - - # a g e n t c o n t e x t - d e u k p a c k - i n t e g r a t i o n - r e v i e w > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * D e s i g n R a t i o n a l e : * * D e u k A g e n t C o n t e x t 와 D e u k P a c k 의 i n i t / s r c i n s t a l l / D p J s o n s c h e m a 연 결 점 을 실 행 전 에 매 핑 해 , 후 속 통 합 작 업 이 생 성 물 직 접 수 정 이 나 b r o a d r e g e n e r a t i o n 으 로 흐 르 지 않 게 한 다 . - * * C o n s t r a i n t s : * * 검 토 / 계 획 전 용 . D e u k A g e n t C o n t e x t , D e u k P a c k , D e u k A g e n t R u l e s 제 품 코 드 와 g e n e r a t e d o u t p u t s 는 수 정 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - F o r b i d d e n m o d u l e s : / h o m e / j o y / w o r k s p a c e / D e u k A g e n t C o n t e x t / * * , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / * * , s c r i p t s / , t e m p l a t e s / , c o r e - r u l e s / A G E N T S . m d , g e n e r a t e d o u t p u t s , b e n c h m a r k / r e p o r t g e n e r a t e d a r t i f a c t s . - R u l e c i t a t i o n : D C - C O D E G E N g e n e r a t e d s u r f a c e s m u s t b e c h a n g e d t h r o u g h s o u r c e / g e n e r a t o r o n l y ; G 6 r e v i e w m o d e f o r b i d s p r o d u c t e d i t s u n t i l f i n d i n g s a r e a p p r o v e d . # # # [ C O N T R A C T ] - I n p u t : D e u k A g e n t C o n t e x t D e u k P a c k p i p e l i n e / p a c k a g e / d e v - l i n k f i l e s , D e u k P a c k p a c k a g e s c r i p t s , r e l a t e d 1 2 4 i n t e g r a t i o n p l a n . - O u t p u t : A r e v i e w p l a n m a p p i n g i n t e g r a t i o n s u r f a c e s , r i s k s , v e r i f i c a t i o n c o m m a n d s , a n d h a n d o f f b o u n d a r y f o r t h e f o l l o w - u p e x e c u t i o n t i c k e t . - S i d e e f f e c t s : T i c k e t / p l a n / r e p o r t m a r k d o w n o n l y . N o c o d e e x e c u t i o n t h a t i n s t a l l s p a c k a g e s , r u n s c o d e g e n , b u i l d s , o r r e g e n e r a t e s a r t i f a c t s . # # # [ P A T C H P L A N ] - F i l l t h i s t i c k e t w i t h c o n c r e t e r e v i e w s c o p e a n d c o n s t r a i n t s . - C r e a t e t h e m i s s i n g p l a n f i l e w i t h i n t e g r a t i o n s u r f a c e i n v e n t o r y a n d f o l l o w - u p e x e c u t i o n c r i t e r i a . - R u n m a r k d o w n l i n t o n t h e t i c k e t a n d p l a n . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] I n s p e c t l o c a l / R A G c o n t e x t f o r A g e n t C o n t e x t - D e u k P a c k i n t e g r a t i o n r e f e r e n c e s . - [ x ] C r e a t e c o n c r e t e r e v i e w p l a n a n d A P C . - [ x ] R u n m a r k d o w n l i n t f o r t i c k e t a n d p l a n . - [ x ] W r i t e r e v i e w r e p o r t a n d h a n d o f f t o f o l l o w - u p e x e c u t i o n t i c k e t . # # D o n e W h e n T h e t i c k e t a n d p l a n d e s c r i b e t h e i n t e g r a t i o n r e v i e w b o u n d a r y , i d e n t i f y t h e c o n c r e t e D e u k A g e n t C o n t e x t / D e u k P a c k f i l e s t o i n s p e c t i n a f o l l o w - u p , a n d p a s s m a r k d o w n l i n t w i t h o u t m o d i f y i n g p r o d u c t c o d e o r g e n e r a t e d a r t i f a c t s . # # V e r i f i c a t i o n # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 2 3 - a g e n t c o n t e x t - d e u k p a c k - i n t e g r a t i o - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 123 agentcontext deukpack integratio joy nucb plan

# AgentContext-DeukPack 통합 리뷰 계획

## 목표

DeukAgentContext가 DeukPack을 `src` 모드로 설치하고 DpJson/schema/codegen 경로를 사용하는 구조를 실행 전에 검토한다. 이 티켓은 리뷰 계획과 경계 설정까지만 다루며, 실제 설치/build/codegen은 후속 실행 티켓에서 승인 후 수행한다.

## 확인된 연결점

- `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`
  - `outputDir`: `deuk_idl`
  - `python`: enabled
  - `core`: `rust-wrap`
  - `includePaths`: `deuk_idl`
- `/home/joy/workspace/DeukAgentContext/package.json`
  - `devDependencies.deukpack`: `file:../DeukPack`
  - `scripts.deukpack:dev-link`: `bash scripts/deukpack_dev_link.sh`
  - `scripts.deukpack:release-guard`: `node scripts/check_release_deukpack.js`
- `/home/joy/workspace/DeukAgentContext/scripts/deukpack_dev_link.sh`
  - sibling DeukPack package를 npm install로 연결
  - Poetry 환경 동기화
  - `maturin develop`으로 `rust-wrap` native extension 빌드 시도
  - `node_modules/deukpack` symlink와 `deukpack_core` import 확인
- `/home/joy/workspace/DeukPack/package.json`
  - `install:src`, `install:src:quick`, `build`, `verify`, `verify:quick` 등 source/install/build 진입점 보유
  - DpJson runtime은 `core/python/src/deukpack_core/dp_json_protocol.py`, Java/C#/C++ runtime에도 존재

## 리뷰 질문

1. `deukpack.pipeline.json`의 `defineRoot`, `includePaths`, `outputDir`가 DeukAgentContext의 실제 IDL/source layout과 일치하는가?
2. `python.options.core = rust-wrap`가 `scripts/deukpack_dev_link.sh`의 native build 흐름과 일치하는가?
3. `package.json`의 `file:../DeukPack` 의존성과 dev-link 스크립트가 서로 충돌하지 않는가?
4. DpJson 관련 runtime/schema 검증은 source 파일 기준으로 가능한가, generated/dist-test 산출물을 직접 건드릴 위험은 없는가?
5. 후속 124번 integration check와 중복되는 실행 작업은 어디서 분리해야 하는가?

## 후속 실행 후보

후속 실행 티켓에서 승인 후에만 수행한다.

1. DeukAgentContext에서 package/deukpack pipeline 상태를 읽기 전용으로 점검한다.
2. 필요 시 `/tmp` 또는 dry-run 성격으로 DeukPack codegen/build 명령을 확인한다.
3. generated output이 바뀌는 명령은 사용자 승인 없이는 실행하지 않는다.
4. 불일치가 발견되면 DeukAgentContext pipeline config 또는 DeukPack generator/source 중 실제 원천 파일을 특정한다.
5. DpJson schema/runtime 관련 수정이 필요하면 DeukPack 별도 티켓으로 분리한다.

## 비범위

- DeukAgentContext 제품 코드 수정.
- DeukPack generator/runtime 수정.
- `npm install`, `poetry install`, `maturin develop`, `deukpack run`, build/codegen 실행.
- generated files, `dist-test`, benchmark/report artifacts 수정.

## 검증

- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md `merged into this ticket`

## Handoff

이 티켓이 닫히면 실제 통합 확인은 `124-deukpack-integration-check-joy-nucb` 또는 새 후속 티켓에서 Phase 2 승인 후 수행한다.

## Merged Legacy Document


### 123 agentcontext deukpack integratio joy nucb report

# AgentContext-DeukPack 통합 리뷰 보고서

## 리뷰 범위

이 티켓은 실행 전 리뷰 전용으로 처리했다. DeukAgentContext, DeukPack, DeukAgentRules 제품 코드와 generated output은 수정하지 않았다.

## 확인한 연결점

- `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`
  - Python output만 활성화되어 있고 `outputDir`은 `deuk_idl`이다.
  - Python core option은 `rust-wrap`이다.
- `/home/joy/workspace/DeukAgentContext/package.json`
  - `devDependencies.deukpack`은 `file:../DeukPack`이다.
  - `deukpack:dev-link`와 `deukpack:release-guard` 스크립트가 있다.
- `/home/joy/workspace/DeukAgentContext/scripts/deukpack_dev_link.sh`
  - sibling DeukPack source를 npm install로 연결하고 Poetry 환경을 동기화한다.
  - cargo가 있으면 `maturin develop`으로 native extension을 빌드한다.
  - `node_modules/deukpack` symlink와 `deukpack_core` import를 확인한다.
- `/home/joy/workspace/DeukPack/package.json`
  - `install:src`, `install:src:quick`, `build`, `verify`, `verify:quick` 등 통합 확인에 필요한 진입점이 있다.
  - DpJson runtime/source는 DeukPack 쪽 source/runtime 레이어에서 관리된다.

## 리스크

- `npm install`, `poetry install`, `maturin develop`, codegen/build는 broad side effect가 있으므로 후속 실행 티켓에서 승인 후 실행해야 한다.
- DpJson/schema 문제가 발견되더라도 generated/dist-test 산출물을 직접 수정하면 안 된다.
- DeukAgentContext pipeline config와 DeukPack generator/runtime 중 실제 원천 소유자를 먼저 구분해야 한다.

## 후속 실행 기준

- 실제 통합 확인은 `124-deukpack-integration-check-joy-nucb` 또는 새 후속 티켓에서 Phase 2 승인 후 수행한다.
- 첫 단계는 read-only 상태 점검이어야 한다.
- 설치/build/codegen이 필요하면 dry-run 또는 `/tmp` 출력 우선으로 검토한다.
- 수정이 필요하면 DeukAgentContext pipeline config, DeukPack generator/runtime, DeukAgentRules rule linkage 중 소유 경계를 분리한다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md `merged into this ticket`: 통과.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md `merged into this ticket` `merged into this ticket`: 통과.
