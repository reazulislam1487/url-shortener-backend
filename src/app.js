import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import urlRoutes from "./modules/url/url.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import Url from "./models/Url.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/urls", urlRoutes);

/**
 * Redirect + click tracking
 */

// test api
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});
app.get("/:shortCode", async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).send("Not Found");

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

export default app;
