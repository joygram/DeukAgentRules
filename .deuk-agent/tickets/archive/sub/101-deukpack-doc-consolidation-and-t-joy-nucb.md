---
id: 101-deukpack-doc-consolidation-and-t-joy-nucb
title: DeukPack_Doc_Consolidation_and_TDD_Rename
summary: "주요 작업: **Phase 1: Terminology Rename**, Replace 'TDD' with 'TDW' in
  `DeukAgentRules/scripts/cli-init-commands.mjs`., Replace 'TDD' with 'TDW' in
  `DeukAgentRules/bundle/AGENTS.md`."
planLink: .deuk-agent/docs/plans/101-deukpack-doc-consolidation-and-t-joy-nucb-plan.md
---


# DeukPack_Doc_Consolidation_and_TDD_Rename

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
> [WARNING: Do not skip deep analysis. Shallow logic leads to cascaded bugs.]
> [1. Root Cause & Architecture constraint:]
> - TDD (Test-Driven Development) is causing confusion with Ticket-Driven workflow.
> - DeukPack docs are overly fragmented into 40+ granular markdown files across multiple directories (`ai`, `internal`, `operations`, `image`, etc.), hindering RAG performance and maintainability.
> [2. Risk & Edge Cases (What could go wrong?):]
> - Replacing TDD in templates might break existing user files if not migrated, but since these are templates, existing users won't be affected until they init again.
> - Doc consolidation might break hardcoded links. We must ensure internal links are updated or rely on RAG vectorization to self-heal search results.

## Strict Rules Check
> [Review DOMAIN_RULES.md. Explicitly list the hard rules applicable here (e.g., No LINQ, Dumb View, No Raw Pointers). Verify your plan against them.]
> - Agent tone is dry and concise.
> - Docs must be clean and consolidated for RAG.
> - Use specific tools (multi_replace, grep_search) for renaming.

## Scope (In / Out)
> - IN: Rename "TDD" to "TDW (Ticket-Driven Workflow)" in DeukAgentRules templates.
> - IN: Flatten `DeukPack/docs` directory structure.
> - IN: Consolidate DeukPack docs into 5 major Epic documents.
> - OUT: Rewriting the content of the docs (only merging and grouping).

## Tasks
- [x] **Phase 1: Terminology Rename**
  - [x] Replace 'TDD' with 'TDW' in `DeukAgentRules/scripts/cli-init-commands.mjs`.
  - [x] Replace 'TDD' with 'TDW' in `DeukAgentRules/bundle/AGENTS.md`.
  - [x] Replace 'TDD' with 'TDW' in `DeukAgentRules/bundle/rules.d/core-workflow.md`.
- [x] **Phase 2: Directory Flattening**
  - [x] Move all images to `DeukPack/docs/assets/`.
  - [x] Create target directories: `architecture`, `operations`, `research`, `legacy`.
  - [x] Remove `docs/internal`, `docs/image`, `docs/ai`, `docs/intro`.
- [x] **Phase 3: Doc Consolidation**
  - [x] Merge Protocol/Zero-copy docs into `NETWORK_PROTOCOL_ARCHITECTURE.md`.
  - [x] Merge Meta/Excel docs into `META_TABLE_ARCHITECTURE.md`.
  - [x] Merge Integration/EF docs into `ECOSYSTEM_INTEGRATION.md`.
  - [x] Merge Build/Deploy docs into `RELEASE_AND_DEPLOYMENT.md`.
  - [x] Merge OSS docs into `OSS_MAINTENANCE_GUIDE.md`.

## Done When
> - `deuk-agent-rule init` generates TDW terminology.
> - `DeukPack/docs` contains less than 10 top-level epic docs and a flat, semantic directory structure.
