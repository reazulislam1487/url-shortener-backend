import { validateRegister } from "./auth.validation.js";
import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const error = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const { email, password } = req.body;
    await registerUser(email, password);

    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ message: err.message });
    }
    next(err);
  }
};
