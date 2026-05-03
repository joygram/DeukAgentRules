---
summary: "DeukPack BMT continuation report for explicit blocked evidence rows"
status: done
priority: high
tags:
  - deukpack
  - bmt
  - truth-gate
  - report
---

# DeukPack BMT 이슈 연속 진행 보고서

## 결론

BMT는 여전히 실패 상태다.

이번 진행에서는 `crossTransferRows`와 `legacyCompatibilityRows`가 비어 있어 validator가 단순 missing으로만 보고하던 상태를 고쳤다. 이제 BMT 산출물은 해당 영역이 구현되지 않았음을 요구 cell별 `blocked` evidence로 기록한다.

## 변경

`/home/joy/workspace/DeukPack/scripts/bmt/orchestrator.js`

- cross-language transfer 요구 cell 1008개를 `blocked` row로 생성한다.
- legacy compatibility 요구 cell 128개를 `blocked` row로 생성한다.
- blocked row는 fixture hash와 실패 이유를 포함해 release truth gate에서 green으로 오인되지 않게 한다.

`/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`

- cross-language/legacy row 존재 여부와 pass 여부를 분리해서 판단한다.
- row가 있지만 `passed`가 아니면 `missing` 대신 `blocked` 또는 실패 상태와 detail을 보고한다.

## 검증

`node --check scripts/bmt/orchestrator.js` 통과.

`node --check scripts/bmt/matrix-validator.js` 통과.

`node scripts/bmt/orchestrator.js` 실행 결과 validator는 의도대로 실패했다.

- Passed: 14 / 18
- Failed: 4 / 18
- `crossTransferRows`: 1008개, 전부 `blocked`
- `legacyCompatibilityRows`: 128개, 전부 `blocked`
- `third-party truth gate`: 통과, direct 12 / similar 12
- C# generated rows: 22개 실패
- Preflight failed/unavailable/blocked rows: 166개

## 남은 실패

- C# generated roundtrip:
  - `XTCompact`은 `Attempted to read past the end of the stream`
  - `XTJson`, `DpPack`, `DpJson`, `DpYaml` 일부 모델은 unpack 결과가 fixture와 불일치
  - `DpZero`, `DpCsv`는 C# `DpFormat`에 매핑되지 않음
- Cross-language transfer runner는 아직 실제 source/target payload proof를 만들지 않는다.
- Legacy compatibility runner는 아직 legacy codec payload proof를 만들지 않는다.

## 다음 작업

우선순위는 C# generated roundtrip 실패 수리다. 그 다음 cross-language transfer runner와 legacy compatibility runner를 실제 proof 기반으로 구현해야 한다.
