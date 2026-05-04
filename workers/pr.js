const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function runPR(job) {
  const res = await octokit.pulls.create({
    owner: process.env.GITHUB_OWNER,
    repo: job.repo,
    title: job.title || "auto PR",
    body: job.body || "auto generated PR",
    head: job.head || "auto-branch",
    base: "main"
  });

  return { status: "pr_created", url: res.data.html_url };
}

module.exports = { runPR };
