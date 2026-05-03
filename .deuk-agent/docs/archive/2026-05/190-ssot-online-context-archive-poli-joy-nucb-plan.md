---
summary: "Agent problem analysis and decision trace for 190-ssot-online-context-archive-poli-joy-nucb-plan"
status: completed
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 21:32:07"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The repository already treats `AGENTS.md` as the global SSoT, but the operational boundary around DeukAgentContext needed to be stated more explicitly: it should act as online advisory memory only, not as a local cache or second truth source. The archive layer also needed to be called out as the durable place for completed work so active context stays small and current.

## Source Observations
- `docs/principles.md` and `docs/architecture.md` already describe SSoT, but did not explicitly state that RAG must stay online-only.
- `templates/rules.d/deukcontext-mcp.md` already separates RAG quality-gate behavior from source-of-truth behavior, which makes it a natural place to encode the online-only rule.
- `core-rules/AGENTS.md` already treats DeukAgentContext as advisory memory, so the new wording can tighten that rule without changing workflow mechanics.
- Archive behavior already exists through ticket archive and knowledge distillation, so the missing piece is policy clarity rather than new implementation.

## Cause Hypotheses
- The system had the right mechanics, but the source-of-truth boundary was stated in a way that still left room for local mirrors or cached snapshots to be treated as context.
- Without an explicit archive-preservation rule, completed work can remain conceptually in the active loop even when it has already been archived.

## Decision Rationale
I chose to tighten the policy language in the stable docs and RAG protocol instead of adding new runtime behavior. That keeps the rule system coherent, avoids unnecessary code churn, and makes the intended data flow obvious: local code and tickets are truth, online RAG is advisory, archive is durable history.

## Execution Strategy
1. Update the English and Korean principles docs to state that DeukAgentContext is online-only advisory memory.
2. Add an explicit archive-preservation principle so completed work is pushed out of active context.
3. Mirror the same boundary in the DeukContext MCP protocol and core rules.
4. Keep the ticket/plan docs aligned with the final policy wording.

## Verification Design
Run `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/190-ssot-online-context-archive-poli-joy-nucb.md .deuk-agent/docs/plans/190-ssot-online-context-archive-poli-joy-nucb-plan.md docs/principles.md docs/principles.ko.md docs/architecture.md docs/architecture.ko.md templates/rules.d/deukcontext-mcp.md core-rules/AGENTS.md`.

Expected outcome:
- Markdown lint passes for the updated rule documents.
- The policy now clearly states SSoT, online-only RAG usage, and archive preservation.

Verification Outcome:
- Implemented in docs and core rules; `npx deuk-agent-rule lint:md` passed for the touched policy files.
