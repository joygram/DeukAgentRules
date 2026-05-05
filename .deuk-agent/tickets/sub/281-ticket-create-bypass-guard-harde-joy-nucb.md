---
id: 281-ticket-create-bypass-guard-harde-joy-nucb
title: ticket-create-bypass-guard-hardening
phase: 4
status: closed
project: DeukAgentRules
docsLanguage: ko
summary: 티켓 생성 실패 후 수동 파일 작성으로 우회하지 못하도록 CLI와 규칙을 강화한다.
priority: P1
tags: []
createdAt: 2026-05-05 01:43:04
---


# ticket-create-bypass-guard-hardening

## Compact Plan

- **찾은 점:** `ticket create` strict mode는 incomplete Phase 1 생성을 롤백하지만, 에이전트가 이후 `.deuk-agent/tickets/sub/*.md`를 직접 작성하면 CLI lifecycle provenance 없이 우회할 수 있다.
- **방향:** 티켓 markdown이 CLI 생성 provenance를 갖도록 만들고, `ticket status`와 `ticket use`가 provenance 없는 open/sub 티켓을 차단하도록 한다. `ticket create` strict 실패 메시지는 누락 사유별로 필요한 입력 방법을 한 번에 제시하게 한다. core rule에도 수동 파일 생성 금지를 명시한다.
- **검증:** focused node test로 수동 티켓 status/use 차단, CLI 생성 티켓 정상 통과, strict create 실패 메시지의 actionable guidance를 확인하고, markdown lint를 돌린다.
- **메모:** 기존 legacy 티켓은 archive/repair 경로가 있으므로 이번 가드는 open/sub 티켓의 실행 선택 경로에 우선 적용한다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `scripts/cli-ticket-commands.mjs`, `scripts/tests/cli-ticket-commands.test.mjs`, `core-rules/AGENTS.md`, this ticket.
- Forbidden modules: global proxy business logic, generated consumer spokes, unrelated init/migration rewrites.
- Rule citation: `PROJECT_RULE.md` Module Ownership + `core-rules/AGENTS.md` ticket-first invariant.

### [CONTRACT]
- Input: observed `ticket create` rejection followed by manually created ticket file, existing ticket create/status/use lifecycle.
- Output: CLI-generated tickets carry lifecycle provenance, manually created open/sub tickets cannot be selected as active execution tickets, and strict create failures explain the missing inputs in one pass.
- Side effects: scoped CLI/rule/test changes and verification record.

### [PATCH PLAN]
- Add ticket creation provenance in frontmatter for `runTicketCreate`.
- Add validation helper that rejects active/open sub tickets missing accepted lifecycle provenance.
- Invoke that validation in `ticket status` and `ticket use`, where agents check/select tickets before execution.
- Replace terse strict create errors with guidance that maps missing sections to `--from-plan` or a filled plan file.
- Add regression tests for manual-ticket rejection, generated-ticket acceptance, and actionable strict-create failure output.

## Problem Analysis

- `ticket create` 실패 원인은 CLI가 상세히 제공했지만, 실패 후 에이전트가 같은 경로에 markdown 파일을 직접 쓰면 CLI의 strict create rollback을 사실상 무력화할 수 있다.
- `ticket create` 실패 메시지는 `missing_apc_block` 같은 내부 reason code를 나열하지만, 어떤 파라미터나 파일 형식으로 보완해야 하는지 충분히 안내하지 않아 재시도와 우회를 유도한다.
- 현재 index entry `source: ticket-create`는 CLI가 append할 때만 생기지만, 파일 자체에는 CLI lifecycle provenance가 없다.
- `ticket status`/`ticket use`는 파일 frontmatter와 index를 읽어 선택할 수 있으므로, 수동 작성된 티켓이 index에 섞이거나 rebuild될 경우 실행 티켓으로 승격될 위험이 있다.

## Source Observations

