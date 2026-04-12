/**
 * Post-process CHANGELOG.md after commit-and-tag-version: drop internal "sync" wording
 * from user-facing bullets (OSS mirror / sync-oss / release automation noise).
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "CHANGELOG.md");
let s = readFileSync(file, "utf8");

s = s.replace(/,\s*and OSS sync\b/g, "");
s = s.replace(/\s+and OSS sync\b/g, "");
s = s.replace(
  /- `sync-oss` copies (`package-lock\.json`) for reproducible installs\./g,
  "- Release packaging includes $1 for reproducible installs.",
);
s = s.replace(/\bCLI and publish AGENTS sync\b/gi, "CLI and publish AGENTS updates");
s = s.replace(/\bpublish AGENTS sync\b/gi, "publish AGENTS alignment");

writeFileSync(file, s, "utf8");
