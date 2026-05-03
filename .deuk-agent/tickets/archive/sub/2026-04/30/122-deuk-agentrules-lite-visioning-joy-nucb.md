 - - - i d : 1 2 2 - d e u k - a g e n t r u l e s - l i t e - v i s i o n i n g - j o y - n u c b t i t l e : d e u k - a g e n t r u l e s - l i t e - v i s i o n i n g p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : D o c u m e n t p l u g i n a n d s k i l l b a s e d a c c e s s i b i l i t y v i s i o n f o r D e u k A g e n t R u l e s i n t e r n a l d e v e l o p m e n t p r i o r i t y : h i g h t a g s : - v i s i o n - a c c e s s i b i l i t y - p l u g i n - s k i l l - d i s t r i b u t i o n c r e a t e d A t : 2 0 2 6 - 0 4 - 3 0 2 3 : 5 5 : 3 6 - - - # d e u k - a g e n t r u l e s - l i t e - v i s i o n i n g > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * C o n t e x t F i l e s : * * c o r e - r u l e s / A G E N T S . m d , P R O J E C T _ R U L E . m d , R E A D M E . m d , d o c s / h o w - i t - w o r k s . m d - * * D e s i g n R a t i o n a l e : * * 접 근 성 향 상 을 위 해 D e u k A g e n t R u l e s 를 s k i l l / p l u g i n 진 입 점 이 있 는 L i t e 레 이 어 와 기 존 C L I 기 반 F u l l 레 이 어 로 분 리 하 는 내 부 방 향 을 문 서 화 한 다 . - * * C o n s t r a i n t s : * * 코 드 동 작 변 경 없 이 내 부 개 발 문 서 와 티 켓 문 서 만 수 정 한 다 . 생 성 물 규 칙 과 H u b - S p o k e 아 키 텍 처 를 깨 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - F o r b i d d e n m o d u l e s : c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / , s c r i p t s / , b i n / d e u k - a g e n t - r u l e . j s - R u l e c i t a t i o n : D C - C O D E G E N , D C - O S S , T D W P h a s e 1 p l a n a r t i f a c t r e q u i r e m e n t # # # [ C O N T R A C T ] - I n p u t : K a r p a t h y - s t y l e s k i l l / p l u g i n 배 포 방 식 과 D e u k A g e n t R u l e s 의 접 근 성 개 선 요 구 - O u t p u t : 내 부 비 저 닝 문 서 1 건 과 그 에 맞 는 티 켓 A P C / 작 업 정 의 - S i d e e f f e c t s : l e g a c y p l a n d o c 신 규 계 획 문 서 생 성 , 해 당 t i c k e t 의 A P C 와 t a s k 갱 신 # # # [ P A T C H P L A N ] - p l a n 문 서 f r o n t m a t t e r 와 본 문 을 내 부 비 저 닝 문 서 형 식 으 로 작 성 한 다 . - t i c k e t A P C 를 실 제 수 정 범 위 와 산 출 물 기 준 으 로 채 운 다 . - m a r k d o w n l i n t 로 t i c k e t 과 p l a n 문 서 를 함 께 검 증 한 다 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] L i t e 접 근 성 배 포 비 전 문 서 를 작 성 한 다 . - [ x ] 스 킬 , 플 러 그 인 , C L I 의 역 할 분 리 원 칙 을 문 서 화 한 다 . - [ x ] t i c k e t 과 p l a n 문 서 에 대 해 m a r k d o w n l i n t 를 통 과 시 킨 다 . # # D o n e W h e n # # V e r i f i c a t i o n # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 2 2 - d e u k - a g e n t r u l e s - l i t e - v i s i o n i n g - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 122 deuk agentrules lite visioning joy nucb plan

# 목표

DeukAgentRules의 강한 워크플로 통제력은 유지하되, 초회 사용자와 소규모 팀이 더 쉽게 진입할 수 있도록 배포 접근성을 단계적으로 개선한다.

# 문제 정의

현재 DeukAgentRules의 기본 진입점은 `npm` CLI와 `init`, `ticket`, `lint:md` 중심이다. 이 구조는 강력하지만 다음과 같은 접근성 비용이 있다.

1. 사용자는 설치 전에 개념을 많이 이해해야 한다.
2. 작은 프로젝트나 개인 사용자는 전체 TDW를 즉시 받아들이기 어렵다.
3. "일단 꽂아서 써보기" 경험이 부족하다.

반면 Karpathy 계열 배포는 `SKILL.md`와 plugin metadata만으로 가볍게 도입할 수 있어 진입 허들이 낮다.

# 비전

DeukAgentRules를 단일 무게의 배포물이 아니라, 서로 연결된 두 레이어로 제공한다.

