---
summary: 048-dual-mode-and-workflow-joy-nucb-plan
status: active
priority: P3
tags: docs, migrated
---


# [Design] Dual Mode 확장 및 TDD 리스크 추적 워크플로우 강화

## 🎯 Background & Motivation
1. **Dual Mode 확장**: 현재 `DeukPack`의 `deploy_dual_mode.js`는 Unity UPM(C# DLL vs Source) 의존성 전환만 지원합니다. 로컬 CLI 모듈인 `DeukAgentRules`를 수정하며 테스트할 때마다 `npx` 캐시로 인해 구버전이 실행되는 문제가 발생합니다. 따라서 Dual Mode 스크립트가 Node.js(`npm`) 환경의 의존성(바이너리 vs 로컬 소스) 전환까지 한 번에 처리하도록 확장해야 합니다.
2. **리스크 추적(Post-Mortem) 누락 방지**: 에이전트들이 "심층 분석(Phase 0.5)"을 수행하며 잠재적 이슈나 기술 부채를 인지함에도 불구하고, 작업 완료(Phase 3) 후 후속 티켓(Phase 4)을 자동으로 발행하지 않고 무시하는 경향이 있습니다. 이를 강제하는 하드 룰 추가가 필요합니다.

## 🏗️ Architecture & Design Decisions

### 1. `deploy_dual_mode.js` NPM 의존성 스위칭
`DeukPack`의 `scripts/deploy_dual_mode.js`를 수정하여 `package.json`의 특정 `devDependencies`를 로컬 패스와 원격 레지스트리로 스위칭하는 기능을 추가합니다.
- **`src` Mode (개발 모드)**:
  - `npm link ../DeukAgentRules` 명령을 실행하여 심볼릭 링크를 강제로 생성하거나,
  - `package.json`의 버전을 `"file:../DeukAgentRules"`로 치환 후 `npm install` 실행. (Git Tracking 이슈를 피하려면 `npm link` 방식이 더 안전합니다.)
- **`bin` Mode (배포/CI 모드)**:
  - `npm install deuk-agent-rule@latest` (또는 지정된 버전)을 재실행하여 원래의 Registry 바이너리로 복원.

### 2. 코어 워크플로우 룰 강화 (`core-workflow.md`)
`DeukAgentRules/bundle/rules.d/core-workflow.md` 내의 Phase 3 & 4 규칙을 대폭 강화합니다.
- **[Post-Mortem Hard Lock]**: 티켓 완료 시, 분석 과정에서 발견된 모든 경고/제한사항을 **반드시** `Potential Issue Table`에 작성해야 함을 명시합니다.
- **[Follow-up Chaining Mandate]**: 테이블에 기록된 이슈 중 당장 해결하지 않은 항목은 티켓 종료 전 **반드시 CLI (`npx deuk-agent-rule ticket create`)를 통해 후속 티켓으로 발행**해야 함을 하드 룰로 못박습니다. (예: `TICKET-047-F1` 형식)
- **TICKET_TEMPLATE.md 개선**: 템플릿의 Phase 4에 체크박스 항목을 구체화하여 에이전트가 스킵하지 못하도록 유도합니다.

## 🛠️ Proposed Components & Interface

#### [MODIFY] `workspace/i/DeukPack/scripts/deploy_dual_mode.js`
- `kind === 'src'` 블록 내에 `DeukAgentRules` 로컬 링크 연결 로직 추가 (`npm link ../DeukAgentRules`).
- `kind === 'bin'` 블록 내에 로컬 링크 해제 및 레지스트리 재설치 로직 추가.

#### [MODIFY] `workspace/i/DeukAgentRules/bundle/rules.d/core-workflow.md`
- Phase 3, Phase 4 섹션의 지시문을 강압적(Mandatory)인 어조로 수정.
- 후속 티켓을 자동 발급하지 않으면 티켓 클로즈(Archive)를 거부하도록 프롬프트 작성.

#### [MODIFY] `workspace/i/DeukAgentRules/bundle/templates/TICKET_TEMPLATE.md`
- `4. [Phase 4> Follow-up Chaining]` 섹션에 `cli` 명령어 예시 추가 및 강제성 부여.

## 🛑 User Review Required
> [!IMPORTANT]
> **Q1. NPM Dual Mode 스위칭 방식 선택**
> `deploy_dual_mode.js`에서 NPM 패키지를 전환할 때, `package.json`의 `"file:../"` 텍스트 자체를 수정하는 방식을 사용할까요, 아니면 파일은 건드리지 않고 `npm link` 명령어만 수행하는 방식을 사용할까요? (추천: `package.json` 수정 없이 `npm link`만 수행하는 방식이 Git 관리에 더 깔끔합니다.)
>
> **Q2. `npm install` 덮어쓰기 문제**
> `DeukPack`에는 수시로 `npm install`을 강제하는 `init-ensure-deukpack-npm.js`가 존재합니다. `npm link`를 사용하더라도 다른 스크립트에 의해 링크가 풀릴 위험이 있습니다. `init-ensure-deukpack-npm.js`에서도 현재 `workspace.json`의 `installKind`를 읽어 `src` 모드일 경우 `npm install`을 건너뛰거나 다시 `link` 하도록 예외 처리를 추가할까요?

## 🔄 Verification Plan
1. `npm run build:src` 실행 시 `node_modules/deuk-agent-rule`이 로컬 심볼릭 링크로 올바르게 교체되는지 확인.
2. `npm run build:bin` 실행 시 다시 원격 패키지로 복원되는지 확인.
3. 룰 업데이트 후 더미 작업 진행 시 에이전트가 자발적으로 후속 이슈 티켓을 발행하는지 검증.
