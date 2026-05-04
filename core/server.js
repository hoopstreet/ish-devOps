const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// health check
app.get("/", (req, res) => {
  res.json({
    status: "ish-devOps ACTIVE",
    time: new Date().toISOString()
  });
});

// safe endpoint
app.post("/run", (req, res) => {
  res.json({ ok: true, message: "system stable" });
});

app.listen(PORT, () => {
  console.log("🚀 ish-devOps running on", PORT);
});
