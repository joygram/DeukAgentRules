---
id: 201-deukagent-workspace-layout-unifi-joy-nucb
title: deukagent-workspace-layout-unification
phase: 4
status: closed
docsLanguage: ko
summary: i 및 workspace 전체 .deuk-agent 디렉토리 구조 정합화
priority: P2
tags: []
createdAt: 2026-05-02 23:06:41
planLink: .deuk-agent/docs/archive/plans/2026-05/201-deukagent-workspace-layout-unifi-joy-nucb-plan.md
---


# deukagent-workspace-layout-unification

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `deukagent-workspace-layout-unification`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/archive/plans/2026-05/201-deukagent-workspace-layout-unifi-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "i 및 workspace 전체 .deuk-agent 디렉토리 구조 정합화"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "i 및 workspace 전체 .deuk-agent 디렉토리 구조 정합화"
- Output: minimal implementation and tests that satisfy "i 및 workspace 전체 .deuk-agent 디렉토리 구조 정합화"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.

## Execution Outcome

- i 대상 정리: `/home/joy/workspace/i`에서 `node /home/joy/workspace/DeukAgentRules/bin/deuk-agent-rule.js init --approval approved`를 재실행하여 `ticket archive` 정합성(legacy 이동 정리/빈 폴더 제거)을 반영함.
- 전체 2차 정리: `/home/joy/workspace` 아래 22개 `.deuk-agent` 경로에 대해 `npx` init(실패 시 Node 직접 실행으로 보정) 재실행 수행.
- 결과 판독: 즉시 확인 기준에서 `docs/archive/plans/walkthroughs`, `tickets/sub|archive` 위주로 표준 레이아웃 복구 확인, 404/오류 기반 추가 잔해 디렉토리 미검출.
- 확인되지 않은 잔여: `DeukPack`의 특정 plan 충돌 2건은 내용 충돌로 스킵되어 수동 병합 대상 확인 필요.
- 추가 반영(루트 원인 보완):
  - `scripts/cli-init-commands.mjs`의 `canonicalizeAgentTicketsLayout`에서 `tickets/archive` 하위 루트에 직접 존재하는 `.md` 파일을 무시하던 로직을 보완.
  - 수정으로 이제 `archive` 루트 파일도 `routeMisplacedTicketFile` 경로로 재분류되어 정렬되도록 함.
  - 보완 후 `apt-guard` 정합성 경로(`TICKET-002`, `TICKET-003`)가 `tickets/archive/sub/2026-05/03/`로 복귀.
- 재점검 결과: `node /tmp/deuk-agent-strict-audit.mjs` 기준 `/home/joy/workspace` 내 `.deuk-agent`는 `CLEAN` 처리(추가 이상 디렉토리 미검출).
