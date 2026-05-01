# DeukAgentRules 오가닉 유입 계획

작성일: 2026-05-02

## 목표

DeukAgentRules의 오가닉 유입 목표는 npm 다운로드만 늘리는 것이 아니다. 목표는 다음 루프를 만드는 것이다.

```text
문제 인식 → 에디터에서 발견 → 레포에 설치 → badge/report 노출 → 다른 개발자가 발견 → 재설치
```

이를 위해 CLI는 실행 엔진으로 유지하고, VS Code/Cursor 확장과 GitHub 노출 표면을 유입 장치로 확장한다.

## 핵심 오가닉 루프

### 1. Marketplace discovery loop

VS Code Marketplace와 Open VSX에 companion extension을 배포한다.

역할:

- `Deuk: Init Rules`
- `Deuk: Create Ticket`
- `Deuk: Show Active Ticket`
- `Deuk: List Open Tickets`
- `Deuk: Archive Closed Tickets`
- `Deuk: Sync Agent Instructions`
- status bar: `Deuk: No Ticket`, `Deuk: 12/20 Open`, `Deuk: Phase 2`
- tree view: Active Ticket, Open Tickets, Rule Spokes, Agent Integrations
- walkthrough: install guardrails, create first ticket, connect agents

VS Code Extension Manifest의 `categories`, `keywords`, `badges`, `contributes.commands`, `contributes.views`, `contributes.walkthroughs`를 적극 활용한다.

권장 Marketplace keywords:

```text
ai, agent, coding-agent, cursor, codex, claude, copilot,
agents-md, rules, guardrails, ticket, workflow, vscode
```

### 2. GitHub visibility loop

레포 안에 보이는 신호를 만든다.

도입할 산출물:

```bash
npx deuk-agent-rule doctor --markdown
npx deuk-agent-rule badge
npx deuk-agent-rule report pr
```

예상 출력:

```md
## AI Agent Guard Status

- Ticket workflow: enabled
- Active ticket: yes
- Open tickets: 12/20
- Cursor rules: connected
- Copilot instructions: connected
- AGENTS.md hub: connected
- Generated file guard: enabled
```

README badge 예시:

```md
[![AI Agent Guarded](https://img.shields.io/badge/AI%20Agent-Guarded-2f6fed)](...)
```

이 badge는 “이 레포는 AI agent guarded”라는 사회적 신호를 만든다.

### 3. Agent instruction hub loop

사용자는 지침 파일을 매번 직접 관리하고 싶어 하지 않는다. DeukAgentRules는 “한 번 init하면 주요 에이전트 지침 파일이 연결된다”는 경험을 제공해야 한다.

권장 명령:

```bash
npx deuk-agent-rule expose all
npx deuk-agent-rule expose cursor
npx deuk-agent-rule expose copilot
npx deuk-agent-rule expose codex
npx deuk-agent-rule expose claude
```

생성/동기화 대상:

| 대상 | 파일 |
|---|---|
| Codex | `AGENTS.md`, `.codex/AGENTS.md` |
| Cursor | `.cursor/rules/deuk-agent.mdc` |
| Copilot | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` |
| Claude Code | `CLAUDE.md`, `.claude/commands/*`, `.claude/skills/*` |
| Gemini | `GEMINI.md` |
| Windsurf | `.windsurf/rules/*` |

초기 구현은 thick sync가 아니라 pointer sync가 좋다. 각 spoke는 DeukAgentRules hub를 가리킨다.

### 4. Skill registry loop

스킬은 유입을 만든다. 사람들은 “규칙 시스템”보다 “내 문제를 바로 푸는 pack”에 반응한다.

권장 구조:

```text
.deuk-agent/skills/
  safe-refactor/
    skill.json
    SKILL.md
  generated-file-guard/
    skill.json
    SKILL.md
  unity-codegen/
    skill.json
    SKILL.md
```

권장 명령:

```bash
npx deuk-agent-rule skill list
npx deuk-agent-rule skill add safe-refactor
npx deuk-agent-rule skill expose cursor
npx deuk-agent-rule skill expose claude
```

커뮤니티 유입 포인트:

- “Cursor safe refactor rule pack”
- “Claude Code generated file guard skill”
- “Codex AGENTS.md ticket workflow pack”
- “Unity/Unreal/Next.js agent guard pack”

### 5. Content loop

초기 콘텐츠는 제품 설명보다 실패 사례 기반이어야 한다.

제목 후보:

- Stop Cursor from editing 40 files without a ticket
- No Ticket, No Code: guardrails for AI coding agents
- One AGENTS.md system for Cursor, Codex, Claude Code, and Copilot
- How to keep AI agents away from generated files
- A VS Code dashboard for your AI agent workflow

콘텐츠 CTA:

```bash
npx deuk-agent-rule init
```

VS Code extension이 출시되면:

```text
Install DeukAgentRules Companion for VS Code
```

## 제품 로드맵

### Phase 1: 문서/포지셔닝 정리

- README 상단 메시지 단순화
- Supported agents 섹션 추가
- GitHub About 문구 갱신
- 이 문서 세트를 공개 링크 가능한 상태로 정리

### Phase 2: VS Code Companion MVP

- extension package scaffold
- CLI discovery: global `deuk-agent-rule`, local source fallback
- status bar item
- tree view
- commands
- walkthrough
- Marketplace metadata

### Phase 3: Open VSX 동시 배포

- Eclipse account/publisher agreement/token 준비
- namespace 생성
- GitHub Action으로 Marketplace/Open VSX 동시 publish
- README badges 추가

### Phase 4: Doctor/Report/Badge

- `doctor --json`
- `doctor --markdown`
- `badge`
- `report pr`
- GitHub Actions optional workflow

### Phase 5: Skill Registry

- `.deuk-agent/skills.json`
- `skill add/list/expose/lint`
- first-party skill packs
- community contribution guide

## 성공 지표

| 영역 | 지표 |
|---|---|
| npm | weekly downloads, init execution count |
| GitHub | stars, forks, badge back-links, issues |
| VS Code | installs, activation count, walkthrough completion |
| Open VSX | installs from VS Code-compatible forks |
| Docs | README click-through, docs page referrals |
| Product | number of repos with `.deuk-agent/tickets/INDEX.json` |

## 우선순위 판단

가장 먼저 만들 것은 VS Code extension 전체 기능이 아니라 **보이는 상태 + 첫 티켓 생성**이다.

MVP 범위:

- status bar
- `Deuk: Init Rules`
- `Deuk: Create Ticket`
- `Deuk: List Open Tickets`
- tree view with active/open tickets
- walkthrough

MVP에서 하지 않을 것:

- 복잡한 webview dashboard
- remote telemetry
- team policy server
- GitHub App
- custom AI agent runtime

## 공식 자료 근거

- VS Code Contribution Points: https://code.visualstudio.com/api/references/contribution-points
- VS Code Views UX: https://code.visualstudio.com/api/ux-guidelines/views
- VS Code Commands: https://code.visualstudio.com/api/extension-guides/command
- VS Code Publishing Extensions: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- Open VSX publishing: https://github.com/eclipse/openvsx/wiki/Publishing-Extensions
- Open VSX project: https://github.com/eclipse/openvsx
- GitHub Copilot response customization: https://docs.github.com/en/copilot/concepts/prompting/response-customization
- VS Code Copilot custom instructions: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- Cursor Rules: https://docs.cursor.com/en/context/rules
- Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Claude Agent Skills: https://docs.claude.com/en/docs/claude-code/skills
- OpenAI Codex: https://openai.com/index/introducing-codex/
