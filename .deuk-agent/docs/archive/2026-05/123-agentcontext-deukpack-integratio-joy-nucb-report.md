---
summary: "AgentContext-DeukPack init/src install/DpJson schema 통합 리뷰 보고서"
status: complete
priority: P2
tags:
  - report
  - review
  - deukpack
  - agentcontext
  - integration
---

# AgentContext-DeukPack 통합 리뷰 보고서

## 리뷰 범위

이 티켓은 실행 전 리뷰 전용으로 처리했다. DeukAgentContext, DeukPack, DeukAgentRules 제품 코드와 generated output은 수정하지 않았다.

## 확인한 연결점

- `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`
  - Python output만 활성화되어 있고 `outputDir`은 `deuk_idl`이다.
  - Python core option은 `rust-wrap`이다.
- `/home/joy/workspace/DeukAgentContext/package.json`
  - `devDependencies.deukpack`은 `file:../DeukPack`이다.
  - `deukpack:dev-link`와 `deukpack:release-guard` 스크립트가 있다.
- `/home/joy/workspace/DeukAgentContext/scripts/deukpack_dev_link.sh`
  - sibling DeukPack source를 npm install로 연결하고 Poetry 환경을 동기화한다.
  - cargo가 있으면 `maturin develop`으로 native extension을 빌드한다.
  - `node_modules/deukpack` symlink와 `deukpack_core` import를 확인한다.
- `/home/joy/workspace/DeukPack/package.json`
  - `install:src`, `install:src:quick`, `build`, `verify`, `verify:quick` 등 통합 확인에 필요한 진입점이 있다.
  - DpJson runtime/source는 DeukPack 쪽 source/runtime 레이어에서 관리된다.

## 리스크

- `npm install`, `poetry install`, `maturin develop`, codegen/build는 broad side effect가 있으므로 후속 실행 티켓에서 승인 후 실행해야 한다.
- DpJson/schema 문제가 발견되더라도 generated/dist-test 산출물을 직접 수정하면 안 된다.
- DeukAgentContext pipeline config와 DeukPack generator/runtime 중 실제 원천 소유자를 먼저 구분해야 한다.

## 후속 실행 기준

- 실제 통합 확인은 `124-deukpack-integration-check-joy-nucb` 또는 새 후속 티켓에서 Phase 2 승인 후 수행한다.
- 첫 단계는 read-only 상태 점검이어야 한다.
- 설치/build/codegen이 필요하면 dry-run 또는 `/tmp` 출력 우선으로 검토한다.
- 수정이 필요하면 DeukAgentContext pipeline config, DeukPack generator/runtime, DeukAgentRules rule linkage 중 소유 경계를 분리한다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md .deuk-agent/docs/plans/123-agentcontext-deukpack-integratio-joy-nucb-plan.md`: 통과.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/123-agentcontext-deukpack-integratio-joy-nucb.md .deuk-agent/docs/plans/123-agentcontext-deukpack-integratio-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/123-agentcontext-deukpack-integratio-joy-nucb-report.md`: 통과.
