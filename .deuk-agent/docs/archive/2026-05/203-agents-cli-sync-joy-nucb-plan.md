---
summary: "Agent problem analysis and decision trace for 203-agents-cli-sync-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-03 03:48:32"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket create` already auto-seeds a ticket and plan draft, but the phase-1 gate only verified that the linked plan file existed. That let placeholder plan scaffolds look "complete" even when the plan still contained generic template prose.

This is a contract drift between the documented rule set and the CLI:
- `core-rules/AGENTS.md` says Phase 1 is incomplete until the `planLink` file contains substantive analysis.
- `scripts/cli-ticket-commands.mjs` only checked for file existence and ticket APC placeholders.
- `scripts/cli.mjs` advertises `--require-filled`, but the semantics were not strong enough to catch a placeholder plan draft.

## Source Observations
- `scripts/cli-ticket-commands.mjs` creates a plan draft through `ensurePlanDraftFile()` and then calls `getPhase1IncompleteReasons()` for strict create and `ticket status`.
- The current `getPhase1IncompleteReasons()` path only validates the ticket frontmatter/APC and plan file presence.
- `core-rules/AGENTS.md` already requires substantive plan content, so the CLI should enforce the same rule instead of letting draft scaffolds pass as complete.
- `docs/ticket-create-improvements.md` already proposes stricter create semantics and a clearer placeholder/filled distinction.

## Cause Hypotheses
- The phase-1 checker was optimized for presence/absence, not for the quality of the plan body.
- The auto-generated plan scaffold was good enough to bootstrap editing, but not good enough to satisfy the completion contract.
- `--require-filled` existed as an option, but without plan-content validation it could not reliably distinguish a real plan from a template shell.

## Decision Rationale
- Extend the phase-1 completeness check so it inspects the linked plan body for scaffold text and placeholder tokens.
- Keep the auto-generated draft behavior for the default flow so `ticket create` still bootstraps work quickly.
- Make strict create fail when the plan is still a scaffold instead of silently accepting an empty shell.
- Prefer a narrow CLI fix over moving plan templates into a new system, because the current generator already centralizes the draft and the gap is in validation.

## Execution Strategy
- Add a small plan-content helper in `scripts/cli-ticket-commands.mjs`.
- Reuse the existing phase-1 check path so `ticket status` and strict create share the same completeness signal.
- Update help text and the core AGENTS rule note to make the stricter contract visible.
- Add regression tests that prove placeholder plans are rejected by strict create and marked incomplete by status.

## Verification Design
- `node scripts/cli.mjs ticket create --topic ... --summary ... --require-filled --skip-phase0 --non-interactive` should fail when the generated plan is still scaffold text.
- `node scripts/cli.mjs ticket status --topic ... --json` should report `phase1_incomplete` with plan-related reasons for a scaffold-only draft.
- `node --test scripts/tests/cli-ticket-commands.test.mjs scripts/tests/cli-utils.test.mjs` should pass after the validation update.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/docs/plan/203-agents-cli-sync-joy-nucb-plan.md .deuk-agent/tickets/sub/203-agents-cli-sync-joy-nucb.md` should pass after the document updates.
