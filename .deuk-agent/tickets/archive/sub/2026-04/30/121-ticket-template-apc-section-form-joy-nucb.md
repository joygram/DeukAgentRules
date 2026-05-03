---
id: 121-ticket-template-apc-section-form-joy-nucb
title: ticket-template-apc-section-format
phase: 4
status: closed
docsLanguage: ko
summary: 티켓 생성 템플릿의 APC 형식을 Phase 승급 검증기가 요구하는 [BOUNDARY], [CONTRACT], [PATCH
  PLAN] 섹션 구조와 일치시킨다.
priority: high
tags:
  - templates
  - ticket
  - apc
  - cli
createdAt: 2026-04-30 20:57:02
---


# ticket-template-apc-section-format

> 변경은 선언된 **Target Module**로 제한한다. 코드 생성 전에 **Context Files**를 먼저 읽는다.

## Scope & Constraints
- **Target:** `templates/TICKET_TEMPLATE.md`
- **Context Files:** `PROJECT_RULE.md`, `templates/TICKET_TEMPLATE.md`, `scripts/cli-ticket-commands.mjs`, `docs/usage-guide.ko.md`
- **Design Rationale:** 티켓 생성 템플릿은 표 기반 APC를 만들지만 Phase 2 승급 검증기는 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]` 섹션만 인정한다. 새 티켓이 생성 직후부터 검증기와 일치하도록 템플릿을 고친다.
- **Constraints:** CLI 비즈니스 로직은 변경하지 않는다. 템플릿 포맷만 검증기와 문서에 맞춘다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `templates/TICKET_TEMPLATE.md`, `.deuk-agent/docs/plans/**`
- Forbidden modules: `scripts/**`, `bin/**`, `core-rules/**`, generated consumer outputs
- Rule citation: `PROJECT_RULE.md` Module Ownership says `templates/` is editable and distributed to consumers via `init`.

### [CONTRACT]
- Input: 표 기반 APC 템플릿과 섹션 기반 승급 검증기 사이의 불일치
- Output: 새 티켓이 생성될 때 승급 검증기와 일치하는 섹션 기반 APC skeleton
- Side effects: 이후 생성되는 티켓 markdown 기본 구조 변경

### [PATCH PLAN]
- `templates/TICKET_TEMPLATE.md`: APC 표와 별도 `## Patch Plan` 표를 제거하고 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]` skeleton으로 교체한다.
- `templates/TICKET_TEMPLATE.md`: placeholder 문구는 CLI placeholder 검출과 사용자가 채우기 쉬운 형태로 유지한다.

## Tasks
- [x] 템플릿과 CLI 승급 검증 형식 불일치 확인
- [x] `TICKET_TEMPLATE.md`를 섹션 기반 APC 형식으로 수정
- [x] lint 및 최소 생성/검증 시나리오 확인

## Done When
> 새 티켓 템플릿의 APC 구조가 CLI 승급 검증기와 일치하고, markdown lint가 통과한다.
