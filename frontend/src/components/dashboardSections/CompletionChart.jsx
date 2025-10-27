// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";

const CompletionChart = ({ barData, fadeUp }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={7}
    className="bg-app-surface rounded-2xl p-5 shadow"
  >
    <h2 className="text-lg font-semibold mb-4 text-landing-navy">
      Project Completion Overview
    </h2>
    <div className="h-64">
      <Bar
        data={barData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              titleColor: "#fff",
              bodyColor: "#fff",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: "#6b7280" },
              grid: { color: "#f0f0f0" },
            },
            x: {
              ticks: { color: "#6b7280" },
              grid: { display: false },
            },
          },
        }}
      />
    </div>
  </motion.div>
);

export default CompletionChart;
