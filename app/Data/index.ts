import { Photo } from "../Models/Photo";
import { User } from "../Models/User";

export let photosArray: Photo[] = [
  {
    id: 1684137205820,
    album: "album1",
    originalName: "input.jpg",
    url: "./app/uploads/album1/upload_fcd315f9d17b51b4a11fa300348ec6e5.jpg",
    description: "basicDesc",
    lastChagne: "original",
    history: [
      {
        status: "original",
        timestamp: 1684137205826,
      },
    ],
    tags: [],
    extension: "jpg",
  },
];

export const overritePhotosArray = (newArr: Photo[]) => (photosArray = newArr);

export const usersArray: User[] = [];
