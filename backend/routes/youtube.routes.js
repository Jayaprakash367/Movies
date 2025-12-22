import express from "express";
import { getTrailers, getTrending, getPopular, getNewReleases, searchTrailers } from "../controllers/youtube.controller.js";

const router = express.Router();

// Main endpoints
router.get("/trailers", getTrailers);
router.get("/search", searchTrailers);
router.get("/trending", getTrending);
router.get("/popular", getPopular);
router.get("/new-releases", getNewReleases);

export default router;
