import { IncomingMessage } from "http";
import path from "path";
import * as fs from "fs";
import formidable from "formidable";

export const fileController = {
  saveFile: (request: IncomingMessage) => {
    let filePath: string | string[] = path.dirname(__dirname).split("/");
    filePath.slice(-2);
    filePath = filePath.join("/");
    let toReturn: string[];
    const form = formidable({
      multiples: true,
      uploadDir: filePath,
      keepExtensions: true,
    });
    form.parse(request, function (err: any, fields: any, files: any) {
      if (err) {
        console.error(err);
        return "ERROR";
      }
      // Create a new directory with a unique name based on the current timestamp
      const dirPath = filePath + "/uploads/" + fields.album;
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Move the uploaded file to the new directory
      const imgName: string = files.file.path.split("/").slice(-1)[0];
      const oldPath = files.file.path;
      const newPath = path.join(dirPath, imgName);
      fs.renameSync(oldPath, newPath);

      console.log("Image saved to:", newPath);
      return newPath.split("/").slice(-3);
    });
  },
  add: (name: string, color: string) => {},
  delete: (id: string) => {
    // usuwanie po id z animalsArray
  },
  update: (id: string) => {
    // update po id elementu animalsArray
  },
  getall: () => {},
};
