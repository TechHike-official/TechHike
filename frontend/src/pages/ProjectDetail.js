import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectInfo } from '../services/projectService';
import { 
  Check, Clock, AlertCircle, Image, ChevronRight, Bookmark, 
  Calendar, User, FileText, ArrowLeft, Settings, Link, Download, 
  Plus, Trash2, Edit, Eye, Star, Zap, Flag, Circle, CheckCircle,
  ChevronDown, ChevronUp, Users, BarChart2, Layers, File, Mail,
  MessageSquare, Bell, MoreVertical, ExternalLink, GitBranch
} from 'lucide-react';
import ProjectPercentageSelector from '../components/ui/PercentageStatus';
import DeveloperList from '../components/ui/DeveloperList';
import { getUsersByIds } from '../services/userService';

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
  const [progressPercentage, setProgressPercentage] = useState(65);
  const [developers,setDeveloper] = useState()
  const [expandedSection, setExpandedSection] = useState({
    status: true,
    repository: true,
    snapshots: true,
    timeline: true,
    team: true
  });

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
        const DeveloperInfo = await getUsersByIds(response.developers)
        setDeveloper(DeveloperInfo)
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

  const handleProgressUpdate = async (newPercentage) => {
    try {
      setProgressPercentage(newPercentage);
      showSuccess('Project progress updated successfully');
    } catch (err) {
      setError('Failed to update progress: ' + err.message);
    }
  };

  // Success message handler
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Pending': { icon: Clock, color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
      'In Progress': { icon: ChevronRight, color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
      'Completed': { icon: Check, color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
      'On Hold': { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
      'Cancelled': { icon: AlertCircle, color: 'bg-red-100 text-red-800', dot: 'bg-red-500' }
    };

    const { icon: Icon, color, dot } = statusConfig[status] || { 
      icon: AlertCircle, 
      color: 'bg-gray-100 text-gray-800',
      dot: 'bg-gray-500'
    };

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <span className={`w-2 h-2 rounded-full ${dot} mr-2`}></span>
        {status}
      </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">All Projects</span>
            </button>
            <div className="flex items-center space-x-4">
              <StatusBadge status={project?.projectStatus} />
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{project?.projectTitle}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-lg text-gray-600">{project?.projectDescription}</p>
              
              {/* Progress bar */}
              <div className="mt-6">
              
                
                <ProjectPercentageSelector
                  initialPercentage={project.progressPercentage}
                  onUpdate={handleProgressUpdate}
                  className="mt-2"
                />
              </div>
            </div>
            
         
            
          </div>

          {/* Metadata */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{project?.clientName}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mr-3">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(project?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

         
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection('status')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Project Status</h2>
                </div>
                {expandedSection.status ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <AnimatePresence>
                {expandedSection.status && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={handleStatusChange}
                          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Update
                        </button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                              <User className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Last updated by Alex Johnson</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Repository section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection('repository')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mr-3">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Repository</h2>
                </div>
                {expandedSection.repository ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <AnimatePresence>
                {expandedSection.repository && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={githubLink}
                          onChange={(e) => setGithubLink(e.target.value)}
                          className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                          placeholder="https://github.com/username/repo"
                        />
                        <button
                          onClick={handleGithubLinkChange}
                          className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          Update
                        </button>
                      </div>
                      {githubLink && (
                        <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            Open repository
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Snapshots section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection('snapshots')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-50 text-green-600 mr-3">
                    <Image className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Project Snapshots</h2>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(!isEditing);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 mr-4"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  {expandedSection.snapshots ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSection.snapshots && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          {snapshots.map((snapshot, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <input
                                type="text"
                                value={snapshot}
                                onChange={(e) => {
                                  const newSnapshots = [...snapshots];
                                  newSnapshots[index] = e.target.value;
                                  setSnapshots(newSnapshots);
                                }}
                                className="flex-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                placeholder={`Snapshot ${index + 1} URL`}
                              />
                              <button
                                onClick={() => {
                                  const newSnapshots = [...snapshots];
                                  newSnapshots[index] = '';
                                  setSnapshots(newSnapshots);
                                }}
                                className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSnapshotChange}
                            className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {snapshots.filter(url => url).length > 0 ? (
                          snapshots.filter(url => url).map((snapshot, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              whileHover={{ scale: 1.02 }}
                              className="relative group overflow-hidden rounded-lg shadow-sm border border-gray-200"
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
                          <div className="col-span-2 py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Image className="h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No snapshots</h3>
                            <p className="text-sm text-gray-500">Add snapshots to showcase project progress</p>
                            <button 
                              onClick={() => setIsEditing(true)}
                              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Snapshots
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right column (1/3 width) */}
          <div className="space-y-6">
            {/* Quick actions */}
          

           
            {/* Team section */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection('team')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                </div>
                {expandedSection.team ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <AnimatePresence>
                {expandedSection.team && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                  <DeveloperList developers={developers}/>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;