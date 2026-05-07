# DeukAgentFlow 전환 절차

이 문서는 `DeukAgentRules`를 `DeukAgentFlow` 브랜드로 전환할 때, GitHub stars를 유지하고 npm 사용자 호환성을 깨지 않으면서 진행하는 실행 절차를 정리한 문서다.

## 목표

- GitHub 저장소를 `joygram/DeukAgentRules`에서 `joygram/DeukAgentFlow`로 rename한다.
- npm은 새 primary 패키지 `deuk-agent-flow`를 도입한다.
- 기존 `deuk-agent-rule` 사용자는 계속 설치/업데이트 가능하게 유지한다.
- README, 배지, repository metadata, release flow를 새 브랜드 기준으로 정렬한다.

## 핵심 원칙

- GitHub stars를 유지하려면 새 저장소를 만드는 것이 아니라 기존 저장소 자체를 rename해야 한다.
- npm 패키지명은 GitHub처럼 redirect되지 않으므로 `deuk-agent-rule`을 즉시 제거하면 안 된다.
- 전환은 "코드 호환 패치 -> metadata 정리 -> GitHub rename -> npm 듀얼 publish -> 안내 강화" 순서로 진행한다.
- old slug인 `joygram/DeukAgentRules`는 rename 후 다시 새 repository로 만들지 않는다.

## 현재 기준 결정사항

- GitHub는 기존 저장소 rename 전략을 사용한다.
- npm은 `deuk-agent-flow`와 `deuk-agent-rule` 듀얼 운영으로 간다.
- 다운로드 지표는 커스텀 합산 배지로 노출한다.
- `deuk-agent-workflow`는 중간 후보였으나 메인 이름이 아니므로 패키지, 문서, 배포 스크립트에서 사용하지 않는다.

## 단계별 실행 절차

### 1. 사전 정리

- `deuk-agent-flow` npm 이름이 비어 있는지 다시 확인한다.
- 외부 GitHub Action `uses: joygram/DeukAgentRules@...` 의존성이 없는지 확인한다.
- GitHub Pages, raw GitHub URL, npm metadata, README badge endpoint처럼 repo slug에 의존하는 위치를 점검한다.
- rename 직후 검증할 체크리스트를 먼저 준비한다.

### 2. 코드베이스 호환 패치

- 내부 코드가 `DeukAgentRules`와 `DeukAgentFlow`를 모두 이해하도록 먼저 수정한다.
- 특히 로컬 source proxy, workspace 이름 탐색, OSS sync 기본 repo URL, README 링크, package metadata를 점검한다.
- 새 브랜드 배지와 문구를 먼저 넣어도 괜찮지만, legacy package 지원 문구는 유지한다.

이 단계의 목적은 GitHub rename 이전에도 코드와 문서가 전환을 받아들일 수 있게 만드는 것이다.

### 3. npm 배포 구조 정리

- `deuk-agent-flow`를 새 primary 패키지로 publish할 준비를 한다.
- `deuk-agent-rule`은 legacy compatibility package로 계속 유지한다.
- 가능하면 두 패키지가 같은 버전 정책을 따르게 맞춘다.
- README 기본 설치 예시는 점진적으로 `deuk-agent-flow` 중심으로 옮긴다.

권장 정책:

- `deuk-agent-flow`: primary install path
- `deuk-agent-rule`: backward compatibility path

### 4. 문서와 배지 정렬

- README, npm description, GitHub About 문구를 `DeukAgentFlow` 기준으로 재정렬한다.
- 다운로드 수치는 `deuk-agent-flow`와 `deuk-agent-rule`를 합산한 custom badge로 노출한다.
- version badge는 primary package인 `deuk-agent-flow` 기준으로 두고, legacy package는 compatibility 표기로 분리한다.

이미 준비된 합산 배지 구조:

- `docs/badges/npm-downloads.json`
- `scripts/update-download-badge.mjs`
- `.github/workflows/update-download-badge.yml`

### 5. GitHub 저장소 rename

GitHub에서 기존 repository를 직접 rename한다.

- Before: `joygram/DeukAgentRules`
- After: `joygram/DeukAgentFlow`

이 방식이면 stars, issues, release history, repository identity가 유지된다.

rename 직후 주의사항:

- old slug를 새 repo로 재생성하지 않는다.
- team/local clone의 remote URL을 새 주소로 업데이트한다.
- README와 npm metadata의 repository/homepage/bugs 링크를 새 slug로 맞춘다.

### 6. npm publish

권장 순서:

1. `deuk-agent-flow` publish
2. `deuk-agent-rule` publish 또는 republish
3. 둘의 README/description을 새 브랜드 기준으로 정렬

중요한 점:

- npm 패키지명은 rename이 아니라 새 패키지 publish다.
- `deuk-agent-rule`은 당분간 유지해야 설치 경로가 깨지지 않는다.
- 당장 `npm deprecate`를 걸 필요는 없다. 새 package가 안정화된 뒤 검토한다.

### 7. rename 직후 검증

다음 항목을 바로 확인한다.

- GitHub repository landing page가 `joygram/DeukAgentFlow`로 정상 노출되는지
- 기존 `joygram/DeukAgentRules` 링크가 redirect되는지
- README badge가 정상 렌더링되는지
- `package.json`의 `repository`, `bugs`, `homepage` 링크가 새 URL을 가리키는지
- release workflow가 새 repository에서도 정상 동작하는지
- `npm install -g deuk-agent-flow`가 정상 동작하는지
- `npm install -g deuk-agent-rule`도 계속 정상 동작하는지

### 8. 전환 안내 강화

README와 npm 설명에 다음 메시지를 분명히 남긴다.

- primary package is now `deuk-agent-flow`
- legacy package `deuk-agent-rule` remains supported for compatibility

필요하면 이후 단계에서만 `deuk-agent-rule`에 deprecate 메시지를 추가한다.

## 체크리스트

### rename 전

- `deuk-agent-flow` npm 이름 확인
- 외부 GitHub Action dependency 확인
- repo slug 의존 링크 목록 점검
- source proxy와 OSS sync 경로 점검
- README/배지 구조 준비

### rename 직후

- GitHub redirect 확인
- npm metadata URL 수정 확인
- README badge 렌더링 확인
- release workflow 확인
- local remote URL 갱신

### publish 직후

- `deuk-agent-flow` 설치 확인
- `deuk-agent-rule` 설치 확인
- 합산 다운로드 배지 반영 확인
- README 설치 예시와 실제 배포 상태 일치 확인

## 권장 최종 상태

- GitHub repo: `joygram/DeukAgentFlow`
- Primary npm: `deuk-agent-flow`
- Legacy npm: `deuk-agent-rule`
- 다운로드 노출: combined custom badge
- 브랜드 문구: `DeukAgentFlow`
- 호환성 문구: `deuk-agent-rule remains supported`

## 리스크 메모

- GitHub rename은 stars 유지 측면에서는 안전하지만, old slug 재사용 시 redirect가 깨질 수 있다.
- npm은 redirect가 없어서 legacy package 제거가 가장 큰 호환성 리스크다.
- 새 primary package가 publish되기 전까지는 version badge나 install example이 실제 배포 상태와 어긋날 수 있으니 순서를 맞춰야 한다.
- raw GitHub URL을 README badge endpoint에 쓰는 경우, rename 이후 branch와 path가 실제 공개 repo 구조와 일치해야 한다.
