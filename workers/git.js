const simpleGit = require("simple-git");
const git = simpleGit();

async function runGit(job) {
  const path = `./repo/${job.repo || "default"}`;

  if (job.action === "clone") {
    await git.clone(job.url, path);
    return { status: "cloned" };
  }

  if (job.action === "commit") {
    await git.cwd(path);
    await git.add(".");
    await git.commit(job.message || "auto commit");
    await git.push("origin", "main");
    return { status: "pushed" };
  }

  return { status: "git unknown" };
}

module.exports = { runGit };
