---
summary: "Codex 출력 토큰 소비 절감과 다음 티켓 탐색 원샷 CLI 개선 계획"
status: ready
priority: P2
tags:
  - plan
  - phase1
  - token-efficiency
  - cli
createdAt: "2026-05-03 06:08:44"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 규칙은 Low-Token Operating Mode와 Ticket Discovery 1-CALL RULE을 이미 갖고 있지만, 에이전트 실행 흐름에서는 부트 단계와 진행상황 보고가 여전히 여러 출력과 여러 도구 호출로 분리된다. 특히 다음 티켓 탐색은 `ticket next --path-only`로 경로만 얻은 뒤 티켓 본문 읽기, planLink 확인, 상태 요약, `set_workflow_context` 호출 판단을 에이전트가 별도로 수행해야 한다. 이 구조는 출력 토큰뿐 아니라 사고 경로와 도구 호출 수도 늘려 “다음 티켓 찾기”가 실제 체감 2분 이상 걸리는 병목을 만든다.

개선 목표는 규칙을 더 길게 만드는 것이 아니라, 에이전트가 따라야 할 최소 출력 프로토콜과 CLI 원샷 부트스트랩을 제공해 반복 판단을 CLI 결과 하나로 압축하는 것이다. 계획 산출이 이번 티켓의 요청 범위이므로 코드 변경은 Phase 2로 넘기고, 여기서는 구현 가능한 계약과 검증 기준을 확정한다.

## Source Observations
- `core-rules/AGENTS.md` v25는 “commentary 1-2문장”, “ticket next --path-only → view_file”, “ticket list during boot 금지”를 정의한다. 그러나 진행상황 출력의 이벤트별 포맷, 최대 빈도, 생략 가능 조건은 구체적이지 않다.
- `scripts/cli-ticket-commands.mjs`의 `runTicketNext`는 인덱스를 재빌드하고 active 우선, open 차순으로 하나를 고른 뒤 `--path-only`이면 절대 경로만 출력한다. `--print-content`는 본문 전체를 추가 출력하므로 토큰 절감용 부트스트랩에는 과하다.
- `scripts/cli-args.mjs`는 이미 `--compact`, `--json`, `--status-detail`, `--path-only`, `--print-content`를 파싱한다. 따라서 새 플래그나 JSON 출력 확장은 기존 CLI 스타일과 맞다.
- `scripts/tests/cli-ticket-commands.test.mjs`에는 `runTicketNext`의 active/open 선택, no-ticket 에러, compact status 테스트가 있다. `ticket next`의 원샷 부트스트랩 동작은 테스트 추가가 필요하다.
- `docs/architecture.md`는 Hub-Spoke와 Global CLI Proxy를 SSoT로 설명한다. 개선은 core rules와 local scripts에 들어가며 proxy에는 비즈니스 로직을 추가하지 않아야 한다.

## Cause Hypotheses
- 원인 1: 규칙이 “짧게 말하라”는 원칙은 있지만 진행 이벤트를 기계적으로 압축하는 표준 출력 형식이 없어 모델이 매번 자연어로 재구성한다.
- 원인 2: `ticket next`가 티켓 선택만 담당하고 부트 요약을 제공하지 않아, 에이전트가 파일 읽기와 요약을 반복한다.
- 원인 3: `--print-content`는 원샷처럼 보이지만 전체 본문 출력이라 입력 토큰 절감에는 불리하다.
- 원인 4: “truly unknown”과 “new work”의 분기는 규칙에 있지만 CLI가 `next`, `status`, `create`를 한 화면에서 결정해 주지 않아 실패 시 경로가 길어진다.

## Decision Rationale
선택안은 `ticket next`에 부트스트랩용 compact/JSON summary 모드를 추가하고, AGENTS.md에는 진행상황 출력을 “상태 코드 + 한 줄 근거 + 다음 행동”으로 제한하는 규칙을 보강하는 것이다. 이렇게 하면 에이전트는 티켓 후보 탐색, 티켓 본문 요약, planLink 존재 여부, phase/status, 다음 명령 힌트를 한 번의 CLI 호출로 받을 수 있다.

대안으로 `ticket list`를 개선해 부트에 쓰는 방법은 현재 규칙의 “boot 중 ticket list 금지”와 충돌한다. `--print-content`를 권장하는 방법은 본문 전체를 토큰으로 다시 소비하므로 목표와 반대다. MCP/RAG로 티켓을 찾는 방법은 이미 AGENTS.md에서 금지하며, 티켓 탐색은 CLI 상태가 SSoT인 점을 유지해야 한다.

## Execution Strategy
Phase 2에서는 먼저 CLI 계약을 추가한다. 제안 명령은 `npx deuk-agent-rule ticket next --bootstrap --json --compact`이며, 출력은 단일 JSON 객체로 제한한다. 필드는 `id`, `path`, `phase`, `status`, `summary`, `planLink`, `apcComplete`, `nextAction`, `workflowContext` 정도로 축약한다. 사람이 읽는 compact 출력은 한 줄로 `ticket=<id> phase=<n> status=<status> path=<path> next=<action>` 형태를 사용한다.

`runTicketNext`는 기존 `--path-only` 호환성을 유지하고, `--bootstrap`이 있을 때만 티켓 파일과 planLink를 최소 파싱한다. 본문 전체 출력은 하지 않고 frontmatter, APC 완성 여부, planLink 존재 여부, 미완료 사유 개수만 계산한다. no-ticket 상태에서는 기존 에러 메시지 대신 `--bootstrap --json`에서 `status:"no-ticket"`, `nextAction:"inspect-git-history"`를 반환해 자동화가 분기할 수 있게 한다.

AGENTS.md는 Low-Token Operating Mode를 “LT-* 프로토콜”로 정리한다. 예시는 `LT1: 진행 업데이트는 80자 내외`, `LT2: 파일 내용 재인용 금지`, `LT3: 부트는 ticket next --bootstrap --json 1회`, `LT4: Phase 전환/검증 실패/사용자 결정 필요 때만 중간 보고`이다. CLI 도움말에도 `--bootstrap`을 추가한다.

테스트는 기존 `runTicketNext` 테스트 옆에 추가한다. bootstrap JSON이 active/open 선택을 보존하는지, planLink와 phase/status를 포함하는지, no-ticket 상태가 예외 대신 JSON으로 안전하게 반환되는지, 기존 `--path-only` 출력이 깨지지 않는지 확인한다.

## Verification Design
검증 명령은 `node --test scripts/tests/cli-ticket-commands.test.mjs`, `npx deuk-agent-rule lint:md`, 필요 시 `npx deuk-agent-rule ticket next --bootstrap --json --compact` 수동 실행이다. 기대 결과는 기존 `ticket next --path-only` 동작 보존, 새 bootstrap 출력의 단일 객체/한 줄 출력, no-ticket 자동화 분기 가능, AGENTS.md markdown lint 통과다.

잔여 리스크는 bootstrap JSON이 너무 많은 정보를 담으면 다시 토큰 낭비가 되는 점이다. 따라서 첫 구현에서는 티켓 본문 일부 발췌를 넣지 않고, 상세가 필요할 때만 에이전트가 파일을 읽도록 둔다. 또 `set_workflow_context`는 MCP 도구 호출이므로 CLI가 직접 대신할 수 없다. 대신 CLI 출력에 `workflowContext` 힌트를 포함해 에이전트가 한 번만 호출하도록 유도한다.
