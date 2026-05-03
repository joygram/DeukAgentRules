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

- PASS: `npx deuk-agent-rule lint:md /home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md /home/joy/workspace/DeukAgentRules/PROJECT_RULE.md /home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md /home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/sub/214-silent-progress-suppression-joy-nucb.md /home/joy/workspace/DeukAgentRules/.deuk-agent/docs/plan/214-silent-progress-suppression-joy-nucb-plan.md`
- PASS: `rg -n "silent-by-default|interim summaries|what I will do next|DC-SILENT-OUTPUT|ticket-start line" /home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md /home/joy/workspace/DeukAgentRules/PROJECT_RULE.md /home/joy/workspace/DeukAgentRules/templates/TICKET_TEMPLATE.md`

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
