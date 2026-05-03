---
id: 124-deukpack-integration-check-joy-nucb
title: deukpack-integration-check
phase: 4
status: closed
docsLanguage: ko
summary: Verify DeukPack codegen build removes manual links and completes
  integration after init
priority: P2
tags: deukpack, codegen, init, integration
createdAt: 2026-05-01 01:05:49
---


# deukpack-integration-check

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** DeukAgentRules init/spoke generation and DeukPack integration surfaces.
- **Context Files:** `PROJECT_RULE.md`, `scripts/cli-init-commands.mjs`, `scripts/cli-rule-compiler.mjs`, `templates/rules.d/deukcontext-mcp.md`, related DeukPack pipeline/config files in sibling workspaces.
- **Design Rationale:** After DeukContext/DeukPack init, rule linking should be produced by the DeukPack/codegen path instead of requiring hand-written/manual links.
- **Constraints:** Do not edit generated outputs such as `deukpack_out/`; update source templates/generators/pipeline config and rebuild/regenerate.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/`, `templates/`, `core-rules/`, `/home/joy/workspace/DeukAgentContext/src/mcp/rag_codec_adapter.py`, `/home/joy/workspace/DeukAgentContext/src/mcp/metrics.py`, project docs/plans as needed.
- Forbidden modules: generated outputs including `.cursor/rules/`, generated `AGENTS.md` in consumer workspaces, `dist/`, `gen/`, `deukpack_out/`.
- Rule citation: `PROJECT_RULE.md` DC-CODEGEN; generated consumer spokes come from templates/init and must not be edited directly.

### [CONTRACT]
- Input: User reports DeukContext/DeukPack init has completed and manual links should no longer be necessary.
- Output: Verified or corrected source pipeline so DeukPack code generation/build completes and all relevant rule surfaces are linked through DeukPack-managed artifacts.
- Side effects: Regenerated local artifacts may change only through approved init/build commands.

### [PATCH PLAN]
- Inspect DeukPack and DeukAgentContext pipeline/config to identify expected generated linkage.
- Run dry-run or read-only checks first to locate remaining manual links and generated artifacts.
- If source changes are required, update only templates/generator/pipeline source, then run DeukPack codegen/build/init to propagate.
- Verify with repository tests and targeted generated-output checks.

## Tasks
- [x] Inspect DeukPack/DeukContext pipeline and current manual-link surfaces.
- [x] Identify source-of-truth file(s) responsible for rule link generation.
- [x] Patch source templates/generator/config only if integration is incomplete.
- [x] Run DeukPack codegen/build and DeukAgentRules tests/lint.
- [x] Record final state and any follow-up tickets.

## Changes
- Removed manual `sys.path` generated-code linkage from `/home/joy/workspace/DeukAgentContext/src/mcp/rag_codec_adapter.py`.
- Removed manual `sys.path` DeukPack runtime/generated-code linkage from `/home/joy/workspace/DeukAgentContext/src/mcp/metrics.py`.
- Standardized both files on package imports from `src.mcp.generated.deuk_agent_context`, backed by `pyproject.toml`'s `deukpack-core` dependency and DeukPack-generated source tree.

## Verification
- `npx deukpack run` passed in `/home/joy/workspace/DeukAgentContext`.
- `poetry run python` import/render smoke test passed for `RagResponse`, `render_rag_response`, and `compute_ticket_tdw`.
- Manual path-link search passed: no `sys.path`, `DEUKPACK_CORE_PATH`, generated-path injection, or `from deuk_agent_context...` remains under `src/mcp`.
- `poetry run python -m pytest tests/test_architecture_guard.py -q` passed: 14 tests.
- `npm run build` passed in `/home/joy/workspace/DeukPack`.
- `node --test scripts/tests/` passed in DeukAgentRules: 17 tests.
- `npx deuk-agent-rule lint:md` passed for ticket and plan.

## Done When
> No required manual links remain in source flow; generated rule surfaces are produced by the DeukPack/init pipeline; build/tests pass or blockers are documented.
