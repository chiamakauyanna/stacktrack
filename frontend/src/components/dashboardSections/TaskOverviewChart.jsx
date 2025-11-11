// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";

const TaskOverviewChart = ({ taskData, fadeUp }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={5}
    className="bg-surface rounded-2xl p-5 shadow flex flex-col"
  >
    <h2 className="font-semibold mb-4">Task Overview</h2>

    {/* Chart container */}
    <div className="flex items-center justify-center">
      <div className="h-64 w-64 flex justify-center items-center">
        <Doughnut
          data={taskData}
          options={{
            cutout: "85%",
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#374151",
                  boxWidth: 16,
                  padding: 16,
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
          }}
        />
      </div>
    </div>
  </motion.div>
);

export default TaskOverviewChart;
