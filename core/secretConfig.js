const fs = require("fs");

function loadEnv() {
  try {
    const raw = fs.readFileSync(".env", "utf-8");
    raw.split("\n").forEach(line => {
      const [k, v] = line.split("=");
      if (k && v) process.env[k.trim()] = v.trim();
    });
  } catch (e) {
    console.log("⚠️ .env missing");
  }
}

module.exports = { loadEnv };
