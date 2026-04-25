import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { hostname as osHostname } from "os";
import { 
  AGENT_ROOT_DIR, TICKET_SUBDIR, TICKET_INDEX_FILENAME,
  toSlug, findFileRecursively, toRepoRelativePath, detectConsumerTicketDir, computeTicketPath
} from "./cli-utils.mjs";

export function readTicketIndexJson(cwd) {
  const dir = detectConsumerTicketDir(cwd);
  if (!dir) return { version: 1, updatedAt: null, entries: [] };
  const p = join(dir, TICKET_INDEX_FILENAME);
  if (!existsSync(p)) {
    return { version: 1, updatedAt: null, entries: [] };
  }
  try {
    const j = JSON.parse(readFileSync(p, "utf8"));
    const entries = Array.isArray(j.entries) ? j.entries.map(e => {
      const entry = { ...e, status: e.status || "open" };
      // Dynamically re-derive path from state to ensure zero-drift
      entry.path = computeTicketPath(entry);
      return entry;
    }) : [];
    
    return { 
      version: j.version || 1, 
      updatedAt: j.updatedAt ?? null, 
      activeTicketId: j.activeTicketId ?? null, 
      entries 
    };
  } catch (err) {
    console.error(`[ERROR] Failed to parse ${TICKET_INDEX_FILENAME} at ${p}:`, err.message);
    return { version: 1, updatedAt: null, activeTicketId: null, entries: [], _corrupt: true };
  }
}

export function writeTicketIndexJson(cwd, indexJson, opts = {}) {
  if (indexJson._corrupt && !opts.force) {
    console.error(`[ABORT] Refusing to overwrite potentially corrupt ${TICKET_INDEX_FILENAME}. Use --force to override.`);
    return;
  }
  const dir = detectConsumerTicketDir(cwd, { createIfMissing: true });
  const p = join(dir, TICKET_INDEX_FILENAME);
  if (opts.dryRun) return;
  mkdirSync(dir, { recursive: true });
  
  const out = { ...indexJson };
  delete out._corrupt;
  
  // Strip physical path snapshots before saving to enforce state-driven resolution
  out.entries = out.entries.map(e => {
    const { path, ...clean } = e;
    return clean;
  });

  writeFileSync(p, JSON.stringify(out, null, 2) + "\n", "utf8");
}

export function getHostnameSlug() {
  try {
    const slug = osHostname().toLowerCase().replace(/[^a-z0-9\-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return slug.slice(0, 8).replace(/-$/, '') || 'local';
  } catch {
    return 'local';
  }
}

export function computeNextTicketNumber(existingEntries) {
  const hostname = getHostnameSlug();
  const newRe = /^(\d{3,4})-/;
  let max = 0;
  for (const e of (existingEntries || [])) {
    const id = String(e.id || '');
    const m = id.match(newRe);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > max && n < 10000) max = n;
    }
  }
  return { num: max + 1, hostname };
}

export function generateTicketId(topicSlug, existingEntries) {
  const hostname = getHostnameSlug();
  const slug = toSlug(topicSlug || 'ticket');
  const match = slug.match(/^(\d{3,4})-(.*)/);
  if (match) {
    const numStr = match[1];
    const restSlug = match[2].slice(0, 32);
    return `${numStr}-${restSlug}-${hostname}`;
  }
  const { num } = computeNextTicketNumber(existingEntries);
  const numStr = String(num).padStart(3, '0');
  const finalSlug = slug.slice(0, 32);
  return `${numStr}-${finalSlug}-${hostname}`;
}

export function syncActiveTicketId(cwd) {
  const index = readTicketIndexJson(cwd);
  const activeEntry = index.entries.find(e => e.status === "active") || 
                       index.entries.find(e => e.status === "open");
  
  const ticketDir = detectConsumerTicketDir(cwd);
  if (!ticketDir) return;

  const activeId = activeEntry ? activeEntry.id : null;
  if (index.activeTicketId !== activeId) {
      writeTicketIndexJson(cwd, { ...index, activeTicketId: activeId });
  }

  const legacyLatestPath = join(ticketDir, "LATEST.md");
  const pointerPathMd = join(ticketDir, "ACTIVE_TICKET.md");
  const pointerPathJson = join(ticketDir, "ACTIVE_TICKET.json");
  
  for (const p of [legacyLatestPath, pointerPathMd, pointerPathJson]) {
    if (existsSync(p)) {
      unlinkSync(p);
    }
  }
}

export async function syncToPipeline(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal?.timeout ? AbortSignal.timeout(3000) : undefined
    });
    return response.ok;
  } catch (err) {
    return false;
  }
}
