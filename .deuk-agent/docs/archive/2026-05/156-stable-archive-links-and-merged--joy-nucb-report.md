---
summary: "아카이브 최종 경로 안정화와 DeukPack BMT 통합 리포트 작업 결과"
status: done
priority: high
tags:
  - tickets
  - archive
  - reports
  - bmt
---

# 156 stable archive links and merged BMT report 결과

## 변경

`scripts/cli-ticket-commands.mjs`의 `ticket archive`가 최종 archived ticket path를 repo-relative 경로로 출력하고, API 호출 결과로도 `{ id, path }`를 반환하도록 했다.

기존 INDEX writer는 physical path snapshot을 저장하지 않고 status/fileName으로 경로를 재계산하는 구조다. 따라서 저장층 패턴은 유지하고, archive 직후 대화/로그에서 재사용할 수 있는 최종 경로를 명시적으로 제공하는 방식으로 정리했다.

`scripts/tests/cli-ticket-commands.test.mjs`에 archive regression test를 추가했다. 실제 임시 티켓 파일을 archive한 뒤 archived 파일 존재, INDEX status, 반환 path, 콘솔 final path 출력을 검증한다.

DeukPack BMT 보고서는 `.deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md`로 합쳤다. 153/154/155 per-ticket report는 archive evidence로 보존하고, 사용자-facing 현재 판단은 통합 리포트를 기준으로 본다.

## 검증

`node --test scripts/tests/cli-ticket-commands.test.mjs` 통과.

`npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md .deuk-agent/docs/plans/156-stable-archive-links-and-merged--joy-nucb-plan.md .deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md` 통과.

`git diff --check -- scripts/cli-ticket-commands.mjs scripts/tests/cli-ticket-commands.test.mjs .deuk-agent/tickets/sub/156-stable-archive-links-and-merged--joy-nucb.md .deuk-agent/docs/plans/156-stable-archive-links-and-merged--joy-nucb-plan.md .deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md` 통과.

## 현재 BMT 판단

BMT는 green이 아니다. 기존 gate는 통과했지만, truth gate 보강 후에는 C++ `cmake` 부재, Java `mvn` 부재, MessagePack similar competitor의 third-party proof 부족 때문에 실패해야 하는 상태다.

Canonical current report: `.deuk-agent/docs/walkthroughs/deukpack-bmt-current-report.md`
