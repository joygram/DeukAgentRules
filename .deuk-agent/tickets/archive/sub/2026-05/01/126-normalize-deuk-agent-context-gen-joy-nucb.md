---
id: 126-normalize-deuk-agent-context-gen-joy-nucb
title: normalize-deuk-agent-context-generated-namespace
phase: 4
status: closed
docsLanguage: ko
summary: Fix DeukAgentContext IDL namespaces so generated imports expose only
  domain namespaces
priority: P2
tags: deukpack, python, generated, namespace
createdAt: 2026-05-01 01:14:42
planLink: .deuk-agent/docs/plans/126-normalize-deuk-agent-context-gen-joy-nucb-plan.md
---


# normalize-deuk-agent-context-generated-namespace

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `/home/joy/workspace/DeukAgentContext/deuk_idl`, `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`, and MCP imports.
- **Context Files:** `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`, `/home/joy/workspace/DeukAgentContext/deuk_idl/rag_response.deuk`, `/home/joy/workspace/DeukPack/src/codegen/plugins/python/src/PythonGenerator.ts`, `/home/joy/workspace/DeukPack/scripts/build_deukpack.js`.
- **Design Rationale:** The current IDL namespace `deuk_agent_context` is a project name, not a domain namespace. Generated imports should expose only domain namespaces such as `rag`, `workflow`, and `metrics`; storage roots like `deuk_idl`, `python`, and generated markers must not define model namespace.
- **Constraints:** Do not edit generated files directly. Do not move generated files by hand. Avoid `sys.path` hacks.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `/home/joy/workspace/DeukAgentContext/deuk_idl/*.deuk`, `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`, `/home/joy/workspace/DeukAgentContext/pyproject.toml`, `/home/joy/workspace/DeukAgentContext/src/mcp/*.py`, ticket/plan docs.
- Forbidden modules: `/home/joy/workspace/DeukAgentContext/src/mcp/generated/`, `/home/joy/workspace/DeukAgentContext/deuk_idl/python/`, `deukpack_out/`, generated files.
- Rule citation: DeukAgentContext `PROJECT_RULE.md` DC-CODEGEN; DeukAgentRules `PROJECT_RULE.md` DC-CODEGEN.

### [CONTRACT]
- Input: User clarifies the IDL itself is wrong; `deuk_agent_context` should not be the IDL namespace.
- Output: IDL files use domain namespaces, DeukPack regenerates Python packages under those namespaces, and application imports reference namespace packages directly.
- Side effects: Generated outputs change through `npx deukpack run`; package config may expose generated namespace packages without path hacks.

### [PATCH PLAN]
- Split or rewrite IDL into domain namespace files: `rag`, `workflow`, `metrics`.
- Adjust DeukPack pipeline/package config only if needed so generated namespace packages are importable without `sys.path` hacks.
- Regenerate with `npx deukpack run`.
- Update MCP imports to use namespace packages such as `rag.rag_response`, `workflow.workflow_report`, and `metrics.ticket_metric`.
- If DeukPack cannot support this cleanly without project-local workarounds, create a DeukPack follow-up ticket before applying any workaround.

## Tasks
- [x] Fix IDL domain namespaces.
- [x] Regenerate DeukPack Python outputs.
- [x] Replace awkward generated namespace imports.
- [x] Run DeukAgentContext import smoke test and architecture guard.
- [x] Record DeukPack follow-up ticket.
- [ ] Record and close ticket.

## Findings
- `deuk_idl/rag_response.deuk` used the project-style namespace `deuk_agent_context`.
- The IDL source was split into domain namespace files:
  - `/home/joy/workspace/DeukAgentContext/deuk_idl/rag.deuk` → `namespace rag`
  - `/home/joy/workspace/DeukAgentContext/deuk_idl/workflow.deuk` → `namespace workflow`
  - `/home/joy/workspace/DeukAgentContext/deuk_idl/metrics.deuk` → `namespace metrics`
- DeukPack ticket 320 fixed the source-linked CLI no-op path. After that, `npx deukpack run` emitted namespace packages under `deuk_idl/python/rag`, `deuk_idl/python/workflow`, and `deuk_idl/python/metrics`.
- MCP application imports now use the domain namespace packages directly.

## Verification
- `npx deukpack run` passed in `/home/joy/workspace/DeukAgentContext` and emitted namespace packages.
- `poetry install` passed after exposing `rag`, `workflow`, and `metrics` packages from `deuk_idl/python`.
- DeukAgentContext smoke import/render passed.
- `poetry run python -m pytest tests/test_architecture_guard.py -q` passed: 14 tests.
- DeukPack ticket 320 was completed and archived.

## Done When
> MCP application code imports generated structs by domain namespace only, generated files are regenerated instead of edited, and tests pass.
