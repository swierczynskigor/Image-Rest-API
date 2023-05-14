import { Photo } from "../Models/Photo";
import { User } from "../Models/User";

export let photosArray: Photo[] = [
  {
    id: 1684094306037,
    album: "album1",
    originalName: "input.jpg",
    url: "./app/uploads/album1/upload_c29e69bfa50f7b17bd7c656fac8d2eb0.jpg",
    description: "basicDesc",
    lastChagne: "original",
    history: [
      {
        status: "original",
        timestamp: 1684094306040,
      },
    ],
    tags: [],
  },
];

export const overritePhotosArray = (newArr: Photo[]) => (photosArray = newArr);

export const usersArray: User[] = [];
