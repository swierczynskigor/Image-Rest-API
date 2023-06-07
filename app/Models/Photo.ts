import { photosArray } from "../Data";

export class Photo {
  id: number;
  album: string;
  originalName: string;
  url: string;
  description: string;
  lastChagne: string;
  history: { status: string; timestamp: number; url?: string }[];
  tags: string[];
  extension: string;
  profilePic: Photo | null = null;
  localization: string | null;
  constructor(
    id: number,
    album: string,
    originalName: string,
    url: string,
    description: string,
    extension: string,
    profile: string | boolean,
    tags: string[],
    localization: string | null = null
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
    if (profile === "false" || !profile) photosArray.push(this);
    this.tags = tags;
    this.localization = localization;
  }
}
