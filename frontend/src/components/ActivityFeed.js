import { motion } from 'framer-motion';
import { CheckCircle, DollarSign, UserPlus } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    { id: 1, type: 'payment', description: 'Received payment for E-commerce Website', time: '2 hours ago', amount: 2500 },
    { id: 2, type: 'project', description: 'Completed Portfolio Design project', time: '1 day ago', amount: null },
    { id: 3, type: 'client', description: 'Added new client: XYZ Inc', time: '2 days ago', amount: null },
    { id: 4, type: 'payment', description: 'Received partial payment for Mobile App', time: '3 days ago', amount: 1500 },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'project':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'client':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
            {activity.amount && (
              <p className="text-xs font-medium text-green-600 mt-1">+${activity.amount}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;