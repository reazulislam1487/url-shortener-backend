import express from "express";
import Url from "../../models/Url.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { generateCode } from "../../utils/generateCode.js";

const router = express.Router();

/**
 * Create short URL
 */
router.post("/", auth, async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: "Invalid URL" });

    const count = await Url.countDocuments({ userId: req.user.id });
    if (count >= 100) {
      return res.status(403).json({
        message: "Free tier limit reached. Please upgrade.",
      });
    }

    const shortCode = generateCode();

    const url = await Url.create({
      userId: req.user.id,
      originalUrl,
      shortCode,
    });

    res.json({
      shortCode,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * List URLs
 */
router.get("/", auth, async (req, res, next) => {
  try {
    const urls = await Url.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(urls);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete URL
 */
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await Url.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
