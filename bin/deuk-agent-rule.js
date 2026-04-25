#!/usr/bin/env node
/**
 * Global Proxy for DeukAgentRules CLI
 * Ensures that if executed within a workspace containing 'DeukAgentRules',
 * it will automatically route to the local source (kind src) instead of using
 * a stale globally installed version or a temporary npx tarball.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function findWorkspaceRoot(currentDir) {
    let dir = currentDir;
    while (true) {
        // Try to identify the root by checking common markers
        if (fs.existsSync(path.join(dir, 'DeukAgentRules', 'scripts', 'cli.mjs'))) {
            return dir;
        }
        if (fs.existsSync(path.join(dir, '.git')) && fs.existsSync(path.join(dir, 'DeukAgentRules'))) {
            return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) return null;
        dir = parent;
    }
}

const wsRoot = findWorkspaceRoot(process.cwd());
if (wsRoot) {
    const localCli = path.join(wsRoot, 'DeukAgentRules', 'scripts', 'cli.mjs');
    if (fs.existsSync(localCli) && localCli !== path.resolve(path.join(__dirname, '..', 'scripts', 'cli.mjs'))) {
        const args = process.argv.slice(2);
        const result = spawnSync('node', [localCli, ...args], { stdio: 'inherit' });
        process.exit(result.status !== null ? result.status : 1);
    }
}

// Fallback to the package's own cli.mjs
const myCli = path.join(__dirname, '..', 'scripts', 'cli.mjs');
if (fs.existsSync(myCli)) {
    const args = process.argv.slice(2);
    const result = spawnSync('node', [myCli, ...args], { stdio: 'inherit' });
    process.exit(result.status !== null ? result.status : 1);
} else {
    console.error("Error: Could not find DeukAgentRules CLI script at " + myCli);
    process.exit(1);
}
