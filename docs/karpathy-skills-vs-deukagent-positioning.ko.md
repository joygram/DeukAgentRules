# Karpathy Skills vs DeukAgentFlow 포지셔닝 리서치

작성일: 2026-05-02

## 결론

`andrej-karpathy-skills` 계열의 가치는 명확하다. Claude Code 같은 코딩 에이전트가 자주 보이는 실패 패턴, 즉 과잉 구현, 지시 망각, 넓은 수정, 불필요한 리팩터링을 `CLAUDE.md`나 skill 형식의 playbook으로 줄인다. 이 접근은 빠르고, 이해하기 쉽고, 개인 개발자에게 즉시 체감된다.

DeukAgentFlow와 DeukAgentContext는 같은 문제를 더 위 계층에서 푼다. DeukAgentFlow는 좋은 지침 파일을 하나 더 만드는 제품이 아니라, 어떤 에이전트를 쓰더라도 티켓, 스코프 계약, Phase Gate, 검증, 아카이브를 거치게 하는 레포 단위 운영 계층이다. DeukAgentContext는 완료된 티켓과 의사결정을 검색 가능한 엔지니어링 메모리로 바꾼다.

따라서 제품 포지셔닝은 다음처럼 잡는 것이 좋다.

```text
Karpathy-style skills teach an agent how to behave.
DeukAgentFlow decides when the agent is allowed to act.
DeukAgentContext remembers what the team already learned.
```

한국어로는 다음이 더 직접적이다.

```text
Karpathy식 skill은 에이전트의 행동 습관을 고친다.
DeukAgentFlow는 에이전트의 실행 권한과 작업 경계를 통제한다.
DeukAgentContext는 닫힌 작업을 팀의 장기 기억으로 만든다.
```

## 시장 트렌드

2026년 현재 코딩 에이전트 생태계는 세 방향으로 수렴하고 있다.

첫째, 지침 파일과 skill이 표준 인터페이스가 되고 있다. Claude Code 공식 문서는 skill을 반복해서 붙여 넣던 절차, 체크리스트, 긴 참고 자료를 필요할 때만 로드하는 확장 표면으로 설명한다. GitHub Copilot도 repository-wide instructions, path-specific instructions, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`를 공식 지침 표면으로 다룬다. Codex 역시 레포 안의 `AGENTS.md`와 테스트 로그, 검증 증거를 중요하게 본다.

둘째, skill의 양은 빠르게 늘지만 품질과 선택 문제가 커진다. 2026년 2월 공개된 agent skills 분석 연구는 공개 skill 생태계에서 소프트웨어 엔지니어링 워크플로우 비중이 크고, intent-level redundancy와 안전 리스크가 존재한다고 분석했다. 2026년 4월 skill usage 연구는 현실적인 환경에서는 에이전트가 수많은 skill 중 적절한 것을 검색하고 선택해야 하므로 성능 이득이 취약해질 수 있다고 본다.

셋째, 제품 경쟁의 중심이 "모델이 코드를 잘 쓰는가"에서 "모델 주변 시스템이 얼마나 안전하게 일을 시키는가"로 이동하고 있다. Claude Code 설계 분석 연구는 실제 agent system의 상당 부분이 단순 모델 호출 루프가 아니라 permission, compaction, MCP, plugin, skill, hook, subagent, session storage 같은 주변 시스템에 있다고 설명한다.

이 흐름은 DeukAgentFlow에 유리하다. 시장은 이미 "지침/skill이 필요하다"는 사실을 받아들이고 있다. 다음 문제는 지침이 너무 많아졌을 때 어떤 skill을 언제 쓰고, 누가 승인하고, 무엇을 검증하고, 그 결과를 어디에 남길 것인가다.

## 제품 비교

| 축 | Karpathy skills 계열 | DeukAgentFlow | DeukAgentContext |
|---|---|---|---|
| 핵심 목적 | 에이전트 행동 습관 교정 | 에이전트 실행 권한과 작업 경계 통제 | 작업 결과와 의사결정의 장기 기억화 |
| 주 사용자 | Claude Code 개인 사용자, prompt/rule power user | AI 코딩 에이전트를 쓰는 개인/팀/레포 관리자 | 여러 티켓과 프로젝트 히스토리를 검색해야 하는 사용자 |
| 단위 | `CLAUDE.md`, `SKILL.md`, rule file | repository workflow, ticket lifecycle | archived ticket, report, vectorized knowledge |
| 시간축 | 작업 중 프롬프트 컨텍스트 | 작업 전, 중, 후 전체 lifecycle | 작업 후 재사용되는 memory |
| 강점 | 설치와 이해가 빠름, 즉시 체감 | 범위 제한, 승인 흐름, 검증 기록, 다중 에이전트 표면 | 반복 탐색 감소, 과거 결정 재사용, 팀 지식 축적 |
| 약점 | 실행 권한과 감사 추적은 약함 | 초기 온보딩이 더 무거울 수 있음 | 품질 좋은 아카이브와 검색 UX가 필요 |
| 실패 모드 | skill 미발동, 과발동, 중복 skill, 오래된 지침 | 티켓 작성 귀찮음, Phase Gate 우회 욕구 | 검색 품질 저하, 오래된 지식 오염 |
| 좋은 결합 방식 | DeukAgentFlow의 spoke 또는 skill pack으로 흡수 | skill을 ticket workflow 안에서 노출 | 닫힌 skill 실행 결과를 지식으로 증류 |

## 포지셔닝 맵

DeukAgentFlow는 `skill marketplace`나 `rule pack collection`과 정면 경쟁하면 안 된다. 그 시장은 빠르게 커지지만 복제도 쉽다. 대신 다음 위치를 선점해야 한다.

```text
Prompt/Skill Layer
  - CLAUDE.md
  - SKILL.md
  - Cursor rules
  - Copilot instructions
  - Karpathy-style playbooks

