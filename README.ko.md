<div align="center">
  <br />
  <img src="docs/assets/architecture-v3.png" width="800" alt="DeukAgentRules Architecture" />
  <br />
  <h1>DeukAgentRules v3.0</h1>
  <p>
    <a href="https://www.npmjs.com/package/deuk-agent-rule"><img src="https://img.shields.io/npm/v/deuk-agent-rule.svg" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/deuk-agent-rule"><img src="https://img.shields.io/npm/dt/deuk-agent-rule.svg" alt="npm downloads" /></a>
  </p>
  <p><b>Zero-Latency, High-Signal AI Orchestration Protocol</b></p>
  <p><i>The Sovereign Workflow Control Plane for AI Engineering</i></p>
  <p><a href="https://deukpack.app">Deuk Family</a> 생태계의 핵심 모듈입니다.</p>
</div>

---

**DeukAgentRules**는 단순한 규칙 생성기를 넘어, 자율형 AI 에이전트 시대를 위해 설계된 **주권적 워크플로우 제어 평면(Sovereign Workflow Control Plane)**입니다.

**Hub-Spoke 아키텍처**와 **티켓 기반 실행 모델**을 통해 협업을 표준화함으로써, 컨텍스트 환각을 제거하고 토큰 소비를 획기적으로 줄이며, 거대 모노레포 환경에서도 엄격한 엔지니어링 표준을 강제합니다.

> **🚀 3.2 주요 업데이트:**
> 다양한 AI 환경(Copilot, Cursor, Windsurf, MCP)에서 엄격한 에이전트 권한 계약(APC)을 강제하기 위한 **플랫폼 공존 프로토콜(Platform Co-existence Protocol)**과 **모드 인지형(Mode-Aware) Workflow Gate**를 도입했습니다.

> **🚀 3.0 주요 업데이트:**
> 거대하고 무거운 레거시 `.cursorrules` 방식을 공식적으로 폐기했습니다. v3.0은 `AGENTS.md`를 단일 진실 공급원으로 사용하는 **Hub-Spoke 모델**을 도입하여, IDE별 규칙은 얇은 진입점 포인터 역할만 수행합니다.

### 🗺️ 핵심 기능 및 아키텍처 (Main Features)

DeukAgentRules는 AI 에이전트가 코드를 분석하고 작성하는 모든 과정을 통제하는 **4대 핵심 기능**을 제공합니다.

1. **Zero-Copy Hub-Spoke 아키텍처**
   - **Hub**: 단일 진실 공급원인 `AGENTS.md` (글로벌 룰)
   - **Spoke**: `PROJECT_RULE.md` 등 워크스페이스별 로컬 규칙
   - **효과**: IDE별(Cursor, Copilot, Windsurf) 설정 파일 중복을 제거하고, 에이전트가 오직 하나의 규약만 바라보게 하여 지시 사항의 충돌과 환각을 원천 차단합니다.

2. **티켓 주도 워크플로우 (TDW: Ticket-Driven Workflow)**
   - 계획(Plan) → 실행(Execute) → 검증(Verify) → 보관(Archive)의 엄격한 라이프사이클을 강제합니다.
   - 에이전트는 활성화된 티켓(`ACTIVE_TICKET.md`) 없이 코드를 수정하거나 범위를 벗어난 작업을 수행할 수 없습니다 (Anti-Shoveling).

3. **플랫폼 공존 및 모드 인지형 게이트 (Mode-Aware Workflow Gate)**
   - 에이전트의 현재 모드(Plan Mode vs. Execute Mode)를 인지하여, Plan Mode에서는 소스 코드 수정을 차단하고 구현 계획서(Artifacts) 작성만 허용하는 강력한 권한 계약(APC)을 시행합니다.
   - MCP(Model Context Protocol) Soft Gate와 연동되어 티켓 컨텍스트가 없는 비인가 작업을 차단합니다.

4. **지식 증류 및 Zero-Legacy (Knowledge Distillation)**
   - 완료된 작업은 `reports/`로 아카이빙되며, 이 과정에서 **Zero-Token 지식 증류** 기술이 적용되어 핵심 히스토리만 벡터 DB(DeukAgentContext)로 전달됩니다.
   - 불필요한 과거 로그나 사용되지 않는 `.cursorrules` 스텁을 자동으로 청소하여 컨텍스트 윈도우 낭비를 막습니다.

### 📚 상세 문서
| 문서 | 용도 |
|---|---|
| [docs/usage-guide.ko.md](docs/usage-guide.ko.md) | **[추천]** 실전 배포 및 단계별 사용 가이드 |
| [docs/architecture.ko.md](docs/architecture.ko.md) | 고수준 시스템 구조 및 시각적 인포그래픽 |
| [docs/how-it-works.ko.md](docs/how-it-works.ko.md) | 상세 CLI 메커니즘, 초기화 생명주기 및 파일 역할 |
| [docs/principles.ko.md](docs/principles.ko.md) | 설계 철학: Hub-Spoke, Zero-Legacy, 소스 주권 |
| [docs/product-positioning-research.ko.md](docs/product-positioning-research.ko.md) | AI 코딩 에이전트 가드레일 제품 포지셔닝 리서치 |
| [docs/karpathy-skills-vs-deukagent-positioning.ko.md](docs/karpathy-skills-vs-deukagent-positioning.ko.md) | Karpathy식 skill, DeukAgentRules, DeukAgentContext 심층 비교 |
| [docs/vision-agent-guardrails.ko.md](docs/vision-agent-guardrails.ko.md) | 멀티 에이전트 가드레일 허브 비전 문서 |
| [docs/organic-growth-plan.ko.md](docs/organic-growth-plan.ko.md) | VS Code, Open VSX, GitHub, 스킬 루프 기반 오가닉 유입 계획 |
| **English Docs** | [README.md](README.md) · [docs/architecture.md](docs/architecture.md) |

