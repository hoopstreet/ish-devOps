const http = require("http");

const data = JSON.stringify({
  type: "auto",
  message: process.argv.slice(2).join(" ")
});

const req = http.request({
  hostname: "127.0.0.1",
  port: 4000,
  path: "/job",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, res => {
  let body = "";
  res.on("data", c => body += c);
  res.on("end", () => console.log(body));
});

req.on("error", e => console.error("ERROR:", e.message));
req.write(data);
req.end();
