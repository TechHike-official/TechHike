import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAssignedProjects } from '../services/projectService';
import { Briefcase, Clock } from 'lucide-react';

const UserProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAssignedProjects(user.id);
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user.id]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        project =>
          project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.projectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  const handleProjectClick = (projectId) => {
    navigate(`${projectId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const statusColors = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
    'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⟳' },
    pending: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '⏱' },
    default: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '•' }
  };

  const getStatusStyle = (status) => {
    const statusKey = status.toLowerCase().replace(' ', '-');
    return statusColors[statusKey] || statusColors.default;
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-16 p-6">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
            <p className="text-gray-600 mt-1">Browse and manage your assigned projects</p>
          </div>
        </div>

        {/* Project Count Summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <span className="text-gray-700">
              Showing <span className="font-medium">{filteredProjects.length}</span> of <span className="font-medium">{projects.length}</span> projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-500 mb-4">No projects found. Go to the request section to add a project.</div>
            <button
              onClick={() => navigate('/dashboard/request')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Request Section
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const statusStyle = getStatusStyle(project.projectStatus);

              return (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project._id)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{project.projectTitle}</h2>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <span className="mr-1">{statusStyle.icon}</span> {project.projectStatus}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{project.projectDescription}</p>

                    {/* Additional Project Details */}
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Updated {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-blue-500"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProject;
