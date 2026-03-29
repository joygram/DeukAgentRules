# Handoff Tutorial: topic-index workflow

This tutorial explains when and how to store handoffs as files, how `npx deuk-agent-rule init` migrates legacy handoffs, and how to reduce recurring token usage across tools.

## 1) Why this exists

Without a structured handoff workflow, each new session repeats the same long context.

Typical pattern before migration:
- A single `LATEST.md` accumulates full content.
- Every agent/session reads most of that content again.
- Token cost scales with session count instead of change size.

After migration:
- Keep one compact index file: `DeukAgentRules/handoff/HANDOFF_LIST.md`.
- Keep full details in topic files under `.deuk-agent-handoff/`.
- Load only one relevant topic file when needed.

## 2) File layout

- Canonical body files (local, gitignored):
  - `.deuk-agent-handoff/<group>/<topic>-YYYYMMDD-HHmmss.md`
- Machine index:
  - `.deuk-agent-handoff/INDEX.json`
- Human-readable list for multi-agent pickup:
  - `DeukAgentRules/handoff/HANDOFF_LIST.md`
- Legacy pointer only (optional compatibility):
  - `DeukAgentRules/handoff/LATEST.md` as a short redirect stub

## 3) Init migration behavior

When you run:

```bash
npx deuk-agent-rule init
```

and the repo still has a legacy full-body `LATEST.md`, the CLI does this:

1. Detects legacy `LATEST.md` body.
2. Creates a topic file in `.deuk-agent-handoff/<group>/...`.
3. Creates/updates `.deuk-agent-handoff/INDEX.json`.
4. Creates/updates `DeukAgentRules/handoff/HANDOFF_LIST.md`.
5. Rewrites `LATEST.md` to a pointer stub.

Prompt behavior:
- Interactive mode: asks whether to migrate.
- `--non-interactive`: auto-migrates.

## 4) Command workflow

### Create

```bash
npx deuk-agent-rule handoff create \
  --topic container-unified \
  --group sub \
  --project DeukUI \
  --content "## Task: Container 생성기 단일화"
```

### List

```bash
npx deuk-agent-rule handoff list --group sub --project DeukUI --limit 20
```

### Use

```bash
npx deuk-agent-rule handoff use --latest --path-only
npx deuk-agent-rule handoff use --topic container --print-content
```

### Manual migration command

```bash
npx deuk-agent-rule handoff migrate
```

## 5) Grouping strategy

Default groups:
- `main`: main project-level deliverables
- `sub`: subproject and implementation tracks
- `discussion`: design debate, risk logs, decisions in progress

You can still use custom groups with `--group <name>`.

## 6) When to keep inline vs file

Keep in chat only when:
- Single-session temporary note
- Not reused by another agent

Persist to file when:
- Cross-session continuation is expected
- Multiple agents/tools will share context
- Risks/constraints/decisions must stay auditable

## 7) Cost-performance guide by tool

These are practical recommendations, not strict limits.

- Claude Sonnet:
  - Best for complex refactors and strong reasoning.
  - Most cost-effective when loading compact index + one topic file.
  - Recommendation: always start from `handoff use --latest` or `--topic`.

- Gemini (Flash / Pro):
  - Flash is very low-cost for rapid iteration.
  - Pro is strong for broad codebase exploration.
  - Recommendation: keep handoff structure anyway to improve precision and consistency.

- Cursor:
  - Great editing workflow, but always-applied rules are frequently reloaded.
  - Recommendation: keep handoff index short and topic files focused.

- Antigravity:
  - Works best with focused, small context chunks.
  - Recommendation: pass one task-specific topic file at a time.

- Copilot:
  - Strong inline assistance and review flows.
  - Recommendation: reference topic file paths explicitly when context is long.

## 8) Expected token savings

Example estimate (typical):

- Before: legacy `LATEST.md` body loaded repeatedly
  - ~1,500 to 2,000 tokens/session recurring context
- After: compact handoff list loaded by default
  - ~200 to 300 tokens/session recurring context

Estimated reduction:
- About 1,300 tokens/session saved
- About 83% less recurring context load

Multi-agent session (3 tools):
- ~3,900 recurring tokens saved per cycle

Cost intuition:
- Savings vary by model pricing and traffic volume.
- Biggest practical benefit is often quality: less stale context, better focus, fewer wrong carry-overs.

## 9) Recommended handoff template

```markdown
## Task: [title]
### Files to modify
- path/to/file: [what to change]
### Design decisions
- [decision]
### Constraints
- [constraint]
```

## 10) Troubleshooting

- `handoff list` shows no entries:
  - Create one with `handoff create` or run `handoff migrate`.
- `handoff use` cannot find entry:
  - Check `--topic` keyword, then inspect `.deuk-agent-handoff/INDEX.json`.
- Team wants versioned handoffs in git:
  - Remove or adjust `.gitignore` entry for `.deuk-agent-handoff/` by team policy.
