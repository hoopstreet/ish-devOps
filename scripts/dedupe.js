const fs = require("fs");
const path = require("path");

function walk(dir, list = []) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes("node_modules") && !full.includes(".git")) {
        walk(full, list);
      }
    } else list.push(full);
  });
  return list;
}

const files = walk(process.cwd());
const map = {};

files.forEach(f => {
  const name = path.basename(f);
  if (!map[name]) map[name] = [];
  map[name].push(f);
});

Object.keys(map).forEach(name => {
  if (map[name].length > 1) {
    console.log("⚠️ DUP:", name);
    map[name].sort().slice(0, -1).forEach(old => {
      try {
        fs.unlinkSync(old);
        console.log("🗑 removed", old);
      } catch {}
    });
  }
});

console.log("✅ dedupe complete");
