# DeukAgentRules — OSS 미러 동기화 (내부 전용)

정식 이름은 **DeukAgentRules**이다. npm 패키지 이름은 `deuk-agent-rule`, CLI는 `deuk-agent-rule`을 유지한다.

`DeukAgentRulesOSS/`는 공개 GitHub/npm용 트리를 채우는 **동기화 대상**이다. **공개 저장소에 올라가는 README·RELEASING·GitHub About 문구는 `oss-public/`만** 편집한다(내부·모노레포 표현 금지). About 문구 정본은 **`oss-public/GITHUB_DESCRIPTION.md`** 한 파일뿐이다(모노레포 루트에는 복제하지 않는다).

## 동기화

```bash
cd deuk-agent-rule
npm run sync:oss
```

선택: `DEUK_AGENT_RULES_OSS_REPO=https://github.com/ORG/REPO`

## 산출물

**`DeukAgentRulesOSS/`** 동기화: `MIT` `package.json`, `publish/`, `scripts/`, **루트 `README*.md`**, `oss-public/RELEASING*.md`·`GITHUB_DESCRIPTION`, `LICENSE`. 공개 클론의 `package.json`에는 `merge:dry`·`sync:oss` 없음.

## 유지보수

1. `publish/` 수정 → `npm run sync` (로컬 `bundle/` 갱신)
2. README 수정은 루트 `README.md` / `README.ko.md` 단일 편집 (공개·내부 공용)
3. GitHub About 문구 수정은 `oss-public/GITHUB_DESCRIPTION.md` 단일 편집
4. `npm run sync:oss` → `DeukAgentRulesOSS/` 커밋·푸시 → `npm publish`
