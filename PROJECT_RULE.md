---
architecture_docs: "docs/architecture.md"
---

# Project Rules

## DeukAgentRules Development Rules

이 프로젝트는 DeukAgentRules 자체의 소스 코드 저장소입니다.
다음의 아키텍처 규칙과 제약사항을 준수해야 합니다.

### 1. Hub-Spoke Architecture
- 모든 에이전트 핵심 룰은 `core-rules/` 및 `templates/rules.d/` 하위 모듈 단위로 관리됩니다.
- `.cursor/rules/`, `.github/copilot-instructions.md` 등의 에이전트 특화 파일은 하드코딩된 규칙을 포함해서는 안 되며, 오직 "Hub(`AGENTS.md`)를 읽으라"는 포인터(Spoke) 역할만 해야 합니다.
   
### 2. Global CLI Proxy (Stale Tarball 방지)
- `bin/deuk-agent-rule.js`는 Global Proxy 역할만 합니다.
- 실제 비즈니스 로직은 `scripts/` 디렉토리에 위치해야 하며, 실행 환경(CWD)을 역추적하여 로컬 코드를 우선 실행하도록 보장해야 합니다.

### 3. No Legacy Markers
- v1/v2 시절의 HTML 마커(`<!-- deuk-agent-rule:begin -->`)를 사용한 머지 로직은 전면 폐기되었습니다 (`merge-logic.mjs` 참조).
- 템플릿과 룰은 복사(Copy)와 단순 결합 방식으로 배포되어야 합니다.

### 4. OSS Sync Separation
- 이 저장소의 퍼블릭 배포는 `scripts/sync-oss.mjs`에 의해 제어됩니다.
- 사내 전용 설정이나 기밀 정보는 `.internal.` 명명 규칙이나 분리된 디렉토리(ex: `ticket/`)를 통해 OSS 배포에서 자동 제외되도록 관리해야 합니다.
