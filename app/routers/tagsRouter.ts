import { IncomingMessage, ServerResponse } from "http";

export const tagsRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match("api/tags/raw")) {
      } else if (request.url.match("api/tags")) {
      } else if (request.url.match(/\/api\/tags\/([0-9]+)/)) {
      } else if (request.url.match("api/tags")) {
      }
      break;

    case "POST":
      if (request.url.match("api/tags")) {
      }
      // TODO tags post routing
      break;
    case "DELETE":
      break;
    case "PATCH":
      if (request.url.match("api/photos/tags")) {
      } else if (request.url.match("api/tags/tags/mass")) {
      }
      break;
  }
};
