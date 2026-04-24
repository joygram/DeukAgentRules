# Principles

These principles explain why the documentation and workflow are organized the way they are.

## 1. Ticket-First Execution

Work starts with a ticket, not with ad hoc file editing.

Why:

- it makes scope explicit
- it gives the agent a bounded contract
- it prevents accidental cross-module edits

## 2. Submodule Isolation

Every task should name the target submodule before execution.

Why:

- the repository can contain multiple modules with different rules
- submodule-level scope keeps agent behavior predictable
- the same workflow can be reused across different projects

## 3. Plan Before Mutation

Design belongs in the plan document. File changes belong in execution.

Why:

- readers can review intent before state changes happen
- approval can happen on a concrete design
- the implementation can be checked against the original plan

## 4. Canonical Rule Source

`AGENTS.md` remains the source of truth for runtime behavior.

Why:

- agents need one authoritative file during execution
- mirrored entrypoints should remain thin
- the workflow stays consistent across IDEs and assistants

## 5. README as Entry Point

The README should help the reader orient themselves, not duplicate every rule.

Why:

- short entry points are easier to maintain
- detailed explanations can evolve independently
- links can point readers to the exact depth they need

## 6. Bilingual Parity

English and Korean documentation should describe the same workflow model.

Why:

- the repository is used in both languages
- mismatched documentation creates workflow drift
- mirrored docs reduce translation ambiguity during execution

## 7. Documentation Complements RAG

Docs and RAG solve different parts of the same problem.

Why:

- RAG finds prior decisions quickly
- docs explain the stable model and operating assumptions
- together they reduce repeated interpretation errors

## Practical Rule

If the workflow changes, update the README summary and the detailed principle/structure docs together.
