---
id: REPORT-051-agent-fast-track-hardening-joy-nucb
priority: P2
status: archived
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] 에이전트의 워크플로우 효율성을 저해하던 티켓 탐색 삽질(Shoveling)과
  경로 깨짐(Path Breakage) 현상을 CLI 엔진 패치와 규칙 강화를 통해 해결했습니다.'
tags: rag, frontmatter, protocol, tickets, normalization
title: Agent Fast-Track Hardening Report
---

# Walkthrough: Agent Fast-Track Hardening & Path Fix

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

에이전트의 워크플로우 효율성을 저해하던 티켓 탐색 삽질(Shoveling)과 경로 깨짐(Path Breakage) 현상을 CLI 엔진 패치와 규칙 강화를 통해 해결했습니다.

## 🛠️ 주요 변경 사항

### 1. CLI 엔진 경로 정규화 (`scripts/`)
- `cli-ticket-commands.mjs`: `ticket use` 명령 시 모든 경로를 POSIX(`/`) 형식으로 강제 변환하고, 출력 개행(`\n`)을 제거하여 에이전트의 경로 캡처 정확도를 100%로 끌어올렸습니다.
- `cli-utils.mjs`: 마크다운 렌더링 무결성을 위해 FrontMatter와 본문 사이의 간격을 확장했습니다.

### 2. 규칙 체계 강화 (`publish/`)
- `gemini.md`: `[ACTION 0]`(RAG-First) 규칙에 티켓 탐색 단계를 예외(`EXEMPTION`)로 명시하여 불필요한 벡터 검색 루프를 차단했습니다.
- `core-workflow.md`: Anti-Shoveling(Fast-Track) 규칙을 최우선 순위로 격상하고 `ticket list` 오타를 `ticket use`로 수정했습니다.

## 🧪 검증 결과
- `DeukPack` 워크스페이스에서 `npx deuk-agent-rule ticket use --latest --path-only` 실행 시 정규화된 경로가 즉시 반환됨을 확인했습니다.
- Antigravity 에이전트가 해당 경로를 받아 `view_file`로 즉시 연결하는 "Fast-Track" 동작을 검증했습니다.

## 🔗 관련 커밋
- `2436c95`: fix(cli): enforce posix path normalization and harden ticket discovery protocol