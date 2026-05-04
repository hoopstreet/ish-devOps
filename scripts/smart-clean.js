const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const KEEP_DIRS = new Set([
  ".git",
  "node_modules",
  "core",
  "scripts",
  "github",
  "memory",
  ".github"
]);

function walk(dir, out = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      if (!KEEP_DIRS.has(file)) {
        walk(full, out);
      } else {
        walk(full, out);
      }
    } else {
      out.push(full);
    }
  });
  return out;
}

// group by filename
const files = walk(ROOT);

const map = {};
for (const f of files) {
  const name = path.basename(f);
  if (!map[name]) map[name] = [];
  map[name].push(f);
}

console.log("🧠 Scanning duplicates...\n");

for (const [name, list] of Object.entries(map)) {
  if (list.length > 1) {
    console.log("⚠️ DUPLICATE:", name);

    // keep priority:
    // core > scripts > github > others
    const priority = (p) => {
      if (p.includes("/core/")) return 1;
      if (p.includes("/scripts/")) return 2;
      if (p.includes("/github/")) return 3;
      return 9;
    };

    list.sort((a, b) => priority(a) - priority(b));

    const keep = list[0];
    console.log("✅ KEEP:", keep);

    for (let i = 1; i < list.length; i++) {
      console.log("🗑 REMOVE:", list[i]);
      try {
        fs.rmSync(list[i]);
      } catch (e) {}
    }

    console.log("");
  }
}

console.log("🚀 CLEAN COMPLETE");
