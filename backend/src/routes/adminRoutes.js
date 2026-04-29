import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { adminStats, getUsers, toggleBlockUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, adminStats);
router.get("/users", protect, adminOnly, getUsers);
router.put("/users/:id/block", protect, adminOnly, toggleBlockUser);

export default router;
