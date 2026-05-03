---
createdAt: 2026-04-29 19:12:25
docsLanguage: ko
id: 114-fix-boot-ticket-loop-joy-nucb
phase: 4
planLink: .deuk-agent/docs/plans/114-fix-boot-ticket-loop-joy-nucb-plan.md
priority: P2
status: closed
summary: 미작성 티켓 — 실질적 내용 없음. 좀비/placeholder 티켓으로 분류.
tags: tickets, architecture, testing
title: fix-boot-ticket-loop
---

# fix-boot-ticket-loop

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
- **변경 가능한 모듈:** `core-rules/AGENTS.md`
- **변경 금지 모듈:** `scripts/`, `bin/`

### [CONTRACT]
- **input:** Boot Sequence 규칙 텍스트
- **output:** 1-CALL 티켓 디스커버리 규칙 + CLI Max calls 컬럼
- **side effects:** 없음 (규칙 문서 변경만)
- **Rule Citation:** N/A

### [PATCH PLAN]
- **file:** `core-rules/AGENTS.md`
- **function:** Boot Sequence, CLI Reference
- **change:** 1-CALL RULE 추가, FORBIDDEN 루프 패턴 명시, Max calls 컬럼 추가

### [TEST IMPACT]
- **affected tests:** 없음 (문서 변경)

## Tasks
- [x] Boot Sequence에 1-CALL ticket discovery 규칙 추가
- [x] CLI Reference에 Max calls 컬럼 추가
- [x] ticket list를 boot 시 0회로 제한

## Done When
- [x] AGENTS.md에 FORBIDDEN 루프 패턴이 명시됨