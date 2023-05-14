import { IncomingMessage, ServerResponse } from "http";
import { getRequestData } from "../getRequestData";
import { fileController } from "../Controllers";
import { readFile } from "fs";
import FormData from "form-data";
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
        // let data: any = await getRequestData(request);
        const path = await fileController.saveFile(request);
        console.log("XD", path);
        response.writeHead(200, { "content-type": "text/plain" });
        response.write("Received image:\n\n" + path);
        response.end(new Image());
      }
      break;
    case "DELETE":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
      }
      break;
    case "PATCH":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) break;
  }
};
