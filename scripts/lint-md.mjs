#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname, dirname } from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import YAML from "yaml";

const repoRoot = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const ignoredDirs = new Set([".git", "node_modules"]);

function collectChangedMarkdownFiles() {
  const changed = new Set();

  const gitArgs = ["-C", repoRoot, "diff", "--name-only", "--diff-filter=ACMRTUXB"];
  const gitDiff = spawnSync("git", gitArgs, { encoding: "utf8" });
  if (gitDiff.status === 0) {
    gitDiff.stdout
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean)
      .filter(isMarkdownFile)
      .forEach(f => changed.add(f));
  }

  const gitUntracked = spawnSync("git", ["-C", repoRoot, "ls-files", "--others", "--exclude-standard"], { encoding: "utf8" });
  if (gitUntracked.status === 0) {
    gitUntracked.stdout
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean)
      .filter(isMarkdownFile)
      .forEach(f => changed.add(f));
  }

  return Array.from(changed).sort();
}

function isMarkdownFile(filePath) {
  const lower = filePath.toLowerCase();
  return lower.endsWith(".md") || lower.endsWith(".mdx") || lower.endsWith(".markdown");
}

function walkMarkdownFiles(rootDir, out = []) {
  for (const entry of readdirSync(rootDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walkMarkdownFiles(join(rootDir, entry.name), out);
      continue;
    }
    const filePath = join(rootDir, entry.name);
    if (isMarkdownFile(filePath)) out.push(filePath);
  }
  return out;
}

function lintFile(absPath) {
  const rel = relative(repoRoot, absPath);
  const content = readFileSync(absPath, "utf8");
  const errors = [];

  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (/\s+$/.test(line)) {
      errors.push(`${rel}:${idx + 1}: trailing whitespace`);
    }
  });

  const fenceCount = lines.filter(line => /^```/.test(line.trim())).length;
  if (fenceCount % 2 !== 0) {
    errors.push(`${rel}: unmatched fenced code block`);
  }

  if (content.startsWith("---\n") || content.startsWith("---\r\n")) {
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?/);
    if (!match) {
      errors.push(`${rel}: invalid or unterminated frontmatter`);
    } else {
      try {
        YAML.parse(match[1]);
      } catch (err) {
        errors.push(`${rel}: invalid frontmatter YAML (${err.message})`);
      }
    }
  }

  const linkPattern = /!?\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    const target = String(match[1] || "").trim();
    if (!target || target.startsWith("#") || /^[a-z]+:\/\//i.test(target) || target.startsWith("mailto:")) {
      continue;
    }
    const pathOnly = target.split("#")[0].split("?")[0];
    if (!pathOnly) continue;
    const resolved = join(dirname(absPath), pathOnly);
    if (!statExists(resolved)) {
      errors.push(`${rel}: broken relative link -> ${target}`);
    }
  }

  return errors;
}

function statExists(absPath) {
  try {
    return statSync(absPath).isFile() || statSync(absPath).isDirectory();
  } catch {
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  const explicitPaths = args.filter(arg => !arg.startsWith("-"));
  const files = explicitPaths.length > 0
    ? explicitPaths.map(p => join(repoRoot, p)).filter(statExists).filter(isMarkdownFile)
    : collectChangedMarkdownFiles().map(p => join(repoRoot, p));

  const targets = files.length > 0 ? files : walkMarkdownFiles(repoRoot);
  const uniqueTargets = Array.from(new Set(targets));

  if (uniqueTargets.length === 0) {
    console.log("lint:md: no markdown files found");
    return;
  }

  const errors = [];
  for (const filePath of uniqueTargets) {
    errors.push(...lintFile(filePath));
  }

  if (errors.length > 0) {
    console.error("lint:md failed");
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`lint:md passed (${uniqueTargets.length} file${uniqueTargets.length === 1 ? "" : "s"})`);
}

main();
