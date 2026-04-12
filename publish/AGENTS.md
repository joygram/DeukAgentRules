<!-- deuk-agent-rule:begin -->

# Project Agent Rules

## Identity

- **핸드오프 저장 후 채팅**: 파일로 남긴 뒤 채팅에 **`Path: \`루트기준/전체/경로.md\``** 형태로 **한 줄**을 반드시 넣어 다음 세션이 동일 파일을 연다.
- **핸드오프 파일 머리줄(선택)**: 파일 첫 줄에 `**Ticket (repo-relative):** \`경로\`` 또는 동일 경로의 HTML 주석을 두어 검색·스캔에 쓸 수 있다.
- **플랜 UI(선택)**: 플랜 전용 패널에 같은 문서를 띄우려면, 관리 중인 **multi-ai-workflow** 규칙에 적힌 **선택적 미러 경로**(예: `.cursor/plans/*.plan.md`)에 동일 본문을 둘 수 있다. 정본은 `.deuk-agent-ticket/` 또는 `DeukAgentRules/ticket/`를 유지하고 두 곳 내용을 맞출 것.

English sections above are canonical for tooling; this block is a short Korean mirror for the same rules.

## Ticket format & Submodule Isolation

When handing work between tools or people—especially in an environment with multiple submodules like DeukUI, DeukPack, etc.—you **MUST NOT** use free-form markdown. 

You **MUST** use the official Ticket Skeleton Template located at:
`.deuk-agent-templates/TICKET_TEMPLATE.md`

By copying this template to `.deuk-agent-ticket/TICKET-XXX.md` (or `LATEST.md`), you ensure that:
1. The **Target Submodule** is explicitly locked.
2. The agent is forced to read specific **Module Rules** (e.g., `.deuk-agent-templates/MODULE_RULE_TEMPLATE.md`).
3. Execution happens in explicit **Phases** to prevent context bleed.

## 🔗 Ticket Framework & Execution Strategy

When given a ticket, you MUST run commands and write code **strictly within the boundaries** of the `[Target Submodule]` defined in the `TICKET-XXX.md`.

1. **Read the Ticket**: Identify the active `.deuk-agent-ticket/TICKET-XXX.md` file.
2. **Execute Phase**: Process only the checklist for the **Current Phase**. Do not hallucinate or wander into other architectural areas.
3. **Update Status**: Mark checkboxes (`[x]`) as tasks are completed.
4. **Archive on Completion**: When all phases are completed, append the execution report or walkthrough markdown natively at the bottom of the ticket under a `## 📜 Execution Report` header, then move the single file to `.deuk-agent-ticket/archive/TICKET-XXX.md`.

All Tickets are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

<!-- deuk-agent-rule:end -->
