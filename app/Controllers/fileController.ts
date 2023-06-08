import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import formidable from "formidable";
import { SavedImageI } from "../types";
import { overritePhotosArray, photosArray } from "../Data";
import { fileOperations } from "../utils";
import { Photo } from "../Models/Photo";

export const fileController = {
  returFile: (file: Photo, response: ServerResponse) => {
    if (file) {
      let path = file.url;
      if (file.history.length > 1)
        path = file.history[file.history.length - 1].url!;
      console.log(path);
      const stat = fs.statSync(path);

      if (file.extension === "mp4")
        response.writeHead(200, {
          "Content-Type": "video/" + file.extension,
          "Content-Length": stat.size,
        });
      else
        response.writeHead(200, {
          "Content-Type": "image/" + file.extension,
          "Content-Length": stat.size,
        });

      fs.readFile(path, function (err, content) {
        // Serving the image
        response.end(content);
      });
    } else {
      response.end("404");
    }
  },
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
            let splitedFilePath: string[] = [];
            if (file.path.includes("/")) splitedFilePath = file.path.split("/");
            else splitedFilePath = file.path.split("\\");

            const newFileName = splitedFilePath[splitedFilePath.length - 1];
            let newPath = `${dir}/${newFileName}`;

            fs.writeFile(newPath, fs.readFileSync(file.path), function (err) {
              if (err) {
                return console.log(err);
              }
              const extension = newFileName.split(".")[1];
              console.log(extension);

              resolve({
                id: new Date().getTime(),
                album: fields.album,
                originalName: file.name,
                url: newPath,
                description: fields.description ? fields.description : "",
                extension,
                localization: fields.localization || null,
                tags: fields.tags.split(",") || [],
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
  },
  update: (body: any) => {
    const file = photosArray.find((photo) => photo.id === body.id);
    if (file) {
      fileOperations.patch(file, body);
    }

    return file;
  },
  getFromAlbum: (album: string, response: ServerResponse) => {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(
      JSON.stringify(
        photosArray.filter((photo) => photo.album === album),
        null,
        5
      )
    );
  },
  getAll: (response: ServerResponse) => {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify(photosArray, null, 5));
  },
  patchPhoto: (data: any) => {
    if (!data.id) return null;
    const photo = photosArray.find((item) => {
      return item.id == parseInt(data.id);
    });

    if (!photo) return null;
    fileOperations.patch(photo, data.content);
    return photo.id;
  },
};
