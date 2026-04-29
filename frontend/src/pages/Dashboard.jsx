import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/api/auth/me").then((res) => setProfile(res.data));
    api.get("/api/requests/mine").then((res) => setRequests(res.data));
    api.get("/api/sessions/mine").then((res) => setSessions(res.data));
  }, []);

  const completed = sessions.filter((s) => s.status === "Completed").length;
  const upcoming = sessions.filter((s) => s.status === "Upcoming").length;
  const cancelled = sessions.filter((s) => s.status === "Cancelled").length;
  const acceptedConnections = requests.filter(
    (r) => r.status === "Accepted"
  ).length;

  const pendingRequests = requests.filter((r) => r.status === "Pending").length;
  const rejectedRequests = requests.filter(
    (r) => r.status === "Rejected"
  ).length;

  const sessionChartData = [
    { name: "Upcoming", value: upcoming },
    { name: "Completed", value: completed },
    { name: "Cancelled", value: cancelled },
  ];

  const requestChartData = [
    { name: "Accepted", requests: acceptedConnections },
    { name: "Pending", requests: pendingRequests },
    { name: "Rejected", requests: rejectedRequests },
  ];

  const skillChartData = [
    {
      name: "Skills",
      Offered: profile?.teachSkills?.length || 0,
      Wanted: profile?.learnSkills?.length || 0,
    },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#ef4444"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>

      <p className="text-slate-600 mt-2">
        Track your skills, sessions, connections, requests, and ratings.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <StatCard
          title="Skills Offered"
          value={profile?.teachSkills?.length || 0}
        />
        <StatCard
          title="Skills Requested"
          value={profile?.learnSkills?.length || 0}
        />
        <StatCard title="Connections" value={acceptedConnections} />
        <StatCard title="Upcoming Sessions" value={upcoming} />
        <StatCard title="Completed Sessions" value={completed} />
        <StatCard title="Average Rating" value={profile?.averageRating || 0} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-96">
          <h2 className="font-bold text-xl mb-2">Session Status Overview</h2>
          <p className="text-slate-500 text-sm mb-4">
            Shows how many sessions are upcoming, completed, or cancelled.
          </p>

          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={sessionChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {sessionChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border h-96">
          <h2 className="font-bold text-xl mb-2">Connection Requests</h2>
          <p className="text-slate-500 text-sm mb-4">
            Shows accepted, pending, and rejected connection requests.
          </p>

          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={requestChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="requests" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border h-96 mt-8">
        <h2 className="font-bold text-xl mb-2">Skills Offered vs Skills Wanted</h2>
        <p className="text-slate-500 text-sm mb-4">
          Compares the number of skills you can teach with the number of skills
          you want to learn.
        </p>

        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={skillChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Offered" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Wanted" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}