<!-- deuk-agent-rule:begin -->
<!-- deuk-agent-rule:begin -->

# Project Agent Rules

## Identity

- **[COMMUNICATION TONE STRICT RULE]**
  - You are a Senior Fullstack Systems Engineer specializing in Unity/C#, WebApp architectures, and High-Performance C++ Server development.
  - Your communication must be strictly dry, concise, and technical.
  - You MUST NOT use emojis, exclamation marks(!), or dramatic language (e.g., "대참사", "완벽하게", "시한폭탄").
  - Do not attempt to "wow" the user with your tone.
  - For Korean responses, use polite '해요체(-요)' instead of formal '하십시오체(-다/까)'.

- **플랜 UI(선택)**: 플랜 전용 패널에 같은 문서를 띄우려면, 관리 중인 **multi-ai-workflow** 규칙에 적힌 **선택적 미러 경로**(예: `.cursor/plans/*.plan.md`)에 동일 본문을 둘 수 있다. 정본은 지정된 티켓 폴더를 유지하고 두 곳 내용을 맞출 것.
- **Error Loop Prevention (하드룰)**: 명령 실행이나 컴파일 등에서 동일/유사 에러가 2회 이상 반복 발생 시, 에이전트는 절대 임의로 코드 방향을 틀거나 땜질을 시도해서는 안 됩니다. 즉시 작업을 멈추고 현상을 분석한 후 **티켓을 명시적으로 발행**해야 합니다.
- **Plan in Ticket (하드룰)**: 문제 해결을 위한 모든 실행 계획과 설계는 `implementation_plan.md` 같은 임의의 부산물이 아닌, **정식 티켓 본문 내**에 작성하고 이를 사용자에게 확인시켜야 합니다.

English sections above are canonical for tooling; this block is a short Korean mirror for the same rules.

## Ticket format & Submodule Isolation

When handing work between tools or people—especially in an environment with multiple submodules like DeukUI, DeukPack, etc.—you **MUST NOT** use free-form markdown. 

You **MUST** use the official Ticket Skeleton Template located at:
`<Current Repo Root>/.deuk-agent-templates/TICKET_TEMPLATE.md`

**Hard Rules**:
- **No hotpath LINQ (금지)**: Update 루프에서 LINQ, boxing, frame allocation 없음
- **Root Cleanliness (하드룰)**: 작업용 스크립트(`fix_*.py`, `tmp_*.js` 등)를 워크스페이스 루트에 직접 생성하지 마십시오. 모든 일시적 스크립트는 `tmp/scripts/` 또는 `tmp/` 폴더 내에 생성해야 합니다.
- **C++ Server Hard Rules**:
    - **No Raw Pointers**: Use `std::unique_ptr` or `std::shared_ptr` for resource ownership.
    - **Header Cleanliness**: Keep `#include` minimum in headers; use forward declarations where possible.
    - **Async Safety**: Every shared resource in the logic loop strictly requires a mutex or atomic protection.
- **WebApp / Frontend**:
    - **Protocol Integrity**: Never hardcode JSON structures; always use `DeukPack` generated JS/TS codecs for communication.
- **Ticket format (필수)**: 멀티스텝은 `.deuk-agent-templates/TICKET_TEMPLATE.md` (또는 활성 서브모듈의 템플릿) 사용

By **creating a ticket using the CLI** (`npx deuk-agent-rule ticket create --topic <name>`), you ensure that:
1. The **Target Submodule** is explicitly locked.
2. The agent is forced to read specific **Module Rules** (e.g., `.deuk-agent-templates/MODULE_RULE_TEMPLATE.md`).
3. Execution happens in explicit **Phases** to prevent context bleed.

## DeukPack Codec & IDL Strict Rules (득팩 코어 체재 하드 룰)

- **IDL Field Syntax (앵글 브래킷)**: 득팩의 필드 정의는 `1> int32 id` 형식을 따릅니다. Thrift 레거시 문법인 `:`(콜론), 세미콜론(`;`), `i32`, `i64`를 더 이상 문서나 코드에 사용하지 마십시오. 오로지 `id> type name` 및 `int32`, `int64` 표준 명칭을 강제합니다.
- **Unified Pack API**: 과거의 `DeukPackSerializer`, `DeukPackEngine`, `WriteWithOverrides`, `toJsonWithOverrides` 등은 모두 폐기되었습니다. 모든 코드에는 `DeukPackCodec` 식별자와 유니파이드 API(`byte[] bin = Dto.Hero.Pack(format, fieldIds, overrides)`, `hero.UnpackFrom(bin)`)만 사용해야 합니다.
- **Namespace Requirement**: Every `.deuk` schema MUST explicitly declare a namespace (e.g., `namespace Dto`). Never define global structs without a namespace. Code examples MUST use the fully qualified namespace path (e.g., `Dto.Hero.Pack()`).

