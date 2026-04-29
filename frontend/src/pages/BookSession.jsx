import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function BookSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const teacher = location.state?.teacher;

  const [form, setForm] = useState({
    skill: "",
    date: "",
    time: "",
    mode: "Online",
    meetingLink: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!teacher?._id) {
      toast.error("Teacher not selected");
      return;
    }

    try {
      await api.post("/api/sessions", {
        teacher: teacher._id,
        skill: form.skill,
        date: form.date,
        time: form.time,
        mode: form.mode,
        meetingLink: form.meetingLink,
      });

      toast.success("Session booked successfully");
      navigate("/sessions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book session");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Book Learning Session</h1>

      <p className="text-slate-600 mt-2">
        Booking session with{" "}
        <span className="font-semibold text-slate-900">
          {teacher?.name || "selected user"}
        </span>
      </p>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-2xl shadow-sm border mt-8 grid gap-4"
      >
        <input
          className="border p-3 rounded-xl"
          placeholder="Skill e.g. React"
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
          required
        />

        <input
          className="border p-3 rounded-xl"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <input
          className="border p-3 rounded-xl"
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />

        <select
          className="border p-3 rounded-xl"
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <input
          className="border p-3 rounded-xl"
          placeholder="Meeting link or location"
          value={form.meetingLink}
          onChange={(e) =>
            setForm({ ...form, meetingLink: e.target.value })
          }
        />

        <button className="bg-indigo-600 text-white p-3 rounded-xl">
          Book Session
        </button>
      </form>
    </div>
  );
}