import { IncomingMessage, ServerResponse } from "http";
import { photosRouter } from "./photosRouter";
import { tagsRouter } from "./tagsRouter";
import { usersRouter } from "./userRouter";
import { filtersRouter } from "./filtersRouter";
import { profileRouter } from "./profileRouter";

export const router = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  // images router
  console.log(request.url);
  if (request.url && request.url.search("/api/photos") != -1) {
    await photosRouter(request, response);
  } else if (request.url && request.url.search("/api/filters") != -1) {
    await filtersRouter(request, response);
  }
  // tags router
  else if (request.url && request.url.search("/api/tags") != -1) {
    await tagsRouter(request, response);
  } //users router
  else if (request.url && request.url.search("/api/user") != -1) {
    await usersRouter(request, response);
  } else if (request.url && request.url.search("/api/profile") != -1) {
    await profileRouter(request, response);
  }
};
