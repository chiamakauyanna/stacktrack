// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SummaryCards = ({ cards }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 rounded-2xl">
    {cards.map((card, i) => {
      const Icon = card.icon;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`${card.bg} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all backdrop-blur-2xl`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-white shadow-sm ${card.text}`}>
              <Icon size={22} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-navy mb-1">{card.value}</h3>
              <p className={`text-sm font-medium ${card.text}`}>{card.label}</p>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

export default SummaryCards;
