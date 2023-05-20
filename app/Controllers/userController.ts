import { IncomingMessage } from "http";
import { usersArray } from "../Data";
import { User } from "../Models/User";
import { RegisterUsetDataI } from "../types";
import {
  createToken,
  decryptPassword,
  encryptPassword,
  getRequestData,
  verifyToken,
} from "../utils";
import { rejects } from "assert";

export const userController = {
  register: async (userData: RegisterUsetDataI) => {
    if (usersArray.find((user) => user.email === userData.email))
      return "email taken";
    else if (usersArray.find((user) => user.name === userData.name))
      return "username taken";
    const newUser = new User(
      usersArray.length,
      userData.name,
      userData.email,
      false,
      await encryptPassword(userData.password)
    );
    return createToken(newUser);
  },
  login: async (request: IncomingMessage) => {
    return new Promise(async (resolve, reject) => {
      const userData: any = await getRequestData(request);
      const user = usersArray.find((user) => user.email === userData.email);
      if (!user) resolve("wrong email");
      else {
        if (await decryptPassword(userData.password, user.password))
          resolve(user.confimred ? createToken(user) : "confirm your account");
        else resolve("wrong password");
      }
    });
  },
  auth: async (request: IncomingMessage) => {
    return new Promise(async (resolve, reject) => {
      if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
      ) {
        const token = request.headers.authorization.split(" ")[1];
        const decoded: any = await verifyToken(token);
        if (decoded.name && decoded.email) resolve({ success: true });
        resolve({ success: false });
      }
      resolve({ success: false });
    });
  },
};
