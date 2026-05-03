---
summary: 110-agent-degradation-remediation-joy-nucb-plan
status: active
priority: P3
tags: docs, migrated
---


# Agent 퇴화 분석 결과 반영 — 구현 계획

## 결정사항 요약

| # | 결정 | 근거 |
|---|------|------|
| A1 | `planLink` 필드를 TICKET_TEMPLATE에 복원 | Plan Reference 링크가 누락되어 에이전트가 계획-실행 연결을 추적할 수 없음 |
| A2 | `rules.d/core-workflow.md`를 `core-rules/AGENTS.md`에 인라인 병합 | 토큰 최적화 + 에이전트 도달성 보장 (별도 파일은 컴파일 단계 필요 → 도달 실패 가능) |
| A3 | 모든 가드레일을 범용 TICKET_TEMPLATE에 무조건 포함 | 범용 = 코어. 조건부 분기 없이 `[CAUTION FOR AI AGENTS]`, Target Module 등 삽입 |

## 변경 범위

### Task 1: TICKET_TEMPLATE.md — planLink 필드 복원 + 가드레일 무조건 포함

**파일:** `templates/TICKET_TEMPLATE.md`

**변경 내용:**
1. frontmatter에 `planLink` 필드 추가 (`.deuk-agent/docs/plans/<%= meta.id %>-plan.md` 형태)
2. 본문 상단에 `[CAUTION FOR AI AGENTS]` 가드레일 블록 무조건 삽입
3. `Target Module` 섹션 추가 (조건부 분기 없이 항상 포함)

### Task 2: core-workflow.md 내용을 AGENTS.md에 인라인 병합

**파일:**
- `core-rules/AGENTS.md` — core-workflow 내용 인라인 삽입
- `templates/rules.d/core-workflow.md` — 삭제

**변경 내용:**
1. `core-workflow.md`의 Ticket-Driven Workflow, Ticket Navigation, Telemetry 섹션을 AGENTS.md에 직접 삽입
2. `rules.d/core-workflow.md` 파일 삭제 (중복 제거)
3. `cli-rule-compiler.mjs`에서 core-workflow 파일이 없어도 정상 동작 확인 (이미 조건부 스캔이므로 영향 없음)

### Task 3: cli-ticket-commands.mjs — planLink 필드 생성 로직 추가

**파일:** `scripts/cli-ticket-commands.mjs`

**변경 내용:**
1. `runTicketCreate()`의 `rawMeta` 객체에 `planLink` 필드 추가
2. 값: `.deuk-agent/docs/plans/<ticketId>-plan.md` (상대 경로)

## APC (Agent Permission Contract)

### [BOUNDARY]
- **변경 가능한 모듈:** `templates/TICKET_TEMPLATE.md`, `core-rules/AGENTS.md`, `templates/rules.d/core-workflow.md`, `scripts/cli-ticket-commands.mjs`
- **변경 금지 모듈:** `scripts/cli-rule-compiler.mjs`, `bin/`, `scripts/cli-init-commands.mjs`

### [CONTRACT]
- **input:** 현재 TICKET_TEMPLATE.md, core-workflow.md, AGENTS.md
- **output:** planLink 포함 티켓 템플릿, 인라인 워크플로우가 포함된 AGENTS.md, 삭제된 core-workflow.md
- **side effects:** rules.d/에서 core-workflow.md 파일 1개 삭제
- **Rule Citation:** PROJECT_RULE.md §1 "Hub-Spoke Architecture — 모든 에이전트 핵심 룰은 core-rules/ 및 templates/rules.d/ 하위 모듈 단위로 관리"

### [PATCH PLAN]
1. `templates/TICKET_TEMPLATE.md` — frontmatter에 planLink, 본문에 CAUTION + Target Module 추가
2. `core-rules/AGENTS.md` — Workflow Gate Protocol 섹션 앞에 core-workflow 내용 인라인
3. `templates/rules.d/core-workflow.md` — 파일 삭제
4. `scripts/cli-ticket-commands.mjs` — rawMeta에 planLink 필드 추가

### [TEST IMPACT]
- `npx deuk-agent-rule ticket create --topic test --non-interactive` 스모크 테스트

## Done When
1. 생성된 티켓에 `planLink` 필드가 포함됨
2. 생성된 티켓 본문에 `[CAUTION FOR AI AGENTS]` 블록이 항상 존재함
3. `core-rules/AGENTS.md`에 Ticket-Driven Workflow 섹션이 인라인되어 있음
4. `templates/rules.d/core-workflow.md` 파일이 삭제됨
5. 기존 `npx deuk-agent-rule init` 정상 동작 확인
