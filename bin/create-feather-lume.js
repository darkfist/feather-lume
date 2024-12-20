#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2] || "feather-lume-app";
const sourceDir = path.join(__dirname, "../template");

const copyRecursiveSync = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

console.log(`Creating a new FeatherLume app in ${targetDir}...`);
copyRecursiveSync(sourceDir, path.resolve(targetDir));

// Rename 'gitignore' back to '.gitignore' in the target directory
const renamedGitignore = path.join(targetDir, "gitignore");
if (fs.existsSync(renamedGitignore)) {
  fs.renameSync(renamedGitignore, path.join(targetDir, ".gitignore"));
}

// Rename 'env' back to '.env' in the target directory
const renamedEnv = path.join(targetDir, "env");
if (fs.existsSync(renamedEnv)) {
  fs.renameSync(renamedEnv, path.join(targetDir, ".env"));
}

console.log("Installing dependencies...");
execSync(`cd ${targetDir} && npm install`, { stdio: "inherit" });

console.log("\nAll set! Run:");
console.log(`  cd ${targetDir}`);
console.log("  npm start\n");
