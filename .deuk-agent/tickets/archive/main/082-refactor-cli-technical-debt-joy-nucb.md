---
createdAt: 2026-04-26 07:11:00
group: main
id: 082-refactor-cli-technical-debt-joy-nucb
planLink: .deuk-agent/docs/plans/082-refactor-cli-technical-debt-joy-nucb-plan.md
priority: P2
project: DeukAgentRules
status: closed
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] - Root Cause: The CLI implementation
  accumulated fragile heuristics (regex-based parsing, hardcoded project names, ps
  aux sniff...'
tags: rag, frontmatter, mcp, tickets, architecture
title: refactor-cli-technical-debt
---

# refactor-cli-technical-debt

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
- **Root Cause**: The CLI implementation accumulated fragile heuristics (regex-based parsing, hardcoded project names, `ps aux` sniffing) that reduce reliability and portability.
- **Constraints**:
  - Must remain compatible with Node.js 18+.
  - Must not break existing ticket structures.
  - Must strictly enforce Phase 0 if MCP is active (local or remote).
- **Risk**:
  - Throwing errors on invalid YAML might break existing workflows if users have corrupted files.
  - MCP connectivity checks (fetch) might hang if not properly timed out.

## Strict Rules Check
- [x] **Markdown Hygiene**: Run `npm run lint:md` after edits.
- [x] **No Hardcoding**: Remove project-specific lists (`PRUNE_SUBMODULE_LIST`).
- [x] **Error Handling**: No swallowing errors in core parsing logic. Let it fail fast.
- [x] **CLI Consistency**: Unify code patterns across all `scripts/` files.

## Scope (In / Out)
- **IN**: `scripts/cli-utils.mjs`, `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-logic.mjs`.
- **OUT**: `bundle/` content, `bin/` entry point.

## Tasks
- [x] Remove hardcoded `PRUNE_SUBMODULE_LIST` and clean up `cli-utils.mjs`.
- [x] Refactor `parseFrontMatter` to use string split/startsWith and throw on YAML error.
- [x] Refactor title extraction to remove regex and rely on meta or basename.
- [x] Implement robust MCP validation (check `.mcp.json` / `.cursor/mcp.json` + SSE ping).
- [x] Standardize error handling and remove excessive `try/catch` guards across CLI.
- [x] Verify via `npx deuk-agent-rule ticket list` and `lint:md`.

## Done When
- [x] All regex-based parsing is replaced with string logic.
- [x] `PRUNE_SUBMODULE_LIST` is deleted.
- [x] MCP skip validation correctly detects SSE and stdio servers.
- [x] `npm run lint:md` passes.