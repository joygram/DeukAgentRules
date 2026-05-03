---
summary: Verify and complete DeukPack-managed linkage after init/codegen/build
status: active
priority: P2
tags: deukpack, codegen, init, integration
---

# Plan: DeukPack Integration Check

## Context

The workspace has DeukAgentRules, DeukAgentContext, and DeukPack side by side. The user reports DeukContext/DeukPack init has already completed, so rule linkage should be generated or wired through DeukPack rather than maintained as manual links.

## Applicable Rules

- DC-CODEGEN: Do not edit generated surfaces directly. Patch the source template, generator, or pipeline and regenerate.
- DC-LEGACY: Confirm init no longer leaves deprecated v1/v2 marker-based links.
- DC-OSS: If public distribution files change, verify `scripts/sync-oss.mjs` still owns that output path.

## Execution Steps

1. Inspect DeukPack and DeukAgentContext configs:
   - `/home/joy/workspace/DeukPack/package.json`
   - `/home/joy/workspace/DeukPack/deukpack.pipeline.json` if present
   - `/home/joy/workspace/DeukAgentContext/deukpack.pipeline.json`
   - `.deukpack/` config directories in relevant sibling projects
2. Search for remaining manual rule links:
   - `file:///home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md`
   - hardcoded `AGENTS.md` pointer generation
   - direct generated-output references in `.cursor/rules/`, generated `AGENTS.md`, and `deukpack_out/`
3. Map each remaining link to its source:
   - DeukAgentRules `generateSpokeContent`
   - DeukPack generator/template source
   - DeukAgentContext pipeline config
4. If integration is incomplete, patch only source files:
   - generator/template/config source, not generated outputs
   - keep generated consumer artifacts updated only by running the approved command
5. Regenerate and verify:
   - Run DeukPack codegen/build command discovered from package scripts.
   - Run `npx deuk-agent-rule init --workflow execute --approval approved` only if source changes require propagation in this repo.
   - Run `npx deuk-agent-rule lint:md`.
   - Run `node --test scripts/tests/` for DeukAgentRules if source changed.

## Approval Gate

After this plan is approved, advance the ticket to Phase 2 and execute. No code/source changes are made before approval.
