import { IncomingMessage, ServerResponse } from "http";
import { getId, getRequestData } from "../utils";
import { photosArray } from "../Data";
import { fileController, filterController } from "../Controllers";

export const filtersRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  response.writeHead(200, { "Content-Type": "application/json" });
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
        const photo = photosArray.find(
          (photo) => photo.id === getId(request.url!)
        );
        if (photo) {
          const metadata = await filterController.getMetaData(photo.url);

          response.end(JSON.stringify(metadata, null, 5));
        } else {
          response.end(JSON.stringify({ res: "not found" }));
        }
      }
      break;
    case "PATCH":
      if (request.url === "/api/filters") {
        const dataImage: any = await getRequestData(request);
        fileController.patchPhoto({
          id: dataImage.id,
          content: {
            status: dataImage.type,
            url:
              dataImage.url.slice(0, dataImage.url.lastIndexOf(".")) +
              "-" +
              dataImage.type +
              ".jpg",
          },
        });

        await filterController.editPhoto(
          dataImage.url,
          dataImage.type,
          dataImage.params
        );
        const photo = photosArray.find((photo) => photo.url === dataImage.url);
        if (photo) {
          response.writeHead(201, { "Content-Type": "application/json" });
          response.write(JSON.stringify(photo));
        } else {
        }
      }
      break;
  }
  response.end();
};
