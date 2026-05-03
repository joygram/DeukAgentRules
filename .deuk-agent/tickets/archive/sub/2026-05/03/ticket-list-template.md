---
summary: ticket-list-template
status: archived
priority: P3
tags: migrated
id: ticket-list-template
title: ticket-list-template
createdAt: 2026-05-03 08:48:30
---

# ticket-list-template

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

### TICKET LIST.template

# Ticket List

> Source index: `<%= sourceIndex %>`

## Latest

<% if (latest) { %>
- [<%= latest.safeTitle %>](<%= latest.fileUri %>)
- status: `<%= latest.status %>` / group: `<%= latest.group %>` / project: `<%= latest.project %>`
<% } else { %>
- No active ticket entries yet.
<% } %>

## Entries

### 🚀 Active Tickets

| # | Phase | Status | Pri | ID | Title | Group | Project | Created | Path |
|---|---|---|---|---|---|---|---|---|---|
<% if (activeRows.length > 0) { %>
<% activeRows.forEach(row => { %>
<%- row %>
<% }) %>
<% } else { %>
| - | - | - | - | - | No active tickets | - | - | - | - | - |
<% } %>

### 📦 Archived Tickets

| # | Phase | Status | Pri | ID | Title | Group | Project | Created | Path |
|---|---|---|---|---|---|---|---|---|---|
<% if (archivedRows.length > 0) { %>
<% archivedRows.forEach(row => { %>
<%- row %>
<% }) %>
<% } else { %>
| - | - | - | - | - | No archived tickets | - | - | - | - | - |
<% } %>

## Commands

```bash
<%= cmdList %>
<%= cmdUseLatest %>
```
