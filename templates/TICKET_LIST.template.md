---
<%- frontmatter %>
---
# Ticket List

> Source index: `<%= sourceIndex %>`

## Latest

<%- latestLine %>

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
