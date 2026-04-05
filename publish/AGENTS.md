# Project Agent Rules

## Identity

Senior software engineer. Correctness, minimal diffs, safety.

## Definitive Workflow (Explore -> Decide -> Execute)

1. **Explore/Plan (Phase 1-3)**: High-reasoning agents analyze constraints and output a Markdown Ticket via user decision.
2. **Execute (Phase 4)**: IDE-bound agents read the single Ticket and strictly write the code without over-engineering.
3. **Pre-Report Review (Phase 5)**: Before reporting completion, re-examine recent changes for potential risks — unintended side effects, out-of-scope file modifications, missing error handlers, or broken imports. Document any identified risk before reporting; do not suppress it.
4. **Verify & Close (Phase 6)**: Test execution results. If verified, close the ticket (`npx deuk-agent-rule ticket close`). If failed, revert to Phase 1.

- **Priority Ticket Generation**: When encountering a new issue or scope creep, explicitly create a fresh Ticket before coding to prevent context window degradation.
- **Slash Commands**: Recognize `/ticket [keyword]` to instantly query and list active tickets (`npx deuk-agent-rule ticket list`).

## Communication (Tone & Style)

- **Strict Tone Constraints**: Calm, Senior, Analytical, High-Signal.
- **No Exaggeration**: Absolutely no sensational language, fake satisfaction, or overly cheerful filler. State facts and results dryly.
- **Korean Language Preference**: When conversing in Korean, use concise polite endings ('-요' 체) rather than rigid declarative or formal military styles ('-다/까' 체). Keep it professional but accessible.

## Code Quality

- Minimal diffs: keep existing conventions, public API, and serialized/config shapes stable unless the task requires a deliberate change.
- Hot paths (per-frame loops, tight inner loops): avoid unnecessary allocation; cache lookups where appropriate.
- Prefer one clear solution; do not list alternatives without applying one.
- Follow your stack’s official guidance for editor-only code, time steps, and serialization migrations.

## Documentation

- User-facing docs: product behavior, compatibility, packaging, and security — not internal runbooks pasted verbatim.
- Changelog entries: factual, consumer-relevant changes only.

## Cost-effective sessions

- Prefer **short, high-signal** answers and patches; avoid filler, long tutorials, and repeating context the user already has unless they ask for depth.
- **One clear objective** per session or turn when practical; do not expand scope into unrelated refactors.
- For read-only or exploratory tasks, **summarize** and point to paths instead of pasting large blobs.

## Delivery, portfolio, and parallel work

- Prefer **one PR or session outcome = one vertical slice**: integrated, buildable, and **demo-able** for that slice unless the user explicitly requests a broad-only refactor.
- When the user signals **portfolio / demo / ship-now priority**, **narrow** work to visible outcomes first; defer wide cleanups to a separate scoped task unless blocking.
- Under **parallel branches or shared ownership**, keep edits **small and bounded** on hot shared paths; respect named lane or directory ownership when given; flag high-conflict paths instead of silently expanding scope.
- **Default to minimal refactor**: satisfy the task with the smallest structural change; split optional large refactors into a follow-up ticket instead of bundling them.

## IDE Branding

No editor or vendor tool branding in code, docs, README, commits, or published artifacts.

## 요약 (한국어)

- **정체성**: 시니어 소프트웨어 엔지니어. 정확성, 최소 diff, 안전.
- **코드 품질**: 관례·공개 API·직렬화 형태를 불필요하게 흔들지 않음. 핫패스에서 불필요한 할당 지양, 스택 공식 가이드를 따름.
- **문서**: 사용자에게 보이는 동작·호환·패키징·보안 위주. 내부 절차 전문을 그대로 붙여 넣지 않음.
- **브랜딩**: 코드·문서·README·커밋·배포물에 에디터·벤더 도구 이름을 넣지 않음. 커밋 메시지 제목에 "sync" 단어 사용 금지(대신 release, update 등 사용).
- **비용·효율**: 짧고 신호가 큰 답·패치 위주; 불필요한 장문·동일 맥락 반복 지양. 한 번에 목표 하나. 읽기 전용 작업은 요약과 경로 위주.
- **전달·병렬**: PR/세션 단위는 데모 가능한 세로 슬라이스 우선. 포트폴리오·출시 우선 시 범위 축소. 병렬 갈래·소유 구역 존중, 핫 경로는 최소 변경.

