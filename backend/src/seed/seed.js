import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Skill from "../models/Skill.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Skill.deleteMany();

  await User.create([
    {
      name: "Admin User",
      email: "admin@skillswap.com",
      password: "admin123",
      role: "admin",
      teachSkills: ["React", "Node.js"],
      learnSkills: ["Machine Learning"],
      experienceLevel: "Advanced",
      availability: "Evening",
      location: "Mumbai",
      mode: "Hybrid",
    },
    {
      name: "Vedant Deshmukh",
      email: "vedant@example.com",
      password: "123456",
      teachSkills: ["Python", "SQL", "Excel"],
      learnSkills: ["React", "Node.js"],
      experienceLevel: "Intermediate",
      availability: "Evening",
      location: "Mumbai",
      mode: "Online",
    },
    {
      name: "Aarav Sharma",
      email: "aarav@example.com",
      password: "123456",
      teachSkills: ["React", "UI/UX"],
      learnSkills: ["Python"],
      experienceLevel: "Intermediate",
      availability: "Weekend",
      location: "Pune",
      mode: "Online",
    },
  ]);

  await Skill.create([
    { name: "Python", category: "Programming" },
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "SQL", category: "Database" },
    { name: "Power BI", category: "Analytics" },
    { name: "Machine Learning", category: "AI/ML" },
    { name: "UI/UX", category: "Design" },
    { name: "Java", category: "Programming" },
  ]);

  console.log("Seed data inserted");
  process.exit();
};

seed();
