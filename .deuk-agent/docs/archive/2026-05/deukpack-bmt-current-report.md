---
summary: "DeukPack BMT 현재 상태 통합 보고서"
status: active
priority: high
tags:
  - deukpack
  - bmt
  - verification
  - truth-gate
---

# DeukPack BMT 현재 상태 통합 보고서

## 결론

현재 DeukPack BMT는 green으로 간주하면 안 된다.

기존 BMT 결과는 generated roundtrip, external smoke/preflight, benchmark 흔적, third-party 유사 데이터를 한 화면에 섞어 보여줄 수 있었다. 이 때문에 환경이 구성되지 않았거나 third-party 의존성이 실제 설치되지 않은 상태에서도 “테스트 통과”처럼 보이는 거짓 양성이 생겼다.

이 통합 보고서는 153/154/155 티켓의 분산 보고서를 현재 판단용으로 합친 canonical report다. 개별 보고서는 archive evidence로 남기되, 사용자-facing 현재 상태는 이 문서를 기준으로 본다.

## 실제 실행 결과

`/home/joy/workspace/DeukPack`에서 `npm run bench:v2-matrix`를 실행했다.

실행 파이프라인 자체는 완료됐고, 당시 기존 BMT 3D Matrix Hard Validation Gate는 Passed 14 / 14로 통과했다. 그러나 이 통과는 환경/third-party truth를 충분히 검증하지 못한 결과였으므로 현재 기준의 최종 green이 아니다.

핵심 산출물은 다음과 같다.

- `/home/joy/workspace/DeukPack/benchmarks/out/bmt-latest.json`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_PROTOCOL_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md`
- `/home/joy/workspace/DeukPack/benchmarks/history/bmt-2.0.0-2026-05-01T14-58-19-862Z.json`

## 수치 요약

- Generated-code matrix rows: 84
- Matrix rows by language: TypeScript 28, JavaScript 28, Python 28
- Matrix rows by subject: DeukPack 60, competitor 24
- Preflight statuses: 80
- Generated roundtrip: 30 passed
- External preflight: 30 passed, 10 verify_failed, 10 unavailable

## 언어별 현재 해석

- TypeScript: generated roundtrip 10건 통과. 우선 검토 가능하다.
- JavaScript: generated roundtrip 10건 통과. 우선 검토 가능하다.
- Python: generated roundtrip 10건 통과. 단 Master adoption map에서는 Python Pure가 benchmark_only 근거 중심이라 조건부 검토가 필요하다.
- C#: external smoke/preflight 10건 통과. generated roundtrip은 없으므로 preflight_only다.
- C++: external smoke/preflight 10건 verify_failed. 원인은 `cmake: not found`다.
- Rust: external smoke/preflight 10건 통과. generated roundtrip은 없으므로 preflight_only다.
- Java: external smoke/preflight 10건 unavailable. 원인은 `mvn ENOENT`다.
- Elixir: external smoke/preflight 10건 통과. generated roundtrip은 없으므로 preflight_only다.

## Truth Gate 보강 상태

DeukPack `scripts/bmt/preflight-matrix.js`는 evidence kind를 기록하도록 보강됐다. JS/Python generated rows는 `generated_roundtrip`, 외부 명령 기반 smoke/preflight는 `external_preflight`로 분리한다.

DeukPack `scripts/bmt/reporter.js`는 generated roundtrip과 external smoke/preflight를 분리 집계한다. external evidence만 있으면 `preflight_only`, benchmark 측정만 있으면 `benchmark_only`로 표시한다.

DeukPack `scripts/bmt/matrix-validator.js`에는 다음 hard gate가 추가됐다.

- `Preflight Truth Gate`: `verify_failed` 또는 `unavailable` preflight가 있으면 실패한다.
- `Third-party Truth Gate`: similar competitor row가 plain object 대체물이거나 dependency install proof가 없으면 실패한다.

현재 hardened validator 기준으로는 실패가 맞다.

## 현재 실패 사유

- C# generated roundtrip 22건 실패:
  - `XTCompact` unpack에서 `Attempted to read past the end of the stream`
  - `XTJson`, `DpPack`, `DpJson`, `DpYaml` 일부 complex/common 모델에서 fixture mismatch
  - `DpZero`, `DpCsv`는 C# `DpFormat`에 매핑되지 않아 unsupported
- Cross-language transfer row 1008건은 runner 미구현으로 `blocked` evidence로 기록됨.
- Legacy compatibility row 128건은 runner 미구현으로 `blocked` evidence로 기록됨.
- Preflight truth gate는 C# generated runner 실패 및 blocked evidence 때문에 166건 실패/불가 상태를 보고함.

## 168번 진행분

2026-05-02 실행에서 BMT 산출물의 “행 없음” 상태를 명시적 `blocked` evidence로 전환했다.

- `/home/joy/workspace/DeukPack/scripts/bmt/orchestrator.js`는 cross-language transfer와 legacy compatibility가 구현되지 않은 경우에도 전체 요구 cell에 대해 `blocked` row를 생성한다.
- `/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`는 이제 해당 row가 존재하지만 `passed`가 아닌 경우, “missing”이 아니라 `blocked`/실패 이유를 직접 보고한다.
- 새 실행 결과:
  - `crossTransferRows`: 1008개, 전부 `blocked`
  - `legacyCompatibilityRows`: 128개, 전부 `blocked`
  - `third-party truth gate`: 통과, direct 12 / similar 12
  - 전체 validator: 14 / 18 통과, 4개 실패

## 판단

BMT는 “테스트가 통과했다”고 보고할 수 없다. 더 정확한 표현은 “third-party proof는 현재 산출물 기준으로 통과하지만, C# generated roundtrip 실패와 cross-language/legacy compatibility 미구현이 truth gate에 의해 실패로 드러나는 상태”다.

generated roundtrip이 실제로 확인된 범위와, 외부 명령이 단순 smoke로만 확인된 범위를 반드시 분리해야 한다. C# generated roundtrip의 protocol별 실패를 먼저 수리하고, cross-language transfer/legacy compatibility runner를 실제 payload proof 기반으로 구현하기 전까지 BMT 결과는 실패 상태로 유지한다.

## 기존 증거 문서

- `.deuk-agent/docs/walkthroughs/153-deukpack-bmt-real-coverage-audit-joy-nucb-report.md`
- `.deuk-agent/docs/walkthroughs/154-deukpack-bmt-run-and-report-joy-nucb-report.md`
- `.deuk-agent/docs/walkthroughs/155-deukpack-bmt-validation-truth-ga-joy-nucb-report.md`
