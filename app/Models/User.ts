import { usersArray } from "../Data";

export class User {
  id: number;
  name: string;
  email: string;
  confimred: boolean;
  password: string;
  constructor(
    id: number,
    name: string,
    email: string,
    confirmed: boolean,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.confimred = confirmed;
    this.password = password;

    usersArray.push(this);
  }
  verify() {
    this.confimred = true;
  }
}
