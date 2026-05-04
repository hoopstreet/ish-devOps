const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function createPR({ owner, repo, title, body, head, base }) {
  return await octokit.pulls.create({
    owner,
    repo,
    title,
    body,
    head,
    base
  });
}

module.exports = { createPR };
