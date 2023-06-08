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
  localization: string | null;
  profile: boolean;
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
        { status: "original", url: url, timestamp: new Date().getTime() },
      ]);
    this.extension = extension;
    this.tags = [];
    this.tags = tags;
    this.localization = localization;
    if (profile === "false" || !profile) {
      this.profile = false;
      photosArray.push(this);
    } else {
      this.profile = true;
    }
  }
}
