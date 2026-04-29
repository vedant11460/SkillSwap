import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createReview,
  userReviews,
  mySessionReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/session/:sessionId/mine", protect, mySessionReview);
router.get("/user/:userId", protect, userReviews);

export default router;