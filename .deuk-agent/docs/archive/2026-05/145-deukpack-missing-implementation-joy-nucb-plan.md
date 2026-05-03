---
summary: "DeukPack 누락 구현 범위를 확인하고 실행 가능한 구현 계획을 수립한다."
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 09:25:29"
---

# Execution Plan

## Goal
- `ticket next --submodule DeukPack`가 DeukPack 범위의 active/open 티켓을 선택하도록 누락된 필터 구현을 보완한다.

## Evidence
- `scripts/cli-args.mjs`는 `--submodule`과 `--project`를 파싱한다.
- `scripts/cli.mjs` 도움말은 `--submodule <name>`을 티켓 옵션으로 노출한다.
- `scripts/cli-ticket-commands.mjs`의 `runTicketList`는 `project/submodule` 필터를 적용하지만, `pickTicketEntry`와 `runTicketNext`는 현재 필터 없이 전체 인덱스에서 선택한다.
- `PROJECT_RULE.md`에 따라 CLI 비즈니스 로직은 `scripts/`에서 수정하고 `bin/deuk-agent-rule.js`는 수정하지 않는다.

## Steps
- [x] `scripts/cli-ticket-commands.mjs`에 티켓 엔트리 필터 헬퍼를 추가하거나 기존 선택 로직에 동등한 필터를 적용한다.
- [x] `pickTicketEntry(opts, indexJson)`가 `opts.project`와 `opts.submodule`을 먼저 반영한 뒤 topic/id/latest 선택을 수행하도록 변경한다.
- [x] `runTicketNext(opts)`가 필터링된 목록에서 active 우선, 없으면 open 우선, 생성일 오름차순 선택을 유지하도록 변경한다.
- [x] `scripts/tests/`에 기본 선택 동작과 `--submodule DeukPack` 필터 동작을 검증하는 회귀 테스트를 추가한다.
- [x] 결과가 기존 `ticket list` 필터와 충돌하지 않는지 확인한다.

## Verification
- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/145-deukpack-missing-implementation-joy-nucb.md .deuk-agent/docs/plans/145-deukpack-missing-implementation-joy-nucb-plan.md`
- [x] 임시 fixture 기반 `runTicketNext({ submodule: "DeukPack", pathOnly: true })` 테스트로 DeukPack 티켓 선택을 확인한다.

## Expected Outcomes
- `--submodule` 또는 `--project`가 없으면 기존 next/use/archive 계열 선택 의미가 유지된다.
- `--submodule DeukPack`가 있으면 DeukPack 티켓만 후보가 된다.
- 필터 결과가 없을 때는 명확한 “no matching entry” 또는 “No active or open tickets” 계열 오류가 발생한다.
