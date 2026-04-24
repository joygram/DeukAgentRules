---
id: deukpack-codec
condition:
  project: DeukPack
inject_target: ["AGENTS.md"]
---
## DeukPack Codec & IDL Strict Rules (득팩 코어 체재 하드 룰)

- **IDL Field Syntax (앵글 브래킷)**: 득팩의 필드 정의는 `1> int32 id` 형식을 따릅니다. Thrift 레거시 문법인 `:`(콜론), 세미콜론(`;`), `i32`, `i64`를 더 이상 문서나 코드에 사용하지 마십시오. 오로지 `id> type name` 및 `int32`, `int64` 표준 명칭을 강제합니다.
- **Unified Pack API**: 과거의 `DeukPackSerializer`, `DeukPackEngine`, `WriteWithOverrides`, `toJsonWithOverrides` 등은 모두 폐기되었습니다. 모든 코드에는 `DeukPackCodec` 식별자와 유니파이드 API(`byte[] bin = Dto.Hero.Pack(format, fieldIds, overrides)`, `hero.UnpackFrom(bin)`)만 사용해야 합니다.
- **Namespace Requirement**: Every `.deuk` schema MUST explicitly declare a namespace (e.g., `namespace Dto`). Never define global structs without a namespace. Code examples MUST use the fully qualified namespace path (e.g., `Dto.Hero.Pack()`).
