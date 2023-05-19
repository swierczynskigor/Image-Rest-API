import * as jwt from "jsonwebtoken";

export const createToken = async () => {
  let token = await jwt.sign(
    {
      email: "aaa@test.com",
      login: "isw0",
    },
    process.env.APP_PORT || "tget", // powinno być w .env
    {
      expiresIn: "365d", // "1m", "1d", "24h"
    }
  );
  console.log({ token: token });
};

export const verifyToken = async (token: string) => {
  try {
    let decoded = await jwt.verify(token, "verysecretkey");
    console.log({ decoded: decoded });
  } catch (ex: any) {
    console.log({ message: ex.message });
  }
};
