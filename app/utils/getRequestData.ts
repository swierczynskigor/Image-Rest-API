import { IncomingMessage, ServerResponse } from "http";

export const getRequestData = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (part) => {
        body += part.toString();
      });

      req.on("end", () => {
        // mamy dane i zwracamy z promisy
        resolve(JSON.parse(JSON.stringify(body)));
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getRequestData };
