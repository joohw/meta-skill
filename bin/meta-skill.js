#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");

function usage() {
  console.log(`meta-skill

Install the meta-skill Agent Skill into any local skills directory.

Usage:
  meta-skill install [--dest <skills-dir>] [--name <folder-name>] [--force]
  meta-skill path
  meta-skill help

Options:
  --dest   Parent skills directory. Defaults to AGENT_SKILLS_DIR or ~/.agent/skills.
  --name   Destination folder name. Defaults to meta-skill.
  --force  Replace an existing destination folder.

Examples:
  npx skill-meta-skill install --dest /path/to/agent/skills
  AGENT_SKILLS_DIR=~/.agent/skills npx skill-meta-skill install
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--force") {
      args.force = true;
    } else if (arg === "--dest" || arg === "--name") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${arg} requires a value`);
      }
      args[arg.slice(2)] = value;
      i += 1;
    } else {
      args._.push(arg);
    }
  }
  return args;
}

function expandHome(inputPath) {
  if (!inputPath) return inputPath;
  if (inputPath === "~") return os.homedir();
  if (inputPath.startsWith("~/")) return path.join(os.homedir(), inputPath.slice(2));
  return inputPath;
}

function copyPath(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.cpSync(source, target, { recursive: true });
  } else {
    fs.copyFileSync(source, target);
  }
}

function install(args) {
  const skillName = args.name || "meta-skill";
  const parentDir = path.resolve(
    expandHome(args.dest || process.env.AGENT_SKILLS_DIR || path.join("~", ".agent", "skills"))
  );
  const targetDir = path.join(parentDir, skillName);
  const entries = ["SKILL.md", "LICENSE.txt", "agents", "references"];

  if (fs.existsSync(targetDir)) {
    if (!args.force) {
      throw new Error(`${targetDir} already exists. Re-run with --force to replace it.`);
    }
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of entries) {
    const source = path.join(packageRoot, entry);
    if (fs.existsSync(source)) {
      copyPath(source, path.join(targetDir, entry));
    }
  }

  console.log(`Installed meta-skill to ${targetDir}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || "help";

  if (command === "help" || command === "--help" || command === "-h") {
    usage();
    return;
  }
  if (command === "path") {
    console.log(packageRoot);
    return;
  }
  if (command === "install") {
    install(args);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(`meta-skill: ${error.message}`);
  process.exitCode = 1;
}
