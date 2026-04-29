---
id: 097-reinforce-cli-reporting-interfac-joy-nucb
title: reinforce-cli-reporting-interface
summary: "- **In**: ticket report 서브커맨드 추가 또는 기존 archive/reports 기능 강화. 리포트 연결 및
  조회 인터페이스 보강.. 주요 작업: `ticket report attach --id <ticket-id> --file <path>` 명령어
  구현., `ticket reports` 명령어에서 특정 티켓과 연결된 리포트를 더 쉽게 찾을 수 있도록 개선., `ticket
  archive` 시 리포트가 누락된 경우 경고 또는 자동 검색 로직 추가."
planLink: .deuk-agent/docs/plans/097-reinforce-cli-reporting-interfac-joy-nucb-plan.md
---


# reinforce-cli-reporting-interface

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
- **Root Cause & Architecture constraint**: 현재 리포트(walkthrough)는 `ticket archive` 시점에 수동으로 연결되거나 파일 시스템에서 직접 관리됨. 사용자는 리포트 생성, 수정, 조회를 CLI 인터페이스를 통해 더 일관되게 수행하기를 원함.
- **Risk & Edge Cases**:
    - 기존 `ticket archive --report` 플래그와의 하위 호환성 유지 필요.
    - 리포트 파일의 위치가 분산될 경우 관리 복잡도 증가.

## Strict Rules Check
- **Tone**: Dry, concise, technical. No emojis.
- **Language**: Korean 해요체.
- **Coding**: CLI 스크립트 작성 시 기존 유틸리티(`cli-utils.mjs`) 활용.

## Scope (In / Out)
- **In**: `ticket report` 서브커맨드 추가 또는 기존 `archive`/`reports` 기능 강화. 리포트 연결 및 조회 인터페이스 보강.
- **Out**: 리포트 내용 자동 생성(AI 기능)은 이번 스코프에서 제외.

## Tasks
- [x] `ticket report attach --id <ticket-id> --file <path>` 명령어 구현.
- [x] `ticket reports` 명령어에서 특정 티켓과 연결된 리포트를 더 쉽게 찾을 수 있도록 개선.
- [x] `ticket archive` 시 리포트가 누락된 경우 경고 또는 자동 검색 로직 추가.
- [x] `cli.mjs` 및 `cli-ticket-commands.mjs` 수정.

## Done When
- [x] CLI를 통해 리포트를 티켓에 연결하고 조회할 수 있는 명확한 인터페이스가 제공됨.
- [x] `npx deuk-agent-rule ticket report --help`가 정상 작동함.

## 📄 Attached Report
- [View Report](../../docs/walkthroughs/097-reinforce-cli-reporting-interfac-joy-nucb-report.md)
