---
id: 065-doc-lint-after-document-write-ru-joy-nucb
title: "doc-lint-after-document-write-rule"
language: en
createdAt: 2026-04-24 01:45:16
---

# Plan: doc-lint-after-document-write-rule

## Summary
- 목적: 문서 작성 후 마크다운 lint를 자동으로 수행하도록 에이전트 규칙과 로컬 검증기를 추가합니다.
- 범위: `AGENTS.md`, `gemini.md`, `publish/AGENTS.md`, `publish/gemini.md`, `bundle/AGENTS.md`, `bundle/gemini.md`, `README.md`, `README.ko.md`, `package.json`, `scripts/lint-md.mjs`
- 비범위: 외부 마크다운 린터 대규모 도입, 문서 구조 재작성, OSS mirror 기능 변경

## Current Gaps
- `gemini.md`에는 lint-before-save 규칙이 있으나, `AGENTS.md`와 publish/bundle 복사본은 동일 정책을 완전히 공유하지 않습니다.
- 문서 작성 직후 실제로 실행할 `lint:md` 명령이 없습니다.
- README는 문서 워크플로우를 설명하지만, lint 정책은 별도로 드러나지 않습니다.

## Design Decisions
- 정책은 agent-facing rule files에 명시합니다.
- lint는 외부 의존성 없이 로컬 스크립트로 구현합니다.
- 루트, publish, bundle의 문구를 동기화해 rule drift를 막습니다.

## Implementation Plan
1. `scripts/lint-md.mjs`를 추가해 markdown 파일의 기본 구조와 링크 정합성을 검사합니다.
2. `package.json`에 `lint:md` 스크립트를 추가합니다.
3. `AGENTS.md`, `gemini.md`, publish/bundle 복사본에 lint-after-save 규칙을 추가합니다.
4. `README.md`, `README.ko.md`에 문서 린트 정책을 간단히 노출합니다.
5. 검증 명령으로 수정된 문서와 validator를 함께 점검합니다.

## Verification Plan
- `npm run lint:md`가 수정된 문서를 정상 검사하는지 확인합니다.
- rule files 간 정책 문구가 동일한지 확인합니다.
- validator가 기존 Markdown 구조를 과도하게 거부하지 않는지 확인합니다.

## Risks
- 너무 엄격한 검사를 넣으면 기존 문서가 대량으로 실패할 수 있습니다.
- 루트/공개/번들 문구가 따로 놀면 규칙 drift가 생길 수 있습니다.
- 마크다운 링크 검증이 상대 경로 기준을 잘못 잡을 수 있습니다.

## Acceptance Criteria
- 문서 작성 후 lint를 실행하라는 규칙이 agent-facing 문서에 추가됩니다.
- `npm run lint:md`가 실제로 존재하고 작동합니다.
- publish/bundle 복사본도 같은 정책을 반영합니다.
- README에서 문서 품질 정책을 확인할 수 있습니다.
