---
id: 147-phase1-ticket-creation-plan-doc--joy-nucb
title: phase1-ticket-creation-plan-doc-semantics
phase: 4
status: closed
submodule: DeukAgentRules
project: DeukAgentRules
docsLanguage: ko
summary: Phase 1은 티켓 생성과 계획 기록의 규격화 단계로 정의하고, 티켓 생성 자체를 코드 수정 승인 게이트와 분리한다.
priority: P1
tags:
  - rules
  - tdw
  - phase1
createdAt: 2026-05-01 13:03:58
---


# phase1-ticket-creation-plan-doc-semantics

> Restrict changes to **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, user-facing docs that describe TDW phase semantics.
- **Context Files:** `PROJECT_RULE.md`, `docs/principles.ko.md`, `docs/usage-guide.ko.md`, `docs/how-it-works.ko.md`
- **Design Rationale:** Phase 1 should mean ticket creation and structured planning/reporting for RAG/searchability. It should not create duplicate tickets or force a stop when the user has already requested execution.
- **Constraints:** Keep generated consumer outputs untouched. Keep code-write guard: no code edits until an active ticket exists and execution is authorized.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, focused TDW docs under `docs/`, and this ticket/plan documentation.
- Forbidden modules: generated artifacts, consumer `.cursor/rules/`, consumer `AGENTS.md`, `bin/deuk-agent-rule.js`, unrelated CLI implementation.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN/DC-LEGACY/DC-OSS + `core-rules/AGENTS.md` v18.

### [CONTRACT]
- Input: current TDW phase table, pre-action guards, planLink guidance, and docs explaining Phase 1/2.
- Output: revised rule text that treats ticket creation as Phase 1, treats planLink as indexed planning evidence, and allows execution to continue when explicit user intent exists and Phase 1 artifacts are complete.
- Side effects: rule/docs wording updates only.

### [PATCH PLAN]
- Update `core-rules/AGENTS.md` Phase 1/2 wording and guards so ticket creation is not treated as code modification.
- Clarify that plan documents exist for indexed planning/reporting and should not cause duplicate ticket churn.
- Update Korean docs that currently describe Phase 1 as a hard pre-code stop.

## Tasks

- [x] Read context files and confirm scope.
- [x] Update core TDW phase/guard wording.
- [x] Update focused Korean user docs to match the new semantics.
- [x] Run markdown lint and record results.

## Done When

- Phase 1 is defined as ticket creation plus structured planning evidence, not duplicate-ticket production.
- Explicit execution intent can progress from completed Phase 1 to Phase 2 without an extra approval round, except for high-risk guard cases.
- Markdown lint passes for changed docs.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/147-phase1-ticket-creation-plan-doc--joy-nucb-report.md)
