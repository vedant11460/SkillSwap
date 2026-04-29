import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-indigo-600 font-semibold">MERN Stack Capstone Project</p>
          <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Learn skills by exchanging knowledge with peers.
          </h1>
          <p className="text-slate-600 mt-6 text-lg">
            SkillSwap Connect helps students teach what they know, find mentors,
            chat in real time, book learning sessions, and review each other.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-xl">Get Started</Link>
            <Link to="/login" className="border px-6 py-3 rounded-xl bg-white">Login</Link>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 border">
          <h2 className="text-2xl font-bold">Example</h2>
          <p className="mt-4 text-slate-600">
            Vedant teaches Python, SQL and Excel. Another student teaches React and Node.js.
            Both connect, chat, book a session, and exchange skills.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50">Teach: Python</div>
            <div className="p-4 rounded-2xl bg-green-50">Learn: React</div>
            <div className="p-4 rounded-2xl bg-yellow-50">Chat: Socket.io</div>
            <div className="p-4 rounded-2xl bg-purple-50">Review: 4.5/5</div>
          </div>
        </div>
      </div>
    </section>
  );
}
