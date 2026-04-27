import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join } from "path";

export const DEFAULT_TAG = "DeukAgentRules";

export function resolveMarkers(o) {
  // We no longer use custom begin/end markers. We enforce the heading marker.
  return {
    begin: "## DeukAgentRules",
    end: null,
  };
}

/**
 * Strip all internal begin/end marker lines from content.
 */
export function stripInternalMarkers(content, begin, end) {
  return content
    .split('\n')
    .filter(line => {
      const t = line.trim();
      return t !== begin && (end === null || t !== end);
    })
    .join('\n');
}

export function findMarkerRegion(content, begin, end) {
  const i = content.indexOf(begin);
  if (i === -1) return null;
  
  const innerStart = i + begin.length;
  if (end === null) {
    return { innerStart, innerEnd: content.length };
  }
  
  const j = content.lastIndexOf(end);
  if (j === -1 || j <= i) {
    throw new Error(
      `[MARKER ERROR] Found begin marker "${begin}" but no matching end marker "${end}" after it.\n`
    );
  }
  return { innerStart, innerEnd: j };
}

export function applyAgents(opts) {
  const { agentsMode, targetPath } = opts;

  if (agentsMode === "skip") {
    return {
      action: "skip",
      reason: existsSync(targetPath) ? "agents mode skip (file exists)" : "agents mode skip",
    };
  }

  if (agentsMode === "overwrite") {
    return handleAgentOverwrite(opts);
  }

  const existing = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : "";

  const region = findMarkerRegion(existing, opts.markers.begin, opts.markers.end);

  if (region) {
    return handleAgentInject(opts, existing, region);
  }

  return handleAgentAppend(opts, existing);
}

export function pruneAppendedDuplicates(content, begin, end) {
  const i = content.indexOf(begin);
  if (i === -1) return content;
  
  if (end === null) {
    // If there's a duplicate begin inside the content itself, remove it
    let j = content.indexOf(begin, i + begin.length);
    if (j !== -1) {
      return content.slice(0, j); // Since end is EOF, everything after second begin is duplicate
    }
    return content;
  }
  
  const j = content.indexOf(end, i + begin.length);
  if (j === -1) return content;
  
  const blockEnd = j + end.length;
  const keepPart = content.slice(0, blockEnd);
  let restPart = content.slice(blockEnd);
  
  let nextI = restPart.indexOf(begin);
  while (nextI !== -1) {
    let nextJ = restPart.indexOf(end, nextI + begin.length);
    if (nextJ !== -1) {
      restPart = restPart.slice(0, nextI) + restPart.slice(nextJ + end.length);
    } else {
      restPart = restPart.slice(0, nextI);
    }
    nextI = restPart.indexOf(begin);
  }
  
  return keepPart + restPart;
}

function handleAgentOverwrite(opts) {
  const { targetPath, bundleContent, dryRun, backup } = opts;
  const prev = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : "";
  if (dryRun) {
    return { action: "would-write", path: targetPath, mode: "overwrite" };
  }
  if (backup && existsSync(targetPath)) {
    copyFileSync(targetPath, targetPath + ".bak");
  }
  writeFileSync(targetPath, bundleContent, "utf8");
  return { action: "write", path: targetPath, mode: "overwrite", hadPrevious: !!prev };
}

function handleAgentInject(opts, existing, region) {
  let { targetPath, bundleContent, markers, dryRun, backup } = opts;
  bundleContent = pruneAppendedDuplicates(bundleContent, markers.begin, markers.end);
  const cleanContent = stripInternalMarkers(bundleContent, markers.begin, markers.end);
  const inner = cleanContent.trimEnd() + "\n";
  
  const existingPrefix = existing.slice(0, region.innerStart);
  
  // Since we replaced the end marker with EOF, we just append to the innerStart
  const next = existingPrefix + "\n\n> Managed by DeukAgentRules. Remove this section if not installed.\n\n" + inner;
  
  if (dryRun) {
    return { action: "would-write", path: targetPath, mode: "inject-region" };
  }
  if (backup && existsSync(targetPath)) {
    copyFileSync(targetPath, targetPath + ".bak");
  }
  writeFileSync(targetPath, next, "utf8");
  return { action: "write", path: targetPath, mode: "inject-region" };
}

function handleAgentAppend(opts, existing) {
  const { targetPath, bundleContent, markers, flavor, appendIfNoMarkers, dryRun, backup } = opts;
  const allowAppend = appendIfNoMarkers || flavor === "init";

  if (!allowAppend) {
    throw new Error(
      "Inject mode requires markers in " + targetPath + " or use --append-if-no-markers."
    );
  }

  const inner = bundleContent.trimEnd() + "\n";
  const block = "\n---\n\n" + markers.begin + "\n\n> Managed by DeukAgentRules. Remove this section if not installed.\n\n" + inner;
  const next = existing ? existing.replace(/\s*$/, "") + block : block.trimStart();

  if (dryRun) {
    return {
      action: "would-write",
      path: targetPath,
      mode: flavor === "init" ? "append-markers-init" : "append-markers",
    };
  }
  if (backup && existsSync(targetPath)) {
    copyFileSync(targetPath, targetPath + ".bak");
  }
  writeFileSync(targetPath, next, "utf8");
  return {
    action: "write",
    path: targetPath,
    mode: flavor === "init" ? "append-markers-init" : "append-markers",
  };
}

export function readBundleAgents(bundleRoot) {
  const p = join(bundleRoot, "AGENTS.md");
  if (!existsSync(p)) {
    throw new Error("Bundle AGENTS.md missing: " + p);
  }
  return readFileSync(p, "utf8");
}

export function removeTaggedBlock(content, begin, end) {
  const i = content.indexOf(begin);
  if (i === -1) {
    return { ok: false, reason: "begin not found" };
  }
  if (end === null) {
    // Determine where the block started, including the preceding ---
    let blockStart = i;
    const prevText = content.slice(0, i);
    const hrIndex = prevText.lastIndexOf("---");
    if (hrIndex !== -1 && prevText.slice(hrIndex).trim() === "") {
        blockStart = hrIndex;
    }
    let next = content.slice(0, blockStart).trimEnd() + "\n";
    return { ok: true, content: next };
  }
  
  const j = content.indexOf(end, i + begin.length);
  if (j === -1) {
    return { ok: false, reason: "end not found" };
  }
  const afterEnd = j + end.length;
  let next = content.slice(0, i) + content.slice(afterEnd);
  next = next.replace(/\n{3,}/g, "\n\n").replace(/^\n+/, "").trimEnd();
  if (next.length) {
    next += "\n";
  }
  return { ok: true, content: next };
}
