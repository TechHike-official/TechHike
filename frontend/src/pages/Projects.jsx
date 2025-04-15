import React, { useState } from 'react';
import { Search, Smartphone, Globe, Users, UserCheck, Clock, CheckCircle, AlertTriangle, Filter, ChevronDown } from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample project data
  const projects = [
    {
      id: 'PRJ-2025-001',
      name: 'E-Commerce Mobile App',
      client: 'FashionRetail Inc.',
      type: 'mobile',
      status: 'in-progress',
      teamSize: 4,
      startDate: '2025-01-15',
      dueDate: '2025-06-30',
      description: 'A native mobile application for iOS and Android platforms focusing on e-commerce functionality.'
    },
    {
      id: 'PRJ-2025-002',
      name: 'Corporate Dashboard',
      client: 'FinTech Solutions',
      type: 'web',
      status: 'completed',
      teamSize: 3,
      startDate: '2024-11-01',
      dueDate: '2025-02-28',
      description: 'Responsive web dashboard for financial data visualization and reporting.'
    },
    {
      id: 'PRJ-2025-003',
      name: 'Health Monitoring App',
      client: 'MediCare Plus',
      type: 'mobile',
      status: 'on-hold',
      teamSize: 5,
      startDate: '2025-02-10',
      dueDate: '2025-07-15',
      description: 'Mobile application for patients to track health metrics and medication schedules.'
    },
    {
      id: 'PRJ-2025-004',
      name: 'Content Management System',
      client: 'MediaGroup Publishing',
      type: 'web',
      status: 'in-progress',
      teamSize: 2,
      startDate: '2025-03-01',
      dueDate: '2025-05-30',
      description: 'Custom CMS solution for digital content creators and publishers.'
    },
    {
      id: 'PRJ-2025-005',
      name: 'Inventory Management System',
      client: 'Global Logistics Ltd.',
      type: 'web',
      status: 'planning',
      teamSize: 4,
      startDate: '2025-04-10',
      dueDate: '2025-09-15',
      description: 'Web-based inventory tracking and management system with mobile companion app.'
    },
    {
      id: 'PRJ-2025-006',
      name: 'Social Networking App',
      client: 'ConnectMe Startup',
      type: 'mobile',
      status: 'in-progress',
      teamSize: 6,
      startDate: '2025-01-05',
      dueDate: '2025-08-20',
      description: 'Mobile-first social platform focusing on professional connections and networking.'
    }
  ];

  // Filter projects based on search term and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <CheckCircle size={14} className="mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Clock size={14} className="mr-1" />
            In Progress
          </span>
        );
      case 'on-hold':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            <AlertTriangle size={14} className="mr-1" />
            On Hold
          </span>
        );
      case 'planning':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            <Clock size={14} className="mr-1" />
            Planning
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 mt-5 min-h-screen">
      <div className="w-full mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">My Projects</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
            New Project
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search by ID, project name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Filter size={18} className="mr-2 text-gray-600" />
                <span className="text-gray-700">Filters</span>
                <ChevronDown size={16} className={`ml-1 text-gray-600 transition-transform duration-200 ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by status:</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterStatus('all')} 
                  className={`px-3 py-1 text-sm rounded-full ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterStatus('in-progress')} 
                  className={`px-3 py-1 text-sm rounded-full ${filterStatus === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  In Progress
                </button>
                <button 
                  onClick={() => setFilterStatus('completed')} 
                  className={`px-3 py-1 text-sm rounded-full ${filterStatus === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Completed
                </button>
                <button 
                  onClick={() => setFilterStatus('on-hold')} 
                  className={`px-3 py-1 text-sm rounded-full ${filterStatus === 'on-hold' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  On Hold
                </button>
                <button 
                  onClick={() => setFilterStatus('planning')} 
                  className={`px-3 py-1 text-sm rounded-full ${filterStatus === 'planning' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Planning
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {project.type === 'mobile' ? (
                        <Smartphone size={22} className="text-blue-600" />
                      ) : (
                        <Globe size={22} className="text-green-600" />
                      )}
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.name}</h3>
                  <div className="text-sm text-gray-500 mb-3">{project.client}</div>
                  
                  <div className="text-xs font-medium text-gray-500 mb-4">{project.id}</div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center mb-2">
                    <Users size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Team: {project.teamSize} members</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Search size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;