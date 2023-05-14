import { IncomingMessage } from "http";
import path from "path";
import * as fs from "fs";
import formidable from "formidable";
import { rejects } from "assert";
import { SavedImageI } from "../types";
import { overritePhotosArray, photosArray } from "../Data";

export const fileController = {
  saveFile: (request: IncomingMessage) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    return new Promise(
      (
        resolve: (value: SavedImageI) => void,
        reject: (reason?: any) => void
      ) => {
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
  delete: (id: number) => {
    // usuwanie po id z photosArray
    const toDel = photosArray.find((photo) => photo.id === id);
    if (toDel) {
      overritePhotosArray(photosArray.filter((photo) => photo.id !== id));
      fs.unlink(toDel.url, (err) => {
        if (err) throw err;
      });
      return "file deleted successfuly";
    } else {
      return "this file doesn't exists";
    }
    return "XD?";
  },
  update: (id: string) => {
    // update po id elementu animalsArray
  },
  getall: () => {},
};
