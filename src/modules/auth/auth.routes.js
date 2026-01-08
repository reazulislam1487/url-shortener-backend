import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = express.Router();

/**
 * Register
 */
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //  Required fields check
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //  Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    //  Password validation (min 6 chars)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    //  Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //  Hash password
    const hash = await bcrypt.hash(password, 10);

    //  Create user
    await User.create({
      email: email.toLowerCase(),
      password: hash,
    });

    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Login
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
