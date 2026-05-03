---
id: 162-readme-related-ideas-seo-joy-nucb
title: readme-related-ideas-seo
phase: 3
status: closed
docsLanguage: en
summary: README 하단에 andrej-karpathy-skills 관련 아이디어 링크와 검색 유입 키워드를 추가한다
priority: P2
tags:
  - docs
  - seo
  - growth
createdAt: 2026-05-01 22:01:27
---


# readme-related-ideas-seo

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `README.md`, `README.ko.md`, `oss-public/GITHUB_DESCRIPTION.md`
- **Context Files:** `PROJECT_RULE.md`, README footer sections, `oss-public/GITHUB_DESCRIPTION.md`, linked `andrej-karpathy-skills` README
- **PlanLink:** `.deuk-agent/docs/plans/162-readme-related-ideas-seo-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: README and public GitHub description/topic documentation only
- Forbidden modules: generated artifacts, unrelated CLI/source changes, release metadata, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: existing README footer and GitHub description/topic source
- Output: related inspiration link, DeukAgentRules differentiation copy, and organic-search topics
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
