import { createServer, IncomingMessage, ServerResponse } from "http";
import { router } from "./app";

const port = 5000;

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    router(request, response);
  }
);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
