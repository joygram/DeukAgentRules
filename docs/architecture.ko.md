# 아키텍처 (v3.0)

DeukAgentRules v3.0은 AI 에이전트 워크플로우의 절대적인 일관성과 효율성을 보장하기 위해 **Hub-Spoke 아키텍처**와 **Global Execution Proxy**를 도입했습니다.

## 1. Hub-Spoke 아키텍처

v3 모델에서 저장소 루트의 **`AGENTS.md`**는 **Hub**(단일 진실 공급원, SSoT) 역할을 하며, IDE별 규칙 파일(예: `.cursor/rules/*.mdc`)은 **Spoke**(최소한의 진입점) 역할을 합니다.

![Hub-Spoke 아키텍처](assets/architecture-v3.png)

### 핵심 원칙
- **SSoT (Single Source of Truth)**: 모든 운영 규칙은 `AGENTS.md`에 정의됩니다.
- **경량 Spoke**: IDE 규칙은 내용을 중복해서 담지 않으며, 에이전트가 Hub를 읽도록 유도하는 포인터 역할만 수행합니다.
- **Zero-Legacy**: `init` 명령은 구세대(v1/v2)의 잔재를 물리적으로 제거하여 깨끗한 상태를 유지합니다.

## 2. Global CLI Proxy (Kind: Src)

`npx` 사용 시 발생하는 '스테일 타르볼(Stale Tarball)' 문제를 해결하기 위해 v3.0은 **Global Proxy**를 구현했습니다.

### 작동 원리:
1. `npx deuk-agent-rule` 실행 시, 패키지의 글로벌 엔트리 포인트(`bin/deuk-agent-rule.js`)가 구동됩니다.
2. 현재 디렉터리와 상위 디렉터리를 스캔하여 **로컬 워크스페이스 소스**(`DeukAgentRules/scripts/cli.mjs`)를 자동으로 찾습니다.
3. 소스가 발견되면 모든 명령을 로컬 소스로 **투명하게 위임(Routing)**합니다.
4. 이를 통해 에이전트가 레지스트리의 캐시된 버전이 아닌, 현재 개발 중인 최신 로컬 규칙을 항상 사용하도록 보장합니다.

## 3. 초기화 생명주기 (Init Lifecycle)

1. **`migrateLegacyStructure`**: 이전 세대의 디렉터리 구조를 정리하거나 이름을 변경합니다.
2. **`cleanSubmoduleStubs`**: 빈 서브모듈 스텁과 `.gitmodules`의 고립된 항목을 찾아 제거합니다.
3. **`deploySpokePointers`**: Hub를 가리키는 경량 Spoke 파일들을 생성합니다.
4. **`Smart Backup`**: 레거시 `.cursorrules`를 분석하여 사용자 커스텀 규칙이 있을 경우에만 `.bak`을 생성합니다.
