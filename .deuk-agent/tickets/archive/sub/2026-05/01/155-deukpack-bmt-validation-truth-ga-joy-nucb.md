---
id: 155-deukpack-bmt-validation-truth-ga-joy-nucb
title: deukpack-bmt-validation-truth-gate
phase: 4
status: closed
docsLanguage: ko
summary: DeukPack BMT validation gate가 환경 미구성, third-party 미설치, 유사 데이터 부재를 통과로
  처리하는 문제를 실패로 전환한다.
priority: high
tags:
  - deukpack
  - bmt
  - validation
  - truth-gate
createdAt: 2026-05-01 15:02:38
---


# deukpack-bmt-validation-truth-gate

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Keep execution evidence and detailed steps in `planLink`; do not duplicate them here.

## Scope & Constraints

- **Target:** DeukPack BMT validation gate and competitor evidence checks
- **Context Files:** `/home/joy/workspace/DeukPack/PROJECT_RULE.md`, `/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`, `/home/joy/workspace/DeukPack/benchmarks/out/bmt-latest.json`, ticket 154 report
- **PlanLink:** `.deuk-agent/docs/plans/155-deukpack-bmt-validation-truth-ga-joy-nucb-plan.md` owns evidence, decisions, detailed steps, and verification notes.
- **Constraints:** No generated output edits, no unrelated refactors, no broad regeneration without approval.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: this ticket, its plan/report artifacts, and `/home/joy/workspace/DeukPack/scripts/bmt/matrix-validator.js`
- Forbidden modules: generated benchmark reports/history/out files, DeukPack runtime/codegen source, unrelated shared infrastructure
- Rule citation: DeukAgentRules `PROJECT_RULE.md`; DeukPack `PROJECT_RULE.md` DC-VERIFY-BMT/DC-CODEGEN/DC-TICKET-FIRST

### [CONTRACT]
- Input: BMT run that passed despite C++ `cmake` missing, Java `mvn` missing, and similar competitor rows without true dependency/schema proof
- Output: validation gate fails on environment/preflight errors and rejects fake similar third-party evidence
- Side effects: ticket + plan docs updates and scoped validator source edit only

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

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/155-deukpack-bmt-validation-truth-ga-joy-nucb-report.md)
