import { IncomingMessage, ServerResponse } from "http";
import { getId, getRequestData } from "../utils";
import { tagsController } from "../Controllers";

export const tagsRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match("api/tags/raw")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(tagsController.getRaw(), null, 5));
      } else if (request.url.match(/\/api\/tags\/([0-9]+)/)) {
        const id = getId(request.url);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(tagsController.getTagById(id), null, 5));
      } else if (request.url.match("api/tags")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(tagsController.getAll(), null, 5));
      }
      break;

    case "POST":
      if (request.url.match("api/tags")) {
        const data = await getRequestData(request);

        response.writeHead(200, { "Content-Type": "application/json" });

        response.end(
          typeof data === "string"
            ? JSON.stringify(tagsController.add(data), null, 5)
            : "Wrong type of data"
        );
      }
      break;
    case "DELETE":
      break;
    case "PATCH":
      if (request.url.match("api/photos/tags")) {
        const data: any = await getRequestData(request);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify(
            tagsController.addTagToPhoto(data.id, data.tagId),
            null,
            5
          )
        );
      } else if (request.url.match("api/tags/tags/mass")) {
      }
      break;
  }
};
