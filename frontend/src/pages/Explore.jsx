import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ skill: "", level: "", mode: "" });

  const [reportForm, setReportForm] = useState({
    userId: "",
    userName: "",
    reason: "",
  });

  const loadUsers = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));

    const { data } = await api.get(`/api/users/explore?${params}`);
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const sendRequest = async (receiver, requestedSkill) => {
    try {
      await api.post("/api/requests", {
        receiver,
        message: `I want to learn ${
          requestedSkill || "a skill"
        } from you. In return, I can help you with my skills.`,
        requestedSkill,
      });

      toast.success("Connection request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  const openReportForm = (user) => {
    setReportForm({
      userId: user._id,
      userName: user.name,
      reason: "",
    });
  };

  const submitReport = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/reports", {
        reportedUser: reportForm.userId,
        reason: reportForm.reason,
      });

      toast.success("User reported successfully");

      setReportForm({
        userId: "",
        userName: "",
        reason: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Explore Skill Partners</h1>

      <div className="bg-white p-4 rounded-2xl shadow-sm border mt-6 grid md:grid-cols-4 gap-3">
        <input
          className="border p-3 rounded-xl"
          placeholder="Search skill e.g. React"
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
        />

        <select
          className="border p-3 rounded-xl"
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">Any Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select
          className="border p-3 rounded-xl"
          onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
        >
          <option value="">Any Mode</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Hybrid</option>
        </select>

        <button
          onClick={loadUsers}
          className="bg-indigo-600 text-white rounded-xl"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {users.map((u) => (
          <div key={u._id} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                {u.name?.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl font-bold">{u.name}</h2>
                <p className="text-slate-500">
                  {u.collegeOrProfession || "Student"}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              {u.bio || "Interested in peer learning and skill exchange."}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <b>Teaches:</b>{" "}
                <span className="text-indigo-600">
                  {u.teachSkills?.join(", ") || "Not added"}
                </span>
              </p>

              <p>
                <b>Wants to Learn:</b>{" "}
                <span className="text-green-600">
                  {u.learnSkills?.join(", ") || "Not added"}
                </span>
              </p>

              <p>
                <b>Level:</b> {u.experienceLevel || "Beginner"}
              </p>

              <p>
                <b>Mode:</b> {u.mode || "Online"}
              </p>

              <p>
                <b>Availability:</b> {u.availability || "Not added"}
              </p>

              <p>
                <b>Location:</b> {u.location || "Not added"}
              </p>

              <p>
                <b>Rating:</b> ⭐ {u.averageRating || 0}/5
              </p>
            </div>

            <button
              onClick={() => sendRequest(u._id, u.teachSkills?.[0])}
              className="mt-5 w-full bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-indigo-600 transition"
            >
              Send Connection Request
            </button>

            <button
              onClick={() => openReportForm(u)}
              className="mt-3 w-full border border-red-300 text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition"
            >
              Report User
            </button>
          </div>
        ))}
      </div>

      {reportForm.userId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold">
              Report {reportForm.userName}
            </h2>

            <p className="text-slate-600 mt-2">
              Please explain why you are reporting this user.
            </p>

            <form onSubmit={submitReport} className="mt-5 grid gap-4">
              <textarea
                className="border p-3 rounded-xl"
                placeholder="Write report reason..."
                value={reportForm.reason}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    reason: e.target.value,
                  })
                }
                required
              />

              <div className="flex gap-3">
                <button className="flex-1 bg-red-600 text-white p-3 rounded-xl">
                  Submit Report
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setReportForm({
                      userId: "",
                      userName: "",
                      reason: "",
                    })
                  }
                  className="flex-1 bg-slate-200 text-slate-900 p-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}