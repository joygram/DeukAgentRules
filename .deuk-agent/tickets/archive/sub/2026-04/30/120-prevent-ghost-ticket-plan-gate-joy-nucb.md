---
id: 120-prevent-ghost-ticket-plan-gate-joy-nucb
title: prevent-ghost-ticket-plan-gate
phase: 4
status: closed
docsLanguage: ko
summary: 티켓 발행 시 planLink 실행문서 누락 방지를 위한 AGENTS.md 게이트 강화
priority: high
tags:
  - rules
  - ticket-lifecycle
  - governance
createdAt: 2026-04-30 10:03:44
---


# prevent-ghost-ticket-plan-gate

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `core-rules/AGENTS.md`의 Ticket Lifecycle/Pre-Action Guards/Docs 규칙 강화
- **Context Files:** `core-rules/AGENTS.md`, DeukAgentRules 티켓 템플릿, 최근 고스트 티켓 사례
- **Design Rationale:** ticket create만 수행되고 planLink 실행문서가 생성되지 않으면 고스트 티켓이 발생하여 추적성과 실행력이 떨어짐
- **Constraints:** 규칙 문서 외 코드 변경 금지, 기존 CLI 명령 호환성 유지, 강제 검증 규칙은 최소 침습으로 추가

## Agent Permission Contract (APC)

### [BOUNDARY]
- **변경 가능한 모듈:** `core-rules/AGENTS.md`, `.deuk-agent/tickets/sub/120-*.md`, `.deuk-agent/docs/plans/120-*.md`
- **변경 금지 모듈:** `core-rules` 외 코드/스크립트, 런타임 소스, 배포 아티팩트

### [CONTRACT]
- **input:** 사용자 요청("티켓발행시 실행문서 누락 원인 확인 + 룰 개선")
- **output:** 고스트 티켓 방지 규칙(G1.2/Phase1 완료조건/검증 항목) 반영된 AGENTS.md
- **side effects:** 티켓 생성 직후 plan 문서 생성/검증 절차가 의무화되어 작업 초기 오버헤드가 소폭 증가
- **Rule Citation:** G1, G1.1, Ticket Lifecycle, Docs & Artifacts

### [PATCH PLAN]
- **file:** `core-rules/AGENTS.md` | **function:** `Pre-Action Guards` | **change:** planLink 미생성/placeholder 감지 시 하드 블록 규칙 추가
- **file:** `core-rules/AGENTS.md` | **function:** `Ticket Lifecycle` | **change:** Phase 1 완료 조건에 실행 가능한 plan 문서 필수화
- **file:** `core-rules/AGENTS.md` | **function:** `Docs, Artifacts & Platform` | **change:** 티켓/플랜 동시 lint 및 존재성 검증 절차 추가

| Field | Value |
|-------|-------|
| Editable modules | `core-rules/AGENTS.md`, ticket/plan artifacts for 120 |
| Forbidden modules | runtime/source code outside rules docs |
| Input | user request to prevent ghost tickets by rule improvement |
| Output | enforceable rule text that requires executable plan artifacts |
| Side effects | stricter phase-1 gating and additional lint step |
| Rule citation | AGENTS.md Section 2, 3, 6 |

## Patch Plan

| File | Function | Change |
|------|----------|--------|
| `core-rules/AGENTS.md` | Pre-Action Guards | add plan artifact gate before execute writes |
| `core-rules/AGENTS.md` | Ticket Lifecycle | require plan file creation/completeness in Phase 1 |
| `core-rules/AGENTS.md` | Docs, Artifacts | require ticket+plan lint pair validation |

## Tasks
- [x] AGENTS.md에 고스트 티켓 방지 가드(G1.2) 추가
- [x] Phase 1 완료 조건에 planLink 실행문서 존재/완성 기준 추가
- [x] 문서 검증 절차에 ticket+plan 동시 lint 규칙 추가

## Done When
> AGENTS.md에 고스트 티켓 방지 규칙이 반영되고, 새 티켓 생성 시 "ticket + plan 문서 + lint 통과"가 최소 완료 기준으로 명시되면 완료.
