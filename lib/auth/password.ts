import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export const validatePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
