<div align="center">
  <br />
  <img src="docs/assets/architecture-v3.png" width="800" alt="DeukAgentRules Architecture" />
  <br />
  <h1>DeukAgentRules v3.0</h1>
  <p>
    <a href="https://www.npmjs.com/package/deuk-agent-rule"><img src="https://img.shields.io/npm/v/deuk-agent-rule.svg" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/deuk-agent-rule"><img src="https://img.shields.io/npm/dt/deuk-agent-rule.svg" alt="npm downloads" /></a>
  </p>
  <p><b>Zero-Latency, High-Signal AI Orchestration Protocol</b></p>
  <p><i>The Sovereign Workflow Control Plane for AI Engineering</i></p>
  <p>Part of the <a href="https://deukpack.app">Deuk Family</a> ecosystem.</p>
</div>

---

**DeukAgentRules** is more than a rule generator; it is a **Sovereign Workflow Control Plane** designed for the age of autonomous AI agents.

By standardizing collaboration via the **Hub-Spoke Architecture** and a **Ticket-Driven Execution Model**, it eliminates context hallucination, reduces token consumption, and enforces rigorous engineering standards across monolithic and multi-module repositories.

> **Current readiness:**
> This release is deployment-ready for agent-driven repositories. It is currently most reliable in **OpenAI Codex** and **GitHub Copilot** workflows. Cursor, Windsurf, and MCP remain supported through pointer-style integration, but they should be validated per workspace before rollout.

> **🚀 3.2 Major Update:**
> Introduced **Platform Co-existence Protocol** and **Mode-Aware Workflow Gate** to enforce strict Agent Permission Contracts (APC) across different AI environments (Copilot, Cursor, Windsurf, MCP).

> **🚀 3.0 Major Update:**
> We have officially deprecated monolithic `.cursorrules`. v3.0 introduces the **Hub-Spoke model** where `AGENTS.md` is the single source of truth, and IDE-specific rules act as thin entry-point pointers.

### 🗺️ Main Features & Architecture

DeukAgentRules enforces a strict operating environment for AI agents through four core mechanisms:

1. **Zero-Copy Hub-Spoke Architecture**
   - **Hub**: `AGENTS.md` acts as the global single source of truth.
   - **Spoke**: IDE-specific rules (like `.cursorrules`) or `PROJECT_RULE.md` act as thin pointers.
   - **Benefit**: Eliminates rule duplication, preventing conflicting instructions and context hallucination across different IDEs (Cursor, Copilot, Windsurf).

2. **Ticket-Driven Workflow (TDW)**
   - Enforces a strict lifecycle: Plan → Execute → Verify → Archive.
   - Agents are explicitly forbidden from mutating code without an active ticket in `.deuk-agent/tickets/` (Anti-Shoveling rule).

3. **Platform Co-existence & Mode-Aware Workflow Gate**
   - Implements strong Agent Permission Contracts (APC) by making the workflow **Mode-Aware**.
   - In **Plan Mode**, agents are restricted to read-only operations and artifact generation. Execution and code mutation are only unlocked upon user approval into the Execute Phase.
   - Integrates with MCP Soft Gates to block unauthorized code changes.

4. **Zero-Token Knowledge Distillation**
   - When a ticket is archived, it is distilled into a zero-token summary and moved to `reports/`.
   - These reports are vectorized into DeukAgentContext, building a permanent Engineering Memory Engine without cluttering the agent's active context window.

### 📚 Detailed Documentation
| Doc | Purpose |
|---|---|
| [docs/architecture.md](docs/architecture.md) | High-level system structure and visual infographics |
| [docs/how-it-works.md](docs/how-it-works.md) | Detailed CLI mechanics, initialization lifecycle, and file roles |
| [docs/principles.md](docs/principles.md) | Design philosophy: Hub-Spoke, Zero-Legacy, and Source Sovereignty |
| [docs/product-positioning-research.ko.md](docs/product-positioning-research.ko.md) | Product positioning research for AI coding agent guardrails |
| [docs/karpathy-skills-vs-deukagent-positioning.ko.md](docs/karpathy-skills-vs-deukagent-positioning.ko.md) | Deep comparison of Karpathy-style skills, DeukAgentRules, and DeukAgentContext |
| [docs/vision-agent-guardrails.ko.md](docs/vision-agent-guardrails.ko.md) | Vision document for the multi-agent guardrail hub |
| [docs/organic-growth-plan.ko.md](docs/organic-growth-plan.ko.md) | Organic growth plan for VS Code, Open VSX, GitHub, and skill loops |
| **Korean Docs** | [README.ko.md](README.ko.md) · [docs/architecture.ko.md](docs/architecture.ko.md) |