Workflow/Permission Layer
  - DeukAgentFlow
  - Ticket-driven execution
  - Phase Gate
  - Agent Permission Contract
  - Open-ticket limits and archive policy

Memory/Intelligence Layer
  - DeukAgentContext
  - Ticket archive distillation
  - RAG over decisions and implementation history
  - Cross-agent engineering memory
```

이 구조에서 DeukAgentFlow의 메시지는 "우리가 Karpathy skills보다 더 좋은 prompt다"가 아니다.

좋은 메시지는 다음이다.

```text
Use any skill pack you like. DeukAgentFlow makes it ticketed, scoped, verified, and remembered.
```

한국어:

```text
원하는 skill pack을 그대로 쓰세요. DeukAgentFlow는 그 실행을 티켓화하고, 범위를 제한하고, 검증하고, 기억하게 만듭니다.
```

## DeukAgentFlow의 차별점

### 1. 실행 전 통제

Skill은 대체로 "어떻게 행동할지"를 가르친다. 하지만 중요한 질문은 "지금 행동해도 되는가"다.

DeukAgentFlow는 티켓을 통해 다음을 먼저 고정한다.

- 목표
- 수정 가능한 파일 경계
- 금지 영역
- 검증 방법
- 완료 후 기록 위치

이것은 prompt quality 문제가 아니라 execution authority 문제다.

### 2. 실행 중 경계 유지

Karpathy식 playbook은 "surgical change", "avoid overengineering" 같은 행동 원칙을 줄 수 있다. DeukAgentFlow는 이 원칙을 APC와 Phase Gate로 더 구체화한다.

예를 들어 다음처럼 바뀐다.

```text
좋은 조언: 요청 밖 파일을 수정하지 마라.
DeukAgentFlow 계약: Editable modules는 A/B/C이고, Forbidden modules는 X/Y/Z다.
```

조언이 아니라 계약이 되는 순간 팀 리드와 에이전트 모두가 같은 기준으로 리뷰할 수 있다.

### 3. 실행 후 기억

Skill의 출력은 보통 세션이 끝나면 사라진다. DeukAgentFlow는 닫힌 티켓을 아카이브하고, DeukAgentContext는 그 결과를 검색 가능한 지식으로 만든다.

이 차이는 시간이 갈수록 커진다.

- 첫 주: skill이 더 빠르게 보인다.
- 첫 달: ticket workflow가 실수를 줄인다.
- 세 달 후: DeukAgentContext가 과거 결정을 재사용하며 탐색 비용을 줄인다.

### 4. 다중 에이전트 중립성

Karpathy skills는 Claude Code에서 가장 자연스럽다. DeukAgentFlow는 Claude Code뿐 아니라 Cursor, Codex, Copilot, Gemini, Windsurf의 지침 표면을 연결하는 hub-spoke 구조가 핵심이다.

이 점은 팀 도입에서 중요하다. 팀원마다 도구가 달라도 레포 규율은 같아야 한다.

## DeukAgentContext의 제품 역할

DeukAgentContext는 단순한 RAG가 아니라 DeukAgentFlow의 방어력을 장기화하는 장치로 설명해야 한다.

권장 포지션:

```text
DeukAgentContext is the memory layer for ticketed AI engineering.
```

한국어:

```text
DeukAgentContext는 티켓 기반 AI 엔지니어링의 기억 계층이다.
```

핵심 가치는 세 가지다.

| 가치 | 설명 | 사용자 체감 |
|---|---|---|
| Decision recall | 예전 티켓, 계획, 검증 근거를 다시 찾음 | "왜 이렇게 했지?"에 바로 답한다 |
| Rule reinforcement | 과거 실수와 프로젝트 규칙을 새 작업에 주입 | 같은 실수를 반복하지 않는다 |
| Context compression | 긴 히스토리를 active prompt가 아니라 검색 가능한 지식으로 둠 | 토큰을 덜 쓰고도 프로젝트 기억을 유지한다 |

여기서 중요한 점은 "memory"를 모델 개인화 기능으로 말하지 않는 것이다. DeukAgentContext의 기억은 개인 모델의 기억이 아니라 레포와 팀이 소유하는 엔지니어링 기록이다.

## 개발 방향성

### 1. Karpathy-compatible skill pack

DeukAgentFlow가 먼저 만들어야 할 것은 거대한 marketplace가 아니라 first-party skill pack이다.

권장 pack:

- `safe-refactor`: 작은 변경, 테스트 우선, scope audit
- `generated-file-guard`: generated output 직접 수정 금지
- `context-recall`: DeukAgentContext에서 유사 티켓 검색

초기 MVP는 위 세 가지로 시작했다. `ticket-first-coding`과 `phase-gate-review`는 skill로
분리하면 core rule과 중복되므로, 별도 `SKILL.md`가 아니라 TDW/APC/Phase Gate의 CLI/상태
UX로 노출하는 편이 맞다.

목표는 Karpathy-style 사용자에게 익숙한 `SKILL.md` 표면을 제공하면서, 내부적으로는 DeukAgentFlow ticket workflow로 유도하는 것이다.

### 2. Skill expose 명령

기존 오가닉 계획의 `skill expose` 방향은 유지하되, 첫 구현은 단순해야 한다.

```bash
npx deuk-agent-rule skill list
npx deuk-agent-rule skill add safe-refactor
npx deuk-agent-rule skill expose claude
npx deuk-agent-rule skill expose cursor
```

초기에는 각 플랫폼에 맞는 pointer와 wrapper만 생성한다. 모든 skill 내용을 두껍게 복사하면 drift가 생긴다.

### 3. DeukAgentContext recall을 티켓 생성에 연결

가장 강한 차별점은 티켓 생성 시점에 과거 지식을 불러오는 것이다.

권장 UX:

```bash
npx deuk-agent-rule ticket create --topic safe-refactor-auth
```

출력:

```text
Related memory found:
- 142-auth-generated-file-incident
- 119-refactor-scope-overrun
- rule: generated outputs must not be edited directly
```

이 UX는 skill보다 상위 계층임을 즉시 보여준다.

### 4. VS Code companion에서 "보이는 통제" 제공

skill 사용자는 눈에 보이는 피드백에 반응한다. VS Code/Cursor companion은 다음 상태를 보여줘야 한다.

- Active ticket
- Phase
- Open tickets count
- Skill packs exposed
- Context memory connected
- Archive freshness

이 화면은 "rule generator"가 아니라 "AI agent cockpit"처럼 느껴져야 한다.

### 5. Public examples

오가닉 유입은 추상 철학보다 실패 사례 기반이 강하다.

추천 콘텐츠:

- `Karpathy-style Claude skills are great. Here is what they do not solve.`
- `From CLAUDE.md to ticketed execution: making AI coding agents auditable`
- `How to make Cursor, Codex, Copilot, and Claude follow the same repo rules`
- `Why agent skills need memory, permissions, and archive`

## 로드맵 제안

| 단계 | 목표 | 산출물 |
|---|---|---|
| 0 | 메시지 정리 | README에 "skills complement, workflow controls" 문구 추가 |
| 1 | First-party skill pack MVP | `safe-refactor`, `generated-file-guard`, `context-recall` |
| 2 | Skill expose MVP | Claude/Cursor 지침 표면으로 pointer 생성, Copilot/Codex는 후속 |
| 3 | Context recall MVP | 티켓 생성 시 유사 티켓과 규칙 추천 |
| 4 | VS Code companion | active ticket, phase, open count, exposed skills, memory status |
| 5 | Community loop | skill contribution guide, examples, badge, PR report |

## 리스크

### Skill 생태계에 묻힐 위험

DeukAgentFlow가 skill pack만 강조하면 수많은 skill repo 중 하나가 된다. 방지하려면 항상 ticket, scope, verification, memory를 함께 말해야 한다.

### 온보딩이 무겁게 느껴질 위험

Karpathy skills는 파일 하나로 시작한다. DeukAgentFlow는 더 많은 개념을 가진다. 따라서 첫 경험은 다음 한 줄이어야 한다.

```bash
npx deuk-agent-rule init
```

그리고 바로 다음 상태를 보여줘야 한다.

```text
AI Agent Guard enabled.
Open tickets: 0/20
AGENTS.md connected
Claude/Cursor/Copilot spokes available
```

### DeukAgentContext가 추상적으로 보일 위험

RAG, vector, memory 같은 단어는 추상적이다. 사용자에게는 "과거 티켓을 찾아서 같은 실수를 줄인다"로 보여줘야 한다.

## 권장 최종 포지션

외부 첫 문장:

```text
DeukAgentFlow adds ticketed guardrails, scoped execution, and project memory to AI coding agents.
```

한국어:

```text
DeukAgentFlow는 AI 코딩 에이전트에 티켓 기반 가드레일, 스코프 제한, 프로젝트 기억을 추가합니다.
```

Karpathy skills와 함께 언급할 때:

```text
Karpathy-style skills improve agent behavior inside a session.
DeukAgentFlow turns that behavior into a repo-level workflow with permission gates and archiveable memory.
```

한국어:

```text
Karpathy식 skill은 세션 안의 에이전트 행동을 개선합니다.
DeukAgentFlow는 그 행동을 권한 게이트와 아카이브 가능한 기억을 가진 레포 단위 워크플로우로 바꿉니다.
```

## 참고 자료

- andrej-karpathy-skills: https://github.com/forrestchang/andrej-karpathy-skills
- Claude Code Skills: https://code.claude.com/docs/en/skills
- GitHub Copilot repository instructions: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- OpenAI Codex introduction: https://openai.com/index/introducing-codex/
- Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems: https://arxiv.org/abs/2604.14228
- How Well Do Agentic Skills Work in the Wild: https://arxiv.org/abs/2604.04323
- Agent Skills: A Data-Driven Analysis of Claude Skills: https://arxiv.org/abs/2602.08004
