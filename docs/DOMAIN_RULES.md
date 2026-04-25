# Domain Hard Rules Reference

> **Notice**: Apply these rules only when working in their respective domains.

## Unity / C#
- **No LINQ**: Forbidden in `Update` loops (no boxing, no frame allocations).

## C++ Server
- **No Raw Pointers**: Use `std::unique_ptr` or `std::shared_ptr`.
- **Header Cleanliness**: Forward declare. Minimize `#include`.
- **Async Safety**: All shared resources in logic loops MUST be mutex-protected.

## WebApp / Frontend
- **Protocol Integrity**: Hardcoded JSON structures are FORBIDDEN. Use DeukPack generated TS codecs.
