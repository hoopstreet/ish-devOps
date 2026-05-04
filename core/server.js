const express = require("express");
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
});
