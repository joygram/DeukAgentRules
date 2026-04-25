# Principles

These principles define the philosophy behind **DeukAgentRules** as an AI Engineering Orchestration Protocol.

## 1. Hub-Spoke Architecture (SSoT)

The documentation and rule system must have a single source of truth.

- **Hub**: `AGENTS.md` contains all canonical rules.
- **Spoke**: IDE-specific files are thin pointers.
- **Why**: Mismatched rules across IDEs create agent drift and unpredictable behavior.

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

## 5. Submodule Isolation

Execution must be bounded by a target submodule.

- **Why**: AI agents wander without boundaries. Explicit submodule locking reduces token usage and prevents scope-creep.

## 6. Plan Before Mutation

Design must be explicit before state changes occur.

- **Why**: Intent should be reviewed and approved before files are modified. Separation of concerns prevents "blind coding".

## 7. Documentation Complements RAG

Stable principles and dynamic knowledge must work together.

- **Docs**: Explain the stable model and operating assumptions.
- **RAG (DeukAgentContext)**: Synchronizes engineering memory and past decisions.
- **Why**: Together they provide the highest signal for agent intelligence.

## 8. Bilingual Parity

English and Korean documentation are mirrors of a single model.

- **Why**: Engineering teams are often bilingual. Mismatched docs lead to workflow fragmentation.
