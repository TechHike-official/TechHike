import React from 'react';
import { Clock, Check, X, HelpCircle, AlertCircle, Zap } from 'lucide-react';

const StatusBadge = ({ status, theme = 'light', className = '' }) => {
  // Determine badge styling based on status
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const getStatusConfig = () => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    const statusMap = {
      'Pending': {
        bg: theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100',
        text: theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800',
        icon: <Clock className="w-3 h-3 mr-1" />,
      },
      'Approved': {
        bg: theme === 'dark' ? 'bg-green-900' : 'bg-green-100',
        text: theme === 'dark' ? 'text-green-300' : 'text-green-800',
        icon: <Check className="w-3 h-3 mr-1" />,
      },
      'Rejected': {
        bg: theme === 'dark' ? 'bg-red-900' : 'bg-red-100',
        text: theme === 'dark' ? 'text-red-300' : 'text-red-800',
        icon: <X className="w-3 h-3 mr-1" />,
      },
      'In Progress': {
        bg: theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100',
        text: theme === 'dark' ? 'text-blue-300' : 'text-blue-800',
        icon: <Zap className="w-3 h-3 mr-1" />,
      },
      'Completed': {
        bg: theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100',
        text: theme === 'dark' ? 'text-purple-300' : 'text-purple-800',
        icon: <Check className="w-3 h-3 mr-1" />,
      },
      'On Hold': {
        bg: theme === 'dark' ? 'bg-orange-900' : 'bg-orange-100',
        text: theme === 'dark' ? 'text-orange-300' : 'text-orange-800',
        icon: <AlertCircle className="w-3 h-3 mr-1" />,
      },
      default: {
        bg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
        text: theme === 'dark' ? 'text-gray-300' : 'text-gray-800',
        icon: <HelpCircle className="w-3 h-3 mr-1" />,
      }
    };

    return statusMap[status] || statusMap.default;
  };

  const statusConfig = getStatusConfig();

  return (
    <span className={`${statusConfig.bg} ${statusConfig.text} ${baseClasses} ${className}`}>
      {statusConfig.icon}
      {status}
    </span>
  );
};

export default StatusBadge;