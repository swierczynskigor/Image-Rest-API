import { Photo } from "../Models/Photo";

export const fileOperations = {
  patch: (file: Photo, body: any) => {
    file.history.push({ status: body.status, timestamp: new Date().getTime() });
  },
};
