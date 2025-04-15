import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectInfo} from '../services/projectService';
import { 
  Check, Clock, AlertCircle, Image, ChevronRight, Bookmark, 
  Calendar, User, FileText, ArrowLeft, Settings, Link, Download, 
  Plus, Trash2, Edit, Eye, Star, Zap, Flag, Circle, CheckCircle
} from 'lucide-react';


const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('');
  const [snapshots, setSnapshots] = useState(['', '', '']);
  const [githubLink, setGithubLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getProjectInfo(projectId, token);
        setProject(response);
        setStatus(response.projectStatus);
        setSnapshots(response.snapshots || ['', '', '']);
        setGithubLink(response.projectSource || '');
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch project details');
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Status update handler
  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem('token');
      await getProjectInfo(projectId, status, token);
      setProject({...project, projectStatus: status});
      showSuccess('Status updated successfully');
    } catch (err) {
      setError('Failed to update status: ' + err.message);
    }
  };

  // Snapshot update handler
  const handleSnapshotChange = async () => {
    try {
      const token = localStorage.getItem('token');
      await getProjectInfo(projectId, snapshots, token);
      setProject({...project, snapshots});
      showSuccess('Snapshots updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update snapshots: ' + err.message);
    }
  };

  // GitHub link update handler
  const handleGithubLinkChange = async () => {
    try {
      const token = localStorage.getItem('token');
      await getProjectInfo(projectId, githubLink, token);
      setProject({...project, projectSource: githubLink});
      showSuccess('GitHub link updated successfully');
    } catch (err) {
      setError('Failed to update GitHub link: ' + err.message);
    }
  };

  // Success message handler
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

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
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Projects</span>
          </button>
          <div className="flex items-center space-x-4">
            <StatusBadge status={project?.projectStatus} />
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Success message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project?.projectTitle}</h1>
              <p className="mt-2 text-lg text-gray-600">{project?.projectDescription}</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2 inline" />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2 inline" />
                Edit Project
              </button>
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
                <Flag className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Priority</p>
                  <div className="mt-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-900">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['Overview', 'Progress', 'Team', 'Documents', 'Settings'].map((tab) => (
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
                  {/* Status update */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Project Status</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={handleStatusChange}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* GitHub link */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Repository</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="text"
                          value={githubLink}
                          onChange={(e) => setGithubLink(e.target.value)}
                          className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="https://github.com/username/repo"
                        />
                        <button
                          onClick={handleGithubLinkChange}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Update
                        </button>
                      </div>
                      {githubLink && (
                        <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <Link className="h-4 w-4 mr-2" />
                          <a href={githubLink} target="_blank" rel="noopener noreferrer">
                            Open repository
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div>
                  {/* Quick actions */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Create Task</span>
                        <Plus className="h-4 w-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Schedule Meeting</span>
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Generate Report</span>
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Project health */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Project Health</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget</span>
                          <span>42%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Timeline</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snapshots section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Project Snapshots</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {isEditing ? 'Cancel' : 'Edit Snapshots'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      {snapshots.map((snapshot, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <input
                            type="text"
                            value={snapshot}
                            onChange={(e) => {
                              const newSnapshots = [...snapshots];
                              newSnapshots[index] = e.target.value;
                              setSnapshots(newSnapshots);
                            }}
                            className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder={`Snapshot ${index + 1} URL`}
                          />
                          <button
                            onClick={() => {
                              const newSnapshots = [...snapshots];
                              newSnapshots[index] = '';
                              setSnapshots(newSnapshots);
                            }}
                            className="p-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSnapshotChange}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
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
                        <p className="text-sm text-gray-500">Add snapshots to showcase project progress</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress tab */}
          {activeTab === 'progress' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Project Timeline</h2>
              <div className="relative pl-8 pb-6">
                {/* Timeline line */}
                <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
                
                {/* Timeline items */}
                {[
                  { 
                    title: 'Project Started', 
                    date: project?.createdAt, 
                    icon: Zap,
                    color: 'bg-blue-500'
                  },
                  { 
                    title: 'First Milestone', 
                    date: '2023-05-15', 
                    icon: Flag,
                    color: 'bg-green-500'
                  },
                  { 
                    title: 'Design Approved', 
                    date: '2023-06-22', 
                    icon: CheckCircle,
                    color: 'bg-purple-500'
                  },
                  { 
                    title: 'Development Complete', 
                    date: null, 
                    icon: Circle,
                    color: 'bg-gray-400'
                  },
                  { 
                    title: 'Project Delivery', 
                    date: null, 
                    icon: Bookmark,
                    color: 'bg-gray-400'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative mb-8">
                    <div className={`absolute -left-7 mt-1.5 ${item.color} h-4 w-4 rounded-full ring-4 ring-white`}></div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        {item.date ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Pending
                          </span>
                        )}
                      </div>
                      {item.date ? (
                        <p className="mt-1 text-sm text-gray-500">Completed on schedule</p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">Estimated completion: Q3 2023</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team tab */}
          {activeTab === 'team' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Project Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Alex Johnson', role: 'Project Manager', avatar: 'AJ' },
                  { name: 'Sarah Williams', role: 'Lead Developer', avatar: 'SW' },
                  { name: 'Michael Chen', role: 'UI/UX Designer', avatar: 'MC' },
                  { name: 'Emily Davis', role: 'QA Engineer', avatar: 'ED' },
                  { name: 'David Kim', role: 'DevOps Specialist', avatar: 'DK' }
                ].map((member, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                            {member.avatar}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-3">
                        <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </button>
                        <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                          <Link className="h-4 w-4 mr-2" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;