const simpleGit = require("simple-git");
const git = simpleGit();

async function runGit(job) {
  const path = `./repo/${job.repo || "default"}`;

  try {
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

  } catch (err) {
    console.log("❌ ERROR DETECTED → ROLLBACK");

    await git.reset(["--hard"]);
    await git.clean("f", ["-d"]);

    return {
      status: "rolled_back",
      error: err.message
    };
  }
}

module.exports = { runGit };
