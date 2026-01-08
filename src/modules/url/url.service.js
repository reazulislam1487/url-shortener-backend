import Url from "../../models/Url.js";
import { generateCode } from "../../utils/generateCode.js";

export const createShortUrl = async (userId, originalUrl) => {
  const count = await Url.countDocuments({ userId });

  if (count >= 100) {
    throw new Error("LIMIT_REACHED");
  }

  const shortCode = generateCode();

  const url = await Url.create({
    userId,
    originalUrl,
    shortCode,
  });

  return {
    shortCode,
    shortUrl: `${process.env.BASE_URL}/${shortCode}`,
  };
};

export const getUserUrls = async (userId) => {
  return Url.find({ userId }).sort({ createdAt: -1 });
};

export const deleteUserUrl = async (userId, urlId) => {
  await Url.deleteOne({
    _id: urlId,
    userId,
  });
};
