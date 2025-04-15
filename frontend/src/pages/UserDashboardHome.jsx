import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAssignedProjects } from '../services/projectService'; // For projects
import { Briefcase, Clock, HelpCircle, MessageCircle, Users, FileText } from 'lucide-react';

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const projectData = await getAssignedProjects(user.id);
        setProjects(projectData || []);
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

  // Handlers for the new buttons
  const handleEnquiry = () => navigate('/dashboard/enquiry');
  const handleAssistance = () => navigate('/dashboard/assistance');
  const handleProject = () => navigate('/dashboard/projects');
  const handleHelp = () => navigate('/dashboard/help');
  const handleSupport = () => navigate('/dashboard/support');

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
    <div className={`w-full mx-auto mt-16 p-6 ${theme === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

      {/* Banner Section */}
      <div className={`p-6 rounded-lg mb-6 shadow-md ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
        <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
          Important Update
        </h2>
        <p className={theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}>
          We’re excited to announce new features coming soon! Stay tuned for updates on your projects and payments.
        </p>
      </div>

      {/* Action Buttons Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={handleEnquiry}
            className={`py-3 px-4 rounded-lg shadow-md font-semibold transition-colors duration-200 flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-blue-700 text-white hover:bg-blue-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <MessageCircle className="mr-2" /> Enquiry
          </button>
          <button
            onClick={handleAssistance}
            className={`py-3 px-4 rounded-lg shadow-md font-semibold transition-colors duration-200 flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            <HelpCircle className="mr-2" /> Assistance
          </button>
          <button
            onClick={handleProject}
            className={`py-3 px-4 rounded-lg shadow-md font-semibold transition-colors duration-200 flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-yellow-700 text-white hover:bg-yellow-600'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            <Briefcase className="mr-2" /> Project
          </button>
          <button
            onClick={handleHelp}
            className={`py-3 px-4 rounded-lg shadow-md font-semibold transition-colors duration-200 flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-purple-700 text-white hover:bg-purple-600'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <FileText className="mr-2" /> Report
          </button>
          <button
            onClick={handleSupport}
            className={`py-3 px-4 rounded-lg shadow-md font-semibold transition-colors duration-200 flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-red-700 text-white hover:bg-red-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            <Users className="mr-2" /> Support
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="bg-white dark:bg-gray-600 rounded-lg shadow-md p-6 text-center">
            <p className={`text-gray-500 dark:text-gray-400 mb-4`}>No projects assigned yet.</p>
            <button
              onClick={() => navigate('/dashboard/request')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Request Section
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectClick(project._id)}
                className={`shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{project.projectTitle}</h3>
                <p className={theme === 'dark' ? 'text-gray-300 mb-3' : 'text-gray-600 mb-3'}>
                  {project.projectDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed'
                        ? theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                        : theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    <Clock className="inline-block mr-1" />
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
