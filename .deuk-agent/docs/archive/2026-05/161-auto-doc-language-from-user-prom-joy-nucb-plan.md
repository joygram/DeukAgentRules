---
summary: "Agent problem analysis and decision trace for 161-auto-doc-language-from-user-prom-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 21:51:19"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket create` currently resolves `docsLanguage` through CLI input, saved init config, and environment locale. That makes newly generated ticket and plan artifacts drift away from the user's current prompt language when a workspace config or system locale disagrees with the prompt. The ticket body and `planLink` are the first records an agent reads, so the language decision must be stable at creation time.

## Source Observations
- `scripts/cli-ticket-commands.mjs` resolves the ticket template before parsing the final summary/from-plan body. The resolver currently prefers `opts.docsLanguage || config.docsLanguage || "auto"`.
- `scripts/cli-utils.mjs` has `normalizeDocsLanguage`, `inferDocsLanguageFromEnv`, `resolveDocsLanguage`, and localized template selection. There is no prompt-text language heuristic.
- `scripts/tests/cli-ticket-commands.test.mjs` already covers explicit docsLanguage template selection and localized fallback.
- `PROJECT_RULE.md` allows edits in `scripts/` and tests while generated consumer spokes and copied `AGENTS.md` outputs must not be edited directly.

## Cause Hypotheses
- The CLI treats saved configuration as a stronger signal than the current task text, which conflicts with the updated rule that user prompt language wins for tickets and plans.
- The ticket create path computes language too early, before the final summary is known for `--from-plan` cases.
- Existing tests focus on explicit language selection, so the prompt-language precedence gap can survive regression.

## Decision Rationale
Add a small text-language inference helper in `cli-utils` and use it only in `ticket create` language selection. Explicit `--docs-language ko|en` should continue to act as a direct user override. When the option is absent or `auto`, the final ticket text inputs should be checked before falling back to saved config and environment. This keeps init behavior unchanged and avoids broad template or config refactors.

## Execution Strategy
Move ticket-template resolution until after the final title/topic and summary are known. Build a prompt-language candidate from summary, title/topic, and parsed plan body when present. Resolve the ticket's stored `docsLanguage` from that candidate first, then config/env fallback. Add focused tests proving Korean prompt text overrides an English config and English prompt text overrides a Korean config when no explicit language flag is passed.

## Verification Design
Run markdown lint on the ticket and plan after Phase 1 edits. Then run the ticket command test file and the utility test file. Expected outcome: prompt-language inference tests pass without changing existing explicit docsLanguage behavior. Residual risk is heuristic ambiguity for mixed-language prompts; the implementation should prefer clear Hangul detection and otherwise fall back to English when enough Latin words are present.

## Verification Result
Markdown lint passed for the ticket and this plan. Focused tests passed with `node --test scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs` covering 34 subtests. Full script tests passed with `node --test scripts/tests/*.test.mjs` covering 40 subtests. No residual failures were observed.
