import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

const Work = () => {
  // Sample projects data (would normally come from an API/database)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with payment processing and inventory management",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Healthcare Dashboard",
      description: "Patient management system with analytics and scheduling capabilities",
      image: "/api/placeholder/600/400",
      technologies: ["Vue.js", "Express", "PostgreSQL", "D3.js"]
    },
    {
      id: 3,
      title: "Finance App",
      description: "Mobile application for personal finance tracking and investment management",
      image: "/api/placeholder/600/400",
      technologies: ["React Native", "Firebase", "Redux", "TensorFlow"]
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "Online education platform with course creation and student progress tracking",
      image: "/api/placeholder/600/400",
      technologies: ["Angular", "Django", "MySQL", "AWS"]
    }
  ]);

  // Admin mode state
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "/api/placeholder/600/400",
    technologies: ""
  });

  // Toggle admin mode
  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  // Delete a project
  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  // Add a new project
  const addProject = (e) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const projectToAdd = {
      id: newId,
      title: newProject.title,
      description: newProject.description,
      image: newProject.image,
      technologies: newProject.technologies.split(',').map(tech => tech.trim())
    };
    
    setProjects([...projects, projectToAdd]);
    
    // Reset form
    setNewProject({
      title: "",
      description: "",
      image: "/api/placeholder/600/400",
      technologies: ""
    });
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Our Work</h2>
          <button 
            onClick={toggleAdminMode} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
          </button>
        </div>

        {/* Admin panel for adding new projects */}
        {isAdmin && (
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
            <form onSubmit={addProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={16} className="mr-2" />
                Add Project
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {isAdmin && (
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;