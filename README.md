# DeukAgentRules

> **Part of the Deuk Family** — Empowering AI Agents with structured rules.

**npm package:** `deuk-agent-rule` · **CLI:** `deuk-agent-rule`

**한국어:** [README.ko.md](https://github.com/joygram/DeukAgentRules/blob/master/README.ko.md)

Versioned templates for `AGENTS.md` and `.cursor/rules` for Cursor, GitHub Copilot, Gemini / Antigravity, Claude (via Cursor or Claude Code), Windsurf, JetBrains AI Assistant, and other coding agents that read project rules: shared handoff format, concise execution, stronger cost-efficiency and responsiveness.

> **Feature highlight:** Introduces zero-touch template scaffolding and target module isolation. This reduces repeated handoff context from ~1,500-2,000 tokens to ~200-300 tokens per session, preventing AI context bleeding and **drastically cutting token waste**.

## Initialize a workspace

```bash
npm install deuk-agent-rule
npx deuk-agent-rule init
```

On the **first** `init` in a repo (no `.deuk-agent-rule.config.json`), a short **interactive** setup runs. **Later** `npx deuk-agent-rule init` reuses those choices and only applies template updates — no need for `--non-interactive` unless you are in **CI**. Use **`--interactive`** to change answers, or delete/edit the config file.

Running `init` for the first time (example):

```
$ npx deuk-agent-rule init

DeukAgentRules init — let's configure your workspace.

? What is your primary tech stack?
  1) Unity / C#
  2) Next.js + C#
  3) Web (React / Vue / general)
  4) Java / Spring Boot
  5) Other / skip
  Choice [1-5]: 3

? Which agent tools do you use? (comma-separated numbers, or 'all')
  1) Cursor
  2) GitHub Copilot
  3) Gemini / Antigravity
  4) Claude (Cursor / Claude Code)
  5) Windsurf
  6) JetBrains AI Assistant
  7) All of the above
  8) Other / skip
  Choices: all

  Stack : web
  Tools : cursor, copilot, gemini, claude, windsurf, jetbrains, all, other

AGENTS.md: injected (inject)
rule copied: .cursor/rules/deuk-agent-rule-multi-ai-workflow.mdc
rule copied: .cursor/rules/deuk-agent-rule-delivery-and-parallel-work.mdc
rule copied: .cursor/rules/deuk-agent-rule-git-commit.mdc
```

To skip questions (CI or scripted use):

```bash
npx deuk-agent-rule init --non-interactive
```

After a package upgrade:

```bash
npm update deuk-agent-rule
npx deuk-agent-rule init
```

Use `init --non-interactive` only in **CI** or headless scripts. You do **not** need a separate `merge` for routine upgrades: **`init` refreshes** the bundled `.cursor/rules` files. With default `--rules prefix`, existing **`deuk-agent-rule-*.mdc`** copies are **overwritten** from the new package so template fixes reach your repo. Unprefixed rule files you keep for local overrides are not touched. Only the **marker region** in `AGENTS.md` is replaced; your text outside stays.

### 🚀 Zero-Touch Scaffolding & Sandboxing

Running `npx deuk-agent-rule init` now automatically scaffolds two vital directories at your workspace root:

1. **`.deuk-agent-templates/` (Rule Skeleton)**
   - Contains official templates (like `HANDOFF_TEMPLATE.md`) defining how agents should structure their tasks. This folder acts as your system prompt baseline and is committed to Git.
2. **`.deuk-agent-handoff/` (Ticket Instances)**
   - The volatile space where actual task handoffs (`TICKET-XXX.md`) are issued. This folder is forcibly added to **`.gitignore`** by the system, ensuring task histories never leak into your source code.

### 💰 Token Cost Reduction via Submodule Isolation

In large codebases (e.g., frontend and backend overlapping in a monorepo), dumping all rules and progress into a single `AGENTS.md` file forces the AI to process irrelevant backend specs while tweaking frontend code, burning massive token costs.

DeukAgentRules enforces a **Ticket-based Handoff Structure**:
- By specifying the `[Target Submodule]` inside the exported `.deuk-agent-handoff/TICKET.md` file, the agent is strictly sandboxed.
- It only loads logic and rules specific to that submodule, effectively preventing hallucination and operating cost-effectively in a narrowed context boundary.

### Handoffs (multi-session and tool handover)

Quick commands:

```bash
npx deuk-agent-rule handoff create --topic container-unified --group sub --project DeukUI --content "## Task: ..."
npx deuk-agent-rule handoff list --group sub --project DeukUI --limit 20
npx deuk-agent-rule handoff use --latest --path-only
```

Optionally, if you use an editor with a **Plans** panel, mirror the same Markdown body under **`.cursor/plans/deuk-handoff.plan.md`** (or `deuk-handoff-<topic>.plan.md`) so it appears there; keep it in sync with the canonical file under `.deuk-agent-handoff/` and index pointers in `DeukAgentRules/handoff/HANDOFF_LIST.md`.

For temporary handoffs within a single session, write them inline in chat; when repeatedly referenced, shared across multiple agents, or recording risks, convert to an internal `.md` file. The default storage path is the local `.deuk-agent-handoff/` directory; commit to the repository only when requested by the user or following established team conventions.

### Handoff system (cost guide)

- **Claude Sonnet:** Best when you keep only index + selected topic file in context.
- **Gemini (Flash/Pro):** Strong cost-performance for broad exploration; still benefits from topic handoffs.
- **Cursor:** Biggest gain from compact handoff index because always-applied rules are loaded often.
- **Antigravity:** Lightweight runs benefit from loading only one topic file per task.

See full examples and workflow tutorial: [`docs/handoff-tutorial.md`](docs/handoff-tutorial.md).

### Key options

| Flag | Default | Description |
|------|---------|-------------|
| `--non-interactive` | off | CI/scripts: no prompts; no saved-config path |
| `--interactive` | off | Force the setup questions even if `.deuk-agent-rule.config.json` exists |
| `--cwd <path>` | current directory | Target repo root |
| `--dry-run` | off | Print actions without writing |
| `--tag <id>` | `deuk-agent-rule` | Marker id: `<!-- <id>:begin/end -->` |
| `--agents <mode>` | `inject` | `inject` \| `skip` \| `overwrite` |
| `--rules <mode>` | `prefix` | `prefix` \| `skip` \| `overwrite` |
| `--backup` | off | Write `*.bak` before overwrite |

### Bundled rules

- **`multi-ai-workflow.mdc`** — `alwaysApply: true`
- **`delivery-and-parallel-work.mdc`** — `alwaysApply: true` (vertical slices, portfolio priority, parallel ownership, scoped refactors)
- **`git-commit.mdc`** — `alwaysApply: false`

### `merge` (stricter)

Same flags; `AGENTS.md` inject fails without markers unless `--append-if-no-markers`. Default `--rules skip`.

### Caveats

- Multiple `alwaysApply: true` rules all apply — trim duplicates if context grows too large.
- Do **not** run `init` from `postinstall` without an explicit team decision.

## Versioning

Bump `version` in `package.json` before publishing.
