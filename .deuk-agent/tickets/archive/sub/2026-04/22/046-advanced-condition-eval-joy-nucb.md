 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 2 0 1 : 1 8 : 4 8 i d : 0 4 6 - a d v a n c e d - c o n d i t i o n - e v a l - j o y - n u c b p r i o r i t y : P 3 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : c l o s e d s u m m a r y : " T a r g e t S u b m o d u l e : [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E R U L E T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] " t a g s : r a g , m c p , t i c k e t s , a r c h i t e c t u r e , p e r f o r m a n c e t i t l e : 0 4 6 - a d v a n c e d - c o n d i t i o n - e v a l - - - # [ E x e c u t i o n ] T a s k : 0 4 6 - a d v a n c e d - c o n d i t i o n - e v a l | I D : 0 4 6 - a d v a n c e d - c o n d i t i o n - e v a l - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > Y o u a r e o p e r a t i n g w i t h i n a l o c k e d m u l t i - m o d u l e m o n o r e p o . > 1 . R e s t r i c t a b s o l u t e l y a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * [ T a r g e t S u b m o d u l e ] * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * [ C o n t e x t F i l e s ] * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r s u b m o d u l e s . # # � � S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - * * C o n t e x t F i l e s : * * - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E _ R U L E _ T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] # # � � F i l e s t o M o d i f y - p a t h / f r o m / r o o t / t o / t a r g e t 1 : [ S p e c i f i c i n s t r u c t i o n s . D o n ' t w r i t e ' r e f a c t o r ' , d e s c r i b e W H A T t o r e f a c t o r . ] # # � � ️ D e s i g n D e c i s i o n s ( R e f e r t o P l a n ) - * * A r c h i t e c t u r e * * : P a r s i n g D e u k R a g c o n f i g . y a m l t o a c c u r a t e l y d e t e c t m a n a g e d p r o j e c t s . # # � � S t r i c t C o n s t r a i n t s ( R u l e s t o n e v e r b r e a k ) - [ e . g . , N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s ] # # � � P h a s e d E x e c u t i o n S t e p s > A g e n t : D o N O T a t t e m p t t o d o P h a s e 3 b e f o r e P h a s e 1 i s f u l l y t e s t e d . 0 . [ P h a s e 0 > R A G R e s e a r c h ( M C P ) ] - [ ] m c p _ d e u k r a g _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ ] m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : 0 . 5 [ P h a s e 0 . 5 > D e e p A n a l y s i s ( O p t i o n a l ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > S e t u p / P a r s i n g ] 2 . [ P h a s e 2 > C o r e L o g i c C h a n g e ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 3 . [ P h a s e 3 > C l e a n u p / V e r i f i c a t i o n ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | | | | | 4 . [ P h a s e 4 > F o l l o w - u p C h a i n i n g ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 을 차 기 티 켓 으 로 발 행 및 기 록 # # ✅ V e r i f i c a t i o n / Q A - [ ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ ] * * P o t e n t i a l I s s u e s C h e c k * * : [ I d e n t i f y s i d e e f f e c t s , e d g e c a s e s , o r p e r f o r m a n c e i m p a c t s ] - [ ] * * S t r i c t C o n s t r a i n t s A u d i t * * : [ N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s , e t c . ] - [ ] n p m r u n t e s t 또 는 관 련 검 증 명 령 실 행 결 과 확 인

## Merged Legacy Document


### 046 plan

# [Deep Analysis] 고도화된 Frontmatter 조건(Condition) 평가 아키텍처

## 🎯 Background & Problem Statement
앞서 도입한 Frontmatter 기반 동적 룰 조립(`cli-rule-compiler.mjs`)에서, 특정 룰이 주입되어야 하는지 판단하는 `evaluateCondition` 로직은 현재 임시 방편(Heuristic)으로 구현되어 있습니다.
- **현재 로직**: `cwd`의 부모 디렉토리에 `DeukRag` 폴더가 있는지 단순 확인하거나 무조건 `true`를 반환.
- **문제점**: 실제 해당 프로젝트가 DeukRag의 관리 대상(인덱싱 대상)인지 알 수 없으며, 환경에 따라 오작동(False Positive/Negative)할 위험이 높습니다. DeukRag가 연동되지 않은 프로젝트에도 하드 룰이 강제 주입될 수 있습니다.

## 🕵️‍♂️ Deep Analysis: Source of Truth 탐색
MCP 서버 설정은 사용하는 AI 에이전트(Cursor, Claude, Windsurf 등)마다 파편화되어 있어 에이전트 설정 파일을 파싱하는 것은 비효율적이며 유지보수가 어렵습니다.

대신, **DeukRag 엔진 자체의 설정 파일**이 가장 확실한 Source of Truth임이 확인되었습니다.
- **경로**: `/home/joy/workspace/DeukRag/.local/config.yaml`
- **구조**:
  ```yaml
  projects:
    - name: "DeukPack"
      path: "/home/joy/workspace/i/DeukPack"
    - name: "DeukAgentRules"
      path: "/home/joy/workspace/i/DeukAgentRules"
  ```
해당 YAML의 `projects` 배열에 현재 작업 중인 `cwd`가 등록되어 있다면, 해당 프로젝트는 확실하게 DeukRag MCP의 관리 하에 있다고 판정할 수 있습니다.

