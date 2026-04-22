# [Design] Decoupling Domain Rules via Frontmatter-Driven Assembly

## 🎯 Background & Motivation
Currently, `DeukAgentRules` is heavily coupled with domain-specific rules (`DeukPack` codec rules, `DeukRag` RAG-first locks). 
- **Issue 1**: `DeukAgentRules` should be generic and universally applicable to any project, not just `DeukFamily`.
- **Issue 2**: `DeukRag` is an optional MCP server. Its strict rules should only activate if the environment actually supports it.
- **Issue 3**: The current mechanism uses hardcoded tag strings (`<!-- deuk-agent-rule:begin -->`) for a monolithic injection, making it rigid.

The goal is to transition to a modular, Frontmatter-driven rule assembly system where domain rules are decoupled and dynamically injected based on the environment.

## 🏗️ Architecture & Design Decisions

### Decision 1: Rule Modularity (Plugin System)
Instead of a monolithic `bundle/AGENTS.md`, we will split rules into components within a new `bundle/rules.d/` directory.
- `core-workflow.md` (TDD, Ticket Formats)
- `deukpack-strict.md` (DeukPack specific)
- `deukrag-mcp.md` (RAG-First rules)

### Decision 2: Frontmatter Rule Definitions
Each modular rule file will use YAML Frontmatter to declare its applicability conditions.
Example `deukrag-mcp.md`:
```yaml
---
id: deukrag-hardlock
condition:
  mcp_exists: "deukrag"
inject_target: ["AGENTS.md", "gemini.md"]
---
## 🧠 DeukRag Knowledge Engine & RAG-FIRST HARD LOCK
...
```

### Decision 3: Local Project Overrides
Projects like `DeukPack` can define their own `.deuk-agent/domain-rules/` folder containing their Frontmatter rules. The `init` CLI will scan both the global `DeukAgentRules/bundle` and the local project, compiling them into the final `AGENTS.md` block.

### Decision 4: Preserving User Edits (Tag vs Frontmatter)
While Frontmatter determines *what* to include, we still need a way to safely inject this compiled string into a user's `AGENTS.md` without overwriting their custom notes.
We will retain the `<!-- deuk-agent-rule:begin -->` HTML markers in `AGENTS.md` strictly as an **injection boundary**. However, the *content* inside the boundary will be dynamically generated based on the Frontmatter rules.

## 🛠️ Proposed Components & Interface

#### 1. CLI Rule Compiler (`cli-rule-compiler.mjs`)
A new module responsible for:
1. Parsing Frontmatter of all `.md` files in `rules.d/` and local `.deuk-agent/domain-rules/`.
2. Evaluating `condition` fields (e.g., checking `.local/config.yaml` for DeukRag).
3. Concatenating valid rules.

#### 2. Core Template Cleanup
- **[MODIFY]** `bundle/AGENTS.md` & `bundle/gemini.md`: Remove all DeukPack and DeukRag specific text. Leave only generic workflow, tone, and communication protocols.

#### 3. Submodule Rule Migration
- The `DeukPack` rules will be moved completely out of `DeukAgentRules` and placed into `workspace/i/DeukPack/.deuk-agent/domain-rules/`.

## 🛑 Strict Constraints & Safety
- **Backward Compatibility**: Projects that do not use the new Frontmatter system should still receive the core workflow rules seamlessly.
- **Fail-Safe**: If an MCP check fails, the DeukRag rules must gracefully degrade (not throw an error that stops initialization).

## ❓ Open Questions
1. **Condition Evaluation**: For `DeukRag`, should we check the presence of the `mcp-server` configuration in the user's IDE config (e.g., `claude_desktop_config.json` or `config.yaml`), or rely on a simple `.deuk-agent-rule.config.json` flag?
2. **Frontmatter Parser**: We will need a lightweight Frontmatter parser (like `gray-matter` or a simple Regex fallback) in the CLI scripts. Is adding a small dependency acceptable, or should we use Regex?
