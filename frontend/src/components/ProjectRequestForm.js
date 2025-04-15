import React from 'react';

const ProjectRequestForm = ({ onClose, onSubmit, error, theme }) => {
  const [formData, setFormData] = React.useState({
    projectTitle: '',
    projectDescription: '',
    platform: '',
    purpose: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-75' : 'bg-black bg-opacity-50'} flex items-center justify-center z-50`}>
      <div className={`p-6 rounded-lg w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-xl font-semibold mb-4">Request a New Project</h2>
        
        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            placeholder="Enter project title"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Project Description</label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Describe your project"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Platform</label>
          <select
            name="platform"
            value={formData.platform}
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
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            placeholder="What do you need this project for?"
            className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            rows="3"
          />
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectRequestForm;