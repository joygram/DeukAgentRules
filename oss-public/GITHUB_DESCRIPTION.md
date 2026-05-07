# GitHub repository — About description

**Single source of truth for the About field.** Edit this file only; release and packaging steps are in [`RELEASING.md`](RELEASING.md).

---

## Paste into GitHub — English (recommended)

GitHub **About** description field (keep under ~350 characters if the UI enforces a limit):

```
Deuk Agent Flow — stop losing AI coding work between chats. Repo-owned tickets, scope, verification, and memory for Codex, Copilot, Claude Code, Cursor, and more.
```

## Paste into GitHub — Korean (optional)

```
Deuk Agent Flow — AI 코딩 작업이 대화창 밖으로 흘러내리지 않게. Codex, Copilot, Claude Code, Cursor 작업을 티켓, 범위, 검증, 기억으로 레포에 남깁니다.
```

## Even shorter (topics / subtitle)

- EN: `Deuk Agent Flow — AI coding work that survives the chat`
- KO: `Deuk Agent Flow — 대화창 밖에 남는 AI 코딩 작업`

## GitHub repository — Topics (recommended)

Add under **About → Topics** (and mirror on npm via `package.json` `keywords`):

- `deuk-family`
- `deukpack-ecosystem`
- `deuk-agent-rule`
- `deuk-agent-flow`
- `agent-config`
- `ai-guardrails`
- `ai-coding-agent`
- `coding-agent`
- `agent-workflow`
- `agent-skills`
- `agentic-workflow`
- `ticket-driven-workflow`
- `claude-code`
- `claude-md`
- `agents-md`
- `cursor-rules`
- `copilot-instructions`
- `codex`
- `llm-coding`
- `engineering-memory`
- `workflow-automation`
- `developer-tools`

## Topic positioning notes

Use related-project links to capture adjacent search intent from people already looking for
Claude Code skills, AGENTS.md conventions, Cursor rules, and coding-agent instructions.
Position Deuk Agent Flow as the workflow and guardrail layer that complements prompt-level
guideline repositories.

Avoid `karpathy` as a repository topic unless there is an explicit campaign reason. Prefer
`agent-skills`, `claude-code`, and `ai-guardrails` so the project benefits from adjacent
search traffic without implying affiliation.
