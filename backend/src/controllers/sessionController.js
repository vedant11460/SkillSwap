import Session from "../models/Session.js";

export const createSession = async (req, res) => {
  const session = await Session.create({
    ...req.body,
    learner: req.user._id,
  });
  res.status(201).json(session);
};

export const mySessions = async (req, res) => {
  const sessions = await Session.find({
    $or: [{ learner: req.user._id }, { teacher: req.user._id }],
  })
    .populate("learner", "name email")
    .populate("teacher", "name email")
    .sort({ createdAt: -1 });

  res.json(sessions);
};

export const updateSessionStatus = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ message: "Session not found" });

  const allowed =
    String(session.learner) === String(req.user._id) ||
    String(session.teacher) === String(req.user._id);

  if (!allowed) return res.status(403).json({ message: "Not allowed" });

  session.status = req.body.status;
  await session.save();

  res.json(session);
};
