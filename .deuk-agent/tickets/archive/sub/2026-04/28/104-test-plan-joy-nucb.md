---
createdAt: 2026-04-28 20:30:43
docsLanguage: ko
id: 104-test-plan-joy-nucb
planLink: .deuk-agent/docs/plans/104-test-plan-joy-nucb-plan.md
priority: P2
status: closed
summary: 'Target: [Fill in the target module/submodule path] - Context Files: [List
  architecture docs or key files to read first] 이전 세션 이후 프레임워크 전반에 걸친 대규모 리팩토링이 수행되었습니다.'
tags: tickets, architecture, testing
title: Test Plan
---

# Plan-to-Ticket 구현 계획 (v2 아키텍처 반영)

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## 현재 상태 분석 — DeukAgentRules v2 변경 요약

이전 세션 이후 프레임워크 전반에 걸친 대규모 리팩토링이 수행되었습니다.

### 구조 변경

| 항목 | Before | After |
|---|---|---|
| **템플릿 디렉토리** | `templates/blueprints/` | `templates/` (flat, `blueprints/` 제거) |
| **번들 참조 경로** | `../bundle/templates` | `../templates` (bundle 계층 제거) |
| **룰 컴파일러 경로** | `join(bundleRoot, "rules.d")` | `join(bundleRoot, "templates", "rules.d")` |
| **AGENTS.md 코어 룰** | `bundleRoot/AGENTS.md` | `bundleRoot/core-rules/AGENTS.md` |
| **프로젝트 룰 참조** | 동적 경로 지정 (User Header) | **`PROJECT_RULE.md`** 고정 파일명 (루트에 배치) |
| **`sync-bundle.mjs`** | 존재 | **삭제됨** |

### merge-logic.mjs 대폭 축소

기존의 복잡한 마커 기반 병합 로직이 **전부 삭제**되었습니다:
- ~~`resolveMarkers`~~, ~~`stripInternalMarkers`~~, ~~`findMarkerRegion`~~
- ~~`applyAgents`~~, ~~`pruneAppendedDuplicates`~~
- ~~`handleAgentOverwrite`~~, ~~`handleAgentInject`~~, ~~`handleAgentAppend`~~

현재 남은 함수는 `readBundleAgents()`와 `removeTaggedBlock()`뿐입니다.

### 티켓 템플릿 (TICKET_TEMPLATE.md) 변경

"Strict Rules Check" + "Scope" 섹션이 삭제되고, **Agent Permission Contract (APC)** 4-block 구조가 도입되었습니다:

```markdown
## Agent Permission Contract (APC)
### [BOUNDARY]     — 변경 가능/금지 모듈
### [CONTRACT]     — input/output/side effects/Rule Citation
### [PATCH PLAN]   — file/function/change
### [TEST IMPACT]  — affected tests
```

### core-workflow.md Phase 1 갱신

Phase 1(Plan)에서 에이전트가 **APC 블록을 완전히 채우도록** 명시적으로 강제하는 문구가 추가되었습니다.

### init 플로우 변경

`initSingleWorkspace()` Step 4에서 `PROJECT_RULE.md`가 루트에 없으면 템플릿(`templates/PROJECT_RULE.md`)에서 자동 복사합니다.

---

## Proposed Changes: `--from-plan` 구현

위의 v2 아키텍처 변경사항을 완전히 반영한 상태에서, Plan-to-Ticket 기능을 구현합니다.

### 1. [NEW] `scripts/plan-parser.mjs` — Generic Markdown Plan 파서

