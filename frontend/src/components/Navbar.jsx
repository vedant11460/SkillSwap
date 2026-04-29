import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">SkillSwap Connect</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-700 hover:text-indigo-600">Dashboard</Link>
              <Link to="/profile" className="text-slate-700 hover:text-indigo-600">Profile</Link>
              <Link to="/explore" className="text-slate-700 hover:text-indigo-600">Explore</Link>
              <Link to="/requests" className="text-slate-700 hover:text-indigo-600">Requests</Link>
              <Link to="/chats" className="text-slate-700 hover:text-indigo-600">Chats</Link>
              <Link to="/sessions" className="text-slate-700 hover:text-indigo-600">Sessions</Link>
              {user.role === "admin" && <Link to="/admin" className="text-slate-700 hover:text-indigo-600">Admin</Link>}
              <button onClick={handleLogout} className="bg-slate-900 text-white px-4 py-2 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
