import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export const registerUser = async (email, password) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email: email.toLowerCase(),
    password: hash,
  });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
