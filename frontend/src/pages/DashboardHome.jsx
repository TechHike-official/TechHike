import { motion } from 'framer-motion';
import { FileText, Wallet} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import ActivityFeed from '../components/ActivityFeed';
// import ProjectsTable from '../components/ProjectsTable';

const DashboardHome = () => {
  const stats = {
    totalProjects: 24,
    completedProjects: 18,
    pendingPayments: 2,
    totalEarnings: 12500,
  };

  return (
    <div className="p-6 space-y-6">
    
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Projects" 
          value={stats.totalProjects} 
          icon={<FileText className="w-6 h-6" />} 
          color="bg-blue-100 text-blue-600"
        />
        <DashboardCard 
          title="Completed Projects" 
          value={stats.completedProjects} 
          icon={<FileText className="w-6 h-6" />} 
          color="bg-green-100 text-green-600"
        />
        <DashboardCard 
          title="Pending Payments" 
          value={stats.pendingPayments} 
          icon={<Wallet className="w-6 h-6" />} 
          color="bg-yellow-100 text-yellow-600"
        />
        <DashboardCard 
          title="Total Earnings" 
          value={`₹${stats.totalEarnings}`} 
          icon={<Wallet className="w-6 h-6" />} 
          color="bg-purple-100 text-purple-600"
        />
      </div>
      
      {/* Activity Feed & Projects Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ActivityFeed />
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          {/* <ProjectsTable /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;