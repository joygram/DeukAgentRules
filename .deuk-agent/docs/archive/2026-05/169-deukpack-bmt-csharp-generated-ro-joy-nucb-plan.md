---
summary: "Agent problem analysis and decision trace for 169-deukpack-bmt-csharp-generated-ro-joy-nucb-plan"
status: completed
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 04:00:34"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
실패 행은 크게 4개 유형으로 수렴된다.

1. C# 생성 런처가 contract의 전체 프로토콜(`DpZero`, `DpCsv` 포함)을 실행해야 하나, C# `DpFormat`/codec 표면에는 두 포맷이 빠져 있었다.
2. XTCompact의 `pack/unpack`에서 `Attempted to read past the end of the stream`이 공통 모델/복합 모델 모두에서 발생한다.
3. DpPack은 `common-flat`, `complex-roundtrip` 모두에서 fixture 불일치(정합성 실패)가 발생한다.
4. XTJson/DpJson/DpYaml는 `complex-roundtrip`에서만 불일치가 발생한다.

## Source Observations
### 1) 실행 런처/포맷 리스트
- `DeukPack/scripts/bmt/csharp-generated-runner.js`
  - BMT protocol contract는 `DpZero`, `DpCsv`를 포함한 9개 프로토콜을 요구한다.
  - `matrix-validator.js`는 generated rows에서 전체 protocol matrix를 요구하며, skip marker도 금지한다.
  - 따라서 runner에서 프로토콜을 제거하거나 skip 처리하는 것은 contract 축소라서 허용되지 않는다.

### 2) XTCompact에서 공통 발생 패턴
- `DeukPack.Protocol/src/XTCompactProtocol.cs`와 `upm/Runtime/Protocol/XTCompactProtocol.cs`
  - `WriteFieldBegin(DpColumn field)`가 `field.Type == DpWireType.Bool`인 경우 즉시 반환한다.
  - 이에 반해 `ReadFieldBegin()`은 Bool 타입을 포함해 필드 헤더를 파싱한다.
  - boolean 필드를 가진 모델(`common-flat`, `complex-roundtrip`)에서 쓰기/읽기 동기화가 깨져 `Attempted to read past the end of the stream`이 발생한다.

### 3) DpPack 불일치의 구조적 단서
- `DeukPack.Protocol/src/DeukPackCodec.cs`의 `CreateProtocol()`는 `DpFormat.DpPack`를 `DpPackProtocol`로 라우팅한다.
- `DeukPack.Protocol/src/DpPackProtocol.cs`의 `WriteStructBegin()`은 `record.Count`를 그대로 필드 수로 기록한다.
- 런처에서 생성되는 모델 작성부의 struct begin 호출은 `new DpRecord { Name = "..."}`
  (Count 미지정)으로 들어가며, 구조체 카운트가 0으로 기록될 가능성이 있다.
- C# 런처는 `complex-roundtrip`/`common-flat` 모두에서 DpPack 정합성 mismatch가 있으나 구조체 카운트 사용 지점과 결합되어 있어 1차적으로 영향이 큼.

### 4) `complex-roundtrip` 전용 JSON/YAML mismatch
- 동일 런처에서 `XTJson`, `DpJson`, `DpYaml`는 flat 모델은 통과, 복합 모델만 실패한다.
- 복합 모델은 중첩 구조(리스트/셋/맵/구조체)의 조합이 있어 직렬화-역직렬화 후 안정된 JSON 비교 방식(필드 순서/컬렉션 순서 민감성)에서 추가 보정이 필요할 가능성이 높다.

## Cause Hypotheses
1. XTCompact bool field 헤더 미기록으로 인한 필드 디코딩 오프셋 붕괴가 가장 유력함.
2. C# `DpFormat` enum/codec에 DpZero/DpCsv 표면이 없어 contract protocol을 실행할 수 없었음.
3. DpPack 정합성 실패는 현재 DpPack struct count 전달 방식(`DpRecord.Count`)과 생성 런처 모델 작성 방식 불일치에서 기인했을 가능성이 높음.
4. `complex-roundtrip` JSON/YAML mismatch는 값 비교 기준이 fixture/unpacked를 엄격 문자열 비교하기 때문에 컬렉션 정렬·기본값 처리 특성으로 false-positive가 남을 수 있음.

## Decision Rationale
우선순위는 “원인 확정성이 높은 실패”부터 처리한다.
- 먼저 런처 고장(지원되지 않는 포맷 포함) 및 XTCompact bool 헤더 결함은 고정 패턴(상시 재현, 명확한 코드 상호작용)이라 즉시 수정 대상이다.
- DpPack은 별도 고찰이 필요하다. 구조체 카운트 기반 인코딩 자체가 `Count` 미지정 모델과 충돌할 수 있으므로, 코드 변경은
  - A안: 런처/모델 쪽에서 `DpRecord.Count`를 정확히 채우거나
  - B안: DpPack 구조를 무조건 지원 가능하도록 `WriteStructBegin/ReadStructBegin` 처리 강화
  중 하나를 적용해야 한다.
