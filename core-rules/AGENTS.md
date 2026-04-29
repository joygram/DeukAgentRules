# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.
- **[MANDATORY]** All artifacts MUST be written in the same language as the user's current prompt.

## Boot Sequence (HARD RULE)

Execute sequentially — each step must complete before the next. Do NOT batch steps in parallel.

1. Read this file (`AGENTS.md`).
2. Read `PROJECT_RULE.md` in the workspace root. It contains project-specific architecture boundaries. Do NOT rely on general assumptions if it exists.
3. Identify active ticket from user's request. If none and the request requires code changes, create one.
4. Call `set_workflow_context(project, ticket_id, phase)` via MCP. If MCP unavailable, proceed.
5. Begin research.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral)
- All artifacts MUST exist under `.deuk-agent/docs/` for RAG indexing. Platform-native paths (`brain/`, `.cursor/plans/`) are NOT indexed — always copy.
- Run `npx deuk-agent-rule lint:md` after editing markdown.

## Ticket-Driven Workflow (MANDATORY)

All work follows this lifecycle. Skipping any phase is a rule violation.

**Mode adaptation:** If you lack Execute/Write capability, you are in **Plan Mode** (Phases 0–1 only). Defer CLI commands and file writes as text in your plan output. When transitioning to Execute Mode, run deferred commands first and enter Phase 2 directly — do not re-plan.

| Phase | Action |
|-------|--------|
| 0: Research | Search rules/past tickets via `mcp_deukcontext_search_*` or local search. Skip if context sufficient. |
| 1: Plan | Read architecture rules. Fill APC. Run `ticket create` (or defer if Plan Mode). **STOP — wait for user approval.** |
| 2: Execute | Implement per approved plan. Update ticket checkboxes in real-time. |
| 3: Verify | Run build/tests. Record issues in Potential Issue Table. |
| 4: Close | File follow-up tickets for unresolved issues. Archive ticket. |

**Error Handling**: On 2+ repeated errors, stop, rollback, file an analysis ticket.
**Scope Creep Handling**: 수정 범위가 기존 티켓 스코프를 초과하는 경우, 임의로 작업을 진행하지 말고 반드시 새 티켓을 생성하여 workflow context를 전환해야 합니다.
판단 기준:
  1. 티켓의 Target Module 외부 파일을 3개 이상 수정하려는 경우
  2. 원래 티켓의 Tasks 체크리스트에 없는 작업이 전체 작업량의 50% 이상인 경우
  3. 수정 대상 파일이 2개 이상의 서로 다른 모듈(src/, tests/ 제외)에 걸치는 경우
위 조건 중 하나라도 해당되면 **즉시 중단**하고 새 티켓을 생성해야 합니다.
**Halt-and-Replan (HARD RULE)**: 실행 중 예상치 못한 인프라 에러(DB 스키마 불일치, 서비스 실패, 의존성 누락 등)를 만나면 **우회 경로(설정 변경, 백엔드 교체, 기능 비활성화)를 절대 선택하지 말 것.** 즉시 실행을 중단하고, 근본 원인을 분석한 뒤 사용자에게 선택지를 보고하고 승인을 받은 후에만 재계획을 수립하여 재개합니다. 각 프로젝트의 `PROJECT_RULE.md`에 DC-HALT/DC-INFRA 규칙이 있으면 반드시 준수합니다.
**Refactor Safety Guard (HARD RULE)**: 리팩터링·정리·모듈화·"clean tech debt" 작업 시 다음을 반드시 준수:
  1. **삭제 전 용도 증명**: 코드를 제거하거나 "단순화"하기 전에, 해당 코드가 현재 사용되지 않음을 git blame·grep·테스트로 증명해야 한다. 증명 없이 "불필요해 보인다"는 이유로 삭제 금지.
  2. **인프라 보호 구역**: 서버 부트스트랩(entrypoint), 트랜스포트 설정, DB 커넥션, 인증/라우팅 코드는 리팩터링 범위에서 제외한다. 변경이 필요하면 별도 티켓을 생성하고 사용자 승인을 받아야 한다.
  3. **기능 동등성 검증**: 리팩터링 후 모든 기존 기능이 동일하게 작동함을 테스트로 검증해야 한다. 테스트가 없는 기능은 리팩터링 대상에서 제외한다.
  4. **diff 자기 검증**: 커밋 전 `git diff`에서 순수 삭제(- only) 라인이 10줄 이상이면, 삭제된 각 블록의 용도를 명시적으로 기록해야 한다.
**Dependency Integrity Guard (HARD RULE)**: 코드의 한 부분(상수, 공유 상태, 인터페이스, 변수)을 수정하거나 삭제할 때, 해당 요소를 참조하는 모든 의존성 파일 및 프로젝트 전체를 `grep`으로 전수 조사하여 사이드 이펙트가 없음을 확인하고 필요한 모든 곳을 함께 수정해야 합니다. "일부만 수정하고 나머지는 방치"하여 발생하는 런타임 에러는 중대한 프로토콜 위반입니다.



### Ticket Navigation (fast path)
1. `npx deuk-agent-rule ticket use --latest --path-only`
2. `view_file` the returned path. **Done.** No MCP search, no `ls`/`grep`.

### Telemetry
- After each phase: `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Periodic: `npx deuk-agent-rule telemetry sync`
- Skip if Execute capability unavailable.

## Workflow Gate (HARD RULE)

Before calling ANY tool, self-check:
1. "What is my active ticket?" → If unknown and code changes needed: **stop, create ticket.**
2. "Did I call `set_workflow_context`?" → If not and MCP available: call now.
3. "Is this artifact under `.deuk-agent/docs/`?" → If not: fix path.

## Platform Co-existence

Platform-native features (planning, artifacts, KI) co-exist with TDW. Neither overrides the other.

| Rule | Action |
|------|--------|
| Planning | Use platform's native plan features. Also save to `.deuk-agent/docs/plans/`. |
| Artifacts | Platform paths are NOT RAG-indexed. Copy to `.deuk-agent/docs/`. |
| Workflow State | Always call `set_workflow_context` regardless of platform state management. |
| Conversations | Use both platform references (@mention) and ticket chaining (`prevTicket`/`nextTicket`). |

**Prohibited:** Disabling platform features to "comply" with DeukAgent rules. Skipping platform features by citing DeukAgent rules. Saving artifacts ONLY to platform paths.

## CLI Reference

| Action | Command |
|--------|---------|
| Create | `npx deuk-agent-rule ticket create --topic <name> --non-interactive` |
| Activate | `npx deuk-agent-rule ticket use --topic <id> --non-interactive` |
| Close | `npx deuk-agent-rule ticket close --topic <id> --non-interactive` |
| Cancel | `npx deuk-agent-rule ticket close --topic <id> --status cancelled --non-interactive` |
| Phase advance | `npx deuk-agent-rule ticket move --topic <id> --next --non-interactive` |
| Archive | `npx deuk-agent-rule ticket archive --topic <id> --non-interactive` |
| List | `npx deuk-agent-rule ticket list --non-interactive --json` |

**[HARD RULE]** Never manually edit `INDEX.json` or ticket files via `sed`/`awk`/`echo`.
