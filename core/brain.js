const { runGit } = require("../workers/git");
const { runAI } = require("../workers/ai");

async function scanAndFix() {
  console.log("🧠 MANUAL SCAN START");

  const issues = await runAI({ type: "scan" });

  if (issues) {
    console.log("⚠️ AUTO FIX TRIGGERED");

    await runGit({
      action: "commit",
      repo: "ish-devOps",
      message: "auto-heal: system repair"
    });
  }

  console.log("✅ SCAN COMPLETE");
}

function startBrain() {
  console.log("🧠 Brain READY (manual mode only)");
}

module.exports = { startBrain, scanAndFix };
