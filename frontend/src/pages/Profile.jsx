import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [form, setForm] = useState({
    name: "", collegeOrProfession: "", bio: "", teachSkills: "", learnSkills: "",
    experienceLevel: "Beginner", availability: "", location: "", mode: "Online"
  });

  useEffect(() => {
    api.get("/api/auth/me").then(({ data }) => {
      setForm({
        ...data,
        teachSkills: data.teachSkills?.join(", ") || "",
        learnSkills: data.learnSkills?.join(", ") || "",
      });
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      teachSkills: form.teachSkills.split(",").map(s => s.trim()).filter(Boolean),
      learnSkills: form.learnSkills.split(",").map(s => s.trim()).filter(Boolean),
    };
    await api.put("/api/users/profile/update", payload);
    toast.success("Profile updated");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm border grid gap-4">
        <input className="border p-3 rounded-xl" value={form.name || ""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" />
        <input className="border p-3 rounded-xl" value={form.collegeOrProfession || ""} onChange={e=>setForm({...form,collegeOrProfession:e.target.value})} placeholder="College / Profession" />
        <textarea className="border p-3 rounded-xl" value={form.bio || ""} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Bio" />
        <input className="border p-3 rounded-xl" value={form.teachSkills || ""} onChange={e=>setForm({...form,teachSkills:e.target.value})} placeholder="Skills you can teach: Python, SQL" />
        <input className="border p-3 rounded-xl" value={form.learnSkills || ""} onChange={e=>setForm({...form,learnSkills:e.target.value})} placeholder="Skills you want to learn: React, Node.js" />
        <select className="border p-3 rounded-xl" value={form.experienceLevel} onChange={e=>setForm({...form,experienceLevel:e.target.value})}>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <input className="border p-3 rounded-xl" value={form.availability || ""} onChange={e=>setForm({...form,availability:e.target.value})} placeholder="Availability e.g. Evening" />
        <input className="border p-3 rounded-xl" value={form.location || ""} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location" />
        <select className="border p-3 rounded-xl" value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})}>
          <option>Online</option><option>Offline</option><option>Hybrid</option>
        </select>
        <button className="bg-indigo-600 text-white p-3 rounded-xl">Save Profile</button>
      </form>
    </div>
  );
}
