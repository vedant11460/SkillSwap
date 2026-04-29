import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile, getUserById, exploreUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/explore", protect, exploreUsers);
router.get("/:id", protect, getUserById);
router.put("/profile/update", protect, updateProfile);

export default router;
