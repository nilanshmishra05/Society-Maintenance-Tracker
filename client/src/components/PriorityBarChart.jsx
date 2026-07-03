import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriorityBarChart({ dashboard }) {
  const data = [
    {
      name: "High",
      complaints: dashboard.highPriority || 0,
    },
    {
      name: "Medium",
      complaints: dashboard.mediumPriority || 0,
    },
    {
      name: "Low",
      complaints: dashboard.lowPriority || 0,
    },
  ];

  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">
        Priority Distribution
      </h5>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="complaints" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityBarChart;