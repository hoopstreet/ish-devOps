import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const MEMORY_FILE = "./memory/store.json";

function load() {
  if (!fs.existsSync(MEMORY_FILE)) return {};
  return JSON.parse(fs.readFileSync(MEMORY_FILE));
}

function save(data) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
}

app.post("/job", (req, res) => {
  const { repo, payload } = req.body;

  const mem = load();

  if (!mem[repo]) {
    mem[repo] = { logs: [] };
  }

  mem[repo].logs.push({
    time: Date.now(),
    payload
  });

  save(mem);

  res.json({
    status: "ok",
    repo,
    total_logs: mem[repo].logs.length
  });
});

app.get("/", (req, res) => {
  res.send("🚀 ish-devOps running");
});

app.listen(4000, () => {
  console.log("🚀 DEVOS RUNNING ON 4000");
});
