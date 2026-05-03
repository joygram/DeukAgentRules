---
id: 161-auto-doc-language-from-user-prom-joy-nucb
title: auto-doc-language-from-user-prompt
phase: 4
status: closed
docsLanguage: ko
summary: 티켓/plan 생성 시 docsLanguage와 본문 언어를 사용자 현재 프롬프트 언어 기반으로 자동 설정해 수동 언어 변경 낭비를 줄인다.
priority: P2
tags:
  - ticket
  - docs-language
createdAt: 2026-05-01 21:51:19
planLink: .deuk-agent/docs/plans/161-auto-doc-language-from-user-prom-joy-nucb-plan.md
---


# auto-doc-language-from-user-prompt

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `auto-doc-language-from-user-prompt`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **PlanLink:** `.deuk-agent/docs/plans/161-auto-doc-language-from-user-prom-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "티켓/plan 생성 시 docsLanguage와 본문 언어를 사용자 현재 프롬프트 언어 기반으로 자동 설정해 수동 언어 변경 낭비를 줄인다."
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "티켓/plan 생성 시 docsLanguage와 본문 언어를 사용자 현재 프롬프트 언어 기반으로 자동 설정해 수동 언어 변경 낭비를 줄인다."
- Output: minimal implementation and tests that satisfy "티켓/plan 생성 시 docsLanguage와 본문 언어를 사용자 현재 프롬프트 언어 기반으로 자동 설정해 수동 언어 변경 낭비를 줄인다."
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
