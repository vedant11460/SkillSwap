import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-3 rounded-xl" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border p-3 rounded-xl" type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-indigo-600 text-white p-3 rounded-xl">Login</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      <p className="mt-4 text-xs text-slate-500">Seed login: vedant@example.com / 123456 or admin@skillswap.com / admin123</p>
    </div>
  );
}
