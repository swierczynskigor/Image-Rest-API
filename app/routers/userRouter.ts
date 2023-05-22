import { IncomingMessage, ServerResponse } from "http";
import {
  getDataFromUrl,
  getRequestData,
  verifyHeaderToken,
  verifyToken,
} from "../utils";
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
        console.log(res);
        if (res.includes("taken")) response.end(JSON.stringify({ token: res }));
        else
          response.end(
            JSON.stringify({
              token: "/api/user/confirm/" + res,
            })
          );
      } else if (request.url.match("/api/user/login")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify(await userController.login(request), null, 5)
        );
      } else if (request.url.match("/api/user/auth")) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({ success: await verifyHeaderToken(request) })
        );
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