- `scripts/cli-ticket-commands.mjs`의 `runTicketCreate()`는 strict create 실패 시 파일과 index를 롤백한다.
- 같은 함수의 frontmatter에는 `id`, `title`, `phase`, `status`, `summary` 등은 저장하지만 CLI 생성 provenance 필드는 없다.
- `runTicketStatus()`와 `runTicketUse()`는 실행 전 점검/선택 경로이므로 provenance guard를 넣기 적합하다.
- `runTicketCreate()`의 strict mode 오류는 현재 `[VALIDATION FAILED] ticket create strict mode rejected placeholder/incomplete phase1 state: ...` 형태로 reason code만 출력한다.
- `PROJECT_RULE.md`는 proxy에 business logic을 넣지 말라고 하므로 `scripts/` 안에서 처리해야 한다.

## Cause Hypotheses

- **H1:** 파일 기반 티켓 저장소라서 수동 파일 작성 자체를 OS 레벨에서 막을 수는 없다.
- **H2:** 실행 선택 경로에서 provenance를 강제하면 수동 작성 티켓은 있어도 작업 티켓으로 사용할 수 없다.
- **H3:** 기존 legacy/open 티켓까지 즉시 막으면 호환성 리스크가 크므로 새 lifecycle provenance를 부여하고 선택/status 경로에서 구체적 복구 명령을 안내하는 방식이 안전하다.
- **H4:** strict create 실패 메시지가 보완 방법을 함께 제공하면 수동 티켓 작성으로 넘어갈 유인이 줄어든다.

## Improvement Direction

- `ticket create`가 `lifecycleSource: ticket-create` 같은 frontmatter provenance를 기록한다.
- open/active sub 티켓이 `lifecycleSource` 없이 `ticket status`/`ticket use`에 들어오면 `manual_ticket_lifecycle_provenance_missing`으로 실패시킨다.
- 실패 메시지는 수동 작성 금지와 `ticket create`/`ticket use` 정식 경로를 명시한다.
- strict create 실패 메시지는 `--summary`만으로 부족한 경우를 명확히 설명하고, `--from-plan <filled-plan.md>` 또는 non-investigation topic 사용처럼 실제 다음 액션을 안내한다.
- core rule에 “CLI create 실패 후 apply_patch/writeFile로 티켓 파일을 직접 만들지 말 것”을 금지 규칙으로 추가한다.

## Audit Evidence

- Command: `rg -n "strict mode rejected|runTicketCreate|runTicketStatus|runTicketUse" scripts/cli-ticket-commands.mjs scripts/tests/cli-ticket-commands.test.mjs`
- Result: strict create rollback은 존재하지만, 생성 provenance 검증은 status/use 경로에 없고 strict create 오류는 누락 reason code만 제공한다.

## Tasks

- [x] 계획 정리
- [x] 변경 적용
- [x] 검증 기록

## Change Log

- `scripts/cli-ticket-commands.mjs`
  - `ticket create` frontmatter에 `lifecycleSource: ticket-create` provenance를 추가했다.
  - strict create 실패 메시지를 내부 reason code 나열에서 `--from-plan <filled-plan.md>`와 필요한 Phase 1 섹션을 안내하는 오류로 바꿨다.
  - `ticket status`와 `ticket use`에서 open/active 티켓의 CLI 생성 provenance가 없으면 `manual_ticket_lifecycle_provenance_missing`으로 차단한다.
- `scripts/tests/cli-ticket-commands.test.mjs`
  - strict create 실패 메시지가 actionable guidance를 포함하는지 검증한다.
  - provenance 없는 수동 티켓이 `status`/`use`에서 차단되는 회귀 테스트를 추가했다.
- `core-rules/AGENTS.md`
  - `ticket create` 실패 후 수동 markdown 생성/수정을 금지하는 hard stop을 추가했다.

## Verification Outcome

- `node --test scripts/tests/cli-ticket-commands.test.mjs`: pass, 53 tests.
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/281-ticket-create-bypass-guard-harde-joy-nucb.md`: pass.
- `npx deuk-agent-rule rules audit --compact`: pass.
- `node --test scripts/tests/lint-rules.test.mjs`: pass.

## Done When

- CLI 생성 실패 후 수동 티켓 파일을 작업 티켓으로 선택할 수 없다.
- 정상 `ticket create` 산출물은 status/use 경로를 통과한다.
- strict create 실패는 필요한 입력을 한 번에 이해할 수 있는 오류를 낸다.
- 관련 테스트와 markdown lint 결과가 기록된다.
