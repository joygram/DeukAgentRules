---
summary: "DeukPack BMT를 실행하고 generated roundtrip/external smoke 분리 기준으로 결과를 보고한다."
status: active
priority: high
tags:
  - plan
  - phase1
  - deukpack
  - bmt
  - verification
createdAt: "2026-05-01 14:56:13"
---

# DeukPack BMT 실행 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
사용자는 BMT를 진행한 뒤 결과 보고를 요청했다. 직전 티켓 153에서 DeukPack BMT Matrix가 generated roundtrip, external smoke/preflight, benchmark-only evidence를 혼동하지 않도록 source/template 패치를 적용했다.

이번 작업은 그 변경을 실제 BMT pipeline에 태워 결과가 어떻게 나오는지 확인하고, 성공/실패/미구현/검증 부족 상태를 과장 없이 보고하는 것이다.

## Source Observations
- DeukPack `package.json`의 BMT 실행 스크립트는 `bench:v2-matrix: node scripts/bmt/orchestrator.js`다.
- `scripts/bmt/orchestrator.js`는 fresh codegen fixtures 생성, preflight matrix, JS/TS/generated runner, report generation, matrix validation을 순서대로 실행한다.
- DeukPack `PROJECT_RULE.md` DC-VERIFY-BMT는 BMT 구조가 mock/hand-rolled 파일을 포함할 수 있으므로 실제 codegen 구조를 fresh build로 확인하라고 요구한다.
- DeukPack worktree는 이미 여러 BMT report/source 파일이 dirty 상태다. 이번 실행은 사용자 승인에 따른 broad BMT output regeneration으로 간주한다.

## Cause Hypotheses
- BMT pipeline이 성공하면 새 `RT`/`SK` 분리 표기가 reports에 반영될 것이다.
- external language preflight 환경(dotnet/cargo/mvn/elixir 등)이 없거나 실패하면 pipeline 전체가 실패할 수 있다.
- matrix validation은 고의적으로 누락을 실패로 잡을 수 있으므로, 실패 자체가 중요한 결과일 수 있다.

## Decision Rationale
사용자가 명시적으로 BMT 진행을 요청했으므로 generated report 산출물 변경을 허용 범위에 포함한다.

단, 수동으로 report 파일을 고치지 않고 `npm run bench:v2-matrix`를 실행해 pipeline 산출물만 받는다. 실패하면 실패 지점과 생성된 부분 산출물을 그대로 보고한다.

## Execution Strategy
DeukPack에서 `npm run bench:v2-matrix`를 실행한다.

실행 후 `benchmarks/out/bmt-latest.json`, `benchmarks/reports/DEUKPACK_TEST_MATRIX.md`, `benchmarks/reports/BMT_PROTOCOL_MATRIX.md`, `benchmarks/reports/BMT_MASTER_REPORT.md`를 읽어 결과를 요약한다.

필요하면 `npm run bench:validate` 또는 orchestrator validation 결과를 기준으로 실패 이유를 분리한다.

## Verification Design
주 검증 명령은 `npm run bench:v2-matrix`다.

성공 기대 결과는 BMT pipeline 완료, report regeneration, matrix validation 통과다.

실패하더라도 generated roundtrip과 smoke/preflight 분리 결과, 실패 언어/프로토콜/환경을 보고한다.

## Execution Result
`npm run bench:v2-matrix`를 `/home/joy/workspace/DeukPack`에서 실행했다.

파이프라인은 fresh codegen fixtures를 `/tmp/deukpack-bmt-1777647470130-e3c7150b`에 생성했고, TypeScript/JavaScript/Python generated runner, JS complex bench, large payload stress, TS Matrix A, report generation, history save, validation gate까지 완료했다.

생성된 주요 산출물은 다음과 같다.

- `/home/joy/workspace/DeukPack/benchmarks/out/bmt-latest.json`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_PROTOCOL_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md`
- `/home/joy/workspace/DeukPack/benchmarks/history/bmt-2.0.0-2026-05-01T14-58-19-862Z.json`

## Result Summary
Validation gate는 14/14 통과했다.

`bmt-latest.json` 기준 `matrixRows`는 84개다. 언어별로 TypeScript 28, JavaScript 28, Python 28이며, subject 기준 DeukPack 60, competitor 24다.

preflight status는 80개다. `generated_roundtrip` 30개는 모두 passed다. `external_preflight` 50개는 passed 30, verify_failed 10, unavailable 10이다.

언어별 preflight 결과는 다음과 같다.

- TypeScript: generated roundtrip passed 10
- JavaScript: generated roundtrip passed 10
- Python: generated roundtrip passed 10
- C#: external preflight passed 10
- C++: external preflight verify_failed 10, 원인 `cmake: not found`
- Rust: external preflight passed 10
- Java: external preflight unavailable 10, 원인 `mvn ENOENT`
- Elixir: external preflight passed 10

새 Matrix 해석 기준에서는 TypeScript/JavaScript가 우선 검토 가능이다. C#과 Python (Pure)는 조건부 검토다. Python (Rust), C++, Java, Rust, Elixir는 보류로 남았다.

## Verification Result
`npm run bench:v2-matrix`는 exit code 0으로 완료했다.

BMT 3D Matrix Hard Validation Gate는 Passed 14 / 14, Failed 0 / 14, Exceptions 0으로 통과했다.

실행 중 Python runtime auto-install 경고가 있었다. 메시지는 `pip install -e "/home/joy/workspace/DeukPack/core/python"`을 제안했지만, pipeline은 계속 진행되어 성공했다.
