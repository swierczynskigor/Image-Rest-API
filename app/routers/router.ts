import { IncomingMessage, ServerResponse } from "http";
import { photosRouter } from "./photosRouter";
import { tagsRouter } from "./tagsRouter";

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
  }
};
