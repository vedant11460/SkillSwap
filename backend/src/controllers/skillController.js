import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ name: 1 });
  res.json(skills);
};

export const createSkill = async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
};

export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
};
