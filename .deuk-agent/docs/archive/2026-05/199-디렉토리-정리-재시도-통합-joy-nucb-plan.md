---
summary: "Legacy directory cleanup for deterministic .deuk-agent layout and root-level stale ticket folder handling"
status: verified
priority: P2
tags:
  - plan
  - phase1
  - execution
createdAt: "2026-05-03"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns scope and lifecycle constraints.
- This plan documents root-cause, evidence, and execution strategy for directory cleanup.

## Problem Analysis
- 사용자 요청은 `.deuk-agent` 내부뿐 아니라 레포 루트에 존재하는 의미 불분명 디렉토리(특히 `ticket/`)까지 포함되는 것으로 보입니다.
- 현재 `.deuk-agent`는 `docs`, `knowledge`, `tickets`, `config.json`, `telemetry.jsonl` 구조로 정리되어 있으나, 루트 `ticket/`은 `.deuk-agent` 패턴과 맞지 않고 이전 시스템 흔적으로 보입니다.
- `ticket/TICKET_LIST.md`는 `Source index: .deuk-agent-ticket/INDEX.json` 등 현재 미존재 경로를 가리켜 이미 깨진 링크를 포함하고 있어 정리 대상입니다.
- `npx deuk-agent-rule init --dry-run`에서는 루트 `ticket/`을 legacy 대상 인식하지 못해 제거되지 않습니다. 즉, init이 deterministic하게 정리해 주지 못해 재출현이 발생할 수 있습니다.

## Source Observations
- Root scan confirms legacy: `ticket/TICKET-DEUKPACK-Security.md`, `ticket/TICKET-DEUKUI-IR-Refactoring.md`, `ticket/TICKET_LIST.md`.
- `.deuk-agent/tickets` 하위는 `archive/sub/<YYYY-MM>/<DD>`와 `sub/`로 정리되어 있으며, `init` dry-run 시 추가 마이그레이션이 거의 없습니다.
- `scripts/cli-init-commands.mjs`의 `migrateLegacyStructure()`는 `.deuk-agent-ticket` / `.deuk-agent-tickets`만 legacy로 인식하며, 루트 `ticket/`은 처리되지 않습니다.

## Cause Hypotheses
- 1) 루트 레거시 디렉토리 `ticket/`가 새 네이밍 규칙에서 누락돼 계속 잔존.
- 2) `init`이 legacy 후보를 선별할 때 `ticket/`까지 다루지 않아 반복 실행해도 정리되지 않음.

## Decision Rationale
- 우선 레이아웃 정합성을 위해 `init`의 `migrateLegacyStructure()`에 루트 `ticket/` 처리를 추가합니다.
- `ticket/`의 존재 자체가 문맥상 고아 흔적이므로 자동 정리 대상으로 분류하고, 기존 `TICKET_LIST.md`와 티켓 파일은 안전하게 별도 보관 후 삭제합니다.
- 보관 위치는 기존 레포 내 `deuk-agent` 영구 저장소 밖에서 추적 가능하도록 `.deuk-agent/legacy-ticket/` 경로로 통일 정리합니다(구조 단일화 + 추적성).

## Execution Strategy
- 1단계: `scripts/cli-utils.mjs`에 root legacy 상수(`LEGACY_TICKET_DIR_ROOT = "ticket"`) 추가.
- 2단계: `scripts/cli-init-commands.mjs`의 `migrateLegacyStructure()`에서 root `ticket/` 디렉토리 병합/이관 로직 추가.
  - `ticket` 폴더가 존재하면 `.deuk-agent/legacy-tickets/<timestamp>`로 이동.
  - 이동 실패 시 삭제/병합 로그를 남기고 dry-run에서 동작 확인 가능.
- 3단계: 기존 `init`과 충돌 없는지 `npx deuk-agent-rule init --dry-run` 실행 후, 새 경로가 예측대로 생성되는지 확인.
- 4단계: `.deuk-agent/docs`, `.deuk-agent/tickets`, `.deuk-agent/knowledge`, 루트 `ticket/` 존재 여부를 재점검해 결과를 보고.

## Verification Design
- `rg --files ticket` → 빈 결과/legacy-only 이동 검증.
- `npx deuk-agent-rule init --dry-run` → root legacy가 감지되어 작업 로그에 노출되는지 확인.
- `rg --files .deuk-agent | rg "(^|/)tickets/(global|main|core|reports|archive/tickets|legacy-tickets)` → legacy 레이아웃이 제거되었는지 확인.
- `git diff`로 변경 파일이 init 스크립트 및 계획 산출만 반영되는지 확인.

## Verification Outcome
- `.agent/workflows/*.md`는 `.deuk-agent/docs/archive/walkthroughs/2026-05/agent-workflow-*.md`로 이동했고 루트 `.agent`는 제거되었습니다.
- `.deuk-agent` 최상위는 `docs`, `knowledge`, `tickets`, `config.json`, `telemetry.jsonl`만 허용하도록 init 정리 로직이 보강되었습니다.
- `npx deuk-agent-rule init --dry-run` 재실행 결과 추가 이동 대상이 없습니다.
- `npx deuk-agent-rule lint:md`와 `node --test scripts/tests/*.test.mjs`가 통과했습니다.
