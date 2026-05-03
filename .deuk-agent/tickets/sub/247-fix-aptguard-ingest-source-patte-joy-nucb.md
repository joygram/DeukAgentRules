---
id: 247-fix-aptguard-ingest-source-patte-joy-nucb
title: fix-aptguard-ingest-source-patterns
phase: 4
status: closed
docsLanguage: ko
summary: apt-guard source ingest 패턴이 실제 파일을 매칭하지 않아 curated ingest가 실패하는 문제를 수정한다.
priority: P2
tags: []
createdAt: 2026-05-03 14:17:41
---


# fix-aptguard-ingest-source-patterns

> Restrict changes to **Target Module**. Read **Context Files** before code generation.
> Do not narrate progress. If the workflow requires a ticket-start line, that is the only allowed pre-work commentary.
> Keep planning compact in this ticket. The main ticket owns design and analysis; do not mirror screen progress here.
> If an optional planLink exists, it is Phase 1 planning-only. Never append execution logs or verification results to it.
> For issue/regression reports, stop after Phase 1 for user review. Do not execute before post-ticket approval.

## Scope & Constraints

- **Target:** DeukAgentContext `.local/ingest.yaml` apt-guard source collection
- **Context Files:** `PROJECT_RULE.md`, DeukAgentContext `PROJECT_RULE.md`, `.local/ingest.yaml`, apt-guard file layout
- **Constraints:** Protected config edit is limited to correcting stale apt-guard source globs; no generated output edits, no unrelated refactors.
- **Lifecycle Guard:** ticket lifecycle commands auto-run markdown lint on touched files and fail fast on broken markdown.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: DeukAgentContext `.local/ingest.yaml` apt-guard source patterns only
- Forbidden modules: generated artifacts, unrelated shared infrastructure, external module roots, unrelated ingest config
- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md

### [CONTRACT]
- Input: failed ingest summary showing `apt-guard/source` zero indexed documents, while apt-guard has shell, PowerShell, YAML, XML, and conf source/config assets
- Output: apt-guard source glob patterns that match existing operational source/config files
- Side effects: scoped ingest config update and ticket updates

### [PATCH PLAN]
- Replace nonexistent apt-guard source patterns with actual file families.
- Verify glob count locally before rerunning ingest.
- Rerun curated ingest under ticket 246 after this config fix.

## Compact Plan

- **Problem:** Curated ingest failed only at final verification because `apt-guard/source` is configured with stale patterns that match zero files.
- **Approach:** Correct apt-guard source patterns to match existing scripts and deployment/config source assets without widening other projects.
- **Verification:** Local file count for the new patterns must be non-zero, then full ingest should no longer fail zero-document verification for `apt-guard/source`.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Complete compact plan and APC.
- [x] Execute config correction inside APC boundary.
- [x] Record verification outcome.

## Verification

- Command: local glob count for apt-guard source patterns in DeukAgentContext `.local/ingest.yaml`.
- Result: 76 files matched, including shell scripts, PowerShell/CMD scripts, Kubernetes YAML, Wazuh XML/conf, and root deployment config files.
- Follow-up: rerun ticket 246 curated ingest after this config correction.

## Done When

- APC is complete and non-placeholder.
- Compact plan is complete and non-placeholder.
- Target changes are implemented inside the declared boundary.
- Markdown lint/tests relevant to this ticket pass or failures are recorded.
- Lifecycle commands can persist the ticket without manual lint intervention.
