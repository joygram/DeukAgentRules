# 릴리스

이 문서는 **이 저장소**(배포되는 `deuk-agent-rule` 패키지) 기준이다. **비공개 정본**에서만 쓰는 도구(CHANGELOG 자동화, 미러 스크립트 등)는 그쪽에만 두고, 공개 문서에는 적지 않아도 된다.

1. 필요 시 [`publish/`](publish/) 템플릿 수정. [Conventional Commits](https://www.conventionalcommits.org/)(`feat:`, `fix:`, `docs:` 등)를 쓰면 변경 분류가 쉽다.
2. [`package.json`](package.json)·[`package-lock.json`](package-lock.json)·[`CHANGELOG.md`](CHANGELOG.md)를 올리고, 패키지 버전과 맞는 Git 태그 `vX.Y.Z`를 만든다(CI에서 태그 푸시 시 버전 일치를 검사할 때 필요).
3. **이 원격(GitHub 등)에** 기본 브랜치(`main` 또는 `master`)를 푸시한다(비공개 정본에서만 작업했다면 **여기로 별도 푸시·미러가 없으면 GitHub는 갱신되지 않는다**). 커밋 메시지가 `chore(release):`로 시작하는 **릴리스 커밋**이 **`main`/`master`**에 올라오면 [`.github/workflows/release.yml`](.github/workflows/release.yml)이 돌아가 `npm pack` 후 **GitHub Release**에 tarball을 붙인다. **`v*.*.*` 태그** 푸시도 동일 워크플로를 트리거한다.
4. 필요 시 로컬에서 `npm pack`으로 tarball 확인(`prepack`에서 `sync-bundle` 실행).
5. 준비되면 이 저장소 루트에서 `npm publish --access public`(레지스트리 권한 필요). 자동 publish는 워크플로의 `NPM_TOKEN` 주석 단계를 켜면 된다.
6. GitHub **Releases** — 자동 생성 요약 외에 노트를 더 쓸 수 있다.