1. Lite
- 목적: 접근성, 빠른 체험, 행동 규칙 온보딩
- 형태: `SKILL.md` + plugin metadata
- 범위: AGENTS 우선 읽기, 최소 변경 원칙, Hub-Spoke 이해, TDW 개요, Full 모드 진입 안내

2. Full
- 목적: 강제 가능한 운영, 티켓 구동, 계획 게이트, lint와 아카이브
- 형태: 기존 `deuk-agent-rule` CLI + templates + core rules
- 범위: 현재 DeukAgentRules의 본체 기능 전체

# 설계 원칙

1. Lite는 Full의 대체재가 아니다.
- Lite는 진입점이다.
- 강제력 있는 phase gate, ticket lifecycle, artifact lint는 Full에 남긴다.

2. 규칙의 단일 진실 공급원은 유지한다.
- Hub-Spoke 구조는 그대로 유지한다.
- Lite 문구도 가능하면 `core-rules/AGENTS.md`와 충돌하지 않도록 파생 요약본이어야 한다.

3. 생성물과 원본의 경계를 지킨다.
- `DC-CODEGEN` 원칙에 따라 소비자 배포 산출물은 여전히 source에서 파생되어야 한다.
- Lite용 plugin/skill 파일도 별도 source-of-truth 전략이 필요하다.

4. 공개 배포 경로는 OSS 동기화 규칙과 합쳐 설계한다.
- `DC-OSS`에 맞춰 공개용 산출물과 내부용 문서를 분리한다.
- plugin metadata는 OSS에 포함 가능한 최소 정보만 노출한다.

# 제안 구조

