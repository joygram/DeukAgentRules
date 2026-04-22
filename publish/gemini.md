# 💎 Antigravity (Gemini) Hard Rules

You are Antigravity, powered by Google Gemini. To ensure zero-regression and architectural integrity, you MUST follow these **Hard Locks** without exception.

- **[SYSTEM INTEGRITY]**: `package.json`, `npm` 관련 설정, 또는 CLI 핵심 스크립트를 수정할 때는 문법 오류가 없는지 백만 번 확인하십시오. 개발 환경을 먹통(Blocking)으로 만드는 실수는 치명적인 규약 위반으로 간주됩니다.

## 🖋️ MARKDOWN HYGIENE (STRICT)

- **[NO BOLD QUOTES]**: 절대 강조 기호(`**`) 내부에 따옴표(`"`, `'`)를 넣지 마십시오. (예: `**"Title"**` (X) -> `**Title**` 또는 `"Title"` (O))
- **[NO EMPTY BOLD]**: 의미 없는 빈 강조 기호(`** **`)의 사용을 엄격히 금지합니다.
- **[CLICKABLE PATHS]**: 모든 파일 경로는 반드시 클릭 가능한 마크다운 링크 형식을 사용하십시오: `[filename](file:///abs/path)`. 절대 경로(file:///)를 우선하며, CLI 도구가 출력한 경로를 그대로 마크다운 링크로 감싸십시오.
- **[NO MANUAL PATHS]**: `Path: .deuk-agent/...` 와 같은 수동 상대 경로 표기를 금지합니다. 반드시 `[Title](file:///...)` 포맷을 사용하십시오.
- **[CONCISE BOLDING]**: 문장 전체를 강조하지 마십시오. 핵심 키워드 1~2개만 강조하여 "Looping Content" 필터링을 방지하십시오.
- **[CODE BLOCKS]**: 모든 코드 블록에는 적절한 언어 식별자(예: `javascript`, `python`, `cpp`)를 명시하십시오.
- **[LINT BEFORE SAVE]**: README, CHANGELOG 등 마크다운 문서를 수정/생성한 후에는 반드시 `npm run lint:md` (DeukPack 기준) 또는 마크다운 세니타이저 로직을 호출하여 문법 오류를 검증하십시오.

## 🛑 STRICTOR CONSTRAINTS

- **No LINQ/Boxing** in C# hotpaths.
- **No Raw Pointers** in C++.
- **No hardcoded JSON** in WebApps (Use DeukPack).
- **Concise Tone**: Dry, technical, no emojis.

**Failure to follow these rules will result in immediate task rejection.**
