import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  const load = async () => {
    const { data } = await api.get("/api/requests/mine");
    setRequests(data);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/api/requests/${id}/status`, { status });
    toast.success(`Request ${status}`);
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Connection Requests</h1>
      <div className="grid gap-4 mt-8">
        {requests.map(r => {
          const isReceiver = r.receiver?._id === user?._id;
          return (
            <div key={r._id} className="bg-white p-6 rounded-2xl shadow-sm border">
              <p><b>From:</b> {r.sender?.name}</p>
              <p><b>To:</b> {r.receiver?.name}</p>
              <p className="my-2">{r.message}</p>
              <p><b>Status:</b> {r.status}</p>
              <div className="mt-4 flex gap-3">
                {isReceiver && r.status === "Pending" && (
                  <>
                    <button onClick={()=>updateStatus(r._id, "Accepted")} className="bg-green-600 text-white px-4 py-2 rounded-xl">Accept</button>
                    <button onClick={()=>updateStatus(r._id, "Rejected")} className="bg-red-600 text-white px-4 py-2 rounded-xl">Reject</button>
                  </>
                )}
                {!isReceiver && r.status === "Pending" && (
                  <button onClick={()=>updateStatus(r._id, "Cancelled")} className="bg-slate-700 text-white px-4 py-2 rounded-xl">Cancel</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
