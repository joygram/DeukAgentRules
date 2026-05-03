---
summary: "v23 no-ticket fallback 변경과 현재 dirty worktree를 다음 커밋 가능 단위로 분류한다."
status: active
priority: P2
tags:
  - plan
  - phase1
  - git-history
  - release-hygiene
createdAt: "2026-05-01 14:43:09"
---

# v23 변경 정리 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
`ticket next --path-only`는 active/open 티켓이 없다고 보고했다. 새 fallback 규칙에 따라 최근 git history와 현재 worktree를 분석했다.

최근 커밋 흐름은 ticket/planLink Phase 1 의미를 강화하는 작업들로 이어졌고, 직전 작업에서는 no-ticket fallback 자체를 v23 규칙으로 보강했다. 하지만 그 변경은 아직 커밋되지 않았고, ticket archive와 INDEX 갱신도 같은 worktree에 남아 있다.

따라서 다음 작업은 새 기능 구현이 아니라 현재 dirty worktree를 커밋 가능한 단위로 분류하고, 사용자가 커밋을 요청할 때 안전하게 진행할 수 있는 상태를 만드는 것이다.

## Source Observations
- `ticket next --path-only` 결과는 active/open 티켓 없음이며, CLI는 최근 git history 분석을 안내했다.
- 최근 커밋은 `fix(rules): keep planlink free of progress checkboxes`, `fix(rules): make planlink capture agent analysis`, `fix(rules): separate ticket and plan content`, `fix(ticket): honor project and submodule filters` 순서로 TDW 경계 강화 흐름을 보인다.
- 현재 dirty worktree에는 v23 fallback 변경(`core-rules/AGENTS.md`, `docs/*`, `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`)이 있다.
- 동시에 `.deuk-agent/tickets/INDEX.json` 갱신과 오래된 open ticket 파일 삭제 상태가 남아 있다.
- 삭제 상태인 legacy/BMT ticket 파일들은 최근 archive/index 흐름과 연결되어 보이지만, 별도 사용자 변경일 수 있으므로 되돌리거나 커밋 범위에 포함하기 전에 확인이 필요하다.

## Cause Hypotheses
- 직전 TDW 작업은 Phase 4/archive까지 진행했지만 git commit은 수행하지 않았기 때문에 변경이 worktree에 남았다.
- ticket archive 명령이 INDEX와 ticket 파일 위치를 정리하면서 과거 open ticket 파일 삭제 상태를 표면화했을 수 있다.
- v23 규칙 변경과 ticket metadata 정리가 하나의 commit에 섞이면 리뷰와 rollback이 어려워진다.

## Decision Rationale
새 코드 수정을 바로 시작하지 않는다. 현재 저장소 상태는 먼저 정리 단위 판단이 필요하다.

우선 v23 no-ticket fallback 변경은 하나의 명확한 commit 후보로 분리할 수 있다. ticket archive/INDEX 변경은 TDW 운영 메타데이터이므로 같은 commit에 포함할지, 별도 commit 또는 제외 처리할지 판단해야 한다.

사용자에게 명시적 commit 요청을 받기 전에는 staging/commit을 하지 않는다. 대신 파일 그룹과 권장 순서를 정리한다.

## Execution Strategy
현재 dirty worktree를 세 그룹으로 분류한다.

그룹 A는 v23 fallback 규칙/문서/테스트 변경이다. 그룹 B는 티켓 archive와 `.deuk-agent/tickets/INDEX.json` 변경이다. 그룹 C는 이전부터 존재한 것으로 보이는 legacy ticket 삭제 상태다.

각 그룹의 포함/제외 판단을 정리하고, 필요하면 사용자가 바로 커밋할 수 있는 명령 후보를 제시한다.

## Verification Design
문서 기록은 `npx deuk-agent-rule lint:md`로 검증한다.

코드 변경 자체는 직전 작업에서 `node --test scripts/tests/*.test.mjs`가 통과했으므로, 이 티켓에서는 추가 코드 실행보다 상태 분류 정확도를 우선한다.

잔여 리스크는 `.deuk-agent/tickets/INDEX.json`과 삭제된 ticket 파일들이 사용자 의도 변경인지 자동 archive 결과인지 완전히 분리되지 않았다는 점이다.
