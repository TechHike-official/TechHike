import { motion } from 'framer-motion';
import { FileText, Wallet } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import ActivityFeed from '../components/ActivityFeed';
import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/dashboardService';

const DashboardHome = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    pendingPayments: 0,
    totalEarnings: 0,
  });

  // Fetch all projects data when the component mounts
  useEffect(() => {
    const getAllProjectInfo = async () => {
      try {
        // Replace with your API endpoint or local data fetching logic
        const response = await getAllProjects()
        
        console.log('Fetched projects:', response);

        // Set the projects and update stats
        setProjects(response);
        setStats(prevStats => ({
          ...prevStats,
          totalProjects: response.length,
        }));

        // Update completedProjects and pendingPayments based on the project status
        const completedProjects = response.filter(project => project.status === 'Completed').length;
        const pendingPayments = response.filter(project => project.status === 'Pending').length;

        setStats(prevStats => ({
          ...prevStats,
          completedProjects: completedProjects,
          pendingPayments: pendingPayments,
        }));

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    getAllProjectInfo();
  }, []);

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
       

        
      </div>
    </div>
  );
};

export default DashboardHome;
