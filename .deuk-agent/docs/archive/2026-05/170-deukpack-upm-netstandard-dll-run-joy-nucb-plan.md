---
summary: "Agent problem analysis and decision trace for 170-deukpack-upm-netstandard-dll-run-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 04:23:42"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
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