```javascript
export function parseGenericMarkdownPlan(content) {
  const lines = content.split('\n');
  
  // Title: 첫 번째 H1
  const h1Line = lines.find(l => /^# /.test(l));
  const title = h1Line ? h1Line.replace(/^# /, '').trim() : '';

  // Summary: H1 직후 ~ 첫 번째 --- 또는 ## 까지
  const h1Idx = h1Line ? lines.indexOf(h1Line) : -1;
  let summaryLines = [];
  for (let i = h1Idx + 1; i < lines.length; i++) {
    if (/^---$/.test(lines[i].trim()) || /^## /.test(lines[i])) break;
    if (lines[i].trim()) summaryLines.push(lines[i].trim());
  }
  const summary = summaryLines.join(' ').slice(0, 200);

  // Tasks: 체크리스트 아이템 수집
  const tasks = lines
    .filter(l => /^\s*- \[[ x/]\]/.test(l))
    .map(l => l.replace(/^\s*- \[[ x/]\]\s*/, '').trim());

  return { title, summary, tasks, body: content };
}

// 경로 기반 에이전트 자동 감지
export function detectAgentFromPath(planPath) {
  if (planPath.includes('.gemini')) return 'antigravity';
  if (planPath.includes('copilot') || planPath.includes('.codex')) return 'copilot';
  if (planPath.includes('.cursor')) return 'cursor';
  if (planPath.includes('.claude')) return 'claude';
  return 'generic';
}
```

### 2. [MODIFY] `scripts/cli-args.mjs` — `--from-plan` 파라미터 추가

`parseTicketArgs`에 `--from-plan` 옵션을 추가합니다.

```diff
  else if (a === "--tags") out.tags = argv[++i];
+ else if (a === "--from-plan") out.fromPlan = argv[++i];
```

### 3. [MODIFY] `scripts/cli-ticket-commands.mjs` — `runTicketCreate` 분기 추가

`opts.fromPlan`이 존재할 때 Plan 파일을 파싱하여 티켓으로 변환하는 분기를 추가합니다.

**핵심 로직:**
1. `readFileSync(opts.fromPlan)` → Plan 원문 로드
2. `parseGenericMarkdownPlan(content)` → `{ title, summary, tasks, body }` 추출
3. CLI `opts` 우선 적용 (예: `--summary`가 있으면 파서 결과를 덮어씀)
4. 기존 `rawMeta` 생성 로직에 파서 결과를 주입
5. **body**: EJS 템플릿 렌더링 대신, Plan 원문 전체를 티켓 본문으로 직접 삽입
6. 프론트매터 생성 → 파일 쓰기 → INDEX 등록 (기존 플로우 재사용)

```javascript
// --from-plan 분기
if (opts.fromPlan) {
  const planContent = readFileSync(join(opts.cwd, opts.fromPlan), 'utf8');
  const parsed = parseGenericMarkdownPlan(planContent);
  
  // CLI opts가 파서 결과보다 우선
  const title = opts.topic || parsed.title || 'ticket';
  const topic = toSlug(title);
  const summary = opts.summary || parsed.summary;
  
  // ... rawMeta 구성, frontmatter 생성 ...
  
  // Plan 본문을 그대로 티켓 body로 삽입 (EJS 미사용)
  const finalContent = `---\n${frontmatter}\n---\n${parsed.body}`;
  writeFileSync(abs, finalContent, 'utf8');
}
```

### 4. 검증 계획

- `npx deuk-agent-rule ticket create --from-plan path/to/plan.md` 실행하여 티켓이 정상 생성되는지 확인
- 생성된 티켓 파일의 프론트매터가 올바른 YAML인지 확인
- Plan 본문이 티켓 body에 그대로 보존되는지 확인
- `--topic`, `--summary` 등 CLI 인자가 파서 결과를 정상적으로 덮어쓰는지 확인

## User Review Required

> [!IMPORTANT]
> 1. v2 구조 변경사항을 모두 반영한 상태입니다. 빠뜨린 변경사항이 있으면 알려주세요.
> 2. `--from-plan` 구현 범위와 방향이 이전 논의와 일치하는지 확인 부탁드립니다.
> 3. 승인해 주시면 즉시 Execution Phase에 돌입하겠습니다.