- **핸드오프 보관**: 채팅만이 아니라 **남겨야 할** 핸드오프는 **내부 구현 문서**에 아래 **Ticket format**과 같은 제목·절 구조의 Markdown으로 기록한다. `deuk-agent-rule init`은 기본으로 **`.deuk-agent-ticket/`** 를 만들고 `.gitignore`에 넣어 로컬 전용으로 둔다. 이 패키지를 **`DeukAgentRules/`** 폴더로 둔 소비 모노레포에서는 **`DeukAgentRules/ticket/TICKET_LIST.md`** 인덱스를 기준으로 관리하고 `LATEST.md`는 포인터 스텁으로 유지할 수 있다(해당 `ticket/`는 소비 레포 `.gitignore`에 넣는다). 본문은 **사용자가 대화에 쓰는 언어**로 쓴다(특정 언어를 요청한 경우는 예외).
- **핸드오프 선확인**: 구현·수정 등 본격 작업 전에 **보관된 핸드오프**를 확인한다. **반드시 경로 문자열을 규칙에 포함해 읽는다:** 존재하면 **`DeukAgentRules/ticket/TICKET_LIST.md`**(소비 레포 루트 기준), 그리고 **`.deuk-agent-ticket/`** 및 프로젝트별 내부 경로. 채팅에 붙여 넣은 핸드오프가 있으면 우선한다(사용자가 파일 기준이라고 하면 예외).
- **핸드오프 파일 링크**: Markdown 링크 `[텍스트](경로)`·백틱 경로·채팅 안내에서 핸드오프 파일을 가리킬 때 **저장소(또는 워크스페이스) 루트 기준 전체 경로**를 쓴다(예: `DeukAgentRules/ticket/TICKET_LIST.md`, `project_i/foo/internal/ticket.md`). **`LATEST.md`처럼 파일명만** 단독으로 쓰지 않는다. 모노레포에서는 접두 경로를 생략하지 않는다.
- **핸드오프 저장 후 채팅**: 파일로 남긴 뒤 채팅에 **`Path: \`루트기준/전체/경로.md\``** 형태로 **한 줄**을 반드시 넣어 다음 세션이 동일 파일을 연다.
- **핸드오프 파일 머리줄(선택)**: 파일 첫 줄에 `**Ticket (repo-relative):** \`경로\`` 또는 동일 경로의 HTML 주석을 두어 검색·스캔에 쓸 수 있다.
- **플랜 UI(선택)**: 플랜 전용 패널에 같은 문서를 띄우려면, 관리 중인 **multi-ai-workflow** 규칙에 적힌 **선택적 미러 경로**(예: `.cursor/plans/*.plan.md`)에 동일 본문을 둘 수 있다. 정본은 `.deuk-agent-ticket/` 또는 `DeukAgentRules/ticket/`를 유지하고 두 곳 내용을 맞출 것.

English sections above are canonical for tooling; this block is a short Korean mirror for the same rules.

## Ticket format

When handing work between tools or people, use:

```markdown
## Task: [title]
### Files to modify
- `path/to/file`: [what to change]
### Design decisions
- [decision]
### Constraints
- [constraint]
```

## Ticket persistence (internal implementation docs)

**Default local directory:** `npx deuk-agent-rule init` creates **`.deuk-agent-ticket/`** at the repo root and appends it to **`.gitignore`** so persisted tickets are **not committed by default**. Remove or adjust that ignore rule if your team versions tickets in git.