---

## 🚀 빠른 시작 (Quick Start)

가장 빠르게 DeukAgentRules를 프로젝트에 도입하는 방법입니다.

```bash
# 1. 글로벌 설치
npm install -g deuk-agent-rule

# 2. 프로젝트 초기화 (AGENTS.md 및 설정 생성)
deuk-agent-rule init

# 3. 첫 번째 작업 티켓 생성
deuk-agent-rule ticket create --topic my-first-task
```

자세한 실전 활용법은 **[실전 사용 가이드](docs/usage-guide.ko.md)**를 참조하세요.

## 🛠️ 설치 및 설정

### 1. 글로벌 설치 (일반 사용자)
\`npx\` 캐시 문제와 "로컬 트랩"을 방지하기 위해 글로벌 설치가 엄격히 권장됩니다.

\`\`\`bash
npm install -g deuk-agent-rule
deuk-agent-rule init
\`\`\`

### 2. 로컬 소스 개발 (메인테이너/파워 유저)
v3.0은 **Global CLI Proxy**를 도입했습니다. \`DeukAgentRules\` 워크스페이스 내부에서 개발 중이라면, 글로벌 명령이 자동으로 로컬 소스로 실행을 위임합니다.

\`\`\`bash
cd ~/workspace/DeukAgentRules
sudo npm link
deuk-agent-rule init  # 자동으로 로컬 scripts/cli.mjs로 라우팅됨
\`\`\`

---

## 🎯 프로토콜 워크플로우

워크플로우는 **티켓 기반 실행 계약(Ticket-Driven Execution Contract)**에 의해 통제됩니다.

1. **스캐폴딩 (Scaffolding)**: `init` 명령어가 프로젝트의 성격을 파악하고 `.deuk-agent/templates/`와 `AGENTS.md` (혹은 `PROJECT_RULE.md` 포인터)를 자동 배치합니다.
2. **티켓팅 (Plan Phase)**: `ticket create --topic feature-x` 명령어로 새로운 작업 지시서를 생성합니다. 이때 에이전트는 Plan Mode로 동작하며 코드를 수정할 수 없고 계획 수립에만 집중합니다.
3. **실행 (Execute Phase)**: 사용자의 승인을 받은 후, 에이전트는 **타겟 서브모듈**에 고정되어 실질적인 코드 작성을 수행합니다. MCP Soft Gate가 인가되지 않은 파일의 수정을 감시합니다.
4. **검증 (Verify Phase)**: 개발 작업 종료 전 사이드 이펙트 감사(Audit) 및 컨벤션(DC-DUP 등 아키텍처 규칙) 체크를 수행합니다.
5. **아카이빙 (Archive Phase)**: 완료된 티켓은 Zero-Token 지식 증류를 거쳐 `reports/`로 이동하며, 이 데이터는 DeukAgentContext 벡터 데이터베이스에 저장되어 영구적인 **엔지니어링 메모리 엔진**으로 작동합니다.

---

## ⚙️ CLI 주요 명령어

자연어 프롬프트를 통해 AI 에이전트에게 직접 시키세요!

| 명령어 | 설명 / 프롬프트 예시 |
|--------|------|
| \`deuk-agent-rule init\` | 규칙 허브와 스포크 포인터를 동기화합니다. <br>💬 *"프로젝트 규칙 초기화해줘"* |
| \`deuk-agent-rule ticket create\` | 새로운 실행 계약(티켓)을 발행합니다. <br>💬 *"refactor-ui 티켓 만들어줘"* |
| \`deuk-agent-rule ticket list\` | 활성화된 작업 지시서를 표시합니다. <br>💬 *"활성 티켓 목록 보여줘"* |
| \`deuk-agent-rule ticket archive\` | 완료된 작업을 안전하게 보관합니다. <br>💬 *"068번 티켓 아카이브해줘"* |

---

## 관련 아이디어와 영감

DeukAgentRules는 [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)처럼
AI 코딩 에이전트가 잘못 가정하고, 과하게 구현하고, 요청 밖 코드를 수정하는 문제의식과 맞닿아 있습니다.

다만 DeukAgentRules는 프롬프트 수준의 지침 파일을 넘어 티켓, Phase Gate,
스코프 계약, 검증, 아카이브 가능한 엔지니어링 메모리까지 제공하는 레포 단위 워크플로우 계층입니다.

\`\`\`bash
npx deuk-agent-rule init
\`\`\`

---

### 🏷️ 검색 태그
\`#AI-Orchestration\` \`#Agentic-Workflow\` \`#DeukFamily\` \`#Engineering-Intelligence\` \`#Zero-Legacy\` \`#High-Signal-Coding\` \`#AI-Protocol\` \`#CursorRules\` \`#CopilotInstructions\` \`#ClaudeCode\` \`#ClaudeMD\` \`#AgentsMD\` \`#AgentSkills\` \`#CodingAgent\` \`#AI-Guardrails\` \`#LLM-Control-Plane\`
