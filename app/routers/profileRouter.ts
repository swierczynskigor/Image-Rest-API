import { IncomingMessage, ServerResponse } from "http";
import { getId, getRequestData, verifyHeaderToken } from "../utils";
import { fileController, tagsController } from "../Controllers";
import { usersArray } from "../Data";
import { SavedImageI } from "../types";
import { Photo } from "../Models/Photo";

export const tagsRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/profile\/([0-9]+)/)) {
        const res = await verifyHeaderToken(request);
        if (res) {
          const id = getId(request.url);
          const user = usersArray.find((user) => user.id === id);
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(
            JSON.stringify(
              {
                name: user?.name,
                email: user?.email,
                profilePic: user?.profilePic,
              },
              null,
              5
            )
          );
        } else {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end("not valid token");
        }
      } else if (request.url.match(/\/api\/profile\/logout\/([0-9]+)/)) {
      }
      break;

    case "POST":
      if (request.url.match("api/profile")) {
        const data: any = await getRequestData(request);

        const image: SavedImageI = await fileController.saveFile(request);
        response.writeHead(200, { "content-type": "application/json" });
        const user = usersArray.find((user) => data.id === user.id);
        user?.setProfilePic(
          new Photo(
            image.id,
            image.album,
            image.originalName,
            image.url,
            image.description,
            image.extension,
            true,
            []
          )
        );
        response.end(JSON.stringify(user, null, 5));
      }
      break;
    case "DELETE":
      break;
    case "PATCH":
      if (request.url.match("api/profile")) {
        const data: any = await getRequestData(request);
        const user = usersArray.find((user) => data.id === user.id);
        const res = await verifyHeaderToken(request);
        if (res) {
        }
      }
      break;
    default:
      console.log("default");
      break;
  }
};
