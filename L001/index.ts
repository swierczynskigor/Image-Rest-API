const http = require("http");
const router = require("./app/router");

http
  .createServer((req, res) => router(req, res))
  .listen(5000, () => console.log("listen on 5000"));
