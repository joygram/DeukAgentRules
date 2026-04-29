---
version: 7
changelog: "v7: DC-REFACTOR, Dependency Integrity Guard, Scope Creep 정량 기준 추가 및 토큰 최적화"
---

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
**Scope Creep Handling**: 수정 범위가 기존 티켓 스코프를 초과하면 **즉시 중단**, 새 티켓 생성 후 workflow context 전환. 판단 기준(하나라도 해당 시 중단): ① Target Module 외부 파일 3개+ 수정 ② 미등록 작업이 전체의 50%+ ③ 수정 대상이 2개+ 서로 다른 모듈에 걸침.
**Halt-and-Replan (HARD RULE)**: 인프라 에러 시 **우회 경로(설정 변경, 백엔드 교체, 기능 비활성화) 절대 금지.** 즉시 중단 → 근본 원인 분석 → 사용자에게 선택지 보고 → 승인 후 재계획. `PROJECT_RULE.md`의 DC-HALT/DC-INFRA 준수.
**Refactor Safety Guard (HARD RULE)**: 리팩터링·정리·모듈화 시 반드시 준수:
  1. **삭제 전 용도 증명**: `git blame`·`grep`·테스트로 미사용 증명. "불필요해 보인다"로 삭제 금지.
  2. **인프라 보호 구역**: 서버 부트스트랩, 트랜스포트, DB 커넥션, 라우팅 코드는 리팩터 범위 제외. 변경 필요 시 별도 티켓 + 사용자 승인.
  3. **기능 동등성 검증**: 리팩터 후 기존 기능 동일 작동을 테스트로 검증. 테스트 없는 기능은 리팩터 대상 제외.
  4. **diff 자기 검증**: 순수 삭제 10줄+ 시 각 블록 용도를 명시 기록.
  5. **의존성 전수 조사**: 상수·공유 상태·인터페이스 수정/삭제 시, `grep`으로 참조처를 전수 조사하여 동일 티켓 내에서 모두 수정. "일부만 수정 후 방치"는 중대 프로토콜 위반.


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
