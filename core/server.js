const express = require("express");
<<<<<<< HEAD
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
=======
const { route } = require("./router");
const { startBrain } = require("./brain");

const app = express();
app.use(express.json());

app.post("/job", async (req, res) => {
  try {
    const result = await route(req.body);
    res.json(result);
  } catch (e) {
    res.json({ status: "error", message: e.message });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("ISH-DEVOPS RUNNING");
  startBrain();
>>>>>>> 63a97a7bf58dcd1f6356a7c812aa9f14e6adc839
});
