---
id: 156-stable-archive-links-and-merged--joy-nucb
title: stable-archive-links-and-merged-bmt-report
phase: 4
status: closed
docsLanguage: ko
summary: Archive 후 티켓 경로 안내를 안정화하고 DeukPack BMT 관련 분산 리포트를 하나의 현재 리포트로 합친다.
priority: high
tags:
  - tickets
  - archive
  - reports
  - bmt
createdAt: 2026-05-01 15:07:46
planLink: .deuk-agent/docs/plans/156-stable-archive-links-and-merged--joy-nucb-plan.md
---


# stable-archive-links-and-merged-bmt-report

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, `.deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`, `scripts/cli-ticket-commands.mjs`, existing BMT reports 153/154/155
- **PlanLink:** `.deuk-agent/docs/plans/156-stable-archive-links-and-merged--joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** Do not edit generated outputs. Do not delete archived per-ticket evidence without proof. Keep CLI change limited to archive path stability/report discoverability.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket archive/report command logic, its focused tests, and the canonical merged BMT report document.
- Forbidden modules: generated artifacts, unrelated CLI subcommands, DeukPack source/runtime files, historical archive ticket files except via CLI lifecycle.
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: current archive command behavior, ticket index state, and BMT report evidence from tickets 153/154/155.
- Output: archive command updates INDEX to final archived path, prints final repo-relative path, has regression coverage, and provides one canonical BMT current report.
- Side effects: ticket + plan/report docs updates and scoped CLI/test changes only.

### [PATCH PLAN]
- Problem analysis, cause hypotheses, rationale, execution strategy, and verification design live in planLink.
- Ticket records only the allowed patch boundary and contract.
- Do not duplicate planLink content here; reference it when detail is needed.

## Tasks

- [x] Complete non-duplicative `planLink` evidence/steps/verification.
- [x] Update archive command so stored/output ticket path follows the archived file.
- [x] Add regression coverage for archive path/index update.
- [x] Merge BMT 153/154/155 report evidence into one canonical current report.
- [x] Run markdown lint and relevant node tests.

## Done When

- APC is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/156-stable-archive-links-and-merged--joy-nucb-report.md)
