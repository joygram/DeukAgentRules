# 릴리스

`deuk-agent-rule` 패키지 유지보수 절차:

1. 필요 시 [`publish/`](publish/) 템플릿을 수정한다. [Conventional Commits](https://www.conventionalcommits.org/)(`feat:`, `fix:`, `docs:` 등) 사용을 권장한다.
2. [`package.json`](package.json)·[`package-lock.json`](package-lock.json)·[`CHANGELOG.md`](CHANGELOG.md) 버전을 올리고, 패키지 버전과 같은 Git 태그 `vX.Y.Z`를 만든다(CI가 태그와 버전 일치를 검사한다).
3. 기본 브랜치(`main` 또는 `master`)를 푸시한다. 메시지가 `chore(release):`로 시작하는 릴리스 커밋이 `main`/`master`에 올라가면 [`.github/workflows/release.yml`](.github/workflows/release.yml)이 실행되어 `npm pack` 후 GitHub Release에 tarball을 붙인다. `v*.*.*` 태그 푸시도 동일하게 워크플로를 트리거한다.
4. 로컬에서 `npm pack`으로 tarball을 확인할 수 있다(`prepack`에서 `sync-bundle.mjs` 실행).
5. 준비되면 저장소 루트에서 `npm publish --access public`을 실행한다. 저장소 시크릿에 `NPM_TOKEN`을 넣고 워크플로의 publish 단계 주석을 해제하면 자동 배포할 수 있다.
6. GitHub Releases에서 자동 생성 요약 외에 설명을 추가할 수 있다.
