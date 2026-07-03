import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StatusPieChart({ dashboard }) {
  const data = [
    { name: "Open", value: dashboard.openComplaints || 0 },
    { name: "In Progress", value: dashboard.progressComplaints || 0 },
    { name: "Resolved", value: dashboard.resolvedComplaints || 0 },
  ];

  const COLORS = ["#dc3545", "#ffc107", "#198754"];

  return (
    <div className="card shadow p-3">
      <h5 className="text-center mb-3">Complaint Status</h5>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;