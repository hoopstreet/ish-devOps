const { runAI } = require("../workers/ai");
const { runGit } = require("../workers/git");
const { runPR } = require("../workers/pr");
const { autoCommitPush } = require("../workers/autoGit");

async function route(job) {
  if (job.type === "ai") return runAI(job);
  if (job.type === "git") return runGit(job);
  if (job.type === "pr") return runPR(job);
  if (job.type === "auto") return autoCommitPush(job);

  return { status: "unknown job" };
}

module.exports = { route };
