import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createSession, mySessions, updateSessionStatus } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", protect, createSession);
router.get("/mine", protect, mySessions);
router.put("/:id/status", protect, updateSessionStatus);

export default router;
