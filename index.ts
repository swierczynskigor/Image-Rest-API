import { createServer, IncomingMessage, ServerResponse } from "http";
import { router } from "./app";
require("dotenv").config();

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    router(request, response);
  }
);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
