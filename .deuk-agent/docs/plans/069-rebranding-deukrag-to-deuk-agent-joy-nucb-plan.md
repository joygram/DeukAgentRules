---
id: 069-rebranding-deukrag-to-deuk-agent-joy-nucb
title: "rebranding-deukrag-to-deuk-agent-context"
language: ko
createdAt: 2026-04-25 02:50:34
---

---
id: 069-rebranding-deukrag-to-deuk-agent-joy-nucb
title: "Rebranding: DeukRag to DeukAgentContext"
language: ko
createdAt: 2026-04-25 02:50:34
---

# 계획: DeukRag 리브랜딩 (DeukAgentContext)

## 요약
- **목적**: 단순 RAG 엔진을 넘어 워크플로우 제어, 통계, 대시보드 역할을 수행하는 시스템의 정체성을 강화하고 SEO 유입을 최적화하기 위해 `DeukRag`를 `DeukAgentContext`로 리브랜딩합니다.
- **범위**: `DeukRag` 저장소 및 `DeukAgentRules` 내 모든 참조(MCP 도구명, 서비스명, 문서 내용) 수정.
- **비범위**: 기존 벡터 데이터베이스의 임베딩 데이터 재계산 (메타데이터 수정만 진행).

## 현재 격차
- `DeukRag`라는 이름은 검색 최적화(SEO) 및 실제 기능(Workflow, Dashboard)을 충분히 설명하지 못함.
- `mcp_deukrag_*` 도구명이 사용자에게 RAG 전용으로 오해받을 여지가 있음.

## 설계 결정
- **패키지명**: `deuk-agent-context` (npm), `deuk-agent-context` (poetry)
- **저장소명**: `DeukAgentContext`
- **MCP 서버명**: `deuk-agent-context`
- **MCP 도구 프리픽스**: `mcp_deukcontext_*` (예: `search_rules` -> `mcp_deukcontext_search_rules`)
- **서비스명**: `deukcontext-dashboard`, `deukcontext-mcp`, `deukcontext-watcher`
- **데이터베이스**: `.local/deukcontext.db`
- **캐치프레이즈**: "MCP-native context engine for AI agents — knowledge, workflow, and telemetry"

## 구현 계획

### Phase 1: DeukRag (DeukAgentContext) 내부 수정
1. **[MODIFY]** `package.json`: `name`, `bin`, `description` 수정.
2. **[MODIFY]** `pyproject.toml`: `name`, `scripts` 수정.
3. **[MODIFY]** `src/mcp/server.py`: FastMCP `name` 변경 및 도구명 리브랜딩.
4. **[MODIFY]** `src/api/server.py`: FastAPI `title` 수정 ("DeukContext Dashboard").
5. **[MODIFY]** `src/cli/main.py`: 서비스명(`deukcontext-*`) 및 CLI 설명 수정.
6. **[MODIFY]** `src/rag/sqlite_vector_store.py`: DB 파일명 `deukcontext.db`로 변경.
7. **[MODIFY]** `README.md`: 전체 리브랜딩 내용 반영 및 아키텍처 다이어그램 설명 수정.

### Phase 2: DeukAgentRules 참조 수정
1. **[MODIFY]** `publish/rules.d/deukrag-mcp.md` -> `deukcontext-mcp.md`로 파일명 및 내용 변경.
2. **[MODIFY]** `publish/rules.d/core-workflow.md`: `DeukRag` -> `DeukContext` 참조 변경.
3. **[MODIFY]** `AGENTS.md` / `gemini.md`: 모든 `mcp_deukrag_*` 호출 규약을 `mcp_deukcontext_*`로 변경.
4. **[MODIFY]** `scripts/cli-rule-compiler.mjs`: DeukRag 설정 탐색 로직을 DeukAgentContext 대응으로 수정.

### Phase 3: 서비스 재등록 및 검증
1. `npx deuk-agent-context init` (기존 `deukrag init`) 실행하여 서비스 재등록.
2. `systemctl --user status deukcontext-mcp` 확인.
3. 대시보드 접속 및 RAG 검색 도구 작동 여부 최종 확인.

## 검증 계획
- `npm run lint:md`를 통한 문서 링크 검증.
- MCP 도구 목록(`mcp_deukcontext_*`)이 정상적으로 노출되는지 확인.
- 기존 `.local/config.yaml` 호환성 유지 확인.

## 리스크
- **Breaking Change**: 기존에 `mcp_deukrag_*`를 사용하던 다른 에이전트/스크립트와의 호환성이 깨짐 -> Rules 배포를 통해 즉시 업데이트 유도.

## 수용 기준
- `DeukRag` 키워드가 사용자 대면 문서 및 핵심 코드에서 모두 `DeukAgentContext` 또는 `deuk-agent-context`로 교체됨.
- 새로운 MCP 도구명으로 검색 및 상태 관리가 정상 작동함.
