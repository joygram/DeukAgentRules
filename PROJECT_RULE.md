---
architecture_docs: "docs/architecture.md"
---

# Project Rules — DeukAgentFlow

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
| `bin/deuk-agent-flow.js`, `bin/deuk-agent-flow.js` | Global proxy only | No logic changes |

### CLI Proxy (Stale Tarball Prevention)
- `bin/deuk-agent-flow.js` = primary global proxy. `bin/deuk-agent-flow.js` is a compatibility wrapper.
- Real logic lives in `scripts/`. Proxy traces CWD upward to find local source.

## Workflow Pointer

- Follow `core-rules/AGENTS.md` for ticket flow, evidence handling, silent output, and MCP/RAG usage.

## Release / Version Policy

- Every individual AgentRule/DeukAgentFlow behavior fix must include a patch version bump in `package.json` and `package-lock.json`.
- Docs-only, investigation-only, and ticket-only changes do not require a version bump unless they change distributed agent behavior.
- Do not create commits or tags automatically; keep the version bump in the working tree unless the user explicitly asks for a release.

## DC-CODEGEN: Generated File Mapping

| Generated | Source | Build |
|-----------|--------|-------|
| Consumer `.cursor/rules/` spokes | `templates/rules.d/` | `npx deuk-agent-flow init` |
| Consumer `AGENTS.md` | `core-rules/AGENTS.md` | `npx deuk-agent-flow init` |

## DC-* Guards

| Guard | Rule |
|-------|------|
| DC-OSS-EDIT | OSS repositories are public release surfaces only. Never edit them directly; make changes in the main workspace source repo and propagate them through the sync script flow. |
| DC-LEGACY | No v1/v2 HTML markers (`<!-- deuk-agent-flow:begin -->`). Templates use copy-only distribution. |
| DC-OSS | `scripts/sync-oss.mjs` controls public distribution. `.internal.` files and `ticket/` dir are auto-excluded. |
| DC-OSS-NAMING | During OSS sync, treat the OSS repo as the public OSS release surface. Public OSS commit messages must describe the released change itself and must not use `sync` as the main semantic label. Reserve `sync` wording for mechanical tree synchronization only. |

## Build & Test

| Action | Command |
|--------|---------|
| Lint rules | `npx deuk-agent-flow lint:md` |
| Run tests | `node --test scripts/tests/*.test.mjs` |
| Sync OSS | `node scripts/sync-oss.mjs` |

## Ticket Guard Reminder

- `ticket create` 직후 placeholder 상태(본문/APC/compact plan 미충족)는 미완료다. 실행 작업 전에 반드시 채워야 한다.
