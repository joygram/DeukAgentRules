---
summary: "Agent problem analysis and decision trace for 180-index-json-분리-및-경량화-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 10:21:19"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 `INDEX.json`은 티켓 탐색, active 포인터, status 전이, archive 추적을 모두 한 파일에 담고 있습니다. 엔트리 수가 늘어날수록 파일은 커지고, 생성/아카이브/리빌드/복구가 모두 같은 장부를 건드립니다. 이 구조는 동작은 하지만, IDE 종료나 중간 쓰기 실패, 자동 아카이브 연쇄 처리 같은 상황에서 쉽게 흔들릴 수 있습니다.

## Source Observations
- [scripts/cli-ticket-index.mjs](../../../scripts/cli-ticket-index.mjs) 는 `readTicketIndexJson()`과 `writeTicketIndexJson()`로 인덱스를 통째로 읽고 다시 씁니다.
- 같은 파일에서 `syncActiveTicketId()`가 active ticket와 pointer 파일 정리를 함께 맡고 있어, 상태와 포인터 책임이 한 곳에 몰려 있습니다.
- [scripts/cli-ticket-commands.mjs](../../../scripts/cli-ticket-commands.mjs) 는 create, close, move, archive, next, use, list, rebuild에서 모두 동일한 `INDEX.json`을 기준으로 상태를 계산합니다.
- `readTicketIndexJson()`는 path를 다시 계산해 drift를 줄이지만, entries 자체는 계속 누적되어 파일 크기와 갱신 비용이 증가합니다.
- 현재 `INDEX.json` 크기는 약 62KB, 130개 엔트리 수준이라 당장 비정상은 아니지만, 구조적으로는 성장 비용이 계속 붙는 형태입니다.

## Cause Hypotheses
- `INDEX.json`이 사실상 hot index, archive catalog, state cache 역할을 동시에 하고 있습니다.
- archive된 항목이 계속 같은 파일 구조에 남아 있어 active lookup과 cold history가 분리되지 않습니다.
- rebuild와 rollback이 전체 인덱스를 자주 만지므로, 파일이 커질수록 실패 복구 범위가 넓어집니다.
- 현재 구조에는 active-only fast path가 없어서, 자주 쓰는 상태와 오래된 상태가 같은 비용으로 취급됩니다.

## Decision Rationale
- active, archive, meta 역할을 분리하는 방향이 가장 먼저 필요합니다.
- `INDEX.json` 하나를 무조건 유지하기보다, `INDEX.active.json` 같은 작은 hot index와 archive 파티션/스냅샷으로 나누는 것이 안전합니다.
- direct lock보다 재생 가능한 journal/snapshot 모델이 더 적합합니다.
- 모든 기록을 한 번에 재작성하는 방식은 단순하지만, 여기서는 지연 싱크와 파티션이 더 낫습니다.

## Execution Strategy
- 1차로 현재 `INDEX.json`의 사용처를 분류하고, 읽기 경로와 쓰기 경로를 active/archive로 나눌 수 있는 최소 인터페이스를 정의합니다.
- 2차로 active index에는 open/active/current pointer만 남기고, archived entries는 별도 파티션 파일이나 snapshot으로 보냅니다.
- 3차로 `readTicketIndexJson()`과 `writeTicketIndexJson()`의 내부 구현을 분리해, CLI는 같은 API를 쓰되 저장소 레이아웃만 바꾸게 합니다.
- 4차로 rebuild와 rollback은 전체 재작성보다 partition 단위 재생성에 가깝게 바꿉니다.
- 5차로 journal 또는 snapshot을 도입해 IDE 종료나 중간 실패 후에도 재구성할 수 있게 합니다.

## Verification Design
- `ticket list`, `ticket status`, `ticket meta`, `ticket use`, `ticket next`, `ticket close`, `ticket move`, `ticket archive`가 기존과 동일하게 동작해야 합니다.
- active index와 archive 파티션을 나눠도 open/active 탐색 결과가 바뀌지 않아야 합니다.
- 인덱스가 부분적으로 손상된 경우 rebuild 경로로 복구할 수 있어야 합니다.
- CLI가 `INDEX.json`을 직접 대량 재작성하는 횟수가 줄어들어야 합니다.
- 남은 리스크는 파티션 파일이 늘어나면서 관리 대상이 증가하는 점이므로, partition 기준과 GC 규칙을 같이 정의해야 합니다.
