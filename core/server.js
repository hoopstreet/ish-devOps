const express = require("express");
const { route } = require("./router");

const app = express();
app.use(express.json());

app.post("/job", async (req, res) => {
  const result = await route(req.body);
  res.json(result);
});

app.listen(4000, "0.0.0.0", () => {
  console.log("ISH-DEVOPS RUNNING");
});
