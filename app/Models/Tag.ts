export class Tag {
  popularity: number;
  name: string;
  id: number;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.popularity = Math.floor(Math.random() * 2000);
  }
}