## 🏗️ Proposed Architecture

### 1. DeukRag Config Parser 도입 (`cli-rule-compiler.mjs`)
- **yaml 의존성 활용**: 이미 `DeukAgentRules`의 `package.json`에 포함되어 활용 중인 `yaml` 패키지를 사용하여 `DeukRag/.local/config.yaml`을 파싱합니다.
- **경로 탐색**:
  - 기본적으로 `DEUKRAG_HOME` 환경 변수를 확인합니다.
  - 없다면 현재 `cwd`에서 최상위 `workspace` 루트를 찾아, 그 하위의 `DeukRag/.local/config.yaml`을 스캔하는 fallback 로직을 구현합니다.

### 2. 조건 평가(Condition Evaluation) 로직 재작성
```javascript
function evaluateCondition(condition, cwd) {
  if (condition.mcp === "deukrag") {
     const ragConfig = resolveDeukRagConfig(cwd);
     if (!ragConfig) return false;

     // config.projects 배열에서 cwd가 등록되어 있는지 확인
     const isManaged = ragConfig.projects.some(p => isSubPathOf(cwd, p.path));
     return isManaged;
  }
  return true;
}
```

### 3. 유연한 조건식 확장성 확보
향후 다음과 같은 조건식도 처리할 수 있도록 확장성을 고려합니다.
- `file_exists: "package.json"` (Node 프로젝트 감지)
- `has_dependency: "unity"` (Unity 프로젝트 감지)

### 4. CLI 티켓 & 플랜 자동 스캐폴딩 (User Feedback 반영)
기존에는 티켓과 플랜을 별도로 생성하고 수동으로 연결해야 했습니다. 이를 개선하여 `npx deuk-agent-rule ticket create` 실행 시 다음 작업을 한 번에 자동화합니다.
- `PLAN_TEMPLATE.md`를 기반으로 `merged into this ticket` 자동 생성.
- `TICKET_TEMPLATE.md`의 `[Link to Plan Document]` 텍스트를 방금 생성된 플랜 파일의 `file:///` 절대 경로 링크로 자동 치환.

## 🛑 User Review Required
> [!IMPORTANT]
> **Q. DeukRag 설정 파일의 경로 탐색 전략**
> 위 설계에서는 `cwd`에서 상위로 올라가며 `DeukRag/.local/config.yaml`을 찾는 방식을 제안했습니다. 만약 다른 환경에서 `DeukRag` 폴더명이 다르거나 위치가 완전히 분리되어 있다면 환경 변수(`DEUKRAG_HOME` 등) 세팅을 강제하는 것이 좋을지, 현재의 상대 경로 탐색만으로 충분할지 피드백 부탁드립니다.

## 🔄 Verification Plan
1. `cli-rule-compiler.mjs`에 YAML 파싱 로직 적용.
2. `DeukPack` (config.yaml에 등록됨)에서 `init` 실행 -> **DeukRag 룰 주입 확인**.
3. `config.yaml`에 등록되지 않은 임의의 빈 폴더에서 `init` 실행 -> **DeukRag 룰 배제 확인**.

## Merged Legacy Document


### 046 report

# [Verification] Completion Report: CLI Automation & Advanced Conditions

## 📦 Changes Summary
- **DeukRag Config Parsing**: `cli-rule-compiler.mjs` 내에 `resolveDeukRagConfig` 함수를 구현하여, 현재 워크스페이스 내에서 `DeukRag/.local/config.yaml`을 스캔하고 파싱하는 로직을 추가했습니다.
- **Robust Condition Evaluation**: `mcp: deukrag` 조건을 평가할 때, 위에서 파싱한 `config.yaml`의 `projects[].path` 목록과 현재 작업 중인 `cwd`를 엄격히 대조하여 실제 인덱싱 대상 프로젝트에만 룰이 주입되도록 정확도를 높였습니다.
- **Automated CLI Scaffolding**: 사용자의 피드백을 수용하여 `ticket create` 명령 실행 시 `PLAN_TEMPLATE.md` 기반의 플랜 파일이 자동 생성되고, 티켓 본문 내의 `[Link to Plan Document]`가 새 플랜 파일의 `file:///` 절대 경로 링크로 자동 치환되도록 EJS 렌더러와 로직을 업그레이드했습니다.

## ✅ Verification Results
- [x] **Config Parsing Verification**: `yaml` 모듈을 통한 `DeukRag/.local/config.yaml` 파싱 정상 동작 및 `isManaged` 평가 로직 검증 완료.
- [x] **CLI Automation Test**: 더미 티켓 생성 테스트(`047-test-scaffold`)를 통해 티켓 파일과 플랜 파일이 동시에 스캐폴딩되며, 티켓 본문에 링크가 정확히 주입되는 것을 육안으로 확인했습니다.
- [x] **Template Integrity**: `TICKET_TEMPLATE.md`에 누락되었던 심층 분석 검증(QA/Verification) 항목이 추가된 버전을 전체에 재배포했습니다.

## 🔗 Commits
- `a7cb189` feat(cli): parse DeukRag config for conditions and auto-scaffold plan templates
