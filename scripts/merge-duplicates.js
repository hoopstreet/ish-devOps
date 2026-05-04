const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes("node_modules")) walk(full, files);
    } else {
      files.push(full);
    }
  });
  return files;
}

// simple duplicate detector by filename
const files = walk(root);

const map = {};
files.forEach(f => {
  const name = path.basename(f);
  if (!map[name]) map[name] = [];
  map[name].push(f);
});

console.log("🔍 Scanning duplicates...\n");

Object.keys(map).forEach(name => {
  if (map[name].length > 1) {
    console.log("⚠️ DUPLICATE:", name);
    map[name].forEach(f => console.log("  -", f));

    // keep latest file only
    const sorted = map[name].sort();
    sorted.slice(0, -1).forEach(old => {
      fs.unlinkSync(old);
      console.log("🗑 removed:", old);
    });
  }
});

console.log("\n✅ Dedupe complete");
