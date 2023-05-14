import { IncomingMessage, ServerResponse } from "http";
import { getRequestData } from "../getRequestData";
import { fileController } from "../Controllers";
import { readFile } from "fs";
import FormData from "form-data";
const path = "./app/views/";

export const tagsRouter = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  if (request.url === undefined) return;
  switch (request.method) {
    case "GET":
      break;

    case "POST":
      // TODO tags post routing
      break;
    case "DELETE":
      break;
    case "PATCH":
      break;
  }
};
