# DeukAgentRules 실전 사용 가이드 (Practical Usage Guide)

이 가이드는 DeukAgentRules를 실제 프로젝트에 배포하고 에이전트와 함께 효율적으로 사용하는 방법을 단계별로 설명합니다.

---

## 1. 프로젝트 초기화 (Deployment)

새로운 프로젝트나 기존 프로젝트에 DeukAgentRules를 적용하려면 다음 단계를 따르세요.

### 1단계: 글로벌 설치
`npx` 캐시 문제를 피하고 어디서든 명령어를 사용할 수 있도록 글로벌 설치를 권장합니다.
```bash
npm install -g deuk-agent-rule
```

### 2단계: 워크스페이스 초기화
프로젝트 루트 디렉토리에서 초기화 명령을 실행합니다.
```bash
deuk-agent-rule init
```
이 명령은 다음 파일들을 생성/업데이트합니다:
- `AGENTS.md`: 프로젝트 규칙의 허브.
- `.deuk-agent/`: 티켓, 템플릿, 설정이 저장되는 디렉토리.
- `.cursor/rules/deuk-agent.mdc`: Cursor 에이전트를 위한 포인터.
- `GEMINI.md`: Antigravity/Gemini 에이전트를 위한 포인터.

---

## 2. 에이전트와 협업하기 (Daily Workflow)

에이전트에게 작업을 시킬 때는 항상 **티켓**을 기반으로 소통하세요.

### 1단계: 티켓 생성
에이전트에게 다음과 같이 요청하여 작업을 시작합니다.
> 💬 "새로운 기능을 위한 티켓을 만들어줘. 주제는 'user-auth-impl'이야."

에이전트는 내부적으로 다음 명령을 실행합니다:
```bash
deuk-agent-rule ticket create --topic user-auth-impl --evidence "기존 auth 로직 분석 완료..."
```

### 2단계: 티켓 기반 작업 실행
에이전트는 생성된 티켓(`.deuk-agent/tickets/sub/XXX-user-auth-impl.md`)을 읽고, 정의된 태스크를 하나씩 수행합니다.

### 3단계: 작업 완료 및 아카이빙
작업이 끝나면 에이전트에게 리포트 작성과 티켓 보관을 요청하세요.
> 💬 "작업 완료했어. 리포트 작성하고 티켓 아카이브해줘."

---

## 3. 에이전트 프롬프트 가이드 (Agent Prompting)

에이전트가 DeukAgentRules 프로토콜을 엄격히 준수하도록 하려면 프로젝트 시작 시 다음과 같은 **페르소나 주입(Persona Injection)**이 도움이 됩니다.

> **에이전트 지침 예시:**
> "너는 DeukAgentRules 프로토콜을 준수하는 시니어 엔지니어다. 모든 코드 수정 전에는 반드시 `ticket create`를 통해 작업 계약을 맺어야 하며, 작업이 완료되면 `walkthrough` 리포트를 작성하고 티켓을 `archive`해야 한다. 규칙 허브인 `AGENTS.md`를 항상 최우선으로 참조하라."

---

## 4. 팁 및 모범 사례

- **No Ticket, No Code**: 티켓 없이 코드를 수정하는 것은 금지됩니다. 작은 수정이라도 티켓을 생성하여 이력을 남기세요.
- **RAG 활용**: `mcp_deukcontext_search_*` 도구를 사용하여 과거 티켓이나 구현 사례를 검색하면 환각을 줄일 수 있습니다.
- **주기적 동기화**: 프로젝트 규칙이 변경되었다면 `deuk-agent-rule init`을 다시 실행하여 모든 에이전트 포인터를 갱신하세요.
