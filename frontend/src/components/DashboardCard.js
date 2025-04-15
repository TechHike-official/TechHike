import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl shadow-sm ${color.split(' ')[0]} ${color.split(' ')[1]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color.split(' ')[0]} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;