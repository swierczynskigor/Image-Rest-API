import { compare, genSalt, hash } from "bcrypt";

export const encryptPassword: (password: string) => Promise<string> = async (
  password: string
) => {
  const saltRounds = Math.round(Math.random() * (8 - 2) + 2);
  const result = await genSalt(saltRounds).then((salt) => {
    return hash(password, salt);
  });
  return saltRounds + "-" + result;
};

export const decryptPassword: (
  password: string,
  hash: string
) => Promise<boolean> = (password: string, hash: string) => {
  const [saltRounds, pass] = hash.split("-");
  const result = compare(password, pass).then((res: boolean) => {
    return res; // return true
  });
  return result;
};
