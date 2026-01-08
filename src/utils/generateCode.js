import { nanoid } from "nanoid";

export const generateCode = () => {
  return nanoid(7); // 6–8 chars requirement met
};
