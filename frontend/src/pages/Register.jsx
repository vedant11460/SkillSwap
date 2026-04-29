import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-3 rounded-xl" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border p-3 rounded-xl" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border p-3 rounded-xl" type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-indigo-600 text-white p-3 rounded-xl">Register</button>
      </form>
      <p className="mt-4 text-sm">Already have account? <Link to="/login" className="text-indigo-600">Login</Link></p>
    </div>
  );
}
