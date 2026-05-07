# 릴리스

Deuk Agent Flow npm 패키지 유지보수 절차:

1. 필요 시 [`publish/`](publish/) 템플릿을 수정한다. [Conventional Commits](https://www.conventionalcommits.org/)(`feat:`, `fix:`, `docs:` 등) 사용을 권장한다.
2. [`package.json`](package.json)·[`package-lock.json`](package-lock.json)·[`CHANGELOG.md`](CHANGELOG.md) 버전을 올리고, 패키지 버전과 같은 Git 태그 `vX.Y.Z`를 만든다(CI가 태그와 버전 일치를 검사한다).
3. 기본 브랜치(`main` 또는 `master`)를 푸시한다. 메시지가 `chore(release):`로 시작하는 릴리스 커밋이 `main`/`master`에 올라가면 [`.github/workflows/release.yml`](.github/workflows/release.yml)이 실행되어 `npm pack` 후 GitHub Release에 tarball을 붙인다. `v*.*.*` 태그 푸시도 동일하게 워크플로를 트리거한다.
4. 로컬에서 `npm pack`으로 tarball을 확인할 수 있다(`prepack`에서 `sync-bundle.mjs` 실행).
5. `npm run publish:dry`로 두 npm 패키지를 registry 쓰기 없이 검증한다.
6. 준비되면 저장소 루트에서 `npm run publish`를 실행한다. 이 명령은 `deuk-agent-rule`을 먼저 배포하고, 이어서 `deuk-agent-flow` 패키지를 배포한다. registry credentials가 필요하다.
7. 이미 현재 버전의 `deuk-agent-rule`이 배포되어 있고 wrapper 패키지만 한 번 도입해야 한다면 `npm run publish:bootstrap:dry` 후 `npm run publish:bootstrap`을 실행한다.
8. GitHub Releases에서 자동 생성 요약 외에 설명을 추가할 수 있다.
