import { Photo } from "../Models/Photo";
import { Tag } from "../Models/Tag";
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

export const tagsArray: Tag[] = [
  {
    id: 0,
    name: "#love",
    popularity: 1374,
  },
  {
    id: 1,
    name: "#instagood",
    popularity: 554,
  },
  {
    id: 2,
    name: "#fashion",
    popularity: 782,
  },
  {
    id: 3,
    name: "#photooftheday",
    popularity: 1474,
  },
  {
    id: 4,
    name: "#art",
    popularity: 1420,
  },
  {
    id: 5,
    name: "#photography",
    popularity: 1369,
  },
  {
    id: 6,
    name: "#beautiful",
    popularity: 1172,
  },
  {
    id: 7,
    name: "#picoftheday",
    popularity: 1720,
  },
  {
    id: 8,
    name: "#nature",
    popularity: 304,
  },
  {
    id: 9,
    name: "#happy",
    popularity: 260,
  },
  {
    id: 10,
    name: "#cute",
    popularity: 413,
  },
  {
    id: 11,
    name: "#travel",
    popularity: 636,
  },
  {
    id: 12,
    name: "#style",
    popularity: 571,
  },
  {
    id: 13,
    name: "#followme",
    popularity: 1033,
  },
  {
    id: 14,
    name: "#tbt",
    popularity: 259,
  },
  {
    id: 15,
    name: "#instadaily",
    popularity: 1514,
  },
  {
    id: 16,
    name: "#repost",
    popularity: 1795,
  },
  {
    id: 17,
    name: "#like4like",
    popularity: 1563,
  },
  {
    id: 18,
    name: "#summer",
    popularity: 494,
  },
  {
    id: 19,
    name: "#beauty",
    popularity: 707,
  },
  {
    id: 20,
    name: "#fitness",
    popularity: 853,
  },
  {
    id: 21,
    name: "#food",
    popularity: 1641,
  },
  {
    id: 22,
    name: "#selfie",
    popularity: 679,
  },
  {
    id: 23,
    name: "#me",
    popularity: 573,
  },
  {
    id: 24,
    name: "#instalike",
    popularity: 1172,
  },
  {
    id: 25,
    name: "#girl",
    popularity: 641,
  },
  {
    id: 26,
    name: "#friends",
    popularity: 1567,
  },
  {
    id: 27,
    name: "#fun",
    popularity: 1836,
  },
  {
    id: 28,
    name: "#photo",
    popularity: 1107,
  },
];

export const overritePhotosArray = (newArr: Photo[]) => (photosArray = newArr);

export const usersArray: User[] = [];
