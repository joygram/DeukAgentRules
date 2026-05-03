---
createdAt: 2026-04-29 18:58:11
docsLanguage: ko
id: 112-fix-missing-summary-in-frontmatt-joy-nucb
phase: 4
planLink: .deuk-agent/docs/plans/112-fix-missing-summary-in-frontmatt-joy-nucb-plan.md
priority: P2
status: closed
summary: 미작성 티켓 — 실질적 내용 없음. 좀비/placeholder 티켓으로 분류.
tags: frontmatter, tickets, architecture, testing
title: fix-missing-summary-in-frontmatter
---

# fix-missing-summary-in-frontmatter

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
> [WARNING: Do not skip deep analysis. Shallow logic leads to cascaded bugs.]
> [1. Root Cause & Architecture constraint:]
> [2. Risk & Edge Cases (What could go wrong?):]

## Agent Permission Contract (APC)

### [BOUNDARY]
- **변경 가능한 모듈:** `scripts/cli-ticket-commands.mjs`, `core-rules/AGENTS.md`
- **변경 금지 모듈:** 기타 CLI 핵심 로직

### [CONTRACT]
- **input:** 티켓 생성 시 summary 인자 여부
- **output:** summary 누락 시 에러 발생 및 생성 차단, AGENTS.md 내 관련 규칙 명시
- **side effects:** summary가 없는 기존 자동화 스크립트가 동작하지 않을 수 있음 (의도된 파괴적 변경)
- **Rule Citation (프로젝트 룰 인용):** N/A

### [PATCH PLAN]
- **file:** `scripts/cli-ticket-commands.mjs`
- **function:** `runTicketCreate`
- **change:** summary 검증 로직 추가 및 에러 처리

### [TEST IMPACT]
- **affected tests:** `npx deuk-agent-rule ticket create`

## Tasks
- [x] `scripts/cli-ticket-commands.mjs`에 `summary` 필수 검증 로직 추가
- [x] `core-rules/AGENTS.md`에 `summary` 필수 규칙 명시 (v9)
- [x] CLI 테스트를 통한 검증 (누락 시 에러, 포함 시 성공)

## Done When
- [x] 서머리 없이 티켓 생성 시 `[VALIDATION FAILED]` 에러와 함께 종료됨
- [x] 서머리 포함 시 정상적으로 티켓이 생성됨