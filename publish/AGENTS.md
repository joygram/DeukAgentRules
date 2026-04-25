<!-- deuk-agent-rule:begin -->
# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.

## Coding
- C#: No LINQ/boxing in update loops.
- C++: No raw pointers. Forward-declare in headers. Mutex all shared resources.
- WebApp: No hardcoded JSON. Use DeukPack generated codecs.

## Workflow
- For complex tasks, create a ticket: `npx deuk-agent-rule ticket create --topic <name>`
- On 2+ repeated errors, stop and file a ticket with analysis.
- Temp scripts go in `tmp/`.

## Ticket Navigation
- Run `npx deuk-agent-rule ticket use --latest --path-only`, then `view_file` the result.

## Docs
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Run `npm run lint:md` after editing markdown.
<!-- deuk-agent-rule:end -->