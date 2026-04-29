---
id: 080-agents-md-full-refactor-joy-nucb
title: "AGENTS.md 전면 리팩토링: 토큰 다이어트 + 구조 정리"
language: ko
createdAt: 2026-04-25 13:28:35
summary: "AGENTS.md 전면 리팩토링: 토큰 다이어트 + 구조 정리"
status: active
priority: P3
tags: docs, migrated
---


# 계획: AGENTS.md 전면 리팩토링

## 요약

- **목적**: AGENTS.md의 불필요한 중복, 설교, 영/한 이중 기재를 제거하여 시스템 프롬프트 토큰을 최소 60% 절감. 오구현된 Self-Thrift Protocol을 원래 의도(로컬 캐싱)에 맞게 복원.
- **범위**: `DeukAgentRules/AGENTS.md` (정본) + 워크스페이스 내 34개 AGENTS.md 사본에 배포
- **비범위**: DeukContext MCP 서버 코드 수정, 대시보드 변경은 별도 티켓

## 현재 격차

### 정량 측정

| 항목 | 현재 | 목표 |
|---|---|---|
| AGENTS.md 크기 | 8,573 chars / 120 lines / ~3,429 tokens | ~3,000 chars / ~50 lines / ~1,200 tokens |
| 영/한 중복 | Document Archiving Protocol 642 chars 중복 | 한국어 단일 |
| 경고/강조 수식어 | 52회 (MUST 10, 하드룰 9, 금지 5, MANDATORY 5, STRICT 5 ...) | 0회 |
| Document Archiving Protocol | 2개 섹션 중복 존재 (L24-37 + L97-112) | 1개로 통합 |
| Self-Thrift Protocol | MCP API 호출 강제 (매 턴 set_workflow_context 호출) | 삭제 또는 로컬 캐싱으로 복원 |
| 5단계 워크플로우 | 전 작업 강제 (Phase 0~5) | 복잡 작업만 권장 |

### 문제 구조

1. **이중 언어 중복**: 같은 규칙을 EN → KR 순서로 두 번 기재 (~256 tokens 낭비)
2. **섹션 중복**: `Document Archiving Protocol`이 L24와 L97에 두 번 등장 (~280 tokens 낭비)
3. **수식어 비대**: AI에게 `MUST`, `절대`, `심각한 위반` 같은 표현은 `Required` 한 단어와 동일 효과
4. **Self-Thrift 오구현**: 원래 로컬 캐싱 의도였으나 MCP 서버 호출 강제로 변질 (23회 × 81 tok = 1,853 tok 낭비)
5. **강제 5단계 워크플로우**: 모든 작업에 Phase 0 RAG 검색 강제 → 세션당 ~19,500 tok 고정비용

## 설계 결정

### D1: 언어 — 영어 단일
- AGENTS.md는 AI 에이전트가 읽는 문서이므로 토큰 효율이 높은 영어로 통일
- 영어는 한국어 대비 같은 의미를 ~40-50% 적은 토큰으로 표현 가능
- 한국어 블록 전면 삭제, 영어만 유지

### D2: Self-Thrift Protocol — 전면 삭제
- 원래 의도: 로컬 캐싱 기반 추적
- 현재 상태: MCP 서버 호출 강제로 오구현됨
- 결정: AGENTS.md에서 Self-Thrift 섹션 전체 삭제
- 로컬 캐싱 추적은 DeukContext 서버 단에서 자동으로 처리하도록 별도 티켓에서 구현

### D3: 워크플로우 — 강제 → 권장
- Phase 0 RAG 검색: 강제 삭제, 에이전트 자율 판단
- Phase 1 티켓 생성: 복잡 작업에만 권장
- Phase 2~5: 있으면 좋지만 강제하지 않음
- `ticket create` 명령어 안내만 유지

### D4: 수식어 — 기계적 명령문으로 전환
- `[MANDATORY]`, `[하드룰]`, `[STRICT]`, `심각한 위반` → 모두 삭제
- AI는 `Required:` 또는 `Do not:` 로 충분히 지시를 따름

### D5: Anti-Shoveling Rule — 압축
- 현재: 801 chars의 장문
- 목표: 3줄 이내로 압축 (`ticket use --latest --path-only` 실행 후 `view_file`)

## 구현 계획

### Phase 1: AGENTS.md 재작성

리팩토링 후 목표 구조:

```markdown
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
- Plans: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Reports: `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`
- Run `npm run lint:md` after editing markdown.
<!-- deuk-agent-rule:end -->
```

예상 크기: ~850 chars / ~25 lines / ~210 tokens (**현재 대비 94% 감소**)

### Phase 2: 워크스페이스 전체 배포

- [ ] `npx deuk-agent-rule init` 또는 수동 복사로 34개 사본 업데이트
- [ ] 각 프로젝트의 모듈별 커스텀 규칙(있다면)은 유지

### Phase 3: 검증

- [ ] `npm run lint:md -- AGENTS.md`
- [ ] 리팩토링 전/후 토큰 수 비교
- [ ] Cursor/Antigravity에서 새 AGENTS.md로 간단한 작업 수행하여 동작 확인

## 삭제 대상 상세

| 섹션 | 현재 크기 | 조치 |
|---|---|---|
| Self-Thrift Protocol (L14-22) | 770 chars / ~308 tok | 전면 삭제 |
| Document Archiving Protocol EN (L24-31) | 1,321 chars | 삭제 (KR만 유지 후 압축) |
| Document Archiving Protocol KR 중복 (L33-37) | 642 chars | L97-112 섹션과 통합 |
| Ticket-Driven Development 5단계 (L70-95) | 1,679 chars / ~671 tok | 3줄 권장으로 축소 |
| Anti-Shoveling Rule (L114-120) | 801 chars / ~320 tok | 3줄로 압축 |
| AI Model Compliance (L62-66) | 410 chars / ~164 tok | 삭제 (실질 효과 없음) |
| 경고/수식어 52개 | 분산 | 전부 제거 |

## 리스크

| 리스크 | 심각도 | 대응 |
|---|---|---|
| Flash 모델이 간결한 지시를 무시할 가능성 | 낮음 | 간결해도 명확하면 Flash도 따름. 테스트로 확인. |
| 기존 티켓 워크플로우에 의존하는 자동화 깨짐 | 중간 | `ticket create` CLI는 유지하므로 영향 없음 |
| 34개 사본 중 동기화 누락 | 낮음 | `deuk-agent-rule init`으로 일괄 배포 |

## 수용 기준

- [ ] AGENTS.md 크기 3,000 chars 이하
- [ ] AGENTS.md 추정 토큰 1,200 이하
- [ ] Self-Thrift Protocol 조항 0줄
- [ ] 영어/한국어 중복 0줄
- [ ] `npm run lint:md` 통과
- [ ] 워크스페이스 34개 사본 동기화 완료
