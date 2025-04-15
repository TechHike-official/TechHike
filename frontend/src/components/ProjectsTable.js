import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProjectsTable = () => {
  // Sample projects data
  const projects = [
    { id: 1, name: 'E-commerce Website', client: 'ABC Corp', type: 'Joint', status: 'Completed', amount: 2500 },
    { id: 2, name: 'Portfolio Design', client: 'Jane Doe', type: 'Individual', status: 'In Progress', amount: 1200 },
    { id: 3, name: 'Mobile App', client: 'XYZ Inc', type: 'Joint', status: 'Pending Payment', amount: 3800 },
    { id: 4, name: 'CMS Development', client: 'Local Business', type: 'Individual', status: 'Completed', amount: 1500 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Pending Payment':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <motion.tr
              key={project.id}
              whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.client}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${project.type === 'Joint' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {project.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <span className="ml-2">{project.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${project.amount}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;