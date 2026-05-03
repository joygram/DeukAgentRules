---
id: 163-karpathy-skills-vs-deukagent-pos-joy-nucb
title: karpathy-skills-vs-deukagent-positioning
phase: 3
status: closed
docsLanguage: ko
summary: Karpathy skills 계열과 DeukAgentRules/DeukAgentContext를 비교해 제품 포지셔닝과 개발
  방향성을 심층 분석한다
priority: P1
tags:
  - research
  - positioning
  - deukagent-context
  - agent-skills
createdAt: 2026-05-01 22:05:45
planLink: .deuk-agent/docs/plans/163-karpathy-skills-vs-deukagent-pos-joy-nucb-plan.md
---


# karpathy-skills-vs-deukagent-positioning

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `docs/karpathy-skills-vs-deukagent-positioning.ko.md`, `README.md`, `README.ko.md`
- **Context Files:** `PROJECT_RULE.md`, `docs/product-positioning-research.ko.md`, `docs/organic-growth-plan.ko.md`, `docs/vision-agent-guardrails.ko.md`, README docs tables, external Karpathy skills and agent-skill trend sources
- **PlanLink:** `.deuk-agent/docs/plans/163-karpathy-skills-vs-deukagent-pos-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no source code changes, no unrelated refactors, cite external sources as links rather than copying long source text.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: research/positioning docs and README docs index only
- Forbidden modules: generated artifacts, CLI/source/test files, release metadata, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current DeukAgentRules positioning docs, DeukAgentContext concept docs, Karpathy skills repository, Claude/Copilot/Codex/skills trend references
- Output: a deep Korean research document comparing Karpathy-style skills with DeukAgentRules/DeukAgentContext and deriving product positioning plus development direction
- Side effects: ticket + plan docs updates, scoped code changes only

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Execute changes inside APC boundary.
- [x] Record verification outcome in the linked report or planLink.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
