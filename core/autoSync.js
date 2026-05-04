const { execSync } = require("child_process");

function syncToGit(msg = "auto-sync") {
  try {
    execSync("git add .");
    execSync(`git commit -m "${msg}"`);
    execSync("git push origin main");
    console.log("✅ GitHub synced");
  } catch (e) {
    console.log("⚠️ Git sync failed:", e.message);
  }
}

module.exports = { syncToGit };
