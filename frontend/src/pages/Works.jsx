import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Trash2, Plus, ExternalLink, Code } from 'lucide-react';

const Works = () => {
  const { theme } = useSelector((state) => state.general);
  const isDark = theme === 'dark';

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Enterprise E-Commerce Platform",
      description: "Scalable online marketplace featuring real-time inventory, payment gateway integrations, and order tracking.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Healthcare Analytics Dashboard",
      description: "Real-time patient health monitoring system with analytical dashboards, automated alerts, and staff scheduling.",
      technologies: ["React", "Express", "PostgreSQL", "Tailwind CSS"]
    },
    {
      id: 3,
      title: "FinTech Mobile Application",
      description: "Secure cross-platform mobile application for personal wealth management, stock trading, and instant transfers.",
      technologies: ["Flutter", "Node.js", "Firebase", "Redux"]
    },
    {
      id: 4,
      title: "AI-Powered Learning Platform",
      description: "Interactive online education portal featuring course authoring, automated grading, and video streaming.",
      technologies: ["Next.js", "Python", "MongoDB", "AWS"]
    }
  ]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: ""
  });

  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const addProject = (e) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const projectToAdd = {
      id: newId,
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map(tech => tech.trim())
    };
    setProjects([...projects, projectToAdd]);
    setNewProject({ title: "", description: "", technologies: "" });
  };

  return (
    <div className={`py-16 sm:py-24 transition-colors duration-300 min-h-screen ${
      isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
              <span>Portfolio Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Featured Engineering Projects
            </h1>
            <p className={`mt-2 text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Explore our recently completed web applications, mobile platforms, and enterprise solutions.
            </p>
          </div>

          <button 
            onClick={toggleAdminMode} 
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-colors ${
              isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-white'
            }`}
          >
            {isAdmin ? "Exit Management Mode" : "Manage Showcase"}
          </button>
        </div>

        {/* Admin Form */}
        {isAdmin && (
          <div className={`mb-12 p-6 rounded-2xl border shadow-xl ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Add Project to Showcase</h3>
            <form onSubmit={addProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, MongoDB"
                  className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Add Project</span>
              </button>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                isDark
                  ? 'bg-slate-800/60 border-slate-700/60 hover:border-blue-500/50'
                  : 'bg-white border-slate-200/80 hover:border-blue-300'
              }`}
            >
              {isAdmin && (
                <button
                  onClick={() => deleteProject(project.id)}
                  className="absolute top-4 right-4 p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center mb-4">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                      isDark ? 'bg-slate-700 text-blue-300' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Works;
