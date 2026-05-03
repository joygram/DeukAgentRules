---
id: 246-retry-curated-ingest-joy-nucb
title: retry-curated-ingest
phase: 4
status: closed
docsLanguage: ko
summary: 전처리 강화 후 curated ingest를 다시 시도하고 결과를 검증한다.
priority: P2
tags: []
createdAt: 2026-05-03 14:05:27
---


# retry-curated-ingest

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** DeukAgentContext ingest retry and dashboard/API verification
- **Context Files:** `PROJECT_RULE.md`, DeukAgentContext `PROJECT_RULE.md`, `.local/ingest.yaml`, `scripts/run_ingest.py`, `src/ingest/parser.py`
- **Constraints:** No generated output edits, no unrelated refactors, no config broadening, monitor dashboard responsiveness during ingest.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: ticket record only unless retry exposes a new scoped defect
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: hardened markdown preprocessing from ticket 245 and current DeukAgentContext ingest config
- Output: curated full ingest retry result plus collection/project count and API responsiveness verification
- Side effects: live vector snapshot replacement and ticket updates

### [PATCH PLAN]
- Run parser tests before retry.
- Start full ingest from DeukAgentContext after confirming no previous ingest is running.
- Check `/api/stats` and `/api/analytics` after retry; record counts and failures.

## Compact Plan

- **Problem:** 전처리 강화 후 실제 ingest retry를 수행해 DB snapshot과 dashboard 응답이 정상인지 확인해야 한다.
- **Approach:** DeukAgentContext parser test를 먼저 통과시킨 뒤 `scripts/run_ingest.py`를 실행하고 API stats/analytics 응답을 확인한다.
- **Verification:** parser tests pass, ingest exits 0, `/api/stats` and `/api/analytics` return JSON with curated counts.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute curated ingest retry.
- [x] Record verification outcome.

## Verification

- Parser precheck: `/home/joy/workspace/DeukAgentContext/.venv/bin/python -m pytest /home/joy/workspace/DeukAgentContext/tests/ingest/test_parser.py -q`
- Result: passed, 17 tests.
- First retry result: failed final verification because `apt-guard/source` matched zero files under stale config patterns. Follow-up ticket 247 corrected apt-guard source globs.
- Second retry command: `/home/joy/workspace/DeukAgentContext/.venv/bin/python scripts/run_ingest.py`
- Result: passed, exit 0, ingestion snapshot replacement completed successfully.
- Final collections: `rules=2352`, `tickets=286`, `source=3819`, `templates=120`, `metrics=1`.
- Final project counts: `DeukPack=3792`, `DeukAgentContext=702`, `DeukAgentRules=13`, `DeukUI=1632`, `DeukServerKit=88`, `DeukNavigation=107`, `apt-guard=244`.
- Final project collection counts include `apt-guard/source=78`.
- Dashboard/API verification: `/api/stats` and `/api/analytics?scale=1h` returned JSON after ingest.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
