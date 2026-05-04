const simpleGit = require("simple-git");
const git = simpleGit();

async function autoCommitPush(job) {
  const path = "./";

  await git.add(".");
  await git.commit(job.message || "auto commit by devops");
  await git.push("origin", "main");

  return { status: "pushed" };
}

module.exports = { autoCommitPush };