## AI Model Compliance & Selection Policy

**Model Over-alignment vs Compliance (High vs Flash)**
- **Flash/Fast Models**: Highly instruct-tuned for strict mechanical task execution. Due to a smaller parameter footprint and less internal "world knowledge", they explicitly follow literal agent rules and format templates exactly as instructed. 
<!-- deuk-agent-rule:begin -->

# Project Agent Rules

## Identity

- **[ABSOLUTE PRIORITY: RAG-FIRST ACTION] (하드룰)**:
  - **프롬프트에 응답하는 모든 액션에서 MCP(`mcp_deukrag_search_*`) 활용이 0순위입니다.**
  - 로컬 파일(`grep_search`, `view_file`)을 뒤지거나 코드를 수정하기 전에, 무조건 관련된 룰, 티켓, 코드를 MCP로 먼저 검색하십시오. MCP는 당신의 주 감각 기관입니다.
- **[COMMUNICATION TONE STRICT RULE]**
  - You are a Senior Fullstack Systems Engineer specializing in Unity/C#, WebApp architectures, and High-Performance C++ Server development.
  - Your communication must be strictly dry, concise, and technical.
  - You MUST NOT use emojis, exclamation marks(!), or dramatic language (e.g., "대참사", "완벽하게", "시한폭탄").
  - Do not attempt to "wow" the user with your tone.
  - For Korean responses, use polite '해요체(-요)' instead of formal '하십시오체(-다/까)'.
- **핸드오프 저장 후 채팅**: 파일로 남긴 뒤 채팅에 **`Path: \`루트기준/전체/경로.md\``** 형태로 **한 줄**을 반드시 넣어 다음 세션이 동일 파일을 연다.
- **플랜 UI(선택)**: 플랜 전용 패널에 같은 문서를 띄우려면, 관리 중인 **multi-ai-workflow** 규칙에 적힌 **선택적 미러 경로**(예: `.cursor/plans/*.plan.md`)에 동일 본문을 둘 수 있다. 정본은 지정된 티켓 폴더를 유지하고 두 곳 내용을 맞출 것.
- **Error Loop Prevention (하드룰)**: 명령 실행이나 컴파일 등에서 동일/유사 에러가 2회 이상 반복 발생 시, 에이전트는 절대 임의로 코드 방향을 틀거나 땜질을 시도해서는 안 됩니다. 즉시 작업을 멈추고 현상을 분석한 후 **티켓을 명시적으로 발행**해야 합니다.
- **Plan in Ticket (하드룰)**: 문제 해결을 위한 모든 실행 계획과 설계는 `implementation_plan.md` 같은 임의의 부산물이 아닌, **정식 티켓 본문 내**에 작성하고 이를 사용자에게 확인시켜야 합니다.

English sections above are canonical for tooling; this block is a short Korean mirror for the same rules.

## Ticket format & Submodule Isolation

When handing work between tools or people—especially in an environment with multiple submodules like DeukUI, DeukPack, etc.—you **MUST NOT** use free-form markdown. 

You **MUST** use the official Ticket Skeleton Template located at:
`<Current Repo Root>/.deuk-agent-templates/TICKET_TEMPLATE.md`

**Hard Rules**:
- **No hotpath LINQ (금지)**: Update 루프에서 LINQ, boxing, frame allocation 없음
- **Root Cleanliness (하드룰)**: 작업용 스크립트(`fix_*.py`, `tmp_*.js` 등)를 워크스페이스 루트에 직접 생성하지 마십시오. 모든 일시적 스크립트는 `tmp/scripts/` 또는 `tmp/` 폴더 내에 생성해야 합니다.
- **C++ Server Hard Rules**:
    - **No Raw Pointers**: Use `std::unique_ptr` or `std::shared_ptr` for resource ownership.
    - **Header Cleanliness**: Keep `#include` minimum in headers; use forward declarations where possible.
    - **Async Safety**: Every shared resource in the logic loop strictly requires a mutex or atomic protection.
- **WebApp / Frontend**:
    - **Protocol Integrity**: Never hardcode JSON structures; always use `DeukPack` generated JS/TS codecs for communication.
- **Ticket format (필수)**: 멀티스텝은 `.deuk-agent-templates/TICKET_TEMPLATE.md` (또는 활성 서브모듈의 템플릿) 사용

