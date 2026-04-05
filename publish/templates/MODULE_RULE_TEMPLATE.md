# Submodule Agent Rules: [Module Name]

> **[CAUTION FOR AI AGENTS]**
> When the Ticket Document `Target Submodule` matches this module, you MUST strictly adhere to the following architectural conventions and rules. Do not cross-pollinate rules from other submodules.

## 📁 Repository Boundary
- **Path Root:** `[e.g., DeukUI/ or DeukPackKits/]`
- **Allowed Tech Stack:** `[e.g., React, TypeScript, CSS Modules | C#, Unity 2022]`

## 🏗️ Core Architecture & Conventions
1. **Naming Conventions:**
   - [e.g., Use PascalCase for C# files, kebab-case for TS files.]
2. **State Management:**
   - [e.g., Do NOT use global Redux state; pass props or use React Context localized.]
3. **Prohibited Patterns:**
   - [e.g., Absolutely forbidden to use LINQ inside `Update()` functions.]
   - [e.g., Absolutely forbidden to overwrite `index.js` generated files.]

## 🛠️ Build & Test Protocol
- **To build this module:** `[e.g., npm run build:plugin --prefix DeukUI]`
- **To test this module:** `[e.g., npm run test:ui]`

## 🔗 Ticket Instructions
Always enforce that generated `Tickets` intended for this module include this rule file in their `[Context Files]` section.
