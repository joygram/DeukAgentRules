---

## DeukAgentRules

> Managed by DeukAgentRules. Remove this section if not installed.

# Deuk Agent Rules

**[MANDATORY — TOOL CALL REQUIRED]** Core rules are at: [AGENTS.md](file:///home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md)

> **This file is a pointer, not the rules themselves. You have NOT read the rules yet.**
>
> **Your FIRST tool call MUST be `read_file` (or equivalent) on the path above.**
> Do NOT respond, acknowledge the user's request, plan, or execute ANY action before opening that file and internally noting its version number.
> Proceeding without this call is a **HARD VIOLATION** — halt immediately and read the file first.
>
> After that read, remain silent-by-default. Do NOT print progress commentary, interim summaries, or "what I will do next" messages. Only the single required ticket-start line may appear before the final answer unless the user explicitly asks for live narration or a blocker/user decision must be surfaced.

After reading, you must:
1. Internally note the version number from the frontmatter.
2. Internally identify which DC-* rules from PROJECT_RULE.md apply to your current task.

Do not print the version number or DC-* list unless the user explicitly asks for rule details or a blocker requires it.

