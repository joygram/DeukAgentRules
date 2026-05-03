---
id: 210-apt-guard-node-reset-otp-port-ma-joy-nucb
title: apt-guard-node-reset-otp-port-macmini
phase: 1
status: open
docsLanguage: ko
summary: apt-guard 관련 b1-cp01/b1-respo 재설정 영향, OTP 웹 가드/포트 충돌 조건, 맥미니 k3s 미편입 시 활용방안 확인
priority: P2
tags: []
createdAt: 2026-05-03 07:57:25
---
# apt-guard-node-reset-otp-port-macmini

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** module/submodule paths directly required by `apt-guard-node-reset-otp-port-macmini`
- **Context Files:** `PROJECT_RULE.md`, relevant architecture docs, and target source files
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket target modules directly related to "apt-guard 관련 b1-cp01/b1-respo 재설정 영향, OTP 웹 가드/포트 충돌 조건, 맥미니 k3s 미편입 시 활용방안 확인"
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing code/context required to implement "apt-guard 관련 b1-cp01/b1-respo 재설정 영향, OTP 웹 가드/포트 충돌 조건, 맥미니 k3s 미편입 시 활용방안 확인"
- Output: minimal implementation and tests that satisfy "apt-guard 관련 b1-cp01/b1-respo 재설정 영향, OTP 웹 가드/포트 충돌 조건, 맥미니 k3s 미편입 시 활용방안 확인"
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Compact planning lives in this ticket.
- Use CLI-linked subissues for related work instead of expanding this ticket.
- Do not duplicate screen progress here.

## Compact Plan

- **Problem:** [Fill only the stable problem statement.]
- **Approach:** [Fill the selected strategy. Keep alternatives out unless they affect risk.]
- **Verification:** [Fill the smallest relevant commands/checks.]
- **Linked Issues:** Use CLI relationship commands for related issues; do not paste child-ticket bodies here.

## Tasks

- [ ] Complete compact plan and APC.
- [ ] Execute changes inside APC boundary.
- [ ] Record verification outcome.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
