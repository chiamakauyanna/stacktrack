
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";

const TaskOverviewChart = ({ taskData, fadeUp }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={5}
    className="bg-app-surface rounded-2xl p-5 shadow flex flex-col items-center justify-center"
  >
    <h2 className="text-lg font-semibold mb-4 text-landing-navy">
      Task Overview
    </h2>
    <div className="h-64 w-full flex justify-center items-center">
      <Doughnut
        data={taskData}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#374151" },
            },
          },
        }}
      />
    </div>
  </motion.div>
);

export default TaskOverviewChart;
