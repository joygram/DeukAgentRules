import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { AGENT_ROOT_DIR, computeTicketPath, parseFrontMatter } from "./cli-utils.mjs";

export const TICKET_REPORTS_SUBDIR = "plan";

export function resolveTicketReportDir(cwd) {
  return join(cwd, AGENT_ROOT_DIR, "docs", TICKET_REPORTS_SUBDIR);
}

export function resolveTicketPath(cwd, relPath) {
  return join(cwd, String(relPath || ""));
}

export function resolveTicketEntryPath(cwd, entry) {
  return resolveTicketPath(cwd, entry?.path || "");
}

export function resolveTicketEntryOrComputedPath(cwd, entry) {
  return resolveTicketPath(cwd, entry?.path || computeTicketPath(entry));
}

export function resolveTicketKnowledgeDir(cwd) {
  return join(cwd, AGENT_ROOT_DIR, "knowledge");
}

export function readTicketDocument(cwd, entry, options = {}) {
  const shouldCompute = options.computePath || !entry?.path;
  const absPath = shouldCompute
    ? resolveTicketEntryOrComputedPath(cwd, entry)
    : resolveTicketEntryPath(cwd, entry);

  const parse = options.parse ?? true;
  const requireExists = options.requireExists ?? true;
  const action = options.action || "ticket";

  const exists = existsSync(absPath);
  if (!exists && requireExists) {
    const target = entry?.path || "unknown";
    throw new Error(`${action}: Ticket file not found: ${target}`);
  }

  if (!exists) {
    return {
      absPath,
      exists: false,
      body: "",
      meta: {},
      content: ""
    };
  }

  const body = readFileSync(absPath, "utf8");
  if (!parse) {
    return { absPath, exists: true, body, meta: {}, content: "" };
  }

  const parsed = parseFrontMatter(body);
  return { absPath, exists: true, body, ...parsed };
}
