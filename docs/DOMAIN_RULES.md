# Domain / Language Hard Rules Reference

> **Notice**: These rules were extracted from the global `AGENTS.md` because language and domain-specific hard rules should not be mixed with global agent workflows. Agents should apply these rules **only when working in the respective domains**, ideally by placing them in the `.deuk-agent/templates/MODULE_RULE_TEMPLATE.md` of the target project.

## Unity / C#
- **No hotpath LINQ (금지)**: Update 루프에서 LINQ, boxing, frame allocation 없음

## C++ Server
- **No Raw Pointers**: Use `std::unique_ptr` or `std::shared_ptr` for resource ownership.
- **Header Cleanliness**: Keep `#include` minimum in headers; use forward declarations where possible.
- **Async Safety**: Every shared resource in the logic loop strictly requires a mutex or atomic protection.

## WebApp / Frontend
- **Protocol Integrity**: Never hardcode JSON structures; always use the project's generated JS/TS codecs for communication.
