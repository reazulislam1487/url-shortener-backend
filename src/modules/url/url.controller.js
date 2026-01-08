import {
  createShortUrl,
  getUserUrls,
  deleteUserUrl,
} from "./url.service.js";
import { validateCreateUrl } from "./url.validation.js";

export const createUrl = async (req, res, next) => {
  try {
    const error = validateCreateUrl(req.body.originalUrl);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const result = await createShortUrl(
      req.user.id,
      req.body.originalUrl
    );

    res.json(result);
  } catch (err) {
    if (err.message === "LIMIT_REACHED") {
      return res.status(403).json({
        message: "Free tier limit reached. Please upgrade.",
      });
    }
    next(err);
  }
};

export const listUrls = async (req, res, next) => {
  try {
    const urls = await getUserUrls(req.user.id);
    res.json(urls);
  } catch (err) {
    next(err);
  }
};

export const removeUrl = async (req, res, next) => {
  try {
    await deleteUserUrl(req.user.id, req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
