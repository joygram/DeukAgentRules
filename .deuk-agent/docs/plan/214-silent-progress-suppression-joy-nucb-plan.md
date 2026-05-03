---
summary: 에이전트룰의 진행 보고 금지를 더 강하게 고정한다
status: draft
priority: P2
tags:
  - agent-rules
  - silent-mode
  - commentary
  - tickets
---

# 214-silent-progress-suppression-joy-nucb

## Problem Analysis

`core-rules/AGENTS.md`의 silent-by-default 규칙은 이미 존재하지만, 실제 운영에서는 진행 보고와 티켓 시작 안내, 최종 답변의 경계가 충분히 강하게 못 박혀 있지 않았다. 그 결과 "업데이트"처럼 보이는 commentary가 다시 등장할 여지가 있었다.

이번 수정의 목표는 해석 여지를 줄이는 것이다. 작업 중에는 진행 보고나 interim summary를 내지 않고, 예외는 ticket-start line, blocker, user decision, final answer만 허용한다는 점을 규칙 문장과 배포 템플릿에 동시에 반영한다.

## Scope

- `/home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md`
- `/home/joy/workspace/DeukAgentRules/PROJECT_RULE.md`
- `/home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md`

## Non-Scope

- Runtime code
- CLI business logic
- Generated artifacts
- Any unrelated rule cleanup

## Plan

1. `core-rules/AGENTS.md`의 silent-by-default 문구를 더 강하게 바꾼다.
2. `PROJECT_RULE.md`에 `DC-SILENT-OUTPUT`를 추가한다.
3. `templates/TICKET_TEMPLATE.md`에 동일한 pre-work commentary 제한을 넣는다.
4. 관련 마크다운 lint로 반영 여부를 확인한다.

## Acceptance Criteria

- 진행 보고, interim summary, "다음 할 일" 내러티브가 규칙에서 명시적으로 금지된다.
- ticket-start line만 허용되는 예외가 규칙과 템플릿 양쪽에 적혀 있다.
- markdown lint가 통과한다.

## Verification

- `npx deuk-agent-rule lint:md /home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md /home/joy/workspace/DeukAgentRules/PROJECT_RULE.md /home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md /home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/sub/214-silent-progress-suppression-joy-nucb.md /home/joy/workspace/DeukAgentRules/.deuk-agent/docs/plan/214-silent-progress-suppression-joy-nucb-plan.md`

## Verification Result

- PASS: markdown lint passed for 5 touched files.
- PASS: core rules now say the ticket-start line is the only allowed pre-work commentary.
- PASS: `PROJECT_RULE.md` and the ticket template both restate the silent-output limit.
