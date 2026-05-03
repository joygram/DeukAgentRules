---
summary: "Agent problem analysis and decision trace for 202-fix-legacy-ticket-layout-sync-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 23:31:29"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- 이 planLink는 티켓 `202-fix-legacy-ticket-layout-sync-joy-nucb`의 실행 흔적, 판단 근거, 검증 결과를 보관합니다.
- 티켓 본문은 계약/범위/요건, planLink는 분석-원인-결정-검증으로 구분합니다.

## Problem Analysis
- 현재 `computeTicketPath`와 인덱스/파서가 `group`을 그대로 사용해 레거시 값(`tickets`, `.deuk-agent-ticket`, `.deuk-agent-tickets`, `ticket`)을 신뢰합니다.
- 이로 인해 archived 티켓이 `archive/<legacy-group>/...`로 계속 내려가고, 정규화 후에도 계속 재생성되는 경향이 있어 `init --dry-run`에서 churn가 반복됩니다.
- `canonicalizeTicketArchivePath`는 매핑할 때도 `matchedEntry.group`을 그대로 사용해 archive 하위 경로가 비정규화 값으로 고정됩니다.

## Source Observations
- `scripts/cli-utils.mjs`의 `computeTicketPath()`는 `entry.group` 그대로를 경로 구성에 사용.
- `scripts/cli-ticket-parser.mjs`의 `parseTicketStorage()`는 archive 경로에서 `group`을 추출한 뒤 정규화하지 않음.
- `scripts/cli-ticket-index.mjs`의 `parseIndexFile()` / `readTicketIndexJson()`에서 `computeTicketPath()`에 상태만 전달, 입력 group 정규화 없음.
- `scripts/cli-init-commands.mjs`의 `canonicalizeTicketArchivePath()`가 인덱스 엔트리의 legacy group을 그대로 쓰며 `archive/<group>/...`로 이동시킴.
- 레거시 티켓 그룹은 `LEGACY_TICKET_DIR`, `LEGACY_TICKET_DIR_PLURAL` 상수에 정의되어 있으므로 canonicalization 기준이 불완전함.

## Cause Hypotheses
1. 과거 경로(`/ticket`, `/tickets`, `.deuk-agent-ticket`, `.deuk-agent-tickets`)가 현재 규격(`sub`, `archive/<team>`)과 공존하면서 `group` 필드 자체가 진실 데이터처럼 취급됨.
2. 경로 계산과 파싱에서 정규화 포인트가 분산되어 있어, 한 지점에서 고쳐도 다른 지점에서 다시 legacy 경로를 생성함.
3. 초기 migration이 완료된 뒤에도 canonicalize 단계에서 group alias가 남아 archive 단계 churn가 재발함.

## Decision Rationale
- 단일 정규화 정책을 도입합니다. `TICKET_DIR` 경로 계산/파싱의 공통 진입점에 legacy group을 `sub`로 치환하여 상태기반 경로만 사용합니다.
- 변경 범위를 `scripts/cli-*.mjs` 내부로 제한해 현재 티켓 작업 범위와 충돌하지 않도록 하고, 규격 변경이 아닌 정규화 동작으로 최소 수정합니다.
- 별도 UX/CLI 옵션 변경 없이 기존 `init` 플로우를 그대로 유지하고, migration 명령이 일관되게 같은 결과를 만들도록 합니다.

## Execution Strategy
1. `scripts/cli-utils.mjs`에 `normalizeTicketGroup`(legacy alias 정규화) 헬퍼를 추가하고 `computeTicketPath()`에서 호출.
2. `scripts/cli-ticket-parser.mjs`의 `parseTicketStorage()`가 반환하는 `group`을 정규화하도록 반영.
3. `scripts/cli-ticket-index.mjs`에서 `parseIndexFile()`/`readTicketIndexJson()` 경로 재해석 시 정규화 적용으로 index path 계산 일관성 보장.
4. `scripts/cli-init-commands.mjs`의 `canonicalizeTicketArchivePath()`에서도 index 기반 group을 정규화하여 실제 이동 경로를 통일.
5. `cli-utils`와 `cli-init-commands` 테스트에 legacy group 케이스 회귀 테스트 추가.

## Verification Design
- 단위 테스트
  - `node --test scripts/tests/cli-utils.test.mjs`
  - `node --test scripts/tests/cli-init-commands.test.mjs`(회귀 케이스 추가 후)
- 회귀 실행
  - `npx deuk-agent-rule init --agents skip --cwd /home/joy/workspace --workflow execute --approval approved --dry-run`
  - 기대: legacy group 이동 충돌 메시지 축소, archive 경로 churn 항목 사라짐 또는 안정화(동일 경로 재동작 없음).
- 워크스페이스 정합 검증
  - `find /home/joy/workspace -path '*/.deuk-agent/*'`에서 legacy ticket 그룹 폴더(`core`, `main`, `global`, `tickets`, `archive/tickets`) 잔존 여부 재확인.
