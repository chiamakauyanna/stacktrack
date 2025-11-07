// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";

const TrendChart = ({ analytics, fadeUp }) => {
  const trendData = {
    labels: analytics?.trend?.map((t) => t.week_start) || [],
    datasets: [
      {
        label: "Tasks Completed",
        data: analytics?.trend?.map((t) => t.completed_tasks) || [],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={6}
      className="bg-surface p-5"
    >
      <h2 className="font-semibold mb-4">
        Weekly Performance
      </h2>
      <div className="h-64">
        <Line
          data={trendData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, ticks: { color: "#6b7280" } },
              x: { ticks: { color: "#6b7280" } },
            },
          }}
        />
      </div>
    </motion.div>
  );
};

export default TrendChart;
