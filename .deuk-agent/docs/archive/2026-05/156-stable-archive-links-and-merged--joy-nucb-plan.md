---
summary: "아카이브 후 티켓 경로 안정화와 DeukPack BMT 통합 리포트 계획"
status: active
priority: high
tags:
  - tickets
  - archive
  - reports
  - bmt
---

# 156 stable archive links and merged BMT report plan

## Ticket Contract Pointer

작업 경계와 APC는 `.deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md`가 소유한다. 이 문서는 문제 분석, 근거, 실행 전략, 검증 설계만 기록한다.

## Problem Analysis

현재 `ticket archive`는 티켓 파일을 `.deuk-agent/tickets/archive/<group>/`로 이동하지만, INDEX entry에는 기존 `found.path`가 남을 수 있다. 대화창이나 후속 CLI 출력이 작업 당시의 이동 전 경로를 그대로 참조하면, 실제 파일 위치와 사용자가 보는 링크가 어긋난다.

DeukPack BMT 작업도 감사, 실행 결과, truth gate 보강이 153/154/155 세 보고서로 나뉘어 있다. 개별 티켓의 증거 보존은 유효하지만, 사용자에게 현재 판단을 전달할 canonical report가 없어서 “무엇이 최종 결론인지”가 흐려진다.

## Source Observations

`scripts/cli-ticket-commands.mjs`의 `runTicketArchive`는 `newAbsPath`로 파일을 이동한 뒤 status와 updatedAt만 갱신한다. 최종 archived path를 INDEX에 반영하지 않고, 콘솔 출력도 file URI 중심이라 대화에서 재사용할 repo-relative 최종 경로가 명시적으로 남지 않는다.

기존 보고서 153은 evidence kind 분리, 154는 실제 BMT 실행 결과, 155는 환경 미구성과 third-party fake proof를 실패로 처리한 truth gate를 다룬다. 세 문서는 하나의 BMT 현재 상태 판단으로 합칠 수 있다.

## Cause Hypotheses

경로 문제의 직접 원인은 archive move 후 INDEX path 미갱신이다. 간접 원인은 archive 출력이 “최종 경로를 이후 답변에서 쓰라”는 형태로 안정화되어 있지 않아, 에이전트가 이미 읽은 pre-archive path를 계속 인용하기 쉽다는 점이다.

리포트 분산 문제의 원인은 티켓별 report 자동 연결 관성이다. 티켓 evidence와 현재 상태 보고서의 목적이 다른데, 둘을 모두 `<ticket-id>-report.md`에만 두면 current view가 쪼개진다.

## Decision Rationale

CLI 쪽은 `runTicketArchive`에서 INDEX entry의 `path`를 `archive/...` 최종 위치로 갱신하고, `fileName`도 최종 파일명과 동기화한다. 출력에는 repo-relative final path를 추가해 대화/로그에서 그대로 쓸 수 있게 한다.

리포트 쪽은 기존 per-ticket report를 삭제하지 않고, `.deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md`를 canonical current report로 만든다. 삭제는 archive ticket의 증거 링크를 끊을 수 있으므로 이번 변경에서는 보존한다.

## Execution Strategy

`runTicketArchive`의 move 완료 직후 index entry update block에 final path/fileName을 기록한다. 테스트는 임시 workspace에 실제 티켓 파일과 INDEX entry를 만들고 archive 실행 후 archived file existence와 INDEX path/status를 검증한다.

통합 보고서는 153/154/155의 결론을 합쳐 “현재 BMT는 green이 아니며, generated roundtrip과 external smoke/preflight를 구분해야 하고, 환경/third-party proof가 채워지기 전까지 통과로 보지 않는다”로 정리한다.

## Verification Design

Markdown 변경 후 `npx deuk-agent-rule lint:md`로 ticket/plan/report를 검사한다. CLI 변경은 `node --test scripts/tests/cli-ticket-commands.test.mjs`로 검증하고, syntax regression을 겸한다. 필요하면 `git diff --check`로 공백 오류를 확인한다.