1. Lite artifact
- `skills/deuk-agentrules-lite/SKILL.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- 필요 시 Cursor/Claude용 얇은 entry 문서

2. Full artifact
- 기존 `package.json`
- `scripts/`
- `templates/`
- `core-rules/AGENTS.md`

3. 연결 방식
- Lite 문서는 "더 강한 운영 통제가 필요하면 Full CLI 설치"를 안내한다.
- Full README는 "빠른 체험은 Lite plugin/skill부터" 경로를 함께 제공한다.

# 외부 skill 분석 요약

Karpathy 저장소의 실제 강점은 규칙 내용 자체보다도, 같은 내용을 여러 소비 경로에 맞게 얇게 포장해 둔 배포 구조에 있다.

1. 다중 진입점 제공
- `CLAUDE.md`
- `.cursor/rules/karpathy-guidelines.mdc`
- `skills/karpathy-guidelines/SKILL.md`
- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

2. 즉시 적용성
- Cursor rule은 `alwaysApply: true`로 바로 동작한다.
- Claude 계열은 plugin 설치 또는 `CLAUDE.md` 복사만으로 시작 가능하다.

3. 소비자 중심 문서화
- `README.md`는 설치 경로를 도구별로 나눠 설명한다.
- `CURSOR.md`는 Cursor 사용법만 별도로 분리해 진입 비용을 낮춘다.
- `EXAMPLES.md`는 추상 원칙을 실제 실패/개선 예시로 번역한다.

4. 동기화 책임의 명시
- 규칙 원문이 여러 파일에 중복되지만, `CURSOR.md`에서 어떤 파일들을 함께 맞춰야 하는지 명시한다.

# DeukAgentRules 보완 포인트

1. 소비 경로별 entry artifact 추가
- 현재 DeukAgentRules는 `init`와 CLI가 강하고, "그냥 꽂아보기" artifact가 약하다.
- Lite 배포에서는 도구별 entry 파일을 명시적으로 제공해야 한다.

2. 예시 중심 문서 추가
- 현재 문서는 아키텍처와 프로토콜 설명은 강하지만, 실제 사용 장면 예시가 상대적으로 약하다.
- `EXAMPLES.md` 성격의 문서가 있으면 규칙의 체감 이해도가 올라간다.

3. 동기화 자동화 필요
- Karpathy 저장소는 규모가 작아 수동 동기화 공지가 가능하다.
- DeukAgentRules는 규칙 허브가 크므로 수동 동기화에 의존하면 drift 위험이 크다.
- Lite artifact는 가능한 한 source-generated 방식 또는 sync 검사 스크립트가 필요하다.

4. 제품 메시지 분리 필요
- 현재 메시지는 orchestration, TDW, control plane 중심이다.
- 접근성 관점에서는 "Lite는 빠른 시작", "Full은 강한 운영 통제"라는 제품 메시지를 따로 세워야 한다.

# 권장 보완안

1. Lite artifact generator 추가
- 목표: 허브 원문에서 Lite용 요약 산출물을 생성한다.
- 후보: `scripts/cli-rule-compiler.mjs` 확장 또는 별도 generator
- 산출물: `SKILL.md`, plugin metadata, Cursor/Claude용 얇은 진입 파일

2. Lite message pack 도입
- 목표: 초보 사용자가 읽을 최소 메시지를 분리한다.
- 내용: AGENTS 우선 읽기, 무엇이 Lite/Full에서 가능한지, 언제 Full로 넘어가야 하는지

3. Examples 문서 신설
- 목표: TDW와 phase gate가 왜 필요한지 구체 사례로 설명한다.
- 예시: 무티켓 수정 방지, 생성물 직접 수정 방지, plan gate 필요 사례

4. Tool-specific onboarding 문서 추가
- 목표: Cursor, Claude, Codex 계열 사용자가 자기 경로만 빠르게 찾게 한다.
- 후보 파일: `docs/onboarding-lite.md`, `docs/onboarding-cursor.md`, `docs/onboarding-claude.md`

5. Drift guard 추가
- 목표: Lite artifact와 허브 규칙 사이의 불일치를 감지한다.
- 방식: 빌드 또는 테스트에서 요약 산출물 해시/문구 검증

6. 배포 계층 명문화
- 목표: 기능과 책임을 혼동하지 않게 한다.
- 정의:
  - Lite = behavioral onboarding + accessible entry
  - Full = enforceable workflow governance

# 사용자 경험 목표

1. 신규 사용자는 5분 안에 Lite를 설치하고 핵심 규칙을 체험할 수 있다.
2. 팀 사용자는 Lite에서 시작해 Full로 자연스럽게 승급할 수 있다.
3. 기존 사용자에게는 Full 기능 회귀가 없어야 한다.

# 단계별 실행안

1. 문서 단계
- Lite와 Full의 역할 차이를 README와 내부 문서에 먼저 명시한다.
- 접근성 목적의 분리라는 점을 제품 메시지로 정리한다.

2. 패키징 단계
- plugin metadata와 `SKILL.md` 초안을 추가한다.
- Lite artifact가 기존 CLI 배포와 충돌하지 않도록 파일 배치 원칙을 정한다.

3. 정합성 단계
- Lite 문구와 `core-rules/AGENTS.md` 간 충돌 검토 절차를 둔다.
- OSS sync에 포함할 파일과 제외할 파일을 명확히 한다.

4. 출시 단계
- "Lite로 시작, Full로 확장" 가이드를 README에 반영한다.
- 설치 예시를 Claude/Cursor 기준으로 각각 제공한다.

# 비목표

1. Lite만으로 Full의 phase gate를 재현하지 않는다.
2. 기존 CLI 아키텍처를 plugin 중심으로 재작성하지 않는다.
3. rule source를 여러 곳으로 분산하지 않는다.

# 검증 기준

1. 내부 문서만 읽고도 Lite와 Full의 역할 차이를 설명할 수 있어야 한다.
2. plugin/skill 도입이 DeukAgentRules의 핵심 정체성을 약화시키지 않아야 한다.
3. 후속 구현 티켓이 Lite artifact 추가와 README 연동으로 자연스럽게 쪼개져야 한다.

# 후속 티켓 후보

1. Lite plugin metadata skeleton 추가
2. `skills/deuk-agentrules-lite/SKILL.md` 초안 작성
3. README에 Lite/Full 온보딩 섹션 추가
4. Lite artifact generator 또는 sync check 설계
5. examples 문서 초안 작성

## Merged Legacy Document


### 122 deuk agentrules lite visioning joy nucb report

# DeukAgentRules Lite/Full 비전 문서 완료 보고서

## 산출물

- `merged into this ticket`

## 내용 요약

- DeukAgentRules를 접근성 중심의 Lite 레이어와 강제 운영 중심의 Full 레이어로 나누는 내부 방향을 정리했다.
- Lite는 `SKILL.md`와 plugin metadata 기반의 빠른 진입점으로 정의했다.
- Full은 기존 CLI, TDW, APC, lint, archive를 포함한 운영 체계로 유지한다고 명시했다.
- 후속 구현 후보로 Lite plugin metadata skeleton, Lite `SKILL.md`, README 온보딩, generator/sync check, examples 문서를 제안했다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/122-deuk-agentrules-lite-visioning-joy-nucb.md `merged into this ticket`: 통과.

## 비범위 준수

- 코드 동작은 변경하지 않았다.
- `core-rules/AGENTS.md`, `templates/`, `scripts/`, `bin/deuk-agent-rule.js`는 이 티켓에서 수정하지 않았다.
- consumer generated spokes 또는 broad regeneration은 실행하지 않았다.
