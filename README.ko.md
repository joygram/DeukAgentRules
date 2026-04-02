# DeukAgentRules (득에이전트룰스)

> **Deuk Family**의 핵심 모듈 가운데 하나입니다. 구조화된 규칙으로 AI 에이전트의 협업과 응답을 다듬습니다.

**npm 패키지:** `deuk-agent-rule` · **CLI:** `deuk-agent-rule`

**English:** [README.md](https://github.com/joygram/DeukAgentRules/blob/master/README.md)

Cursor, GitHub Copilot, Gemini / Antigravity, Claude(Cursor·Claude Code), Windsurf, JetBrains AI Assistant 등 코딩 에이전트와 함께 쓸 `AGENTS.md`·`.cursor/rules` 버전 관리형 템플릿. 그 밖에도 프로젝트 규칙을 읽는 유사 도구에 그대로 활용할 수 있습니다. 핸드오프·간결 응답으로 비용·성능을 개선합니다.

> **핵심 피처:** 제로-터치 템플릿 스캐폴딩과 타겟 모듈 격리(Submodule Isolation) 모델을 도입합니다. 세션당 약 1,500~2,000 토큰의 강제 로드 컨텍스트를 200~300 토큰으로 압축하여, **불필요한 프롬프트 비용(토큰 낭비)과 AI의 맥락 환각(Hallucination)을 약 83% 방어**합니다.

## 워크스페이스 초기화

```bash
npm install deuk-agent-rule
npx deuk-agent-rule init
```

레포에 **처음** `init` 할 때만(`.deuk-agent-rule.config.json` 없음) **대화형** 질문이 나옵니다. **이후** `npx deuk-agent-rule init` 은 저장된 선택을 쓰고 템플릿만 갱신하므로, 매번 `--non-interactive` 할 필요 없습니다. **CI**에서만 `--non-interactive` 를 쓰면 됩니다. 선택을 바꾸려면 **`--interactive`** 이거나 설정 파일을 지우거나 수정하세요.

첫 `init` 예시:

```
$ npx deuk-agent-rule init

DeukAgentRules init — let's configure your workspace.

? What is your primary tech stack?
  1) Unity / C#
  2) Next.js + C#
  3) Web (React / Vue / general)
  4) Java / Spring Boot
  5) Other / skip
  Choice [1-5]: 1

? Which agent tools do you use? (comma-separated numbers, or 'all')
  1) Cursor
  2) GitHub Copilot
  3) Gemini / Antigravity
  4) Claude (Cursor / Claude Code)
  5) Windsurf
  6) JetBrains AI Assistant
  7) All of the above
  8) Other / skip
  Choices: 1,2

  Stack : unity
  Tools : cursor, copilot

AGENTS.md: injected (inject)
rule copied: .cursor/rules/deuk-agent-rule-multi-ai-workflow.mdc
rule copied: .cursor/rules/deuk-agent-rule-delivery-and-parallel-work.mdc
rule copied: .cursor/rules/deuk-agent-rule-git-commit.mdc
```

CI나 스크립트 환경에서 질문 없이 실행:

```bash
npx deuk-agent-rule init --non-interactive
```

패키지 업데이트 후:

```bash
npm update deuk-agent-rule
npx deuk-agent-rule init
```

**CI·헤드리스**에서만 `init --non-interactive` 를 쓰면 됩니다. 일반 업그레이드에 **`merge`를 따로 돌릴 필요는 없습니다.** 기본 **`init`** 이 번들 **`.cursor/rules`** 를 다시 맞춥니다. `--rules prefix`(기본)일 때 이미 있는 **`deuk-agent-rule-*.mdc`** 는 새 패키지 내용으로 **덮어씁니다.** 접두 없이 둔 로컬 전용 룰 파일은 건드리지 않습니다. `AGENTS.md`는 **마커 안**만 갱신되고 바깥 내용은 유지됩니다.

### 🚀 제로-터치 스캐폴딩과 샌드박싱 로직

`npx deuk-agent-rule init` 또는 패키지를 업데이트하는 즉시 워크스페이스 최상단에 다음 두 개의 폴더가 자동 생성 및 관리됩니다:

1. **`.deuk-agent-templates/` (Rule Skeleton)**
   - 에이전트가 어떤 양식으로 작업을 처리해야 하는지 적힌 공식 템플릿(`HANDOFF_TEMPLATE.md` 등)이 제공됩니다. 이 폴더는 소스코드와 함께 시스템 프롬프트의 기준점으로 Git에 커밋됩니다.
2. **`.deuk-agent-handoff/` (Ticket Instances)**
   - 에이전트 간 실제 작업을 이어가는 휘발성 지시서(`TICKET-XXX.md`)가 발급되는 공간입니다. 이 폴더는 시스템에 의해 강제로 **`.gitignore`** 에 기재되므로 작업 기록이 소스코드로 외부 누출되거나 오토 커밋되는 것을 완벽히 방지합니다.

### 💰 토큰 비용 절감을 위한 모듈 격리 (Submodule Isolation)

거대한 프로젝트(예: 프론트엔드 모듈과 백엔드 모듈이 겹쳐 있는 모노레포)에서 전체 룰과 진행 상황을 단일 파일(`AGENTS.md`)에 밀어넣으면, 에이전트가 매 턴마다 쓸데없는 타 서버의 아키텍처 정보까지 강제로 연산하며 엄청난 비용을 청구합니다.

DeukAgentRules는 **티켓 기반 구조(Ticket Handoff)**를 강제합니다.
- 발급된 `.deuk-agent-handoff/TICKET.md` 파일 내에 `[Target Submodule]` 속성을 명시하게 함으로써, 에이전트가 **정확히 자신에게 할당된 모듈의 로직만을 읽어오도록 격리**합니다.
- 채팅창에 복잡하게 지시할 필요 없이, 단순히 **"방금 발급된 TICKET 파일을 열어 작업을 재개하라"** 라고만 명령해도 AI가 완벽하게 한정된 컨텍스트 공간 안에서 가장 저렴하고 안전하게 작동하게 됩니다.

### 핸드오프 명령 (멀티 세션·도구 넘김)

빠른 명령 예시:

```bash
npx deuk-agent-rule handoff create --topic container-unified --group sub --project DeukUI --content "## Task: ..."
npx deuk-agent-rule handoff list --group sub --project DeukUI --limit 20
npx deuk-agent-rule handoff use --latest --path-only
```

**플랜 패널**을 쓰는 환경에서는 동일 본문을 **`.cursor/plans/deuk-handoff.plan.md`** 등으로 **선택적으로 복제**해 둘 수 있습니다. 정본(`.deuk-agent-handoff/`)과 인덱스(`DeukAgentRules/handoff/HANDOFF_LIST.md`)를 기준으로 내용이 어긋나지 않게 맞추세요.

단일 세션 내 임시 핸드오프는 채팅에 인라인으로 작성하며, 여러 번 참조하거나 다중 에이전트가 공유해야 하거나 리스크를 기록해야 할 때는 내부 `.md` 파일로 전환합니다. 기본 저장 경로는 `.deuk-agent-handoff/` 로컬 디렉토리이며, 팀이 요청하거나 프로젝트 관례가 있을 때만 저장소에 커밋합니다.

### 핸드오프 시스템 (가성비 가이드)

- **Claude Sonnet:** 인덱스 + 필요한 토픽 파일만 로드할 때 비용 효율이 크게 좋아집니다.
- **Gemini (Flash/Pro):** 넓은 탐색에 강하고 저비용이지만, 토픽 핸드오프로 정확도와 재현성이 더 좋아집니다.
- **Cursor:** always-apply 규칙이 자주 로드되므로 compact 인덱스 전환 효과가 큽니다.
- **Antigravity:** 경량 실행 환경에서 토픽 단위 로딩이 특히 유리합니다.

상세 사례/튜토리얼: [`docs/handoff-tutorial.md`](docs/handoff-tutorial.md)

### 주요 옵션

| 플래그 | 기본값 | 설명 |
|--------|--------|------|
| `--non-interactive` | 끔 | CI/스크립트: 질문 없음·저장 설정 미사용 |
| `--interactive` | 끔 | `.deuk-agent-rule.config.json` 이 있어도 질문 다시 |
| `--cwd <path>` | 현재 디렉터리 | 대상 레포 루트 |
| `--dry-run` | 끔 | 쓰기 없이 동작만 출력 |
| `--tag <id>` | `deuk-agent-rule` | 마커 id: `<!-- <id>:begin/end -->` |
| `--agents <mode>` | `inject` | `inject` \| `skip` \| `overwrite` |
| `--rules <mode>` | `prefix` | `prefix` \| `skip` \| `overwrite` |
| `--backup` | 끔 | 덮어쓰기 전 `*.bak` 저장 |

### 번들 규칙

- **`multi-ai-workflow.mdc`** — `alwaysApply: true`
- **`delivery-and-parallel-work.mdc`** — `alwaysApply: true` (세로 슬라이스·포트폴리오 우선·병렬 소유·리팩터 범위 축소)
- **`git-commit.mdc`** — `alwaysApply: false`

### `merge` (엄격)

옵션 동일. 마커가 없으면 inject 실패(`--append-if-no-markers` 없을 때). 기본 `--rules skip`.

### 주의

- `alwaysApply: true` 규칙이 겹치면 컨텍스트가 커질 수 있습니다.
- `postinstall`에서 `init` 자동 실행은 권장하지 않습니다.

## 버전

배포 전 `package.json`의 `version` 상향.
