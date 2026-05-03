 - - - i d : 1 5 3 - d e u k p a c k - b m t - r e a l - c o v e r a g e - a u d i t - j o y - n u c b t i t l e : d e u k p a c k - b m t - r e a l - c o v e r a g e - a u d i t p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k B M T 관 련 기 능 미 구 현 과 누 락 , 가 짜 테 스 트 의 심 지 점 을 실 제 구 현 기 준 으 로 감 사 한 다 . p r i o r i t y : h i g h t a g s : - d e u k p a c k - b m t - t e s t - c o v e r a g e - a u d i t c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 1 4 : 4 5 : 4 7 - - - # d e u k p a c k - b m t - r e a l - c o v e r a g e - a u d i t > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * D e u k P a c k B M T e v i d e n c e m o d e l , r e p o r t e r s t a t u s a g g r e g a t i o n , a n d p r i o r D e u k A g e n t R u l e s B M T t i c k e t h i s t o r y - * * C o n t e x t F i l e s : * * D e u k A g e n t R u l e s B M T t i c k e t s / r e p o r t s 1 3 3 , 1 3 5 - 1 4 2 ; / h o m e / j o y / w o r k s p a c e / D e u k P a c k / P R O J E C T _ R U L E . m d ; / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / * ; / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / r e p o r t s / * - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t , i t s p l a n / r e p o r t a r t i f a c t s , a u d i t n o t e s u n d e r . d e u k - a g e n t / d o c s / , a n d D e u k P a c k f i l e s / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / p r e f l i g h t - m a t r i x . j s , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / s c r i p t s / b m t / r e p o r t e r . j s , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / t e m p l a t e s / D E U K P A C K _ T E S T _ M A T R I X . m d . e j s , / h o m e / j o y / w o r k s p a c e / D e u k P a c k / b e n c h m a r k s / t e m p l a t e s / B M T _ P R O T O C O L _ M A T R I X . m d . e j s - F o r b i d d e n m o d u l e s : D e u k P a c k g e n e r a t e d o u t p u t s / r e p o r t s , D e u k P a c k r u n t i m e / c o d e g e n s o u r c e o u t s i d e l i s t e d B M T f i l e s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e - R u l e c i t a t i o n : D e u k A g e n t R u l e s P R O J E C T _ R U L E . m d ; D e u k P a c k P R O J E C T _ R U L E . m d D C - V E R I F Y - B M T / D C - C O D E G E N / D C - T I C K E T - F I R S T # # # [ C O N T R A C T ] - I n p u t : u s e r r e p o r t t h a t D e u k P a c k B M T h a s m a n y m i s s i n g / u n i m p l e m e n t e d f e a t u r e s a n d f a k e t e s t s , p l u s l o c a l c o d e / h i s t o r y e v i d e n c e - O u t p u t : c o n c r e t e a u d i t c l a s s i f i c a t i o n p l u s m i n i m a l r e p o r t e r / p r e f l i g h t p a t c h t h a t p r e v e n t s e x t e r n a l - c o m m a n d s m o k e c h e c k s f r o m b e i n g r e p o r t e d a s g e n e r a t e d r o u n d t r i p i m p l e m e n t a t i o n p r o o f - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s a n d s c o p e d D e u k P a c k B M T s o u r c e / t e m p l a t e e d i t s o n l y ; n o g e n e r a t e d b e n c h m a r k r e p o r t e d i t s # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 5 3 - d e u k p a c k - b m t - r e a l - c o v e r a g e - a u d i t - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 153 deukpack bmt real coverage audit joy nucb plan

# DeukPack BMT 실제 커버리지 감사 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
사용자는 DeukPack BMT 관련 기능 미구현과 누락이 많고, 특히 테스트가 가짜에 가까운 경우가 많았다고 지적했다.

과거 DeukAgentRules의 BMT 큐 `135`-`142`는 언어별 누락을 “문서 기준으로 분류”하고 archive했지만, 실제 DeukPack codegen/runtime/benchmark 산출물은 수정하지 않았다. 따라서 해당 큐의 완료 상태는 구현 완료가 아니라 “성공 승격 금지 기준 정리”에 가깝다.

현재 DeukPack BMT 구조에서도 JS/TS/Python 일부는 generated roundtrip runner가 있지만, C#/C++/Rust/Java/Elixir는 언어별 외부 명령 하나가 성공하면 모든 protocol/model row에 같은 passed 상태를 부여하는 coarse preflight 구조다. 이 상태는 실제 protocol별 generated roundtrip 테스트로 보기 어렵다.

