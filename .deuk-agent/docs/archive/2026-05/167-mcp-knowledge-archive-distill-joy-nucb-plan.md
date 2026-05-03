---
summary: "Agent problem analysis and decision trace for 167-mcp-knowledge-archive-distill-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 01:12:18"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket next` found no active or open ticket even though the working tree contains substantial continuation changes. Recent commits show active hardening around ticket resume, archive rollback, archived index recovery, and dry-run side effects. The current diff extends that same line of work with v25 MCP/RAG quality rules and archive-time knowledge distillation, so this follow-up ticket records the missing active-ticket boundary before continuing execution.

The core product gap is that archive knowledge should remain useful after Phase 1 split ticket content away from planLink analysis. If distillation only reads the ticket body, closed-ticket knowledge loses the agent's problem analysis, source observations, rationale, and verification outcomes now stored in the planLink.

## Source Observations
`core-rules/AGENTS.md` is now version 25 and adds an MCP knowledge quality gate: narrow searches, two-call limit, treating stale or placeholder results as misses, local source as truth, and promotion of reusable findings to DeukAgentContext.

`templates/rules.d/deukcontext-mcp.md` mirrors the RAG guidance for generated consumer spokes, while `PROJECT_RULE.md` marks those consumer spokes as generated from templates through `npx deuk-agent-rule init`.

`scripts/cli-ticket-commands.mjs` currently adds helpers to extract ticket sections and to read analysis sections from `meta.planLink` during `distillKnowledge`. The related test in `scripts/tests/cli-ticket-commands.test.mjs` expects archived knowledge JSON to contain `summary`, `sourceTicketPath`, `planLink`, ticket `sections`, and planLink `analysis`.

`scripts/cli-ticket-migration.mjs` switches default planLink construction to the shared `PLAN_LINKS_DIR` constant, matching the no-hardcoded-path direction already enforced by architecture tests. Additional diffs in init and lint helpers replace legacy literal paths with shared constants.

Docs already describe the new fallback rule: when no active/open ticket exists, inspect recent git history before creating a follow-up ticket.

## Cause Hypotheses
The missing active ticket is likely a workflow-state gap rather than a code-design change: prior closed/archive cleanup left no open continuation record while implementation edits remained in progress.

The archive knowledge gap likely emerged from the recent ticket/plan separation. Existing archive logic knew how to distill ticket body sections, but it did not yet follow the `planLink` pointer to capture the analysis sections that Phase 1 now requires.

Architecture tests needed small command-execution cleanup because shell-quoted grep patterns can behave differently across environments; using `execFileSync` makes those checks less dependent on shell parsing.

## Decision Rationale
Continue the existing implementation instead of starting a broader refactor. The current diff is already scoped to rule text, archive distillation, path-constant cleanup, and tests, which aligns with the recent commit history.

Keep the ticket body thin and put detailed reasoning here because v25 explicitly separates ticket-owned scope/contracts from planLink-owned analysis. For archive distillation, store planLink analysis under a separate `analysis` key rather than mixing it with ticket `sections`; this preserves the source boundary and keeps consumers able to distinguish contract data from reasoning evidence.

## Execution Strategy
Finish Phase 1 by linting this ticket and plan, then move to Phase 2 because the user explicitly requested continuation. In execution, review the current implementation for edge cases around missing planLink files, absolute-vs-relative plan paths, section extraction, and JSON shape stability. Keep edits inside the declared APC boundary and avoid touching generated consumer outputs.

After implementation review, run the targeted ticket tests first, then the full project test suite if the targeted run passes. Run markdown lint after ticket/plan edits and record any failures here.

## Verification Design
Run `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/167-mcp-knowledge-archive-distill-joy-nucb.md .deuk-agent/docs/plans/167-mcp-knowledge-archive-distill-joy-nucb-plan.md` for Phase 1 markdown validation.

Run `node --test scripts/tests/cli-ticket-commands.test.mjs` to verify archive knowledge distillation and ticket command behavior.

Run `node --test scripts/tests/*.test.mjs` for broader regression coverage across CLI, architecture guard, migration, and utility behavior.

Residual risk is that existing uncommitted deletions/INDEX changes from archive cleanup may be intentionally produced by the ticket CLI. Do not revert them without explicit user direction; keep source changes independent of that state.

## Execution Notes
`extractMarkdownSections` now escapes requested header names before building its matcher and returns the captured section body directly. This fixes literal section names containing regex syntax, especially `Agent Permission Contract (APC)`.

The archive knowledge test now asserts that the parenthesized APC section is preserved in `sections`, alongside planLink analysis stored under `analysis`.

## Verification Outcome
Phase 1 markdown lint passed for the ticket and plan after adding required ticket `priority` and `tags` frontmatter.

`node --test scripts/tests/cli-ticket-commands.test.mjs` passed: 21 tests.

`node --test scripts/tests/*.test.mjs` passed: 45 tests.
