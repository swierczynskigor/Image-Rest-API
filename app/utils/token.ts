import * as jwt from "jsonwebtoken";
require("dotenv").config();

export const createToken = async () => {
  return await jwt.sign(
    {
      email: "aaa@test.com",
      login: "isw0",
    },
    process.env.APP_PORT || "nasjkdfb", // powinno być w .env
    {
      expiresIn: "1d", // "1m", "1d", "24h"
    }
  );
};

export const verifyToken = async (token: string) => {
  try {
    let decoded = await jwt.verify(token, process.env.APP_PORT || "nasjkdfb");
    console.log({ decoded: decoded });
  } catch (ex: any) {
    console.log({ message: ex.message });
  }
};
