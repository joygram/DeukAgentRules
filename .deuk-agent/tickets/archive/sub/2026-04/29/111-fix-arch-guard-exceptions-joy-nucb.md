---
createdAt: 2026-04-29 12:02:54
docsLanguage: ko
id: 111-fix-arch-guard-exceptions-joy-nucb
phase: 2
priority: P2
status: closed
summary: "Target: scripts/tests/, PROJECTRULE.md"
tags: tickets, architecture, testing
title: fix-arch-guard-exceptions
---


# fix-arch-guard-exceptions

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.

## Target Module
- **Target:** `scripts/tests/`, `PROJECT_RULE.md`

## Analysis & Constraints (Deep Review)
> 1. DR-04/DR-05는 정당한 예외(config.yaml 파싱, hostname slug)가 예외 목록에 누락된 것
> 2. PROJECT_RULE.md §1 문구가 core-workflow 인라인 병합 후 부분적으로 부정확

## Agent Permission Contract (APC)

### [BOUNDARY]
- **변경 가능한 모듈:** `scripts/tests/ArchitectureGuard.test.mjs`, `PROJECT_RULE.md`
- **변경 금지 모듈:** `scripts/cli-*.mjs`, `core-rules/`, `templates/`

### [CONTRACT]
- **input:** DR-04/DR-05 위반 목록, PROJECT_RULE.md 현행 문구
- **output:** 테스트 6/6 PASS, PROJECT_RULE.md 정확한 문구
- **side effects:** 없음
- **Rule Citation:** N/A (테스트 예외 등록 + 문서 보정)

### [PATCH PLAN]
- **file:** `scripts/tests/ArchitectureGuard.test.mjs` / DR-04 예외에 `lint-md.mjs`, `cli-rule-compiler.mjs` 추가, DR-05 예외에 `cli-ticket-index.mjs` 추가
- **file:** `PROJECT_RULE.md` / §1 문구 보정

### [TEST IMPACT]
- **affected tests:** `ArchitectureGuard.test.mjs` DR-04, DR-05 → PASS 전환

## Tasks
- [ ] DR-04 예외 등록
- [ ] DR-05 예외 등록
- [ ] PROJECT_RULE.md 문구 보정
- [ ] 테스트 6/6 PASS 확인

## Done When
> `node --test scripts/tests/ArchitectureGuard.test.mjs` 6/6 PASS
