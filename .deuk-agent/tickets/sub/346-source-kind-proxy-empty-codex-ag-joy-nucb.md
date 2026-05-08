---
id: 346-source-kind-proxy-empty-codex-ag-joy-nucb
title: source-kind-proxy-empty-codex-agentflow
phase: 4
status: closed
lifecycleSource: ticket-create
docsLanguage: ko
summary: kind source에서만 빈 Codex AgentFlow 탐색을 허용하고 일반 사용자 무설정 프록시 오동작 수정
priority: P2
tags: []
createdAt: 2026-05-08 20:29:28
---


# Phase 1 Plan

## APC

### [BOUNDARY]
- 요청 범위: 직전 AgentFlow 수정 사항을 포함해 커밋 준비를 하고, 추가로 kind source일 때만 빈 Codex AgentFlow 탐색/프록시 처리가 일어나게 하여 일반 사용자 설정이 없는데도 프록시 처리되는 오류를 수정한다. 또한 티켓 스타트 링크가 승인 대기/최종 응답에서 다시 묻히는 현재 출력 문제를 함께 바로잡는다.
- 대상 저장소: /home/joy/workspace/DeukAgentFlow.
- 예상 변경: CLI proxy/source-kind detection 또는 init/skill/proxy 관련 scripts/bin 경로. 행동 수정이면 package.json/package-lock.json patch version bump가 필요할 수 있으나 직전 작업에서 이미 4.0.23 bump가 포함되어 있어 중복 bump 여부는 변경 성격과 현재 diff를 확인해 판단한다.
- 제외: DeukPack 플러그인 UI 진단, OSS sync, tag/release 생성.

### [CONTRACT]
- Core rules v65와 PROJECT_RULE.md를 따른다.
- bin proxy에는 로직을 넣지 않고 real logic은 scripts/에 둔다.
- 기존 사용자 변경을 되돌리지 않는다.
- 커밋은 검증 및 티켓 기록 후 수행한다.

### [PATCH PLAN]
- 승인 후 현재 변경 상태와 proxy/source-kind 관련 코드를 좁게 확인한다.
- 일반 사용자 무설정 상태에서 프록시 처리되는 조건을 찾아 kind source일 때만 허용하도록 수정한다.
- 티켓 스타트 링크가 승인 대기 화면에서 최종적으로 다시 노출되도록 출력 계약과 실제 응답/CLI 경로를 확인한다.
- 필요한 최소 검증을 실행한다.
- 직전 수정과 이번 수정을 함께 의미 있는 커밋으로 만든다.

## Compact Plan
1. 승인 후 관련 proxy/source-kind 탐색 경로와 현재 diff를 확인한다.
2. kind source 조건 누락 원인을 찾는다.
3. scripts/ 소스에서 조건을 보강한다.
4. focused test 또는 smoke command로 검증한다.
5. 티켓에 completion report를 기록하고 커밋한다.

## Problem Analysis
사용자는 일반 사용자 설정이 없는 상황에서도 프록시 처리가 일어나는 오류를 지적했다. 의도는 source kind일 때만 빈 Codex AgentFlow를 찾아 처리하고, 일반 사용자/무설정 상태에서는 그 프록시 경로를 타지 않게 하는 것이다.

## Source Observations
- 직전 작업에서 archive markdown lint 파일 링크 제외와 approval-pending 티켓 링크 재노출 수정이 완료되어 working tree에 남아 있다.
- 사용자 추가 요청: "커밋하고 카인드 소스일때만 빈 코드 에이전트 플로에서 찾게 일반사용자 설정없는데도 프록시 처리하는 오류 수정".
- 사용자 추가 지적: "티켓스타트 여전히 대화안에 뭍힘".
- PROJECT_RULE.md: CLI logic은 scripts/에서 수정하고 bin proxy에는 로직 변경을 넣지 않는다.

## Cause Hypotheses
- proxy/source discovery가 kind 값을 확인하지 않고 Codex/AgentFlow 후보를 탐색할 수 있다.
- 사용자 설정이 비어 있는 상태를 source mode로 오인하는 fallback이 있을 수 있다.
- bin proxy 또는 deploy/source kind helper가 일반 설치 경로와 source workspace 경로를 분리하지 못할 수 있다.

## Improvement Direction
- kind source가 명시된 경우에만 source workspace/Codex AgentFlow fallback을 허용한다.
- 무설정 일반 사용자는 package-local/default path만 사용하고 source proxy fallback을 타지 않게 한다.
- 승인 대기/최종 대기 응답에도 현재 활성 티켓 링크가 독립적으로 보이게 한다.
- 검증은 조건 분기 중심의 기존 테스트 또는 최소 smoke로 제한한다.

