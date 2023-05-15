import { IncomingMessage } from "http";

export const getRequestData = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (part) => {
        body += part.toString();
      });

      req.on("end", () => {
        // mamy dane i zwracamy z promisy
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
