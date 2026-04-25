import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, copyFileSync, statSync } from "fs";
import { basename, dirname, join, relative } from "path";
import { 
  toRepoRelativePath, AGENT_ROOT_DIR, TICKET_SUBDIR, TICKET_LIST_FILENAME, TICKET_LIST_TEMPLATE_FILENAME,
  parseFrontMatter, stringifyFrontMatter, findFileRecursively, detectConsumerTicketDir
} from "./cli-utils.mjs";
import { readTicketIndexJson, writeTicketIndexJson, syncActiveTicketId } from "./cli-ticket-index.mjs";
import { collectTicketMarkdownFiles, rebuildTicketIndexFromTopicFilesIfNeeded } from "./cli-ticket-parser.mjs";

export function performUpgradeMigration(cwd, opts = {}) {
  const root = detectConsumerTicketDir(cwd, { createIfMissing: true });
  const archiveDir = join(root, "archive");
  
  const files = collectTicketMarkdownFiles(root).filter(p => {
    const base = basename(p);
    return base !== "LATEST.md" && base !== TICKET_LIST_FILENAME && base !== TICKET_LIST_TEMPLATE_FILENAME && base !== "ACTIVE_TICKET.md";
  });

  console.log(`[UPGRADE] Scanning ${files.length} tickets for V2 migration...`);

  let count = 0;
  for (const abs of files) {
    const rel = toRepoRelativePath(cwd, abs);
    const body = readFileSync(abs, "utf8");
    const { meta, content } = parseFrontMatter(body);

    const isAlreadyInArchive = rel.includes("/archive/");
    const status = meta.status || "open";

    if (meta.id && meta.status) {
      if (meta.status === "archived" && !isAlreadyInArchive && !opts.dryRun) {
        moveFileToArchive(cwd, abs, meta.group || "sub");
      }
      continue;
    }

    const migratedBody = stringifyFrontMatter(meta, content);
    
    if (opts.dryRun) {
      console.log(`[DRY-RUN] Would upgrade: ${rel} (status: ${status})`);
    } else {
      let finalAbs = abs;
      if (status === "archived" && !isAlreadyInArchive) {
          finalAbs = moveFileToArchive(cwd, abs, basename(dirname(abs)));
      }
      writeFileSync(finalAbs, migratedBody, "utf8");
      console.log(`[OK] Upgraded: ${toRepoRelativePath(cwd, finalAbs)}`);
      count++;
    }
  }

  if (!opts.dryRun) {
    rebuildTicketIndexFromTopicFilesIfNeeded(cwd, { ...opts, force: true });
    performDefragmentation(cwd, opts);
    syncActiveTicketId(cwd);
  }
  
  return count;
}

export function performDefragmentation(cwd, opts = {}) {
  const rootTicketDir = detectConsumerTicketDir(cwd);
  if (!rootTicketDir) return;
  const tickets = collectTicketMarkdownFiles(rootTicketDir).filter(p => {
    const base = basename(p);
    return base !== "LATEST.md" && base !== TICKET_LIST_FILENAME && base !== TICKET_LIST_TEMPLATE_FILENAME && base !== "ACTIVE_TICKET.md";
  });

  console.log(`[DEFRAG] Checking ${tickets.length} tickets for workspace placement...`);

  const modifiedPaths = new Set();
  
  for (const abs of tickets) {
    const { meta } = parseFrontMatter(readFileSync(abs, "utf8"));
    if (meta.submodule && meta.submodule !== "global") {
      const subPath = join(cwd, meta.submodule);
      if (existsSync(subPath) && statSync(subPath).isDirectory()) {
        const subTicketDir = join(subPath, AGENT_ROOT_DIR, TICKET_SUBDIR);
        
        const relToRoot = relative(rootTicketDir, abs);
        const destAbs = join(subTicketDir, relToRoot);
        
        if (opts.dryRun) {
          console.log(`[DRY-RUN] Would move to workspace: ${relToRoot} -> ${meta.submodule}/${AGENT_ROOT_DIR}/${TICKET_SUBDIR}/`);
        } else {
          mkdirSync(dirname(destAbs), { recursive: true });
          copyFileSync(abs, destAbs);
          unlinkSync(abs);
          console.log(`[DEFRAG] Moved: ${meta.submodule}/${AGENT_ROOT_DIR}/${TICKET_SUBDIR}/${relToRoot}`);
          modifiedPaths.add(subPath);
        }
      }
    }
  }

  if (!opts.dryRun) {
    for (const p of modifiedPaths) {
      rebuildTicketIndexFromTopicFilesIfNeeded(p, { ...opts, force: true });
      syncActiveTicketId(p);
    }
  }
}

export function moveFileToArchive(cwd, abs, group) {
  const ticketDir = detectConsumerTicketDir(cwd);
  const archiveBase = join(ticketDir, "archive");
  const targetSubDir = (basename(ticketDir) === TICKET_SUBDIR || !group) ? "sub" : group;
  const targetDir = join(archiveBase, targetSubDir);
  mkdirSync(targetDir, { recursive: true });
  const finalAbs = join(targetDir, basename(abs));
  if (finalAbs !== abs) {
    if (existsSync(finalAbs)) {
      unlinkSync(abs);
    } else {
      writeFileSync(finalAbs, readFileSync(abs, "utf8"), "utf8");
      unlinkSync(abs);
    }
  }
  return finalAbs;
}

export function normalizeTicketPaths(cwd, opts = {}) {
  const index = readTicketIndexJson(cwd);
  const ticketDir = detectConsumerTicketDir(cwd);
  const entries = index.entries || [];
  let modified = false;

  for (const entry of entries) {
    if (!entry.path) continue;
    
    const currentAbs = join(cwd, entry.path);
    if (!existsSync(currentAbs)) {
      const fileName = basename(entry.path);
      const found = findFileRecursively(ticketDir, fileName);
      if (found) {
        const newRel = toRepoRelativePath(cwd, found);
        if (entry.path !== newRel) {
          entry.path = newRel;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    index.updatedAt = new Date().toISOString();
    writeTicketIndexJson(cwd, index);
    if (!opts.silent) console.log(`[NORMALIZE] Corrected stale paths in ${basename(cwd)}/INDEX.json`);
  }
  return modified;
}