- 우선순위 상 XTCompact/미지원 포맷 정리를 선행한 뒤 DpPack/복합 정합성 mismatch를 분리 검증한다.

## Execution Strategy
1. `DeukPack/scripts/bmt/csharp-generated-runner.js`에서 C# 런처 프로토콜 목록을 contract 전체(9개)와 일치시킨다.
   - `DpZero`, `DpCsv`를 제거하지 않고 `DpFormat`/codec 표면에 추가해 실행한다.
2. `DeukPack.Protocol/src/XTCompactProtocol.cs` 및 `upm/Runtime/Protocol/XTCompactProtocol.cs`
   - `WriteFieldBegin()`의 Bool 경로를 일반 필드 헤더 쓰기 규칙으로 정상화(누락 시 발생한 read 오프셋 붕괴 제거).
   - 핵심 소스 오브 트루스는 `DeukPack.Protocol/src`이며, `upm/Runtime`은 파생본으로 분리 관리한다. 동작 동기화가 필요할 경우 재생성 파이프라인을 통해 반영한다.
3. DpPack 정합성 조정
   - 런처/모델 구조에서 `WriteStructBegin`에 전달되는 `DpRecord.Count`를 실제 필드 수로 전달할 수 있는지 우선 확인.
   - 가능하면 모델-의존 수정으로 해결하고, 난항 시 `DpPackProtocol`의 구조체 시작/종료 규약을 0카운트 케이스에서 안정적으로 처리하도록 보완.
4. 위 1~3 적용 후 C# 행렬 재수집 및 실패 패턴 재분류
   - XTJson/DpJson/DpYaml 복합 모델 mismatch가 잔존하면 fixture/비교 방식 보정(컬렉션 비교 안정화 또는 비교기 변경)을 추가 검토.

## Verification Design
### 1차 실행 명령
- `npx deuk-agent-rule ticket create --topic ...`는 이미 선행 완료되어, 이어서 코드 수정만 수행 후 결과 저장.
- BMT C# runner 실행(프로젝트 기준)로 matrix를 갱신하고 0~수% 실패 행을 재집계.
- `bmt-latest.json`에서 csharp 실패 분포 및 detail 텍스트를 추출해 실패 유형별 감소량 확인.

### 성공 기준
- `DpZero`, `DpCsv` 포함 전체 C# generated matrix를 실행해야 한다. 단, C# runtime 미구현 프로토콜은 임시 라우팅/skip 없이 실패로 남겨야 한다.
- XTCompact `Attempted to read past the end of the stream` 사라짐.
- DpPack mismatch 원인/재발 여부를 구분해 문서화.
- `complex-roundtrip` JSON/YAML mismatch 잔존 시, 원인(컬렉션 순서/스키마 표현)과 보완안을 planLink에 명시.

### 잔류 리스크
- DpPack 정합성은 protocol/spec 조정이 필요한 영역이어서 변경 방식에 따라 상위 호환성 영향이 있을 수 있음.

## Verification Outcome
- C# generated-code matrix 단독 검증:
  - 명령: `node scripts/bmt/generate-codegen-fixtures.js --languages csharp --protocol pack` 후 `node scripts/bmt/generated-code-runner.js --manifest <manifest> --languages csharp --iterations 1`
  - 결과: `total=36`, `passed=32`, `failed=4`
  - 실패: `DpCsv`의 `common-flat/complex-roundtrip` pack/unpack 4셀, detail=`DpCsv is not implemented by the C# protocol runtime`
- `DpZero`, `DpCsv`는 C# `DpFormat`/codec 표면에 추가하고 runner contract 목록에 복구했다.
- `DpFormat` 원천은 `src/deuk/deuk_protocol.deuk`로 유지했다. generated 파일은 직접 수정 상태로 두지 않고 `node scripts/gen-core-idl.js --force`로 재생성해 C#/TS/Java/Python/Rust/Elixir runtime Generated 산출물을 동기화했다.
- 잔류 리스크: `DpCsv`는 C# table CSV 고유 구현이 아직 없어 실패로 남긴다. 임시 라우팅/skip은 금지하며, 별도 티켓에서 C# `DpCsvProtocol` 실구현이 필요하다.
- XTCompact는 bool field header 누락과 `Float`/`SByte` compact type mapping 누락을 보완해 `common-flat`, `complex-roundtrip` 모두 통과했다.
- DpPack은 generated code가 사용하는 field-stop 규약에 맞춰 read/write를 정리해 flat/complex 모두 통과했다.
- DpJson/XTJson/DpYaml는 nested struct/list/map write/read context 보존을 보완해 complex roundtrip까지 통과했다.
- 추가 확인:
  - `node --check scripts/bmt/csharp-generated-runner.js` 통과.
  - `dotnet build DeukPack.Protocol/DeukPack.Protocol.csproj -f netstandard2.0 --nologo -v:quiet` 통과(0 warnings, 0 errors).
- Direct Jest verification:
  - `npx jest src/serialization/__tests__/WireRoundtripMatrix.test.ts --runInBand` passed.
- Environment note:
  - `npm test` reached `build:cpp` and then failed because `cmake` is not installed in this environment. The policy test itself still passed when run directly via Jest.
