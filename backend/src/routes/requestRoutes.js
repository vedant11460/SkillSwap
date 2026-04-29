import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendRequest, myRequests, updateRequestStatus } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", protect, sendRequest);
router.get("/mine", protect, myRequests);
router.put("/:id/status", protect, updateRequestStatus);

export default router;
