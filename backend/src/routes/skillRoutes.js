import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getSkills, createSkill, deleteSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/", protect, getSkills);
router.post("/", protect, adminOnly, createSkill);
router.delete("/:id", protect, adminOnly, deleteSkill);

export default router;
