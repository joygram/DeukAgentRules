---
id: 098-fix-ticket-workflow-integrity-joy-nucb
title: fix-ticket-workflow-integrity
summary: "- **IN**: TicketStatus Enum 도입, 상태 전이 가드, INDEX.json 중복 방지, create
  --ref 인덱스 등록, distillKnowledge 섹션명 동기화, 종합 테스트 수트 작성."
planLink: .deuk-agent/docs/plans/098-fix-ticket-workflow-integrity-joy-nucb-plan.md
---


# fix-ticket-workflow-integrity

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
> [WARNING: Do not skip deep analysis. Shallow logic leads to cascaded bugs.]
심층분석 결과, 티켓 시스템의 핵심인 상태 관리와 인덱스 무결성 보장 로직이 결여되어 있음.
1. **상태 관리 부재**: `active` 상태 전환 로직이 없고, `done` 등의 유령 상태가 존재함.
2. **인덱스 오염**: RAG 인덱스와 실제 INDEX.json의 괴리가 심각함 (778 vs 48). 중복 등록 방지 로직 부재.
3. **워크플로우 단절**: `create`에서 `--ref` 사용 시 인덱스 등록 누락, `archive` 시 섹션명 불일치로 지식 추출 실패.

## Strict Rules Check
- **Protocol Integrity**: INDEX.json 등 하위 데이터 구조 조작 시 직접적인 JSON 문자열 조작 금지.
- **Dry, Concise**: 티켓 관리 로직은 엄격하고 간결해야 함.
- **No Ticket, No Code**: 본 티켓 승인 전까지 코드 수정 금지.

## Scope (In / Out)
- **IN**: `TicketStatus` Enum 도입, 상태 전이 가드, `INDEX.json` 중복 방지, `create --ref` 인덱스 등록, `distillKnowledge` 섹션명 동기화, 종합 테스트 수트 작성.
- **OUT**: RAG 서버 자체의 로직 수정 (CLI 측면의 데이터 정합성만 보장).

## Proposed Changes

### Phase 1: Core Lifecycle & Integrity
- **[MODIFY] [cli-utils.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-utils.mjs)**: `TicketStatus` 상수 및 `validateStatusTransition` 추가.
- **[MODIFY] [cli-ticket-index.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-index.mjs)**: `appendTicketEntry` 중복 체크 로직 추가.

### Phase 2: Create & Archive Logic Fix
- **[MODIFY] [cli-ticket-commands.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/cli-ticket-commands.mjs)**: 
    - `runTicketCreate`에서 `--ref` 처리 시 인덱스 등록 추가.
    - `distillKnowledge` 섹션명을 `TICKET_TEMPLATE.md`와 동기화.
- **[MODIFY] [TICKET_TEMPLATE.md](file:///home/joy/workspace/DeukAgentRules/bundle/templates/TICKET_TEMPLATE.md)**: 핵심 메타데이터 frontmatter 슬롯 추가.

### Phase 3: Validation Suite
- **[NEW] [cli-ticket-workflow.test.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/tests/cli-ticket-workflow.test.mjs)**: 라이프사이클 E2E 테스트.
- **[NEW] [cli-ticket-index.test.mjs](file:///home/joy/workspace/DeukAgentRules/scripts/tests/cli-ticket-index.test.mjs)**: 인덱스 무결성 및 중복 방지 테스트.

## Verification Plan
### Automated Tests
- `npm test`를 통해 새로 작성된 티켓 워크플로우 테스트 수트 전수 통과 확인.
- `INDEX.json` 강제 오염 후 `rebuild` 명령으로 정합성 복구 확인.

### Manual Verification
- `npx deuk-agent-rule ticket create --ref ...` 실행 후 `INDEX.json`에 정상 등록되는지 확인.
- `archive` 후 `.deuk-agent/knowledge/`에 섹션 내용이 포함된 JSON이 생성되는지 확인.

## Done When
- [ ] 상태 전이 가드가 적용되어 비논리적 상태 변경 시 에러 발생.
- [ ] 동일 ID 티켓 중복 생성 시 INDEX.json에 중복 누적되지 않음.
- [ ] 모든 신규 테스트 케이스 통과.
- [ ] `distillKnowledge`가 실제 섹션 데이터를 정상적으로 추출함.
