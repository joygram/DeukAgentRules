# 릴리스

1. 필요 시 [`publish/`](publish/) 템플릿 수정.
2. [`package.json`](package.json)의 `version` 상향.
3. `npm pack`으로 tarball·`bundle/` 내용 확인(`prepack`에서 `sync-bundle` 실행).
4. `npm publish --access public` (패키지 이름 권한 확인).
5. 선택: GitHub Releases에서 `vX.Y.Z` 태그 및 릴리스 노트.
