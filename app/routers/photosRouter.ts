import { IncomingMessage, ServerResponse } from "http";
import { getRequestData } from "../getRequestData";
import { fileController } from "../Controllers";
import { readFile } from "fs";
import FormData from "form-data";
import { Photo } from "../Models/Photo";
import { SavedImageI } from "../types";
const path = "./app/views/";

export const photosRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        response.end("XD");
      } else if (request.url === "/api/photos") {
        response.end("XDDDDD");
      }

      // strona views/index.html
      break;
    case "POST":
      if (request.url.match("api/photos")) {
        const image: SavedImageI = await fileController.saveFile(request);
        response.writeHead(200, { "content-type": "text/plain" });
        response.end(
          JSON.stringify(
            new Photo(
              image.id,
              image.album,
              image.originalName,
              image.url,
              image.description
            ),
            null,
            5
          )
        );
      }
      break;
    case "DELETE":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        const slicedUrl = request.url.split("/");
        const res = await fileController.delete(
          Number(slicedUrl[slicedUrl.length - 1])
        );
        response.end(res);
      }
      break;
    case "PATCH":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) break;
  }
};
