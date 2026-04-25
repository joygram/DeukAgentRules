---
title: Claude Code MCP 연동 설정 가이드
updated: 2026-04-25
---

# Claude Code MCP 연동 설정 가이드

## 개요

Claude Code(Anthropic CLI)는 **터미널 모드**와 **VS Code 플러그인 모드** 두 가지로 사용할 수 있으며,
MCP 서버(DeukAgentContext) 연동 시 각 모드별 설정이 필요합니다.

## 모델과 MCP의 관계

MCP 도구 호출과 모델 선택은 **별개 레이어**입니다.

```
[사용자 요청] → [Claude 모델(추론)] → [MCP 도구 호출(실행)] → [결과 반환]
                  ↑                        ↑
          settings.json의 model       .mcp.json의 서버 설정
          /model 명령                  (도구 스키마 로딩)
          ANTHROPIC_MODEL 환경변수
```

- **모델 선택**: 어떤 LLM이 추론하는지 결정 (haiku, sonnet, opus 등)
- **MCP 설정**: 어떤 도구 서버에 연결하는지 결정

**하지만** 모델과 effortLevel 조합이 MCP 도구 로딩 방식에 영향을 줍니다:

| 모델 | effortLevel | 도구 로딩 방식 | 비고 |
|------|-------------|---------------|------|
| haiku | low | **Deferred (ToolSearch)** | 도구 스키마가 지연 로드됨. haiku가 ToolSearch를 제대로 처리하지 못해 도구 호출 실패 가능 |
| sonnet | medium/high | **Eager** | 도구 스키마가 즉시 로드됨. 정상 동작 |
| opus | high | **Eager** | 도구 스키마가 즉시 로드됨. 정상 동작 |

## 설정 파일 위치

### 전역 설정 (모든 프로젝트에 적용)
- **경로**: `~/.claude/settings.json`
- **용도**: 기본 모델, 테마, effortLevel

### 프로젝트별 MCP 설정
- **경로**: `<프로젝트 루트>/.mcp.json`
- **용도**: 해당 프로젝트에서 사용할 MCP 서버 목록

### 프로젝트별 Claude 설정
- **경로**: `<프로젝트 루트>/.claude/settings.json`
- **용도**: 프로젝트별 모델, 권한 설정 (선택사항)

## 필수 설정

### 1. 전역 모델 설정 변경

현재 `~/.claude/settings.json`:
```json
{
  "model": "haiku",
  "effortLevel": "low",
  "theme": "dark"
}
```

**권장 변경**:
```json
{
  "model": "sonnet",
  "effortLevel": "high",
  "theme": "dark"
}
```

> [!IMPORTANT]
> `haiku` + `low`로 설정하면 MCP 도구가 deferred 상태로 전환되어
> 도구 호출이 아예 실패할 수 있습니다.
> DeukAgentContext 도구를 사용하려면 최소 `sonnet` + `medium` 이상을 권장합니다.

또는 CLI에서 직접 변경:
```bash
# 세션 내에서 모델 변경
/model sonnet

# 환경 변수로 지정
export ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### 2. 프로젝트별 MCP 서버 등록

각 프로젝트 루트에 `.mcp.json` 파일을 생성합니다:

```json
{
  "mcpServers": {
    "deuk-agent-context": {
      "type": "sse",
      "url": "http://localhost:8001/sse"
    }
  }
}
```

**CLI로 등록하는 방법** (권장):
```bash
# 프로젝트 디렉토리에서 실행
claude mcp add --transport sse deuk-agent-context http://localhost:8001/sse
```

**등록 확인**:
```bash
claude mcp list
```

### 3. 현재 프로젝트별 .mcp.json 상태

| 프로젝트 | `.mcp.json` 존재 | 상태 |
|---------|-----------------|------|
| DeukPack | O | 정상 |
| i | X | **등록 필요** |
| DeukAgentContext | X | **등록 필요** |
| DeukUI | X | **등록 필요** |
| DeukAgentRules | X | **등록 필요** |
| apt-guard | X | **등록 필요** |

## 터미널 모드 vs VS Code 플러그인 모드

### 터미널 모드 (`claude` CLI)

```bash
# 기본 실행
claude

# 특정 모델로 실행
claude --model sonnet

# MCP 설정 확인
claude mcp list
```

- `~/.claude/settings.json`의 설정을 따름
- 프로젝트 루트의 `.mcp.json`을 자동 로드
- `clientInfo.name`: `"claude-code"` (서버에서 자동 감지)

### VS Code 플러그인 모드

- VS Code 설정에서 모델 선택 가능 (플러그인 UI)
- 프로젝트 루트의 `.mcp.json`을 자동 로드 (터미널 모드와 동일)
- `clientInfo.name`: `"claude-code-vscode"` 또는 `"claude-code"` (버전에 따라 다름)

> [!NOTE]
> 두 모드 모두 동일한 `.mcp.json` 파일을 참조합니다.
> 모델 설정만 다를 수 있으며, MCP 도구 접근 방식은 동일합니다.

## 텔레메트리 식별

DeukAgentContext MCP 서버는 다음 우선순위로 클라이언트를 식별합니다:

```
1. session.clientInfo.name (MCP 표준) → "claude-code" → "ClaudeCode"로 정규화
2. client_override 파라미터 (명시적 지정)
3. conversation_id 존재 → "Antigravity" (Antigravity 전용)
4. model 파라미터에서 추론 (GPT → Codex, Claude → Cursor, Gemini → Antigravity)
5. "unknown" 유지
```

Claude Code가 MCP 도구를 정상적으로 호출하면, 대시보드에 `ClaudeCode`로 분리 표시됩니다.

## 트러블슈팅

### 증상: "deferred tools via ToolSearch" 메시지
- **원인**: 모델이 `haiku`이거나 `effortLevel`이 `low`
- **해결**: `sonnet` + `high`로 변경

### 증상: 대시보드에 Claude Code 사용량 미표시
- **원인 1**: `.mcp.json`이 프로젝트에 없음
- **원인 2**: MCP 서버가 구동되지 않음 (`systemctl --user status deukcontext-mcp`)
- **원인 3**: 모델 설정으로 도구가 deferred 상태

### 증상: 도구 호출 시 InputValidationError
- **원인**: deferred 도구를 ToolSearch 없이 직접 호출
- **해결**: 모델/effortLevel 변경 또는 세션 재시작
