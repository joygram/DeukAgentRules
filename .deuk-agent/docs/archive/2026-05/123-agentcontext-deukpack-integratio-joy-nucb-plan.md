---
summary: "AgentContext와 DeukPack의 init/src install/DpJson schema 통합 리뷰 계획"
status: draft
priority: P2
tags:
  - plan
  - review
  - deukpack
  - agentcontext
  - integration
---

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

- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md .deuk-agent/docs/plans/123-agentcontext-deukpack-integratio-joy-nucb-plan.md`

## Handoff

이 티켓이 닫히면 실제 통합 확인은 `124-deukpack-integration-check-joy-nucb` 또는 새 후속 티켓에서 Phase 2 승인 후 수행한다.
