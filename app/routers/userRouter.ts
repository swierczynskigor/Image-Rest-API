import { IncomingMessage, ServerResponse } from "http";
import { getDataFromUrl, getRequestData, verifyToken } from "../utils";
import { userController } from "../Controllers";
import { usersArray } from "../Data";

export const usersRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      if (request.url.match(/\/api\/user\/confirm\/(.*?)/)) {
        const token = verifyToken(getDataFromUrl(request.url));

        const userToConfirm: any = await token.then((data) => {
          return data;
        });
        console.log(userToConfirm.email, userToConfirm.name);
        usersArray
          .find(
            (user) =>
              user.email === userToConfirm.email &&
              user.name === userToConfirm.name
          )
          ?.verify();
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        response.end("Confimation completed");
      } else if (request.url === "/api/user") {
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        response.end(JSON.stringify(usersArray, null, 5));
      }
      break;

    case "POST":
      if (request.url.match("/api/user/register")) {
        const data: any = await getRequestData(request);

        response.writeHead(200, { "Content-Type": "application/json" });
        const res = await userController.register(data);
        if (res.includes("taken")) response.end(res);
        else
          response.end(
            "http://localhost:" +
              (process.env.PORT || 5000) +
              "/api/user/confirm/" +
              res
          );
      } else if (request.url.match("/api/user/login")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(await userController.login(request));
      } else if (request.url.match("/api/user/auth")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(await userController.auth(request)));
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
