---
summary: "DeukPack BMT의 미구현 기능과 과장된 테스트 근거를 실제 runner 기준으로 감사한다."
status: active
priority: high
tags:
  - plan
  - phase1
  - deukpack
  - bmt
  - test-coverage
createdAt: "2026-05-01 14:45:47"
---

# DeukPack BMT 실제 커버리지 감사 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
사용자는 DeukPack BMT 관련 기능 미구현과 누락이 많고, 특히 테스트가 가짜에 가까운 경우가 많았다고 지적했다.

과거 DeukAgentRules의 BMT 큐 `135`-`142`는 언어별 누락을 “문서 기준으로 분류”하고 archive했지만, 실제 DeukPack codegen/runtime/benchmark 산출물은 수정하지 않았다. 따라서 해당 큐의 완료 상태는 구현 완료가 아니라 “성공 승격 금지 기준 정리”에 가깝다.

현재 DeukPack BMT 구조에서도 JS/TS/Python 일부는 generated roundtrip runner가 있지만, C#/C++/Rust/Java/Elixir는 언어별 외부 명령 하나가 성공하면 모든 protocol/model row에 같은 passed 상태를 부여하는 coarse preflight 구조다. 이 상태는 실제 protocol별 generated roundtrip 테스트로 보기 어렵다.

## Source Observations
- RAG `search_code`는 DeukPack BMT fake/missing query에서 zero result를 반환했다. 로컬 fallback으로 확인한 증거를 knowledge에 보강했다.
- `.deuk-agent/docs/plans/135-deukpack-bmt-missing-tests-joy-nucb-plan.md`는 `135` 큐가 실제 구현이 아니라 문서 기준 검토/분류 완료라고 명시한다.
- `.deuk-agent/docs/walkthroughs/135-deukpack-bmt-missing-tests-joy-nucb-report.md`는 DeukPack 코드 생성기, 런타임 구현체, benchmark/report 산출물을 수정하지 않았다고 기록한다.
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
