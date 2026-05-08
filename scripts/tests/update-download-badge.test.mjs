import test from "node:test";
import assert from "node:assert/strict";
import { buildDownloadsBadge } from "../update-download-badge.mjs";

test("downloads badge keeps deuk-agent-flow canonical while summing legacy alias", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const src = String(url);
    if (src.endsWith("/deuk-agent-flow")) {
      return { ok: true, status: 200, json: async () => ({ downloads: 120 }) };
    }
    if (src.endsWith("/deuk-agent-rule")) {
      return { ok: true, status: 200, json: async () => ({ downloads: 30 }) };
    }
    throw new Error(`unexpected url: ${src}`);
  };

  try {
    const badge = await buildDownloadsBadge({
      packages: ["deuk-agent-flow", "deuk-agent-rule"],
      canonicalPackage: "deuk-agent-flow",
      range: "last-month",
    });

    assert.equal(badge.label, "deuk-agent-flow downloads");
    assert.equal(badge.total, 150);
    assert.equal(badge.canonicalPackage, "deuk-agent-flow");
    assert.equal(badge.canonicalDownloads, 120);
    assert.equal(badge.aliasTotal, 30);
    assert.deepEqual(badge.aliases.map((pkg) => pkg.package), ["deuk-agent-rule"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("downloads badge treats missing alias package as zero without hiding canonical identity", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const src = String(url);
    if (src.endsWith("/deuk-agent-flow")) {
      return { ok: true, status: 200, json: async () => ({ downloads: 12 }) };
    }
    return { ok: false, status: 404, statusText: "Not Found" };
  };

  try {
    const badge = await buildDownloadsBadge({
      packages: ["deuk-agent-flow", "deuk-agent-rule"],
      canonicalPackage: "deuk-agent-flow",
      range: "last-week",
    });

    assert.equal(badge.total, 12);
    assert.equal(badge.canonicalDownloads, 12);
    assert.equal(badge.aliasTotal, 0);
    assert.equal(badge.aliases[0].missing, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
