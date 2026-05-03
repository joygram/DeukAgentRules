---
id: 214-silent-progress-suppression-joy-nucb
title: silent-progress-suppression
phase: 4
status: closed
docsLanguage: ko
summary: 에이전트룰에서 작업 중 진행 보고를 최소화하고, 승인 전에는 추가 commentary를 금지
priority: P2
tags: []
createdAt: 2026-05-03 08:17:42
---


# silent-progress-suppression

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep planning compact in this ticket. Do not mirror screen progress here.

## Scope & Constraints

- **Target:** `/home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md`, `/home/joy/workspace/DeukAgentRules/PROJECT_RULE.md`, `/home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md`
- **Context Files:** `/home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md`, `/home/joy/workspace/DeukAgentRules/PROJECT_RULE.md`, `/home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md`
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval. Keep the change limited to rule wording and template mirroring.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: core rule text and distributed template text that define progress narration behavior
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, runtime/source code
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current rule wording that still allows interim narration to be interpreted as acceptable commentary
- Output: explicit rule text that forbids progress narration except the required ticket-start line, blocker notices, user decisions, and final answers
- Side effects: ticket/plan docs updates and markdown lint coverage only

### [PATCH PLAN]
- Problem analysis, exact wording, and verification notes live in the linked plan file.
- Keep the ticket as the compact SSoT for scope, APC, and lifecycle status.
- Use CLI-linked subissues for unrelated follow-up work instead of expanding scope.

## Compact Plan

- **Problem:** The current agent rules still leave room for commentary that reads like progress reporting, which is what surfaced again in the DeukAgentRules session.
- **Approach:** Strengthen the core silent-by-default rule, add a dedicated DC guard in `PROJECT_RULE.md`, and mirror the same prohibition in the ticket template so future tickets inherit the stop condition.
- **Verification:** Run markdown lint on the touched rule files and confirm the new silent-output language is present exactly once in each target file.
- **Linked Issues:** None.

## Tasks

- [x] Complete compact plan and APC.
- [x] Create the linked plan file with the detailed analysis trail.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Result

- PASS: `npx deuk-agent-rule lint:md /home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md /home/joy/workspace/DeukAgentRules/PROJECT_RULE.md /home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md /home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/sub/214-silent-progress-suppression-joy-nucb.md /home/joy/workspace/DeukAgentRules/.deuk-agent/docs/archive/2026-05/214-silent-progress-suppression-joy-nucb-plan.md`
- PASS: `rg -n "silent-by-default|interim summaries|what I will do next|DC-SILENT-OUTPUT|ticket-start line" /home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md /home/joy/workspace/DeukAgentRules/PROJECT_RULE.md /home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
## Merged Legacy Document

### 214 silent progress suppression joy nucb plan

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
