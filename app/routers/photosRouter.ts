import { IncomingMessage, ServerResponse } from "http";
import { fileController, tagsController } from "../Controllers";
import { Photo } from "../Models/Photo";
import { SavedImageI } from "../types";
import { getId, getRequestData } from "../utils";

export const photosRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        fileController.returFile(getId(request.url), response);
      } else if (request.url === "/api/photos") {
        fileController.getAll(response);
      }
      break;
    case "POST":
      if (request.url.match("api/photos")) {
        const image: SavedImageI = await fileController.saveFile(request);
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify(
            new Photo(
              image.id,
              image.album,
              image.originalName,
              image.url,
              image.description,
              image.extension,
              false
            ),
            null,
            5
          )
        );
      }
      break;
    case "DELETE":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        const res = await fileController.delete(getId(request.url));
        response.end(res);
      }
      break;
    case "PATCH":
      if (request.url.match("api/photos/tags/mass")) {
        const data: any = await getRequestData(request);
        response.writeHead(200, { "Content-Type": "application/json" });
        console.log(data);
        response.end(
          JSON.stringify(
            tagsController.addMassTagsToPhoto(data.id, data.tagsId),
            null,
            5
          )
        );
      } else if (request.url.match("api/photos/tags")) {
        const data: any = await getRequestData(request);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify(
            tagsController.addTagToPhoto(data.id, data.tagId),
            null,
            5
          )
        );
      } else if (request.url === "/api/photos") {
        response.writeHead(200, {
          "Content-type": "application/json",
        });
        response.end(
          JSON.stringify(
            fileController.update(await getRequestData(request)),
            null,
            5
          )
        );
      }
      break;
  }
};