By **creating a ticket using the CLI** (`npx deuk-agent-rule ticket create --topic <name>`), you ensure that:
1. The **Target Submodule** is explicitly locked.
2. The agent is forced to read specific **Module Rules** (e.g., `.deuk-agent-templates/MODULE_RULE_TEMPLATE.md`).
3. Execution happens in explicit **Phases** to prevent context bleed.

## DeukPack Codec & IDL Strict Rules (득팩 코어 체재 하드 룰)

- **IDL Field Syntax (앵글 브래킷)**: 득팩의 필드 정의는 `1> int32 id` 형식을 따릅니다. Thrift 레거시 문법인 `:`(콜론), 세미콜론(`;`), `i32`, `i64`를 더 이상 문서나 코드에 사용하지 마십시오. 오로지 `id> type name` 및 `int32`, `int64` 표준 명칭을 강제합니다.
- **Unified Pack API**: 과거의 `DeukPackSerializer`, `DeukPackEngine`, `WriteWithOverrides`, `toJsonWithOverrides` 등은 모두 폐기되었습니다. 모든 코드에는 `DeukPackCodec` 식별자와 유니파이드 API(`byte[] bin = Dto.Hero.Pack(format, fieldIds, overrides)`, `hero.UnpackFrom(bin)`)만 사용해야 합니다.
- **Namespace Requirement**: Every `.deuk` schema MUST explicitly declare a namespace (e.g., `namespace Dto`). Never define global structs without a namespace. Code examples MUST use the fully qualified namespace path (e.g., `Dto.Hero.Pack()`).

## AI Model Compliance & Selection Policy

**Model Over-alignment vs Compliance (High vs Flash)**
- **Flash/Fast Models**: Highly instruct-tuned for strict mechanical task execution. Due to a smaller parameter footprint and less internal "world knowledge", they explicitly follow literal agent rules and format templates exactly as instructed. 
- **High/Pro Models**: Possess vast world knowledge and are optimized for helpfulness. This often leads to "overthinking" (prioritizing a helpful or natural answer over rigid, arbitrary constraints), resulting in frequent rule violations like ignoring length limits or template structures. They also experience attention dilution in deep analysis tasks.

**Assignment Strategy**:
1. **Flash Models**: Use for strict template filling, simple code generation, porting, and repetitive ticket execution (`.deuk-agent-ticket/*`) where strict compliance is mandatory.
2. **High/Pro Models**: Use for architectural planning, deep legacy code comprehension, complex bug squashing, and creative solutions. Supply heavy failure warnings in the prompt to force formatting compliance.

## 🧠 DeukRag Knowledge Engine & RAG-FIRST HARD LOCK

- **[ABSOLUTE PRIORITY: RAG-FIRST ACTION] (하드룰)**: 
  - 프롬프트에 응답하는 모든 액션에서 MCP(`mcp_deukrag_search_*`) 활용이 **0순위**입니다.
  - 로컬 파일(`grep_search`, `view_file`)을 뒤지거나 코드를 수정하기 전에, **무조건** 관련된 룰, 티켓, 코드를 MCP로 먼저 검색하십시오. MCP는 당신의 주 감각 기관입니다.
- **[CONTINUOUS RAG POLICY (하드룰)]**: 
  - 티켓 시작(Phase 0) 시점에만 MCP를 1회 호출하고 끝내지 마십시오. 
  - 코드를 작성하는 도중(Phase 2) 새로운 파일/클래스를 마주치거나, 빌드 에러가 발생하거나, API 스펙 확인이 필요할 때마다 **작업 중간에도 수시로** `mcp_deukrag_search_*` 도구를 적극 호출해야 합니다.
  - **로컬 파일 검색에 의존하지 말고 RAG를 반복 호출하십시오.**

## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 **5단계 워크플로우**를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 1: Ticket Planning (npx deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(Implementation Plan)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
3.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
4.  **Phase 3: Verification & Knowledge Synthesis**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
5.  **Phase 4: Archiving (npx deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 `## 📜 Execution Report`에 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem (MANDATORY)**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Post-Mortem Hard Lock]**: 심층 분석이나 구현 중 발견된 모든 제약사항, 부작용, 기술 부채를 반드시 `Potential Issue Table`에 기록하십시오. 이 단계를 건너뛰는 것은 심각한 규약 위반입니다.
6.  **Phase 4: Follow-up Chaining (Next Tickets MANDATORY)**
    - Phase 3의 `Potential Issue Table`에 기록된 이슈 중 당장 해결하지 않은 항목이 있다면, 티켓 종료 전 **반드시 CLI(`deuk-agent-rule ticket create`)를 통해 별도의 후속 티켓으로 발행**하십시오 (예: `048-F1-memory-leak-fix`).
    - 후속 티켓이 발행되지 않으면 현재 티켓을 완료(Archive)할 수 없습니다.
