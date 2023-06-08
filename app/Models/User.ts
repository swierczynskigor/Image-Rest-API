import { usersArray } from "../Data";
import { Photo } from "./Photo";

export class User {
  id: number;
  name: string;
  email: string;
  confimred: boolean;
  password: string;
  profilePic: Photo | null = null;
  public showingName: string;
  constructor(
    id: number,
    name: string,
    email: string,
    confirmed: boolean,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.showingName = name;
    this.email = email;
    this.confimred = confirmed;
    this.password = password;

    usersArray.push(this);
  }
  verify() {
    this.confimred = true;
  }
  setProfilePic(newPic: Photo) {
    this.profilePic = newPic;
  }
}
new User(
  0,
  "name",
  "name@email.pl",
  true,
  "8-$2b$08$zgpw9B.Txe3rzCT1BCWZHugw9AwvW4XVfoPN0ZZBuK4w.PDzjkTzG"
);
