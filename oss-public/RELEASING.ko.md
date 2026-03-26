# 릴리스

1. 필요 시 [`publish/`](publish/) 템플릿 수정. 히스토리는 [Conventional Commits](https://www.conventionalcommits.org/) 형식(`feat:`, `fix:`, `docs:` 등)을 쓰면 `npm run bump:*` 시 [commit-and-tag-version](https://github.com/conventional-changelog/commit-and-tag-version)이 **[`CHANGELOG.md`](CHANGELOG.md)를 커밋 메시지로부터 갱신**한다(커밋에 안 담기는 설명만 수동 편집).
2. 버전·**Git 태그**를 한 번에: `prebump`에서 `npm run sync` 후 `CHANGELOG.md`·`package.json`·`package-lock.json` 반영·커밋·태그.
   - `npm run bump:patch` — 또는 `bump:minor` / `bump:major` — 또는 커밋 메시지로 단계를 맞추려면 `npm run bump`
   - 태그 `vX.Y.Z`는 [`package.json`](package.json)과 일치(CI 검증).
3. `git push && git push --tags`
4. 모노레포 미러: 이 패키지 루트에서 `npm run sync:oss` 후 `DeukAgentRulesOSS/` 커밋·푸시(또는 공개 클론에 반영).
5. 필요 시 `npm pack`으로 tarball·`bundle/` 확인(`prepack`에서 `sync-bundle` 실행).
6. `npm publish --access public` (패키지 이름 권한 확인).
7. `vX.Y.Z` 푸시 시 워크플로가 npm tarball을 붙임; 릴리스 노트는 선택.
