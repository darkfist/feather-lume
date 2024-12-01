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
console.log("Installing dependencies...");
execSync(`cd ${targetDir} && npm install`, { stdio: "inherit" });

console.log("All set! Run:");
console.log(`  cd ${targetDir}`);
console.log("  npm start");
