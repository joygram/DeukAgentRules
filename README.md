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

> **🚀 3.0 Major Update:**
> We have officially deprecated monolithic `.cursorrules`. v3.0 introduces the **Hub-Spoke model** where `AGENTS.md` is the single source of truth, and IDE-specific rules act as thin entry-point pointers.

### 🗺️ Concept & Architecture
- **Hub-Spoke**: `AGENTS.md` is the Hub; IDE rules are Spokes. No more rule duplication.
- **Global Proxy**: `npx` commands automatically route to your local workspace source for zero-latency development.
- **Submodule Isolation**: Forces AI agents to stay within bounded directory scopes, preventing astronomical context costs.
- **Zero-Legacy**: Automatic vacuuming of deprecated v1/v2 configurations and empty submodule stubs.

### 📚 Detailed Documentation
| Doc | Purpose |
|---|---|
| [docs/architecture.md](docs/architecture.md) | High-level system structure and visual infographics |
| [docs/how-it-works.md](docs/how-it-works.md) | Detailed CLI mechanics, initialization lifecycle, and file roles |
| [docs/principles.md](docs/principles.md) | Design philosophy: Hub-Spoke, Zero-Legacy, and Source Sovereignty |
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

---

## 🎯 The Protocol Workflow

The workflow is governed by a **Ticket-Driven Execution Contract**.

1. **Scaffolding**: `init` deploys `.deuk-agent/templates/` and `AGENTS.md`.
2. **Ticketing**: `ticket create --topic feature-x` generates a bounded work order in `.deuk-agent/tickets/`.
3. **Execution**: The AI agent reads the ticket, locks onto the **Target Submodule**, and executes phases.
4. **Verification**: The agent performs a side-effect audit and convention check before closure.
5. **Archiving**: Completed tickets move to `reports/` to build the **Engineering Memory Engine**.

---

## ⚙️ CLI Reference

Delegate these to your AI agent via natural language prompts!

| Command | Description / Example Prompt |
|--------|------|
| `deuk-agent-rule init` | Synchronizes the rule Hub and Spoke pointers. <br>💬 *"Initialize project rules"* |
| `deuk-agent-rule ticket create` | Issues a new execution contract. <br>💬 *"Create ticket: refactor-ui"* |
| `deuk-agent-rule ticket list` | Displays active work orders. <br>💬 *"Show active tickets"* |
| `deuk-agent-rule ticket archive` | Securely stores completed work. <br>💬 *"Archive ticket 068"* |

---

### 🏷️ Keywords
`#AI-Orchestration` `#Agentic-Workflow` `#DeukFamily` `#Engineering-Intelligence` `#Zero-Legacy` `#High-Signal-Coding` `#AI-Protocol` `#CursorRules` `#CopilotInstructions` `#LLM-Control-Plane`
