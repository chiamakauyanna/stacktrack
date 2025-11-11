import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HeaderSection = ({ fadeUp }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    className="flex justify-between items-center"
  >
    <h1 className="md:text-xl">Dashboard</h1>
    <Link
      to="/projects/create"
      className="flex items-center gap-2 text-sm hover:bg-surface bg-primary hover:text-secondary text-white p-3 md:px-5 md:py-4 rounded-xl shadow-sm transition whitespace-nowrap font-bold"
    >
      <PlusCircle size={22} /> New Project
    </Link>
  </motion.div>
);

export default HeaderSection;
