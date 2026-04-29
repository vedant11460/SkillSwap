import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  const report = await Report.create({
    reportedBy: req.user._id,
    reportedUser: req.body.reportedUser,
    reason: req.body.reason,
  });

  res.status(201).json(report);
};

export const getReports = async (req, res) => {
  const reports = await Report.find()
    .populate("reportedBy", "name email")
    .populate("reportedUser", "name email")
    .sort({ createdAt: -1 });

  res.json(reports);
};

export const updateReportStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Open", "Reviewed", "Closed"].includes(status)) {
    return res.status(400).json({ message: "Invalid report status" });
  }

  const report = await Report.findById(req.params.id);

  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  report.status = status;
  await report.save();

  res.json({ message: "Report status updated", report });
};