## Audit Evidence
- Prior active ticket 345 closed with verification and patch bump 4.0.23.
- This ticket covers new scope plus requested commit action.

## User Correction
- 2026-05-09 05:30:16 KST: 사용자가 "티켓스타트 여전히 대화안에 뭍힘"이라고 지적해 현재 승인 대기/최종 응답에서 티켓 링크가 독립 노출되지 않는 문제를 scope에 추가했다.

## Approval
- 2026-05-09 05:30:53 KST: 사용자가 갱신된 scope에 대해 "승인"으로 명시 승인했다.

## Phase Contract
- Required fields/tasks: cause, analysis, design/approach, approval, local evidence, verification, completion report, commit record.
- Local evidence required: source-kind CLI argument/config persistence, source shim/proxy gate, approval-pending ticket link visibility rule.
- RAG: not required; local CLI source is sufficient.
- Scope boundaries: AgentFlow source only; do not edit DeukPack or OSS mirror directly.
- Generated/source mapping: scripts and core rules are source; bin remains a proxy wrapper with no business logic.
- Verification: focused source-kind gate assertion, rules lint, focused init/commentary/ticket tests, diff whitespace check.

## Findings
- `runInit` always called `ensureSourceModeCommandShims` unless `sourceShims` was explicitly false. That made normal init flows probe/install source-mode command shims even when no user/source configuration existed.
- `parseArgs` did not accept `--kind`, so init could not explicitly carry `kind=source` into the source-mode decision.
- `writeInitConfig` did not persist `kind`, so a configured source workspace could not retain that mode for later init runs.
- The global proxy already had a local-source opt-in shape; it now also recognizes `DEUK_AGENT_FLOW_KIND=source` while defaulting to bundled CLI for ordinary users.
- The ticket visibility issue needed a stricter rule: approval-pending responses must start with the `Ticket start` line, not merely include it somewhere in the surrounding explanation.

## Changed Files
- `scripts/cli-init-commands.mjs`: added `shouldEnsureSourceModeCommandShims` and gated source shim creation to `kind=source`/`sourceKind=source`.
- `scripts/cli-args.mjs`: added `--kind` parsing for init/merge args.
- `scripts/cli-utils.mjs`: persists `kind` in `.deuk-agent/config.json`.
- `bin/deuk-agent-flow.js`: source routing remains opt-in and also accepts `DEUK_AGENT_FLOW_KIND=source`.
- `core-rules/AGENTS.md`: approval-pending contract now requires the first visible line to be the clickable ticket-start line.
- Prior included fix files from ticket 345 remain part of this commit set: `scripts/lint-md.mjs`, `scripts/commentary-session-harness.mjs`, `package.json`, `package-lock.json`.

## Verification
- PASS: focused source-kind gate assertion via `node --input-type=module - <<'NODE' ... NODE`.
- PASS: `node scripts/lint-rules.mjs`
- PASS: `node --test scripts/tests/cli-init-commands.test.mjs scripts/tests/commentary-session-harness.test.mjs scripts/tests/cli-ticket-commands.test.mjs`
- PASS: `git diff --check -- bin/deuk-agent-flow.js core-rules/AGENTS.md scripts/cli-args.mjs scripts/cli-init-commands.mjs scripts/cli-utils.mjs scripts/lint-md.mjs scripts/commentary-session-harness.mjs package.json package-lock.json .deuk-agent/tickets/sub/346-source-kind-proxy-empty-codex-ag-joy-nucb.md`

## Completion Report
- Outcome: normal users without source config no longer hit source shim/proxy discovery; source routing is limited to `kind=source`, `sourceKind=source`, `DEUK_AGENT_FLOW_USE_LOCAL`, or `DEUK_AGENT_FLOW_KIND=source` opt-ins.
- Verified scope: source-kind gate, existing focused init/commentary/ticket behavior, rules audit, whitespace check.
- Unverified scope: full `npm test` was not run because the focused command already covered the changed surfaces and the repo has unrelated dirty work.
- Residual risk: several files had pre-existing dirty changes; commit staging must avoid unrelated hunks where possible.
- Follow-up decision: no-follow-up.
- Commit: `4554cb3 fix agentflow source-mode proxy gating`.
- Commit: `62ba204 fix source-kind init gating`.
