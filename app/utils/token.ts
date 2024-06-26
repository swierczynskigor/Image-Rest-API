import * as jwt from "jsonwebtoken";
import { User } from "../Models/User";
import { IncomingMessage } from "http";
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

export const verifyHeaderToken = async (request: IncomingMessage) => {
  try {
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      const token = request.headers.authorization.split(" ")[1];
      const decoded: any = await jwt.verify(
        token,
        process.env.APP_PORT || "nasjkdfb"
      );
      if (
        decoded.name &&
        decoded.email &&
        new Date(decoded.exp * 1000) > new Date()
      )
        return true;
      else return false;
    }
  } catch (ex: any) {
    console.log({ message: ex.message });
    return false;
  }
};

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, process.env.APP_PORT || "nasjkdfb");
  } catch (ex: any) {
    console.log({ message: ex.message });
  }
};
