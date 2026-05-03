 - - - i d : 1 7 0 - d e u k p a c k - u p m - n e t s t a n d a r d - d l l - r u n - j o y - n u c b t i t l e : d e u k p a c k - u p m - n e t s t a n d a r d - d l l - r u n t i m e - s t r u c t u r e p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D e u k P a c k U P M r u n t i m e 을 소 스 복 사 본 이 아 닌 n e t s t a n d a r d 2 . 0 D L L 참 조 구 조 로 정 리 c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 0 4 : 2 3 : 4 2 - - - # d e u k p a c k - u p m - n e t s t a n d a r d - d l l - r u n t i m e - s t r u c t u r e > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y d e u k p a c k - u p m - n e t s t a n d a r d - d l l - r u n t i m e - s t r u c t u r e - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " D e u k P a c k U P M r u n t i m e 을 소 스 복 사 본 이 아 닌 n e t s t a n d a r d 2 . 0 D L L 참 조 구 조 로 정 리 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " D e u k P a c k U P M r u n t i m e 을 소 스 복 사 본 이 아 닌 n e t s t a n d a r d 2 . 0 D L L 참 조 구 조 로 정 리 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " D e u k P a c k U P M r u n t i m e 을 소 스 복 사 본 이 아 닌 n e t s t a n d a r d 2 . 0 D L L 참 조 구 조 로 정 리 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d .

## Merged Legacy Document


### 170 deukpack upm netstandard dll run joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
UPM 런타임 구조가 두 가지 런타임 배포 방식을 동시에 사용하고 있었다.

현재 `upm/package.json`은 `DeukPack.Core / Protocol / ExcelProtocol DLL (netstandard2.0)`을 Runtime/Plugins에 배치하는 모델을 설명한다. 그러나 실제 `upm/Runtime/Core`, `upm/Runtime/Protocol`, `upm/Runtime/ExcelProtocol`에는 동일 런타임 C# 소스와 asmdef가 복사되어 있었다. 이 상태에서는 Unity 패키지가 DLL과 소스 컴파일본을 동시에 볼 수 있어 타입 중복, asmdef 참조 꼬임, 원본/복사본 불일치가 발생한다.

## Source Observations
- `DeukPack.Core/DeukPack.Core.csproj`는 이미 `netstandard2.0;net8.0;net9.0`을 타겟팅한다.
- `DeukPack.Protocol/DeukPack.Protocol.csproj`는 이미 `netstandard2.0;net6.0;net8.0;net9.0`을 타겟팅하며 `DeukPack.Core`를 참조한다.
- `upm/package.json`은 DLL 배포 모델을 설명한다.
- `scripts/build_unity_runtime_plugins.js`는 `netstandard2.0` DLL을 빌드해 `upm/Runtime/Plugins`로 복사한다.
- `scripts/dist_csharp.js`와 기존 `build_unity_runtime_plugins.js`는 동시에 source tree를 `upm/Runtime/*`에 복사했다.
- `upm/Runtime/Unity/DeukPack.Unity.asmdef`는 기존 source asmdef(`DeukPack.Core`, `DeukPack.Protocol`)를 참조했다.

## Cause Hypotheses
- 과거 내부 개발 편의상 UPM에 소스를 직접 복사하는 경로가 남아 있었고, 이후 DLL 배포 모델이 추가되면서 두 구조가 공존했다.
- build script와 package description의 의도가 갈라져 UPM이 source package인지 binary package인지 모호해졌다.
- Unity 전용 geometry 소스는 남겨야 하지만 Core/Protocol/ExcelProtocol은 engine-neutral netstandard2.0 DLL로 제공되어야 한다.

## Decision Rationale
UPM 런타임의 소스 오브 트루스는 C# 프로젝트(`DeukPack.Core`, `DeukPack.Protocol`, `DeukPack.ExcelProtocol`)이며, UPM은 `netstandard2.0` DLL을 소비하는 배포 패키지로 둔다.

대안으로 UPM 소스 패키지 모델을 유지할 수도 있지만, 이미 csproj가 `netstandard2.0`을 지원하고 `build_unity_runtime_plugins.js`가 DLL을 빌드/복사하므로 DLL 모델이 현 구조와 더 일치한다. source vendoring은 원본/복사본 drift를 재발시키므로 제거한다.

## Execution Strategy
1. `scripts/dist_csharp.js`에서 `upm/Runtime/*` 소스 동기화 단계를 제거한다.
2. `scripts/build_unity_runtime_plugins.js`에서 source copy 경로와 `--skip-source` 옵션을 제거하고 DLL 빌드/복사만 수행하게 한다.
3. `upm/Runtime/Unity/DeukPack.Unity.asmdef`가 source asmdef 대신 `DeukPack.Core.dll`, `DeukPack.Protocol.dll` precompiled reference를 사용하게 한다.
4. 기존 `upm/Runtime/Core`, `upm/Runtime/Protocol`, `upm/Runtime/ExcelProtocol` 복사본을 제거한다.

## Verification Design
- 구조 확인: `upm/Runtime` 아래에 Unity 전용 소스와 `Plugins/*.dll`만 남고 Core/Protocol/ExcelProtocol source tree가 사라져야 한다.
- 스크립트 확인: `build_unity_runtime_plugins.js`에서 `netstandard2.0` 빌드 및 `Runtime/Plugins` 복사 경로가 유지되어야 한다.
- 잔류 리스크: Unity import 설정(`.meta`)이 필요한 환경에서는 DLL import metadata를 별도 생성/관리해야 할 수 있다.

## Verification Outcome
- `find upm/Runtime -maxdepth 2 -type f` 기준으로 `Plugins` DLL/PDB와 `Unity` 전용 소스만 남은 것을 확인했다.
- source vendoring 재발 키워드(`skip-source`, `Distributing C# Source`, `UPM_SOURCE_MAPPING`, `upm/Runtime/Core|Protocol|ExcelProtocol`)가 대상 스크립트에서 더 이상 검색되지 않는다.
- `node --check scripts/build_unity_runtime_plugins.js` 통과.
- `node --check scripts/dist_csharp.js` 통과.
- `DeukPack.Core.SharedCompile.props`의 `../upm/Runtime/Core/deuk_geometry.impl.cs` 역참조를 제거하고, 순수 geometry partial 구현을 `DeukPack.Core/src/Geometry/deuk_geometry.impl.cs`로 이동했다.
- `dotnet build DeukPack.Protocol/DeukPack.Protocol.csproj -f netstandard2.0 --nologo -v:quiet` 통과(0 warnings, 0 errors).
