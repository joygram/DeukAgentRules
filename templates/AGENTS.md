# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.

## Coding
- C#: No LINQ/boxing in update loops.
- C++: No raw pointers. Forward-declare in headers. Mutex all shared resources.
- WebApp: No hardcoded JSON. Use DeukPack generated codecs.

## Docs
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Scratch: `.deuk-agent/docs/scratch/` (ephemeral, auto-cleaned)
- Knowledge Capture: Core design/security decisions from tickets must be formalized in `docs/internal/`.
- Agents producing artifacts outside `.deuk-agent/docs/` must copy them there for RAG indexing.
- Run `npx deuk-agent-rule lint:md` after editing markdown.
