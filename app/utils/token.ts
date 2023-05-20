import * as jwt from "jsonwebtoken";
import { User } from "../Models/User";
require("dotenv").config();

export const createToken = async (user: User) => {
  return await jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    process.env.APP_PORT || "nasjkdfb", // powinno być w .env
    {
      expiresIn: "1d", // "1m", "1d", "24h"
    }
  );
};

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, process.env.APP_PORT || "nasjkdfb");
  } catch (ex: any) {
    console.log({ message: ex.message });
  }
};
