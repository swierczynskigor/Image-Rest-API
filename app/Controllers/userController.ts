import { IncomingMessage } from "http";
import { usersArray } from "../Data";
import { User } from "../Models/User";
import { RegisterUsetDataI } from "../types";
import {
  createToken,
  decryptPassword,
  encryptPassword,
  getRequestData,
  verifyHeaderToken,
} from "../utils";

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
      const user = usersArray.find(
        (user) => user.email === userData.name || user.name === userData.name
      );
      if (!user) resolve({ isSuccess: false });
      else {
        if (await decryptPassword(userData.password, user.password))
          resolve(
            user.confimred
              ? {
                  token: await createToken(user),
                  name: user.name,
                  success: true,
                  showingName: user.showingName,
                }
              : "confirm your account"
          );
        else resolve({ success: false });
      }
    });
  },
};
