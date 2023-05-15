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
  extension: string;
  constructor(
    id: number,
    album: string,
    originalName: string,
    url: string,
    description: string,
    extension: string
  ) {
    this.id = id;
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.description = description;
    (this.lastChagne = "original"),
      (this.history = [
        { status: "original", timestamp: new Date().getTime() },
      ]);
    this.extension = extension;
    this.tags = [];
    photosArray.push(this);
  }
}
