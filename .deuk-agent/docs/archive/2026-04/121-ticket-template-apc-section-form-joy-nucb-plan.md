---
summary: 티켓 생성 템플릿의 APC skeleton을 Phase 승급 검증기와 일치시킨다.
status: in_progress
priority: high
tags:
  - templates
  - ticket
  - apc
  - cli
---

# 목표

새 티켓이 생성 직후부터 Phase 2 승급 검증기가 요구하는 APC 구조를 갖도록 `templates/TICKET_TEMPLATE.md`를 수정한다.

# 원인

현재 템플릿은 `## Agent Permission Contract (APC)` 아래에 표를 생성한다. 반면 CLI 승급 검증기는 같은 APC 블록 안에서 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]` 섹션을 정규식으로 찾는다.

# 변경 계획

1. `templates/TICKET_TEMPLATE.md`의 표 기반 APC를 섹션 기반 skeleton으로 바꾼다.
2. 별도 `## Patch Plan` 섹션은 제거하고 APC 내부 `### [PATCH PLAN]`에 통합한다.
3. placeholder는 사용자가 채울 위치를 알 수 있게 두되, 승급 전 반드시 교체해야 하는 형태로 유지한다.
4. `npx deuk-agent-rule lint:md`로 티켓과 계획서를 검증한다.

# 검증

1. 현재 티켓과 계획서 markdown lint 통과.
2. 템플릿에 `### [BOUNDARY]`, `### [CONTRACT]`, `### [PATCH PLAN]`가 존재하는지 확인.
3. 새 티켓 생성 시 같은 skeleton이 들어갈 수 있음을 템플릿 기준으로 확인.
