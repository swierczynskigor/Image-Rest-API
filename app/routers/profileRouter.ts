import { IncomingMessage, ServerResponse } from "http";
import { getDataFromUrl, getRequestData, verifyHeaderToken } from "../utils";
import { fileController } from "../Controllers";
import { usersArray } from "../Data";
import { SavedImageI } from "../types";
import { Photo } from "../Models/Photo";

export const profileRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  console.log(request.url);
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/profile\/([0-9a-zA-Z]+)/)) {
        const id = getDataFromUrl(request.url);
        const user = usersArray.find((user) => user.name === id);
        if (user?.profilePic)
          fileController.returFile(user?.profilePic, response);
        else response.end(null);
      } else if (request.url.match(/\/api\/profile\/logout\/([0-9]+)/)) {
      }
      break;

    case "POST":
      if (request.url.match("api/profile")) {
        console.log("XDDDDD");
        const image: SavedImageI = await fileController.saveFile(request);
        response.writeHead(200, { "content-type": "application/json" });
        const user = usersArray.find((user) => image.album === user.name);
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
        console.log(user);
        response.end(JSON.stringify(user, null, 5));
      }
      break;
    case "DELETE":
      break;
    case "PATCH":
      if (request.url.match("api/profile")) {
        const data: any = await getRequestData(request);
        const user = usersArray.find((user) => data.name === user.name);
        if (user) {
          user!.showingName = data.newName;
        }
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify(user, null, 5));
      }
      break;
    default:
      break;
  }
};
