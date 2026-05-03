---
summary: 046-plan
status: active
priority: P3
tags: docs, migrated
---


# [Deep Analysis] 고도화된 Frontmatter 조건(Condition) 평가 아키텍처

## 🎯 Background & Problem Statement
앞서 도입한 Frontmatter 기반 동적 룰 조립(`cli-rule-compiler.mjs`)에서, 특정 룰이 주입되어야 하는지 판단하는 `evaluateCondition` 로직은 현재 임시 방편(Heuristic)으로 구현되어 있습니다.
- **현재 로직**: `cwd`의 부모 디렉토리에 `DeukRag` 폴더가 있는지 단순 확인하거나 무조건 `true`를 반환.
- **문제점**: 실제 해당 프로젝트가 DeukRag의 관리 대상(인덱싱 대상)인지 알 수 없으며, 환경에 따라 오작동(False Positive/Negative)할 위험이 높습니다. DeukRag가 연동되지 않은 프로젝트에도 하드 룰이 강제 주입될 수 있습니다.

## 🕵️‍♂️ Deep Analysis: Source of Truth 탐색
MCP 서버 설정은 사용하는 AI 에이전트(Cursor, Claude, Windsurf 등)마다 파편화되어 있어 에이전트 설정 파일을 파싱하는 것은 비효율적이며 유지보수가 어렵습니다.

대신, **DeukRag 엔진 자체의 설정 파일**이 가장 확실한 Source of Truth임이 확인되었습니다.
- **경로**: `/home/joy/workspace/DeukRag/.local/config.yaml`
- **구조**:
  ```yaml
  projects:
    - name: "DeukPack"
      path: "/home/joy/workspace/i/DeukPack"
    - name: "DeukAgentRules"
      path: "/home/joy/workspace/i/DeukAgentRules"
  ```
해당 YAML의 `projects` 배열에 현재 작업 중인 `cwd`가 등록되어 있다면, 해당 프로젝트는 확실하게 DeukRag MCP의 관리 하에 있다고 판정할 수 있습니다.

## 🏗️ Proposed Architecture

### 1. DeukRag Config Parser 도입 (`cli-rule-compiler.mjs`)
- **yaml 의존성 활용**: 이미 `DeukAgentRules`의 `package.json`에 포함되어 활용 중인 `yaml` 패키지를 사용하여 `DeukRag/.local/config.yaml`을 파싱합니다.
- **경로 탐색**:
  - 기본적으로 `DEUKRAG_HOME` 환경 변수를 확인합니다.
  - 없다면 현재 `cwd`에서 최상위 `workspace` 루트를 찾아, 그 하위의 `DeukRag/.local/config.yaml`을 스캔하는 fallback 로직을 구현합니다.

### 2. 조건 평가(Condition Evaluation) 로직 재작성
```javascript
function evaluateCondition(condition, cwd) {
  if (condition.mcp === "deukrag") {
     const ragConfig = resolveDeukRagConfig(cwd);
     if (!ragConfig) return false;

     // config.projects 배열에서 cwd가 등록되어 있는지 확인
     const isManaged = ragConfig.projects.some(p => isSubPathOf(cwd, p.path));
     return isManaged;
  }
  return true;
}
```

### 3. 유연한 조건식 확장성 확보
향후 다음과 같은 조건식도 처리할 수 있도록 확장성을 고려합니다.
- `file_exists: "package.json"` (Node 프로젝트 감지)
- `has_dependency: "unity"` (Unity 프로젝트 감지)

### 4. CLI 티켓 & 플랜 자동 스캐폴딩 (User Feedback 반영)
기존에는 티켓과 플랜을 별도로 생성하고 수동으로 연결해야 했습니다. 이를 개선하여 `npx deuk-agent-rule ticket create` 실행 시 다음 작업을 한 번에 자동화합니다.
- `PLAN_TEMPLATE.md`를 기반으로 `.deuk-agent/docs/plans/<ticket-id>-plan.md` 자동 생성.
- `TICKET_TEMPLATE.md`의 `[Link to Plan Document]` 텍스트를 방금 생성된 플랜 파일의 `file:///` 절대 경로 링크로 자동 치환.

## 🛑 User Review Required
> [!IMPORTANT]
> **Q. DeukRag 설정 파일의 경로 탐색 전략**
> 위 설계에서는 `cwd`에서 상위로 올라가며 `DeukRag/.local/config.yaml`을 찾는 방식을 제안했습니다. 만약 다른 환경에서 `DeukRag` 폴더명이 다르거나 위치가 완전히 분리되어 있다면 환경 변수(`DEUKRAG_HOME` 등) 세팅을 강제하는 것이 좋을지, 현재의 상대 경로 탐색만으로 충분할지 피드백 부탁드립니다.

## 🔄 Verification Plan
1. `cli-rule-compiler.mjs`에 YAML 파싱 로직 적용.
2. `DeukPack` (config.yaml에 등록됨)에서 `init` 실행 -> **DeukRag 룰 주입 확인**.
3. `config.yaml`에 등록되지 않은 임의의 빈 폴더에서 `init` 실행 -> **DeukRag 룰 배제 확인**.
