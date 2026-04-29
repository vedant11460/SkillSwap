import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createReport,
  getReports,
  updateReportStatus,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, adminOnly, getReports);
router.put("/:id/status", protect, adminOnly, updateReportStatus);

export default router;