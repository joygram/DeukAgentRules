---
createdAt: 2026-04-29 09:52:34
docsLanguage: ko
id: 110-agent-degradation-remediation-joy-nucb
phase: 3
planLink: .deuk-agent/docs/plans/110-agent-degradation-remediation-joy-nucb-plan.md
priority: P2
status: closed
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first]'
tags: frontmatter, protocol, tickets, architecture, testing
title: agent-degradation-remediation
---

# agent-degradation-remediation

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
> 1. Root Cause: Agent 퇴화 분석에서 3가지 구조적 결함 발견 — planLink 누락(계획-실행 추적 불가), core-workflow.md 분리 배치(에이전트 도달 실패), 가드레일 조건부 분기(안전장치 미적용)
> 2. Risk: AGENTS.md 크기 증가로 토큰 비용 상승 가능 (허용 범위 내), core-workflow.md 삭제 시 기존 init으로 배포된 프로젝트에 영향 없음 (rules.d 스캔은 조건부)

## Agent Permission Contract (APC)

> ⚠️ [MANDATORY] Do NOT write or modify any code until this 4-block contract is completely filled out.

### [BOUNDARY]
- **변경 가능한 모듈:** `templates/TICKET_TEMPLATE.md`, `core-rules/AGENTS.md`, `templates/rules.d/core-workflow.md`, `scripts/cli-ticket-commands.mjs`
- **변경 금지 모듈:** `scripts/cli-rule-compiler.mjs`, `bin/`, `scripts/cli-init-commands.mjs`

### [CONTRACT]
- **input:** 현재 TICKET_TEMPLATE.md, core-workflow.md, AGENTS.md
- **output:** planLink 포함 티켓 템플릿, 인라인 워크플로우 AGENTS.md, core-workflow.md 삭제
- **side effects:** rules.d/에서 core-workflow.md 파일 1개 삭제
- **Rule Citation (프로젝트 룰 인용):** "모든 에이전트 핵심 룰은 core-rules/ 및 templates/rules.d/ 하위 모듈 단위로 관리됩니다." (PROJECT_RULE.md §1)

### [PATCH PLAN]
- **file:** `templates/TICKET_TEMPLATE.md` / **function:** EJS template / **change:** frontmatter에 planLink 추가, 본문에 CAUTION + Target Module 가드레일 무조건 삽입
- **file:** `core-rules/AGENTS.md` / **function:** N/A / **change:** core-workflow.md 전체 내용을 Workflow Gate Protocol 앞에 인라인 병합
- **file:** `templates/rules.d/core-workflow.md` / **function:** N/A / **change:** 파일 삭제
- **file:** `scripts/cli-ticket-commands.mjs` / **function:** `runTicketCreate` / **change:** rawMeta에 planLink 필드 추가

### [TEST IMPACT]
- **affected tests:** `npx deuk-agent-rule ticket create` 스모크 테스트, `npx deuk-agent-rule init` 정상 동작 확인

## Tasks
- [ ] Task 1: TICKET_TEMPLATE.md — planLink 필드 복원 + CAUTION/Target Module 가드레일 무조건 포함
- [ ] Task 2: core-workflow.md 내용을 AGENTS.md에 인라인 병합
- [ ] Task 3: templates/rules.d/core-workflow.md 삭제
- [ ] Task 4: cli-ticket-commands.mjs — rawMeta에 planLink 필드 추가
- [ ] Task 5: 스모크 테스트 (ticket create + init)

## Done When
> 1. `ticket create` 생성 티켓에 `planLink` 필드 존재
> 2. 생성된 티켓 본문에 `[CAUTION FOR AI AGENTS]` 블록 항상 존재
> 3. `core-rules/AGENTS.md`에 TDW 섹션이 인라인
> 4. `rules.d/core-workflow.md` 삭제됨
> 5. `init` / `ticket create` 정상 동작