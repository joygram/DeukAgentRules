# DeukAgentRules 제품 포지셔닝 리서치

작성일: 2026-05-02

## 요약

DeukAgentRules의 유입 포지션은 `npm` 패키지가 아니라 **AI 코딩 에이전트 안전 가드레일**이어야 한다. 일반 사용자는 “규칙 생성기”를 찾지 않는다. 대신 Cursor, Copilot, Codex, Claude Code 같은 도구가 코드베이스를 과하게 수정하거나, 지침 파일이 도구별로 흩어지거나, 작업 기록이 남지 않는 문제를 겪는다.

따라서 제품 메시지는 다음 한 문장으로 수렴한다.

> DeukAgentRules는 Cursor, Codex, Claude Code, Copilot 같은 AI 코딩 에이전트가 티켓, 스코프, 검증 기록 없이 코드를 바꾸지 못하게 하는 프로젝트 가드레일이다.

## 시장 관찰

AI 코딩 도구는 에디터, 터미널, GitHub, 에이전트별 지침 파일로 분산되어 있다. 공식 문서 기준으로도 각 제품은 서로 다른 확장 표면을 갖는다.

| 생태계 | 공식 확장/지침 표면 | DeukAgentRules의 기회 |
|---|---|---|
| VS Code | Extension Manifest, Contribution Points, Views, Walkthroughs, Commands, Marketplace publishing | CLI를 보이는 온보딩/대시보드로 감싸는 companion extension |
| Open VSX | VS Code API 호환 확장 공개 레지스트리와 `ovsx` publishing | VS Code Marketplace 밖의 VS Code 계열 편집기 유입 |
| GitHub Copilot | `.github/copilot-instructions.md`, `.github/instructions`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | 여러 지침 파일을 한 허브에서 동기화하는 가치 |
| Cursor | `.cursor/rules`, Project Rules, `AGENTS.md`, legacy `.cursorrules` | Cursor 사용자의 rule drift와 팀 규칙 공유 문제 해결 |
| Claude Code | `CLAUDE.md`, custom slash commands, project/user skills | DeukAgentRules skill registry와 ticket workflow를 Claude 표면으로 노출 |
| Codex | `AGENTS.md` 기반 repository instructions | DeukAgentRules의 Hub-Spoke 모델과 직접 정렬 |

## 사용자 세그먼트

### 1. 이미 에이전트를 쓰다가 데인 개발자

가장 전환 가능성이 높은 초기 사용자다.

- “Cursor가 30개 파일을 고쳤다”
- “Claude Code가 계획 없이 문서를 만들었다”
- “Codex가 generated file을 직접 수정했다”
- “Copilot instructions, AGENTS.md, CLAUDE.md가 서로 다르다”

이 세그먼트에는 기능보다 손실 회피 메시지가 강하다.

### 2. AI 도입을 관리해야 하는 팀 리드

팀 리드는 생산성보다 통제와 감사 가능성을 원한다.

- 누가 어떤 AI 지침을 쓰는지 통일하고 싶다.
- 작업 기록을 티켓/리포트로 남기고 싶다.
- generated output, infra, shared interface 같은 위험 영역을 막고 싶다.

이 세그먼트에는 `No Ticket, No Code`, `Work History Archive`, `Generated File Protection`을 전면에 둔다.

### 3. VS Code/Cursor 확장 사용에 익숙한 일반 사용자

이들은 npm CLI만으로는 유입 장벽이 있다. 확장 설치 후 status bar, tree view, walkthrough로 “내 레포가 안전한가”를 보여줘야 한다.

## 포지셔닝 전환

현재 메시지는 내부 철학에 가깝다.

```text
Sovereign Workflow Control Plane
Zero-Latency, High-Signal AI Orchestration Protocol
```

이는 장기 브랜드에는 좋지만 첫 유입에는 어렵다. 첫 화면은 문제-해결 언어가 더 낫다.

```text
Stop AI coding agents from making untracked, unsafe changes.
```

한국어 메시지는 다음이 좋다.

```text
AI 코딩 에이전트가 티켓 없이 코드를 바꾸지 못하게 하세요.
```

## 권장 메시지 체계

| 계층 | 메시지 |
|---|---|
| 짧은 태그라인 | AI coding agent guardrails for every repo |
| 한국어 태그라인 | 모든 레포를 위한 AI 코딩 에이전트 가드레일 |
| 문제 문장 | Agents edit too much, forget scope, and leave no audit trail. |
| 해결 문장 | DeukAgentRules makes agents work through tickets, scope contracts, verification, and archiveable memory. |
| CLI CTA | `npx deuk-agent-rule init` |
| 확장 CTA | Install the DeukAgentRules VS Code companion |

## 경쟁/대체재 관찰

사용자는 이미 수동으로 instruction 파일을 복사하거나, 각 도구의 자체 규칙 시스템을 따로 관리한다. DeukAgentRules의 차별점은 “더 좋은 지침 파일”이 아니라 **여러 에이전트 표면을 연결하면서 티켓 기반 실행 계약을 강제하는 것**이다.

직접 경쟁 프레임:

- instruction sync 도구
- AGENTS.md 템플릿 모음
- Cursor rule pack
- Claude skill pack
- 팀 내부 AI coding policy

차별 프레임:

- 단순 템플릿이 아니라 lifecycle이 있다.
- 단순 instruction sync가 아니라 ticket, phase, archive가 있다.
- 단일 에이전트 도구가 아니라 multi-agent spoke를 관리한다.

## 공식 자료 근거

- VS Code Extension Manifest: https://code.visualstudio.com/api/references/extension-manifest
- VS Code Contribution Points: https://code.visualstudio.com/api/references/contribution-points
- VS Code Publishing Extensions: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- Open VSX publishing: https://github.com/eclipse/openvsx/wiki/Publishing-Extensions
- GitHub Copilot response customization: https://docs.github.com/en/copilot/concepts/prompting/response-customization
- VS Code Copilot custom instructions: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- Cursor Rules: https://docs.cursor.com/en/context/rules
- Claude Code memory: https://docs.claude.com/en/docs/claude-code/memory
- Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Claude Agent Skills: https://docs.claude.com/en/docs/claude-code/skills
- OpenAI Codex introduction: https://openai.com/index/introducing-codex/
