import User from "../models/User.js";
import Skill from "../models/Skill.js";
import Session from "../models/Session.js";
import Report from "../models/Report.js";

export const adminStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalSkills = await Skill.countDocuments();
  const totalSessions = await Session.countDocuments();
  const reportedUsers = await Report.countDocuments({ status: "Open" });
  const activeUsers = await User.countDocuments({ isBlocked: false });

  res.json({
    totalUsers,
    totalSkills,
    totalSessions,
    reportedUsers,
    activeUsers,
    mostPopularSkills: ["Python", "React", "SQL", "Java", "Power BI"],
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({ message: user.isBlocked ? "User blocked" : "User unblocked" });
};
