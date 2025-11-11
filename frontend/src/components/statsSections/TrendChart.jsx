import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ trend }) => (
  <section className="bg-white rounded-3xl shadow-sm p-5">
    <h2 className="text-lg font-semibold mb-3 text-navy">
      Weekly Task Completion Trend
    </h2>
    {trend.length > 0 ? (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week_start" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="completed_tasks"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <p className="text-gray-500 text-center mt-10 text-sm">
        No trend data available yet.
      </p>
    )}
  </section>
);

export default TrendChart;
