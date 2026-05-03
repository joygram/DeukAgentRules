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
| DC-SILENT-OUTPUT | While working, do not emit progress commentary or interim summaries; only the required ticket-start line, blockers, user decisions, and final answers are allowed. |

## Workflow Boundary

- Issue/regression reports are review-gated. Create/fill the ticket first, then wait for user approval before Phase 2 execution; pre-ticket wording such as "원인 분석 및 해결" is not execution approval.
- After Phase 1, the main ticket may receive lifecycle verification outcomes. Do not move execution logs, command transcripts, completion summaries, or verification results into planning text.
- Lifecycle state changes (`move`, `close`, `archive`) should be captured as lifecycle events, not used as a reason to reopen document boundaries.
- If the work scope changes materially, prefer a new ticket over repeated edits to the old ticket/plan pair.

## Build & Test

| Action | Command |
|--------|---------|
| Lint rules | `npx deuk-agent-rule lint:md` |
| Run tests | `node --test scripts/tests/*.test.mjs` |
| Sync OSS | `node scripts/sync-oss.mjs` |

## Ticket Guard Reminder

- `ticket create` 직후 placeholder 상태(본문/APC/compact plan 미충족)는 미완료다. 실행 작업 전에 반드시 채워야 한다.
