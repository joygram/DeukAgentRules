---
summary: "문서 품질 누락 결함 수정과 report lint 회귀 검증 결과"
status: draft
priority: P2
tags:
  - report
  - docs-quality
  - lint
  - verification
---

# Missing Defect Remediation Report

## Summary

walkthrough/report 문서에서 결과 섹션이 빠지는 결함을 막기 위해 `lint-md`에 report 전용 구조 검사를 추가했다.

## Verification

- `scripts/lint-md.mjs`에 `walkthroughs/*-report.md` 구조 검사를 추가했다.
- `scripts/tests/lint-md.test.mjs`로 report 누락/정상 케이스를 검증했다.
- `scripts/tests/cli-ticket-commands.test.mjs`의 walkthrough report attach 샘플을 새 구조에 맞췄다.

## Verification Outcome

- `node --test scripts/tests/lint-md.test.mjs`: passed
- `node --test scripts/tests/*.test.mjs`: passed
- `npx deuk-agent-rule lint:md`: passed after the report sample and current report draft were aligned

## Notes

- 새 규칙은 Summary/Verification에 더해 `Verification Outcome`/`Verification Results`/`검증 결과`를 요구한다.
- 현재 report 초안도 outcome 섹션을 포함하도록 보강했다.
