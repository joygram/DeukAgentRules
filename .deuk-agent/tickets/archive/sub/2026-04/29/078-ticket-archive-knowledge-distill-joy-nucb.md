---
id: 078-ticket-archive-knowledge-distill-joy-nucb
priority: P1
status: open
summary: "Target: [Fill in the target module/submodule path] - Context Files:
  [List architecture docs or key files to read first] - Root Cause: ticket
  archive 명령어가 단순히 파일을 archive/ 디렉토리로 이동시키기만 하여, 티켓 본문에 포함된 핵심 의사결정(Design
  Decisions)이나 분석 결과가 구조화된 지식으로 남지 않음."
tags: rag, tickets, architecture, testing
title: 078-ticket-archive-knowledge-distillation
---


# 078-ticket-archive-knowledge-distillation

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
- **Root Cause**: `ticket archive` 명령어가 단순히 파일을 `archive/` 디렉토리로 이동시키기만 하여, 티켓 본문에 포함된 핵심 의사결정(Design Decisions)이나 분석 결과가 구조화된 지식으로 남지 않음.
- **Dead Code Audit**: 프로젝트가 V2로 마이그레이션되면서 `cli-ticket-commands.mjs` 및 `cli-utils.mjs` 내에 잔존하는 레거시 경로 참조(`.deuk-agent-templates` 등) 및 미사용 유틸리티 함수들을 식별함.
- **Constraint 1 (Zero-Token)**: 지식 추출 시 LLM 호출을 배제하고 정규식 기반의 패턴 매칭만 사용함. (비용 및 속도 최적화)
- **Constraint 2 (Non-Blocking)**: 동기 I/O 기반으로 작성하여 워크플로의 보틀넥이 되지 않도록 함.
- **Constraint 3 (Persistence)**: 추출된 지식은 `.deuk-agent/knowledge/<ticket-id>.json` 파일로 저장하여 RAG 시스템이 즉시 인덱싱할 수 있게 함.

## Strict Rules Check
- [x] Dry, concise, technical tone.
- [x] Reply in Korean 해요체.
- [x] No external dependencies (use built-in Node.js modules).

## Scope (In / Out)
- **In**: `## Design Decisions`, `## Analysis & Constraints`, `## Tasks` 섹션 추출.
- **In**: 추출된 데이터를 JSON 형식으로 `.deuk-agent/knowledge/`에 저장.
- **In**: `cli-ticket-commands.mjs` 및 `cli-utils.mjs` 내의 데드코드 및 레거시 참조 제거.
- **Out**: LLM을 통한 자동 요약 기능. (사용자의 명시적 요청 시 별도 명령어로 처리)
- **Out**: 티켓 파일의 물리적 삭제 (기존 `archive` 로직에서 처리됨).

## Tasks
- [ ] `scripts/cli-ticket-commands.mjs`에 `distillKnowledge` 함수 구현.
- [ ] `runTicketArchive` 함수 내에서 아카이브 이동 직전에 `distillKnowledge` 호출하도록 통합.
- [ ] `.deuk-agent/knowledge/` 디렉토리 자동 생성 로직 추가.
- [ ] `cli-ticket-commands.mjs` 및 `cli-utils.mjs` 전수 조사 후 데드코드(레거시 경로 참조 등) 제거.
- [ ] 실제 티켓 아카이브 테스트 및 JSON 생성 확인.


## Done When
- `npx deuk-agent-rule ticket archive --latest` 실행 후 `.deuk-agent/knowledge/` 경로에 해당 티켓의 ID를 이름으로 하는 JSON 파일이 생성됨.
- JSON 파일 내에 티켓의 주요 섹션 내용이 정확히 포함됨.