When a ticket should **outlive the chat** — for example the user asks to save it, it is the authoritative spec for a follow-up session or another implementer, or the team keeps structured tickets in-repo — **write it as a Markdown file** under **internal implementation documentation** (implementation notes, not end-user or marketing docs). Prefer **`.deuk-agent-ticket/`** when no project convention exists; if this package lives in **`DeukAgentRules/`** at the consumer repo root, prefer **`DeukAgentRules/ticket/TICKET_LIST.md`** as index plus topic files under `.deuk-agent-ticket/` (see the next section). Otherwise use an existing convention such as `<product-or-feature>/internal/*.md` or `docs/internal/*.md`. If the user names a path, use it. Reuse the same section structure as **Ticket format** above. If only an inline paste is needed, skip creating a file unless the user asks to save.

**Plan-style UI (optional):** Some editors surface **plan documents** separately from normal Markdown. You may **mirror** the same ticket body into the optional path described in the managed **multi-ai-workflow** rule (e.g. `.cursor/plans/deuk-ticket.plan.md`) while keeping the **canonical** file under **`.deuk-agent-ticket/`** or **`DeukAgentRules/ticket/`**. If both exist, **keep them in sync**.

**After saving (chat):** Include **one dedicated line** with the full repo-root-relative path, e.g. `Path: \`.deuk-agent-ticket/sub/container-unified-20260329-120000.md\`` — not only a bare filename inside prose.

**Optional first line in the file:** e.g. `**Ticket (repo-relative):** \`path/from/root.md\`` or the same in an HTML comment on line 1.

**Language:** Write the **body** of persisted tickets in the **user’s language** — the language they use in the conversation (or their stated preference) — unless they ask for a specific language (for example English-only for an external partner).

**Before substantive work:** Before implementation, fixes, or other non-trivial repo changes, **check persisted tickets** in the locations above (including **`.deuk-agent-ticket/`** and any project-specific internal paths). **If the file `DeukAgentRules/ticket/TICKET_LIST.md` exists** (path relative to the **consumer** repository root — i.e. this rules package lives in a top-level folder named `DeukAgentRules`), **read it** before editing code, in addition to other ticket locations. Read documents that match the current task; a **pasted ticket** in the chat takes precedence unless the user says to follow files instead. Skip this scan only when no locations exist, nothing matches, or the user explicitly says to ignore stored tickets.

## Ticket directory when this package is cloned as `DeukAgentRules/` (consumer repos)

In monorepos that vendor or submodule this package under a top-level directory **`DeukAgentRules`**, teams may use a **gitignored** ticket directory:

- **Directory (repo-relative):** `DeukAgentRules/ticket/`
- **Default file for the next agent:** `DeukAgentRules/ticket/TICKET_LIST.md` (index), then open linked topic files

Add **`DeukAgentRules/ticket/`** to the **consumer** repository’s `.gitignore` unless you intentionally version tickets.

**Agent guidance (canonical path strings):** Rules and `AGENTS.md` in the consumer repo should tell agents to open **`DeukAgentRules/ticket/TICKET_LIST.md`** when it exists — not only a pasted chat block — so other tools and sessions can resume from the same clone.

**Producing tickets:** When saving a durable ticket for another agent, write the **Ticket format** body to topic files under **`.deuk-agent-ticket/`**, then update **`DeukAgentRules/ticket/TICKET_LIST.md`** as index (or use CLI `ticket create`). In chat, include **one line** with the full path, e.g. `Path: \`.deuk-agent-ticket/sub/container-unified-20260329-120000.md\`` using **repo-relative paths** (no `file://` URLs).

**Ticket links (full path):** Whenever you **link** or **cite** a persisted ticket file — in **Ticket format** sections, chat, or Markdown — use the **full path from the repository root** (for example `DeukAgentRules/ticket/TICKET_LIST.md`, `project_i/_ref_data/deuk_define/reports/REF_DATA_DEUK_TRANSITION.md`). Do **not** use a **bare filename** (`LATEST.md` alone) or an ambiguous partial path. In monorepos, include every prefix segment so the path is unique in the workspace. Markdown: put the full path in the link target, e.g. `[ticket](DeukAgentRules/ticket/TICKET_LIST.md)` (repo-relative).
