import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedProjects } from '../services/projectService';
import { useSelector } from 'react-redux';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); 
  console.log("user:", user)

  const token = 'your-jwt-token'; // Replace with actual token

  useEffect(() => {
    const fetchProjects = async () => {
      
      try {
        const data = await getAssignedProjects(user.id); // Fetch all projects
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleProjectClick = (projectId) => {
    navigate(`${projectId}`);
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-black">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-5 w-full mt-16 text-black">
      <h1 className="text-2xl mb-5">All Projects</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">Project Title</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project._id}
              onClick={() => handleProjectClick(project._id)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="py-3 px-4">{project.projectTitle}</td>
              <td className="py-3 px-4">{project.status}</td>
              <td className="py-3 px-4">{project.projectDescription}</td>
              <td className="py-3 px-4">{project.paymentStatus ? 'Paid' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManagement;