## Source Observations
- RAG `search_code`는 DeukPack BMT fake/missing query에서 zero result를 반환했다. 로컬 fallback으로 확인한 증거를 knowledge에 보강했다.
- `merged into this ticket`는 `135` 큐가 실제 구현이 아니라 문서 기준 검토/분류 완료라고 명시한다.
- `merged into this ticket`는 DeukPack 코드 생성기, 런타임 구현체, benchmark/report 산출물을 수정하지 않았다고 기록한다.
- `/home/joy/workspace/DeukPack/PROJECT_RULE.md`의 DC-VERIFY-BMT는 BMT 구조가 hand-rolled mock을 포함할 수 있으므로 실제 codegen 구조를 `/tmp/` 빌드로 확인하라고 요구한다.
- `/home/joy/workspace/DeukPack/scripts/bmt/language-manifest.js`는 TypeScript, JavaScript, Python만 `generatedRunner: true`로 둔다. C#, C++, Rust, Java, Elixir는 `external-command` preflight다.
- `/home/joy/workspace/DeukPack/scripts/bmt/preflight-matrix.js`의 `runExternalCommandPreflight`는 외부 명령 하나의 exit status를 모든 protocol/model row에 복제한다.
- `/home/joy/workspace/DeukPack/scripts/bmt/reporter.js`의 `implementationStatus`는 `deukMeasured`, preflight passed, preflight failed 중 하나만 있어도 `implemented`로 분류한다.
- `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`에는 Python (Pure) 등이 `implemented`지만 Passed/Verify Failed/Unimplemented가 모두 0인 행이 존재한다. 이는 “검증됨”이 아니라 “측정 또는 분류 흔적 있음”으로 읽어야 한다.
- DeukPack worktree는 이미 `benchmarks/reports/*`, `benchmarks/templates/BMT_MASTER_REPORT.md.ejs`, `core/python/src/deukpack_core/dp_json_protocol.py`, `scripts/bmt/python-generated-runner.py`, `scripts/bmt/reporter.js` 등이 수정된 상태다. 이 감사 티켓에서는 사용자 변경으로 보고 직접 수정하지 않는다.

## Cause Hypotheses
- BMT 문서와 매트릭스가 “구현 가능성”, “측정 흔적”, “preflight 성공”, “protocol/model roundtrip 통과”를 하나의 implemented/passed 인상으로 섞고 있다.
- 외부 언어 preflight가 per-protocol/per-model 테스트가 아니라 build/test command 수준의 smoke check인데, reporter가 이를 matrix row 단위 증거처럼 집계한다.
- 과거 BMT 티켓들이 실제 구현 티켓이 아니라 상태 분류 티켓이었는데, archive 상태 때문에 구현 완료처럼 오해될 수 있다.
- generated output과 hand-rolled BMT 파일이 섞여 있어, DC-VERIFY-BMT가 요구하는 `/tmp/` fresh codegen 검증 없이 보고서만 보면 실제 지원 범위를 과대평가하기 쉽다.

## Decision Rationale
즉시 DeukPack 코드를 수정하지 않는다. DeukPack worktree에 이미 사용자의 BMT 관련 변경이 많고, 이 작업은 cross-repo/cross-layer라 DeukPack 자체 티켓과 승인된 구현 계획이 필요하다.

먼저 감사 기준을 고정한다. “fake test”로 볼 수 있는 경우는 결과가 protocol/model별 실제 generated roundtrip에서 나온 것이 아니라, 외부 명령 성공을 행 전체에 복제하거나, measurement 흔적만으로 implemented를 부여하는 경우다.

후속 구현은 DeukPack repo에서 별도 ticket으로 나눠야 한다. 1순위는 reporter/preflight 상태 모델 수정, 2순위는 외부 언어별 generated roundtrip runner 추가, 3순위는 보고서 문구와 Matrix 상태 재생성이다.

## Execution Strategy
이 티켓은 감사와 후속 작업 정의를 수행하고, 사용자의 진행 요청에 따라 상태 집계의 과장 표현을 막는 최소 패치를 포함한다.

