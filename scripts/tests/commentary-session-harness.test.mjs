import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveCommentaryConstraint,
  validateCommentaryScenario
} from "../commentary-session-harness.mjs";

test("ticket_start_pending allows clickable ticket start, silent summary, and guard topic", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        {
          stage: "ticket_start_pending",
          output: [
            "Ticket start: [491-session-like-commentary-harness-joy-nucb](/tmp/491.md)",
            "조용히 작업",
            "Guard topic: 491-session-like-commentary-harness-joy-nucb"
          ].join("\n")
        }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, true);
  assert.deepEqual(result.violations, []);
});

test("ticket_start_pending requires ticket start as the first visible assistant line", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        {
          stage: "ticket_start_pending",
          output: [
            "승인 대기 중입니다.",
            "Ticket start: [491-session-like-commentary-harness-joy-nucb](/tmp/491.md)",
            "조용히 작업",
            "Guard topic: 491-session-like-commentary-harness-joy-nucb"
          ].join("\n")
        }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, false);
  assert.ok(result.violations.some(v => v.code === "pre_approval_ticket_start_not_first_visible_line"));
});

test("approved execution rejects narrative commentary", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        {
          stage: "approved_execution",
          output: "남은 테스트 구조를 먼저 확인한 뒤 바로 수정하겠습니다."
        }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, false);
  assert.deepEqual(
    result.violations.map(v => v.code),
    ["execution_narration_forbidden"]
  );
});

test("command and search running surfaces reuse the same narration ban", () => {
  const commandResult = validateCommentaryScenario(
    {
      steps: [
        { stage: "command_running", output: "명령을 실행하면서 상태를 계속 설명하겠습니다." }
      ]
    },
    { model: "gpt-5.5" }
  );
  const searchResult = validateCommentaryScenario(
    {
      steps: [
        { stage: "search_running", output: "검색하면서 찾은 흐름을 단계별로 설명하겠습니다." }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(commandResult.ok, false);
  assert.equal(searchResult.ok, false);
  assert.deepEqual(commandResult.violations.map(v => v.code), ["execution_narration_forbidden"]);
  assert.deepEqual(searchResult.violations.map(v => v.code), ["execution_narration_forbidden"]);
});

test("requirement change returns to approval-pending contract instead of execution chatter", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        {
          stage: "requirement_change",
          output: [
            "Ticket start: [491-session-like-commentary-harness-joy-nucb](/tmp/491.md)",
            "조용히 작업",
            "Guard topic: 491-session-like-commentary-harness-joy-nucb"
          ].join("\n")
        }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, true);
  assert.deepEqual(result.violations, []);
});

test("execution status budget is enforced across sequential approved turns", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        { stage: "approved_execution", output: "guard" },
        { stage: "approved_execution", output: "verify" }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, false);
  assert.deepEqual(
    result.violations.map(v => v.code),
    ["execution_status_budget_exceeded"]
  );
});

test("user correction interrupts all running surfaces and forbids follow-on output until reset", () => {
  const result = validateCommentaryScenario(
    {
      steps: [
        { stage: "search_running", output: "guard" },
        { stage: "user_correction_interrupt", output: "" },
        { stage: "approved_execution", output: "verify" }
      ]
    },
    { model: "gpt-5.5" }
  );

  assert.equal(result.ok, false);
  assert.deepEqual(
    result.violations.map(v => v.code),
    ["post_interrupt_output_forbidden"]
  );
});

test("tight model profiles and low remaining context dynamically reduce commentary budget", () => {
  const tightModelResult = validateCommentaryScenario(
    {
      steps: [{ stage: "approved_execution", output: "guard" }]
    },
    { model: "gpt-5.4-mini" }
  );
  const lowContextResult = validateCommentaryScenario(
    {
      steps: [{ stage: "approved_execution", output: "guard" }]
    },
    { model: "gpt-5.5", remainingContextPct: 20 }
  );
  const resolved = resolveCommentaryConstraint({ model: "gpt-5.4-mini" });

  assert.equal(resolved.contextClass, "tight");
  assert.equal(resolved.maxExecutionStatusUpdates, 0);
  assert.equal(tightModelResult.ok, false);
  assert.equal(lowContextResult.ok, false);
  assert.deepEqual(
    tightModelResult.violations.map(v => v.code),
    ["execution_status_budget_exceeded"]
  );
  assert.deepEqual(
    lowContextResult.violations.map(v => v.code),
    ["execution_status_budget_exceeded"]
  );
});
