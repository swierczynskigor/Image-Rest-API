import { Photo } from "../Models/Photo";
import { User } from "../Models/User";

export let photosArray: Photo[] = [
  {
    id: 1684176920897,
    album: "album1",
    originalName: "input.jpg",
    url: "./app/uploads/album1/upload_871b287c83e1286992477cfc33a1ecf2.jpg",
    description: "basicDesc",
    lastChagne: "original",
    history: [
      {
        status: "original",
        timestamp: 1684176920899,
      },
    ],
    extension: "jpg",
    tags: [],
  },
];

export const overritePhotosArray = (newArr: Photo[]) => (photosArray = newArr);

export const usersArray: User[] = [];
