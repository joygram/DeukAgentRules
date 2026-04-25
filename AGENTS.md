<!-- deuk-agent-rule:begin -->
# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.

## Coding
- C#: No LINQ/boxing in update loops.
- C++: No raw pointers. Forward-declare in headers. Mutex all shared resources.
- WebApp: No hardcoded JSON. Use DeukPack generated codecs.

## Strict Workflow (MANDATORY)
1. **[HARD RULE] No Ticket, No Code**: You MUST NOT modify any source code or architecture without first creating a ticket (`npx deuk-agent-rule ticket create --topic <name>`).
2. **Read Rules**: Use `view_file` on `DOMAIN_RULES.md` and copy applicable rules into the ticket's Strict Rules Check.
3. **STOP AND WAIT**: Present the filled ticket and wait for explicit user approval. Do NOT proceed to execution without the user's explicit consent.
4. **Error Handling**: On 2+ repeated errors, stop, rollback, and file a ticket with analysis.

## Ticket Navigation (Anti-Shoveling)
- To find the next ticket, strictly run `npx deuk-agent-rule ticket use --latest --path-only`, then `view_file` the resulting path. Do not use `ls` or `grep` to hunt for tickets.

## Telemetry (MANDATORY)
- After completing each ticket phase, you MUST report cumulative tokens used:
  `npx deuk-agent-rule telemetry log --tokens <N> --model <M> --ticket <ID>`
- Use `npx deuk-agent-rule telemetry sync` periodically to upload local logs to the dashboard.

## Docs
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Run `npm run lint:md` after editing markdown.
<!-- deuk-agent-rule:end -->