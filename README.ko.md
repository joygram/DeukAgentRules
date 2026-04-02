# DeukAgentRules (득에이전트룰스)

> **Deuk Family**의 핵심 모듈 가운데 하나입니다. 구조화된 규칙으로 AI 에이전트의 협업 효율을 극대화합니다.

**npm 패키지:** `deuk-agent-rule` · **CLI:** `deuk-agent-rule`

**English:** [README.md](https://github.com/joygram/DeukAgentRules/blob/master/README.md)

Cursor, GitHub Copilot, Gemini / Antigravity, Claude, Windsurf, JetBrains AI Assistant 등 다양한 코딩 에이전트와 함께 활용하는 **서브모듈 격리형 협업 프레임워크**입니다. 
프로젝트 규칙(`AGENTS.md`, `.cursor/rules`)을 표준화하고, **티켓 기반 워크플로우**를 통해 쓸데없는 프롬프트 토큰 낭비와 AI의 맥락 환각(Hallucination)을 강력하게 방어합니다.

> **🚀 핵심 가치:**
> 세션당 약 1,500~2,000 토큰에 달하는 강제 로드 컨텍스트를 200~300 토큰 수준으로 압축합니다. AI가 모놀리식 전체 레포지토리를 헤매지 않도록, 정확한 티켓(작업 지시서) 기반으로 **"해당 서브모듈(Submodule)"**에만 격리시켜 작업을 지시할 수 있습니다.

---

## 🛠️ 워크스페이스 초기화 (Getting Started)

프로젝트 루트에서 최초 1회 패키지를 설치하고 초기화합니다.

```bash
npm install deuk-agent-rule
npx deuk-agent-rule init
```

초기화 시 프로젝트의 **기술 스택**과 **사용 중인 에이전트 툴**을 묻는 대화형 질문이 나타나며, 선택에 맞춰 최적화된 마크다운 템플릿과 룰 파일(`.cursor/rules/*`)들이 자동 생성 및 동기화됩니다. 
- 스택 변경이 필요 없으면 이후에는 `npx deuk-agent-rule init`만 쳐서 규칙을 최신화할 수 있습니다.
- CI나 스크립트 환경에서는 대화형 입력을 끄기 위해 `--non-interactive` 파라미터를 추가하세요.

---

## 🎯 핵심 워크플로우 (The Ticket Workflow)

`npx deuk-agent-rule init`을 실행하면 워크스페이스 최상단에 **제로-터치 스캐폴딩 샌드박스**가 작동하며 아래 두 개의 핵심 폴더가 등장합니다. 

1. **`.deuk-agent-templates/` (에이전트 템플릿)**: AI가 어떠한 양식으로 작업을 처리하고 보고해야 하는지 정의된 공식 뼈대(`TICKET_TEMPLATE.md`)가 지정됩니다. 소스코드와 함께 Git에 커밋되어 팀의 룰북 역할을 합니다.
2. **`.deuk-agent-ticket/` (티켓 실행 공간)**: 에이전트들과 작업자가 실제 주고받는 휘발성 지시서(`TICKET-XXX.md`)가 발급되는 은밀한 공간입니다. (보안 및 히스토리 누출 방지를 위해 시스템이 자동으로 `.gitignore`에 기재합니다.)

이러한 샌드박스 폴더들을 활용하여 스퍼트를 올리는 **최적의 AI 코딩 3단계**는 다음과 같습니다.

### [Step 1] 티켓 발급 및 서브모듈 지정 (Ticket Creation)
AI에게 중구난방으로 지시하지 마세요. 명확한 티켓을 발급하여 **문맥(Context)을 좁혀주어야** 비용과 사고를 막을 수 있습니다.

```bash
npx deuk-agent-rule ticket create --topic ui-refactoring --group frontend --project DeukUI --content "## Task: 플러그인 UI 리팩토링"
```
명령어를 치면 `.deuk-agent-ticket/` 폴더 내에 템플릿이 입혀진 `TICKET-ui-refactoring.md` 파일이 생성됩니다.
개발자는 이 파일 내의 `[Target Submodule]` 속성에 AI가 들여다보아야 할 고립된 경로(예: `src/client`)만을 명시해 줍니다.

### [Step 2] 세션 인수인계 및 에이전트 격리 실행 (Agent Execution)
AI 챗봇(Cursor, Gemini 등)에게 다음과 같이 단 한 줄의 명령만 내립니다.
> *"방금 발급된 `.deuk-agent-ticket/TICKET-ui-refactoring.md` 티켓을 열고, 명시된 타겟 서브모듈 내에서 체크리스트를 따라 작업을 시작해"*

AI는 티켓 내에 정의된 Phase(진행 단계)를 충실히 읽고, **자신이 다루지 않아도 될 타 모듈의 불필요한 연산을 원천 차단**한 채 가장 최적화된 코드만 작성합니다. (이 과정을 통해 토큰 비용이 획기적으로 줄어듭니다.)

### [Step 3] 검증 및 상태 갱신 (Review & Closure)
AI가 코드를 작성하며 티켓 내 마크업의 체크박스(`[x]`)를 갱신합니다. 에이전트의 세션(기억 한계)이 가득 차면, 티켓 내용만 디스크에 남겨둔 채 챗봇 창을 끄고 새 창을 열어 다시 [Step 2]를 지시하면 깔끔하게 인수인계가 이루어집니다.
모든 작업이 끝나면 Phase 상태를 `[Phase 완료]`로 승급시킵니다. 현재 작업 중인 모든 티켓은 아래 명령을 통해 터미널에서 즉시 파악할 수 있습니다.

```bash
npx deuk-agent-rule ticket list
```
```text
📦 Agent Tickets (Direct System Scan):
  ✅ [TICKET-DEUKUI-Button.md]
     Title: 버튼 컴포넌트 추가
     Target: DeukUI
     Status: [완료]
  🔨 [TICKET-ui-refactoring.md]
     Title: 플러그인 UI 리팩토링
     Target: DeukUI
     Status: [진행 중]
```

---

## ⚙️ 부가 옵션 및 CLI 레퍼런스

업무 자동화 및 타깃 제어를 위한 상세 옵션입니다.

### Ticket 기반 명령
| 커맨드 | 설명 |
|--------|------|
| `npx deuk-agent-rule ticket create --topic <주제>` | 신규 티켓 문서 생성 (`--group`, `--project` 옵션 지시 가능) |
| `npx deuk-agent-rule ticket list` | 발급된 전체 티켓의 현재 상태 및 리스트업 |
| `npx deuk-agent-rule ticket use --latest --path-only` | 빌드 파이프라인 연동을 위해 최근 티켓의 파일 경로만 반환 |

### Init 고급 옵션
| 플래그 | 기본값 | 설명 |
|--------|--------|------|
| `--non-interactive` | 끔 | CI/스크립트용. 대화형 인터페이스를 끄고 기존 설정(`.config.json`)을 채택 |
| `--interactive` | 끔 | 이미 생성된 설정값이 있어도 무시하고 강제로 다시 묻기 설정 시작 |
| `--cwd <path>` | 현재 디렉터리 | 타깃이 되는 프로젝트의 워크스페이스 Root 절대/상대경로 지정 |
| `--dry-run` | 끔 | 실제 파일을 생성/변조하지 않고 콘솔에 동작 결과 텍스트만 출력 |
| `--backup` | 끔 | `AGENTS.md`나 룰 파일 덮어쓰기 전 원본을 `*.bak`으로 안전 보관 |

## 버전 관리 정책
본 패키지(`DeukAgentRules`)의 업데이트 및 기능 변경 전에는 필히 `package.json`의 `version` 상향 후 퍼블리시(`npm run sync:oss`) 해 주시기 바랍니다.
