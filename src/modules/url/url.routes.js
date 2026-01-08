import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { createUrl, listUrls, removeUrl } from "./url.controller.js";

const router = express.Router();

router.post("/", auth, createUrl);
router.get("/", auth, listUrls);
router.delete("/:id", auth, removeUrl);

export default router;
