// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";

const TrendChart = ({ analytics, fadeUp }) => {
  const trendLabels = analytics?.trend?.map((t) => t.week_start) || [];
  const trendValues = analytics?.trend?.map((t) => t.completed_tasks) || [];

  const trendData = {
    labels: trendLabels,
    datasets: [
      {
        label: "Tasks Completed",
        data: trendValues,
        backgroundColor: "rgba(14, 147, 141, 0.8)", 
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "#e5e7eb" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        borderRadius: 8,
        padding: 10,
      },
    },
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={6}
      className="bg-white rounded-3xl shadow-sm p-5"
    >
      <h2 className="text-lg font-semibold mb-3 text-navy">
        Weekly Task Completion Trend
      </h2>

      {trendValues.length > 0 ? (
        <div className="h-80">
          <Bar data={trendData} options={options} />
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10 text-sm">
          No trend data available yet.
        </p>
      )}
    </motion.div>
  );
};

export default TrendChart;
