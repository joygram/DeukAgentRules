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

> **🚀 3.0 주요 업데이트:**
> 거대하고 무거운 레거시 \`.cursorrules\` 방식을 공식적으로 폐기했습니다. v3.0은 \`AGENTS.md\`를 단일 진실 공급원으로 사용하는 **Hub-Spoke 모델**을 도입하여, IDE별 규칙은 얇은 진입점 포인터 역할만 수행합니다.

### 🗺️ 개념 및 아키텍처
- **Hub-Spoke**: \`AGENTS.md\`가 허브(Hub)가 되고, IDE 규칙은 스포크(Spoke)가 됩니다. 더 이상 규칙 복제와 동기화 오류가 발생하지 않습니다.
- **Global Proxy**: \`npx\` 명령이 로컬 워크스페이스 소스를 자동으로 감지하여 위임함으로써, 지연 없는(Zero-latency) 개발 환경을 제공합니다.
- **서브모듈 격리**: AI 에이전트가 지정된 디렉터리 범위 내에만 머물도록 강제하여, 천문학적인 컨텍스트 비용 발생을 방지합니다.
- **Zero-Legacy**: 사용되지 않는 v1/v2 설정과 빈 서브모듈 스텁을 자동으로 청소합니다.

### 📚 상세 문서
| 문서 | 용도 |
|---|---|
| [docs/architecture.ko.md](docs/architecture.ko.md) | 고수준 시스템 구조 및 시각적 인포그래픽 |
| [docs/how-it-works.ko.md](docs/how-it-works.ko.md) | 상세 CLI 메커니즘, 초기화 생명주기 및 파일 역할 |
| [docs/principles.ko.md](docs/principles.ko.md) | 설계 철학: Hub-Spoke, Zero-Legacy, 소스 주권 |
| **English Docs** | [README.md](README.md) · [docs/architecture.md](docs/architecture.md) |

---

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

1. **스캐폴딩**: \`init\`이 \`.deuk-agent/templates/\`와 \`AGENTS.md\`를 배치합니다.
2. **티켓팅**: \`ticket create --topic feature-x\`가 \`.deuk-agent/tickets/\`에 제한된 작업 지시서를 생성합니다.
3. **실행**: AI 에이전트가 티켓을 읽고, **타겟 서브모듈**에 고정되어 단계를 실행합니다.
4. **검증**: 종료 전 사이드 이펙트 감사 및 컨벤션 체크를 수행합니다.
5. **아카이빙**: 완료된 티켓은 \`reports/\`로 이동하여 **엔지니어링 메모리 엔진**을 구축합니다.

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

### 🏷️ 검색 태그
\`#AI-Orchestration\` \`#Agentic-Workflow\` \`#DeukFamily\` \`#Engineering-Intelligence\` \`#Zero-Legacy\` \`#High-Signal-Coding\` \`#AI-Protocol\` \`#CursorRules\` \`#CopilotInstructions\` \`#LLM-Control-Plane\`
