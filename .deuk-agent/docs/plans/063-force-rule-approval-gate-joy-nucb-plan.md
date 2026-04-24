---
id: 063-force-rule-approval-gate-joy-nucb
title: "force-rule-approval-gate"
language: en
createdAt: 2026-04-24 01:17:01
---

# Plan: force-rule-approval-gate

## Summary
- 목적: plan mode와 execution mode를 분리하고, 승인 전에는 rule injection과 file mutation이 진행되지 않도록 강제하는 workflow gate를 추가합니다.
- 범위: `DeukAgentRules` CLI, merge/init flow, workflow documentation, and approval-state persistence.
- 비범위: ticket storage format 변경, unrelated submodule refactor, external agent product redesign.

## Current Gaps
- `agentsMode`는 현재 `inject`가 기본값이라 승인 없이도 write 경로로 흐를 수 있습니다.
- `applyAgents()`는 skip/overwrite 외에는 advisory-only 분기가 없습니다.
- 문서에는 `STOP & WAIT`가 있지만 런타임에서 승인 조건을 강제하지 않습니다.

## Design Decisions
- Approval is a first-class runtime state, not a documentation convention.
- Preparation and mutation must be separated.
- Default behavior in unapproved plan mode should be advisory-only.
- CLI help and config persistence must reflect the enforced workflow.

## Implementation Plan
1. Add explicit approval/workflow state to config loading and persistence.
2. Change init/merge paths so they can prepare output without mutating files when approval is missing.
3. Add a CLI-visible approval boundary and update help text.
4. Align workflow docs and AGENTS guidance with the runtime gate.

## Verification Plan
- Run the CLI smoke path for init/merge in approved and unapproved states.
- Verify that plan mode does not write files before approval.
- Verify that approved mode still preserves existing ticket/template behavior.
- Run the relevant test command for the package and inspect the output.

## Risks
- Existing automation may assume inject-by-default behavior and need migration handling.
- Approval state persistence may conflict with older config files if not normalized carefully.
- CLI users may rely on the previous implicit write path and need updated docs.

## Acceptance Criteria
- Plan mode can prepare context without mutating files.
- Mutation is blocked until approval is explicit.
- Documentation matches runtime behavior.
- Existing ticket create/use flows remain intact.
