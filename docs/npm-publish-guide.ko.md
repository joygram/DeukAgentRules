# DeukAgentFlow npm 배포 가이드

`deuk-agent-flow`가 본패키지이고 `deuk-agent-rule`은 호환용 alias 패키지다.

## 배포 전 확인

1. `package.json`의 `repository`, `bugs`, `homepage`가 현재 Git 저장소 URL을 가리키는지 확인한다.
2. `packages/deuk-agent-rule/package.json`의 version과 `deuk-agent-flow` dependency가 root version과 같은지 확인한다.
3. 다운로드 배지는 `deuk-agent-flow`를 canonical package로 두고 `deuk-agent-rule`을 alias contribution으로 합산한다.

## 검증 순서

```bash
npm test
npm run smoke:npm:local
npm run publish:dry
```

Docker가 가능한 환경에서는 추가로 실행한다.

```bash
npm run smoke:npm:docker
```

Windows에서는 다음 명령으로 `.cmd` shim 생성까지 확인한다.

```bat
node scripts\smoke-npm-local.mjs
where deuk-agent-flow
where deuk-agent-rule
```

## 실제 배포

root에서 실행한다.

```bash
npm run publish
```

이 명령은 다음 순서로 동작한다.

1. `deuk-agent-rule` alias package metadata를 root package 기준으로 동기화한다.
2. `npm test`를 실행한다.
3. local npm install smoke를 실행한다.
4. `deuk-agent-flow`를 먼저 publish한다.
5. `deuk-agent-rule` alias package를 publish한다.

이미 같은 버전의 `deuk-agent-flow`가 올라갔고 alias만 다시 올려야 하면 다음 명령을 사용한다.

```bash
npm run publish:bootstrap
```

## 배포 후 확인

```bash
npm view deuk-agent-flow version
npm view deuk-agent-rule version
npm install -g deuk-agent-flow
deuk-agent-flow --help
npm install -g deuk-agent-rule
deuk-agent-rule --help
```

다운로드 배지는 필요하면 갱신한다.

```bash
npm run badge:downloads
```
