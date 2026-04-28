# How It Works

DeukAgentRules operates as an **AI Engineering Orchestration Protocol**. It coordinates how agents perceive, analyze, and modify your codebase using a centralized rule hub and a high-performance CLI.

## 1. Hub-Spoke Execution Model

In v3.0, rule files are no longer monolithic. We use a **Hub-Spoke** model to minimize context bloat.

- **Global Hub (`AGENTS.md`)**: The central canonical project rule document.
- **Local Hub (`PROJECT_RULE.md`)**: Project-specific rules that override or augment the global hub.
- **Spokes (`.cursor/rules/*.mdc`, etc.)**: Minimal entry points that tell the agent to read the Hubs.
- **Why**: This ensures the agent always sees the latest rules without duplication errors across different IDEs.

## 2. Global CLI Proxy

The CLI (`deuk-agent-rule`) uses a **Source Sovereignty** mechanism.

- When you run `npx deuk-agent-rule`, the binary checks if you are inside a workspace containing the project's source code.
- If a local source is detected, it **routes execution** to the local script.
- This ensures that your agents are always using the latest uncommitted rules during development.

## 3. Initialization Lifecycle

Running `deuk-agent-rule init` triggers the following lifecycle:

1. **Legacy Purge**: Physically removes old v1/v2 configuration files.
2. **Submodule Vacuum**: Cleans up empty submodule directory stubs and orphaned entries in `.gitmodules`.
3. **Smart Backup**:
   - Analyzes legacy files (like `.cursorrules`).
   - If user-added custom rules are found, it creates a `*.bak` file.
   - If only system-generated content is found, it deletes the file.
4. **Hub Sync**: Deploys the latest `AGENTS.md` and generates thin Spokes for all supported agents.

## 4. Repository Roles & Files

| Path | Role |
|---|---|
| `AGENTS.md` | The Sovereign Rule Hub (Canonical truth) |
| `PROJECT_RULE.md` | Local project-specific rule overrides |
| `.deuk-agent/config.json` | Project-specific initialization state |
| `.deuk-agent/tickets/` | Bounded execution contracts (Work orders) |
| `.deuk-agent/templates/` | Standardized blueprint for tickets and plans |
| `bin/deuk-agent-rule.js` | The Global Execution Proxy |

## 5. Strict Phase-Driven Workflow (TDW)

1. **Issue Ticket (Phase 1)**: `ticket create` defines the target scope. Use `--from-plan` to convert an implementation plan.
2. **APC Validation**: Before modifying code, the agent must fill out the APC (Agent Permission Contract) blocks `[BOUNDARY]`, `[CONTRACT]`, and `[PATCH PLAN]` in the ticket.
3. **Phase Transition**: Run `ticket move` to transition to Phase 2 (Execute). If the APC is incomplete, the transition is blocked.
4. **Execute & Verify (Phase 2)**: Changes are made and verified within the isolated boundary.
5. **Knowledge Distillation Archive**: When archiving, core information is extracted (Zero-Token Distillation) to save context tokens for long-term memory.
