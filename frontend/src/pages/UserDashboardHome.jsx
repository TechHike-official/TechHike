import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProjectofUser } from '../services/projectService';
import { 
  Briefcase, Clock, HelpCircle, MessageCircle, Users, FileText, 
  PlusCircle, Settings, Calendar, BarChart2, Mail, Zap, 
  Lightbulb, Shield, CreditCard, FileSearch
} from 'lucide-react';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const projectData = await getAllProjectofUser(user.id);
        setProjects(projectData.data || []);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user.id]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // Quick action handlers
  const quickActions = [
    { icon: <Zap size={24} />, label: 'New Project', action: () => navigate('/dashboard/request'), color: 'bg-gradient-to-r from-purple-500 to-indigo-600' },
    { icon: <MessageCircle size={24} />, label: 'Messages', action: () => navigate('/messages'), color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { icon: <Calendar size={24} />, label: 'Schedule', action: () => navigate('/schedule'), color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { icon: <FileText size={24} />, label: 'Reports', action: () => navigate('/reports'), color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { icon: <HelpCircle size={24} />, label: 'Help Center', action: () => navigate('/help'), color: 'bg-gradient-to-r from-red-500 to-pink-500' },
    { icon: <Users size={24} />, label: 'Team', action: () => navigate('/team'), color: 'bg-gradient-to-r from-indigo-500 to-purple-600' },
    { icon: <BarChart2 size={24} />, label: 'Analytics', action: () => navigate('/analytics'), color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { icon: <Settings size={24} />, label: 'Settings', action: () => navigate('/settings'), color: 'bg-gradient-to-r from-gray-500 to-gray-700' }
  ];

  if (loading) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className={`flex items-center justify-center h-screen ${theme === 'dark' ? 'text-red-400 bg-gray-900' : 'text-red-500 bg-white'}`}>
      {error}
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with user greeting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Here's what's happening with your projects today.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/request')}
            className={`mt-4 md:mt-0 flex items-center px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            <PlusCircle className="mr-2" />
            New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl p-6 shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4">
                <Briefcase className="text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Active Projects</p>
                <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl p-6 shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 mr-4">
                <FileText className="text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl p-6 shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 mr-4">
                <Clock className="text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'pending').length}</p>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl p-6 shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-4">
                <Users className="text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Team Members</p>
                <p className="text-2xl font-bold mt-1">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white p-5 rounded-xl shadow-md transition-all hover:shadow-lg hover:opacity-90 flex flex-col items-center justify-center `}
              >
                <div className="mb-3">{action.icon}</div>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Projects</h2>
            <button 
              onClick={() => navigate('/dashboard/projects')}
              className={`text-sm px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              View All
            </button>
          </div>
          
          {projects.length === 0 ? (
            <div className={`rounded-xl p-8 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                <Briefcase className="text-gray-400 dark:text-gray-500" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Get started by creating a new project
              </p>
              <button
                onClick={() => navigate('/projects/new')}
                className={`px-6 py-2 rounded-lg font-medium ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project._id)}
                  className={`rounded-xl p-6 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold line-clamp-1">{project.projectTitle}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        project.status === 'completed'
                          ? theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                          : project.status === 'active'
                          ? theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                          : theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.projectDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1" size={14} />
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default UserDashboard;