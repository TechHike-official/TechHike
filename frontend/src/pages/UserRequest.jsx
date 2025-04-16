import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRequestsByUserId, createRequest } from '../services/requestService';
import { 
  createAssistRequest, 
  getUserAssistRequests, 
  payAssistRequest, 
  submitFeedback 
} from '../services/assistRequestService';
import ProjectRequestForm from '../components/ProjectRequestForm';
import AssistRequestForm from '../components/AssistRequestForm';
import { Clock, Search, Check, Eye, FolderPlus, HelpCircle, ChevronDown, ChevronUp, X, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import ProgressBar from '../components/ui/ProgressBar';

const UserRequest = () => {
  const [requests, setRequests] = useState([]);
  const [assistRequests, setAssistRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAssistForm, setShowAssistForm] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [expandedRequest, setExpandedRequest] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRequests, assistRequestsData] = await Promise.all([
          getRequestsByUserId(user.id).catch(() => null),
          getUserAssistRequests(user.id).catch(() => null),
        ]);

        setRequests(projectRequests || []);
        setAssistRequests(assistRequestsData || []);
        setFilteredRequests(projectRequests || []);
        setLoading(false);
      } catch (err) {
        setError('Request not found');
        setRequests([]);
        setAssistRequests([]);
        setFilteredRequests([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  // Rest of your existing useEffect for filtering remains unchanged
  useEffect(() => {
    const filtered = requests.filter(request =>
      (request.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.clientName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  // Rest of your existing functions remain unchanged
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewProgress = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const handleRequestProject = async (formData) => {
    const { projectTitle, platform, purpose } = formData;
    if (!projectTitle.trim() || !platform || !purpose.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const requestData = { ...formData, clientId: user.id };
      await createRequest(requestData, token);
      window.location.reload();
      setShowRequestForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit project request');
    }
  };

  const handleRequestAssist = async (assistData) => {
    const { projectName, platform, sourceLink, technologies } = assistData;
    if (!projectName.trim() || !platform || !sourceLink.trim()) {
      setError('Project name, platform, and source link are required');
      return;
    }

    try {
      const savedRequest = await createAssistRequest({
        userId: user.id,
        projectName,
        projectType: platform,
        projectTechnologies: technologies,
      });
      setAssistRequests(prev => [...prev, savedRequest]);
      setShowAssistForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to submit assist request');
    }
  };

  const handlePayment = async (requestId, paymentType) => {
    try {
      const transactionId = `txn_${Date.now()}`;
      const updatedRequest = await payAssistRequest(requestId, paymentType, transactionId);
      setAssistRequests(prev =>
        prev.map(req => (req._id === requestId ? updatedRequest : req))
      );
      alert('Payment successful!');
    } catch (err) {
      setError(err.message || 'Payment failed');
    }
  };

  const handleFeedback = async (requestId, feedback, rating) => {
    try {
      const updatedRequest = await submitFeedback(requestId, feedback, rating);
      setAssistRequests(prev =>
        prev.map(req => (req._id === requestId ? updatedRequest : req))
      );
      alert('Feedback submitted!');
    } catch (err) {
      setError(err.message || 'Failed to submit feedback');
    }
  };

  const toggleRequestDetails = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  if (loading) return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p>Loading your requests...</p>
    </div>
  );

  return (
    <div className={`container mx-auto p-4 md:p-6 w-full mt-16 ${theme === 'dark' ? 'text-gray-100 bg-gray-900' : 'text-gray-800 bg-white'}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Your Requests</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your project and assistance requests
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowRequestForm(true)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} shadow-sm`}
          >
            <FolderPlus size={18} /> New Project
          </button>
          <button
            onClick={() => setShowAssistForm(true)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'} shadow-sm`}
          >
            <HelpCircle size={18} /> Request Assistance
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 font-medium ${activeTab === 'projects' ? 
            (theme === 'dark' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : 
            (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800')}`}
        >
          Project Requests ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('assistance')}
          className={`px-4 py-2 font-medium ${activeTab === 'assistance' ? 
            (theme === 'dark' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-purple-600 border-b-2 border-purple-600') : 
            (theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800')}`}
        >
          Assistance Requests ({assistRequests.length})
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'projects' ? 'project' : 'assistance'} requests...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'} focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className={`flex items-center justify-center gap-2 p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-800 text-red-400' : 'bg-red-50 text-red-600'}`}>
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {/* Project Requests Section */}
      {activeTab === 'projects' && (
        <div className={`rounded-xl overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          {filteredRequests.length === 0 && !error ? (
            <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <FolderPlus className="mx-auto w-10 h-10 mb-3 opacity-60" />
              <h3 className="text-lg font-medium">No project requests yet</h3>
              <p className="mt-1">Get started by requesting a new project</p>
              <button
                onClick={() => setShowRequestForm(true)}
                className={`mt-4 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Request Project
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests.map(request => (
                <div key={request._id} className={`p-4 ${theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                  {/* Existing project request rendering */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium truncate">{request.projectTitle}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                        <span className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-3.5 h-3.5 mr-1.5" /> {formatDate(request.createdAt)}
                        </span>
                        <StatusBadge status={request.requestStatus} theme={theme} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {request.requestStatus === 'Approved' && (
                        <button
                          onClick={() => handleViewProgress(request.projectStatusUrl)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          <Eye size={14} /> View Progress
                        </button>
                      )}
                      <button
                        onClick={() => toggleRequestDetails(request._id)}
                        className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      >
                        {expandedRequest === request._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedRequest === request._id && (
                    <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      {/* Existing expanded details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Project Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm"><span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform:</span> {request.platform || 'N/A'}</p>
                            <p className="text-sm"><span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Purpose:</span> {request.purpose || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Status Information</h4>
                          {request.requestStatus === 'Pending' ? (
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                              <p className="text-sm">Your request is under review. We'll notify you once it's approved.</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Project Progress</span>
                                <span>65%</span>
                              </div>
                              <ProgressBar progress={65} theme={theme} />
                              <p className="text-sm text-blue-500 dark:text-blue-400">Estimated completion: 2 weeks</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assistance Requests Section */}
      {activeTab === 'assistance' && (
        <div className={`rounded-xl overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          {assistRequests.length === 0 && !error ? (
            <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <HelpCircle className="mx-auto w-10 h-10 mb-3 opacity-60" />
              <h3 className="text-lg font-medium">No assistance requests yet</h3>
              <p className="mt-1">Need help with a project? Request assistance</p>
              <button
                onClick={() => setShowAssistForm(true)}
                className={`mt-4 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
              >
                Request Assistance
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {assistRequests.map(request => (
                <div key={request._id} className={`p-4 ${theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                  {/* Existing assistance request rendering */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium truncate">{request.projectName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                        <span className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Clock className="w-3.5 h-3.5 mr-1.5" /> {formatDate(request.createdAt)}
                        </span>
                        <StatusBadge status={request.requestStatus} theme={theme} />
                        <StatusBadge status={request.assistStatus} theme={theme} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {request.requestStatus === 'Approved' && !request.transactionId && (
                        <button
                          onClick={() => window.location.href = '/dashboard/assistance'}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                          Manage
                        </button>
                      )}
                      {request.transactionId && request.assistStatus === 'Completed' && !request.feedback && (
                        <button
                          onClick={() => {
                            const feedback = prompt('Enter your feedback:');
                            const rating = parseInt(prompt('Enter a rating (1-5):'), 10);
                            if (feedback && rating) handleFeedback(request._id, feedback, rating);
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${theme === 'dark' ? 'bg-yellow-700 hover:bg-yellow-600 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'}`}
                        >
                          Submit Feedback
                        </button>
                      )}
                      {request.feedback && (
                        <span className={`px-2 py-1 rounded-md text-xs ${theme === 'dark' ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800'}`}>
                          Feedback Submitted
                        </span>
                      )}
                      <button
                        onClick={() => toggleRequestDetails(request._id)}
                        className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                      >
                        {expandedRequest === request._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedRequest === request._id && (
                    <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      {/* Existing expanded details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Project Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm"><span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform:</span> {request.projectType || 'N/A'}</p>
                            <p className="text-sm"><span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Technologies:</span> {request.projectTechnologies?.join(', ') || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Request Information</h4>
                          {request.requestStatus === 'Pending' ? (
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                              <p className="text-sm">Your assistance request is under review. We'll notify you once it's approved.</p>
                            </div>
                          ) : request.requestStatus === 'Approved' && !request.transactionId ? (
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                              <p className="text-sm">Your request has been approved! Please make payment to start the assistance process.</p>
                            </div>
                          ) : request.assistStatus === 'In Progress' ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Assistance Progress</span>
                                <span>40%</span>
                              </div>
                              <ProgressBar progress={40} theme={theme} />
                              <p className="text-sm text-blue-500 dark:text-blue-400">Assigned expert: John Doe (Web Development)</p>
                            </div>
                          ) : request.assistStatus === 'Completed' && request.feedback ? (
                            <div className={`p-3 rounded-md ${theme === 'dark' ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-700'}`}>
                              <p className="text-sm">Thank you for your feedback! We appreciate your trust in our service.</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showRequestForm && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}>
          <div className={`relative rounded-xl shadow-xl w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setShowRequestForm(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
            >
              <X size={20} />
            </button>
            <ProjectRequestForm
              onClose={() => setShowRequestForm(false)}
              onSubmit={handleRequestProject}
              error={error}
              theme={theme}
            />
          </div>
        </div>
      )}

      {showAssistForm && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}>
          <div className={`relative rounded-xl shadow-xl w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setShowAssistForm(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-500'}`}
            >
              <X size={20} />
            </button>
            <AssistRequestForm
              onClose={() => setShowAssistForm(false)}
              onSubmit={handleRequestAssist}
              error={error}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequest;