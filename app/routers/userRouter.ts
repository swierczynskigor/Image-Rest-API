import { IncomingMessage, ServerResponse } from "http";
import { getId, getRequestData } from "../utils";

export const usersRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (
        request.url.search(/\/api\/user\/confirm\/(^[\w-]*\.[\w-]*\.[\w-]*$)/)
      ) {
        console.log(request.url);

        const token = getId(request.url);

        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        response.end(token);
      }
      break;

    case "POST":
      if (request.url.match("/api/user/register")) {
      }
      break;
    case "DELETE":
      break;
    case "PATCH":
      break;
    default:
      console.log("default");
      break;
  }
};