우선 현재 evidence tier를 분류한다. Tier A는 실제 generated code를 import해 pack/unpack roundtrip을 수행하는 JS/TS/Python이다. Tier B는 외부 build/test command 성공을 모든 row로 확장하는 C#/C++/Rust/Java/Elixir preflight다. Tier C는 missing/unimplemented/0-count row로, 구현 성공으로 해석하면 안 된다.

이번 패치에서는 reporter가 Tier B를 `preflight_only`로 표기하게 하고, `implementationStatus`가 external preflight passed/failed만으로 `implemented`가 되지 않도록 고친다. 그 뒤 언어별 실제 runner 추가는 별도 티켓으로 분리한다.

## Verification Design
이 감사 티켓의 검증은 markdown lint와 읽기 기반 증거 확인이다.

실제 DeukPack 수정 티켓의 검증 설계는 다음을 요구한다.

`node scripts/build_deukpack.js`를 `/tmp/` 출력으로 실행해 fresh generated manifest를 확보한다.

`node scripts/bmt/preflight-matrix.js --manifest <tmp-manifest> --languages typescript,javascript,python,csharp,cpp,rust,java,elixir`를 실행하되, external-command 언어는 per-row passed로 승격하지 않는다.

`node scripts/bmt/matrix-validator.js`와 report generation을 실행해 Matrix가 `generated_roundtrip`, `preflight_only`, `unimplemented`, `missing`을 구분하는지 확인한다.

잔여 리스크는 현재 DeukPack worktree가 이미 dirty라, 감사에서 관찰한 내용 중 일부가 사용자의 진행 중 수정일 수 있다는 점이다.

## Execution Result
DeukPack BMT 상태 모델에 최소 패치를 적용했다.

`/home/joy/workspace/DeukPack/scripts/bmt/preflight-matrix.js`는 generated runner row에 `evidenceKind: generated_roundtrip`, external command preflight row에 `evidenceKind: external_preflight`를 기록한다.

`/home/joy/workspace/DeukPack/scripts/bmt/reporter.js`는 generated roundtrip과 external smoke/preflight를 분리 집계한다. external smoke/preflight만 있는 경우 `implemented`가 아니라 `preflight_only`로 표기하고, benchmark 측정만 있는 경우 `benchmark_only`로 표기한다.

`/home/joy/workspace/DeukPack/benchmarks/templates/DEUKPACK_TEST_MATRIX.md.ejs`와 `/home/joy/workspace/DeukPack/benchmarks/templates/BMT_PROTOCOL_MATRIX.md.ejs`는 `RT` generated roundtrip과 `SK` external smoke/preflight를 분리해 보여준다.

## Verification Result
`node --check scripts/bmt/preflight-matrix.js && node --check scripts/bmt/reporter.js` 통과.

`git diff --check -- scripts/bmt/preflight-matrix.js scripts/bmt/reporter.js benchmarks/templates/DEUKPACK_TEST_MATRIX.md.ejs benchmarks/templates/BMT_PROTOCOL_MATRIX.md.ejs` 통과.

보고서 재생성은 `benchmarks/reports/*` 산출물을 바꾸므로 이 단계에서 실행하지 않았다.

## Merged Legacy Document


### 153 deukpack bmt real coverage audit joy nucb report

# DeukPack BMT 실제 커버리지 감사 보고서

## 결론
기존 BMT Matrix는 generated roundtrip, external smoke/preflight, benchmark 측정 흔적을 한 구현 상태 안에 섞을 수 있었다.

특히 external command preflight는 언어별 명령 하나의 성공/실패를 모든 protocol/model row에 복제하므로, 실제 generated roundtrip 테스트로 볼 수 없다.

## 변경
DeukPack `scripts/bmt/preflight-matrix.js`에 evidence kind를 추가했다.

DeukPack `scripts/bmt/reporter.js`는 generated roundtrip과 external smoke/preflight를 분리 집계한다. external evidence만 있으면 `preflight_only`, benchmark 측정만 있으면 `benchmark_only`로 표시한다.

DeukPack BMT Matrix 템플릿은 `RT`와 `SK`를 나눠 표시한다.

## 검증
`node --check scripts/bmt/preflight-matrix.js && node --check scripts/bmt/reporter.js` 통과.

`git diff --check -- scripts/bmt/preflight-matrix.js scripts/bmt/reporter.js benchmarks/templates/DEUKPACK_TEST_MATRIX.md.ejs benchmarks/templates/BMT_PROTOCOL_MATRIX.md.ejs` 통과.

보고서 재생성은 생성 산출물 변경이라 실행하지 않았다.
