import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectInfo } from '../services/projectService';
import { Check, Clock, AlertCircle, Image, Calendar, User, ArrowLeft, FileText, ChevronRight, Globe } from 'lucide-react';

const UserProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [snapshots, setSnapshots] = useState(['', '', '']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getProjectInfo(projectId, token);
        setProject(response);
        setSnapshots(response.snapshots || ['', '', '']);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch project details');
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Pending': { icon: Clock, color: 'bg-amber-100 text-amber-800' },
      'In Progress': { icon: ChevronRight, color: 'bg-blue-100 text-blue-800' },
      'Completed': { icon: Check, color: 'bg-green-100 text-green-800' },
      'On Hold': { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
      'Cancelled': { icon: AlertCircle, color: 'bg-red-100 text-red-800' }
    };

    const { icon: Icon, color } = statusConfig[status] || { icon: AlertCircle, color: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {status}
      </span>
    );
  };

  // Loading state
  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
      />
    </div>
  );

  // Error state
  if (error) return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading project</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to projects
      </button>
    </div>
  );

  // Main content
  return (
    <div className="min-h-screen mt-20 bg-white">
     
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Project header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project?.projectTitle}</h1>
              <p className="mt-2 text-lg text-gray-600">{project?.projectDescription}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="mt-1 text-sm text-gray-900">{project?.clientName}</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(project?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Project ID</p>
                  <p className="mt-1 text-sm text-gray-900">{project?._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['Overview', 'Documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.toLowerCase()
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left column */}
                <div className="lg:col-span-2">
                  {/* Project Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <StatusBadge status={project?.projectStatus} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Repository</p>
                        {project?.projectSource ? (
                          <a
                            href={project.projectSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            {project.projectSource}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500">No repository linked</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div>
                  {/* Contact Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Info</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Assigned Developer</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {project?.developerName || 'Not assigned'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Support</p>
                        <p className="mt-1 text-sm text-gray-900">support@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snapshots section */}
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Snapshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {snapshots.filter(url => url).length > 0 ? (
                    snapshots.filter(url => url).map((snapshot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative group overflow-hidden rounded-lg shadow-sm"
                      >
                        <img
                          src={snapshot}
                          alt={`Project snapshot ${index + 1}`}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ESnapshot %23${index + 1}%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white text-sm">Snapshot {index + 1}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-3 py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                      <Image className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No snapshots</h3>
                      <p className="text-sm text-gray-500">Snapshots will be added as the project progresses</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents tab */}
          {activeTab === 'documents' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Project Documents</h2>
              <div className="space-y-4">
                {/* Placeholder for documents */}
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Project Brief</p>
                      <p className="text-xs text-gray-500">Uploaded: {new Date(project?.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center">More documents will be added as needed</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProjectDetails;