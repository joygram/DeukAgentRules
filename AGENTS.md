<!-- deuk-agent-rule:begin -->

# Project Agent Rules

## Identity

- **핸드오프 저장 후 채팅**: 파일로 남긴 뒤 채팅에 **`Path: \`루트기준/전체/경로.md\``** 형태로 **한 줄**을 반드시 넣어 다음 세션이 동일 파일을 연다.
- **핸드오프 파일 머리줄(선택)**: 파일 첫 줄에 `**Handoff (repo-relative):** \`경로\`` 또는 동일 경로의 HTML 주석을 두어 검색·스캔에 쓸 수 있다.
- **플랜 UI(선택)**: 플랜 전용 패널에 같은 문서를 띄우려면, 관리 중인 **multi-ai-workflow** 규칙에 적힌 **선택적 미러 경로**(예: `.cursor/plans/*.plan.md`)에 동일 본문을 둘 수 있다. 정본은 `.deuk-agent-handoff/` 또는 `DeukAgentRules/handoff/`를 유지하고 두 곳 내용을 맞출 것.

English sections above are canonical for tooling; this block is a short Korean mirror for the same rules.

## Handoff format & Submodule Isolation

When handing work between tools or people—especially in an environment with multiple submodules like DeukUI, DeukPack, etc.—you **MUST NOT** use free-form markdown. 

You **MUST** use the official Handoff Skeleton Template located at:
`.deuk-agent-templates/HANDOFF_TEMPLATE.md`

By copying this template to `.deuk-agent-handoff/TICKET-XXX.md` (or `LATEST.md`), you ensure that:
1. The **Target Submodule** is explicitly locked.
2. The agent is forced to read specific **Module Rules** (e.g., `.deuk-agent-templates/MODULE_RULE_TEMPLATE.md`).
3. Execution happens in explicit **Phases** to prevent context bleed.

## Handoff persistence (internal implementation docs)

**Default local directory:** `npx deuk-agent-rule init` creates **`.deuk-agent-handoff/`** at the repo root and appends it to **`.gitignore`** so persisted handoffs are **not committed by default**. Remove or adjust that ignore rule if your team versions handoffs in git.

When a handoff should **outlive the chat** — for example the user asks to save it, it is the authoritative spec for a follow-up session or another implementer, or the team keeps structured handoffs in-repo — **write it as a Markdown file** under **internal implementation documentation** (implementation notes, not end-user or marketing docs). Prefer **`.deuk-agent-handoff/`** when no project convention exists; if this package lives in **`DeukAgentRules/`** at the consumer repo root, prefer **`DeukAgentRules/handoff/LATEST.md`** (see the next section). Otherwise use an existing convention such as `<product-or-feature>/internal/*.md` or `docs/internal/*.md`. If the user names a path, use it. Reuse the same section structure as **Handoff format** above. If only an inline paste is needed, skip creating a file unless the user asks to save.

**Plan-style UI (optional):** Some editors surface **plan documents** separately from normal Markdown. You may **mirror** the same handoff body into the optional path described in the managed **multi-ai-workflow** rule (e.g. `.cursor/plans/deuk-handoff.plan.md`) while keeping the **canonical** file under **`.deuk-agent-handoff/`** or **`DeukAgentRules/handoff/`**. If both exist, **keep them in sync**.

**After saving (chat):** Include **one dedicated line** with the full repo-root-relative path, e.g. `Path: \`.deuk-agent-handoff/LATEST.md\`` — not only a bare filename inside prose.

**Optional first line in the file:** e.g. `**Handoff (repo-relative):** \`path/from/root.md\`` or the same in an HTML comment on line 1.

**Language:** Write the **body** of persisted handoffs in the **user’s language** — the language they use in the conversation (or their stated preference) — unless they ask for a specific language (for example English-only for an external partner).

**Before substantive work:** Before implementation, fixes, or other non-trivial repo changes, **check persisted handoffs** in the locations above (including **`.deuk-agent-handoff/`** and any project-specific internal paths). **If the file `DeukAgentRules/handoff/LATEST.md` exists** (path relative to the **consumer** repository root — i.e. this rules package lives in a top-level folder named `DeukAgentRules`), **read it** before editing code, in addition to other handoff locations. Read documents that match the current task; a **pasted handoff** in the chat takes precedence unless the user says to follow files instead. Skip this scan only when no locations exist, nothing matches, or the user explicitly says to ignore stored handoffs.

## Handoff directory when this package is cloned as `DeukAgentRules/` (consumer repos)

In monorepos that vendor or submodule this package under a top-level directory **`DeukAgentRules`**, teams may use a **gitignored** handoff directory:

- **Directory (repo-relative):** `DeukAgentRules/handoff/`
- **Default file for the next agent:** `DeukAgentRules/handoff/LATEST.md`

Add **`DeukAgentRules/handoff/`** to the **consumer** repository’s `.gitignore` unless you intentionally version handoffs.

**Agent guidance (canonical path strings):** Rules and `AGENTS.md` in the consumer repo should tell agents to open **`DeukAgentRules/handoff/LATEST.md`** when it exists — not only a pasted chat block — so other tools and sessions can resume from the same clone.

**Producing handoffs:** When saving a durable handoff for another agent, write the **Handoff format** body to **`DeukAgentRules/handoff/LATEST.md`** (or a dated file in that folder) and, in chat, include **one line** with the full path, e.g. `Path: \`DeukAgentRules/handoff/LATEST.md\`` using **repo-relative paths** (no `file://` URLs).

**Handoff links (full path):** Whenever you **link** or **cite** a persisted handoff file — in **Handoff format** sections, chat, or Markdown — use the **full path from the repository root** (for example `DeukAgentRules/handoff/LATEST.md`, `project_i/_ref_data/deuk_define/reports/REF_DATA_DEUK_TRANSITION.md`). Do **not** use a **bare filename** (`LATEST.md` alone) or an ambiguous partial path. In monorepos, include every prefix segment so the path is unique in the workspace. Markdown: put the full path in the link target, e.g. `[handoff](DeukAgentRules/handoff/LATEST.md)` (repo-relative).

<!-- deuk-agent-rule:end -->
