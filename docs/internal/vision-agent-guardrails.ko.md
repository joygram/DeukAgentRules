# Deuk Agent Flow 비전: AI 에이전트 가드레일 허브

작성일: 2026-05-02

## 비전

Deuk Agent Flow는 특정 에이전트를 대체하지 않는다. 사용자가 이미 쓰는 Cursor, Codex, Claude Code, Copilot, Gemini, Windsurf 같은 도구 위에 **공통 작업 규율**을 얹는다.

장기 비전은 다음과 같다.

> Bring disciplined, ticketed, auditable execution to every AI coding agent.

한국어로는 다음처럼 표현한다.

> 모든 AI 코딩 에이전트에 티켓 기반 실행, 스코프 제한, 검증 가능한 작업 기록을 제공한다.

## 핵심 세계관

AI 코딩 에이전트의 문제는 “코드를 못 짠다”가 아니다. 문제는 **일을 너무 쉽게 벌인다**는 점이다.

- 요청보다 넓은 파일을 고친다.
- generated output을 직접 수정한다.
- 계획 없이 리팩터링한다.
- 작업이 끝난 뒤 왜 그렇게 했는지 남지 않는다.
- 에이전트별 지침 파일이 서로 어긋난다.

Deuk Agent Flow는 이 문제를 에이전트별 prompt tuning이 아니라 repository-level operating system으로 푼다.

## 제품 원칙

### 1. Bring your own agent

사용자는 에이전트를 바꾸고 싶어 하지 않는다. 이미 Cursor를 쓰는 사람은 Cursor 안에서, Claude Code를 쓰는 사람은 Claude Code 안에서, Codex를 쓰는 사람은 Codex 안에서 같은 규칙을 얻고 싶다.

Deuk Agent Flow는 특정 모델이나 클라이언트에 종속되지 않는 agent guardrail layer가 되어야 한다.

### 2. No Ticket, No Code

티켓은 문서가 아니라 실행 권한이다. 에이전트가 코드를 바꾸기 전에는 다음이 있어야 한다.

- 어떤 문제를 풀지
- 어떤 파일/모듈이 경계인지
- 무엇을 건드리면 안 되는지
- 어떤 검증을 할지
- 작업 후 무엇을 기록할지

이 원칙은 마케팅 문구로도 강하다.

### 3. One hub, many spokes

에이전트 지침 파일은 계속 늘어난다.

- `AGENTS.md`
- `.cursor/rules`
- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.windsurf/rules`

Deuk Agent Flow의 역할은 모든 파일을 두껍게 채우는 것이 아니라, 공통 허브를 만들고 각 도구별 spoke가 그 허브를 가리키게 하는 것이다.

### 4. Visible guardrails

npm CLI는 엔진이다. 하지만 유입과 습관화는 에디터에서 일어난다.

VS Code/Cursor companion extension은 다음을 보여줘야 한다.

- 현재 active ticket
- open ticket count
- phase
- missing rule spokes
- generated file guard status
- archive/verification state

보이는 guardrail이 되어야 사용자가 매일 기억한다.

### 5. Archive as project memory

작업이 끝나면 티켓은 단순히 닫히는 것이 아니라 long-term engineering memory가 된다. 이 구조는 agent memory 경쟁과 다르게 repository-owned memory라는 점에서 차별화된다.

## 미래 제품 표면

| 단계 | 제품 표면 | 역할 |
|---|---|---|
| 현재 | npm CLI | init, ticket, archive, lint, rules sync |
| 단기 | VS Code/Cursor companion | 온보딩, 상태 표시, 명령 실행, 유입 |
| 단기 | Open VSX 배포 | VS Code 계열 편집기 확장 |
| 중기 | Agent instruction hub | Cursor/Copilot/Codex/Claude/Gemini 지침 동기화 |
| 중기 | Skill registry | 워크플로우별 reusable guardrail pack |
| 중기 | Guard report/badge | GitHub README와 PR에서 오가닉 노출 |
| 장기 | Team policy/control plane | 조직 단위 AI coding policy 관리 |

## 성공한 제품의 첫 화면

첫 화면은 철학보다 사용자가 겪는 문제를 먼저 말해야 한다.

```text
Stop AI coding agents from making untracked, unsafe changes.

Deuk Agent Flow connects AGENTS.md and agent config to ticket-driven guardrails for Cursor, Codex,
Claude Code, Copilot, Gemini, Windsurf, and other coding agents.
```

한국어:

```text
AI 코딩 에이전트가 추적되지 않는 위험한 변경을 만들지 못하게 하세요.

Deuk Agent Flow는 Cursor, Codex, Claude Code, Copilot 등
여러 코딩 에이전트에 티켓 기반 가드레일을 제공합니다.
```

## 장기 카테고리 이름

Deuk Agent Flow가 선점해야 할 카테고리는 다음 중 하나다.

- AI coding agent guardrails
- Agent workflow control plane
- Repository-level agent policy
- Ticket-driven agent execution
- Multi-agent instruction hub

가장 직관적인 외부 메시지는 `AGENTS.md and agent config guardrails`다. 보조 메시지로 `AI coding agent guardrails`를 쓰고, 내부 아키텍처 문서에서는 `workflow control plane`을 유지해도 된다.

## 비전 문서의 외부 링크 사용 원칙

외부 링크는 “DeukAgentRules가 어떤 생태계 위에 서 있는지”를 증명하는 근거다. 그러나 CTA는 외부 문서가 아니라 DeukAgentRules 액션이어야 한다.

좋은 패턴:

```md
Works with Cursor Project Rules, GitHub Copilot instructions,
Codex AGENTS.md, and Claude Code memory/skills.

Start:
npx deuk-agent-rule init
```

피해야 할 패턴:

```md
먼저 Cursor 공식 문서를 읽고, Copilot 문서를 읽고, Claude 문서를 읽으세요.
```

사용자를 외부로 내보내는 링크는 하단 근거 섹션에 둔다.

## 공식 자료 근거

- VS Code Contribution Points: https://code.visualstudio.com/api/references/contribution-points
- VS Code Extension Manifest: https://code.visualstudio.com/api/references/extension-manifest
- Cursor Rules: https://docs.cursor.com/en/context/rules
- GitHub Copilot response customization: https://docs.github.com/en/copilot/concepts/prompting/response-customization
- VS Code Copilot custom instructions: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- Claude Code memory: https://docs.claude.com/en/docs/claude-code/memory
- Claude Agent Skills: https://docs.claude.com/en/docs/claude-code/skills
- OpenAI Codex: https://openai.com/index/introducing-codex/
