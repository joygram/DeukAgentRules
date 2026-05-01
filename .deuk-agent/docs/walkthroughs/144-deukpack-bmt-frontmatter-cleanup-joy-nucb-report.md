---
summary: DeukPack BMT 하위 티켓 frontmatter cleanup 검증 결과
status: completed
priority: high
tags:
  - deukpack
  - bmt
  - ticket-cleanup
  - verification
---

# Report: DeukPack BMT 하위 티켓 frontmatter cleanup

## 검증 대상
- `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`
- `.deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md`
- `.deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md`
- `.deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`
- `.deuk-agent/tickets/sub/144-deukpack-bmt-frontmatter-cleanup-joy-nucb.md`
- `.deuk-agent/docs/plans/144-deukpack-bmt-frontmatter-cleanup-joy-nucb-plan.md`

## 수행 결과
- 대상 4개 하위 티켓의 중복 `parentTicket` key를 제거했다.
- 대상 4개 하위 티켓에 필수 frontmatter `priority`, `tags`를 보강했다.
- 하위 티켓 본문 업무 정의와 언어별 BMT 계획은 변경하지 않았다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/144-deukpack-bmt-frontmatter-cleanup-joy-nucb.md .deuk-agent/docs/plans/144-deukpack-bmt-frontmatter-cleanup-joy-nucb-plan.md .deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md .deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md .deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md .deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`

## 검증 결과
- `lint:md passed (6 files)`

## 결론
- BMT 하위 티켓의 frontmatter parse 경고는 정리됐다.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`다.
