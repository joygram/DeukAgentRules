---
<%- frontmatter %>
---
# <%= meta.title %>

> 이 티켓은 `core-rules/AGENTS.md`의 출력, 리뷰 게이트, 라이프사이클 정책을 따릅니다.
> **Target Module** 범위를 지키고, 범위/APC/조사 증거/검증 결과는 이 티켓에 유지합니다.

## Scope & Constraints

- **Target:** `<%= meta.title %>`를 직접 해결하는 데 필요한 모듈/서브모듈 경로
- **Context Files:** `PROJECT_RULE.md`, 관련 아키텍처 문서, 대상 소스 파일
- **Constraints:** generated 출력 직접 수정 금지, 무관한 리팩터 금지, 승인 없는 광범위 재생성 금지
- **Lifecycle Guard:** 티켓 라이프사이클 명령은 수정된 마크다운에 대해 자동으로 `lint:md`를 실행하며, 실패 시 즉시 중단합니다.

## Agent Permission Contract (APC)

### [BOUNDARY]
<%- apcDraft?.boundaryEditable || "- Editable modules: 이 요약과 직접 관련된 티켓 대상 모듈" %>
<%- apcDraft?.boundaryForbidden || "- Forbidden modules: generated 산출물과 무관한 모듈 루트" %>
<%- apcDraft?.boundaryRule || "- Rule citation: PROJECT_RULE.md + core-rules/AGENTS.md" %>

### [CONTRACT]
<%- apcDraft?.contractInput || "- Input: 이 티켓 해결에 필요한 기존 구현/문맥" %>
<%- apcDraft?.contractOutput || "- Output: 최소 구현과 검증 증거" %>
<%- apcDraft?.contractSideEffects || "- Side effects: 범위 안의 변경과 문서 업데이트" %>

### [PATCH PLAN]
<%- apcDraft?.patchPlan || "- Compact planning lives in this ticket; create/link subissues for related work instead of expanding scope." %>

## Compact Plan

- **Finding:** 이 티켓이 다루는 구체적인 증상, 리스크, 요청 변경점을 적습니다. 무엇이 깨졌고, 무엇이 빠졌고, 누가 영향을 받는지 분명히 씁니다.
- **Root cause / hypothesis:** 현재 가장 가능성이 높은 원인 설명을 적고, 관련 파일/심볼/명령/규칙을 함께 적습니다. 원인이 불확실하면 어떤 증거가 가설을 가를지 씁니다.
- **RAG evidence:** MCP를 썼다면 hit, weak-hit, miss, stale 여부와 계획에 어떤 영향을 줬는지 적습니다. 쓰지 않았다면 로컬 근거로 충분했다고 적습니다.
- **Approach:** 선택한 설계/구현 방향을 적습니다. 왜 이 경로를 택했는지, 큰 범위 확장은 왜 별도 티켓으로 빼는지 함께 적습니다.
- **Verification:** 실행할 최소 검증 명령, 기대 결과, pass/fail 신호를 적습니다. 가장 좁은 검증으로 문제 해결을 증명하는 것이 원칙입니다.
- **Ticket Numbering:** 번호형 티켓 ID로 master/sub 관계를 추론하고, 본문에 중복 링크를 추가하지 않습니다.

## Problem Analysis

조사, 회귀, 품질, 원인 분석 티켓이라면 사용자에게 다시 묻기 전에 현재 분석을 여기에 먼저 적습니다. 채팅은 이 분석이 기록된 뒤 티켓을 가리키는 역할만 합니다.

## Source Observations

- 확인된 로컬/RAG/코드/명령/문서 근거를 적습니다.

## Cause Hypotheses

- 현재 가장 가능성이 높은 설명과 경쟁 가설을 적습니다.

## Improvement Direction

- 제안하는 수정 방향 또는 후속 설계 방향을 적습니다.

## Open Questions

- 사용자 확인이 꼭 필요한 미해결 질문만 적습니다.

## Tasks

- [ ] Complete compact plan and APC.
- [ ] Execute changes inside APC boundary.
- [ ] Record durable verification outcome in this ticket.

## Done When

- APC가 placeholder 없이 채워져 있다.
- Compact plan이 placeholder 없이 채워져 있다.
- 선언한 범위 안에서 변경이 구현되었다.
- 관련 마크다운 lint/테스트가 통과했거나 실패가 기록되었다.
- 라이프사이클 명령이 수동 개입 없이 티켓 상태를 저장할 수 있다.
