import { spawnSync } from "child_process";

function run(command, args, description) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error) {
    throw new Error(`${description} failed: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`${description} exited with code ${result.status}`);
  }
}

function hasCommand(command, args = ["--version"]) {
  const result = spawnSync(command, args, { stdio: "ignore" });
  return !result.error && result.status === 0;
}

run("npm", ["install"], "npm install");

if (hasCommand("python3")) {
  run("python3", ["-m", "pip", "install", "--user", "pytest"], "python3 -m pip install pytest");
} else {
  console.warn("[SETUP] python3 is not available, skipped pytest installation.");
}
