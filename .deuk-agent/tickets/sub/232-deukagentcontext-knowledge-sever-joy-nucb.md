---
id: 232-deukagentcontext-knowledge-sever-joy-nucb
title: deukagentcontext-knowledge-severity
phase: 4
status: closed
docsLanguage: en
summary: DeukAgentContext knowledge categorization and consolidation updates are
  incorrect
priority: P2
tags: []
createdAt: 2026-05-03 10:55:14
---


# deukagentcontext-knowledge-severity

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** `core-rules/AGENTS.md`, `templates/rules.d/deukcontext-mcp.md`, ticket template/create logic if needed, and focused tests/docs directly required by this regression.
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, `scripts/cli-init-commands.mjs`, existing DeukAgentContext/RAG quality tickets, and MCP RAG evidence.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval. DeukAgentContext server implementation changes require a separate approved ticket.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: DeukAgentRules rule hub/template protocol, investigation ticket lifecycle wording/templates, archive knowledge metadata design notes, and focused tests.
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, and DeukAgentContext server source without a separate ticket.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: user-reported DeukAgentContext knowledge/consolidate abnormality, local archive knowledge schema, prior RAG quality tickets, and the follow-up process defect where analysis was not recorded before asking the user.
- Output: ticket-held analysis plus workflow/rule improvements that require investigation findings to be written into the ticket before asking clarification, then tell the user to review the ticket.
- Side effects: ticket updates, scoped code changes only

### [PATCH PLAN]
- Record the current root-cause analysis and improvement direction in this ticket first.
- Update rule/template language so investigation, regression, and quality tickets must capture facts, hypotheses, improvement direction, and open questions before clarification.
- If code enforcement is small and local, add a focused guard/test; otherwise keep enforcement as rule-level until a separate CLI hardening ticket.

## Compact Plan

- **Problem:** DeukAgentContext knowledge entries do not clearly distinguish rule/source/ticket/dynamic origin, and the process defect is that the analysis was reported in chat before being written into this ticket.
- **Approach:** Treat this as both a product-data issue and a workflow issue. Product direction is source-aware ingestion metadata and category-aware consolidation. Workflow direction is "record analysis first, ask only unresolved questions, then point the user to the ticket."
- **Verification:** Lint modified markdown and run focused tests for any changed ticket/template behavior.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Problem Analysis

DeukAgentContext knowledge currently behaves as if all retrieved knowledge can be interpreted similarly, while the user expects each item to preserve whether it came from rules, source code, tickets, or dynamic ingestion. The visible symptom is that knowledge appears source-like even when it is not, and consolidate refresh does not feel trustworthy because stale or differently sourced entries are not clearly separated.

The process defect in this ticket is separate but related: the root-cause analysis and improvement direction were first explained in chat, and only after the user asked why it was not in the ticket did the gap become explicit. For investigation tickets, that order is wrong. The ticket must be the durable record before clarification questions or chat summaries.

## Source Observations

- `distillKnowledge()` in `scripts/cli-ticket-commands.mjs` writes archived ticket knowledge with `id`, `title`, `project`, `summary`, `sourceTicketPath`, `sections`, and `analysis`.
- The archived knowledge schema does not require fields such as `sourceKind`, `ingestionCategory`, `corpus`, `originTool`, `freshness`, or `refreshPolicy`.
- `classifyAgentFileTarget()` in `scripts/cli-init-commands.mjs` checks for distilled knowledge JSON shape, but that shape only proves that a JSON file is ticket-derived knowledge, not what kind of knowledge it semantically represents.
- Prior ticket evidence already identified placeholder/stale/duplicate RAG results and archive knowledge quality gaps, but the current ticket template still allows a vague `Compact Plan` to stand in for actual investigation analysis.
- The MCP RAG lookup for this specific "record analysis before clarification" rule returned a miss, so this ticket records the local finding directly.

## Cause Hypotheses

- Knowledge ingestion metadata is too generic, so downstream search and consolidate cannot reliably separate rule, source, ticket, and dynamic knowledge.
- Archive distillation preserves ticket sections but does not make the knowledge category explicit enough for downstream consolidation.
- The rule flow says Phase 1 owns APC and compact plan, but it does not strongly require investigation findings to be recorded before asking clarification.
- The assistant treated uncertainty as a reason to ask first instead of recording confirmed facts, hypotheses, and open questions first.

## Improvement Direction

- Add explicit knowledge metadata in the archive/distill design: `sourceKind`, `ingestionCategory`, `corpus`, `originTool`, `sourcePath`, `freshness`, and `refreshPolicy`.
- Make consolidate category-aware so rule knowledge, source-code knowledge, ticket history, and dynamic `add_knowledge` fragments are grouped and refreshed differently.
- Strengthen DeukAgentRules so investigation/regression/quality tickets require `Problem Analysis`, `Source Observations`, `Cause Hypotheses`, `Improvement Direction`, and `Open Questions` before the agent asks the user for clarification.
- After writing those sections, the agent should point the user to the ticket instead of keeping analysis as chat-only state.

## Open Questions

- Whether DeukAgentContext server-side ingestion and consolidate changes should be handled in this repository or a separate DeukAgentContext ticket.
- Whether the first implementation should be schema-only metadata on archive knowledge JSON, or a broader MCP-side reindex/consolidation change.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome.

## Verification Outcome

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/rules.d/deukcontext-mcp.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/232-deukagentcontext-knowledge-sever-joy-nucb.md` passed.
- `node --test scripts/tests/cli-ticket-commands.test.mjs` passed, including the generated ticket template regression.
- `npx deuk-agent-rule rules audit --compact` returned `rules:audit ok`.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
