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
    <h1 className="md:text-xl font-heading font-bold text-landing-navy">
      Dashboard Overview
    </h1>
    <Link
      to="/projects/create"
      className="flex items-center gap-2 text-sm bg-landing-primary hover:bg-landing-secondary text-white px-3 md:px-5 py-2 rounded-full shadow-sm transition"
    >
      <PlusCircle size={16} /> New Project
    </Link>
  </motion.div>
);

export default HeaderSection;
