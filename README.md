# DeukAgentRules

> A core module of the **Deuk Family**. Maximizes collaboration efficiency of AI agents through structured rules.

**npm package:** `deuk-agent-rule` · **CLI:** `deuk-agent-rule`

**Korean:** [README.ko.md](https://github.com/joygram/DeukAgentRules/blob/master/README.ko.md)

A **submodule-isolated collaborative framework** designed to be used alongside various coding agents such as Cursor, GitHub Copilot, Gemini / Antigravity, Claude, Windsurf, and JetBrains AI Assistant.
It standardizes project rules (`AGENTS.md`, `.cursor/rules`) and strongly prevents wasteful prompt token consumption and AI context hallucination through a **ticket-based workflow**.

> **🚀 Core Value:**
> Compresses the mandatory loaded context of approx. 1,500~2,000 tokens per session down to a mere 200~300 tokens. By isolating the AI to a specific **"Target Submodule"** using exact tickets (work orders), it prevents the AI from wandering through an entire monolithic repository.

---

## 🛠️ Getting Started (Workspace Initialization)

Install and initialize the package once at the project root.

```bash
npm install deuk-agent-rule
npx deuk-agent-rule init
```

Upon initialization, interactive questions will ask for the project's **tech stack** and **agent tools in use**. Based on your selections, optimized markdown templates and rule files (`.cursor/rules/*`) will be automatically generated and synchronized.
- If you don't need to change the tech stack later, simply run `npx deuk-agent-rule init` to refresh the rules.
- Suppress interactive prompts in CI or script environments by appending the `--non-interactive` flag.

---

## 🎯 The Ticket Workflow

Running `npx deuk-agent-rule init` deploys a **zero-touch scaffolding sandbox** at your workspace root, spawning two essential directories:

1. **`.deuk-agent-templates/` (Agent Templates)**: Houses the official blueprint (`TICKET_TEMPLATE.md`) dictating how AIs must process and report tasks. Committed alongside your source code to serve as the team's rulebook.
2. **`.deuk-agent-ticket/` (Ticket Execution Space)**: The covert space where volatile instructions (`TICKET-XXX.md`) are exchanged between agents and workers. (Automatically hidden by `.gitignore` to prevent security leaks and repository bloat).

The optimal **3-Step AI Coding Sequence** utilizing these sandbox folders is as follows.

### [Step 1] Ticket Creation & Submodule Isolation
Do not issue scattered, unbounded commands to your AI. Narrowing the **context** via a clear ticket is strictly required to prevent astronomical costs and accidental code corruption.

```bash
npx deuk-agent-rule ticket create --topic ui-refactoring --group frontend --project DeukUI --content "## Task: Plugin UI Refactoring"
```
This command instantly creates a templated `TICKET-ui-refactoring.md` file within the `.deuk-agent-ticket/` directory.
The developer must simply specify the exact isolated directory path (e.g., `src/client`) inside the `[Target Submodule]` attribute at the top of the generated file.

### [Step 2] Agent Execution & Handoff (Ticket Session)
Provide a single line of instruction to your AI chatbot (Cursor, Gemini, etc.):
> *"Open the recently issued `.deuk-agent-ticket/TICKET-ui-refactoring.md` ticket and strictly follow the checklist within the specified target submodule."*

The AI will faithfully read the defined Phases in the ticket and write optimized code while **completely blocking out unnecessary computations for unrelated server logic or sibling modules**. (This mechanism drastically reduces token costs).

### [Step 3] Status Review & Closure
As the AI writes the code, it will simultaneously update the markup checkboxes (`[x]`) inside the ticket. If the agent's session memory limit is approaching, simply leave the ticket file saved, turn off the chat window, open a fresh session, and issue [Step 2] again. The handoff (session transfer) is seamlessly completed.
Once all steps are accomplished, promote the Phase status to `[Phase Complete]`. Track all currently active tickets directly from the terminal:

```bash
npx deuk-agent-rule ticket list
```
```text
📦 Agent Tickets (Direct System Scan):
  ✅ [TICKET-DEUKUI-Button.md]
     Title: Add Button Component
     Target: DeukUI
     Status: [Complete]
  🔨 [TICKET-ui-refactoring.md]
     Title: Plugin UI Refactoring
     Target: DeukUI
     Status: [In Progress]
```

---

## ⚙️ CLI Reference & Advanced Options

Advanced commands for workflow automation and target control.

### Ticket-based Commands
| Command | Description |
|--------|------|
| `npx deuk-agent-rule ticket create --topic <name>` | Generates a new ticket document (accepts `--group`, `--project` options) |
| `npx deuk-agent-rule ticket list` | Lists and displays the status of all active tickets (Use `--archived`, `--all` options to query history) |
| `npx deuk-agent-rule ticket use --latest --path-only` | Returns only the file path of the most recent ticket for CI pipeline integrations |
| `npx deuk-agent-rule ticket archive --latest` | Securely moves completed tickets to the `archive/` folder and updates INDEX state (Attach AI reports via `--report`) |
| `npx deuk-agent-rule ticket reports` | Lists structurally preserved agent work reports (`.deuk-agent-ticket/reports/`) sorted by recency |

### Advanced Init Options
| Flag | Default | Description |
|--------|--------|------|
| `--non-interactive` | Off | For CI/Scripts. Disables interactive UI and adopts existing `.config.json` |
| `--interactive` | Off | Forces the interactive setup to reappear even if config already exists |
| `--cwd <path>` | Current dir | Adjust target workspace root (absolute/relative path) |
| `--dry-run` | Off | Simulates the execution text in the console without generating/altering files |
| `--backup` | Off | Safely creates `*.bak` copies of `AGENTS.md` and rule files before overwriting |

## Versioning Policy
Before pushing any core updates/feature changes to this package (`DeukAgentRules`), strictly bump the `version` inside `package.json` and publish it (`npm run sync:oss`).
