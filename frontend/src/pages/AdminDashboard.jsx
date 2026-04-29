import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  const load = async () => {
    const s = await api.get("/api/admin/stats");
    const u = await api.get("/api/admin/users");
    const r = await api.get("/api/reports");

    setStats(s.data);
    setUsers(u.data);
    setReports(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleBlock = async (id) => {
    await api.put(`/api/admin/users/${id}/block`);
    load();
  };
  
  const updateReportStatus = async (id, status) => {
  await api.put(`/api/reports/${id}/status`, { status });
  load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-5 gap-6 mt-8">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} />
        <StatCard title="Total Skills" value={stats?.totalSkills || 0} />
        <StatCard title="Total Sessions" value={stats?.totalSessions || 0} />
        <StatCard title="Active Users" value={stats?.activeUsers || 0} />
        <StatCard title="Reports" value={stats?.reportedUsers || 0} />
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Manage Users</h2>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Blocked</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.role}</td>
                <td className="p-4">{u.isBlocked ? "Yes" : "No"}</td>

                <td className="p-4">
                  {u.role === "admin" ? (
                    <span className="text-slate-500">Protected</span>
                  ) : (
                    <button
                      onClick={() => toggleBlock(u._id)}
                      className={`px-4 py-2 rounded-xl text-white ${
                        u.isBlocked ? "bg-green-600" : "bg-slate-900"
                      }`}
                    >
                      {u.isBlocked ? "Unblock" : "Block"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">User Reports</h2>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {reports.length === 0 ? (
          <p className="p-4 text-slate-500">No reports found.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Reported User</th>
                <th className="p-4 text-left">Reported By</th>
                <th className="p-4 text-left">Reason</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="border-t">
                  <td className="p-4">
                    {report.reportedUser?.name}
                    <p className="text-sm text-slate-500">
                      {report.reportedUser?.email}
                    </p>
                  </td>

                  <td className="p-4">
                    {report.reportedBy?.name}
                    <p className="text-sm text-slate-500">
                      {report.reportedBy?.email}
                    </p>
                  </td>

                  <td className="p-4">{report.reason}</td>

               <td className="p-4">
  <div className="flex items-center gap-3">
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        report.status === "Open"
          ? "bg-yellow-100 text-yellow-700"
          : report.status === "Reviewed"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {report.status}
    </span>

    {report.status === "Open" && (
      <button
        onClick={() => updateReportStatus(report._id, "Reviewed")}
        className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Mark Reviewed
      </button>
    )}

    {report.status === "Reviewed" && (
      <button
        onClick={() => updateReportStatus(report._id, "Closed")}
        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Close Report
      </button>
    )}

    {report.status === "Closed" && (
      <span className="text-slate-500 text-sm">No action needed</span>
    )}
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}