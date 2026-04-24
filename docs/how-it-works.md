# How It Works

This repository packages a workflow control plane for AI coding agents. It does not only emit rule files. It defines how work is scoped, how tickets are issued, and when a task is allowed to mutate files.

## Mental Model

- `README.md` is the entry point.
- `AGENTS.md` is the canonical runtime rule file.
- A ticket is the execution contract for one bounded task.
- A plan document is the design layer for that ticket.
- The target submodule is the scope boundary.

## Repository Roles

| Path | Role |
|---|---|
| `README.md` | High-level concept entry point and navigation |
| `README.ko.md` | Korean mirror of the same entry point |
| `AGENTS.md` | Canonical agent execution rules |
| `gemini.md` | Gemini / Antigravity entrypoint |
| `.deuk-agent/tickets/` | Ticket records and workflow state |
| `.deuk-agent/docs/plans/` | Ticket design documents |
| `.deuk-agent/docs/walkthroughs/` | Completion reports and post-mortems |

## Workflow Structure

1. Initialize the workspace with `deuk-agent-rule init`.
2. Create a ticket before changing scoped documentation or code.
3. Write the plan first so the design is explicit before execution.
4. Execute only inside the declared target submodule.
5. Verify the result and record issues before closure.
6. Archive the ticket after the work is complete.

## Why the Structure Exists

- It reduces context size by forcing the agent to work from a narrow ticket.
- It keeps planning and mutation separate.
- It makes approval boundaries visible instead of implicit.
- It gives RAG a stable shape for searching past decisions.

## Document Boundaries

This document explains structure. It does not restate every rule in `AGENTS.md`.

Use this file when you want to understand:

- how tickets map to execution scope
- where the design layer lives
- how the agent workflow is separated into phases
- why the README stays short and navigational

For the reasoning behind the workflow, read `docs/principles.md`.
