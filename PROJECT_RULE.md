---
architecture_docs: "docs/architecture.md"
---

# Project Rules — DeukAgentRules

## Architecture Boundaries

### Hub-Spoke (SSoT)
- Hub = `core-rules/AGENTS.md` (single source of truth for all agent rules)
- Spokes = `.cursor/rules/`, `.github/copilot-instructions.md` etc. → pointer-only, no hardcoded rules.
- Project-specific context = `PROJECT_RULE.md` in each consumer workspace.

### Module Ownership
| Module | Owner | Editable |
|--------|-------|----------|
| `core-rules/AGENTS.md` | Core rules hub | Yes (source of truth) |
| `templates/` | Distributed to consumers via `init` | Yes |
| `scripts/` | CLI business logic | Yes |
| `bin/deuk-agent-rule.js` | Global proxy only | No logic changes |

### CLI Proxy (Stale Tarball Prevention)
- `bin/deuk-agent-rule.js` = global proxy. No business logic.
- Real logic lives in `scripts/`. Proxy traces CWD upward to find local source.

## DC-CODEGEN: Generated File Mapping

| Generated | Source | Build |
|-----------|--------|-------|
| Consumer `.cursor/rules/` spokes | `templates/rules.d/` | `npx deuk-agent-rule init` |
| Consumer `AGENTS.md` | `core-rules/AGENTS.md` | `npx deuk-agent-rule init` |

## DC-* Guards

| Guard | Rule |
|-------|------|
| DC-LEGACY | No v1/v2 HTML markers (`<!-- deuk-agent-rule:begin -->`). Templates use copy-only distribution. |
| DC-OSS | `scripts/sync-oss.mjs` controls public distribution. `.internal.` files and `ticket/` dir are auto-excluded. |

## Build & Test

| Action | Command |
|--------|---------|
| Lint rules | `npx deuk-agent-rule lint:md` |
| Run tests | `node --test scripts/tests/` |
| Sync OSS | `node scripts/sync-oss.mjs` |
