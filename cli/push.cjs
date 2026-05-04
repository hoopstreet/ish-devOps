const http = require("http");

const data = JSON.stringify({
  type: "git",
  action: "commit",
  repo: "ish-devOps",
  message: process.argv.slice(2).join(" ") || "auto commit"
});

const req = http.request({
  hostname: "127.0.0.1",
  port: 4000,
  path: "/job",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data)
  }
}, res => {
  let body = "";
  res.on("data", c => body += c);
  res.on("end", () => console.log(body));
});

req.on("error", e => {
  console.log("⚠️ Server not running. Start: node core/server.js");
});

req.write(data);
req.end();