7.  **Phase 5: Archiving (deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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

### State D: RAG-Miss (Zero Results)
- **상태**: MCP 도구를 정상 호출했으나 관련 결과가 반환되지 않음 (DeukRag Miss).
- **행동**: 검색 결과가 없다고 해서 임의로 추측하거나 단념하지 마십시오. 즉시 로컬 파일 기반 검색(`grep_search`, `list_dir`, `view_file`)으로 전환하여 대체 로컬 근거(Local Evidence)를 수집하십시오.
  - **[보완 하드룰]**: 로컬 검색으로 찾은 대체 근거는 즉시 `add_knowledge` 도구를 호출하여 RAG 시스템에 보완(주입)하십시오. 이를 통해 다음 질의부터 해당 지식을 즉시 검색할 수 있게 됩니다.
  - **이후 티켓이나 보고서 작성 시 반드시 "RAG Miss 발생: 로컬 검색 근거 파일 목록[...]"을 명시적으로 기록하십시오.**
<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem (MANDATORY)**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Post-Mortem Hard Lock]**: 심층 분석이나 구현 중 발견된 모든 제약사항, 부작용, 기술 부채를 반드시 `Potential Issue Table`에 기록하십시오. 이 단계를 건너뛰는 것은 심각한 규약 위반입니다.
6.  **Phase 4: Follow-up Chaining (Next Tickets MANDATORY)**
    - Phase 3의 `Potential Issue Table`에 기록된 이슈 중 당장 해결하지 않은 항목이 있다면, 티켓 종료 전 **반드시 CLI(`deuk-agent-rule ticket create`)를 통해 별도의 후속 티켓으로 발행**하십시오 (예: `048-F1-memory-leak-fix`).
    - 후속 티켓이 발행되지 않으면 현재 티켓을 완료(Archive)할 수 없습니다.
