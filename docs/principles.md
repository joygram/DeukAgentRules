# Principles

These principles define the philosophy behind **DeukAgentRules** as an AI Engineering Orchestration Protocol.

## 1. Zero-Copy Hub-Spoke Architecture (SSoT)

The documentation and rule system must have a single source of truth without unnecessary duplication.

- **Global Hub**: `AGENTS.md` contains all canonical rules.
- **Local Hub**: `PROJECT_RULE.md` defines project-specific rules.
- **Spoke (Zero-Copy)**: IDE-specific files act purely as absolute path pointers.
- **Why**: Duplicated and mismatched rules across IDEs create agent drift and unpredictable behavior.

## 2. Zero-Legacy Policy

Maintain repository cleanliness by physically purging obsolete structures.

- **Why**: Legacy `.cursorrules` or stale submodule stubs confuse agents and bloat the context window.
- **Mechanism**: Unconditional cleanup of deprecated markers and empty stubs during `init`.

## 3. Kind Src (Source Sovereignty)

Prioritize local development source over distributed binaries.

- **Why**: Distributed packages (npm) often lag behind local rule updates.
- **Mechanism**: The Global CLI Proxy ensures that `npx` always routes to the local `scripts/cli.mjs` if present.

## 4. Smart Backup (Custom Rule Protection)

Respect human-authored content while cleaning system-generated noise.

- **Why**: Users often add valuable custom rules to generated files.
- **Mechanism**: Files are only deleted if they contain pure system blocks. Anything else is backed up as `*.bak`.

## 5. Strict Phase-Driven Workflow (TDW)

Execution must be strictly bounded by a Ticket and its Phase.

- **Why**: AI agents wander without boundaries. Explicit scope locking reduces token usage and prevents scope-creep.
- **Mechanism**: Phase 1 issues or selects a ticket, fills the Agent Permission Contract (APC), and records the planLink. The ticket owns scope and contract; planLink owns evidence, execution steps, and verification. They must not repeat the same content. If the user clearly requested execution and Phase 1 records are complete, the agent may continue into Phase 2.

## 6. Plan Before Mutation

Design must be explicit before state changes occur.

- **Why**: Intent and scope should be recorded before code or config files are modified. Ticket and plan documents are records, not a reason to create duplicate tickets.
- **Mechanism**: Before writing code, the ticket APC blocks (`[BOUNDARY]`, `[CONTRACT]`, `[PATCH PLAN]`) and planLink must be filled. APC records boundary and contract only; detailed evidence and verification stay in planLink.

## 7. Documentation Complements RAG

Stable principles and dynamic knowledge must work together.

- **Docs**: Explain the stable model and operating assumptions.
- **RAG (DeukAgentContext)**: Synchronizes engineering memory and past decisions.
- **Why**: Together they provide the highest signal for agent intelligence.

## 8. Bilingual Parity

English and Korean documentation are mirrors of a single model.

- **Why**: Engineering teams are often bilingual. Mismatched docs lead to workflow fragmentation.
