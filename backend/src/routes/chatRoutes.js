import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyChats, getMessages, createMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", protect, getMyChats);
router.get("/:chatId/messages", protect, getMessages);
router.post("/:chatId/messages", protect, createMessage);

export default router;
