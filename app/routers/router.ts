import { IncomingMessage, ServerResponse } from "http";
import { photosRouter } from "./photosRouter";
import { tagsRouter } from "./tagsRouter";
import { usersRouter } from "./userRouter";

export const router = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  // images router
  if (request.url && request.url.search("/api/photos") != -1) {
    await photosRouter(request, response);
  }
  // tags router
  else if (request.url && request.url.search("/api/tags") != -1) {
    await tagsRouter(request, response);
  } //users router
  else if (request.url && request.url.search("/api/user") != -1) {
    await usersRouter(request, response);
  }
};
