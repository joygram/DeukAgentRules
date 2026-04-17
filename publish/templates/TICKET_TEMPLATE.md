# Task: [Task Title / Ticket Number]

> **[CAUTION FOR AI AGENTS]** 
> You are operating within a locked multi-module monorepo. 
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds

- **Target Submodule:** `[e.g., DeukUI | DeukPack | DeukNavigation]`
- **Context Files:** 
  - `[e.g., DeukAgentRules/templates/MODULE_RULE_TEMPLATE.md]`
  - `[e.g., path/to/your/specific/rules.md]`

## 📁 Files to Modify
- `path/from/root/to/target1`: [Specific instructions. Don't write 'refactor', describe WHAT to refactor.]
- `path/from/root/to/target2`: [Instructions...]

## 🏗️ Design Decisions (For Context)
- [Why are we doing this? E.g., "To isolate the IR Layout bindings from DOM events"]
- [What pattern to use?]

## 🛑 Strict Constraints (Rules to never break)
- [e.g., Do NOT remove existing @ts-nocheck headers]
- [e.g., MUST retain C# [SerializeField] directives]
- [e.g., Do NOT import Vue logic into DeukPack]

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested. Use separate chat messages per phase if the task is large.
1. [Phase 1> Setup / Parsing]
2. [Phase 2> Core Logic Change]
3. [Phase 3> Cleanup / Verification]

## ✅ Verification / QA
- [e.g., Check CLI command output `npm run test`]
- [e.g., Validate Inspector mounts properly in Figma]
