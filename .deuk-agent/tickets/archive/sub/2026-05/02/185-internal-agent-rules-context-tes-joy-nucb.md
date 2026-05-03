---
id: 185-internal-agent-rules-context-tes-joy-nucb
title: internal-agent-rules-context-test
phase: 3
status: closed
docsLanguage: ko
summary: 내부 에이전트룰 개선 사항과 컨텍스트 연결을 검증하는 테스트 작업
priority: P2
tags: []
createdAt: 2026-05-02 11:29:11
---


# internal-agent-rules-context-test

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `internal-agent-rules-context-test`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/185-internal-agent-rules-context-tes-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown or missing linked artifacts.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "내부 에이전트룰 개선 사항과 컨텍스트 연결을 검증하는 테스트 작업"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "내부 에이전트룰 개선 사항과 컨텍스트 연결을 검증하는 테스트 작업"
- Output: minimal implementation and tests that satisfy "내부 에이전트룰 개선 사항과 컨텍스트 연결을 검증하는 테스트 작업"
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Add a regression test for strict ticket create placeholder rejection and rollback.
- [x] Verify the current MCP/context connection path and keep reusable facts in DeukAgentContext.
- [x] Run markdown lint and the targeted test command, then record the result.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket and planLink without manual lint intervention.
