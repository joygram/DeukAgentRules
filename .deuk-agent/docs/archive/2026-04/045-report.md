---
summary: 045-report
status: active
priority: P3
tags: docs, migrated
---


# [Verification] Completion Report: Frontmatter-Driven Rule Assembly

## 📦 Changes Summary
- **CLI Rule Compiler (`cli-rule-compiler.mjs`)**: 새롭게 추가된 모듈로 `rules.d/` 디렉토리와 로컬 도메인 폴더의 Markdown 파일을 스캔하여 Frontmatter의 조건(`condition`)을 평가하고 규칙을 동적 조립합니다.
- **DeukPack 룰 격리**: `DeukPack`의 고유 룰(Codec & IDL)을 코어 번들에서 완전히 제거하고, `DeukPack` 저장소 내의 `.deuk-agent/domain-rules/deukpack-strict.md`로 이동시켰습니다.
- **DeukRag 옵션화**: RAG-First Hard Lock 규약을 `rules.d/deukrag-mcp.md`로 분리하고 Frontmatter를 통해 모듈화했습니다.
- **코어 번들 경량화**: `AGENTS.md`와 `gemini.md`를 순수 워크플로우(TDD, 에러 방지, 리포트 포맷) 규약만을 담당하도록 정리했습니다.

**Artifacts Created**:
- `scripts/cli-rule-compiler.mjs`
- `bundle/rules.d/core-workflow.md`
- `bundle/rules.d/deukrag-mcp.md`

## ✅ Verification Results
- [x] **Local Rule Assembly (DeukPack)**: `init` 실행 시 `AGENTS.md`에 `DeukPack Codec` 룰과 `DeukRag` 룰이 모두 정상적으로 주입됨을 확인했습니다.
- [x] **Global Rule Assembly (project_i)**: `init` 실행 시 `DeukPack` 룰은 제외되고, 코어 룰과 `DeukRag` 룰만 주입됨을 확인했습니다.
- [x] **Template Rendering Fix**: 앞선 티켓 템플릿의 더미 현상(EJS 문법 누락)이 수정되어, `ticket create` 시 제목과 서브모듈 파라미터가 티켓에 정상 주입됨을 검증했습니다.

## ⚠️ Potential Issues & Technical Debt
| Issue | Severity | Description | Action Plan |
|---|---|---|---|
| 조건(Condition) 평가의 고도화 필요 | Low | 현재 `mcp: deukrag` 조건은 단순 문자열 매칭과 워크스페이스 구조 휴리스틱으로 평가됩니다. | 향후 `.local/config.yaml` 등 실제 MCP 설정 파일을 파싱하도록 파서를 확장해야 합니다. |

## 🔗 Follow-up Tickets
- (추후 발급 요망) MCP 설정 파일 전용 파서 도입 및 조건 평가 로직 정교화
