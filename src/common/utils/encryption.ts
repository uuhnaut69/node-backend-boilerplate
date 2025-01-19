import { hash, compare } from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
  return hash(password, 10);
};

export const verify = async (
  encrypted: string,
  password: string
): Promise<boolean> => {
  return compare(password, encrypted);
};