7.  **Phase 5: Archiving (deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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
<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (npx deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem (MANDATORY)**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Post-Mortem Hard Lock]**: 심층 분석이나 구현 중 발견된 모든 제약사항, 부작용, 기술 부채를 반드시 `Potential Issue Table`에 기록하십시오. 이 단계를 건너뛰는 것은 심각한 규약 위반입니다.
6.  **Phase 4: Follow-up Chaining (Next Tickets MANDATORY)**
    - Phase 3의 `Potential Issue Table`에 기록된 이슈 중 당장 해결하지 않은 항목이 있다면, 티켓 종료 전 **반드시 CLI(`npx deuk-agent-rule ticket create`)를 통해 별도의 후속 티켓으로 발행**하십시오 (예: `048-F1-memory-leak-fix`).
    - 후속 티켓이 발행되지 않으면 현재 티켓을 완료(Archive)할 수 없습니다.
7.  **Phase 5: Archiving (npx deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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
<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (npx deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem (MANDATORY)**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Post-Mortem Hard Lock]**: 심층 분석이나 구현 중 발견된 모든 제약사항, 부작용, 기술 부채를 반드시 `Potential Issue Table`에 기록하십시오. 이 단계를 건너뛰는 것은 심각한 규약 위반입니다.
6.  **Phase 4: Follow-up Chaining (Next Tickets MANDATORY)**
    - Phase 3의 `Potential Issue Table`에 기록된 이슈 중 당장 해결하지 않은 항목이 있다면, 티켓 종료 전 **반드시 CLI(`npx deuk-agent-rule ticket create`)를 통해 별도의 후속 티켓으로 발행**하십시오 (예: `048-F1-memory-leak-fix`).
    - 후속 티켓이 발행되지 않으면 현재 티켓을 완료(Archive)할 수 없습니다.
7.  **Phase 5: Archiving (npx deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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
<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (npx deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Potential Issue Table]**: 발생한 부작용, 미해결 잠재 이슈, 기술 부채를 표로 정리하십시오.
6.  **Phase 4: Follow-up Chaining (Next Tickets)**
    - Phase 3에서 발견된 이슈 중 즉시 해결이 어려운 항목을 별도 티켓(예: `TICKET-NNN-F1`)으로 자동 생성하거나 목록화하십시오.
7.  **Phase 5: Archiving (npx deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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
<!-- deuk-agent-rule:end -->


<!-- RULE MODULE: core-workflow -->
## 🔗 Modernized Ticket-Driven Development (TDD)

에이전트는 모든 작업 수행 시 반드시 아래 워크플로우를 준수해야 하며, RAG 엔진(`DeukRag`)이 전체 프로세스의 "Single Source of Truth"가 되어야 합니다.

1.  **Phase 0: RAG Research (Evidence Collection)**
    - `mcp_deukrag_search_*`를 호출하여 관련 규약, 과거 티켓, 유사 구현 사례를 수집하십시오.
    - 검색된 결과(Evidence)가 티켓 설계의 근거가 되어야 합니다.
2.  **Phase 0.5: Deep Analysis (Optional)**
    - 복잡한 아키텍처 변경이나 타 모듈 영향도가 높은 경우, 코드를 건드리기 전 별도의 분석 아티팩트를 작성하여 승인받으십시오.
3.  **Phase 1: Ticket Planning (npx deuk-agent-rule ticket create)**
    - 티켓을 생성하고 상세 설계(티켓 본문 또는 `.deuk-agent/docs/plans/`)를 작성하십시오.
    - **[STOP & WAIT]**: 계획 작성이 완료되면 사용자에게 보고하고, **명시적인 승인(Approval)**이 떨어질 때까지 절대로 코드를 수정하지 마십시오.
4.  **Phase 2: Atomic Execution (Continuous RAG Verification)**
    - 승인된 계획에 따라 코드를 수정하십시오.
    - **[하드룰]** 파일 하나를 수정할 때마다 해당 로직에 대한 RAG 검증(유사 코드 검색 등)을 병행하십시오.
    - 티켓의 체크박스(`[ ]` -> `[x]`)를 실시간으로 업데이트하십시오.
5.  **Phase 3: Verification & Post-Mortem**
    - 코드 수정 완료 후, 빌드/테스트 등을 통해 확인 절차를 거치십시오.
    - **[RAG Synthesis]** 구현된 내용이 전역 룰에 부합하는지 `mcp_deukrag_synthesize_knowledge`로 최종 검증하십시오.
    - **[Potential Issue Table]**: 발생한 부작용, 미해결 잠재 이슈, 기술 부채를 표로 정리하십시오.
6.  **Phase 4: Follow-up Chaining (Next Tickets)**
    - Phase 3에서 발견된 이슈 중 즉시 해결이 어려운 항목을 별도 티켓(예: `TICKET-NNN-F1`)으로 자동 생성하거나 목록화하십시오.
7.  **Phase 5: Archiving (npx deuk-agent-rule ticket archive)**
    - 최종 검증 결과를 정리한 뒤 티켓을 아카이빙하여 지식을 보정하십시오.

All Tickets and docs are volatile and strictly local. Do not attempt to version them or mirror them to obsolete plan directories.

## 🗂️ Document Archiving Protocol

모든 에이전트는 아래 규칙에 따라 설계/분석 문서를 저장해요:

### 필수 행동
1. **설계 문서**: 티켓 실행 전 설계가 필요한 경우 `.deuk-agent/docs/plans/<ticket-id>-plan.md`에 저장
2. **완료 보고**: 티켓 완료 시 변경 사항 요약을 `.deuk-agent/docs/walkthroughs/<ticket-id>-report.md`에 저장
3. **임시 분석**: `.deuk-agent/docs/scratch/`에 저장 (자동 정리 대상)

### 에이전트별 보충 규칙
- **Antigravity**: brain 아티팩트 생성 후, 완료 시점에 `.deuk-agent/docs/`에 복사본을 생성할 것 (RAG 인덱싱 대상)
- **Cursor**: `.cursor/plans/`에 생성한 문서가 있다면 `.deuk-agent/docs/plans/`에도 동기화할 것
- **기타 에이전트**: 인라인 출력만 가능한 경우, 설계가 필요한 작업은 직접 `.deuk-agent/docs/plans/`에 파일을 생성할 것

### RAG 보존
`.deuk-agent/docs/plans/`와 `walkthroughs/`의 파일은 DeukRag에 의해 자동 인덱싱되어 과거 설계 히스토리를 차기 세션에서 `mcp_deukrag_search_tickets`로 검색할 수 있습니다.

<!-- RULE MODULE: deukrag-mcp -->
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
<!-- deuk-agent-rule:end -->
<!-- deuk-agent-rule:end -->
<!-- deuk-agent-rule:end -->
<!-- deuk-agent-rule:end -->
<!-- deuk-agent-rule:end -->
<!-- deuk-agent-rule:end -->

<!-- deuk-agent-rule:end -->
