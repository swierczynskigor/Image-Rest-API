export class Image {
  id: number;
  album: string;
  constructor(url: string) {
    const slicedUrl = url.split("/").filter((i) => i !== "");
    this.id = new Date().getTime();
    this.album = slicedUrl[slicedUrl.length - 2];
  }
}
