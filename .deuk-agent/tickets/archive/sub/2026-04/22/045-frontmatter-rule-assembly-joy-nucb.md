 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 2 0 0 : 2 9 : 0 3 i d : 0 4 5 - f r o n t m a t t e r - r u l e - a s s e m b l y - j o y - n u c b p r i o r i t y : P 3 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : c l o s e d s u m m a r y : " T a r g e t S u b m o d u l e : [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E R U L E T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] " t a g s : r a g , f r o n t m a t t e r , m c p , t i c k e t s , a r c h i t e c t u r e t i t l e : 0 4 5 - f r o n t m a t t e r - r u l e - a s s e m b l y - - - # [ E x e c u t i o n ] T a s k : 0 4 5 - f r o n t m a t t e r - r u l e - a s s e m b l y | I D : 0 4 5 - f r o n t m a t t e r - r u l e - a s s e m b l y - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > Y o u a r e o p e r a t i n g w i t h i n a l o c k e d m u l t i - m o d u l e m o n o r e p o . > 1 . R e s t r i c t a b s o l u t e l y a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * [ T a r g e t S u b m o d u l e ] * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * [ C o n t e x t F i l e s ] * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r s u b m o d u l e s . # # � � S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - * * C o n t e x t F i l e s : * * - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E _ R U L E _ T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] # # � � F i l e s t o M o d i f y - p a t h / f r o m / r o o t / t o / t a r g e t 1 : [ S p e c i f i c i n s t r u c t i o n s . D o n ' t w r i t e ' r e f a c t o r ' , d e s c r i b e W H A T t o r e f a c t o r . ] # # � � ️ D e s i g n D e c i s i o n s ( R e f e r t o P l a n ) - * * A r c h i t e c t u r e * * : M o d u l a r F r o n t m a t t e r - d r i v e n r u l e a s s e m b l y . # # � � S t r i c t C o n s t r a i n t s ( R u l e s t o n e v e r b r e a k ) - [ e . g . , N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s ] # # � � P h a s e d E x e c u t i o n S t e p s > A g e n t : D o N O T a t t e m p t t o d o P h a s e 3 b e f o r e P h a s e 1 i s f u l l y t e s t e d . 0 . [ P h a s e 0 > R A G R e s e a r c h ( M C P ) ] - [ ] m c p _ d e u k r a g _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ ] m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : 0 . 5 [ P h a s e 0 . 5 > D e e p A n a l y s i s ( O p t i o n a l ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > S e t u p / P a r s i n g ] 2 . [ P h a s e 2 > C o r e L o g i c C h a n g e ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 3 . [ P h a s e 3 > C l e a n u p / V e r i f i c a t i o n ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | | | | | 4 . [ P h a s e 4 > F o l l o w - u p C h a i n i n g ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 을 차 기 티 켓 으 로 발 행 및 기 록

## Merged Legacy Document


### 045 plan

# [Design] Decoupling Domain Rules via Frontmatter-Driven Assembly

## 🎯 Background & Motivation
Currently, `DeukAgentRules` is heavily coupled with domain-specific rules (`DeukPack` codec rules, `DeukRag` RAG-first locks).
- **Issue 1**: `DeukAgentRules` should be generic and universally applicable to any project, not just `DeukFamily`.
- **Issue 2**: `DeukRag` is an optional MCP server. Its strict rules should only activate if the environment actually supports it.
- **Issue 3**: The current mechanism uses hardcoded tag strings (`<!-- deuk-agent-rule:begin -->`) for a monolithic injection, making it rigid.

The goal is to transition to a modular, Frontmatter-driven rule assembly system where domain rules are decoupled and dynamically injected based on the environment.

## 🏗️ Architecture & Design Decisions

### Decision 1: Rule Modularity (Plugin System)
Instead of a monolithic `bundle/AGENTS.md`, we will split rules into components within a new `bundle/rules.d/` directory.
- `core-workflow.md` (TDD, Ticket Formats)
- `deukpack-strict.md` (DeukPack specific)
- `deukrag-mcp.md` (RAG-First rules)

### Decision 2: Frontmatter Rule Definitions
Each modular rule file will use YAML Frontmatter to declare its applicability conditions.
Example `deukrag-mcp.md`:
```yaml
---
id: deukrag-hardlock
condition:
  mcp_exists: "deukrag"
inject_target: ["AGENTS.md", "gemini.md"]
---
## 🧠 DeukRag Knowledge Engine & RAG-FIRST HARD LOCK
...
```

### Decision 3: Local Project Overrides
Projects like `DeukPack` can define their own `.deuk-agent/domain-rules/` folder containing their Frontmatter rules. The `init` CLI will scan both the global `DeukAgentRules/bundle` and the local project, compiling them into the final `AGENTS.md` block.

### Decision 4: Preserving User Edits (Tag vs Frontmatter)
While Frontmatter determines *what* to include, we still need a way to safely inject this compiled string into a user's `AGENTS.md` without overwriting their custom notes.
We will retain the `<!-- deuk-agent-rule:begin -->` HTML markers in `AGENTS.md` strictly as an **injection boundary**. However, the *content* inside the boundary will be dynamically generated based on the Frontmatter rules.

## 🛠️ Proposed Components & Interface

#### 1. CLI Rule Compiler (`cli-rule-compiler.mjs`)
A new module responsible for:
1. Parsing Frontmatter of all `.md` files in `rules.d/` and local `.deuk-agent/domain-rules/`.
2. Evaluating `condition` fields (e.g., checking `.local/config.yaml` for DeukRag).
3. Concatenating valid rules.

#### 2. Core Template Cleanup
- **[MODIFY]** `bundle/AGENTS.md` & `bundle/gemini.md`: Remove all DeukPack and DeukRag specific text. Leave only generic workflow, tone, and communication protocols.

#### 3. Submodule Rule Migration
- The `DeukPack` rules will be moved completely out of `DeukAgentRules` and placed into `workspace/i/DeukPack/.deuk-agent/domain-rules/`.

## 🛑 Strict Constraints & Safety
- **Backward Compatibility**: Projects that do not use the new Frontmatter system should still receive the core workflow rules seamlessly.
- **Fail-Safe**: If an MCP check fails, the DeukRag rules must gracefully degrade (not throw an error that stops initialization).

## ❓ Open Questions
1. **Condition Evaluation**: For `DeukRag`, should we check the presence of the `mcp-server` configuration in the user's IDE config (e.g., `claude_desktop_config.json` or `config.yaml`), or rely on a simple `.deuk-agent-rule.config.json` flag?
2. **Frontmatter Parser**: We will need a lightweight Frontmatter parser (like `gray-matter` or a simple Regex fallback) in the CLI scripts. Is adding a small dependency acceptable, or should we use Regex?

## Merged Legacy Document


### 045 report

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
