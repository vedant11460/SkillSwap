export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
    </div>
  );
}