---

## 🛠️ Installation & Setup

### 1. Global Installation (Standard User)
To prevent `npx` cache issues and "Local Traps", a global installation is strictly required.

```bash
npm install -g deuk-agent-rule
deuk-agent-rule init
```

### 2. Local Source Development (Maintainer/Power User)
v3.0 introduces a **Global CLI Proxy**. If you are developing inside the `DeukAgentRules` workspace, the global command will automatically delegate execution to your local source.

```bash
cd ~/workspace/DeukAgentRules
sudo npm link
deuk-agent-rule init  # Routes to local scripts/cli.mjs automatically
```

If you primarily work in Codex or Copilot, this is the recommended day-to-day setup. Those clients currently have the smoothest behavior with the hub-spoke and ticket-driven workflow.

---

## 🎯 The Protocol Workflow

The workflow is governed by a **Ticket-Driven Execution Contract**.

1. **Scaffolding**: `init` deploys `.deuk-agent/templates/` and `AGENTS.md` (or local pointers like `PROJECT_RULE.md`).
2. **Ticketing (Plan Phase)**: `ticket create --topic feature-x` generates a bounded work order in `.deuk-agent/tickets/`. During this phase, agents operate in **Plan Mode** and are restricted from mutating files.
3. **Execution (Execute Phase)**: Once authorized, the AI agent reads the ticket, locks onto the **Target Submodule**, and executes code changes. MCP Soft Gates ensure that unauthorized modifications are blocked.
4. **Verification**: The agent performs a side-effect audit and convention (e.g., DC-DUP) check before closure.
5. **Archiving (Archive Phase)**: Completed tickets undergo Zero-Token Knowledge Distillation and move to `reports/` to build the **Engineering Memory Engine** via DeukAgentContext.

---

## ⚙️ CLI Reference

Delegate these to your AI agent via natural language prompts!

| Command | Description / Example Prompt |
|--------|------|
| `deuk-agent-rule init` | Synchronizes the rule Hub and Spoke pointers. <br>💬 *"Initialize project rules"* |
| `deuk-agent-rule ticket create` | Issues a new execution contract. Use `--summary` plus `--plan-body` for a one-pass Phase 1 ticket. <br>💬 *"Create ticket: refactor-ui with filled APC"* |
| `deuk-agent-rule ticket list` | Displays active work orders. <br>💬 *"Show active tickets"* |
| `deuk-agent-rule ticket archive` | Securely stores completed work. <br>💬 *"Archive ticket 068"* |
| `deuk-agent-rule skill list` | Shows first-party thin skills such as `safe-refactor`, `generated-file-guard`, and `context-recall`. |
| `deuk-agent-rule skill add --skill safe-refactor` | Installs a skill into the local registry without changing the TDW/APC authority model. |
| `deuk-agent-rule skill expose --platform claude` | Exposes installed skills as platform-specific thin wrappers. Supported MVP platforms: `claude`, `cursor`. |
| `deuk-agent-rule skill lint` | Audits skill files for duplicate workflow contracts and unsafe generated-file guidance. |

---

## Related Ideas & Inspiration

DeukAgentRules shares the same concern as guideline-first projects like
[andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills):
AI coding agents often over-assume, over-engineer, and edit outside the requested scope.

Where prompt-level guideline files improve agent behavior inside one client,
DeukAgentRules adds a repository-level workflow layer: tickets, phase gates,
scoped permissions, verification, and archiveable engineering memory.

The first-party skill MVP keeps that boundary explicit: skills are short
`SKILL.md` playbooks for recurring failure patterns, while `core-rules/AGENTS.md`
remains the workflow authority. Use `skill add` and `skill expose` to make those
playbooks visible to Claude or Cursor without copying the full rule contract.

```bash
npx deuk-agent-rule init
npx deuk-agent-rule skill list
npx deuk-agent-rule skill add --skill safe-refactor
npx deuk-agent-rule skill expose --platform claude
```

---

### 🏷️ Keywords
`#AI-Orchestration` `#Agentic-Workflow` `#DeukFamily` `#Engineering-Intelligence` `#Zero-Legacy` `#High-Signal-Coding` `#AI-Protocol` `#CursorRules` `#CopilotInstructions` `#ClaudeCode` `#ClaudeMD` `#AgentsMD` `#AgentSkills` `#CodingAgent` `#AI-Guardrails` `#LLM-Control-Plane`
