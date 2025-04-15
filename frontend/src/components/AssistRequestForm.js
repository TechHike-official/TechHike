import React, { useState } from 'react';

const AssistRequestForm = ({ onClose, onSubmit, error, theme }) => {
  const [assistData, setAssistData] = useState({
    projectName: '',
    platform: '',
    sourceLink: '',
    technologies: [],
  });
  const [techSearch, setTechSearch] = useState('');
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);

  const technologiesList = [
    'ReactJS', 'NextJS', 'Vite', 'JavaScript', 'TypeScript', 'Python', 'Node.js',
    'Socket.IO', 'MongoDB', 'Firebase', 'AWS', 'Django', 'Flask', 'Express.js',
    'Vue.js', 'Angular', 'Svelte', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL',
    'Docker', 'Kubernetes', 'GCP', 'Azure'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssistData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechSearch = (e) => {
    setTechSearch(e.target.value);
    setIsTechDropdownOpen(true);
  };

  const handleTechSelect = (tech) => {
    if (!assistData.technologies.includes(tech)) {
      setAssistData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
    }
    setTechSearch('');
    setIsTechDropdownOpen(false);
  };

  const handleTechRemove = (tech) => {
    setAssistData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const filteredTechnologies = technologiesList.filter(tech =>
    tech.toLowerCase().includes(techSearch.toLowerCase())
  );

  const handleSubmit = () => {
    onSubmit(assistData);
  };

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}>
      <div className={`p-6 w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-xl font-semibold mb-4">Request Assistance</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={assistData.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform</label>
          <select
            name="platform"
            value={assistData.platform}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="">Select a platform</option>
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
            <option value="Web">Web</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Source Link</label>
          <input
            type="url"
            name="sourceLink"
            value={assistData.sourceLink}
            onChange={handleInputChange}
            placeholder="Enter project source link (e.g., GitHub)"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Technologies Used (Optional)</label>
          <div className="relative">
            <input
              type="text"
              value={techSearch}
              onChange={handleTechSearch}
              onFocus={() => setIsTechDropdownOpen(true)}
              placeholder="Search technologies..."
              className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            />
            {isTechDropdownOpen && filteredTechnologies.length > 0 && (
              <ul className={`absolute z-10 w-full max-h-40 overflow-y-auto border rounded-md mt-1 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                {filteredTechnologies.map(tech => (
                  <li
                    key={tech}
                    onClick={() => handleTechSelect(tech)}
                    className={`px-3 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {assistData.technologies.map(tech => (
              <span
                key={tech}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}
              >
                {tech}
                <button
                  onClick={() => handleTechRemove(tech)}
                  className={`ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {error && <p className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Request Assist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistRequestForm;