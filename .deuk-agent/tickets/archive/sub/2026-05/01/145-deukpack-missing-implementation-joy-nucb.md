---
id: 145-deukpack-missing-implementation-joy-nucb
title: DeukPack-missing-implementation
phase: 4
status: closed
docsLanguage: ko
summary: DeukPack 누락 구현 범위를 확인하고 실행 가능한 구현 계획을 수립한다.
priority: P2
tags:
  - ticket
  - phase1
  - deukpack
createdAt: 2026-05-01 09:25:29
---


# DeukPack-missing-implementation

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/cli-args.mjs`, `scripts/tests/`
- **Context Files:** `PROJECT_RULE.md`, `docs/architecture.md`, `scripts/cli.mjs`, `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-parser.mjs`
- **Design Rationale:** `--submodule <name>` is documented and parsed, but ticket selection paths such as `ticket next` and shared ticket picking do not consistently honor it. DeukPack-scoped workflows therefore can select unrelated active/open tickets.
- **Constraints:** Keep `bin/deuk-agent-rule.js` proxy untouched. Do not edit generated consumer spokes or distributed outputs. Preserve existing default behavior when no project/submodule filter is supplied.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/cli-args.mjs`, focused tests under `scripts/tests/`, and this ticket/plan documentation.
- Forbidden modules: generated artifacts, consumer `.cursor/rules/` spokes, consumer `AGENTS.md` outputs, `bin/deuk-agent-rule.js`, unrelated shared infrastructure, external module roots.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN/DC-LEGACY/DC-OSS + `core-rules/AGENTS.md` v19.

### [CONTRACT]
- Input: ticket index entries containing `project`, `submodule`, `status`, `createdAt`, `topic`, and `id`; CLI options parsed from `ticket next`, `ticket use`, and related ticket commands.
- Output: filtered ticket selection that honors `--submodule DeukPack` and existing `--project` semantics where applicable, with regression coverage for default and filtered selection.
- Side effects: ticket + plan docs updates, scoped script/test changes only.

### [PATCH PLAN]
- Add a small shared filter helper for ticket entries that applies `opts.project` and `opts.submodule` without changing unfiltered behavior.
- Update `pickTicketEntry` and `runTicketNext` to use the filter before selecting by topic, active/open state, or created time.
- Add focused node test coverage for `pickTicketEntry` and `ticket next --submodule DeukPack` selection behavior.

## Tasks
- [x] Implement scoped ticket-entry filtering for `project` and `submodule`.
- [x] Wire the filter into `pickTicketEntry` and `runTicketNext`.
- [x] Add regression tests for DeukPack-scoped next-ticket selection.
- [x] Run markdown lint and node tests.

## Done When
- `npx deuk-agent-rule ticket next --submodule DeukPack --path-only` selects the first active/open DeukPack ticket instead of an unrelated global ticket.
- Existing unfiltered `ticket next` behavior is preserved.
- `node --test scripts/tests/*.test.mjs` passes.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/145-deukpack-missing-implementation-joy-nucb.md .deuk-agent/docs/plans/145-deukpack-missing-implementation-joy-nucb-plan.md` passes.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/145-deukpack-missing-implementation-joy-nucb-report.md)
