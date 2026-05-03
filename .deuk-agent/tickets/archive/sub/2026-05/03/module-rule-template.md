---
summary: module-rule-template
status: archived
priority: P3
tags: migrated
id: module-rule-template
title: module-rule-template
createdAt: 2026-05-03 08:48:30
---

# module-rule-template

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

### MODULE RULE TEMPLATE

# Submodule Rules: [Module Name]

- **Path Root:** `[Path]`
- **Tech Stack:** `[Tech]`

## Architecture & Conventions
- [Add module-specific conventions here]

## Build & Test
- Build: `[Command]`
- Test: `[Command]`
