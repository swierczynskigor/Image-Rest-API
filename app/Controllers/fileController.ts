import { IncomingMessage } from "http";
import path from "path";
import * as fs from "fs";
import formidable from "formidable";
import { rejects } from "assert";

export const fileController = {
  saveFile: (request: IncomingMessage) => {
    let filePath: string | string[] = path.dirname(__dirname).split("/");
    filePath.slice(-2);
    filePath = filePath.join("/");
    let toReturn: string[];
    console.log(filePath);
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    // form.parse(request, function (err: any, fields: any, files: any) {
    //   if (err) {
    //     console.error(err);
    //     return "ERROR";
    //   }
    //   // Create a new directory with a unique name based on the current timestamp
    //   const dirPath = filePath + "/uploads/" + fields.album;
    //   if (!fs.existsSync(dirPath)) {
    //     fs.mkdirSync(dirPath, { recursive: true });
    //   }

    //   // Move the uploaded file to the new directory
    //   const imgName: string = files.file.path.split("/").slice(-1)[0];
    //   const oldPath = files.file.path;
    //   const newPath = path.join(dirPath, imgName);
    //   fs.renameSync(oldPath, newPath);

    //   console.log("Image saved to:", newPath);
    //   return newPath.split("/").slice(-3);
    // });

    return new Promise(
      (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
        form.parse(request, (err: any, fields: any, files: any) => {
          //create album if it doesn't exists
          let dir = "./app/uploads/" + fields.album;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          //save file
          const file = files.file;

          try {
            let newFileName = file.path.split("\\");
            newFileName = newFileName[newFileName.length - 1];

            let newPath = `${dir}/${newFileName}`;

            console.log(newPath);

            fs.writeFile(newPath, fs.readFileSync(file.path), function (err) {
              if (err) {
                return console.log(err);
              }

              resolve({
                id: new Date().getTime(),
                album: fields.album,
                originalName: file.name,
                url: newPath,
                description: fields.description ? fields.description : "",
              });
            });
          } catch (error) {
            console.log(error);
            reject("formidable parse error");
          }
        });
      }
    );
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
