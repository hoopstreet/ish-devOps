import axios from "axios";

const cmd = process.argv.slice(2).join(" ");

axios.post("http://localhost:4000/job", {
  repo: "ish-devOps",
  payload: cmd
}).then(r => {
  console.log("RESULT:", r.data);
}).catch(err => {
  console.error("ERROR:", err.message);
});
