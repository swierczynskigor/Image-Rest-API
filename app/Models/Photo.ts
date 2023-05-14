import { photosArray } from "../Data";

export class Photo {
  id: number;
  album: string;
  originalName: string;
  url: string;
  description: string;
  lastChagne: string;
  history: { status: string; timestamp: number; url?: string }[];
  tags: any[];
  constructor(
    id: number,
    album: string,
    originalName: string,
    url: string,
    description: string
  ) {
    this.id = new Date().getTime();
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.description = description;
    (this.lastChagne = "original"),
      (this.history = [
        { status: "original", timestamp: new Date().getTime() },
      ]);
    this.tags = [];
    photosArray.push(this);
  }
}
