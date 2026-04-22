---
id: deukrag-mcp
condition:
  mcp: deukrag
inject_target: ["AGENTS.md", "gemini.md"]
---
## 🧠 DeukRag Knowledge Engine & RAG-FIRST HARD LOCK

- **[ABSOLUTE PRIORITY: RAG-FIRST ACTION] (하드룰)**: 
  - 프롬프트에 응답하는 모든 액션에서 MCP(`mcp_deukrag_search_*`) 활용이 **0순위**입니다.
  - 로컬 파일(`grep_search`, `view_file`)을 뒤지거나 코드를 수정하기 전에, **무조건** 관련된 룰, 티켓, 코드를 MCP로 먼저 검색하십시오. MCP는 당신의 주 감각 기관입니다.
- **[CONTINUOUS RAG POLICY (하드룰)]**: 
  - 티켓 시작(Phase 0) 시점에만 MCP를 1회 호출하고 끝내지 마십시오. 
  - 코드를 작성하는 도중(Phase 2) 새로운 파일/클래스를 마주치거나, 빌드 에러가 발생하거나, API 스펙 확인이 필요할 때마다 **작업 중간에도 수시로** `mcp_deukrag_search_*` 도구를 적극 호출해야 합니다.
  - **로컬 파일 검색에 의존하지 말고 RAG를 반복 호출하십시오.**

## 📡 RAG Connectivity & Fallback Protocol (RAG 상태별 행동 지침)

에이전트는 현재 환경의 RAG(MCP) 연결 상태에 따라 아래와 같이 행동 유형을 즉시 전환해야 합니다.

### State A: RAG-Normal (Strict RAG-First)
- **상태**: MCP 도구(`mcp_deukrag_search_*`)가 정상 작동함.
- **행동**: 모든 분석과 코드 작성 전 반드시 RAG를 호출하십시오. 로컬 파일 검색(`grep`, `ls`)보다 RAG 결과를 우선 신뢰하십시오.

### State B: RAG-Missing (Graceful Fallback)
- **상태**: 환경에 MCP 도구가 설치되어 있지 않거나 설정되지 않음.
- **행동**: 즉시 로컬 파일 기반 검색(`grep_search`, `list_dir`, `view_file`)으로 전환하십시오. RAG 부재를 사용자에게 불평하지 말고, 가용한 로컬 컨텍스트 내에서 최선을 다해 작업을 완수하십시오.

### State C: RAG-Error (Loop Prevention)
- **상태**: MCP 호출 시 타임아웃, 연결 오류, 또는 동일 에러가 2회 이상 반복됨.
- **행동**: **즉시 RAG 호출을 중단**하고 State B(로컬 검색)로 강제 전환하십시오. 에러 루프에 빠져 작업 시간을 낭비하지 마십시오. 문제 상황을 `## 📜 Execution Report`에 기록하여 추후 복구 티켓을 발행할 수 있게 하십시오.
