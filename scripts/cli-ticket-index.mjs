import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { hostname as osHostname } from "os";
import { 
  AGENT_ROOT_DIR, TICKET_SUBDIR, TICKET_INDEX_FILENAME,
  toSlug, findFileRecursively, toRepoRelativePath, detectConsumerTicketDir, computeTicketPath
} from "./cli-utils.mjs";

const TICKET_ARCHIVE_INDEX_FILENAME = "INDEX.archive.json";

function parseIndexFile(absPath) {
  if (!existsSync(absPath)) {
    return { version: 1, updatedAt: null, activeTicketId: null, entries: [] };
  }
  try {
    const j = JSON.parse(readFileSync(absPath, "utf8"));
    const entries = Array.isArray(j.entries) ? j.entries.map(e => {
      const entry = { ...e, status: e.status || "open" };
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
    console.error(`[ERROR] Failed to parse ${basename(absPath)} at ${absPath}:`, err.message);
    return { version: 1, updatedAt: null, activeTicketId: null, entries: [], _corrupt: true };
  }
}

function splitEntriesForStorage(entries = []) {
  const activeEntries = [];
  const archiveEntries = [];
  for (const entry of entries) {
    const status = String(entry?.status || "open").toLowerCase();
    if (status === "open" || status === "active") {
      activeEntries.push(entry);
    } else {
      archiveEntries.push(entry);
    }
  }
  return { activeEntries, archiveEntries };
}

function mergeIndexEntries(primaryEntries = [], archiveEntries = []) {
  const merged = new Map();
  for (const entry of primaryEntries || []) {
    if (entry?.id) merged.set(entry.id, entry);
  }
  for (const entry of archiveEntries || []) {
    if (entry?.id) merged.set(entry.id, entry);
  }
  return Array.from(merged.values());
}

export function readTicketIndexJson(cwd) {
  const dir = detectConsumerTicketDir(cwd);
  if (!dir) return { version: 1, updatedAt: null, entries: [] };
  const mainPath = join(dir, TICKET_INDEX_FILENAME);
  const archivePath = join(dir, TICKET_ARCHIVE_INDEX_FILENAME);
  const main = parseIndexFile(mainPath);
  const archive = parseIndexFile(archivePath);

  const entries = mergeIndexEntries(main.entries, archive.entries).map(entry => {
    const next = { ...entry, status: entry.status || "open" };
    next.path = computeTicketPath(next);
    return next;
  });

  return {
    version: main.version || archive.version || 1,
    updatedAt: main.updatedAt ?? archive.updatedAt ?? null,
    activeTicketId: main.activeTicketId ?? null,
    entries,
    _corrupt: Boolean(main._corrupt || archive._corrupt)
  };
}

export function writeTicketIndexJson(cwd, indexJson, opts = {}) {
  if (indexJson._corrupt && !opts.force) {
    console.error(`[ABORT] Refusing to overwrite potentially corrupt ${TICKET_INDEX_FILENAME}. Use --force to override.`);
    return;
  }
  const dir = detectConsumerTicketDir(cwd, { createIfMissing: true });
  const p = join(dir, TICKET_INDEX_FILENAME);
  const archivePath = join(dir, TICKET_ARCHIVE_INDEX_FILENAME);
  if (opts.dryRun) return;
  mkdirSync(dir, { recursive: true });
  
  const out = { ...indexJson };
  delete out._corrupt;
  
  // Strip physical path snapshots before saving to enforce state-driven resolution
  const entries = Array.isArray(out.entries) ? out.entries : [];
  const { activeEntries, archiveEntries } = splitEntriesForStorage(entries);
  out.entries = activeEntries.map(e => {
    const { path, ...clean } = e;
    return clean;
  });
  out.activeTicketId = out.activeTicketId || activeEntries.find(e => e.status === "active")?.id || activeEntries.find(e => e.status === "open")?.id || null;
  writeFileSync(p, JSON.stringify(out, null, 2) + "\n", "utf8");

  const archiveOut = {
    version: out.version || 1,
    updatedAt: out.updatedAt || new Date().toISOString(),
    activeTicketId: null,
    entries: archiveEntries.map(e => {
      const { path, ...clean } = e;
      return clean;
    })
  };
  if (archiveOut.entries.length > 0 || existsSync(archivePath)) {
    writeFileSync(archivePath, JSON.stringify(archiveOut, null, 2) + "\n", "utf8");
  }
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

export function syncActiveTicketId(cwd, opts = {}) {
  const index = readTicketIndexJson(cwd);
  const activeEntry = index.entries.find(e => e.status === "active") || 
                       index.entries.find(e => e.status === "open");
  
  const ticketDir = detectConsumerTicketDir(cwd);
  if (!ticketDir) return;
  if (opts.dryRun) return;

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
