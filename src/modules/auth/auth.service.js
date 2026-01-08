import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS } = process.env;

if (!JWT_SECRET || !JWT_EXPIRES_IN || !BCRYPT_SALT_ROUNDS) {
  throw new Error(" Missing environment variables");
}

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(BCRYPT_SALT_ROUNDS)
  );

  await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
  });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};
