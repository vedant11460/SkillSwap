import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  const fields = [
    "name",
    "profilePhoto",
    "collegeOrProfession",
    "bio",
    "teachSkills",
    "learnSkills",
    "experienceLevel",
    "availability",
    "location",
    "mode",
  ];

  const user = await User.findById(req.user._id);

  fields.forEach((field) => {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  });

  await user.save();
  res.json(await User.findById(user._id).select("-password"));
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const exploreUsers = async (req, res) => {
  const { skill, level, mode, availability, minRating } = req.query;

  const query = { _id: { $ne: req.user._id }, isBlocked: false };

  if (skill) {
    query.$or = [
      { teachSkills: { $regex: skill, $options: "i" } },
      { learnSkills: { $regex: skill, $options: "i" } },
    ];
  }

  if (level) query.experienceLevel = level;
  if (mode) query.mode = mode;
  if (availability) query.availability = { $regex: availability, $options: "i" };
  if (minRating) query.averageRating = { $gte: Number(minRating) };

  const users = await User.find(query).select("-password").sort({ averageRating: -1 });
  res.json(users);
};
