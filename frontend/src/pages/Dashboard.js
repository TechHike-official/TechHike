import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Sidebar from "../components/Sidebar";
import DashboardHome from "../pages/DashboardHome";
import Settings from "./Settings";
import RequestManagement from "./RequestManagement";
import ProjectManagement from "./ProjectManagement";
import ProjectDetail from "./ProjectDetail";
import Clients from "./Clients";
import UserProject from "./UserProject";
import UserDashboard from "./UserDashboardHome";
import UserRequest from "./UserRequest";
import NotFound from "./NotFound";
import UserAssistance from "./UserAssistance";
import AdminAssistance from "./AdminAssistance";
import UserProjectDetails from "./UserProjectDetails";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role) {
      setUserRole(user.role);
    } else {
      navigate("/"); // Redirect if no valid user role
    }
  }, [navigate]);

  // Apply theme to document root for global effect
  useEffect(() => {
    document.documentElement.className = theme; // Set 'light' or 'dark' on <html>
  }, [theme]);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Sidebar Navigation */}
      <Sidebar navigate={navigate} />

      {/* Main Content Area */}
      <motion.main
        className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={userRole === "admin" ? <DashboardHome /> : <UserDashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="projects" element={userRole === "admin" ? <ProjectManagement /> : <UserProject />} />
      
          <Route path="request" element={userRole === "admin" ? <RequestManagement /> : <UserRequest />} />
          <Route path="clients" element={userRole === "admin" ? <Clients /> : <NotFound />} />
          <Route path="projects/:projectId" element={userRole === "admin" ? <ProjectDetail /> : <UserProjectDetails />} />
     
     
          <Route path="assistance" element={userRole === 'admin' ? <AdminAssistance/> : <UserAssistance/> } />
          
        </Routes>
      </motion.main>
    </div>
  );
};

export default Dashboard;