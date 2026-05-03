---
summary: project-rule
status: archived
priority: P3
tags: migrated
id: project-rule
title: project-rule
createdAt: 2026-05-03 08:54:51
---

# project-rule

> Legacy separated docs are merged here so this ticket is the single source of truth.

## Scope & Constraints

- **Target:** migrated legacy work record.
- **Context Files:** merged legacy content below.
- **Constraints:** preserve historical content without keeping separate docs files.
- **Lifecycle Guard:** this ticket is the canonical record.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: historical ticket record only.
- Forbidden modules: product/source changes from this migration.
- Rule citation: local project rules if present.

### [CONTRACT]
- Input: separated legacy docs files.
- Output: one canonical ticket containing merged legacy content.
- Side effects: legacy docs files removed after merge.

### [PATCH PLAN]
- Merge separated docs into this ticket.
- Remove source docs after merge.

## Compact Plan

- **Problem:** this work item existed as separated docs outside the ticket.
- **Approach:** merge the legacy content below and keep this ticket as canonical.
- **Verification:** confirm the source docs files are removed and this ticket remains.
- **Ticket Numbering:** infer the master/sub ticket from the numbered ticket ID; do not add inline child-ticket links.

## Tasks

- [x] Merge separated docs content into this ticket.
- [x] Remove separated docs files.

## Done When

- This ticket contains the merged content.
- Separate docs files are removed.
## Merged Legacy Document

### PROJECT RULE

# Project Rules

## Architecture Boundaries

> [!NOTE] **To AI Agents**
> If `architecture_docs` is empty and no rules are defined below,
> this project has no architecture rules yet.
> → Ask user to define them, or analyze codebase and propose a draft.
> → Do NOT make assumptions about project architecture.

### Module Ownership
<!-- Define which modules exist and who owns them -->
| Module | Owner | Editable |
|--------|-------|----------|
| `src/` | Core source | Yes |

### Dependency Direction
<!-- Define allowed dependency directions between modules -->

## DC-CODEGEN: Generated File Mapping

> [!IMPORTANT] **REQUIRED**
> Agents use this table to decide which files are safe to edit.
> Files not listed here → agent MUST ask user before editing.

| Generated (DO NOT EDIT) | Source (edit here) | Build command |
|-------------------------|-------------------|---------------|
| `dist/` | `src/` | `npm run build` |

## DC-* Guards (project-specific)

| Guard | Condition → Action |
|-------|-------------------|
| DC-HALT | Infrastructure error → stop, no bypass, report to user. |
| DC-INFRA | Bootstrap/transport/DB/routing code → separate ticket + approval. |

## Build & Test

| Action | Command |
|--------|---------|
| Build | `npm run build` |
| Test | `npm test` |
| Lint | `npx deuk-agent-rule lint:md` |
## Merged Legacy Document

### PROJECT RULE

# Project Rules

## Architecture Boundaries

> [!NOTE] **To AI Agents**
> If `architecture_docs` is empty and no rules are defined below,
> this project has no architecture rules yet.
> → Ask user to define them, or analyze codebase and propose a draft.
> → Do NOT make assumptions about project architecture.

### Module Ownership
<!-- Define which modules exist and who owns them -->
| Module | Owner | Editable |
|--------|-------|----------|
| `src/` | Core source | Yes |

### Dependency Direction
<!-- Define allowed dependency directions between modules -->

## DC-CODEGEN: Generated File Mapping

> [!IMPORTANT] **REQUIRED**
> Agents use this table to decide which files are safe to edit.
> Files not listed here → agent MUST ask user before editing.

| Generated (DO NOT EDIT) | Source (edit here) | Build command |
|-------------------------|-------------------|---------------|
| `dist/` | `src/` | `npm run build` |

## DC-* Guards (project-specific)

| Guard | Condition → Action |
|-------|-------------------|
| DC-HALT | Infrastructure error → stop, no bypass, report to user. |
| DC-INFRA | Bootstrap/transport/DB/routing code → separate ticket + approval. |

## Build & Test

| Action | Command |
|--------|---------|
| Build | `npm run build` |
| Test | `npm test` |
| Lint | `npx deuk-agent-rule lint:md` |
